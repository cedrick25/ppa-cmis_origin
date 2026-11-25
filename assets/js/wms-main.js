/* 
 * This the main API js of WMS 
 *  Portal web services.
 */

/* Use page protocol so HTTPS CMIS does not trigger mixed-content blocks. */
var __cmis_proto = window.location.protocol + "//";
var __cmis_local = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
/* PPIS via NPM on ppis.probation.gov.ph:
 * /8000/ → 192.168.1.147:8000 (API)
 * /8080/ → 192.168.1.147:8080 (upload/files)
 * Local:   direct http://127.0.0.1:8000 / :8080 (Docket/PPIS)
 */
var PPIS_path_upload = __cmis_local
    ? (__cmis_proto + "127.0.0.1:8080")
    : (__cmis_proto + "ppis.probation.gov.ph/8080");
var PPIS_path = __cmis_local
    ? (__cmis_proto + "127.0.0.1:8000")
    : (__cmis_proto + "ppis.probation.gov.ph/8000");
/* Expansion API — change port only here; call sites use Expansion_api + "<path>".
 * Production: path proxy https://<host>/8000/... (NPM/openresty → Expansion)
 * Local:      direct      http://127.0.0.1:8001/... (Docket/PPIS keeps :8000)
 */
// var Expansion_api = __cmis_proto + window.location.hostname + "/"; // old: call sites appended "8000/..."
var Expansion_port = __cmis_local ? "8001" : "8000";
var Expansion_api = __cmis_local
    ? (__cmis_proto + "127.0.0.1:" + Expansion_port + "/")
    : (__cmis_proto + window.location.hostname + "/" + Expansion_port + "/");

window.__cmisFileToken = window.__cmisFileToken || '';

function cmisIsPpisFileUrl(url) {
    return typeof PPIS_path_upload === 'string'
        && typeof url === 'string'
        && url.indexOf(PPIS_path_upload + '/file/') !== -1;
}

function cmisIsUploadUrl(url) {
    return cmisIsPpisFileUrl(url) && url.indexOf('/file/upload') !== -1;
}

function cmisTokenExp(token) {
    try {
        var part = String(token || '').split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        if (!part) {
            return 0;
        }
        var json = JSON.parse(atob(part));
        return json && json.exp ? json.exp : 0;
    } catch (e) {
        return 0;
    }
}

function cmisKeepFileToken(token) {
    if (!token) {
        return;
    }
    if (cmisTokenExp(token) >= cmisTokenExp(window.__cmisFileToken)) {
        window.__cmisFileToken = token;
        window.__cmisFileTokenMissing = false;
    }
}

