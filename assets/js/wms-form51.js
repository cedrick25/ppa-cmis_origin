/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.form51 = (typeof $.wms.form51 !== 'undefined') ? $.wms : {};

$.wms.form51 = (function() {

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




    var __attachF51T1PageEvent = function() {
        console.log("f51t1 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F51T1_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __carryoverF51t1 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F51t1"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://192.168.1.33:8000/F51t1/carryover',JSON.stringify(payload)).done(function (result) {
      
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

        __carryoverF51t1();

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F51t1?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F51t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F51T1_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f51_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f51_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F51T1').DataTable({
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F51t1/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F51t1/'+data_id).done(function (result2) {
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
                        $("#edit_officer").val(payload.supervisingOfficer)
                       
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
                                    "supervisingOfficer"    : $("#edit_officer").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F51t1/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F51T1").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form51-Table1",
                filename: "Form51-Table1.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'ROR' ];
            var requiredField= [ 'add_fname', 'add_lname', 'add_date_rcv', 'add_officer'];
            var check = true
            var checkTable = ['F51T1', 'F51T2']

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
                "supervisingOfficer"    : $("#add_officer").val(),
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
            $.wms.executeExternalPost('http://192.168.1.33:8000/F51t1/create',JSON.stringify(payload)).done(function (result) {
  
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
                    $("<p class='err_msg color-red font_12 i'>*Docket number existed</p>").insertAfter(("#add_docket_no"))
                }
            });    
        })

    };


    var __attachF51T2PageEvent = function() {
        console.log("f51t2 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F51T2_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F51t2?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F51t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
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
                $('.F51T2_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.criminalCaseNo+"</td>"+
                    "<td>"+data.offense+"</td>"+
                    "<td>"+data.courtOfOrigin+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f51_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f51_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F51T2').DataTable({
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F51t2/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F51t2/'+data_id).done(function (result2) {
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
                        $("#edit_officer").val(payload.supervisingOfficer)
                       
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
                                    "offense"               : $("#edit_offense").val(),
                                    "courtOfOrigin"         : $("#edit_court_origin").val(),
                                    "supervisingOfficer"    : $("#edit_officer").val(),
                                    "dateReceivedByCppo"    : $("#edit_date_rcv").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F51t2/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F51T2").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form51-Table2",
                filename: "Form51-Table2.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'ROR' ];
            var requiredField= [ 'add_fname', 'add_lname', 'add_date_rcv', 'add_officer'];
            var check = true
            var checkTable = ['F51T1', 'F51T2']

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
                "offense"               : $("#add_offense").val(),
                "courtOfOrigin"         : $("#add_court_origin").val(),
                "supervisingOfficer"    : $("#add_officer").val(),
                "dateReceivedByCppo"    : $("#add_date_rcv").val(),
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
            $.wms.executeExternalPost('http://192.168.1.33:8000/F51t2/create',JSON.stringify(payload)).done(function (result) {
  
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

    var __attachF51T3PageEvent = function() {
        console.log("f51t3 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F51T3_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var api;
        if (officeId === "ALL") {
            var api = 'http://192.168.1.33:8000/F51t3?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F51t3?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            
            //Add
            $.wms.executeExternalGet('http://192.168.1.33:8000/F51t3/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
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
                    var allowedDocket= [ 'ROR' ];
                    var requiredField= [ 'add_fname', 'add_lname'];
                    var check = true
                    var checkTable = ['F51T1', 'F51T2']

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
                        "supervisingOfficer"    : $("#add_officer").val(),
                        "dateReportSubmitted"   : $("#add_date_report").val(),
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
                    $.wms.executeExternalPost('http://192.168.1.33:8000/F51t3/create',JSON.stringify(payload)).done(function (result) {
          
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
                        else{
                            $(".err_msg").remove()
                            $(".addProceedButton").attr('disabled',false)
                            $(".modal-loader").addClass("hidden")
                            $("#add_docket_no").attr('disabled',false)
                            $("#add_docket_no").addClass("error_field");
                            $("<p class='err_msg color-red font_12 i'>*Internal error or bad request</p>").insertAfter(("#add_docket_no"))
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
                $('.F51T3_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td>"+data.dateReportSubmitted+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f51_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f51_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F51T3').DataTable({
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F51t3/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F51t3/'+data_id).done(function (result2) {
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
                        $("#edit_officer").val(payload.supervisingOfficer)
                        $("#edit_date_report").val(payload.dateReportSubmitted)
                       
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
                                    "supervisingOfficer"    : $("#edit_officer").val(),
                                    "dateReportSubmitted"   : $("#edit_date_report").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F51t3/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F51T3").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form51-Table3",
                filename: "Form51-Table3.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

    };

    var __attachF51T4PageEvent = function() {
        console.log("f51t4 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F51T4_tbody').empty();
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

                $('.btnSubmitProceed').prop('disabled', true);
                var payload = {
                  "encodingMonth"   : yearMonth,
                  "fieldOfficeId"   : officeId,
                  "fieldOfficeName" : field,
                  "formTable"       : 'F51',
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
            var api = 'http://192.168.1.33:8000/F51t4?yearMonth='+yearMonth+'&page='+page+'&size='+size+''
        }else {
            var api = 'http://192.168.1.33:8000/F51t4?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+''
            
            //Add
            $.wms.executeExternalGet('http://192.168.1.33:8000/F51t4/lookup?yearMonth='+yearMonth+'&officeId='+officeId+'').done(function (result) {
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
                    var allowedDocket= [ 'ROR' ];
                    var requiredField= [ 'add_fname', 'add_lname'];
                    var check = true
                    var checkTable = ['F51T1', 'F51T2']

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
                        "courtDisposition"      : $("#add_disposition").val(),
                        "dateDisposed"          : $("#add_date_disposed").val(),
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
                    $.wms.executeExternalPost('http://192.168.1.33:8000/F51t4/create',JSON.stringify(payload)).done(function (result) {
          
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
                $('.F51T4_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.courtDisposition+"</td>"+
                    "<td>"+data.dateDisposed+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_f51_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_f51_write btn btn-danger btn-sm btn-delete hidden form_lock' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
            });
            $(document).ready(function () {
                var table = $('#T_F51T4').DataTable({
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

                    $.wms.executeExternalDelete('http://192.168.1.33:8000/F51t4/'+data_id+'?&user='+profid).done(function (result) {
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
                $.wms.executeExternalGet('http://192.168.1.33:8000/F51t4/'+data_id).done(function (result2) {
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
                        $("#edit_disposition").val(payload.courtDisposition)
                        $("#edit_date_disposed").val(payload.dateDisposed)
                       
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
                                    "courtDisposition"      : $("#edit_disposition").val(),
                                    "dateDisposed"          : $("#edit_date_disposed").val(),
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
                                $.wms.executeExternalPut('http://192.168.1.33:8000/F51t4/'+data_id,JSON.stringify(payload_update)).done(function (result) {
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
            $("#T_F51T4").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form51-Table4",
                filename: "Form51-Table4.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

    };


    var __attachF51RORCSPageEvent = function() {
        console.log("form51 caseload")
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

                $.wms.executeFile('http://192.168.1.33:8000/cert/upload?officeId='+officeId+'&yearMonth='+date+'&uploaderId='+$.cookie("USER_ID")+'&formTable=f51',formdata).done(function (result) {
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
                formTable : "f51"
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
                            "<td align='center' class='options'><a href="+'http://192.168.1.33:8000/cert/view/'+data.id+"><button class=' btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a></td></tr>"
                        )
                    });
                } else {
                    $(".cert_upload").removeClass("hidden")
                }

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
                $.wms.executeExternalPost('http://192.168.1.33:8000/F51Caseload',JSON.stringify(payload)).done(function (result) {
                    console.log(result)
                    $('.ia').text(result.ia);
                    $('.ib').text(result.ib);
                    $('.ic').text(result.ic);
                    $('.id').text(result.id);
                    $('.ie').text(result.ie);
                    $('.if').text(result.if);
                    $('.ii').text(result.ii);
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

                    $.wms.executeExternalPost('http://192.168.1.33:8000/F51Caseload',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        $('.ia').text(result.ia);
                        $('.ib').text(result.ib);
                        $('.ic').text(result.ic);
                        $('.id').text(result.id);
                        $('.ie').text(result.ie);
                        $('.if').text(result.if);
                        $('.ii').text(result.ii);
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
            
            $.wms.executeExternalGet('http://192.168.1.33:8000/F51Caseload?id='+officeId+'&yearMonth='+date).done(function (result) {
                console.log(result)
                $('.ia').text(result.ia);
                $('.ib').text(result.ib);
                $('.ic').text(result.ic);
                $('.id').text(result.id);
                $('.ie').text(result.ie);
                $('.if').text(result.if);
                $('.ii').text(result.ii);
            });
        }
        
        if (isocode == null) {
            $(".isocode_").val("PPA-FO-FR-051")
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
            doc.text(40, 136, 'Release on Recognizance', {
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
        attachF51T1PageEvent : __attachF51T1PageEvent,
        attachF51T2PageEvent : __attachF51T2PageEvent,
        attachF51T3PageEvent : __attachF51T3PageEvent,
        attachF51T4PageEvent : __attachF51T4PageEvent,
        attachF51RORCSPageEvent : __attachF51RORCSPageEvent
    };
}());
