/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.form44 = (typeof $.wms.form44 !== 'undefined') ? $.wms : {};

$.wms.form44 = (function() {


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




    var __attachF44T1PageEvent = function() {
        console.log("f44t1 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        var __carryoverF44t1 = function(){
            $(".carryoverProceedButton").unbind("click").on("click", function(){
                console.log("clicked")
                var payload =  {
                    "officeIdList": [
                        officeId
                    ],
                    "yearMonthList": [
                        yearMonth
                    ],
                      "formTableName": "F44t1"
                }
                console.log(payload);
                $.wms.executeExternalPost('http://localhost:8000/F44t1/carryover',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){
                        $(".modal-loader").addClass("hidden")
                        $(".carryoverProceedButton").attr('disabled',false)
                        $("#modal-carryover").modal('toggle')
                        $(".btn-reset").trigger("click")
                        location.reload();
                    }else{
                        $(".err_msg").remove()
                        $(".carryoverProceedButton").attr('disabled',false)
                        $(".modal-loader").addClass("hidden")
                        $("<p class='err_msg color-red font_12 i'>*carry over failed</p>").insertAfter((".carryoverProceedButton"))
                    }
                });
            });
        };

        __carryoverF44t1();

        $(".form_loader").removeClass("hidden")

        $('.F44T1_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        $.wms.executeExternalGet('http://localhost:8000/F44t1?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T1_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.dateReceivedByCppo+"</td>"+
                    "<td>"+data.investigatingOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t1/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t1/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t1/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T1").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table1",
                filename: "Form44-Table1.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SSI', 'RSSI', 'TSSI' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_date_rcv', 'add_investigating_officer'];
            var check = true
            var checkTable = ['F44T1', 'F44T2']

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
            $.wms.executeExternalPost('http://localhost:8000/F44t1/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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


    var __attachF44T2PageEvent = function() {
        console.log("F44t2 events")


        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T2_tbody_a').empty();
        $('.F44T2_tbody_b').empty();
        $(".form_loader").removeClass("hidden");
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __ref_received = function(){
            console.log("received")


            $.wms.executeExternalGet('http://localhost:8000/F44t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F44T2_tbody_a').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReceivedByCppo+"</td>"+
                        "<td>"+data.investigatingOfficer+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://localhost:8000/F44t2/'+data_id+'?&user='+profid).done(function (result) {
                            $("#modal-delete").modal('toggle')
                            $(".modal-loader").addClass("hidden")
                            $(".deleteProceedButton").attr('disabled',false)
                            if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                    $.wms.executeExternalGet('http://localhost:8000/F44t2/'+data_id).done(function (result2) {
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
                            $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                    $.wms.executeExternalPut('http://localhost:8000/F44t2/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                        if(result.status != undefined && result.status == "SUCCESS"){
                                            location.reload();
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
                var allowedDocket= [ 'SSI', 'RSSI', 'TSSI' ];
                var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_date_rcv', 'add_investigating_officer'];
                var check = true
                var checkTable = ['F44T1', 'F44T2']

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
                $.wms.executeExternalPost('http://localhost:8000/F44t2/create',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){

                        $(".modal-loader").addClass("hidden")
                        $(".addProceedButton").attr('disabled',false)
                        $("#modal-add").modal('toggle')
                        $(".btn-reset").trigger("click")
                        location.reload();

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

            $.wms.executeExternalGet('http://localhost:8000/F44t2Acted?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F44T2_tbody_b').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReportSubmitted+"</td>"+
                        "<td>"+data.ppoRecommendation+"</td>"+
                        "<td>"+data.transferDate+"</td>"+
                        "<td>"+data.transferredTo+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit-acted' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F44_write btn btn-danger btn-sm btn-delete-acted' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://localhost:8000/F44t2Acted/'+data_id+'?&user='+profid).done(function (result) {
                            $("#modal-delete-acted").modal('toggle')
                            $(".modal-loader").addClass("hidden")
                            $(".deleteACTEDProceedButton").attr('disabled',false)
                            if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                    $.wms.executeExternalGet('http://localhost:8000/F44t2Acted/'+data_id).done(function (result2) {
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
                            $("#edit_acted_offenders_sname").val(payload.clientProfileDto.suffix)
                            $("#edit_acted_report_submitted").val(payload.dateReportSubmitted)
                            $("#edit_acted_recommendation").val(payload.ppoRecommendation).trigger('change')
                            $("#edit_acted_transfer_date").val(payload.transferDate)
                            $("#edit_acted_transfer_to").val(payload.transferredTo)
                           
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
                                        "transferredTo"         : $("#edit_acted_transfer_to").val(),
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
                                    $.wms.executeExternalPut('http://localhost:8000/F44t2Acted/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                        if(result.status != undefined && result.status == "SUCCESS"){
                                            location.reload();
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

            //Add
            $(".addSubmitButton_acted").unbind("click").on("click",function(){
                var allowedDocket= [ 'SSI', 'RSSI', 'TSSI' ];
                var requiredField= [ 'add_acted_offenders_fname', 'add_acted_offenders_lname', 'add_acted_report_submitted', 'add_acted_recommendation','add_acted_transfer_date','add_acted_transfer_to'];
                var check = true
                var checkTable = ['F44T1', 'F44T2']

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
                    "transferredTo"         : $("#add_acted_transfer_to").val(),
                    "clientProfileDto"      : {
                        "docketNumber"          : $("#add_acted_docket_no").val().toUpperCase(),
                        "createdBy"             : $.cookie("USER_ID"),
                        "updatedBy"             : "",
                        "status"                : true,
                        "source"                : "2",
                        "encodingMonth"         : $.wms.urlParam('date'),
                        "firstName"             : $("#add_acted_offenders_fname").val(),
                        "middleName"            : $("#add_acted_offenders_mname").val(),
                        "lastName"              : $("#add_acted_offenders_lname").val(),
                        "suffix"                : $("#add_acted_offenders_sname").val()
                    },

                }
                console.log(payload)
                $.wms.executeExternalPost('http://localhost:8000/F44t2Acted/create',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){

                        $(".modal-loader").addClass("hidden")
                        $(".addProceedButton_acted").attr('disabled',false)
                        $("#modal-add").modal('toggle')
                        $(".btn-reset").trigger("click")
                        location.reload();
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
        }

        var __download_print = function(){
            var __maxTableSize = 0;
            var __counter = 0;

            $.wms.executeExternalGet('http://localhost:8000/F44t2?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
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
                            $("#r"+r+"c3").html(data.dateReceivedByCppo);
                            $("#r"+r+"c4").html(data.investigatingOfficer);
                            r += 1;
                        });
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                __download_print_list();
            });

            $.wms.executeExternalGet('http://localhost:8000/F44t2Acted?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
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
                            $("#r"+r+"c5").html(data.docketNumber);
                            $("#r"+r+"c6").html(fullname);
                            $("#r"+r+"c7").html(data.dateReportSubmitted);
                            $("#r"+r+"c8").html(data.ppoRecommendation);
                            $("#r"+r+"c9").html(data.transferDate);
                            $("#r"+r+"c10").html(data.transferredTo);
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
                        $(".T_F44T2_download_print_tbody").empty()
                        for(i=1;i<=__maxTableSize;i++){
                            $(".T_F44T2_download_print_tbody").append(
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
                                "</tr>"
                            )
                        }
                    }else{
                        $(".T_F44T2_download_print_tbody").append(
                                "<tr>"+
                                    "<td colspan='10' class='center b'>NONE</td>"+
                                "</tr>");
                    }
                };
                // Download
                $(".btn-download").unbind("click").on("click",function(){
                    console.log("clicked")
                   
                    $("#T_F44T2_download_print").table2excel({
                        // exclude CSS class
                        exclude: ".options",
                        name: "Form44-Table2",
                        filename: "Form44-Table2.xls", //do not include extension
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

    var __attachF44T3PageEvent = function() {
        console.log("f44t3 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T3_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        $.wms.executeExternalGet('http://localhost:8000/F44t3?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T3_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.investigatingOfficer+"</td>"+
                    "<td>"+data.recommendation+"</td>"+
                    "<td>"+data.dateRecommendation+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t3/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t3/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
                        $("#edit_investigating_officer").val(payload.investigatingOfficer)
                        $("#edit_recommendation").val(payload.recommendation).trigger('change')
                        $("#edit_date_recommendation").val(payload.dateRecommendation)
                       
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
                                    "recommendation"        : $("#edit_recommendation").val(),
                                    "dateRecommendation"    : $("#edit_date_recommendation").val(),
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t3/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T3").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table3",
                filename: "Form44-Table3.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SSI', 'RSSI', 'TSSI' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_investigating_officer', 'add_recommendation', 'add_date_recommendation'];
            var check = true
            var checkTable = ['F44T1', 'F44T2']

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
                "recommendation"        : $("#add_recommendation").val(),
                "dateRecommendation"    : $("#add_date_recommendation").val(),
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
            $.wms.executeExternalPost('http://localhost:8000/F44t3/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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


    var __attachF44T4PageEvent = function() {
        console.log("f44t4 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T4_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $.wms.executeExternalGet('http://localhost:8000/F44t4?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T4_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.investigatingOfficer+"</td>"+
                    "<td>"+data.recommendation+"</td>"+
                    "<td>"+data.dateRecommendation+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t4/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t4/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
                        $("#edit_investigating_officer").val(payload.investigatingOfficer)
                        $("#edit_recommendation").val(payload.recommendation)
                        $("#edit_date_recommendation").val(payload.dateRecommendation)
                       
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
                                    "recommendation"        : $("#edit_recommendation").val(),
                                    "dateRecommendation"    : $("#edit_date_recommendation").val(),
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t4/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T4").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table4",
                filename: "Form44-Table4.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SSI', 'RSSI', 'TSSI' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_investigating_officer', 'add_recommendation', 'add_date_recommendation'];
            var check = true
            var checkTable = ['F44t3', 'F44t2_acted_upon']

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
                "recommendation"        : $("#add_recommendation").val(),
                "dateRecommendation"    : $("#add_date_recommendation").val(),
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
            $.wms.executeExternalPost('http://localhost:8000/F44t4/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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


    var __attachF44T5PageEvent = function() {
        console.log("f44t5 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T5_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $.wms.executeExternalGet('http://localhost:8000/F44t5?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T5_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.referringOffice+"</td>"+
                    "<td>"+data.dateReceivedByPpo+"</td>"+
                    "<td>"+data.investigatingOfficer+"</td>"+
                    "<td>"+data.reasonForReferral+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t5/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t5/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t5/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T5").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table5",
                filename: "Form44-Table5.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CSSI' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_investigating_officer', 'add_date_rcv_by_the_ppo'];
            var check = true
            var checkTable = ['F44T1', 'F44T2']

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
            $.wms.executeExternalPost('http://localhost:8000/F44t5/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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

    var __attachF44T6PageEvent = function() {
        console.log("f44t6 events")
        __rcv = function(){
            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $(".form_loader").removeClass("hidden")

            $('.F44T6_tbody').empty();
            $(".form_loader").removeClass("hidden")
            $(".result_form").addClass("hidden")

            $.wms.executeExternalGet('http://localhost:8000/F44t6?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F44T6_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.referringOffice+"</td>"+
                        "<td>"+data.dateReceivedByPpo+"</td>"+
                        "<td>"+data.investigatingOfficer+"</td>"+
                        "<td>"+data.reasonForReferral+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://localhost:8000/F44t6/'+data_id+'?&user='+profid).done(function (result) {
                            $("#modal-delete").modal('toggle')
                            $(".modal-loader").addClass("hidden")
                            $(".deleteProceedButton").attr('disabled',false)
                            if(result.status != undefined && result.status == "SUCCESS"){
                                    location.reload();
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
                    $.wms.executeExternalGet('http://localhost:8000/F44t6/'+data_id).done(function (result2) {
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
                            $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                    $.wms.executeExternalPut('http://localhost:8000/F44t6/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                        if(result.status != undefined && result.status == "SUCCESS"){
                                            location.reload();
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
                $("#T_F44T6").table2excel({
                    // exclude CSS class
                    exclude: ".options",
                    name: "Form44-Table6",
                    filename: "Form44-Table6.xls", //do not include extension
                    fileext: ".xls",
                    preserveColors: true
                  }); 
            });

            //Add
            $(".addSubmitButton").unbind("click").on("click",function(){
                var allowedDocket= [ 'CSSI' ];
                var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_investigating_officer', 'add_date_rcv_by_the_ppo'];
                var check = true
                var checkTable = ['F44T1', 'F44T2']

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
                $.wms.executeExternalPost('http://localhost:8000/F44t6/create',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){

                        $(".modal-loader").addClass("hidden")
                        $(".addProceedButton").attr('disabled',false)
                        $("#modal-add").modal('toggle')
                        $(".btn-reset").trigger("click")
                        location.reload();

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
        __acted_upon = function(){
            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $(".form_loader").removeClass("hidden")

            $('.F44T6_tbody_b').empty();
            $(".form_loader").removeClass("hidden")
            $(".result_form").addClass("hidden")

            $.wms.executeExternalGet('http://localhost:8000/F44t6CAR?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F44T6_tbody_b').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateCompletedAndReturned+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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
                    $(".deleteProceedButton-acted").unbind("click").on("click",function(){
                        $(this).attr('disabled',true)
                        $(".modal-loader").removeClass("hidden")

                        $.wms.executeExternalDelete('http://localhost:8000/F44t6CAR/'+data_id+'?&user='+profid).done(function (result) {
                            $("#modal-delete-acted").modal('toggle')
                            $(".modal-loader").addClass("hidden")
                            $(".deleteProceedButton-acted").attr('disabled',false)
                            if(result.status != undefined && result.status == "SUCCESS"){
                                    location.reload();
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
                    $.wms.executeExternalGet('http://localhost:8000/F44t6CAR/'+data_id).done(function (result2) {
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
                            $("#edit_offender_sname-acted").val(payload.clientProfileDto.suffix)
                            $("#edit_referring_office-acted").val(payload.referringOffice)
                            $("#edit_date_rcv_by_the_ppo-acted").val(payload.dateReceivedByPpo)
                           
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
                                            "docketNumber"          : $("#edit_docket_no-acted").val().toUpperCase(),
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
                                    $.wms.executeExternalPut('http://localhost:8000/F44t6CAR/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                        if(result.status != undefined && result.status == "SUCCESS"){
                                            location.reload();
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
            //     $("#T_F44T6").table2excel({
            //         // exclude CSS class
            //         exclude: ".options",
            //         name: "Form44-Table6",
            //         filename: "Form44-Table6.xls", //do not include extension
            //         fileext: ".xls",
            //         preserveColors: true
            //       }); 
            // });

            //Add
            $(".addSubmitButton-acted").unbind("click").on("click",function(){
                var allowedDocket= [ 'CSSI' ];
                var requiredField= [ 'add_offender_fname-acted', 'add_offender_lname-acted', 'add_referring_office-acted', 'add_date_com_and_ret-acted'];
                var check = true
                var checkTable = ['F44t5', 'F44t6']

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
                        "docketNumber"          : $("#add_docket_no-acted").val().toUpperCase(),
                        "createdBy"             : $.cookie("USER_ID"),
                        "updatedBy"             : "",
                        "status"                : true,
                        "source"                : "2",
                        "encodingMonth"         : $.wms.urlParam('date'),
                        "firstName"             : $("#add_offender_fname-acted").val(),
                        "middleName"            : $("#add_offender_mname-acted").val(),
                        "lastName"              : $("#add_offender_lname-acted").val(),
                        "suffix"                : $("#add_offender_sname-acted").val()
                    },

                }
                console.log(payload)
                $.wms.executeExternalPost('http://localhost:8000/F44t6CAR/create',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){

                        $(".modal-loader").addClass("hidden")
                        $(".addProceedButton-acted").attr('disabled',false)
                        $("#modal-add-acted").modal('toggle')
                        $(".btn-reset-acted").trigger("click")
                        location.reload();

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

        }

        var __download_print = function(){
            var __maxTableSize = 0;
            var __counter = 0;

            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $.wms.executeExternalGet('http://localhost:8000/F44t6?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
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

            $.wms.executeExternalGet('http://localhost:8000/F44t6CAR?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
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
                        $(".T_F44T6_download_print_tbody").empty()
                        for(i=1;i<=__maxTableSize;i++){
                            $(".T_F44T6_download_print_tbody").append(
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
                        $(".T_F44T6_download_print_tbody").append(
                                "<tr>"+
                                    "<td colspan='9' class='center b'>NONE</td>"+
                                "</tr>");
                    }
                };
                // Download
                $(".btn-download").unbind("click").on("click",function(){
                    console.log("clicked")
                   
                    $("#T_F44T6_download_print").table2excel({
                        // exclude CSS class
                        exclude: ".options",
                        name: "Form44-Table6",
                        filename: "Form44-Table6.xls", //do not include extension
                        fileext: ".xls",
                        preserveColors: true
                      }); 
                });
            };
        };

        __rcv();
        __acted_upon();
        __download_print();
    };


    var __attachF44T7PageEvent = function() {
        console.log("f44t7 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T7_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $.wms.executeExternalGet('http://localhost:8000/F44t7?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T7_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td>"+data.dateReceivedByPpo+"</td>"+
                    "<td>"+data.supervisionStart+"</td>"+
                    "<td>"+data.supervisionEnd+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t7/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t7/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t7/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T7").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table7",
                filename: "Form44-Table7.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SSS', 'TSSS' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer', 'add_date_rcv_by_the_ppo'];
            var check = true
            var checkTable = ['F44t8', 'F44t7']

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
            $.wms.executeExternalPost('http://localhost:8000/F44t7/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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

    var __attachF44T8PageEvent = function() {
        console.log("f44t8 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T8_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $.wms.executeExternalGet('http://localhost:8000/F44t8?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T8_tbody').append("<tr>"+
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
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t8/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t8/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t8/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T8").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table8",
                filename: "Form44-Table8.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SSS', 'TSSS' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer', 'add_date_rcv_by_the_ppo'];
            var check = true
            var checkTable = ['F44t8', 'F44t7']

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
            $.wms.executeExternalPost('http://localhost:8000/F44t8/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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
    
    var __attachF44T9PageEvent = function() {
        console.log("f44t9 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T9_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');
        $.wms.executeExternalGet('http://localhost:8000/F44t9?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T9_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.report+"</td>"+
                    "<td>"+data.reportDateSubmitted+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td>"+data.transferredOffice+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t9/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t9/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                    "transferredOffice"     : $("#edit_field_offices").val(),
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t9/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T9").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table9",
                filename: "Form44-Table9.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SSS', 'TSSS' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer'];
            var check = true
            var checkTable = ['F44t8', 'F44t7']

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
            $.wms.executeExternalPost('http://localhost:8000/F44t9/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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
    var __attachF44T10PageEvent = function() {
        console.log("f44t10 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T10_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');
        $.wms.executeExternalGet('http://localhost:8000/F44t10?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T10_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.report+"</td>"+
                    "<td>"+data.reportDateSubmitted+"</td>"+
                    "<td>"+data.transferredOffice+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t10/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t10/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                    "transferredOffice"     : $("#edit_field_offices").val(),
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t10/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T10").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table10",
                filename: "Form44-Table10.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SSS', 'TSSS' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer', 'add_date_rcv_by_the_ppo'];
            var check = true
            var checkTable = ['F44t8', 'F44t7']

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
            $.wms.executeExternalPost('http://localhost:8000/F44t10/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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
    
    var __attachF44T11PageEvent = function() {
        console.log("f44t11 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T11_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');
        $.wms.executeExternalGet('http://localhost:8000/F44t11?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T11_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.report+"</td>"+
                    "<td>"+data.reportDateSubmitted+"</td>"+
                    "<td>"+data.transferredOffice+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t11/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t11/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                    "transferredOffice"     : $("#edit_field_offices").val(),
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t11/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T11").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table11",
                filename: "Form44-Table11.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'SSS', 'TSSS' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer', 'add_date_rcv_by_the_ppo'];
            var check = true
            var checkTable = ['F44t8', 'F44t7']

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
            $.wms.executeExternalPost('http://localhost:8000/F44t11/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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

    var __attachF44T12PageEvent = function() {
        console.log("f44t12 events")

        var yearMonth   = $.wms.urlParam('date')
        var officeId    = $.wms.urlParam('officeId')
        var page        = $.wms.urlParam('page')
        var size        = $.wms.urlParam('size')

        $(".form_loader").removeClass("hidden")

        $('.F44T12_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")

        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');
        $.wms.executeExternalGet('http://localhost:8000/F44t12?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
            console.log(result.content)
            $(".form_loader").removeClass("hidden")

            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")

            result.content.forEach(function(data){
                data = $.wms.upper($.wms.sanitize(data))
                var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                $('.F44T12_tbody').append("<tr>"+
                    "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                    "<td>"+fullname.toUpperCase()+"</td>"+
                    "<td>"+data.referringOffice+"</td>"+
                    "<td>"+data.dateReceivedByPpo+"</td>"+
                    "<td>"+data.supervisingOfficer+"</td>"+
                    "<td>"+data.reasonForReferral+"</td>"+
                    "<td class='options field'>"+data.fieldOffice+"</td>"+
                    "<td class='options'>"+source+"</td>"+
                    "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                    "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                    $.wms.executeExternalDelete('http://localhost:8000/F44t12/'+data_id+'?&user='+profid).done(function (result) {
                        $("#modal-delete").modal('toggle')
                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        if(result.status != undefined && result.status == "SUCCESS"){
                                location.reload();
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
                $.wms.executeExternalGet('http://localhost:8000/F44t12/'+data_id).done(function (result2) {
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
                        $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
                        $("#edit_field_offices").val(payload.referringOffice).trigger('change')
                        $("#edit_rep_date_submitted").val(payload.dateReceivedByPpo)
                        $("#edit_supervising_officer").val(payload.supervisingOfficer)
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
                                    "referringOffice"       : $("#edit_field_offices").val(),
                                    "dateReceivedByPpo"     : $("#edit_rep_date_submitted").val(),
                                    "supervisingOfficer"    : $("#edit_supervising_officer").val(),
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
                                $.wms.executeExternalPut('http://localhost:8000/F44t12/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                    if(result.status != undefined && result.status == "SUCCESS"){
                                        location.reload();
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
            $("#T_F44T12").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: "Form44-Table12",
                filename: "Form44-Table12.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CSSS' ];
            var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer', 'add_rep_date_submitted'];
            var check = true
            var checkTable = ['F44t8', 'F44t7']

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
                "dateReceivedByPpo"     : $("#add_rep_date_submitted").val(),
                "supervisingOfficer"    : $("#add_supervising_officer").val(),
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
            $.wms.executeExternalPost('http://localhost:8000/F44t12/create',JSON.stringify(payload)).done(function (result) {
  
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    $(".btn-reset").trigger("click")
                    location.reload();

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

    var __attachF44T13PageEvent = function() {
        console.log("f44t13 events")
        __rcv = function(){

            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $(".form_loader").removeClass("hidden")

            $('.F44T13_tbody').empty();
            $(".form_loader").removeClass("hidden")
            $(".result_form").addClass("hidden")

            $(".sel_field_office2").select2({
               placeholder: "Select Field Office",
            });
            $("#add_field_offices").val($.wms.urlParam('field')).trigger('change');
            $.wms.executeExternalGet('http://localhost:8000/F44t13?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F44T13_tbody').append("<tr>"+
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
                        "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F44_write btn btn-danger btn-sm btn-delete hidden' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://localhost:8000/F44t13/'+data_id+'?&user='+profid).done(function (result) {
                            $("#modal-delete").modal('toggle')
                            $(".modal-loader").addClass("hidden")
                            $(".deleteProceedButton").attr('disabled',false)
                            if(result.status != undefined && result.status == "SUCCESS"){
                                    location.reload();
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
                    $.wms.executeExternalGet('http://localhost:8000/F44t13/'+data_id).done(function (result2) {
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
                            $("#edit_offender_sname").val(payload.clientProfileDto.suffix)
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
                                    $.wms.executeExternalPut('http://localhost:8000/F44t13/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                        if(result.status != undefined && result.status == "SUCCESS"){
                                            location.reload();
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
                $("#T_F44T13").table2excel({
                    // exclude CSS class
                    exclude: ".options",
                    name: "Form44-Table13",
                    filename: "Form44-Table13.xls", //do not include extension
                    fileext: ".xls",
                    preserveColors: true
                  }); 
            });

            //Add
            $(".addSubmitButton").unbind("click").on("click",function(){
                var allowedDocket= [ 'CSSS' ];
                var requiredField= [ 'add_offender_fname', 'add_offender_lname', 'add_supervising_officer'];
                var check = true
                var checkTable = ['F44t12']

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
                $.wms.executeExternalPost('http://localhost:8000/F44t13/create',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){

                        $(".modal-loader").addClass("hidden")
                        $(".addProceedButton").attr('disabled',false)
                        $("#modal-add").modal('toggle')
                        $(".btn-reset").trigger("click")
                        location.reload();

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
        __terminated = function(){


            var yearMonth   = $.wms.urlParam('date')
            var officeId    = $.wms.urlParam('officeId')
            var page        = $.wms.urlParam('page')
            var size        = $.wms.urlParam('size')

            $(".form_loader").removeClass("hidden")

            $('.F44T13_tbody_b').empty();
            $(".form_loader").removeClass("hidden")
            $(".result_form").addClass("hidden")

            $.wms.executeExternalGet('http://localhost:8000/F44t13CRT?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
                console.log(result.content)
                $(".form_loader").removeClass("hidden")

                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")

                result.content.forEach(function(data){
                    data = $.wms.upper($.wms.sanitize(data))
                    var fullname = data.clientProfileDto.firstName +" "+ data.clientProfileDto.middleName +" "+  data.clientProfileDto.lastName + " "+ data.clientProfileDto.suffix
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F44T13_tbody_b').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docketNumber.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docketNumber.toUpperCase()+"</a></td>"+
                        "<td>"+fullname.toUpperCase()+"</td>"+
                        "<td>"+data.dateReturned+"</td>"+
                        "<td class='options field'>"+data.fieldOffice+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'> <button class='access_F44_write btn btn-success btn-sm btn-edit-term' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_F44_write btn btn-danger btn-sm btn-delete-term' data-docket='"+data.docketNumber.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
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

                        $.wms.executeExternalDelete('http://localhost:8000/F44t13CRT/'+data_id+'?&user='+profid).done(function (result) {
                            $("#modal-delete-term").modal('toggle')
                            $(".modal-loader").addClass("hidden")
                            $(".deleteProceedButton-term").attr('disabled',false)
                            if(result.status != undefined && result.status == "SUCCESS"){
                                    location.reload();
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
                    $.wms.executeExternalGet('http://localhost:8000/F44t13CRT/'+data_id).done(function (result2) {
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
                            $("#edit_offender_sname-term").val(payload.clientProfileDto.suffix)
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
                                    $.wms.executeExternalPut('http://localhost:8000/F44t13CRT/'+data_id,JSON.stringify(payload_update)).done(function (result) {
                                        if(result.status != undefined && result.status == "SUCCESS"){
                                            location.reload();
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
            //     $("#T_F44T13").table2excel({
            //         // exclude CSS class
            //         exclude: ".options",
            //         name: "Form44-Table13",
            //         filename: "Form44-Table13.xls", //do not include extension
            //         fileext: ".xls",
            //         preserveColors: true
            //       }); 
            // });

            //Add
            $(".addSubmitButton-term").unbind("click").on("click",function(){
                var allowedDocket= [ 'CSSS' ];
                var requiredField= [ 'add_offender_fname-term', 'add_offender_lname-term', 'add_date_com_and_ret-term'];
                var check = true
                var checkTable = ['F44t12']

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
                $.wms.executeExternalPost('http://localhost:8000/F44t13CRT/create',JSON.stringify(payload)).done(function (result) {
      
                    if(result.status != undefined && result.status == "SUCCESS"){

                        $(".modal-loader").addClass("hidden")
                        $(".addProceedButton-term").attr('disabled',false)
                        $("#modal-add-term").modal('toggle')
                        $(".btn-reset-term").trigger("click")
                        location.reload();

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

            $.wms.executeExternalGet('http://localhost:8000/F44t13?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
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

            $.wms.executeExternalGet('http://localhost:8000/F44t13CRT?yearMonth='+yearMonth+'&officeId='+officeId+'&page='+page+'&size='+size+'').done(function (result) {
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
                        $(".T_F44T13_download_print_tbody").empty()
                        for(i=1;i<=__maxTableSize;i++){
                            $(".T_F44T13_download_print_tbody").append(
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
                        $(".T_F44T13_download_print_tbody").append(
                                "<tr>"+
                                    "<td colspan='11' class='center b'>NONE</td>"+
                                "</tr>");
                    }
                };
                // Download
                $(".btn-download").unbind("click").on("click",function(){
                    console.log("clicked")
                   
                    $("#T_F44T13_download_print").table2excel({
                        // exclude CSS class
                        exclude: ".options",
                        name: "Form44-Table13",
                        filename: "Form44-Table13.xls", //do not include extension
                        fileext: ".xls",
                        preserveColors: true
                      }); 
                });
            };
        };

        __rcv();
        __terminated();
        __download_print();
    };


    var __attachF44SSCSPageEvent = function() {
        console.log("form44 caseload")
        var field_office =  $.wms.urlParam('field')
        var date =  $.wms.urlParam('date')
        var officeId =  $.wms.urlParam('officeId')
        $(".office_selected").html(field_office)

        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        var month = monthNames[date.substr(5,6)-1];
        $(".year_selected").html(date.substr(0,4))
        $(".month_selected").html(month)

        $.wms.executeExternalGet('http://localhost:8000/F44Caseload?id='+officeId+'&yearMonth='+date).done(function (result) {
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
    };

    

    return {
        attachF44T1PageEvent : __attachF44T1PageEvent,
        attachF44T2PageEvent : __attachF44T2PageEvent,
        attachF44T3PageEvent : __attachF44T3PageEvent,
        attachF44T4PageEvent : __attachF44T4PageEvent,
        attachF44T5PageEvent : __attachF44T5PageEvent,
        attachF44T6PageEvent : __attachF44T6PageEvent,
        attachF44T7PageEvent : __attachF44T7PageEvent,
        attachF44T8PageEvent : __attachF44T8PageEvent,
        attachF44T9PageEvent : __attachF44T9PageEvent,
        attachF44T10PageEvent : __attachF44T10PageEvent,
        attachF44T11PageEvent : __attachF44T11PageEvent,
        attachF44T12PageEvent : __attachF44T12PageEvent,
        attachF44T13PageEvent : __attachF44T13PageEvent,
        attachF44SSCSPageEvent : __attachF44SSCSPageEvent
    };
}());