(function () {
    var rawAjax = $.ajax;

    function cmisFetchFileToken() {
        var deferred = $.Deferred();
        rawAjax({
            url: '/ppa-cmis-api_origin/wsv1/file/token',
            method: 'GET',
            dataType: 'json',
            cache: false,
            timeout: 8000
        }).done(function (result) {
            if (result && result.fileToken) {
                cmisKeepFileToken(result.fileToken);
                deferred.resolve(window.__cmisFileToken);
                return;
            }
            window.__cmisFileTokenMissing = true;
            deferred.reject({ status: 401, responseText: '' });
        }).fail(function (xhr) {
            if (xhr && (xhr.status === 401 || xhr.status === 403)) {
                window.__cmisFileToken = '';
                window.__cmisFileTokenMissing = true;
            }
            deferred.reject(xhr);
        });
        return deferred.promise();
    }

    function cmisRememberRenewedToken(xhr) {
        if (!xhr || typeof xhr.getResponseHeader !== 'function') {
            return;
        }
        var renewed = xhr.getResponseHeader('X-File-Token');
        if (!renewed) {
            return;
        }
        cmisKeepFileToken(renewed);
        rawAjax({
            url: '/ppa-cmis-api_origin/wsv1/file/token',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ fileToken: renewed }),
            cache: false,
            timeout: 8000
        });
    }

    /* Every /file/upload call waits for a token. A failed token request does not upload. */
    function cmisUploadAjax(settings) {
        var options = $.extend({}, settings);
        var userSuccess = options.success;
        var userError = options.error;
        var userComplete = options.complete;
        delete options.success;
        delete options.error;
        delete options.complete;

        function run(retried) {
            var deferred = $.Deferred();
            cmisFetchFileToken().done(function () {
                rawAjax(options).done(function (data, textStatus, xhr) {
                    if (userSuccess) {
                        userSuccess(data, textStatus, xhr);
                    }
                    if (userComplete) {
                        userComplete(xhr, textStatus);
                    }
                    deferred.resolve(data, textStatus, xhr);
                }).fail(function (xhr, textStatus, errorThrown) {
                    if (!retried && xhr && xhr.status === 401) {
                        window.__cmisFileToken = '';
                        run(true).done(deferred.resolve).fail(deferred.reject);
                        return;
                    }
                    if (userError) {
                        userError(xhr, textStatus, errorThrown);
                    }
                    if (userComplete) {
                        userComplete(xhr, textStatus);
                    }
                    deferred.reject(xhr, textStatus, errorThrown);
                });
            }).fail(function (xhr) {
                var failed = xhr || { status: 0, responseText: '' };
                if (userError) {
                    userError(failed, 'error', 'file token unavailable');
                }
                if (userComplete) {
                    userComplete(failed, 'error');
                }
                deferred.reject(failed, 'error', 'file token unavailable');
            });
            return deferred.promise();
        }

        return run(false);
    }

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!cmisIsPpisFileUrl(options.url)) {
            return;
        }
        if (window.__cmisFileToken) {
            jqXHR.setRequestHeader('Authorization', 'Bearer ' + window.__cmisFileToken);
        }
        jqXHR.always(function () {
            cmisRememberRenewedToken(jqXHR);
        });
    });

    $.ajax = function (url, settings) {
        var normalized = (typeof url === 'object') ? url : $.extend({}, settings || {});
        if (typeof url !== 'object' && url) {
            normalized.url = url;
        }
        var target = normalized.url || '';
        if (cmisIsUploadUrl(target)) {
            return cmisUploadAjax(normalized);
        }
        if (cmisIsPpisFileUrl(target) && !window.__cmisFileToken) {
            var gate = $.Deferred();
            var xhr = null;
            cmisFetchFileToken().done(function () {
                xhr = rawAjax(normalized);
                xhr.done(gate.resolve).fail(gate.reject);
            }).fail(function (failed) {
                failed = failed || { status: 0, responseText: '' };
                if (typeof normalized.error === 'function') {
                    normalized.error(failed, 'error', 'file token unavailable');
                }
                if (typeof normalized.complete === 'function') {
                    normalized.complete(failed, 'error');
                }
                gate.reject(failed, 'error', 'file token unavailable');
            });
            var promise = gate.promise();
            promise.abort = function () {
                if (xhr && xhr.abort) {
                    xhr.abort();
                }
            };
            return promise;
        }
        return rawAjax.apply($, arguments);
    };

    if (typeof $.cookie === 'function' && $.cookie('USER_ID')) {
        cmisFetchFileToken().fail(function () {
            if (window.__cmisFileTokenMissing && typeof cmisPromptMissingTokenLogout === 'function') {
                cmisPromptMissingTokenLogout();
            }
        });
    }
})();

/* PPIS file service accepts PDF and BMP only. */
function cmisPpisFileExtension(name) {
    var base = String(name || '').replace(/\\/g, '/').split('/').pop().trim();
    var dot = base.lastIndexOf('.');
    if (dot < 1 || dot === base.length - 1) {
        return '';
    }
    return base.slice(dot + 1).toLowerCase();
}

function cmisInvalidPpisFiles(fileList) {
    var allowed = { pdf: true, bmp: true };
    var bad = [];
    if (!fileList) {
        return bad;
    }
    for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
        if (!file) {
            continue;
        }
        if (!allowed[cmisPpisFileExtension(file.name)]) {
            bad.push(file.name || ('file ' + (i + 1)));
        }
    }
    return bad;
}

function cmisRejectPpisFiles(fileList) {
    var bad = cmisInvalidPpisFiles(fileList);
    if (!bad.length) {
        return false;
    }
    alert('Only PDF (.pdf) and bitmap (.bmp) files can be uploaded.\n\nNot allowed:\n' + bad.join('\n'));
    return true;
}

