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

function cmisArmDocketCancel(url, saveResult, payload) {
    var id = saveResult && (saveResult.id || saveResult.inserted_id);
    if (!url || id == null || id === '') {
        return;
    }
    var extra = {};
    if (payload && payload.table) {
        extra.table = payload.table;
    }
    if (String(url).indexOf('upsertMasterlist') !== -1) {
        extra.STATUS = 0;
    }
    window.__cmisPendingCancels = window.__cmisPendingCancels || [];
    window.__cmisPendingCancels.push(function () {
        var body = $.extend({
            id: id,
            status: "0",
            created_by: $.cookie("USER_ID"),
            method: "update"
        }, extra);
        return $.wms.executeExternalPost(url, JSON.stringify(body));
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
