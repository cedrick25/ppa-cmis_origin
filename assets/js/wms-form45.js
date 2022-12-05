/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.form45 = (typeof $.wms.form45 !== 'undefined') ? $.wms : {};

$.wms.form45 = (function() {


    var ___validateSave = function(allowedDocket,docket,requiredField,check,checkTable){
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
        }

        

        if(check != undefined){
            var payload = {
                "checkTable" : checkTable,
                "Y_M" : $.wms.urlParam('date'),
                "docket_no" : docket.val(),
                "field_office" : $.wms.urlParam('field')
            }

            requiredField.forEach(function(data){
                if($("#"+data).val() == ""){
                    dontSubmit = true;
                    $("#"+data).addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*Required Field</p>").insertAfter(("#"+data))
                }else{
                    $("#"+data).removeClass("error_field");
                }
            });
            var d = $.Deferred();
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                if(result2.status == 'SUCCESS'){

                }else{
                    dontSubmit = true;
                    docket.addClass("error_field")
                    $("<p class='err_msg color-red font_12 i'>*Docket not found in "+checkTable.join("/")+"</p>").insertAfter(docket)
                }
               
                if(dontSubmit){
                    d.resolve(false);
                }else{
                     d.resolve(true);
                }

                
            });
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




    var __attachF45T1PageEvent = function() {
        console.log("f45t1 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T1_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __carryoverF45t1 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F45t1"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t1/carryover',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){
                        $(".modal-loader").addClass("hidden")
                        $(".carryoverProceedButton").attr('disabled',false)
                        $("#modal-carryover").modal('toggle')
                        $(".btn-reset").trigger("click")
                        var form = "Carry Over: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
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
                        $(".carryoverProceedButton").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("<p class='err_msg color-red font_12 i'>*carry over failed</p>").insertAfter((".carryoverProceedButton"))
                    }
                });
            });
        };

        __carryoverF45t1();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t1?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
        }

        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T1_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.investigatingOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t1/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t1/'+data_id).done(function (result2) {
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
                        $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                        $("#edit_investigating_officer").val(payload.investigatingOfficer)
                       
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
                                    "investigatingOfficer"  : $("#edit_investigating_officer").val(),
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t1/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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



        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T1").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table1",
                filename: "Form45-Table1.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CSI', 'RCSI', 'TCSI' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_date_rcv', 'add_investigating_officer'];
            var check = true
            var checkTable = ['F45T1', 'F45T2']

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
                "investigatingOfficer"  : $("#add_investigating_officer").val(),
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
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
            $.wms.executeExternalPost('http://192.168.1.184:8000/F45t1/create',JSON.stringify(payload)).done(function (result) {
  
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

    };


    var __attachF45T2PageEvent = function() {
        console.log("F45t2 events")


        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T2_tbody_a').empty();
        $('.F45T2_tbody_b').empty();
        $(".form_loader").removeClass("hidden");
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __ref_received = function(){
            console.log("received")

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t2?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F45T2_tbody_a').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.criminalCaseNo+"</td>"+
                        "<td>"+data.dateReceived+"</td>"+
                        "<td>"+data.investigatingOfficer+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t2/'+data_id+'?&user='+profid).done(function (result) {
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
                    $("#modal-edit-rcv").modal();
                    $(".modal-loader2").removeClass("hidden")
                    $(".modal-form").addClass("hidden")
                    $.wms.executeExternalGet('http://192.168.1.184:8000/F45t2/'+data_id).done(function (result2) {
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
                            $("#edit_cc_no").val(payload.criminalCaseNo)
                            $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                            $("#edit_investigating_officer").val(payload.investigatingOfficer)
                           
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
                                        "criminalCaseNo"        : $("#edit_cc_no").val(),
                                        "investigatingOfficer"  : $("#edit_investigating_officer").val(),
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
                                    $.wms.executeExternalPut('http://192.168.1.184:8000/F45t2/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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



            //Download
            $(".btn-download").unbind("click").on("click",function(){
                console.log("clicked")
                var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            //     var payload = {
            //         "created_by" : $.cookie("USER_ID"),
            //         "module" : "CASELOAD",
            //         "action" : form
                    
            //     }
            //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            //     });
                $("#T_F45T2_a").table2excel({
                    // exclude CSS class
                    exclude: ".options",
                    name: "Form45-Table2",
                    filename: "Form45-Table2.xls", //do not include extension
                    fileext: ".xls",
                    preserveColors: true
                  }); 
            });

            //Add
            $(".addSubmitButton").unbind("click").on("click",function(){
                var allowedDocket= [ 'CSI', 'RCSI', 'TCSI' ];
                var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_date_rcv', 'add_investigating_officer'];
                var check = true
                var checkTable = ['F45T1', 'F45T2']

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
                    "criminalCaseNo"        : $("#add_cc_no").val(),
                    "investigatingOfficer"  : $("#add_investigating_officer").val(),
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
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t2/create',JSON.stringify(payload)).done(function (result) {
      
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


        }

        /// for refferals acted upon
        var __ref_acted = function(){
            console.log("acted")

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t2Acted?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t2Acted?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
                
                //Add
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t2Acted/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
                    console.log(result.response)

                    result.response.forEach(function(docket){

                        $(".docket_list").append($('<option>', {
                            value    : docket.docketNumber,
                            text     : docket.docketNumber,
                            "data-f" : docket.clientProfileDto.firstName,
                            "data-m" : docket.clientProfileDto.middleName,
                            "data-l" : docket.clientProfileDto.lastName,
                            "data-s" : docket.clientProfileDto.suffix,
                            "data-fid" : docket.clientProfileDto.id,
                        }));
                    })

                    $('.docket_list').unbind('change').on('change', function() {
                        console.log($(".docket_list").select2().find(":selected").data("fid"))
                        $("#add_acted_offenders_fname").val($(".docket_list").select2().find(":selected").data("f"));
                        $("#add_acted_offenders_mname").val($(".docket_list").select2().find(":selected").data("m"));
                        $("#add_acted_offenders_lname").val($(".docket_list").select2().find(":selected").data("l"));
                        $("#add_acted_offenders_sname").val($(".docket_list").select2().find(":selected").data("s"));
                    });

                    $(".addSubmitButton_acted").unbind("click").on("click",function(){
                        var allowedDocket= [ 'CSI', 'RCSI', 'TCSI' ];
                        var requiredField= [ 'add_acted_offenders_fname', 'add_acted_offenders_lname', 'add_acted_report_submitted', 'add_acted_recommendation','add_acted_transfer_date','add_acted_transfer_to'];
                        var check = true
                        var checkTable = ['F45T1', 'F45T2']

                        ___validateSaveCarryOver(allowedDocket,$("#add_acted_docket_no"),requiredField,check,checkTable).done(function(result){
                            if(result){
                                $(".modal-form input").attr("disabled",true);
                                $(".addSubmitButton_acted").addClass("hidden");
                                $(".confirmAdd").removeClass("hidden")
                                $(".addProceedButton_acted").removeClass("hidden")
                            }
                        });
                    });

                    $(".addCancelButton").unbind("click").on("click",function(){
                        $(".modal-form input").attr("disabled",false);
                        $(".confirmAdd").addClass("hidden")
                        $(".addSubmitButton_acted").removeClass("hidden")
                        $(".addProceedButton_acted").addClass("hidden")
                        $(".btn-reset").trigger("click")
                    });

                    //Add
                    $(".addProceedButton_acted").unbind("click").on("click",function(){
                        $(this).attr('disabled',true)
                        $(".modal-loader").removeClass("hidden")
                        var payload = { 
                            "docketNumber"          : $("#add_acted_docket_no").val().toUpperCase(),
                            "createdBy"             : $.cookie("USER_ID"),
                            "status"                : true,
                            "source"                : "2",
                            "encodingMonth"         : $.wms.urlParam('date'),
                            "fieldOffice"           : $.wms.urlParam('field'),
                            "fieldOfficeId"         : $.wms.urlParam('officeId'),
                            "dateReportSubmitted"   : $("#add_acted_report_submitted").val(),
                            "ppoRecommendation"     : $("#add_acted_recommendation").val(),
                            "transferDate"          : $("#add_acted_transfer_date").val(),
                            "transferTo"            : $("#add_acted_transfer_to").val(),
                            "clientProfileDto"      : {
                                "id"                    : $(".docket_list").select2().find(":selected").data("fid"),
                                "docketNumber"          : $("#add_acted_docket_no").val().toUpperCase(),
                                "createdBy"             : $.cookie("USER_ID"),
                                "updatedBy"             : "",
                                "status"                : true,
                                "source"                : "2",
                                "encodingMonth"         : $.wms.urlParam('date'),
                            },

                        }
                        console.log(payload)
                        $.wms.executeExternalPost('http://192.168.1.184:8000/F45t2Acted/create',JSON.stringify(payload)).done(function (result) {
              
                            if(result.status != undefined && result.status == "SUCCESS"){

                                $(".modal-loader").addClass("hidden")
                                $(".addProceedButton_acted").attr('disabled',false)
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
                            }
                            else if(result.status == "FAILED"){
                                $(".err_msg").remove()
                                $(".addProceedButton_acted").attr('disabled',false)
                                $(".modal-loader").addClass("hidden")
                                $("#add_acted_docket_no").attr('disabled',false)
                                $("#add_acted_docket_no").addClass("error_field");
                                $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_acted_docket_no"))
                            }
                        });    
                    })
                })
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F45T2_tbody_b').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReportSubmitted+"</td>"+
                        "<td>"+data.ppoRecommendation+"</td>"+
                        "<td>"+data.transferDate+"</td>"+
                        "<td>"+data.transferTo+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit-acted' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f45_write btn btn-danger btn-sm btn-delete-acted' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });

                $(".btn-delete-acted").unbind("click").on("click",function(){
                    var data_id     = $(this).data("id");
                    var docket_no   = $(this).data("docket");
                    var profid      = $.cookie("USER_ID");
                    console.log(data_id);
                    $(".sel-docket").html(docket_no)
                    $(".sel-id").html(data_id)
                    $("#modal-delete-acted").modal();

                    //Delete
                    $(".deleteACTEDProceedButton").unbind("click").on("click",function(){
                        $(this).attr('disabled',true)
                        $(".modal-loader").removeClass("hidden")

                        $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t2Acted/'+data_id+'?&user='+profid).done(function (result) {
                            $("#modal-delete-acted").modal('toggle')
                            $(".modal-loader").addClass("hidden")
                            $(".deleteACTEDProceedButton").attr('disabled',false)
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

                $(".btn-edit-acted").unbind("click").on("click",function(){
                    var data_id = $(this).data("id");
                    var docket_no = $(this).data("docket");
                    console.log(docket_no)
                    //console.log(data);
                    $(".sel-docket").html(docket_no)
                    $(".sel-id").html(data_id)
                    $("#modal-edit-acted").modal();
                    $(".modal-loader2").removeClass("hidden")
                    $(".modal-form").addClass("hidden")
                    $.wms.executeExternalGet('http://192.168.1.184:8000/F45t2Acted/'+data_id).done(function (result2) {
                        console.log(result2);
                        $(".modal-form input").attr("disabled",false);
                        $(".modal-form select").attr("disabled",false);
                        $(".modal-loader2").addClass("hidden")
                        $(".modal-form").removeClass("hidden")
                        $(".confirmEdit-acted").addClass("hidden")
                        $(".editSubmitACTEDButton").removeClass("hidden");
                        $(".editProceedACTEDButton").addClass("hidden")
                        if(result2.status != undefined && result2.status == "SUCCESS"){
                            var payload = result2.response;
                            $("#edit_acted_docket_no").val(payload.docketNumber).attr("disabled",true)
                            $("#edit_acted_offenders_fname").val(payload.clientProfileDto.firstName)
                            $("#edit_acted_offenders_mname").val(payload.clientProfileDto.middleName)
                            $("#edit_acted_offenders_lname").val(payload.clientProfileDto.lastName)
                            $("#edit_acted_offenders_sname").val(payload.clientProfileDto.suffix).trigger('change')
                            $("#edit_acted_report_submitted").val(payload.dateReportSubmitted)
                            $("#edit_acted_recommendation").val(payload.ppoRecommendation).trigger('change')
                            $("#edit_acted_transfer_date").val(payload.transferDate)
                            $("#edit_acted_transfer_to").val(payload.transferTo)
                           
                                //Update proceed
                                $(".editProceedACTEDButton").unbind("click").on("click",function(){
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
                                        "docketNumber"          : $("#edit_acted_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "fieldOffice"           : $.wms.urlParam('field'),
                                        "fieldOfficeId"         : $.wms.urlParam('officeId'),
                                        "dateReportSubmitted"   : $("#edit_acted_report_submitted").val(),
                                        "ppoRecommendation"     : $("#edit_acted_recommendation").val(),
                                        "transferDate"          : $("#edit_acted_transfer_date").val(),
                                        "transferTo"            : $("#edit_acted_transfer_to").val(),
                                        "clientProfileDto"      : {
                                            "docketNumber"          : $("#edit_acted_docket_no").val().toUpperCase(),
                                            "updatedBy"             : $.cookie("USER_ID"),
                                            "source"                : "2",
                                            "encodingMonth"         : $.wms.urlParam('date'),
                                            "firstName"             : $("#edit_acted_offenders_fname").val(),
                                            "middleName"            : $("#edit_acted_offenders_mname").val(),
                                            "lastName"              : $("#edit_acted_offenders_lname").val(),
                                            "suffix"                : $("#edit_acted_offenders_sname").val()
                                        },

                                    }
                                    console.log(payload_update)
                                    $.wms.executeExternalPut('http://192.168.1.184:8000/F45t2Acted/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

            $(".editSubmitACTEDButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editSubmitACTEDButton").addClass("hidden");
                $(".confirmEdit-acted").removeClass("hidden")
                $(".editProceedACTEDButton").removeClass("hidden")
            });

            $(".editCancelACTEDButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",false);
                $(".modal-form select").attr("disabled",false);
                $(".confirmEdit-acted").addClass("hidden")
                $(".editSubmitACTEDButton").removeClass("hidden")
                $(".editProceedACTEDButton").addClass("hidden")
            });

        }

        var __download_print = function(){
            var __maxTableSize = 0;
            var __counter = 0;
            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t2?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    // console.log(__maxTableSize);
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
                            $("#r"+r+"c3").html(data.criminalCaseNo);
                            $("#r"+r+"c4").html(data.dateReceived);
                            $("#r"+r+"c5").html(data.investigatingOfficer);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t2Acted?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t2Acted?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    // console.log(__maxTableSize);
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
                            $("#r"+r+"c6").html(data.docketNumber);
                            $("#r"+r+"c7").html(fullname);
                            $("#r"+r+"c8").html(data.dateReportSubmitted);
                            $("#r"+r+"c9").html(data.ppoRecommendation);
                            $("#r"+r+"c10").html(data.transferDate);
                            $("#r"+r+"c11").html(data.transferredTo);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            var __download_print_list = function(){

                if(__counter == 2){
                    console.log("FINISH")
                    console.log(__maxTableSize);
                    if(__maxTableSize > 0){
                        $(".T_F45T2_download_print_tbody").empty()
                        for(i=1;i<=__maxTableSize;i++){
                            $(".T_F45T2_download_print_tbody").append(
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
                        $(".T_F45T2_download_print_tbody").append(
                                "<tr>"+
                                    "<td colspan='11' class='center b'>NONE</td>"+
                                "</tr>");
                    }
                };
                // Download
                $(".btn-download").unbind("click").on("click",function(){
                    console.log("clicked")
                   
                    $("#T_F45T2_download_print").table2excel({
                        // exclude CSS class
                        exclude: ".options",
                        name: "Form45-Table2",
                        filename: "Form45-Table2.xls", //do not include extension
                        fileext: ".xls",
                        preserveColors: true
                      }); 
                });
            };
        };

        __ref_received();
        __ref_acted();
        __download_print();

    };

    var __attachF45T3PageEvent = function() {
        console.log("f45t3 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T3_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __carryoverF45t3 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F45t3"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t3/carryover',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){
                        $(".modal-loader").addClass("hidden")
                        $(".carryoverProceedButton").attr('disabled',false)
                        $("#modal-carryover").modal('toggle')
                        $(".btn-reset").trigger("click")
                        var form = "Carry Over: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
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
                        $(".carryoverProceedButton").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("<p class='err_msg color-red font_12 i'>*carry over failed</p>").insertAfter((".carryoverProceedButton"))
                    }
                });
            });
        };

        __carryoverF45t3();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t3?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t3?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T3_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.recommendation+"</td>"+
                    "<td>"+data.dateReportSubmitted+"</td>"+
                    "<td>"+data.investigatingOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t3/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t3/'+data_id).done(function (result2) {
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
                        $("#edit_recommendation").val(payload.recommendation).trigger('change')
                        $("#edit_submitted_report").val(payload.dateReportSubmitted)
                        $("#edit_investigating_officer").val(payload.investigatingOfficer)
                       
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
                                    "recommendation"        : $("#edit_recommendation").val(),
                                    "dateReportSubmitted"   : $("#edit_submitted_report").val(),
                                    "investigatingOfficer"  : $("#edit_investigating_officer").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t3/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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



        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T3").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table3",
                filename: "Form45-Table3.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CSI', 'RCSI', 'TCSI' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_investigating_officer', 'add_submitted_report'];
            var check = true
            var checkTable = ['F45T1', 'F45T2']

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
                "recommendation"        : $("#add_recommendation").val(),
                "dateReportSubmitted"   : $("#add_submitted_report").val(),
                "investigatingOfficer"  : $("#add_investigating_officer").val(),
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
            $.wms.executeExternalPost('http://192.168.1.184:8000/F45t3/create',JSON.stringify(payload)).done(function (result) {
  
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

                }
                else if(result.status == "FAILED"){
                    $(".err_msg").remove()
                    $(".addProceedButton").attr('disabled',false)
                    $(".modal-loader").addClass("hidden")
                    $("#add_docket_no").attr('disabled',false)
                    $("#add_docket_no").addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                }
            }); 
        })

    };


    var __attachF45T4PageEvent = function() {
        console.log("f45t4 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T4_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t4?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t4?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            
            //Add
            $.wms.executeExternalGet('http://192.168.1.184:8000/F45t4/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
                console.log(result.response)

                result.response.forEach(function(docket){

                    $(".docket_list").append($('<option>', {
                        value    : docket.docketNumber,
                        text     : docket.docketNumber,
                        "data-f" : docket.clientProfileDto.firstName,
                        "data-m" : docket.clientProfileDto.middleName,
                        "data-l" : docket.clientProfileDto.lastName,
                        "data-s" : docket.clientProfileDto.suffix,
                        "data-fid" : docket.clientProfileDto.id,
                    }));
                })

                $('.docket_list').unbind('change').on('change', function() {
                    console.log($(".docket_list").select2().find(":selected").data("fid"))
                    $("#add_offender_fname").val($(".docket_list").select2().find(":selected").data("f"));
                    $("#add_offender_mname").val($(".docket_list").select2().find(":selected").data("m"));
                    $("#add_offender_lname").val($(".docket_list").select2().find(":selected").data("l"));
                    $("#add_offender_sname").val($(".docket_list").select2().find(":selected").data("s"));
                });
                $(".addSubmitButton").unbind("click").on("click",function(){
                    var allowedDocket= [ 'CSI', 'RCSI', 'TCSI' ];
                    var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_date_received', 'add_recommendation'];
                    var check = true
                    var checkTable = ['F45t3', 'F45t2_acted_upon']

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
                        "recommendation"        : $("#add_recommendation").val(),
                        "dateReceivedFromCourt" : $("#add_date_received").val(),
                        "clientProfileDto"      : {
                            "id"                    : $(".docket_list").select2().find(":selected").data("fid"),
                            "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                            "createdBy"             : $.cookie("USER_ID"),
                            "updatedBy"             : "",
                            "status"                : true,
                            "source"                : "2",
                            "encodingMonth"         : $.wms.urlParam('date'),
                        },
                    }
                    console.log(payload)
                    $.wms.executeExternalPost('http://192.168.1.184:8000/F45t4/create',JSON.stringify(payload)).done(function (result) {
          
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

                        }
                        else if(result.status == "FAILED"){
                            $(".err_msg").remove()
                            $(".addProceedButton").attr('disabled',false)
                            $(".modal-loader").addClass("hidden")
                            $("#add_docket_no").attr('disabled',false)
                            $("#add_docket_no").addClass("error_field");
                            $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                        }
                    });    
                })
            })
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T4_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.recommendation+"</td>"+
                    "<td>"+data.dateReceivedFromCourt+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t4/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t4/'+data_id).done(function (result2) {
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
                        $("#edit_recommendation").val(payload.recommendation)
                        $("#edit_date_received").val(payload.dateReceivedFromCourt)
                       
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
                                    "recommendation"        : $("#edit_recommendation").val(),
                                    "dateReceivedFromCourt" : $("#edit_date_received").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t4/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T4").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table4",
                filename: "Form45-Table4.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });
    };


    var __attachF45T5PageEvent = function() {
        console.log("f45t5 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T5_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")


        var __carryoverF45t5 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F45t5"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t5/carryover',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){
                        $(".modal-loader").addClass("hidden")
                        $(".carryoverProceedButton").attr('disabled',false)
                        $("#modal-carryover").modal('toggle')
                        $(".btn-reset").trigger("click")
                        var form = "Carry Over: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
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
                        $(".carryoverProceedButton").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("<p class='err_msg color-red font_12 i'>*carry over failed</p>").insertAfter((".carryoverProceedButton"))
                    }
                });
            });
        };

        __carryoverF45t5();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t5?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t5?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T5_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.referringOffice+"</td>"+
                    "<td>"+data.dateReceivedByPpo+"</td>"+
                    "<td>"+data.investigatingOfficer+"</td>"+
                    "<td>"+data.reasonForReferral+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t5/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t5/'+data_id).done(function (result2) {
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
                        $("#edit_referring_office").val(payload.referringOffice)
                        $("#edit_date_rcv_by_the_ppo").val(payload.dateReceivedByPpo)
                        $("#edit_investigating_officer").val(payload.investigatingOfficer)
                        $("#edit_reason_for_referral").val(payload.reasonForReferral)
                       
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
                                    "referringOffice"       : $("#edit_referring_office").val(),
                                    "dateReceivedByPpo"     : $("#edit_date_rcv_by_the_ppo").val(),
                                    "investigatingOfficer"  : $("#edit_investigating_officer").val(),
                                    "reasonForReferral"     : $("#edit_reason_for_referral").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t5/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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



        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T5").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table5",
                filename: "Form45-Table5.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CCSI' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_investigating_officer', 'add_date_rcv_by_the_ppo'];
            var check = true
            var checkTable = ['F45T6']

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
                "referringOffice"       : $("#add_referring_office").val(),
                "dateReceivedByPpo"     : $("#add_date_rcv_by_the_ppo").val(),
                "investigatingOfficer"  : $("#add_investigating_officer").val(),
                "reasonForReferral"     : $("#add_reason_for_referral").val(),
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
            $.wms.executeExternalPost('http://192.168.1.184:8000/F45t5/create',JSON.stringify(payload)).done(function (result) {
  
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

                }
                else if(result.status == "FAILED"){
                    $(".err_msg").remove()
                    $(".addProceedButton").attr('disabled',false)
                    $(".modal-loader").addClass("hidden")
                    $("#add_docket_no").attr('disabled',false)
                    $("#add_docket_no").addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                }
            });    
        })

    };

    var __attachF45T6PageEvent = function() {
        console.log("f45t6 events")
        __rcv = function(){
            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $(".form_loader").removeClass("hidden")

            $('.F45T6_tbody').empty();
            $(".form_loader").removeClass("hidden")
            $(".result_form").addClass("hidden")

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t6?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t6?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F45T6_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.referringOffice+"</td>"+
                        "<td>"+data.dateReceivedByPpo+"</td>"+
                        "<td>"+data.investigatingOfficer+"</td>"+
                        "<td>"+data.reasonForReferral+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t6/'+data_id+'?&user='+profid).done(function (result) {
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
                    $.wms.executeExternalGet('http://192.168.1.184:8000/F45t6/'+data_id).done(function (result2) {
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
                            $("#edit_referring_office").val(payload.referringOffice)
                            $("#edit_date_rcv_by_the_ppo").val(payload.dateReceivedByPpo)
                            $("#edit_investigating_officer").val(payload.investigatingOfficer)
                            $("#edit_reason_for_referral").val(payload.reasonForReferral)
                           
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
                                        "referringOffice"       : $("#edit_referring_office").val(),
                                        "dateReceivedByPpo"     : $("#edit_date_rcv_by_the_ppo").val(),
                                        "investigatingOfficer"  : $("#edit_investigating_officer").val(),
                                        "reasonForReferral"     : $("#edit_reason_for_referral").val(),
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
                                    $.wms.executeExternalPut('http://192.168.1.184:8000/F45t6/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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



            //Download
            $(".btn-download").unbind("click").on("click",function(){
                var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            //     var payload = {
            //         "created_by" : $.cookie("USER_ID"),
            //         "module" : "CASELOAD",
            //         "action" : form
                    
            //     }
            //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            //     });
                $("#T_F45T6").table2excel({
                    // exclude CSS class
                    exclude: ".options",
                    name: "Form45-Table6",
                    filename: "Form45-Table6.xls", //do not include extension
                    fileext: ".xls",
                    preserveColors: true
                  }); 
            });

            //Add
            $(".addSubmitButton").unbind("click").on("click",function(){
                var allowedDocket= [ 'CCSI' ];
                var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_investigating_officer', 'add_date_rcv_by_the_ppo'];
                var check = true
                var checkTable = ['F45T1', 'F45T2']

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
                    "referringOffice"       : $("#add_referring_office").val(),
                    "dateReceivedByPpo"     : $("#add_date_rcv_by_the_ppo").val(),
                    "investigatingOfficer"  : $("#add_investigating_officer").val(),
                    "reasonForReferral"     : $("#add_reason_for_referral").val(),
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
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t6/create',JSON.stringify(payload)).done(function (result) {
      
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

                    }
                    else if(result.status == "FAILED"){
                        $(".err_msg").remove()
                        $(".addProceedButton").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("#add_docket_no").attr('disabled',false)
                        $("#add_docket_no").addClass("error_field");
                        $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                    }
                });    
            })

        }
        __CAR = function(){
            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $(".form_loader").removeClass("hidden")

            $('.F45T6_tbody_b').empty();
            $(".form_loader").removeClass("hidden")
            $(".result_form").addClass("hidden")

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t6CAR?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t6CAR?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''

                //Add
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t6CAR/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
                    console.log(result.response)

                    result.response.forEach(function(docket){

                        $(".docket_list").append($('<option>', {
                            value    : docket.docketNumber,
                            text     : docket.docketNumber,
                            "data-f" : docket.clientProfileDto.firstName,
                            "data-m" : docket.clientProfileDto.middleName,
                            "data-l" : docket.clientProfileDto.lastName,
                            "data-s" : docket.clientProfileDto.suffix,
                            "data-fid" : docket.clientProfileDto.id,
                        }));
                    })

                    $('.docket_list').unbind('change').on('change', function() {
                        console.log($(".docket_list").select2().find(":selected").data("fid"))
                        $("#add_offender_fname-acted").val($(".docket_list").select2().find(":selected").data("f"));
                        $("#add_offender_mname-acted").val($(".docket_list").select2().find(":selected").data("m"));
                        $("#add_offender_lname-acted").val($(".docket_list").select2().find(":selected").data("l"));
                        $("#add_offender_sname-acted").val($(".docket_list").select2().find(":selected").data("s"));
                    });
                    $(".addSubmitButton-acted").unbind("click").on("click",function(){
                        var allowedDocket= [ 'CCSI' ];
                        var requiredField= [ 'add_offender_fname-acted', 'add_offender_lname-acted', 'add_referring_office-acted', 'add_date_com_and_ret-acted'];
                        var check = true
                        var checkTable = ['F45t5', 'F45t6']

                        ___validateSaveCarryOver(allowedDocket,$("#add_docket_no-acted"),requiredField,check,checkTable).done(function(result){
                            if(result){
                                $(".modal-form input").attr("disabled",true);
                                $(".addSubmitButton-acted").addClass("hidden");
                                $(".confirmAdd-acted").removeClass("hidden")
                                $(".addProceedButton-acted").removeClass("hidden")
                            }
                        });
                    });

                    $(".addCancelButton-acted").unbind("click").on("click",function(){
                        $(".modal-form input").attr("disabled",false);
                        $(".confirmAdd-acted").addClass("hidden")
                        $(".addSubmitButton-acted").removeClass("hidden")
                        $(".addProceedButton-acted").addClass("hidden")
                        $(".btn-reset-acted").trigger("click")
                    });

                    //Add
                    $(".addProceedButton-acted").unbind("click").on("click",function(){
                        $(this).attr('disabled',true)
                        $(".modal-loader").removeClass("hidden")
                        var payload = { 
                            "docketNumber"          : $("#add_docket_no-acted").val().toUpperCase(),
                            "createdBy"             : $.cookie("USER_ID"),
                            "status"                : true,
                            "source"                : "2",
                            "encodingMonth"         : $.wms.urlParam('date'),
                            "fieldOffice"           : $.wms.urlParam('field'),
                            "fieldOfficeId"         : $.wms.urlParam('officeId'),
                            "dateCompletedAndReturned"  : $("#add_date_com_and_ret-acted").val(),
                            "clientProfileDto"      : {
                                "id"                    : $(".docket_list").select2().find(":selected").data("fid"),
                                "docketNumber"          : $("#add_docket_no-acted").val().toUpperCase(),
                                "createdBy"             : $.cookie("USER_ID"),
                                "updatedBy"             : "",
                                "status"                : true,
                                "source"                : "2",
                                "encodingMonth"         : $.wms.urlParam('date'),
                            },

                        }
                        console.log(payload)
                        $.wms.executeExternalPost('http://192.168.1.184:8000/F45t6CAR/create',JSON.stringify(payload)).done(function (result) {
              
                            if(result.status != undefined && result.status == "SUCCESS"){

                                $(".modal-loader").addClass("hidden")
                                $(".addProceedButton-acted").attr('disabled',false)
                                $("#modal-add-acted").modal('toggle')
                                $(".btn-reset-acted").trigger("click")

                            var form = "Added Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". " + JSON.stringify(result.response);
                            var payload_audit = {
                                "created_by" : $.cookie("USER_ID"),
                                "module" : "CASELOAD",
                                "action" : form
                                
                            }
                            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                                location.reload();
                            });

                            }
                            else if(result.status == "FAILED"){
                                $(".err_msg").remove()
                                $(".addProceedButton-acted").attr('disabled',false)
                                $(".modal-loader").addClass("hidden")
                                $("#add_docket_no-acted").attr('disabled',false)
                                $("#add_docket_no-acted").addClass("error_field");
                                $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no-acted"))

                            }
                        });    
                    })
                })

            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F45T6_tbody_b').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateCompletedAndReturned+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit-acted form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t6CAR/'+data_id+'?&user='+profid).done(function (result) {
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

                $(".btn-edit-acted").unbind("click").on("click",function(){
                    var data_id = $(this).data("id");
                    var docket_no = $(this).data("docket");
                    console.log(docket_no)
                    //console.log(data);
                    $(".sel-docket").html(docket_no)
                    $(".sel-id").html(data_id)
                    $("#modal-edit-acted").modal();
                    $(".modal-loader2").removeClass("hidden")
                    $(".modal-form").addClass("hidden")
                    $.wms.executeExternalGet('http://192.168.1.184:8000/F45t6CAR/'+data_id).done(function (result2) {
                        console.log(result2);
                        $(".modal-form input").attr("disabled",false);
                        $(".modal-form select").attr("disabled",false);
                        $(".modal-loader2").addClass("hidden")
                        $(".modal-form").removeClass("hidden")
                        $(".confirmEdit-acted").addClass("hidden")
                        $(".editSubmitButton-acted").removeClass("hidden");
                        $(".editProceedButton-acted").addClass("hidden")
                        if(result2.status != undefined && result2.status == "SUCCESS"){
                            var payload = result2.response;
                            $("#edit_docket_no-acted").val(payload.docketNumber).attr("disabled",true)
                            $("#edit_offender_fname-acted").val(payload.clientProfileDto.firstName)
                            $("#edit_offender_mname-acted").val(payload.clientProfileDto.middleName)
                            $("#edit_offender_lname-acted").val(payload.clientProfileDto.lastName)
                            $("#edit_offender_sname-acted").val(payload.clientProfileDto.suffix).trigger('change')
                            $("#edit_date_com_and_ret-acted").val(payload.dateCompletedAndReturned)
                            // $("#edit_date_rcv_by_the_ppo-acted").val(payload.dateReceivedByPpo)
                           
                                //Update proceed
                                $(".editProceedButton-acted").unbind("click").on("click",function(){
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
                                        "docketNumber"          : $("#edit_docket_no-acted").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "fieldOffice"           : $.wms.urlParam('field'),
                                        "fieldOfficeId"         : $.wms.urlParam('officeId'),
                                        "dateCompletedAndReturned"  : $("#edit_date_com_and_ret-acted").val(),
                                        "clientProfileDto"      : {
                                            "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                            "updatedBy"             : $.cookie("USER_ID"),
                                            "source"                : "2",
                                            "encodingMonth"         : $.wms.urlParam('date'),
                                            "firstName"             : $("#edit_offender_fname-acted").val(),
                                            "middleName"            : $("#edit_offender_mname-acted").val(),
                                            "lastName"              : $("#edit_offender_lname-acted").val(),
                                            "suffix"                : $("#edit_offender_sname-acted").val()
                                        },

                                    }
                                    console.log(payload_update)
                                    $.wms.executeExternalPut('http://192.168.1.184:8000/F45t6CAR/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

            $(".editSubmitButton-acted").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editSubmitButton-acted").addClass("hidden");
                $(".confirmEdit-acted").removeClass("hidden");
                $(".editProceedButton-acted").removeClass("hidden");
            });

            $(".editCancelButton-acted").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",false);
                $(".modal-form select").attr("disabled",false);
                $(".confirmEdit-acted").addClass("hidden");
                $(".editSubmitButton-acted").removeClass("hidden");
                $(".editProceedButton-acted").addClass("hidden");
            });
        }
        var __download_print = function(){
            var __maxTableSize = 0;
            var __counter = 0;

            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t6?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t6?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    // console.log(__maxTableSize);
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
                            $("#r"+r+"c3").html(data.referringOffice);
                            $("#r"+r+"c4").html(data.dateReceivedByPpo);
                            $("#r"+r+"c5").html(data.investigatingOfficer);
                            $("#r"+r+"c6").html(data.reasonForReferral);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t6CAR?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t6CAR?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    // console.log(__maxTableSize);
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
                            $("#r"+r+"c7").html(data.docketNumber);
                            $("#r"+r+"c8").html(fullname);
                            $("#r"+r+"c9").html(data.dateCompletedAndReturned);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            var __download_print_list = function(){

                if(__counter == 2){
                    console.log("FINISH")
                    console.log(__maxTableSize);
                    if(__maxTableSize > 0){
                        $(".T_F45T6_download_print_tbody").empty()
                        for(i=1;i<=__maxTableSize;i++){
                            $(".T_F45T6_download_print_tbody").append(
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
                        $(".T_F45T6_download_print_tbody").append(
                                "<tr>"+
                                    "<td colspan='9' class='center b'>NONE</td>"+
                                "</tr>");
                    }
                };
                // Download
                $(".btn-download").unbind("click").on("click",function(){
                    console.log("clicked")
                   
                    $("#T_F45T6_download_print").table2excel({
                        // exclude CSS class
                        exclude: ".options",
                        name: "Form45-Table6",
                        filename: "Form45-Table6.xls", //do not include extension
                        fileext: ".xls",
                        preserveColors: true
                      }); 
                });
            };
        };
        __rcv();
        __CAR();
        __download_print();

    };


    var __attachF45T7PageEvent = function() {
        console.log("f45t7 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T7_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $('.F45T5_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")


        var __carryoverF45t7 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F45t7"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t7/carryover',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){
                        $(".modal-loader").addClass("hidden")
                        $(".carryoverProceedButton").attr('disabled',false)
                        $("#modal-carryover").modal('toggle')
                        $(".btn-reset").trigger("click")
                        var form = "Carry Over: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
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
                        $(".carryoverProceedButton").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("<p class='err_msg color-red font_12 i'>*carry over failed</p>").insertAfter((".carryoverProceedButton"))
                    }
                });
            });
        };

        __carryoverF45t7();
        
        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t7?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t7?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T7_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td>"+data.dateReceivedByPpo+"</td>"+
                    "<td>"+data.supervisionStart+"</td>"+
                    "<td>"+data.supervisionEnd+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t7/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t7/'+data_id).done(function (result2) {
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
                        $("#edit_supervising_officer").val(payload.supervisingOfficer)
                        $("#edit_date_rcv_by_the_ppo").val(payload.dateReceivedByPpo)
                        $("#edit_supervising_start").val(payload.supervisionStart)
                        $("#edit_supervising_end").val(payload.supervisionEnd)
                       
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
                                    "supervisingOfficer"    : $("#edit_supervising_officer").val(),
                                    "dateReceivedByPpo"     : $("#edit_date_rcv_by_the_ppo").val(),
                                    "supervisionStart"      : $("#edit_supervising_start").val(),
                                    "supervisionEnd"        : $("#edit_supervising_end").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t7/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T7").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table7",
                filename: "Form45-Table7.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CSS', 'TCSS'];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer', 'add_date_rcv_by_the_ppo'];
            var check = true
            var checkTable = ['F45t8', 'F45t7']

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
                "supervisingOfficer"    : $("#add_supervising_officer").val(),
                "dateReceivedByPpo"     : $("#add_date_rcv_by_the_ppo").val(),
                "supervisionStart"      : $("#add_supervising_start").val(),
                "supervisionEnd"        : $("#add_supervising_end").val(),
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
            $.wms.executeExternalPost('http://192.168.1.184:8000/F45t7/create',JSON.stringify(payload)).done(function (result) {
  
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

                }
                else if(result.status == "FAILED"){
                    $(".err_msg").remove()
                    $(".addProceedButton").attr('disabled',false)
                    $(".modal-loader").addClass("hidden")
                    $("#add_docket_no").attr('disabled',false)
                    $("#add_docket_no").addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                }
            });    
        })

    };

    var __attachF45T8PageEvent = function() {
        console.log("f45t8 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T8_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t8?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t8?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T8_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.criminalCaseNo+"</td>"+
                    "<td>"+data.courtOfOrigin+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td>"+data.dateReceivedByPpo+"</td>"+
                    "<td>"+data.supervisionStart+"</td>"+
                    "<td>"+data.supervisionEnd+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t8/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t8/'+data_id).done(function (result2) {
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
                        $("#edit_criminal_case").val(payload.criminalCaseNo)
                        $("#edit_court_origin").val(payload.courtOfOrigin)
                        $("#edit_supervising_officer").val(payload.supervisingOfficer)
                        $("#edit_date_rcv_by_the_ppo").val(payload.dateReceivedByPpo)
                        $("#edit_supervising_start").val(payload.supervisionStart)
                        $("#edit_supervising_end").val(payload.supervisionEnd)
                       
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
                                    "criminalCaseNo"        : $("#edit_criminal_case").val(),
                                    "courtOfOrigin"         : $("#edit_court_origin").val(),
                                    "supervisingOfficer"    : $("#edit_supervising_officer").val(),
                                    "dateReceivedByPpo"     : $("#edit_date_rcv_by_the_ppo").val(),
                                    "supervisionStart"      : $("#edit_supervising_start").val(),
                                    "supervisionEnd"        : $("#edit_supervising_end").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t8/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T8").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table8",
                filename: "Form45-Table8.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CSS', 'TCSS'];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer', 'add_date_rcv_by_the_ppo'];
            var check = true
            var checkTable = ['F45t8', 'F45t7']

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
                "criminalCaseNo"        : $("#add_criminal_case").val(),
                "courtOfOrigin"         : $("#add_court_origin").val(),
                "supervisingOfficer"    : $("#add_supervising_officer").val(),
                "dateReceivedByPpo"     : $("#add_date_rcv_by_the_ppo").val(),
                "supervisionStart"      : $("#add_supervising_start").val(),
                "supervisionEnd"        : $("#add_supervising_end").val(),
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
            $.wms.executeExternalPost('http://192.168.1.184:8000/F45t8/create',JSON.stringify(payload)).done(function (result) {
  
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

                }
                else if(result.status == "FAILED"){
                    $(".err_msg").remove()
                    $(".addProceedButton").attr('disabled',false)
                    $(".modal-loader").addClass("hidden")
                    $("#add_docket_no").attr('disabled',false)
                    $("#add_docket_no").addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                }
            });    
        })

    };
    
    var __attachF45T9PageEvent = function() {
        console.log("f45t9 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T9_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        // $(".sel_field_office2").select2({
        //    placeholder: "Select Field Office",
        // });
        var fo_val = '';
        $('#add_report').on('change', function() {
          console.log(this.value)
          if (this.value != "TRANSFER") {
            fo_val = $("#add_field_offices").val()
            $("#fo_id").addClass('hide')
          }else{
            $("#fo_id").removeClass('hide')
            fo_val = '';
          }
        });
        $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t9?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t9?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            
            //Add
            $.wms.executeExternalGet('http://192.168.1.184:8000/F45t9/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
                console.log(result.response)

                result.response.forEach(function(docket){

                    $(".docket_list").append($('<option>', {
                        value    : docket.docketNumber,
                        text     : docket.docketNumber,
                        "data-f" : docket.clientProfileDto.firstName,
                        "data-m" : docket.clientProfileDto.middleName,
                        "data-l" : docket.clientProfileDto.lastName,
                        "data-s" : docket.clientProfileDto.suffix,
                        "data-fid" : docket.clientProfileDto.id,
                    }));
                })

                $('.docket_list').unbind('change').on('change', function() {
                    console.log($(".docket_list").select2().find(":selected").data("fid"))
                    $("#add_offender_fname").val($(".docket_list").select2().find(":selected").data("f"));
                    $("#add_offender_mname").val($(".docket_list").select2().find(":selected").data("m"));
                    $("#add_offender_lname").val($(".docket_list").select2().find(":selected").data("l"));
                    $("#add_offender_sname").val($(".docket_list").select2().find(":selected").data("s"));
                });
                $(".addSubmitButton").unbind("click").on("click",function(){
                    var allowedDocket= [ 'CSS', 'TCSS'];
                    var requiredField= [ 'add_offender_fname', 'add_offender_lname'];
                    var check = true
                    var checkTable = ['F45t8', 'F45t7']

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
                        "report"                : $("#add_report").val(),
                        "reportDateSubmitted"   : $("#add_rep_date_submitted").val(),
                        "transferredOffice"     : $("#add_field_offices").val(),
                        "supervisingOfficer"    : $("#add_supervising_officer").val(),
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
                    $.wms.executeExternalPost('http://192.168.1.184:8000/F45t9/create',JSON.stringify(payload)).done(function (result) {
          
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

                        }
                        else if(result.status == "FAILED"){
                            $(".err_msg").remove()
                            $(".addProceedButton").attr('disabled',false)
                            $(".modal-loader").addClass("hidden")
                            $("#add_docket_no").attr('disabled',false)
                            $("#add_docket_no").addClass("error_field");
                            $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                        }
                    });    
                })
            })
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T9_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.report+"</td>"+
                    "<td>"+data.reportDateSubmitted+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td>"+data.transferredOffice+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t9/'+data_id+'?&user='+profid).done(function (result) {
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

                var fo_val_edit = '';
                $('#edit_report').on('change', function() {
                  console.log(this.value)
                  if (this.value != "TRANSFER") {
                    fo_val_edit = $("#edit_field_offices").val()
                    $("#fo_id_edit").addClass('hide')
                  }else{
                    $("#fo_id_edit").removeClass('hide')
                    fo_val_edit = '';
                  }
                });

                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t9/'+data_id).done(function (result2) {
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
                        $("#edit_report").val(payload.report)
                        $("#edit_rep_date_submitted").val(payload.reportDateSubmitted)
                        $("#edit_field_offices").val(payload.transferredOffice).trigger('change')
                        $("#edit_supervising_officer").val(payload.supervisingOfficer)
                       
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
                                    "report"                : $("#edit_report").val(),
                                    "reportDateSubmitted"   : $("#edit_rep_date_submitted").val(),
                                    "transferredOffice"     : fo_val_edit,
                                    "supervisingOfficer"    : $("#edit_supervising_officer").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t9/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T9").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table9",
                filename: "Form45-Table9.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });
    };
    var __attachF45T10PageEvent = function() {
        console.log("f45t10 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T10_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        // $(".sel_field_office2").select2({
        //    placeholder: "Select Field Office",
        // });
        var fo_val = '';
        $('#add_report').on('change', function() {
          console.log(this.value)
          if (this.value != "TRANSFER") {
            fo_val = $("#add_field_offices").val()
            $("#fo_id").addClass('hide')
          }else{
            $("#fo_id").removeClass('hide')
            fo_val = '';
          }
        });
        $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');

        var __carryoverF45t10 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F45t10"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t10/carryover',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){
                        $(".modal-loader").addClass("hidden")
                        $(".carryoverProceedButton").attr('disabled',false)
                        $("#modal-carryover").modal('toggle')
                        $(".btn-reset").trigger("click")
                        var form = "Carry Over: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
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
                        $(".carryoverProceedButton").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("<p class='err_msg color-red font_12 i'>*carry over failed</p>").insertAfter((".carryoverProceedButton"))
                    }
                });
            });
        };

        __carryoverF45t10();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t10?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t10?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            
            //Add
            $.wms.executeExternalGet('http://192.168.1.184:8000/F45t10/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
                console.log(result.response)

                result.response.forEach(function(docket){

                    $(".docket_list").append($('<option>', {
                        value    : docket.docketNumber,
                        text     : docket.docketNumber,
                        "data-f" : docket.clientProfileDto.firstName,
                        "data-m" : docket.clientProfileDto.middleName,
                        "data-l" : docket.clientProfileDto.lastName,
                        "data-s" : docket.clientProfileDto.suffix,
                        "data-fid" : docket.clientProfileDto.id,
                    }));
                })

                $('.docket_list').unbind('change').on('change', function() {
                    console.log($(".docket_list").select2().find(":selected").data("fid"))
                    $("#add_offender_fname").val($(".docket_list").select2().find(":selected").data("f"));
                    $("#add_offender_mname").val($(".docket_list").select2().find(":selected").data("m"));
                    $("#add_offender_lname").val($(".docket_list").select2().find(":selected").data("l"));
                    $("#add_offender_sname").val($(".docket_list").select2().find(":selected").data("s"));
                });
                $(".addSubmitButton").unbind("click").on("click",function(){
                    var allowedDocket= [ 'CSS', 'TCSS'];
                    var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer'];
                    var check = true
                    var checkTable = ['F45t8', 'F45t7']

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
                        "report"                : $("#add_report").val(),
                        "reportDateSubmitted"   : $("#add_rep_date_submitted").val(),
                        "transferredOffice"     : $("#add_field_offices").val(),
                        "supervisingOfficer"    : $("#add_supervising_officer").val(),
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
                    $.wms.executeExternalPost('http://192.168.1.184:8000/F45t10/create',JSON.stringify(payload)).done(function (result) {
          
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
                        }
                        else if(result.status == "FAILED"){
                            $(".err_msg").remove()
                            $(".addProceedButton").attr('disabled',false)
                            $(".modal-loader").addClass("hidden")
                            $("#add_docket_no").attr('disabled',false)
                            $("#add_docket_no").addClass("error_field");
                            $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                        }
                    });    
                })
            })
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T10_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.report+"</td>"+
                    "<td>"+data.reportDateSubmitted+"</td>"+
                    "<td>"+data.transferredOffice+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t10/'+data_id+'?&user='+profid).done(function (result) {
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
                var fo_val_edit = '';
                $('#edit_report').on('change', function() {
                  console.log(this.value)
                  if (this.value != "TRANSFER") {
                    fo_val_edit = $("#edit_field_offices").val()
                    $("#fo_id_edit").addClass('hide')
                  }else{
                    $("#fo_id_edit").removeClass('hide')
                    fo_val_edit = '';
                  }
                });
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t10/'+data_id).done(function (result2) {
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
                        $("#edit_report").val(payload.report)
                        $("#edit_rep_date_submitted").val(payload.reportDateSubmitted)
                        $("#edit_field_offices").val(payload.transferredOffice).trigger('change')
                        $("#edit_supervising_officer").val(payload.supervisingOfficer)
                       
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
                                    "report"                : $("#edit_report").val(),
                                    "reportDateSubmitted"   : $("#edit_rep_date_submitted").val(),
                                    "transferredOffice"     : fo_val_edit,
                                    "supervisingOfficer"    : $("#edit_supervising_officer").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t10/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T10").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table10",
                filename: "Form45-Table10.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

    };
    
    var __attachF45T11PageEvent = function() {
        console.log("f45t11 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T11_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        // $(".sel_field_office2").select2({
        //    placeholder: "Select Field Office",
        // });

        var fo_val = '';
        $('#add_report').on('change', function() {
          console.log(this.value)
          if (this.value != "TRANSFERRED") {
            fo_val = $("#add_field_offices").val()
            $("#fo_id").addClass('hide')
          }else{
            $("#fo_id").removeClass('hide')
            fo_val = '';
          }
        });

        $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');
        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t11?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t11?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            
            //Add
            $.wms.executeExternalGet('http://192.168.1.184:8000/F45t11/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
                console.log(result.response)

                result.response.forEach(function(docket){

                    $(".docket_list").append($('<option>', {
                        value    : docket.docketNumber,
                        text     : docket.docketNumber,
                        "data-f" : docket.clientProfileDto.firstName,
                        "data-m" : docket.clientProfileDto.middleName,
                        "data-l" : docket.clientProfileDto.lastName,
                        "data-s" : docket.clientProfileDto.suffix,
                        "data-fid" : docket.clientProfileDto.id,
                    }));
                })

                $('.docket_list').unbind('change').on('change', function() {
                    console.log($(".docket_list").select2().find(":selected").data("fid"))
                    $("#add_offender_fname").val($(".docket_list").select2().find(":selected").data("f"));
                    $("#add_offender_mname").val($(".docket_list").select2().find(":selected").data("m"));
                    $("#add_offender_lname").val($(".docket_list").select2().find(":selected").data("l"));
                    $("#add_offender_sname").val($(".docket_list").select2().find(":selected").data("s"));
                });
                $(".addSubmitButton").unbind("click").on("click",function(){
                    var allowedDocket= [ 'CSS', 'TCSS'];
                    var requiredField= [ 'add_offender_fname', 'add_offender_lname'];
                    var check = true
                    var checkTable = ['F45t8', 'F45t7']

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
                        "report"                : $("#add_report").val(),
                        "reportDateSubmitted"   : $("#add_rep_date_submitted").val(),
                        "transferredOffice"     : $("#add_field_offices").val(),
                        "clientProfileDto"      : {
                            "id"                    : $(".docket_list").select2().find(":selected").data("fid"),
                            "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                            "createdBy"             : $.cookie("USER_ID"),
                            "updatedBy"             : "",
                            "status"                : true,
                            "source"                : "2",
                            "encodingMonth"         : $.wms.urlParam('date'),
                        },

                    }
                    console.log(payload)
                    $.wms.executeExternalPost('http://192.168.1.184:8000/F45t11/create',JSON.stringify(payload)).done(function (result) {
          
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

                        }
                        else if(result.status == "FAILED"){
                            $(".err_msg").remove()
                            $(".addProceedButton").attr('disabled',false)
                            $(".modal-loader").addClass("hidden")
                            $("#add_docket_no").attr('disabled',false)
                            $("#add_docket_no").addClass("error_field");
                            $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                        }
                    });    
                })
            })
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T11_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.report+"</td>"+
                    "<td>"+data.reportDateSubmitted+"</td>"+
                    "<td>"+data.transferredOffice+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t11/'+data_id+'?&user='+profid).done(function (result) {
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

                var fo_val_edit = '';
                $('#edit_report').on('change', function() {
                  console.log(this.value)
                  if (this.value != "TRANSFER") {
                    fo_val_edit = $("#edit_field_offices").val()
                    $("#fo_id_edit").addClass('hide')
                  }else{
                    $("#fo_id_edit").removeClass('hide')
                    fo_val_edit = '';
                  }
                });

                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t11/'+data_id).done(function (result2) {
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
                        $("#edit_report").val(payload.report)
                        $("#edit_rep_date_submitted").val(payload.reportDateSubmitted)
                        $("#edit_field_offices").val(payload.transferredOffice).trigger('change')
                       
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
                                    "report"                : $("#edit_report").val(),
                                    "reportDateSubmitted"   : $("#edit_rep_date_submitted").val(),
                                    "transferredOffice"     : fo_val_edit,
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t11/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T11").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table11",
                filename: "Form45-Table11.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

    };

    var __attachF45T12PageEvent = function() {
        console.log("f45t12 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F45T12_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');

        var __carryoverF45t12 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F45t12"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t12/carryover',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){
                        $(".modal-loader").addClass("hidden")
                        $(".carryoverProceedButton").attr('disabled',false)
                        $("#modal-carryover").modal('toggle')
                        $(".btn-reset").trigger("click")
                        var form = "Carry Over: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
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
                        $(".carryoverProceedButton").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("<p class='err_msg color-red font_12 i'>*carry over failed</p>").insertAfter((".carryoverProceedButton"))
                    }
                });
            });
        };

        __carryoverF45t12();
        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.184:8000/F45t12?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.184:8000/F45t12?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
        }
        $.wms.executeExternalGet(api).done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F45T12_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.referringOffice+"</td>"+
                    "<td>"+data.dateReceived+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td>"+data.reasonsForReferral+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t12/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t12/'+data_id).done(function (result2) {
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
                        $("#edit_field_offices").val(payload.referringOffice).trigger('change')
                        $("#edit_rep_date_submitted").val(payload.dateReceived)
                        $("#edit_supervising_officer").val(payload.supervisingOfficer)
                        $("#edit_reason_for_referral").val(payload.reasonsForReferral)
                       
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
                                    "referringOffice"       : $("#edit_field_offices").val(),
                                    "dateReceived"          : $("#edit_rep_date_submitted").val(),
                                    "supervisingOfficer"    : $("#edit_supervising_officer").val(),
                                    "reasonsForReferral"    : $("#edit_reason_for_referral").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.184:8000/F45t12/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
        //     var payload = {
        //         "created_by" : $.cookie("USER_ID"),
        //         "module" : "CASELOAD",
        //         "action" : form
                
        //     }
        //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
        //     });
            $("#T_F45T12").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form45-Table12",
                filename: "Form45-Table12.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CCSS' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname'];
            var check = true
            var checkTable = ['F45t8', 'F45t7']

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
                "referringOffice"       : $("#add_field_offices").val(),
                "dateReceived"          : $("#add_rep_date_submitted").val(),
                "supervisingOfficer"    : $("#add_supervising_officer").val(),
                "reasonsForReferral"    : $("#add_reason_for_referral").val(),
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
            $.wms.executeExternalPost('http://192.168.1.184:8000/F45t12/create',JSON.stringify(payload)).done(function (result) {
  
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

                }
                else if(result.status == "FAILED"){
                    $(".err_msg").remove()
                    $(".addProceedButton").attr('disabled',false)
                    $(".modal-loader").addClass("hidden")
                    $("#add_docket_no").attr('disabled',false)
                    $("#add_docket_no").addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                }
            });    
        })

    };

    var __attachF45T13PageEvent = function() {
        console.log("f45t13 events")
        __rcv = function(){

            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $(".form_loader").removeClass("hidden")

            $('.F45T13_tbody').empty();
            $(".form_loader").removeClass("hidden")
            $(".result_form").addClass("hidden")

            $(".sel_field_office2").select2({
               placeholder: "Select Field Office",
            });
            $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t13?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t13?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F45T13_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.criminalCaseNo+"</td>"+
                        "<td>"+data.courtOfOrigin+"</td>"+
                        "<td>"+data.referringOffice+"</td>"+
                        "<td>"+data.supervisingOfficer+"</td>"+
                        "<td>"+data.periodCourtesySupervision+"</td>"+
                        "<td>"+data.dateReceived+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f45_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t13/'+data_id+'?&user='+profid).done(function (result) {
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
                    $.wms.executeExternalGet('http://192.168.1.184:8000/F45t13/'+data_id).done(function (result2) {
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
                            $("#edit_cc_no").val(payload.criminalCaseNo)
                            $("#edit_court_origin").val(payload.courtOfOrigin)
                            $("#edit_referring_office").val(payload.referringOffice).trigger('change')
                            $("#edit_supervising_officer").val(payload.supervisingOfficer)
                            $("#edit_period_crt").val(payload.periodCourtesySupervision)
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
                                        "criminalCaseNo"        : $("#edit_cc_no").val(),
                                        "courtOfOrigin"          : $("#edit_court_origin").val(),
                                        "referringOffice"        : $("#edit_referring_office").val(),
                                        "supervisingOfficer"    : $("#edit_supervising_officer").val(),
                                        "periodCourtesySupervision"     : $("#edit_period_crt").val(),
                                        "dateReceived"           : $("#edit_date_rcv").val(),
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
                                    $.wms.executeExternalPut('http://192.168.1.184:8000/F45t13/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

            //Download
            $(".btn-download").unbind("click").on("click",function(){
                var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            //     var payload = {
            //         "created_by" : $.cookie("USER_ID"),
            //         "module" : "CASELOAD",
            //         "action" : form
                    
            //     }
            //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            //     });
                $("#T_F45T13").table2excel({
                    // exclude CSS class
                    exclude: ".options",
                    name: "Form45-Table13",
                    filename: "Form45-Table13.xls", //do not include extension
                    fileext: ".xls",
                    preserveColors: true
                  }); 
            });

        }
        __terminated = function(){


            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $(".form_loader").removeClass("hidden")

            $('.F45T13_tbody_b').empty();
            $(".form_loader").removeClass("hidden")
            $(".result_form").addClass("hidden")

            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t13CRT?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t13CRT?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
                
                //Add
                $.wms.executeExternalGet('http://192.168.1.184:8000/F45t13CRT/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
                    console.log(result.response)

                    result.response.forEach(function(docket){

                        $(".docket_list").append($('<option>', {
                            value    : docket.docketNumber,
                            text     : docket.docketNumber,
                            "data-f" : docket.clientProfileDto.firstName,
                            "data-m" : docket.clientProfileDto.middleName,
                            "data-l" : docket.clientProfileDto.lastName,
                            "data-s" : docket.clientProfileDto.suffix,
                            "data-fid" : docket.clientProfileDto.id,
                        }));
                    })

                    $('.docket_list').unbind('change').on('change', function() {
                        console.log($(".docket_list").select2().find(":selected").data("fid"))
                        $("#add_offender_fname-term").val($(".docket_list").select2().find(":selected").data("f"));
                        $("#add_offender_mname-term").val($(".docket_list").select2().find(":selected").data("m"));
                        $("#add_offender_lname-term").val($(".docket_list").select2().find(":selected").data("l"));
                        $("#add_offender_sname-term").val($(".docket_list").select2().find(":selected").data("s"));
                    });

                    $(".addSubmitButton").unbind("click").on("click",function(){
                        var allowedDocket= [ 'CCSS' ];
                        var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer'];
                        var check = true
                        var checkTable = ['F45t12']

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
                            "criminalCaseNo"        : $("#add_cc_no").val(),
                            "courtOfOrigin"          : $("#add_court_origin").val(),
                            "referringOffice"        : $("#add_referring_office").val(),
                            "supervisingOfficer"    : $("#add_supervising_officer").val(),
                            "periodCourtesySupervision"     : $("#add_period_crt").val(),
                            "dateReceived"           : $("#add_date_rcv").val(),
                            "clientProfileDto"      : {
                                "id"                    : $(".docket_list").select2().find(":selected").data("fid"),
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
                        $.wms.executeExternalPost('http://192.168.1.184:8000/F45t13/create',JSON.stringify(payload)).done(function (result) {
              
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

                            }
                            else if(result.status == "FAILED"){
                                $(".err_msg").remove()
                                $(".addProceedButton").attr('disabled',false)
                                $(".modal-loader").addClass("hidden")
                                $("#add_docket_no").attr('disabled',false)
                                $("#add_docket_no").addClass("error_field");
                                $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no"))

                            }
                        });    
                    })
                })
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F45T13_tbody_b').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReturned+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_f45_write btn btn-success btn-sm btn-edit-term' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f45_write btn btn-danger btn-sm btn-delete-term' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });

                $(".btn-delete-term").unbind("click").on("click",function(){
                    var data_id     = $(this).data("id");
                    var docket_no   = $(this).data("docket");
                    var profid      = $.cookie("USER_ID");
                    console.log(data_id);
                    $(".sel-docket-term").html(docket_no)
                    $(".sel-id-term").html(data_id)
                    $("#modal-delete-term").modal();

                    //Delete
                    $(".deleteProceedButton-term").unbind("click").on("click",function(){
                        $(this).attr('disabled',true)
                        $(".modal-loader").removeClass("hidden")

                        $.wms.executeExternalDelete('http://192.168.1.184:8000/F45t13CRT/'+data_id+'?&user='+profid).done(function (result) {
                            $("#modal-delete-term").modal('toggle')
                            $(".modal-loader").addClass("hidden")
                            $(".deleteProceedButton-term").attr('disabled',false)
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

                $(".btn-edit-term").unbind("click").on("click",function(){
                    var data_id = $(this).data("id");
                    var docket_no = $(this).data("docket");
                    console.log(docket_no)
                    //console.log(data);
                    $(".sel-docket-term").html(docket_no)
                    $(".sel-id-term").html(data_id)
                    $("#modal-edit-term").modal();
                    $(".modal-loader2").removeClass("hidden")
                    $(".modal-form").addClass("hidden")
                    $.wms.executeExternalGet('http://192.168.1.184:8000/F45t13CRT/'+data_id).done(function (result2) {
                        console.log(result2);
                        $(".modal-form input").attr("disabled",false);
                        $(".modal-form select").attr("disabled",false);
                        $(".modal-loader2").addClass("hidden")
                        $(".modal-form").removeClass("hidden")
                        $(".confirmEdit-term").addClass("hidden")
                        $(".editSubmitButton-term").removeClass("hidden");
                        $(".editProceedButton-term").addClass("hidden")
                        if(result2.status != undefined && result2.status == "SUCCESS"){
                            var payload = result2.response;
                            $("#edit_docket_no-term").val(payload.docketNumber).attr("disabled",true)
                            $("#edit_offender_fname-term").val(payload.clientProfileDto.firstName)
                            $("#edit_offender_mname-term").val(payload.clientProfileDto.middleName)
                            $("#edit_offender_lname-term").val(payload.clientProfileDto.lastName)
                            $("#edit_offender_sname-term").val(payload.clientProfileDto.suffix).trigger('change')
                            $("#edit_date_com_and_ret-term").val(payload.dateReturned)
                           
                                //Update proceed
                                $(".editProceedButton-term").unbind("click").on("click",function(){
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
                                        "docketNumber"          : $("#edit_docket_no-term").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "fieldOffice"           : $.wms.urlParam('field'),
                                        "fieldOfficeId"         : $.wms.urlParam('officeId'),
                                        "dateReturned"           : $("#edit_date_com_and_ret-term").val(),
                                        "clientProfileDto"      : {
                                            "docketNumber"          : $("#edit_docket_no-term").val().toUpperCase(),
                                            "updatedBy"             : $.cookie("USER_ID"),
                                            "source"                : "2",
                                            "encodingMonth"         : $.wms.urlParam('date'),
                                            "firstName"             : $("#edit_offender_fname-term").val(),
                                            "middleName"            : $("#edit_offender_mname-term").val(),
                                            "lastName"              : $("#edit_offender_lname-term").val(),
                                            "suffix"                : $("#edit_offender_sname-term").val()
                                        },

                                    }
                                    console.log(payload_update)
                                    $.wms.executeExternalPut('http://192.168.1.184:8000/F45t13CRT/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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

            $(".editSubmitButton-term").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editSubmitButton-term").addClass("hidden");
                $(".confirmEdit-term").removeClass("hidden")
                $(".editProceedButton-term").removeClass("hidden")
            });

            $(".editCancelButton-term").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",false);
                $(".modal-form select").attr("disabled",false);
                $(".confirmEdit-term").addClass("hidden")
                $(".editSubmitButton-term").removeClass("hidden")
                $(".editProceedButton-term").addClass("hidden")
            });

            //Download
            // $(".btn-download").unbind("click").on("click",function(){
            //     var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            // //     var payload = {
            // //         "created_by" : $.cookie("USER_ID"),
            // //         "module" : "CASELOAD",
            // //         "action" : form
                    
            // //     }
            // //     $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            // //     });
            //     $("#T_F45T13").table2excel({
            //         // exclude CSS class
            //         exclude: ".options",
            //         name: "Form45-Table13",
            //         filename: "Form45-Table13.xls", //do not include extension
            //         fileext: ".xls",
            //         preserveColors: true
            //       }); 
            // });

            //Add
            $(".addSubmitButton-term").unbind("click").on("click",function(){
                var allowedDocket= [ 'CCSS' ];
                var requiredField= [ 'add_offender_fname-term', 'add_offender_lname-term', 'add_date_com_and_ret-term'];
                var check = true
                var checkTable = ['F45t12']

                ___validateSaveCarryOver(allowedDocket,$("#add_docket_no-term"),requiredField,check,checkTable).done(function(result){
                    if(result){
                        $(".modal-form input").attr("disabled",true);
                        $(".addSubmitButton-term").addClass("hidden");
                        $(".confirmAdd-term").removeClass("hidden")
                        $(".addProceedButton-term").removeClass("hidden")
                    }
                });
            });

            $(".addCancelButton-term").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",false);
                $(".confirmAdd-term").addClass("hidden")
                $(".addSubmitButton-term").removeClass("hidden")
                $(".addProceedButton-term").addClass("hidden")
                $(".btn-reset-term").trigger("click")
            });

            //Add
            $(".addProceedButton-term").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "docketNumber"          : $("#add_docket_no-term").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "fieldOffice"           : $.wms.urlParam('field'),
                    "fieldOfficeId"         : $.wms.urlParam('officeId'),
                    "dateReturned"           : $("#add_date_com_and_ret-term").val(),
                    "clientProfileDto"      : {
                        "docketNumber"          : $("#add_docket_no-term").val().toUpperCase(),
                        "createdBy"             : $.cookie("USER_ID"),
                        "updatedBy"             : "",
                        "status"                : true,
                        "source"                : "2",
                        "encodingMonth"         : $.wms.urlParam('date'),
                        "firstName"             : $("#add_offender_fname-term").val(),
                        "middleName"            : $("#add_offender_mname-term").val(),
                        "lastName"              : $("#add_offender_lname-term").val(),
                        "suffix"                : $("#add_offender_sname-term").val()
                    },

                }
                console.log(payload)
                $.wms.executeExternalPost('http://192.168.1.184:8000/F45t13CRT/create',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){

                        $(".modal-loader").addClass("hidden")
                        $(".addProceedButton-term").attr('disabled',false)
                        $("#modal-add-term").modal('toggle')
                        $(".btn-reset-term").trigger("click")

                        var form = "Added Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". " + JSON.stringify(result.response);
                        var payload_audit = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                            location.reload();
                        });

                    }
                    else if(result.status == "FAILED"){
                        $(".err_msg").remove()
                        $(".addProceedButton-term").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("#add_docket_no-term").attr('disabled',false)
                        $("#add_docket_no-term").addClass("error_field");
                        $("<p class='err_msg color-red font_12 i'>*"+result.message+"</p>").insertAfter(("#add_docket_no-term"))

                    }
                });    
            })
        
        }
        var __download_print = function(){
            var __maxTableSize = 0;
            var __counter = 0;

            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')
            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t13?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t13?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }      
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    // console.log(__maxTableSize);
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
                            $("#r"+r+"c3").html(data.criminalCaseNo);
                            $("#r"+r+"c4").html(data.courtOfOrigin);
                            $("#r"+r+"c5").html(data.referringOffice);
                            $("#r"+r+"c6").html(data.supervisingOfficer);
                            $("#r"+r+"c7").html(data.periodCourtesySupervision);
                            $("#r"+r+"c8").html(data.dateReceived);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });
            var api;
            if (officeId === "ALL") {
                var api = 'http://192.168.1.184:8000/F45t13CRT?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
            }else {
                var api = 'http://192.168.1.184:8000/F45t13CRT?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            }
            $.wms.executeExternalGet(api).done(function (result) {
                console.log(result.content)

                __counter += 1;
                if(result.content.length > __maxTableSize){
                    __maxTableSize = result.content.length
                    // console.log(__maxTableSize);
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
                            $("#r"+r+"c9").html(data.docketNumber);
                            $("#r"+r+"c10").html(fullname);
                            $("#r"+r+"c11").html(data.dateReturned);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            var __download_print_list = function(){

                if(__counter == 2){
                    console.log("FINISH")
                    console.log(__maxTableSize);
                    if(__maxTableSize > 0){
                        $(".T_F45T13_download_print_tbody").empty()
                        for(i=1;i<=__maxTableSize;i++){
                            $(".T_F45T13_download_print_tbody").append(
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
                        $(".T_F45T13_download_print_tbody").append(
                                "<tr>"+
                                    "<td colspan='11' class='center b'>NONE</td>"+
                                "</tr>");
                    }
                };
                // Download
                $(".btn-download").unbind("click").on("click",function(){
                    console.log("clicked")
                   
                    $("#T_F45T13_download_print").table2excel({
                        // exclude CSS class
                        exclude: ".options",
                        name: "Form45-Table13",
                        filename: "Form45-Table13.xls", //do not include extension
                        fileext: ".xls",
                        preserveColors: true
                      }); 
                });
            };
        };

        
        var __submitCPPO = function(){
            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')
            var field       = $.wms.urlParam('field')
            
            $(".btnSubmitProceed").unbind("click").on('click', function (){
                console.log("submit CPPO")

                var payload = {
                  "encodingMonth"   : yearMonth,
                  "fieldOfficeId"   : officeId,
                  "fieldOfficeName" : field,
                  "formTable"       : 'F45',
                  "requestorId"     : $.cookie("USER_ID"),
                  "createdBy"       : $.cookie("USER_ID"),
                }

                $.wms.executeExternalPost('http://192.168.1.184:8000/form/submit',JSON.stringify(payload)).done(function (result) {
                    console.log(result)
                        location.reload();
                })
            })
        };

        __submitCPPO();

        __rcv();
        __terminated();
        __download_print();
    };


    var __attachF45CSCSPageEvent = function() {
        console.log("form45 caseload")
        var field_office =  $.wms.urlParam('field')
        var date =  $.wms.urlParam('date')
        var officeId =  $.wms.urlParam('officeId')
        var isocode      =  $.wms.urlParam('isocode')
        console.log(isocode)

        $(".certUpload").unbind("click").on("click", function(){
            console.log("clicked")
            var fileToUpload = $('#fileupload').prop('files')[0];

            if (fileToUpload === undefined) {
                alert("Please Choose File Before Upload!")
            }else {
                var formdata = new FormData();
                formdata.append("files", fileupload.files[0], fileupload.files[0].name);

                $.wms.executeFile('http://192.168.1.184:8000/cert/upload?officeId='+officeId+'&yearMonth='+date+'&uploaderId='+$.cookie("USER_ID")+'&formTable=f45',formdata).done(function (result) {
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
                formTable : "f45"
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
                            "<td align='center' class='options'><a href="+'http://192.168.1.184:8000/cert/view/'+data.id+"><button class='access_f45_write btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a></td></tr>"
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
        var field =  $.wms.urlParam('field');
        let firstWord = field.split(" ")[0]
        console.log(firstWord);
        // var officeId;
        if (officeId === "ALL") {
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/getAllFieldOffices2',JSON.stringify(payload)).done(function (result) {
                console.log("================")
                var fi = [];
                result.payload.forEach(function(data){
                    // console.log(data.ID)
                    fi.push(data.ID);
                })
                var officeId = fi;
                var payload = {
                    officeIdList  : officeId,
                    yearMonthList : [date]
                }

                $.wms.executeExternalPost('http://192.168.1.184:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                    console.log(result)
                    $('.Id').text(result.id);
                    $('.Id1').text(result.id1);
                    $('.Id1a').text(result.id1a);
                    $('.Id1b').text(result.id1b);
                    $('.Id2').text(result.id2);
                    $('.IId1').text(result.iid1);
                    $('.IId2').text(result.iid2);
                    $('.IVd').text(result.ivd);
                    $('.IVd1').text(result.ivd1);
                    $('.Ivd2').text(result.ivd2);

                    $('.IVd3').text(result.ivd3);
                    $('.IVe').text(result.ive);
                    $('.IVe1').text(result.ive1);
                    $('.IVe1a').text(result.ive1a);
                    $('.IVe1b').text(result.ive1b);
                    $('.IVe1c').text(result.ive1c);
                    $('.Va').text(result.va);
                    $('.Va1').text(result.va1);
                    $('.Va2').text(result.va2);
                    $('.Va3').text(result.va3);

                    $('.Ia').text(result.ia);
                    $('.Ib').text(result.ib);
                    $('.Ib1').text(result.ib1);
                    $('.Ib2').text(result.ib2);
                    $('.Ic').text(result.ic);
                    $('.Ie').text(result.ie);
                    $('.IIa').text(result.iia);
                    $('.IIb').text(result.iib);
                    $('.IIc').text(result.iic);
                    $('.IId').text(result.iid);

                    $('.IIe').text(result.iie);
                    $('.IIIa').text(result.iiia);
                    $('.IIIb').text(result.iiib);
                    $('.IIIc').text(result.iiic);
                    $('.IIId').text(result.iiid);
                    $('.IIIe').text(result.iiie);
                    $('.IVa').text(result.iva);
                    $('.IVb').text(result.ivb);
                    $('.IVc').text(result.ivc);
                    $('.IVf').text(result.ivf);

                    $('.Vb').text(result.vb);
                    $('.Vb1').text(result.vb1);
                    $('.Vb2').text(result.vb2);
                    $('.Vb3').text(result.vb3);
                    $('.Vc').text(result.vc);
                    $('.Vd').text(result.vd);
                    $('.Vd1').text(result.vd1);
                    $('.Vd2').text(result.vd2);
                    $('.Vd3').text(result.vd3);
                    $('.Ve').text(result.ve);

                    $('.VIa').text(result.via);
                    $('.VIb').text(result.vib);
                    $('.VIc').text(result.vic);
                    $('.VId').text(result.vid);
                    $('.VIe').text(result.vie);
                });
            })
        } else if (firstWord === "Regional") {
            var officeId =  $.wms.urlParam('officeId')
            var payload = {
                field_id  : officeId,
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/getRegionByFieldOfficeID',JSON.stringify(payload)).done(function (result) {
                console.log("================")
                var payload2 = {
                    REGION  : result.payload.REGION,
                }
                console.log(payload2)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
                    console.log("================")
                    console.log(result)
                    var fi = [];
                    result.payload.forEach(function(data){
                        // console.log(data.ID)
                        fi.push(data.ID);
                    })
                    var officeId = fi;
                    var payload = {
                        officeIdList  : officeId,
                        yearMonthList : [date]
                    }

                    $.wms.executeExternalPost('http://192.168.1.184:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        $('.Id').text(result.id);
                        $('.Id1').text(result.id1);
                        $('.Id1a').text(result.id1a);
                        $('.Id1b').text(result.id1b);
                        $('.Id2').text(result.id2);
                        $('.IId1').text(result.iid1);
                        $('.IId2').text(result.iid2);
                        $('.IVd').text(result.ivd);
                        $('.IVd1').text(result.ivd1);
                        $('.Ivd2').text(result.ivd2);

                        $('.IVd3').text(result.ivd3);
                        $('.IVe').text(result.ive);
                        $('.IVe1').text(result.ive1);
                        $('.IVe1a').text(result.ive1a);
                        $('.IVe1b').text(result.ive1b);
                        $('.IVe1c').text(result.ive1c);
                        $('.Va').text(result.va);
                        $('.Va1').text(result.va1);
                        $('.Va2').text(result.va2);
                        $('.Va3').text(result.va3);

                        $('.Ia').text(result.ia);
                        $('.Ib').text(result.ib);
                        $('.Ib1').text(result.ib1);
                        $('.Ib2').text(result.ib2);
                        $('.Ic').text(result.ic);
                        $('.Ie').text(result.ie);
                        $('.IIa').text(result.iia);
                        $('.IIb').text(result.iib);
                        $('.IIc').text(result.iic);
                        $('.IId').text(result.iid);

                        $('.IIe').text(result.iie);
                        $('.IIIa').text(result.iiia);
                        $('.IIIb').text(result.iiib);
                        $('.IIIc').text(result.iiic);
                        $('.IIId').text(result.iiid);
                        $('.IIIe').text(result.iiie);
                        $('.IVa').text(result.iva);
                        $('.IVb').text(result.ivb);
                        $('.IVc').text(result.ivc);
                        $('.IVf').text(result.ivf);

                        $('.Vb').text(result.vb);
                        $('.Vb1').text(result.vb1);
                        $('.Vb2').text(result.vb2);
                        $('.Vb3').text(result.vb3);
                        $('.Vc').text(result.vc);
                        $('.Vd').text(result.vd);
                        $('.Vd1').text(result.vd1);
                        $('.Vd2').text(result.vd2);
                        $('.Vd3').text(result.vd3);
                        $('.Ve').text(result.ve);

                        $('.VIa').text(result.via);
                        $('.VIb').text(result.vib);
                        $('.VIc').text(result.vic);
                        $('.VId').text(result.vid);
                        $('.VIe').text(result.vie);
                    });
                    console.log("================")

                })
                console.log("================")

            })
        } else {
            var officeId =  $.wms.urlParam('officeId')

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
            __cert_list_upload();

            
            $.wms.executeExternalGet('http://192.168.1.184:8000/F45Caseload?id='+officeId+'&yearMonth='+date).done(function (result) {
                console.log(result)
                $('.Id').text(result.id);
                $('.Id1').text(result.id1);
                $('.Id1a').text(result.id1a);
                $('.Id1b').text(result.id1b);
                $('.Id2').text(result.id2);
                $('.IId1').text(result.iid1);
                $('.IId2').text(result.iid2);
                $('.IVd').text(result.ivd);
                $('.IVd1').text(result.ivd1);
                $('.Ivd2').text(result.ivd2);

                $('.IVd3').text(result.ivd3);
                $('.IVe').text(result.ive);
                $('.IVe1').text(result.ive1);
                $('.IVe1a').text(result.ive1a);
                $('.IVe1b').text(result.ive1b);
                $('.IVe1c').text(result.ive1c);
                $('.Va').text(result.va);
                $('.Va1').text(result.va1);
                $('.Va2').text(result.va2);
                $('.Va3').text(result.va3);

                $('.Ia').text(result.ia);
                $('.Ib').text(result.ib);
                $('.Ib1').text(result.ib1);
                $('.Ib2').text(result.ib2);
                $('.Ic').text(result.ic);
                $('.Ie').text(result.ie);
                $('.IIa').text(result.iia);
                $('.IIb').text(result.iib);
                $('.IIc').text(result.iic);
                $('.IId').text(result.iid);

                $('.IIe').text(result.iie);
                $('.IIIa').text(result.iiia);
                $('.IIIb').text(result.iiib);
                $('.IIIc').text(result.iiic);
                $('.IIId').text(result.iiid);
                $('.IIIe').text(result.iiie);
                $('.IVa').text(result.iva);
                $('.IVb').text(result.ivb);
                $('.IVc').text(result.ivc);
                $('.IVf').text(result.ivf);

                $('.Vb').text(result.vb);
                $('.Vb1').text(result.vb1);
                $('.Vb2').text(result.vb2);
                $('.Vb3').text(result.vb3);
                $('.Vc').text(result.vc);
                $('.Vd').text(result.vd);
                $('.Vd1').text(result.vd1);
                $('.Vd2').text(result.vd2);
                $('.Vd3').text(result.vd3);
                $('.Ve').text(result.ve);

                $('.VIa').text(result.via);
                $('.VIb').text(result.vib);
                $('.VIc').text(result.vic);
                $('.VId').text(result.vid);
                $('.VIe').text(result.vie);
            });
        }
        
        if (isocode == null) {
            $(".isocode_").val("PPA-FO-FR-045")
        } else if (isocode != null) {
            $(".isocode_").val(isocode)
        } else {
            $(".isocode_").val()
        }

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
            doc.text(40, 136, 'Community Service', {
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

    };

    

    return {
        attachF45T1PageEvent : __attachF45T1PageEvent,
        attachF45T2PageEvent : __attachF45T2PageEvent,
        attachF45T3PageEvent : __attachF45T3PageEvent,
        attachF45T4PageEvent : __attachF45T4PageEvent,
        attachF45T5PageEvent : __attachF45T5PageEvent,
        attachF45T6PageEvent : __attachF45T6PageEvent,
        attachF45T7PageEvent : __attachF45T7PageEvent,
        attachF45T8PageEvent : __attachF45T8PageEvent,
        attachF45T9PageEvent : __attachF45T9PageEvent,
        attachF45T10PageEvent : __attachF45T10PageEvent,
        attachF45T11PageEvent : __attachF45T11PageEvent,
        attachF45T12PageEvent : __attachF45T12PageEvent,
        attachF45T13PageEvent : __attachF45T13PageEvent,
        attachF45CSCSPageEvent : __attachF45CSCSPageEvent
    };
}());