function cmisPayloadFailed(data) {
    if (data == null || data === '') {
        return false;
    }
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            return false;
        }
    }
    if (typeof data !== 'object') {
        return false;
    }
    var status = data.status != null ? data.status : data.Status;
    if (typeof status === 'string' && /^(ERROR|FAILED|FAIL|FAILURE)$/i.test(status)) {
        return true;
    }
    if (data.success === false || data.ok === false) {
        return true;
    }
    return false;
}

function cmisPayloadMessage(data, fallback) {
    if (data == null || data === '') {
        return fallback || '';
    }
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            return data.trim() || fallback || '';
        }
    }
    if (typeof data !== 'object') {
        return fallback || '';
    }
    var msg = data.message || data.Message || data.error || data.errorMessage || data.detail;
    if (msg && typeof msg === 'object') {
        msg = msg.message || '';
    }
    if (typeof msg === 'string' && msg.trim() && msg.trim() !== 'undefined') {
        return msg.trim();
    }
    return fallback || '';
}

function cmisDeletePpisDocket(docketNumber, type) {
    var deferred = $.Deferred();
    var docket = docketNumber == null ? '' : String(docketNumber).trim();
    if (!docket) {
        deferred.reject('Docket number is missing. It is still active in CMIS.');
        return deferred.promise();
    }
    $.ajax({
        url: PPIS_path + '/ppis/delete',
        type: 'POST',
        data: JSON.stringify({
            docketNumber: docket,
            fieldOfficeId: $.wms.urlParam('officeId'),
            type: type || '',
            createdBy: $.cookie('USER_ID')
        }),
        contentType: 'application/json',
        timeout: 15000,
        success: function (result) {
            if (cmisPayloadFailed(result)) {
                deferred.reject(cmisPayloadMessage(result, 'PPIS could not delete this docket. It is still active in CMIS.'));
            } else {
                deferred.resolve(result);
            }
        },
        error: function (xhr) {
            deferred.reject(cmisAjaxMessage(xhr, 'PPIS could not delete this docket. It is still active in CMIS.'));
        }
    });
    return deferred.promise();
}

function cmisAjaxMessage(xhr, fallback) {
    var body = xhr && (xhr.responseJSON || null);
    if (!body && xhr && xhr.responseText) {
        try {
            body = JSON.parse(xhr.responseText);
        } catch (e) {
            body = null;
        }
    }
    var msg = cmisPayloadMessage(body, '');
    if (msg) {
        return msg;
    }
    if (xhr && xhr.status) {
        return (fallback || 'Request failed.') + ' (HTTP ' + xhr.status + ')';
    }
    return fallback || 'Request failed.';
}

function cmisPpisUploadRetryable(xhr) {
    var status = xhr ? xhr.status : 0;
    if (!status || status === 408 || status === 429) {
        return true;
    }
    return status >= 500 && status <= 599;
}

/* Five retries after the first attempt. A rejection the server already answered is not retried. */
function cmisPostPpisFile(formData, fileName) {
    var deferred = $.Deferred();
    var retriesLeft = 5;
    var label = fileName || 'File';

    function send() {
        $.ajax({
            url: PPIS_path_upload + '/file/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (cmisPayloadFailed(response)) {
                    deferred.reject(label + ': ' + cmisPayloadMessage(response, 'Upload was rejected.'));
                    return;
                }
                deferred.resolve(response);
            },
            error: function (xhr) {
                var detail = cmisAjaxMessage(xhr, 'Upload failed.');
                if (cmisPpisUploadRetryable(xhr) && retriesLeft > 0) {
                    retriesLeft--;
                    send();
                    return;
                }
                if (retriesLeft === 0) {
                    deferred.reject(label + ': Upload failed after 5 retries. Last error: ' + detail);
                    return;
                }
                deferred.reject(label + ': ' + detail);
            }
        });
    }

    send();
    return deferred.promise();
}

function cmisUploadedFileRecord(response, fileName) {
    var data = response;
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = null;
        }
    }
    var id = null;
    if (data && typeof data === 'object') {
        id = data.id || data.fileId || (data.data && data.data.id) || (data.file && data.file.id) || (data.content && data.content.id) || null;
    }
    return { id: id, name: fileName || '' };
}

