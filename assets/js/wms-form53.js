/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.form53 = (typeof $.wms.form53 !== 'undefined') ? $.wms : {};

$.wms.form53 = (function() {

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


    var __attachF53T1PageEvent = function() {
        console.log("f53t1 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T1_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __carryoverF53t1 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F53t1"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.33:8000/F53t1/carryover',JSON.stringify(payload)).done(function (result) {
      
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

        __carryoverF53t1();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t1?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T1_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T1').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t1/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t1/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                        $("#edit_officer").val(payload.assignedOfficer)
                       
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
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
                                    "assignedOfficer"       : $("#edit_officer").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t1/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T1").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table1",
                filename: "Form53-Table1.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'HCS' ];
            var requiredField= [ 'add_fname', 'add_lname'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
                "assignedOfficer"       : $("#add_officer").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t1/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T2PageEvent = function() {
        console.log("f53t2 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T2_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t2?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T2_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T2').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t2/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t2/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                        $("#edit_officer").val(payload.assignedOfficer)
                       
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
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
                                    "assignedOfficer"       : $("#edit_officer").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t2/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T2").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table2",
                filename: "Form53-Table2.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'HCS' ];
            var requiredField= [ 'add_fname', 'add_lname'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
                "assignedOfficer"       : $("#add_officer").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t2/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T3PageEvent = function() {
        console.log("f53t3 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T3_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __carryoverF53t3 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F53t3"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.33:8000/F53t3/carryover',JSON.stringify(payload)).done(function (result) {
      
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

        __carryoverF53t3();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t3?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t3?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T3_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T3').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t3/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t3/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                        $("#edit_officer").val(payload.assignedOfficer)
                       
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
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
                                    "assignedOfficer"       : $("#edit_officer").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t3/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T3").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table3",
                filename: "Form53-Table3.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'HCS' ];
            var requiredField= [ 'add_fname', 'add_lname'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
                "assignedOfficer"       : $("#add_officer").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t3/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T4PageEvent = function() {
        console.log("f53t4 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T4_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t4?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t4?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T4_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T4').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t4/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t4/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                        $("#edit_officer").val(payload.assignedOfficer)
                       
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
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
                                    "assignedOfficer"       : $("#edit_officer").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t4/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T4").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table4",
                filename: "Form53-Table4.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'HCS' ];
            var requiredField= [ 'add_fname', 'add_lname'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
                "assignedOfficer"       : $("#add_officer").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t4/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T5PageEvent = function() {
        console.log("f53t5 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T5_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __carryoverF53t5 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F53t5"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.33:8000/F53t5/carryover',JSON.stringify(payload)).done(function (result) {
      
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

        __carryoverF53t5();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t5?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t5?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T5_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T5').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t5/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t5/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                        $("#edit_officer").val(payload.assignedOfficer)
                       
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
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
                                    "assignedOfficer"       : $("#edit_officer").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t5/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T5").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table5",
                filename: "Form53-Table5.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'HCS' ];
            var requiredField= [ 'add_fname', 'add_lname'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
                "assignedOfficer"       : $("#add_officer").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t5/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T6PageEvent = function() {
        console.log("f53t6 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T6_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t6?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t6?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T6_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.criminalCaseNo+"</td>"+
                    "<td>"+data.courtOfOrigin+"</td>"+
                    "<td>"+data.offense+"</td>"+
                    "<td>"+data.sentence+"</td>"+
                    "<td>"+data.dateOfCourtOrder+"</td>"+
                    "<td>"+data.dateReceived+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td>"+data.dateSubmitted+"</td>"+
                    "<td>"+data.ppoRecommendation+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T6').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t6/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t6/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_cc_no").val(payload.criminalCaseNo)
                        $("#edit_court_origin").val(payload.courtOfOrigin)
                        $("#edit_offense").val(payload.offense)
                        $("#edit_sentence").val(payload.sentence)
                        $("#edit_date_court_order").val(payload.dateOfCourtOrder)
                        $("#edit_date_rcv").val(payload.dateReceived)
                        $("#edit_officer").val(payload.assignedOfficer)
                        $("#edit_date_submitted").val(payload.dateSubmitted)
                        $("#edit_ppo_recommendation").val(payload.ppoRecommendation).trigger('change')
                       
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
                                    "courtOfOrigin"         : $("#edit_court_origin").val(),
                                    "offense"               : $("#edit_offense").val(),
                                    "sentence"              : $("#edit_sentence").val(),
                                    "dateOfCourtOrder"      : $("#edit_date_court_order").val(),
                                    "dateReceived"          : $("#edit_date_rcv").val(),
                                    "dateSubmitted"         : $("#edit_date_submitted").val(),
                                    "assignedOfficer"       : $("#edit_officer").val(),
                                    "ppoRecommendation"     : $("#edit_ppo_recommendation").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t6/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T6").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table6",
                filename: "Form53-Table6.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'HCS' ];
            var requiredField= [ 'add_fname', 'add_lname', 'add_date_submitted'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "courtOfOrigin"         : $("#add_court_origin").val(),
                "offense"               : $("#add_offense").val(),
                "sentence"              : $("#add_sentence").val(),
                "dateOfCourtOrder"      : $("#add_date_court_order").val(),
                "dateReceived"          : $("#add_date_rcv").val(),
                "dateSubmitted"         : $("#add_date_submitted").val(),
                "assignedOfficer"       : $("#add_officer").val(),
                "ppoRecommendation"     : $("#add_ppo_recommendation").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t6/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T7PageEvent = function() {
        console.log("f53t7 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T7_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __carryoverF53t7 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F53t7"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.33:8000/F53t7/carryover',JSON.stringify(payload)).done(function (result) {
      
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

        __carryoverF53t7();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t7?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t7?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T7_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateSubmitted+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T7').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t7/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t7/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_date_rcv").val(payload.dateSubmitted)
                        $("#edit_officer").val(payload.assignedOfficer)
                       
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
                                    "dateSubmitted"         : $("#edit_date_rcv").val(),
                                    "assignedOfficer"       : $("#edit_officer").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t7/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T7").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table7",
                filename: "Form53-Table7.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'HCS' ];
            var requiredField= [ 'add_fname', 'add_lname'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "dateSubmitted"         : $("#add_date_rcv").val(),
                "assignedOfficer"       : $("#add_officer").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t7/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T8PageEvent = function() {
        console.log("f53t8 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T8_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t8?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t8?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            
            //Add
            $.wms.executeExternalGet('http://192.168.1.33:8000/F53t8/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
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
                    $("#add_fname").val($(".docket_list").select2().find(":selected").data("f"));
                    $("#add_mname").val($(".docket_list").select2().find(":selected").data("m"));
                    $("#add_lname").val($(".docket_list").select2().find(":selected").data("l"));
                    $("#add_sname").val($(".docket_list").select2().find(":selected").data("s"));
                });

                $(".addSubmitButton").unbind("click").on("click",function(){
                    var allowedDocket= [ 'HCS' ];
                    var requiredField= [ 'add_fname', 'add_lname'];
                    var check = true
                    var checkTable = ['F53T6', 'F53T7']

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
                        "dateOrderReceived"     : $("#add_date_rcv").val(),
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
                    $.wms.executeExternalPost('http://192.168.1.33:8000/F53t8/create',JSON.stringify(payload)).done(function (result) {
          
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
                $('.F53T8_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateOrderReceived+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T8').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t8/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t8/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_date_rcv").val(payload.dateOrderReceived)
                       
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
                                    "dateOrderReceived"     : $("#edit_date_rcv").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t8/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T8").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table8",
                filename: "Form53-Table8.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

    };
    var __attachF53T9PageEvent = function() {
        console.log("f53t9 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T9_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __carryoverF53t9 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F53t9"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.33:8000/F53t9/carryover',JSON.stringify(payload)).done(function (result) {
      
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

        __carryoverF53t9();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t9?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t9?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T9_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.communityServiceStart+"</td>"+
                    "<td>"+data.communityServiceEnd+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T9').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t9/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t9/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_assigned_officer").val(payload.assignedOfficer)
                        $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                        $("#edit_com_start").val(payload.communityServiceStart)
                        $("#edit_com_end").val(payload.communityServiceEnd)
                       
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
                                    "assignedOfficer"       : $("#edit_assigned_officer").val(),
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
                                    "communityServiceStart" : $("#edit_com_start").val(),
                                    "communityServiceEnd"   : $("#edit_com_end").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t9/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T9").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table9",
                filename: "Form53-Table9.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SCS' ];
            var requiredField= [ 'add_fname', 'add_lname'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "assignedOfficer"       : $("#add_assigned_officer").val(),
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
                "communityServiceStart" : $("#add_com_start").val(),
                "communityServiceEnd"   : $("#add_com_end").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t9/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T10PageEvent = function() {
        console.log("f53t10 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T10_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t10?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t10?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T10_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.criminalCaseNo+"</td>"+
                    "<td>"+data.courtOfOrigin+"</td>"+
                    "<td>"+data.assignedOfficer+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.communityServiceStart+"</td>"+
                    "<td>"+data.communityServiceEnd+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T10').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t10/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t10/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_cc_no").val(payload.criminalCaseNo)
                        $("#edit_court_origin").val(payload.courtOfOrigin)
                        $("#edit_assigned_officer").val(payload.assignedOfficer)
                        $("#edit_date_rcv").val(payload.dateReceivedByCppo)
                        $("#edit_com_start").val(payload.communityServiceStart)
                        $("#edit_com_end").val(payload.communityServiceEnd)
                       
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
                                    "courtOfOrigin"         : $("#edit_court_origin").val(),
                                    "assignedOfficer"       : $("#edit_assigned_officer").val(),
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
                                    "communityServiceStart" : $("#edit_com_start").val(),
                                    "communityServiceEnd"   : $("#edit_com_end").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t10/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T10").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table10",
                filename: "Form53-Table10.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SCS' ];
            var requiredField= [ 'add_fname', 'add_lname'];
            var check = true
            var checkTable = ['F53T1', 'F53T2']

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
                "courtOfOrigin"         : $("#add_court_origin").val(),
                "assignedOfficer"       : $("#add_assigned_officer").val(),
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
                "communityServiceStart" : $("#add_com_start").val(),
                "communityServiceEnd"   : $("#add_com_end").val(),
                "clientProfileDto"      : {
                    "docketNumber"          : $("#add_docket_no").val().toUpperCase(),
                    "createdBy"             : $.cookie("USER_ID"),
                    "updatedBy"             : "",
                    "status"                : true,
                    "source"                : "2",
                    "encodingMonth"         : $.wms.urlParam('date'),
                    "firstName"             : $("#add_fname").val(),
                    "middleName"            : $("#add_mname").val(),
                    "lastName"              : $("#add_lname").val(),
                    "suffix"                : $("#add_sname").val()
                },

            }
            console.log(payload)
            $.wms.executeExternalPost('http://192.168.1.33:8000/F53t10/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF53T11PageEvent = function() {
        console.log("f53t11 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F53T11_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

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
                  "formTable"       : 'F53',
                  "requestorId"     : $.cookie("USER_ID"),
                  "createdBy"       : $.cookie("USER_ID"),
                }

                $.wms.executeExternalPost('http://192.168.1.33:8000/form/submit',JSON.stringify(payload)).done(function (result) {
                    console.log(result)
                        location.reload();
                })
            })
        };

        __submitCPPO();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F53t11?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F53t11?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F53T11_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateOrderReceived+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f53_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f53_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F53T11').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
                $('.dataTables_length').addClass('bs-select');
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F53t11/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F53t11/'+data_id).done(function (result2) {
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
                        $("#edit_fname").val(payload.clientProfileDto.firstName)
                        $("#edit_mname").val(payload.clientProfileDto.middleName)
                        $("#edit_lname").val(payload.clientProfileDto.lastName)
                        $("#edit_sname").val(payload.clientProfileDto.suffix).trigger('change')
                        $("#edit_date_rcv").val(payload.dateOrderReceived)
                       
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
                                    "dateOrderReceived"     : $("#edit_date_rcv").val(),
                                    "clientProfileDto"      : {
                                        "docketNumber"          : $("#edit_docket_no").val().toUpperCase(),
                                        "updatedBy"             : $.cookie("USER_ID"),
                                        "source"                : "2",
                                        "encodingMonth"         : $.wms.urlParam('date'),
                                        "firstName"             : $("#edit_fname").val(),
                                        "middleName"            : $("#edit_mname").val(),
                                        "lastName"              : $("#edit_lname").val(),
                                        "suffix"                : $("#edit_sname").val()
                                    },

                                }
                                console.log(payload_update)
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F53t11/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F53T11").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form53-Table11",
                filename: "Form53-Table11.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $.wms.executeExternalGet('http://192.168.1.33:8000/F53t11/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
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
                $("#add_fname").val($(".docket_list").select2().find(":selected").data("f"));
                $("#add_mname").val($(".docket_list").select2().find(":selected").data("m"));
                $("#add_lname").val($(".docket_list").select2().find(":selected").data("l"));
                $("#add_sname").val($(".docket_list").select2().find(":selected").data("s"));
            });
            $(".addSubmitButton").unbind("click").on("click",function(){
                var allowedDocket= [ 'SCS' ];
                var requiredField= [ 'add_fname', 'add_lname'];
                var check = true
                var checkTable = ['F53T1', 'F53T2']

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
                    "dateOrderReceived"     : $("#add_date_rcv").val(),
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
                $.wms.executeExternalPost('http://192.168.1.33:8000/F53t11/create',JSON.stringify(payload)).done(function (result) {
      
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
        })

    };


    var __attachF53CSAIPCSPageEvent = function() {
        console.log("form53 caseload")
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

                $.wms.executeFile('http://192.168.1.33:8000/cert/upload?officeId='+officeId+'&yearMonth='+date+'&uploaderId='+$.cookie("USER_ID")+'&formTable=f53',formdata).done(function (result) {
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
                formTable : "f53"
            }
            $.wms.executeExternalPost('http://192.168.1.33:8000/cert/list',JSON.stringify(payload)).done(function (result) {
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
                            "<td align='center' class='options'><a href="+'http://192.168.1.33:8000/cert/view/'+data.id+"><button class='access_f53_write btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a></td></tr>"
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

                //     // $.wms.executeExternalGet('http://192.168.1.33:8000/cert/view/'+data_id).done(function (result2) {
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
                $.wms.executeExternalPost('http://192.168.1.33:8000/F53Caseload',JSON.stringify(payload)).done(function (result) {
                    console.log(result)
                    $('.ia').text(result.ia);
                    $('.ib').text(result.ib);
                    $('.iia').text(result.iia);
                    $('.iib').text(result.iib);
                    $('.iiia').text(result.iiia);
                    $('.iiib').text(result.iiib);
                    $('.iiic').text(result.iiic);
                    $('.via').text(result.via);
                    $('.vib').text(result.vib);
                    $('.vic').text(result.vic);
                    $('.vid').text(result.vid);
                    $('.vie').text(result.vie);
                    $('.iv').text(result.iv);
                    $('.v').text(result.v);
                    $('.vid1').text(result.vid1);
                    $('.vid2').text(result.vid2);
                    $('.viia').text(result.viia);
                    $('.viib').text(result.viib);
                    $('.viic').text(result.viic);
                    $('.viid').text(result.viid);
                    $('.viie').text(result.viie);
                });
            });
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
                    
                    $.wms.executeExternalPost('http://192.168.1.33:8000/F53Caseload',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        $('.ia').text(result.ia);
                        $('.ib').text(result.ib);
                        $('.iia').text(result.iia);
                        $('.iib').text(result.iib);
                        $('.iiia').text(result.iiia);
                        $('.iiib').text(result.iiib);
                        $('.iiic').text(result.iiic);
                        $('.via').text(result.via);
                        $('.vib').text(result.vib);
                        $('.vic').text(result.vic);
                        $('.vid').text(result.vid);
                        $('.vie').text(result.vie);
                        $('.iv').text(result.iv);
                        $('.v').text(result.v);
                        $('.vid1').text(result.vid1);
                        $('.vid2').text(result.vid2);
                        $('.viia').text(result.viia);
                        $('.viib').text(result.viib);
                        $('.viic').text(result.viic);
                        $('.viid').text(result.viid);
                        $('.viie').text(result.viie);
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
            
            $.wms.executeExternalGet('http://192.168.1.33:8000/F53Caseload?id='+officeId+'&yearMonth='+date).done(function (result) {
                console.log(result)
                $('.ia').text(result.ia);
                $('.ib').text(result.ib);
                $('.iia').text(result.iia);
                $('.iib').text(result.iib);
                $('.iiia').text(result.iiia);
                $('.iiib').text(result.iiib);
                $('.iiic').text(result.iiic);
                $('.via').text(result.via);
                $('.vib').text(result.vib);
                $('.vic').text(result.vic);
                $('.vid').text(result.vid);
                $('.vie').text(result.vie);
                $('.iv').text(result.iv);
                $('.v').text(result.v);
                $('.vid1').text(result.vid1);
                $('.vid2').text(result.vid2);
                $('.viia').text(result.viia);
                $('.viib').text(result.viib);
                $('.viic').text(result.viic);
                $('.viid').text(result.viid);
                $('.viie').text(result.viie);
            });
        }
        if (isocode == null) {
            $(".isocode_").val("PPA-FO-FR-053")
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
            doc.text(40, 136, 'COMMUNITY SERVICE AS IMPRISONMENT PENALTY ', {
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
        attachF53T1PageEvent : __attachF53T1PageEvent,
        attachF53T2PageEvent : __attachF53T2PageEvent,
        attachF53T3PageEvent : __attachF53T3PageEvent,
        attachF53T4PageEvent : __attachF53T4PageEvent,
        attachF53T5PageEvent : __attachF53T5PageEvent,
        attachF53T6PageEvent : __attachF53T6PageEvent,
        attachF53T7PageEvent : __attachF53T7PageEvent,
        attachF53T8PageEvent : __attachF53T8PageEvent,
        attachF53T9PageEvent : __attachF53T9PageEvent,
        attachF53T10PageEvent : __attachF53T10PageEvent,
        attachF53T11PageEvent : __attachF53T11PageEvent,
        attachF53CSAIPCSPageEvent : __attachF53CSAIPCSPageEvent
    };
}());
