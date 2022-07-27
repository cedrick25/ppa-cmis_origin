/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.form50 = (typeof $.wms.form50 !== 'undefined') ? $.wms : {};

$.wms.form50 = (function() {

    var ___validateSaveCarryOver = function(allowedDocket,docket,requiredField,check,checkTable){
        $(".err_msg").remove()
        docket.removeClass("error_field")
        var dontSubmit = false;
        var docketSeries = docket.val().split("-")
        var error_msg = "";
        console.log(allowedDocket)
        console.log(docketSeries[0].toUpperCase())
        console.log(allowedDocket.indexOf(docketSeries[0].toUpperCase()));
        if(allowedDocket.indexOf(docketSeries[0].toUpperCase()) < 0 ){ 
            dontSubmit = true;
            docket.addClass("error_field")
            $("<p class='err_msg color-red font_12 i'>*Invalid Docket No.</p>").insertAfter(docket)
            var invalidDocket = 1
        }else {
            var invalidDocket = 0
        }

        if(check != undefined){
            var payload = {
                "checkTable" : checkTable,
                "Y_M" : $.wms.urlParam('date'),
                "docket_no" : docket.val(),
                "field_office" : $.wms.urlParam('field')
            }
            var required = 0;
            requiredField.forEach(function(data, value){
                if($("#"+data).val() == ""){
                    required += 1;
                    dontSubmit = true;
                    $("#"+data).addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*Required Field</p>").insertAfter(("#"+data))
                }else{
                    $("#"+data).removeClass("error_field");
                }
            });
            console.log(required);

            var d = $.Deferred();
            // $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
            //     if(result2.status == 'SUCCESS'){
            //         dontSubmit = true;

            //         docket.addClass("error_field")
            //         $("<p class='err_msg color-red font_12 i'>*Docket existing in "+checkTable.join("/")+"</p>").insertAfter(docket)
            //     }else{
                    // dontSubmit = false;
                    if (required === 0 && invalidDocket === 0) {
                        
                        dontSubmit = false;
                    }else{
                        dontSubmit = true;

                    }

                // }
               
                if(dontSubmit){
                    d.resolve(false);
                }else{
                    d.resolve(true);
                }

                
            // });
            return d.promise();
            
            
           
        }else{
            requiredField.forEach(function(data){
            if($("#"+data).val() == ""){
                dontSubmit = true;
                $("#"+data).addClass("error_field");
                $("<p class='err_msg color-red font_12 i'>*Required Field</p>").insertAfter(("#"+data))
            }else{
                $("#"+data).removeClass("error_field");
            }
            });

            if(dontSubmit){
                return false;
            }else{
                return true;    
            }

            
        }

    }


    var __attachF50T1PageEvent = function() {
        console.log("f50t1 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F50T1_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $('#add_action').on('change', function() {
          console.log(this.value)
          if (this.value == "TRANSFERRED_REFERRED") {
            $(".data_rcv_chng").html('Date Transferre/Referred')
          }else if(this.value == "REFERRED_FOR_DDEXAM"){
            $(".data_rcv_chng").html('Date Referred')
          }else{
            $(".data_rcv_chng").html('Date Received')
          }
        });

        $('#edit_action').on('change', function() {
          console.log(this.value)
          if (this.value == "TRANSFERRED_REFERRED") {
            $(".data_rcv_chng").html('Date Transferre/Referred')
          }else if(this.value == "REFERRED_FOR_DDEXAM"){
            $(".data_rcv_chng").html('Date Referred')
          }else{
            $(".data_rcv_chng").html('Date Received')
          }
        });

        $.wms.executeExternalGet('http://192.168.1.184:8000/F50t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                if (data.actionType == "APPLICANTS_GIVEN") {
                    $('.F50T1_tbody_a').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReceived+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F50_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F50_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>"
                    )
            
                } else if (data.actionType == "VERIFIED_APPLICATION") {
                    $('.F50T1_tbody_b').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReceived+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F50_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F50_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>"
                    )
                
                } else if (data.actionType == "TRANSFERRED_REFERRED") {
                    $('.F50T1_tbody_c').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReceived+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F50_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F50_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>"
                    )
                
                } else if (data.actionType == "REFERRED_FOR_DDEXAM") {
                    $('.F50T1_tbody_d').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReceived+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F50_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F50_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>"
                    )
                
                } else if (data.actionType == "DDE_REPORTS_RECEIVED") {
                    $('.F50T1_tbody_d').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReceived+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F50_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F50_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>"
                    )
                
                }
            });

            $(".btn-delete").unbind("click").on("click",function(){
                var data_id     = $(this).data("id");
                var docket_no   = $(this).data("docket");
                var profid      = $.cookie("USER_ID");
                console.log(data_id);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                //Delete
                $(".deleteProceedButton").unbind("click").on("click",function(){
                    $(this).attr('disabled',true)
                    $(".modal-loader").removeClass("hidden")

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F50t1/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                            var form = "Delete: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
                            var payload_audit = {
                                "created_by" : $.cookie("USER_ID"),
                                "module" : "CASELOAD",
                                "action" : form
                                
                            }
                            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                                location.reload();
                            });
                        }
                    });
                })
            });

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalGet('http://192.168.1.184:8000/F50t1/'+data_id).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.response;
                        $("#edit_docket_no").val(payload.docketNumber).attr("disabled",true)
                        $("#edit_offender_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_offender_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_offender_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_action").val(payload.actionType).trigger('change')
                        $("#edit_date_rcv").val(payload.dateReceived)
                       
                            //Update proceed
                            $(".editProceedButton").unbind("click").on("click",function(){
                                $(this).attr('disabled',true)
                                $(".modal-loader").removeClass("hidden")

                                var d = new Date();
                                var month = d.getMonth()+1;
                                var day = d.getDate();
                                var output = d.getFullYear() + '-' +
                                    (month<10 ? '0' : '') + month + '-' +
                                    (day<10 ? '0' : '') + day;
                                var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                                var date_time = output +" "+time;

                                var payload_update = {
                                    "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                    "updatedBy"             : $.cookie("USER_ID"),
                                    "source"                : "2",
                                    "encodingMonth"         : $.wms.urlParam('date'),
                                    "fieldOffice"           : $.wms.urlParam('field'),
                                    "fieldOfficeId"         : $.wms.urlParam('officeId'),
                                    "actionType"            : $("#edit_action").val(),
                                    "dateReceived"          : $("#edit_date_rcv").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_offender_fname").val(),
                                        "middleName"            : $("#edit_offender_mname").val(),
                                        "lastName"              : $("#edit_offender_lname").val(),
                                        "suffix"                : $("#edit_offender_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F50t1/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        var form = "Updated Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". " + JSON.stringify(result.response);
                                        var payload_audit = {
                                            "created_by" : $.cookie("USER_ID"),
                                            "module" : "CASELOAD",
                                            "action" : form
                                            
                                        }
                                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                                            location.reload();
                                        });
                                    }else{
                                        //Error Prompt
                                    }
                                });
                            })
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            });

        });    

        $(".editSubmitButton").unbind("click").on("click",function(){
            $(".modal-form input").attr("disabled",true);
            $(".modal-form select").attr("disabled",true);
            $(".editSubmitButton").addClass("hidden");
            $(".confirmEdit").removeClass("hidden")
            $(".editProceedButton").removeClass("hidden")
        });

        $(".editCancelButton").unbind("click").on("click",function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".confirmEdit").addClass("hidden")
            $(".editSubmitButton").removeClass("hidden")
            $(".editProceedButton").addClass("hidden")
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'VC' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_date_rcv', ];
            var check = true
            var checkTable = ['F50T1', 'F50T2']

            ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".addSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            $(".modal-form input").attr("disabled",false);
            $(".confirmAdd").addClass("hidden")
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
            $(".btn-reset").trigger("click")
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                "createdBy"             : $.cookie("USER_ID"),
                "status"                : true,
                "source"                : "2",
                "encodingMonth"         : $.wms.urlParam('date'),
                "fieldOffice"           : $.wms.urlParam('field'),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "actionType"            : $("#add_action").val(),
                "dateReceived"          : $("#add_date_rcv").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_offender_fname").val(),
                    "middleName"            : $("#add_offender_mname").val(),
                    "lastName"              : $("#add_offender_lname").val(),
                    "suffix"                : $("#add_offender_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.184:8000/F50t1/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")

                        var form = "Added Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". " + JSON.stringify(result.response);
                        var payload_audit = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                            location.reload();
                        });

                }else{
                    $(".err_msg").remove()
                    $(".addProceedButton").attr('disabled',false)
                    $(".modal-loader").addClass("hidden")
                    $("#add_docket_no").attr('disabled',false)
                    $("#add_docket_no").addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))
                }
            });    
        })

        var __download_print = function(){
            console.log("checked")
            var __maxTableSize = 0;
            var __counter = 0;

            $.wms.executeExternalGet('http://192.168.1.184:8000/F50t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'&actionType='+'APPLICANTS_GIVEN'+'').done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    console.log(__maxTableSize);
                }

                function checkPendingRequest() {
                    if ($.active > 0) {
                        console.log("waiting...")
                        window.setTimeout(checkPendingRequest, 100);
                    }
                    else {
                        r = 1;
                        result.content.forEach(function(data){
                            data = $.wms.upper($.wms.sanitize(data))
                            var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
        
                            $("#r"+r+"c1").html(data.docketNumber);
                            $("#r"+r+"c2").html(fullname);
                            $("#r"+r+"c3").html(data.dateReceived);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            $.wms.executeExternalGet('http://192.168.1.184:8000/F50t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'&actionType='+'VERIFIED_APPLICATION'+'').done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    console.log(__maxTableSize);
                }

                function checkPendingRequest() {
                    if ($.active > 0) {
                        console.log("waiting...")
                        window.setTimeout(checkPendingRequest, 100);
                    }
                    else {
                        r = 1;
                        result.content.forEach(function(data){
                            data = $.wms.upper($.wms.sanitize(data))
                            var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
        
                            $("#r"+r+"c4").html(fullname);
                            $("#r"+r+"c5").html(data.dateReceived);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            $.wms.executeExternalGet('http://192.168.1.184:8000/F50t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'&actionType='+'TRANSFERRED_REFERRED'+'').done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    console.log(__maxTableSize);
                }

                function checkPendingRequest() {
                    if ($.active > 0) {
                        console.log("waiting...")
                        window.setTimeout(checkPendingRequest, 100);
                    }
                    else {
                        r = 1;
                        result.content.forEach(function(data){
                            data = $.wms.upper($.wms.sanitize(data))
                            var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
        
                            $("#r"+r+"c6").html(fullname);
                            $("#r"+r+"c7").html(data.dateReceived);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            $.wms.executeExternalGet('http://192.168.1.184:8000/F50t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'&actionType='+'REFERRED_FOR_DDEXAM'+'').done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    console.log(__maxTableSize);
                }

                function checkPendingRequest() {
                    if ($.active > 0) {
                        console.log("waiting...")
                        window.setTimeout(checkPendingRequest, 100);
                    }
                    else {
                        r = 1;
                        result.content.forEach(function(data){
                            data = $.wms.upper($.wms.sanitize(data))
                            var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
        
                            $("#r"+r+"c8").html(fullname);
                            $("#r"+r+"c9").html(data.dateReceived);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            $.wms.executeExternalGet('http://192.168.1.184:8000/F50t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'&actionType='+'DDE_REPORTS_RECEIVED'+'').done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    console.log(__maxTableSize);
                }

                function checkPendingRequest() {
                    if ($.active > 0) {
                        console.log("waiting...")
                        window.setTimeout(checkPendingRequest, 100);
                    }
                    else {
                        r = 1;
                        result.content.forEach(function(data){
                            data = $.wms.upper($.wms.sanitize(data))
                            var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
        
                            $("#r"+r+"c10").html(fullname);
                            $("#r"+r+"c11").html(data.dateReceived);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            var __download_print_list = function(){

                if(__counter == 5){
                    console.log("FINISH")
                    console.log(__maxTableSize);
                    if(__maxTableSize > 0){
                        $(".T_F50T1_download_print_tbody").empty()
                        for(i=1;i<=__maxTableSize;i++){
                            $(".T_F50T1_download_print_tbody").append(
                                "<tr>"+
                                    "<td id='r"+i+"c1' class=''>"+
                                    "<td id='r"+i+"c2' class=''>"+
                                    "<td id='r"+i+"c3' class=''>"+
                                    "<td id='r"+i+"c4' class=''>"+
                                    "<td id='r"+i+"c5' class=''>"+
                                    "<td id='r"+i+"c6' class=''>"+
                                    "<td id='r"+i+"c7' class=''>"+
                                    "<td id='r"+i+"c8' class=''>"+
                                    "<td id='r"+i+"c9' class=''>"+
                                    "<td id='r"+i+"c10' class=''>"+
                                    "<td id='r"+i+"c11' class=''>"+
                                "</tr>"
                            )
                        }
                    }else{
                        $(".T_F50T1_download_print_tbody").append(
                                "<tr>"+
                                    "<td colspan='11' class='center b'>NONE</td>"+
                                "</tr>");
                    }
                };
                // Download
                $(".btn-download").unbind("click").on("click",function(){
                    console.log("clicked")
                   
                    $("#T_F50T1_download_print").table2excel({
                        // exclude CSS class
                        exclude: ".options",
                        name: "Form50-Table1",
                        filename: "Form50-Table1.xls", //do not include extension
                        fileext: ".xls",
                        preserveColors: true
                      }); 
                });
            };
        };
        __download_print();
    };

    var __attachF50T2PageEvent = function() {
        console.log("f50t2 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F50T2_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        $('#add_action').on('change', function() {
            console.log(this.value)
            if (this.value == "VCFC") {
                $(".v_filed").removeClass("hide")
                $(".v_court").removeClass("hide")
                $(".v_hearing").addClass("hide")
                $(".v_court_d").addClass("hide")
                $(".v_diposed").addClass("hide")

            }else if(this.value == "HC"){
                $(".v_court").removeClass("hide")
                $(".v_hearing").removeClass("hide")
                $(".v_filed").addClass("hide")
                $(".v_court_d").addClass("hide")
                $(".v_diposed").addClass("hide")

            }else if(this.value == "PAUBC"){
                $(".v_diposed").removeClass("hide")
                $(".v_court_d").removeClass("hide")
                $(".v_filed").addClass("hide")
                $(".v_court").addClass("hide")
                $(".v_hearing").addClass("hide")
                
            }else{
                $(".v_filed").removeClass("hide")
                $(".v_court").removeClass("hide")
                $(".v_hearing").addClass("hide")
                $(".v_court_d").addClass("hide")
                $(".v_diposed").addClass("hide")
            }
        });
        $('#edit_action').on('change', function() {
            console.log(this.value)
            if (this.value == "VCFC") {
                $(".v_filed").removeClass("hide")
                $(".v_court").removeClass("hide")
                $(".v_hearing").addClass("hide")
                $(".v_court_d").addClass("hide")
                $(".v_diposed").addClass("hide")

            }else if(this.value == "HC"){
                $(".v_court").removeClass("hide")
                $(".v_hearing").removeClass("hide")
                $(".v_filed").addClass("hide")
                $(".v_court_d").addClass("hide")
                $(".v_diposed").addClass("hide")

            }else if(this.value == "PAUBC"){
                $(".v_diposed").removeClass("hide")
                $(".v_court_d").removeClass("hide")
                $(".v_filed").addClass("hide")
                $(".v_court").addClass("hide")
                $(".v_hearing").addClass("hide")
                
            }else{
                $(".v_filed").removeClass("hide")
                $(".v_court").removeClass("hide")
                $(".v_hearing").addClass("hide")
                $(".v_court_d").addClass("hide")
                $(".v_diposed").addClass("hide")
            }
        });

        $.wms.executeExternalGet('http://192.168.1.184:8000/F50t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                if (data.actionType == "VCFC") {
                    $('.F50T2_tbody_a').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateFiled+"</td>"+
                        "<td>"+data.court+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F50_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F50_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>"
                    )
                } else if (data.actionType == "HC") {
                    $('.F50T2_tbody_b').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateHearing+"</td>"+
                        "<td>"+data.court+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F50_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F50_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>"
                    )

                } else if (data.actionType == "PAUBC") {
                    $('.F50T2_tbody_c').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.courtDisposition+"</td>"+
                        "<td>"+data.dateDisposed+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F50_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F50_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>"
                    )

                }

            });

            $(".btn-delete").unbind("click").on("click",function(){
                var data_id     = $(this).data("id");
                var docket_no   = $(this).data("docket");
                var profid      = $.cookie("USER_ID");
                console.log(data_id);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                //Delete
                $(".deleteProceedButton").unbind("click").on("click",function(){
                    $(this).attr('disabled',true)
                    $(".modal-loader").removeClass("hidden")

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F50t2/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                            var form = "Delete: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
                            var payload_audit = {
                                "created_by" : $.cookie("USER_ID"),
                                "module" : "CASELOAD",
                                "action" : form
                                
                            }
                            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                                location.reload();
                            });
                        }
                    });
                })
            });

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalGet('http://192.168.1.184:8000/F50t2/'+data_id).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.response;
                        $("#edit_docket_no").val(payload.docketNumber).attr("disabled",true)
                        $("#edit_offender_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_offender_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_offender_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_action").val(payload.actionType).trigger('change')
                        $("#edit_date_filed").val(payload.dateFiled)
                        $("#edit_court").val(payload.court)
                        $("#edit_disposition").val(payload.courtDisposition)
                        $("#edit_date_disposed").val(payload.dateDisposed)
                        $("#edit_date_hearing").val(payload.dateHearing)
                       
                            //Update proceed
                            $(".editProceedButton").unbind("click").on("click",function(){
                                $(this).attr('disabled',true)
                                $(".modal-loader").removeClass("hidden")

                                var d = new Date();
                                var month = d.getMonth()+1;
                                var day = d.getDate();
                                var output = d.getFullYear() + '-' +
                                    (month<10 ? '0' : '') + month + '-' +
                                    (day<10 ? '0' : '') + day;
                                var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                                var date_time = output +" "+time;

                                var payload_update = {
                                    "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                    "updatedBy"             : $.cookie("USER_ID"),
                                    "source"                : "2",
                                    "encodingMonth"         : $.wms.urlParam('date'),
                                    "fieldOffice"           : $.wms.urlParam('field'),
                                    "fieldOfficeId"         : $.wms.urlParam('officeId'),
                                    "actionType"            : $("#edit_action").val(),
                                    "dateFiled"             : $("#edit_date_filed").val(),
                                    "court"                 : $("#edit_court").val(),
                                    "courtDisposition"      : $("#edit_disposition").val(),
                                    "dateDisposed"          : $("#edit_date_disposed").val(),
                                    "dateHearing"           : $("#edit_date_hearing").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_offender_fname").val(),
                                        "middleName"            : $("#edit_offender_mname").val(),
                                        "lastName"              : $("#edit_offender_lname").val(),
                                        "suffix"                : $("#edit_offender_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F50t2/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        var form = "Updated Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". " + JSON.stringify(result.response);
                                        var payload_audit = {
                                            "created_by" : $.cookie("USER_ID"),
                                            "module" : "CASELOAD",
                                            "action" : form
                                            
                                        }
                                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                                            location.reload();
                                        });
                                    }else{
                                        //Error Prompt
                                    }
                                });
                            })
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            });

        });    

        $(".editSubmitButton").unbind("click").on("click",function(){
            $(".modal-form input").attr("disabled",true);
            $(".modal-form select").attr("disabled",true);
            $(".editSubmitButton").addClass("hidden");
            $(".confirmEdit").removeClass("hidden")
            $(".editProceedButton").removeClass("hidden")
        });

        $(".editCancelButton").unbind("click").on("click",function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".confirmEdit").addClass("hidden")
            $(".editSubmitButton").removeClass("hidden")
            $(".editProceedButton").addClass("hidden")
        });


        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'VC' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_date_rcv', ];
            var check = true
            var checkTable = ['F50T1', 'F50T2']

            ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".addSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            $(".modal-form input").attr("disabled",false);
            $(".confirmAdd").addClass("hidden")
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
            $(".btn-reset").trigger("click")
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                "createdBy"             : $.cookie("USER_ID"),
                "status"                : true,
                "source"                : "2",
                "encodingMonth"         : $.wms.urlParam('date'),
                "fieldOffice"           : $.wms.urlParam('field'),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "actionType"            : $("#add_action").val(),
                "dateFiled"             : $("#add_date_filed").val(),
                "court"                 : $("#add_court").val(),
                "courtDisposition"      : $("#add_disposition").val(),
                "dateDisposed"          : $("#add_date_disposed").val(),
                "dateHearing"           : $("#add_date_hearing").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_offender_fname").val(),
                    "middleName"            : $("#add_offender_mname").val(),
                    "lastName"              : $("#add_offender_lname").val(),
                    "suffix"                : $("#add_offender_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.184:8000/F50t2/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")

                        var form = "Added Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". " + JSON.stringify(result.response);
                        var payload_audit = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                            location.reload();
                        });

                }else{
                    $(".err_msg").remove()
                    $(".addProceedButton").attr('disabled',false)
                    $(".modal-loader").addClass("hidden")
                    $("#add_docket_no").attr('disabled',false)
                    $("#add_docket_no").addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))
                }
            });    
        })


        var __download_print = function(){
            console.log("checked")
            var __maxTableSize = 0;
            var __counter = 0;

            $.wms.executeExternalGet('http://192.168.1.184:8000/F50t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'&actionType='+'VCFC'+'').done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    console.log(__maxTableSize);
                }

                function checkPendingRequest() {
                    if ($.active > 0) {
                        console.log("waiting...")
                        window.setTimeout(checkPendingRequest, 100);
                    }
                    else {
                        r = 1;
                        result.content.forEach(function(data){
                            data = $.wms.upper($.wms.sanitize(data))
                            var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
        
                            $("#r"+r+"c1").html(fullname);
                            $("#r"+r+"c2").html(data.dateFiled);
                            $("#r"+r+"c3").html(data.court);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            $.wms.executeExternalGet('http://192.168.1.184:8000/F50t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'&actionType='+'HC'+'').done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    console.log(__maxTableSize);
                }

                function checkPendingRequest() {
                    if ($.active > 0) {
                        console.log("waiting...")
                        window.setTimeout(checkPendingRequest, 100);
                    }
                    else {
                        r = 1;
                        result.content.forEach(function(data){
                            data = $.wms.upper($.wms.sanitize(data))
                            var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
        
                            $("#r"+r+"c4").html(fullname);
                            $("#r"+r+"c5").html(data.dateHearing);
                            $("#r"+r+"c6").html(data.court);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            $.wms.executeExternalGet('http://192.168.1.184:8000/F50t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'&actionType='+'PAUBC'+'').done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    console.log(__maxTableSize);
                }

                function checkPendingRequest() {
                    if ($.active > 0) {
                        console.log("waiting...")
                        window.setTimeout(checkPendingRequest, 100);
                    }
                    else {
                        r = 1;
                        result.content.forEach(function(data){
                            data = $.wms.upper($.wms.sanitize(data))
                            var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
        
                            $("#r"+r+"c7").html(fullname);
                            $("#r"+r+"c8").html(data.courtDisposition);
                            $("#r"+r+"c9").html(data.dateDisposed);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            var __download_print_list = function(){

                if(__counter == 3){
                    console.log("FINISH")
                    console.log(__maxTableSize);
                    if(__maxTableSize > 0){
                        $(".T_F50T2_download_print_tbody").empty()
                        for(i=1;i<=__maxTableSize;i++){
                            $(".T_F50T2_download_print_tbody").append(
                                "<tr>"+
                                    "<td id='r"+i+"c1' class=''>"+
                                    "<td id='r"+i+"c2' class=''>"+
                                    "<td id='r"+i+"c3' class=''>"+
                                    "<td id='r"+i+"c4' class=''>"+
                                    "<td id='r"+i+"c5' class=''>"+
                                    "<td id='r"+i+"c6' class=''>"+
                                    "<td id='r"+i+"c7' class=''>"+
                                    "<td id='r"+i+"c8' class=''>"+
                                    "<td id='r"+i+"c9' class=''>"+
                                "</tr>"
                            )
                        }
                    }else{
                        $(".T_F50T2_download_print_tbody").append(
                                "<tr>"+
                                    "<td colspan='9' class='center b'>NONE</td>"+
                                "</tr>");
                    }
                };
                // Download
                $(".btn-download").unbind("click").on("click",function(){
                    console.log("clicked")
                   
                    $("#T_F50T2_download_print").table2excel({
                        // exclude CSS class
                        exclude: ".options",
                        name: "Form50-Table2",
                        filename: "Form50-Table2.xls", //do not include extension
                        fileext: ".xls",
                        preserveColors: true
                      }); 
                });
            };
        };
        __download_print();
    };

    var __attachF50VCCSPageEvent = function() {
        console.log("form50 caseload")
        var field_office =  $.wms.urlParam('field')
        var date =  $.wms.urlParam('date')
        var officeId =  $.wms.urlParam('officeId')
        var isocode      =  $.wms.urlParam('isocode')
        console.log(isocode)

        if (isocode == null) {
            $(".isocode_").val("PPA-FO-FR-050")
        } else if (isocode != null) {
            $(".isocode_").val(isocode)
        } else {
            $(".isocode_").val()
        }

        var payload = {
            field_id : officeId,
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/getRegionByFieldOfficeID',JSON.stringify(payload)).done(function (result) {

            if(result.status != undefined && result.status == "SUCCESS"){
                const region_name = result.payload.VALUE_
                __download_cert(region_name);
            }else{
                alert ("region Failed");
            }
        });


        $(".certUpload").unbind("click").on("click", function(){
            console.log("clicked")
            var fileToUpload = $('#fileupload').prop('files')[0];

            if (fileToUpload === undefined) {
                alert("Please Choose File Before Upload!")
            }else {
                var formdata = new FormData();
                formdata.append("files", fileupload.files[0], fileupload.files[0].name);

                $.wms.executeFile('http://192.168.1.184:8000/cert/upload?officeId='+officeId+'&yearMonth='+date+'&uploaderId='+$.cookie("USER_ID")+'&formTable=f50',formdata).done(function (result) {
                    console.log(result)
                    if(result){
                        __cert_list_upload();

                    }else{
                        // alert ("region Failed");
                    }
                });
            } 
        })
        var __cert_list_upload = function(){
            console.log("cert list")
            var payload = {
                encodingMonth : date,
                fieldOfficeId : officeId,
                formTable : "f50"
            }
            $.wms.executeExternalPost('http://192.168.1.184:8000/cert/list',JSON.stringify(payload)).done(function (result) {
                console.log(result)

                if (result.response.length != 0) {
                    $(".cert_upload").addClass("hidden")
                    $(".cert_tbody").empty()
                    result.response.forEach(function(data){
                        data = $.wms.upper($.wms.sanitize(data))
                        // var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                        // source = ((data.source==1) ? 'PIS' : 'MANUAL');
                        $('.cert_tbody').append("<tr>"+
                            "<td>"+data.uploaderId+"</td>"+
                            "<td>"+data.fileName+"</td>"+
                            "<td>"+data.createdDate+"</td>"+
                            "<td align='center' class='options'><a href="+'http://192.168.1.184:8000/cert/view/'+data.id+"><button class='access_F44_write btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a></td></tr>"
                        )
                    });
                } else {
                    $(".cert_upload").removeClass("hidden")
                }
                

                // $(".btn-view").unbind("click").on("click",function(){
                //     var data_id = $(this).data("id");
                //     var file_path = $(this).data("file_path");
                //     var file_name = $(this).data("file_name");
                //     console.log(data_id)
                //     console.log(file_path)
                //     console.log(file_name)

                //     // window.location.href="view_cert?certId="+data_id
                //     // var certId =  $.wms.urlParam('certId')

                //     // $.wms.executeExternalGet('http://192.168.1.184:8000/cert/view/'+data_id).done(function (result2) {
                //     //     console.log(result2);

                //     //     window.location='<iframe src="'+result2+'" height="100%" width="100%" scrolling="auto"></iframe>'

                //     // });

                // });

            });
        }
        __cert_list_upload();
        var __download_cert = function(region_name){
                console.log(region_name);

            var result = date.split('-');
            function GetMonthName(monthNumber) {
                  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                  return months[monthNumber - 1];
            }
            const nth = function(d) {
                if (d > 3 && d < 21) return 'th';
                switch (d % 10) {
                    case 1:  return "st";
                    case 2:  return "nd";
                    case 3:  return "rd";
                    default: return "th";
                }
            };

            const dateObj = new Date();
            const daten = dateObj.getDate();
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][dateObj.getMonth()];
            const year = dateObj.getFullYear();

            var dateString = daten+nth(daten)+' '+month+' '+year;
            // alert(dateString)

            var doc = new jsPDF();
            doc.setFontSize(14);         
            doc.text('PPA-RFO-FOR-006', 150, 20, {
                align: 'right',
            }); 
            doc.text(105, 30, 'Republic of the Philippines', 'center');  
            doc.text(105, 36, 'Department of Justice', 'center');  

            doc.setFontSize(13);         
            doc.text(105, 42, 'PAROLE AND PROBATION ADMINISTRATION', 'center');  

            doc.text(105, 50, region_name, 'center');  
            doc.text(105, 56, field_office, 'center');  
            doc.text(105, 64, '_____________________________________________________', 'center');  
            doc.text(105, 72, '____________________________________________', 'center'); 

            doc.text(105, 82, '__________________________________________________________________', 'center');  
            doc.text(105, 82, '__________________________________________________________________', 'center');  

            doc.setFontType("bold");
            doc.text(105, 100, 'CERTIFICATION', 'center');  

            doc.setFontType("normal");
            doc.text(30, 110, 'This is to certify that ______________________________________ has not', {
                align: 'left',
            });   
            doc.text(22, 118, 'received any referrals pertinent to the following for the month of '+GetMonthName(result[1])+',', {
                align: 'left',
            });   
            doc.text(22, 124, 'year '+result[0]+'.', {
                align: 'left',
            });   
            doc.setFontType("bold");
            doc.text(40, 136, 'Voluntary Confinement', {
                align: 'left',
            });    
            doc.setFontType("normal");
            doc.text(30, 148, 'Issued this '+daten+nth(daten)+' day of '+month+', '+year+' for whatever legal purpose this may', {
                align: 'left',
            });  
            doc.text(22, 154, 'serve.', {
                align: 'left',
            });  
       
            doc.text('________________________', 128, 175, {
                align: 'right',
            }); 
            doc.text('Name over Signature', 137, 181, {
                align: 'right',
            });
            doc.text('Position of the Head of the Field Office', 120, 187, {
                align: 'right',
            }); 
 

            $('.btn-download-cert').click(function () {
                // doc.fromHTML($('#content').html(), 15, 15, {
                //     'width': 170,
                //         'elementHandlers': specialElementHandlers
                // });         
                doc.save('Certificates.pdf');
            });
        }
        $(".office_selected").html(field_office)

        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        var month = monthNames[date.substr(5,6)-1];
        $(".year_selected").html(date.substr(0,4))
        $(".month_selected").html(month)

        $.wms.executeExternalGet('http://192.168.1.184:8000/F50Caseload?id='+officeId+'&yearMonth='+date).done(function (result) {
            console.log(result)
            $('.a').text(result.a);
            $('.B').text(result.b);
            $('.c').text(result.c);
            $('.d').text(result.d);
            $('.e').text(result.e);
            $('.f').text(result.f);
            $('.g').text(result.g);
            $('.h').text(result.h);
        });
    };

    

    return {
        attachF50T1PageEvent : __attachF50T1PageEvent,
        attachF50T2PageEvent : __attachF50T2PageEvent,
        attachF50VCCSPageEvent : __attachF50VCCSPageEvent
    };
}());