function cmisDeleteUploadedFiles(files) {
    var jobs = [];
    (files || []).forEach(function (file) {
        if (!file || !file.id) {
            return;
        }
        jobs.push($.ajax({
            url: PPIS_path_upload + '/file/delete/' + file.id,
            method: 'GET'
        }));
    });
    if (!jobs.length) {
        return $.Deferred().resolve().promise();
    }
    return $.when.apply($, jobs);
}

function cmisResetDocketTransaction() {
    window.__cmisPendingCancels = [];
    window.__cmisPendingPpis = null;
    window.__cmisUploadedFiles = [];
}

function cmisRestoreDocketForm() {
    $(".modal-loader").addClass("hidden");
    var $modal = $(".modal.in, .modal.show");
    if (!$modal.length) {
        $modal = $(".modal:visible");
    }
    $modal.find("button").prop("disabled", false);
    $modal.find(".modal-form input, .modal-form select, .modal-form textarea").prop("disabled", false);
}

function cmisCancelTableForUrl(url, payload) {
    if (payload && payload.table) {
        return payload.table;
    }
    var name = String(url || '').split('/').pop();
    var map = {
        F21T2_RCV: 'F21T2_RCV',
        F21T2_ACTED: 'F21T2_ACTED',
        F21T4: 'F21T4',
        F21T6_RCV: 'F21T6_RCV',
        F21T6_CMPLTD: 'F21T6_CMPLTD',
        updateF5T2_RCV: 'F5T2_RCV',
        updateF5T2_ACTED: 'F5T2_ACTED',
        updateF5T2_NOTACTED: 'F5T2_NOTACTED',
        F5T4: 'F5T4',
        F5T6_RCV: 'F5T6_RCV',
        F5T6_CMPLTD: 'F5T6_CMPLTD',
        F5T8: 'F5T8',
        F5T9: 'F5T9',
        F5T11: 'F5T11',
        F5T13_RCV: 'F5T13_RCV',
        F5T13_TERM: 'F5T13_TERM',
        upsertMasterlist: 'masterlist'
    };
    return map[name] || '';
}

function cmisArmDocketCancel(url, saveResult, payload) {
    var id = saveResult && (saveResult.id || saveResult.inserted_id);
    var table = cmisCancelTableForUrl(url, payload);
    if (!table || id == null || id === '') {
        return;
    }
    var docketNo = (payload && (payload.docket_no || payload.SDOCKETNO)) || '';
    window.__cmisPendingCancels = window.__cmisPendingCancels || [];
    window.__cmisPendingCancels.push(function () {
        return $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/cancelFailedCreate', JSON.stringify({
            id: id,
            table: table,
            docket_no: docketNo,
            created_by: $.cookie("USER_ID")
        }));
    });
}

function cmisCancelOpenDocket(message) {
    var detail = (message && String(message).trim() && String(message).trim() !== 'undefined')
        ? String(message).trim()
        : 'The request failed.';
    var cancels = window.__cmisPendingCancels || [];
    var files = window.__cmisUploadedFiles || [];
    window.__cmisPendingCancels = [];
    window.__cmisPendingPpis = null;
    window.__cmisUploadedFiles = [];

    var jobs = cancels.map(function (cancel) {
        return cancel();
    });
    jobs.push(cmisDeleteUploadedFiles(files));

    $.when.apply($, jobs).always(function () {
        var cancelFailed = false;
        for (var i = 0; i < cancels.length; i++) {
            var res = arguments[i];
            if ($.isArray(res)) {
                res = res[0];
            }
            if (res && typeof res.status === 'string' && res.status !== 'SUCCESS') {
                cancelFailed = true;
            }
        }
        var text = detail + '\n\nDocket creation was canceled.';
        if (cancelFailed) {
            text += '\n\nThe new docket could not be removed automatically. Delete it before trying again.';
        }
        alert(text);
        cmisRestoreDocketForm();
    });
}

function cmisAfterAttachment(uploadPromise) {
    uploadPromise.done(function (uploaded) {
        window.__cmisUploadedFiles = uploaded || [];
        var ppis = window.__cmisPendingPpis;
        window.__cmisPendingPpis = null;
        if (typeof ppis !== 'function') {
            location.reload();
            return;
        }
        ppis().done(function () {
            location.reload();
        }).fail(function (ppisMessage) {
            cmisCancelOpenDocket(ppisMessage || 'Docket creation failed.');
        });
    }).fail(function (uploadMessage) {
        cmisCancelOpenDocket(uploadMessage || 'File attachment failed.');
    });
}

function cmisTableRequestUrl(settings) {
    var ajax = settings && settings.ajax;
    if (typeof ajax === 'string') {
        return ajax;
    }
    if (ajax && typeof ajax.url === 'string') {
        return ajax.url;
    }
    var xhr = settings && settings.jqXHR;
    return (xhr && xhr.responseURL) ? xhr.responseURL : '';
}

function cmisTableMissingToken(settings) {
    var url = cmisTableRequestUrl(settings);
    if (url.indexOf('/file/') === -1) {
        return false;
    }
    var xhr = settings && settings.jqXHR;
    var status = xhr ? xhr.status : 0;
    if (status === 401 || status === 403) {
        return true;
    }
    var body = (xhr && xhr.responseText) ? xhr.responseText : '';
    return window.__cmisFileTokenMissing === true && /token/i.test(body);
}

function cmisPromptMissingTokenLogout() {
    if (window.__cmisTokenLogoutStarted) {
        return;
    }
    window.__cmisTokenLogoutStarted = true;
    alert('Your session has expired. Click OK to sign back in to UAMS, then sign in to the Expansion of Case Management Information System.');

    try {
        localStorage.clear();
    } catch (e) {}
    try {
        sessionStorage.clear();
    } catch (e) {}

    var cacheCleared = $.Deferred();
    if (window.caches && typeof caches.keys === 'function') {
        var cacheTimer = setTimeout(function () {
            cacheCleared.resolve();
        }, 1500);
        caches.keys().then(function (names) {
            return Promise.all(names.map(function (name) {
                return caches.delete(name);
            }));
        }).then(function () {
            clearTimeout(cacheTimer);
            cacheCleared.resolve();
        }, function () {
            clearTimeout(cacheTimer);
            cacheCleared.resolve();
        });
    } else {
        cacheCleared.resolve();
    }

    var signedOut = false;
    cacheCleared.always(function () {
        if (signedOut) {
            return;
        }
        signedOut = true;

        var email = (typeof $.cookie === 'function') ? $.cookie('USER_EMAIL') : '';
        var userId = (typeof $.cookie === 'function') ? $.cookie('USER_ID') : '';
        var body = JSON.stringify({
            USER_EMAIL: email || '',
            USER_ID: userId || ''
        });
        var uamsLogout = __cmis_local
            ? '/ppa-api-uams/wsv1/Api/doLogout'
            : (window.location.protocol + '//uams.probation.gov.ph/ppa-api-uams/wsv1/Api/doLogout');
        var uamsLogin = __cmis_local
            ? '/ppa-uams/login'
            : (window.location.protocol + '//uams.probation.gov.ph/ppa-uams/login');

        var finishLogout = function () {
            if (typeof $.cookie === 'function') {
                var cookies = $.cookie();
                for (var cookie in cookies) {
                    $.removeCookie(cookie);
                }
            }
            window.location.replace(uamsLogin);
        };
        $.ajax({
            url: '/ppa-cmis-api_origin/wsv1/file/end',
            method: 'POST',
            timeout: 4000
        }).always(function () {
            if (!email) {
                finishLogout();
                return;
            }
            $.when(
                $.ajax({
                    url: uamsLogout,
                    method: 'POST',
                    contentType: 'application/json',
                    data: body,
                    timeout: 4000
                }),
                $.ajax({
                    url: '/ppa-cmis-api_origin/wsv1/Api/doLogout',
                    method: 'POST',
                    contentType: 'application/json',
                    data: body,
                    timeout: 4000
                })
            ).always(finishLogout);
        });
    });
}

if (window.jQuery && jQuery.fn.dataTable) {
    jQuery.fn.dataTable.ext.errMode = function (settings, techNote, message) {
        if (cmisTableMissingToken(settings)) {
            cmisPromptMissingTokenLogout();
            return;
        }
        alert(message);
    };
}

function cmisPpisFileFieldInvalid(fieldId) {
    var el = document.getElementById(fieldId);
    if (!el || String(el.type).toLowerCase() !== 'file' || !el.files || !el.files.length) {
        return false;
    }
    if (!cmisInvalidPpisFiles(el.files).length) {
        return false;
    }
    var $el = $('#' + fieldId);
    $el.addClass('error_field');
    $("<p class='err_msg color-red font_12 i'>*Only .pdf and .bmp files are allowed</p>").insertAfter($el);
    return true;
}

$(document).on('change', 'input[type="file"]', function () {
    var accept = (this.getAttribute('accept') || '').toLowerCase().replace(/\s/g, '');
    if (accept.indexOf('.pdf') === -1 || accept.indexOf('.bmp') === -1) {
        return;
    }
    if (!this.files || !this.files.length) {
        return;
    }
    if (cmisRejectPpisFiles(this.files)) {
        this.value = '';
    }
});

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms = (typeof $.wms !== 'undefined') ? $.wms : {};

$.wms = (function() {

   var ___mode = true;
   var ___production = false;
    

    var __urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
    }

    var __debug = function(){
        return ___mode;
    }

    var ___ctx = '';
    /*var ___ctx = 'https://cmis.probation.gov.ph';
    if(___production == true){
         ___ctx = "https://cmis.probation.gov.ph/api";
    }*/


    var __setContext = function(newctx) {
        ___ctx = newctx;
    };


    function upper(obj) {
      for (var prop in obj) {
      if (typeof obj[prop] === 'string') {
        obj[prop] = obj[prop].toUpperCase();
      }
      if (typeof obj[prop] === 'object') {
        upper(obj[prop]);
        }
      }
      return obj;
    }

    var __sanitize = function(data){
        var temp = JSON.stringify(data);
        temp = temp.replace(/\:null/gi, "\:\"\"")
        //console.log(temp);
        //temp = temp.toUpperCase();
        data = JSON.parse(temp);
        //console.log(data);
        return data;
    }

     var __upper = function(data){
        var temp = JSON.stringify(data);
        data = upper(JSON.parse(temp));
        //console.log(data);
        return data;
    }
    
    var __getContext = function() {
        return ___ctx;
    };

    var __getImgPath = function(){
        //return "/wms-portal/";
        return "/";
    }
    var __executeGet = function (path) {
        var dfd = $.Deferred();
        $.get(path, function(data) {})
        .done(function(data){
            dfd.resolve(data);
        })
        .fail(function(qXHR, textStatus, errorThrown){
            dfd.resolve({
                status : 'ERROR',
                message : errorThrown
            });
        })
        .always(function(data){

        });
        return dfd.promise();
    };
    var __executePost = function(path, jsonObj, customLoader) {
        path = $.wms.getContextPath() + path;
        var d = $.Deferred();
        if(customLoader != ""){
            $("#"+customLoader).show();
        }
        $.ajax({
            method: "POST",
            url: path,
            dataType: "json",
            data: jsonObj
        }).done(function (data, textStatus, jqXHR) {
            if(customLoader != ""){
                $("#"+customLoader).hide();
            }
            d.resolve(data)
        }).fail(function (jqXHR, textStatus, errorThrown,request) {
            console.log('---FAILED---');
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log('---FAILED---');
            
            d.resolve({
                status : 'ERROR',
                message : request
            });
            
            if(customLoader != ""){
                $("#"+customLoader).hide();
            }
        });
        
        return d.promise();
    };

    var __executeExternalPost = function(path, jsonObj, customLoader) {
        path = $.wms.getContext() + path;
        var d = $.Deferred();
        if(customLoader != ""){
            $("#"+customLoader).show();
            $("#"+customLoader).removeClass("hide");
        }
        $.ajax({
            method: "POST",
            url: path,
            dataType: "json",
            headers: {
                // 'Content-Type': 'multipart/form-data;'
                'Content-Type':'application/json'
            },
            data: jsonObj
        }).done(function (data, textStatus, jqXHR) {
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
            d.resolve(data)
        }).fail(function (jqXHR, textStatus, errorThrown,request) {
            console.log('---FAILED---');
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log('---FAILED---');
            
            d.resolve({
                status : 'ERROR',
                message : request
            });
            
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
        });
        
        return d.promise();
    };
    var __executeExternalPost2 = function(path, jsonObj, customLoader) {
        path = $.wms.getContext() + path;
        var d = $.Deferred();
        if(customLoader != ""){
            $("#"+customLoader).show();
            $("#"+customLoader).removeClass("hide");
        }
        $.ajax({
            method: "POST",
            url: path,
            dataType: "json",
            data: jsonObj
        }).done(function (data, textStatus, jqXHR) {
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
            d.resolve(data)
        }).fail(function (jqXHR, textStatus, errorThrown,request) {
            console.log('---FAILED---');
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log('---FAILED---');
            
            d.resolve({
                status : 'ERROR',
                message : request
            });
            
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
        });
        
        return d.promise();
    };
    var __executeExternalPut = function(path, jsonObj, customLoader) {
        path = $.wms.getContext() + path;
        var d = $.Deferred();
        if(customLoader != ""){
            $("#"+customLoader).show();
            $("#"+customLoader).removeClass("hide");
        }
        $.ajax({
            method: "PUT",
            url: path,
            dataType: "json",
            headers: {
                'Content-Type':'application/json'
            },
            data: jsonObj
        }).done(function (data, textStatus, jqXHR) {
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
            d.resolve(data)
        }).fail(function (jqXHR, textStatus, errorThrown,request) {
            console.log('---FAILED---');
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log('---FAILED---');
            
            d.resolve({
                status : 'ERROR',
                message : request
            });
            
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
        });
        
        return d.promise();
    };

    var __executeExternalDelete = function(path, jsonObj, customLoader) {
        path = $.wms.getContext() + path;
        var d = $.Deferred();
        if(customLoader != ""){
            $("#"+customLoader).show();
            $("#"+customLoader).removeClass("hide");
        }
        $.ajax({
            method: "DELETE",
            url: path,
            dataType: "json",
            headers: {
                'Content-Type':'application/json'
            },
            data: jsonObj
        }).done(function (data, textStatus, jqXHR) {
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
            d.resolve(data)
        }).fail(function (jqXHR, textStatus, errorThrown,request) {
            console.log('---FAILED---');
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log('---FAILED---');
            
            d.resolve({
                status : 'ERROR',
                message : request
            });
            
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
        });
        
        return d.promise();
    };


    var __executeExternalGet = function(path, customLoader) {
        // path = $.wms.getContextPath() + path;
        var d = $.Deferred();
        if(customLoader != ""){
            $("#"+customLoader).show();
            $("#"+customLoader).removeClass("hide");
        }
        $.ajax({
            method: "GET",
            url: path,
            dataType: "json",
        }).done(function (data, textStatus, jqXHR) {
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
            d.resolve(data)
        }).fail(function (jqXHR, textStatus, errorThrown,request) {
            console.log('---FAILED---');
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log('---FAILED---');
            
            d.resolve({
                status : 'ERROR',
                message : request
            });
            
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
        });
        
        return d.promise();
    };



    var __executeFile = function(path, jsonObj) {
        var d = $.Deferred();
            $(".overlay-back").show();
            $(".loadDiv").show();
        $.ajax({
            method: "POST",
            url: path,
            dataType: "json",
            cache: false,
            "mimeType": "multipart/form-data",
            processData: false,
            contentType: false,
            /*data: JSON.stringify(jsonObj)*/
            data: jsonObj
        }).done(function (data, textStatus, jqXHR) {
            d.resolve(data);
            $(".loadDiv").hide();
            $(".overlay-back").hide();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('---FAILED---');
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log('---FAILED---');
            
            d.resolve({
                status : 'ERROR',
                message : errorThrown
            });
            $(".overlay-back").hide();
            $(".loadDiv").hide();
        });
        return d.promise();
    };
    
    var __CheckCookie = function() {
        if (typeof  $.cookie('userID') != "undefined"){
            //Redirect to logout page
        }
    }
    
    return {
        setContext:__setContext,
        getContext : __getContext,
        getImgPath : __getImgPath,
        executePost : __executePost,
        executeExternalPost : __executeExternalPost,
        executeExternalPost2 :__executeExternalPost2,
        executeExternalPut : __executeExternalPut,
        executeExternalDelete : __executeExternalDelete,
        executeGet : __executeGet,
        executeFile : __executeFile,
        executeExternalGet : __executeExternalGet,
        CheckCookie :__CheckCookie,
        debug : __debug,
        urlParam : __urlParam,
        sanitize : __sanitize,
        upper : __upper,
    };
}());
