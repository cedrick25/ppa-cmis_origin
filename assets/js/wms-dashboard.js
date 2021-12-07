/*   
 * This the Dashboard JS of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.dashboard = (typeof $.wms.dashboard !== 'undefined') ? $.wms.dashboard : {};

$.wms.dashboard = (function() {

    var __attachPageEvent = function() {
        
        //console.log(typeof $.cookie('USER_ID'));
        if(typeof $.cookie('USER_ID') != "undefined"){
            ($.wms.debug() ? console.log("Logged-In") : "" )
            
            ___loggedIn();
        }else{
            ($.wms.debug() ? console.log("Logged-Out") : "" )
            window.location.href="login"
        }

        
        
    };

    var ___loggedIn = function(){

        $('.loggedin').show();


        $("#btnLogout,.lnkLogout").unbind("click").on("click",function(){
            var action = "LOGGED-OUT"
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "AUTHENTICATION",
                "action" : action
                
            }
            $.wms.executeExternalPost('/ppa-api/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });


            var cookies = $.cookie();
            for(var cookie in cookies) {
               $.removeCookie(cookie);
            }
            window.location.href="login"
        });


        //TODO
        //CHECK
        var payload = {
                "USER_ID" : $.cookie("USER_ID"),        
        }
        $.wms.executeExternalPost('/ppa-api/wsv1/Api/isActive',JSON.stringify(payload)).done(function (result) {
            console.log(result)
            if(result.status == "FAILED"){
                var cookies = $.cookie();
                for(var cookie in cookies) {
                   $.removeCookie(cookie);
                }
                window.location.href="login"     
            }

        });        

        $("#btnChangepassword").unbind("click").on("click",function(){
            $("#modalChangePassword").modal("toggle");

            $("#txtUsername_PW").val($.cookie('USER_NAME'))

            $("#btnSavePassword").unbind("click").on("click",function(){
                if (confirm('Are you sure to change your password?')) {

                    var payload = {
                       USERNAME : $.cookie('USER_NAME'),
                       PASSWORD : $("#txtPasswordOld").val()
                    }

                    $.wms.executeExternalPost('/ppa-api/wsv1/api/authenticate',JSON.stringify(payload)).done(function (result) {
                        if(result.status == 'SUCCESS'){
                            PASSWORD1 = $("#txtPassword1").val()
                            PASSWORD2 = $("#txtPassword2").val()

                            if(PASSWORD1 == PASSWORD2){
                                 var payload = {
                                   USER_ID : $.cookie('USER_ID'),
                                   USER_PASS : PASSWORD2
                                }

                                $.wms.executeExternalPost('/ppa-api/wsv1/api/UpdateUser',JSON.stringify(payload)).done(function (result2) {
                                    if(result2.status === 'SUCCESS'){
                                        
                                        alert("Successfully changed password.")
                                        $("#modalChangePassword").modal("toggle")
                                        var action = "Changed Password"
                                        var payload = {
                                            "created_by" : $.cookie("USER_ID"),
                                            "module" : "AUTHENTICATION",
                                            "action" : action
                                            
                                        }
                                        $.wms.executeExternalPost('/ppa-api/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                                        });
                                        
                                    }else{
                                        alert("Failed to Update user.")
                                    }
                                });
                            }else{
                                alert("New Password and Retype Password did not match. Please try again!")    
                            }
                        }else{
                            alert("Incorrect Old Password. Please try again!")
                        }
                    });
                   //if($("#txtPasswordOld").va() == 
                   //$("#txtPassword1").val()
                   //$("#txtPassword2").val()
               } else {
                   return false;
               }
            });
        });

        if($.cookie('USER_NAME') != "undefined"){
            //$(".loggedUserName").text($.cookie('USER_NAME').toUpperCase())    
            $(".loggedUserName").text($.cookie('USER_FULLNAME').toUpperCase())    
        }
        
        $(".loggedBody").show();
        

        if($.cookie('USER_LEVEL_ID') != "undefined" && $.cookie('USER_LEVEL_ID') == 1){
            $(".adminTools").show();
        }else{
            $(".adminTools").remove();

        }

        ___navHighlight();

    }

    var __checkPermission= function(LEVEL_ID){
            if(typeof($.cookie("PERMISSIONS")) != "undefined"){
                var ACCESS_RIGHTS = JSON.parse($.cookie("PERMISSIONS"))
                for(i=0;i<ACCESS_RIGHTS.length;i++){
                    //console.log(ACCESS_RIGHTS)
                    if(ACCESS_RIGHTS[i].ACCESS_RIGHTS == "0"){
                        switch(ACCESS_RIGHTS[i].USER_LEVEL_MODULE_ID){
                            case LEVEL_ID :  window.location.href="dashboard";
                            return false;
                            break;
                        }    
                    }
                    
                }
                return true;
                
            }

            
        }

    var ___formControlCheck = function(){
        console.log("FORM CONTROL CHECK!!!")
        /*if($.cookie('USER_LEVEL_ID') != "undefined" && ($.cookie('USER_LEVEL_ID') == 1 || $.cookie('USER_LEVEL_ID') == 2)){
            $(".adminTools").show();
        }else{
            $(".adminTools").remove();
        }

        if($.cookie('USER_LEVEL_ID') != "undefined" && ($.cookie('USER_LEVEL_ID') == 1 || $.cookie('USER_LEVEL_ID') == 2 || $.cookie('USER_LEVEL_ID') == 5 )){
            $(".clerkTools").show();
        }else{
            $(".clerkTools").remove();
        }*/
        function check(){
            if(typeof($.cookie("PERMISSIONS")) != "undefined"){
                var ACCESS_RIGHTS = JSON.parse($.cookie("PERMISSIONS"))
                for(i=0;i<ACCESS_RIGHTS.length;i++){
                    //console.log(ACCESS_RIGHTS)
                    if(ACCESS_RIGHTS[i].ACCESS_RIGHTS == "0"){
                        switch(ACCESS_RIGHTS[i].USER_LEVEL_MODULE_ID){
                            case "1" : $(".access_f5").remove(); break;
                            case "2" : $(".access_f5_write").remove();   break;
                            case "3" : $(".access_f21").remove(); break;
                            case "4" : $(".access_f21_write").remove(); break;
                            case "5" : $(".access_report_regional").remove(); break;
                            case "6" : $(".access_report_field").remove(); break;
                            case "7" : $(".access_ml").remove(); break;
                            case "8" : $(".access_ml_write").remove(); break;
                            case "9" : $(".access_maintenance").remove(); break;
                        }    
                    }else{
                        switch(ACCESS_RIGHTS[i].USER_LEVEL_MODULE_ID){
                            case "2": 
                                 $(".btn-delete").removeClass("hidden")
                                    $(".btn-rcv-delete").removeClass("hidden")
                                    $(".btn-acted-delete").removeClass("hidden")
                                    $(".btn-notacted-delete").removeClass("hidden")
                                    $(".btn-rcv").removeClass("hidden")
                                    $(".access_f5_write").removeClass("hidden")
                            break;
                            case "5" :  case "6" :  $(".reports").removeClass("hidden");
                             break;
                            
                        }    
                    }
                    
                }
            }
        }


        
        function checkPendingRequest() {
            if ($.active > 0) {
                console.log("waiting...")
                window.setTimeout(checkPendingRequest, 50);
            }
            else {
               check()
               console.log("done3")
            }
        };
        check()
        window.setTimeout(checkPendingRequest, 50);
    
    }

    var ___navHighlight = function(){
        var str  = document.URL;
        var n=str.split("/");
        var word = n[n.length - 1];
        //console.log(word)

        switch(word){
            case 'station_map':
            case 'station_monitor':
            case 'station_health':
                $("#navST").addClass("active"); break;    
            break;
            case 'station_list': case 'station_add':  
            case 'sensor_list': case 'sensor_add': 
            case 'station_sensor_list': 
            case 'station_type': 
            case 'user_account': $("#navMT").addClass("active"); break;
            
            case 'dashboard':
            case 'login':
                     $("#navHome").addClass("active"); break;
            case 'rainfall_dashboard' :
            case 'rainfall_table' : 
            case 'rainfall_station' : 
            case 'rainfall_graph' : 
            case 'rainfall_map' : 
                                $("#navRF").addClass("active"); break;
            case 'wl_dashboard' :
            case 'wl_table' : 
            case 'wl_station' : 
            case 'wl_graph' : 
            case 'wl_map' : 
                                $("#navWL").addClass("active"); break;

            case 'station_monitor': $("#navSS").addClass("active"); break;
        }

        //navHome
        //navRF
        //navWL
        //navMT
        //navSL
    }



    
    function removeTags(string){
        var txt = string
        var rex = /(<([^>]+)>)/ig;
        return (txt.replace(rex , ""));

    }



    var __loadAuditTrail = function(){
        ___debug("User List Event")
        var payload = { }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/getAuditTrail',JSON.stringify(payload)).done(function (result) {
            ($.wms.debug() ? console.log(result) : "" )
            var data = [];
            for(i=0;i<result.payload.length;i++){
                
                var id = result.payload[i].audit_trail_id
                var user_id = result.payload[i].USER_ID
                var full_name = result.payload[i].USER_FULLNAME;
                var level = result.payload[i].USER_LEVEL_NAME;
                var FIELD_OFFICE = result.payload[i].FIELD_OFFICE;
                var created_date = result.payload[i].created_date;
                var module = result.payload[i].module;
                var action = result.payload[i].action;
                
                data.push(["<b>"+id+"</b>",created_date,"<b>"+full_name+"</b>",level,FIELD_OFFICE,module,action])
            }

            if ( $.fn.DataTable.isDataTable('#tableSensorList') ) {
              $('#tableSensorList').DataTable().destroy();
              $('#tableSensorList tbody').empty();
            }

            var dtSensorList = $("#tableSensorList").DataTable({
                dom: 'Blfrtip',
                "scrollX": true,
                'order'  : [["0", "desc"]],
                data : data,
                buttons: [

                    {   extend: 'csv',
                        exportOptions: {
                            
                        }, title: "Audit Trail", download: 'open'
                    },
                    {   extend: 'print',
                        title: "Audit Trail", download: 'open'
                    },
                    {   extend: 'pdfHtml5',
                        exportOptions: {
                            
                        }, title: "Audit Trail", download: 'open'
                    },
                    {   extend: 'excelHtml5',
                        exportOptions: {
                            
                        }, title: "Audit Trail", download: 'open'
                    },
                ],
                "columns": [
                    { "width": "3%" },
                    { "width": "10%" },
                    { "width": "10%" },
                    { "width": "15%" },
                    { "width": "10%" },
                    { "width": "10%" },
                    { "width": "20%" },
                  ],
                initComplete: function () {
                    this.api().columns().every( function () {
                       var column = this;

                        if(column.index() != 0 && column.index() != 1 && column.index() != 6){
                            var select = $('<select class="form-control"><option value=""></option></select>')
                                //.appendTo( $(column.header()).empty() )
                                .appendTo( $("#head"+column.index()).empty() )
                                .on( 'change', function () {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );
             
                                    column
                                        .search( val ? '^'+val+'$' : '', true, false )
                                        //.search( removeTags(val) )
                                        .draw();
                                } );
             
                            column.data().unique().sort().each( function ( d, j ) {
                               
                                    select.append( '<option value="'+removeTags(d)+'">'+d+'</option>' )
                            } );
                        }else{
                            var input = $('<input type="text" class="form-control">').appendTo( $("#head"+column.index()).empty() )
                                .on( 'keyup', function () {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );
                                    console.log(removeTags(val));
             
                                    column
                                        .search( $(this).val() )
                                        //.search( removeTags(val) )
                                        .draw();
                                } );

                            //$("").appendTo( $("#head"+column.index()).empty() )
                        }
                    } );
                }
            });

            
            //Export Events
            $(".dt-buttons").addClass("hidden")
            $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
            $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
            $(".btnPrint").unbind('click').on("click",function(){ $(".buttons-print").click(); })
            $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

            

        });

        

    }
    

    var __attachUserListEvent = function(){
        ___debug("User List Event")
        var payload = { }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/getAllUserList',JSON.stringify(payload)).done(function (result) {
            ($.wms.debug() ? console.log(result) : "" )
            var data = [];
            for(i=0;i<result.payload.length;i++){
                
                var user_id = result.payload[i].USER_ID
                var full_name = result.payload[i].USER_FULLNAME;
                var level = result.payload[i].USER_LEVEL_NAME;
                var FIELD_OFFICE = result.payload[i].FIELD_OFFICE;
                var expiry = result.payload[i].USER_EXPIRY;
                var status = "";
                switch(result.payload[i].USER_STATUS){
                    case "1" : status = "Active"; break;
                    case "0" : status = "Inactive"; break;
                    case "-1" : status = "Inactive"; break;
                }
                var button = '<button class="btn-xs btn btn-primary btn-edit" data-id="'+user_id+'"><i class="fa fa-pencil"></i></button>'
                data.push(["<b>"+(i+1)+"</b>","<b>"+full_name+"</b>",level,FIELD_OFFICE,status,button])
            }

            if ( $.fn.DataTable.isDataTable('#tableSensorList') ) {
              $('#tableSensorList').DataTable().destroy();
              $('#tableSensorList tbody').empty();
            }

            var dtSensorList = $("#tableSensorList").DataTable({
                dom: 'Blfrtip',
                "scrollX": true,
                buttons: [
                    {   extend: 'csv',
                        exportOptions: {
                            columns: [ 0, 1 ,2 ,3]
                        }, title: "User List", download: 'open'
                    },
                    {   extend: 'pdfHtml5',
                        exportOptions: {
                            columns: [ 0, 1, 2, 3 ]
                        }, title: "User List", download: 'open'
                    },
                    {   extend: 'excelHtml5',
                        exportOptions: {
                            columns: [ 0, 1, 2, 3 ]
                        }, title: "User List", download: 'open'
                    },
                ],
                "columns": [
                    { "width": "5%" },
                    { "width": "30%" },
                    { "width": "30%" },
                    { "width": "20%" },
                    { "width": "20%" },
                    { "width": "10%" },
                  ]
            });

            dtSensorList.rows.add(data).draw();
            //Export Events
            $(".dt-buttons").addClass("hidden")
            $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
            $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
            $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

            $("#tableSensorList").unbind("click").on("click",".btn-edit",function(){
                var id = $(this).data('id');
                
                $("#editLoading").removeClass("hidden");
                $("#editBody").addClass("hidden");

                $("#modalEdit").modal()
                var payload = { USER_ID : id }
                $.wms.executeExternalPost('/ppa-api/wsv1/api/getUserByID',JSON.stringify(payload)).done(function (result) {
                    ___debug(result);

                    //

                    var USER_ID  = result.payload.USER_ID;
                    var USER_NAME = result.payload.USER_NAME;
                    var USER_FULLNAME = result.payload.USER_FULLNAME;
                    var USER_CONTACT = result.payload.USER_CONTACT;
                    var USER_EMAIL = result.payload.USER_EMAIL;
                    var USER_LEVEL_ID = result.payload.USER_LEVEL_ID;
                    var USER_EXPIRY = result.payload.USER_EXPIRY;
                    var FIELD_OFFICE = result.payload.FIELD_OFFICE;

                    $("#editLoading").addClass("hidden");
                    $("#editBody").removeClass("hidden");

                    $("#txtUserID").val(USER_ID);
                    $("#txtUsername").val(USER_NAME);
                    $("#txtFullname").val(USER_FULLNAME);
                    $("#txtContact").val(USER_CONTACT);
                    $("#txtEmail").val(USER_EMAIL);
                    $("#ddUserType").val(USER_LEVEL_ID).trigger("change");
                    $("#ddSelOffice").val(FIELD_OFFICE).trigger("change")
                    var expiry = new Date(USER_EXPIRY);
                    var day = ("0" + expiry.getDate()).slice(-2);
                    var month = ("0" + (expiry.getMonth() + 1)).slice(-2);
                    var exp = expiry.getFullYear()+"-"+(month)+"-"+(day) ;
                    $("#txtExpiration").val(exp)
                    // $("#ddUserStatus").val(STATUS).trigger("change");
                    $("#btnSave").unbind("click").on("click",function(){
                        var payload = {
                                "USER_ID" : $("#txtUserID").val(),
                                "USER_FULLNAME" : $("#txtFullname").val(),
                                "USER_NAME": $("#txtUsername").val(),
                                "USER_PASS" : $("#txtUpdatePassword1").val(),            
                                "USER_EMAIL": $("#txtEmail").val(),
                                "USER_CONTACT": $("#txtContact").val(),
                                "USER_EXPIRY" : "",
                                "USER_LEVEL_ID" : $("#ddUserType").val(),         
                                "FIELD_OFFICE" : $("#ddSelOffice").val(),         
                                "CREATED_BY" : "sysadmin",
                                "USER_STATUS" : $("#ddUserStatus").val(),
                        }              
                        $.wms.executeExternalPost('/ppa-api/wsv1/api/UpdateUser',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if(result.status === 'SUCCESS'){
                                var user_id = result.USER_ID;
                                $("#modalEdit").modal("toggle")
                                alert(result.message)
                                __attachUserListEvent();
                                
                            }else{
                                alert("Failed to Update user.")
                            }
                        });
                    });

                });
                
                
                
            });

        });

        $("#btnAddSubmit").unbind("click").on("click",function(){
            ___debug("Submit Event")

            if(___validateAdd()){
                var payload = {
                        "USER_FULLNAME" : $("#addtxtFullname").val(),
                        "USER_NAME": $("#addtxtUsername").val(),
                        "USER_PASS" : $("#addtxtPassword1").val(),            
                        "USER_EMAIL": $("#addtxtEmail").val(),
                        "USER_CONTACT": $("#addtxtContact").val(),
                        "USER_EXPIRY" : "",
                        "USER_LEVEL_ID" : $("#addddUserType").val(),         
                        "FIELD_OFFICE" : $("#addddSelOffice").val(),         
                        "CREATED_BY" : "sysadmin",
                        "STATUS" : $("#addddUserStatus").val(),
                }                

                $.wms.executeExternalPost('/ppa-api/wsv1/api/AddUser',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if(result.status === 'SUCCESS'){
                        var user_id = result.USER_ID;
                        $("#modalAdd").modal("toggle")
                        alert("User Added")
                        __attachUserListEvent();
                        
                    }else{
                        alert("Failed to add user.")
                    }
                });

            }else{
                //@TODO
                alert("Validation Failed")
            }

        });


        var ___validateAdd = function(){
            var dontSubmit = false;
            
            if($("#addtxtFullname").val() === ""){ dontSubmit = true; }            
            if($("#addtxtUsername").val() === ""){ dontSubmit = true; }            
            if($("#addtxtPassword1").val() === ""){ dontSubmit = true; }             
            if($("#addddUserType").val() === ""){ dontSubmit = true; }            
            if($("#addddUserStatus").val() === ""){ dontSubmit = true; }            
            if(dontSubmit){
                return false;
            }else{
                return true;    
            }
            


        }


    }


    var __attachCaseloadListEvent = function(){
        ___debug("Caseload Event")
         var payload = { }
            $.wms.executeExternalPost('/ppa-api/wsv1/api/getAllUserList',JSON.stringify(payload)).done(function (result) {
                if(result.status != undefined && result.status == "SUCCESS"){
                    result.payload.forEach(function(field){
                        
                        $("#fwdUsers").append($('<option>', {
                            value: field.USER_ID,
                            text: field.USER_FULLNAME
                        }));
                    })
                }
            });


        var payload = { method : "view_caseload", "user_id" : $.cookie("USER_ID") }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
            if(result.status === "SUCCESS"){
                ($.wms.debug() ? console.log(result) : "" )
                var data = [];
                for(i=0;i<result.payload.length;i++){
                    
                    var report_id = result.payload[i].report_id
                    var report_name = result.payload[i].report_name;
                    var report_field = result.payload[i].report_field;
                    var created_date = result.payload[i].created_date;
                    var status = "";
                    switch(result.payload[i].report_status){
                        case "1" : status = "Active"; break;
                        case "0" : status = "Inactive"; break;
                        case "-1" : status = "Inactive"; break;
                    }
                    //var button = '<button class="btn-xs btn btn-primary btn-edit" data-id="'+report_id+'"><i class="fa fa-pencil"></i></button>'+
                    var button = ' <button class="btn-xs btn btn-primary btn-view" data-id="'+report_id+'">View</button>' +
                                '  <button class="btn-xs btn btn-primary btn-fwd" data-id="'+report_id+'">Forward</button>'
                    data.push(["<b>"+(i+1)+"</b>","<b>"+report_name+"</b>",created_date,status,button])
                }

                if ( $.fn.DataTable.isDataTable('#tableSensorList') ) {
                  $('#tableSensorList').DataTable().destroy();
                  $('#tableSensorList tbody').empty();
                }

                var dtSensorList = $("#tableSensorList").DataTable({
                    dom: 'Blfrtip',
                    "scrollX": true,
                    buttons: [
                        {   extend: 'csv',
                            exportOptions: {
                                columns: [ 0, 1 ,2 ,3]
                            }, title: "User List", download: 'open'
                        },
                        {   extend: 'pdfHtml5',
                            exportOptions: {
                                columns: [ 0, 1, 2, 3 ]
                            }, title: "User List", download: 'open'
                        },
                        {   extend: 'excelHtml5',
                            exportOptions: {
                                columns: [ 0, 1, 2, 3 ]
                            }, title: "User List", download: 'open'
                        },
                    ],
                    "columns": [
                        { "width": "5%" },
                        { "width": "30%" },
                        { "width": "20%" },
                        { "width": "10%" },
                        { "width": "20%" },
                      ]
                });

                dtSensorList.rows.add(data).draw();
                //Export Events
                $(".dt-buttons").addClass("hidden")
                $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
                $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
                $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

                $("#tableSensorList").unbind("click").on("click",".btn-view",function(){
                    var id = $(this).data('id');
                    console.log(id);
                    var payload = { id : id , method : "view_single" }
                    $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        if(result.status === 'SUCCESS'){
                            location.href="view_caseload?id="+id    
                        }
                        

                    });
                });

                $("#tableSensorList").on("click",".btn-fwd",function(){
                    $("#modalFwd").modal();
                    //data-toggle="modal" data-target="#modalAdd"
                    var id = $(this).data('id');
                    console.log(id);

                    var payload = { id : id , method : "view_single" }
                    $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        if(result.status === 'SUCCESS'){
                            payload = result.payload
                            $("#fwdReportID").val(payload.report_id)    
                            $("#fwdReportName").val(payload.report_name)    
                        }
                        
                    });
                });



               
            }else{
                
            }
            

        });

       

        $("#btnFwdSubmit").unbind("click").on("click",function(){
             var payload = {
                report_id : $("#fwdReportID").val(),
                forwarded_by : $.cookie("USER_ID"),
                forwarded_to :  $("#fwdUsers").val(),
                method : "fwd"

            }          
            $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if(result.status === 'SUCCESS'){
                   alert("Success")
                   window.location.reload()
                    
                }else{
                    alert("Failed to Forward Report.")
                }
            });
        });

        $("#btnAddSubmit").unbind("click").on("click",function(){
            ___debug("Submit Event")

            if(___validateAdd()){
                var optionTexts = [];
                $("#sortable3 li").each(function() { optionTexts.push($(this).data("id")) });

                var payload = {
                        "report_name" : $("#addtxtFullname").val(),
                        "report_YM": $("#addreport_YM").val(),
                        "report_field": $("#field").val(),
                        "report_content" : JSON.stringify(optionTexts),            
                        "report_status": 1,
                        "created_by": $.cookie("USER_ID"),
                        "method" : "insert"
                }                

                $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if(result.status === 'SUCCESS'){
                        
                        alert("Adding of Report Succeed!")
                        window.location.reload()
                        __attachCaseloadListEvent();
                    }else{
                        alert("Failed to add Report.")
                    }
                });

            }else{
                //@TODO
                alert("Validation Failed")
            }

        });


        var ___validateAdd = function(){
            var dontSubmit = false;
            
            if($("#addtxtFullname").val() === ""){ dontSubmit = true; }              
            if(dontSubmit){
                return false;
            }else{
                return true;    
            }
            


        }


        //Sent Caseload Report
        ___debug("Sent Caseload Event")
        var payload = { method : "fwd_caseload", "user_id" : $.cookie("USER_ID") }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
            if(result.status === "SUCCESS"){
                ($.wms.debug() ? console.log(result) : "" )
                var data = [];
                for(i=0;i<result.payload.length;i++){
                    
                    var report_id = result.payload[i].report_id
                    var report_name = result.payload[i].report_name;
                    var report_to = result.payload[i].USER_FULLNAME.toUpperCase();
                    var report_field = result.payload[i].FIELD_OFFICE;
                    var created_date = result.payload[i].created_date;
                    var status = "";
                    switch(result.payload[i].report_status){
                        case "1" : status = "Active"; break;
                        case "0" : status = "Inactive"; break;
                        case "-1" : status = "Inactive"; break;
                    }
                    //var button = '<button class="btn-xs btn btn-primary btn-edit" data-id="'+report_id+'"><i class="fa fa-pencil"></i></button>'+
                    var button = ' <button class="btn-xs btn btn-primary btn-view" data-id="'+report_id+'">View</button>' +
                                '  <button class="btn-xs btn btn-primary btn-fwd" data-id="'+report_id+'">Forward</button>'
                    data.push(["<b>"+(i+1)+"</b>","<b>"+report_name+"</b>","<b>"+report_to+"</b>","<b>"+report_field+"</b>",created_date,status,button])
                }

                if ( $.fn.DataTable.isDataTable('#fwdList') ) {
                  $('#fwdList').DataTable().destroy();
                  $('#fwdList tbody').empty();
                }

                var dtSensorList = $("#fwdList").DataTable({
                    dom: 'Blfrtip',
                    "scrollX": true,
                    buttons: [
                        {   extend: 'csv',
                            exportOptions: {
                                columns: [ 0, 1 ,2 ,3]
                            }, title: "User List", download: 'open'
                        },
                        {   extend: 'pdfHtml5',
                            exportOptions: {
                                columns: [ 0, 1, 2, 3 ]
                            }, title: "User List", download: 'open'
                        },
                        {   extend: 'excelHtml5',
                            exportOptions: {
                                columns: [ 0, 1, 2, 3 ]
                            }, title: "User List", download: 'open'
                        },
                    ],
                    "columns": [
                        { "width": "5%" },
                        { "width": "15%" },
                        { "width": "15%" },
                        { "width": "20%" },
                        { "width": "20%" },
                        { "width": "10%" },
                        { "width": "20%" },
                      ]
                });

                dtSensorList.rows.add(data).draw();
                //Export Events
                $(".dt-buttons").addClass("hidden")
                $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
                $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
                $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

                $("#fwdList").unbind("click").on("click",".btn-view",function(){
                    var id = $(this).data('id');
                    console.log(id);
                    var payload = { id : id , method : "view_single" }
                    $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        if(result.status === 'SUCCESS'){
                            location.href="view_caseload?id="+id    
                        }
                        

                    });
                });

                $("#fwdList").on("click",".btn-fwd",function(){
                    $("#modalFwd").modal();
                    //data-toggle="modal" data-target="#modalAdd"
                    var id = $(this).data('id');
                    console.log(id);

                    var payload = { id : id , method : "view_single" }
                    $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        if(result.status === 'SUCCESS'){
                            payload = result.payload
                            $("#fwdReportID").val(payload.report_id)    
                            $("#fwdReportName").val(payload.report_name)    
                        }
                        
                    });
                });



              
            }else{
                
            }
            

        });


        //Sent Caseload Report
        ___debug("Rcv Caseload Event")
        var payload = { method : "rcv_caseload", "user_id" : $.cookie("USER_ID") }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
            if(result.status === "SUCCESS"){
                ($.wms.debug() ? console.log(result) : "" )
                var data = [];
                for(i=0;i<result.payload.length;i++){
                    
                    var report_id = result.payload[i].report_id
                    var report_from = result.payload[i].USER_FULLNAME.toUpperCase()
                    var report_name = result.payload[i].report_name;
                    var report_field = result.payload[i].FIELD_OFFICE;
                    var created_date = result.payload[i].created_date;
                    var status = "";
                    switch(result.payload[i].report_status){
                        case "1" : status = "Active"; break;
                        case "0" : status = "Inactive"; break;
                        case "-1" : status = "Inactive"; break;
                    }
                    //var button = '<button class="btn-xs btn btn-primary btn-edit" data-id="'+report_id+'"><i class="fa fa-pencil"></i></button>'+
                    var button = ' <button class="btn-xs btn btn-primary btn-view" data-id="'+report_id+'">View</button>' +
                                '  <button class="btn-xs btn btn-primary btn-fwd" data-id="'+report_id+'">Forward</button>'
                    data.push(["<b>"+(i+1)+"</b>","<b>"+report_name+"</b>","<b>"+report_from+"</b>","<b>"+report_field+"</b>",created_date,status,button])
                }

                if ( $.fn.DataTable.isDataTable('#rcvList') ) {
                  $('#rcvList').DataTable().destroy();
                  $('#rcvList tbody').empty();
                }

                var dtSensorList = $("#rcvList").DataTable({
                    dom: 'Blfrtip',
                    "scrollX": true,
                    buttons: [
                        {   extend: 'csv',
                            exportOptions: {
                                columns: [ 0, 1 ,2 ,3]
                            }, title: "User List", download: 'open'
                        },
                        {   extend: 'pdfHtml5',
                            exportOptions: {
                                columns: [ 0, 1, 2, 3 ]
                            }, title: "User List", download: 'open'
                        },
                        {   extend: 'excelHtml5',
                            exportOptions: {
                                columns: [ 0, 1, 2, 3 ]
                            }, title: "User List", download: 'open'
                        },
                    ],
                    "columns": [
                        { "width": "5%" },
                        { "width": "15%" },
                        { "width": "15%" },
                        { "width": "20%" },
                        { "width": "20%" },
                        { "width": "10%" },
                        { "width": "20%" },
                      ]
                });

                dtSensorList.rows.add(data).draw();
                //Export Events
                $(".dt-buttons").addClass("hidden")
                $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
                $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
                $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

                $("#rcvList").unbind("click").on("click",".btn-view",function(){
                    var id = $(this).data('id');
                    console.log(id);
                    var payload = { id : id , method : "view_single" }
                    $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        if(result.status === 'SUCCESS'){
                            location.href="view_caseload?id="+id    
                        }
                        

                    });
                });

                $("#rcvList").on("click",".btn-fwd",function(){
                    $("#modalFwd").modal();
                    //data-toggle="modal" data-target="#modalAdd"
                    var id = $(this).data('id');
                    console.log(id);

                    var payload = { id : id , method : "view_single" }
                    $.wms.executeExternalPost('/ppa-api/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                        console.log(result)
                        if(result.status === 'SUCCESS'){
                            payload = result.payload
                            $("#fwdReportID").val(payload.report_id)    
                            $("#fwdReportName").val(payload.report_name)    
                        }
                        
                    });
                });



                
            }else{
                
            }
            

        });


    }


    var __attachDeletedListEvent = function(){
        ___debug("User List Event")
        var payload = { table : $("#table").val() }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/getDeletedList',JSON.stringify(payload)).done(function (result) {
            if(result.status === "SUCCESS"){
                ($.wms.debug() ? console.log(result) : "" )
                var data = [];
                for(i=0;i<result.payload.length;i++){
                    
                    var id = result.payload[i].id
                    var docket_no = result.payload[i].docket_no;
                    //var level = result.payload[i].USER_LEVEL_NAME;
                    var FIELD_OFFICE = result.payload[i].field_office;
                    var petitioner = ((typeof(result.payload[i].petitioner) != "undefined") ? result.payload[i].petitioner  : ((typeof result.payload[i].petitioner_name != "undefined") ? result.payload[i].petitioner_name  : result.payload[i].probationer ) ) ;
                    var Y_M = result.payload[i].Y_M;
                    
                    var button = "<button class='btnRestore' data-id='"+id+"'>Restore</button>";
                    data.push(["<b>"+(id)+"</b>","<b>"+docket_no+"</b>",petitioner,FIELD_OFFICE,Y_M,button])
                }

                if ( $.fn.DataTable.isDataTable('#tableSensorList') ) {
                  $('#tableSensorList').DataTable().destroy();
                  $('#tableSensorList tbody').empty();
                }

                var dtSensorList = $("#tableSensorList").DataTable({
                    dom: 'Blfrtip',
                    "scrollX": true,
                    buttons: [
                        {   extend: 'csv',
                            exportOptions: {
                                columns: [ 0, 1 ,2 ,3]
                            }, title: "User List", download: 'open'
                        },
                        {   extend: 'pdfHtml5',
                            exportOptions: {
                                columns: [ 0, 1, 2, 3 ]
                            }, title: "User List", download: 'open'
                        },
                        {   extend: 'excelHtml5',
                            exportOptions: {
                                columns: [ 0, 1, 2, 3 ]
                            }, title: "User List", download: 'open'
                        },
                    ],
                    
                });

                dtSensorList.rows.add(data).draw();
                //Export Events
                $(".dt-buttons").addClass("hidden")
                $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
                $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
                $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

                $("#tableSensorList").unbind("click").on("click",".btnRestore",function(){
                    var result = confirm("Are you sure?");
                    if(result == true){
                        var id = $(this).data('id');
                        console.log(id);
                        var payload = { id : id, table : $("#table").val() }
                        $.wms.executeExternalPost('/ppa-api/wsv1/api/restoreDeleted',JSON.stringify(payload)).done(function (result) {
                            __attachDeletedListEvent();
                        });    
                    }
                    
                });
                /*$("#tableSensorList").unbind("click").on("click",".btn-edit",function(){
                    var id = $(this).data('id');
                    
                    $("#editLoading").removeClass("hidden");
                    $("#editBody").addClass("hidden");

                    $("#modalEdit").modal()
                    var payload = { USER_ID : id }
                    $.wms.executeExternalPost('/ppa-api/wsv1/api/getUserByID',JSON.stringify(payload)).done(function (result) {
                        ___debug(result);
                        var USER_ID  = result.payload.USER_ID;
                        var USER_NAME = result.payload.USER_NAME;
                        var USER_FULLNAME = result.payload.USER_FULLNAME;
                        var USER_CONTACT = result.payload.USER_CONTACT;
                        var USER_EMAIL = result.payload.USER_EMAIL;
                        var USER_LEVEL_ID = result.payload.USER_LEVEL_ID;
                        var USER_EXPIRY = result.payload.USER_EXPIRY;
                        var FIELD_OFFICE = result.payload.FIELD_OFFICE;

                        $("#editLoading").addClass("hidden");
                        $("#editBody").removeClass("hidden");

                        $("#txtUserID").val(USER_ID);
                        $("#txtUsername").val(USER_NAME);
                        $("#txtFullname").val(USER_FULLNAME);
                        $("#txtContact").val(USER_CONTACT);
                        $("#txtEmail").val(USER_EMAIL);
                        $("#ddUserType").val(USER_LEVEL_ID).trigger("change");
                        $("#ddSelOffice").val(FIELD_OFFICE).trigger("change")
                        var expiry = new Date(USER_EXPIRY);
                        var day = ("0" + expiry.getDate()).slice(-2);
                        var month = ("0" + (expiry.getMonth() + 1)).slice(-2);
                        var exp = expiry.getFullYear()+"-"+(month)+"-"+(day) ;
                        $("#txtExpiration").val(exp)
                        // $("#ddUserStatus").val(STATUS).trigger("change");
                        $("#btnSave").unbind("click").on("click",function(){
                            var payload = {
                                    "USER_ID" : $("#txtUserID").val(),
                                    "USER_FULLNAME" : $("#txtFullname").val(),
                                    "USER_NAME": $("#txtUsername").val(),
                                    "USER_PASS" : $("#txtPassword1").val(),            
                                    "USER_EMAIL": $("#txtEmail").val(),
                                    "USER_CONTACT": $("#txtContact").val(),
                                    "USER_EXPIRY" : "",
                                    "USER_LEVEL_ID" : $("#ddUserType").val(),         
                                    "FIELD_OFFICE" : $("#ddSelOffice").val(),         
                                    "CREATED_BY" : "sysadmin",
                                    "USER_STATUS" : $("#ddUserStatus").val(),
                            }              
                            $.wms.executeExternalPost('/ppa-api/wsv1/api/UpdateUser',JSON.stringify(payload)).done(function (result) {
                                console.log(result);
                                if(result.status === 'SUCCESS'){
                                    var user_id = result.USER_ID;
                                    $("#modalEdit").modal("toggle")
                                    alert(result.message)
                                    __attachUserListEvent();
                                    
                                }else{
                                    alert("Failed to Update user.")
                                }
                            });
                        });

                    });
                    
                    
                    
                });*/
            }else{
                if ( $.fn.DataTable.isDataTable('#tableSensorList') ) {
                  $('#tableSensorList').DataTable().destroy();
                  $('#tableSensorList tbody').empty();
                  
                }
            }
            

        });

        $("#btnAddSubmit").unbind("click").on("click",function(){
            ___debug("Submit Event")

            if(___validateAdd()){
                var payload = {
                        "USER_FULLNAME" : $("#addtxtFullname").val(),
                        "USER_NAME": $("#addtxtUsername").val(),
                        "USER_PASS" : $("#addtxtPassword1").val(),            
                        "USER_EMAIL": $("#addtxtEmail").val(),
                        "USER_CONTACT": $("#addtxtContact").val(),
                        "USER_EXPIRY" : "",
                        "USER_LEVEL_ID" : $("#addddUserType").val(),         
                        "FIELD_OFFICE" : $("#addddSelOffice").val(),         
                        "CREATED_BY" : "sysadmin",
                        "STATUS" : $("#addddUserStatus").val(),
                }                

                $.wms.executeExternalPost('/ppa-api/wsv1/api/AddUser',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if(result.status === 'SUCCESS'){
                        var user_id = result.USER_ID;
                        $("#modalAdd").modal("toggle")
                        alert("User Added")
                        __attachUserListEvent();
                        
                    }else{
                        alert("Failed to add user.")
                    }
                });

            }else{
                //@TODO
                alert("Validation Failed")
            }

        });


       


    }

    var __attachUserLevelEvent = function(){
        ___debug("User List Event")
        var payload = { }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/getAllUserTypes',JSON.stringify(payload)).done(function (result) {
            ($.wms.debug() ? console.log(result) : "" )
            var data = [];
            for(i=0;i<result.payload.length;i++){
                
                var user_id = result.payload[i].USER_LEVEL_ID
                var level = result.payload[i].USER_LEVEL_NAME;
                var status = "";
                switch(result.payload[i].STATUS){
                    case "1" : status = "Active"; break;
                    case "0" : status = "Inactive"; break;
                }
                var button = '<button class="btn-xs btn btn-primary btn-edit" data-id="'+user_id+'"><i class="fa fa-pencil"></i></button>'
                data.push(["<b>"+(i+1)+"</b>",level,status,button])
            }

            if ( $.fn.DataTable.isDataTable('#tableSensorList') ) {
              $('#tableSensorList').DataTable().destroy();
              $('#tableSensorList tbody').empty();
            }

            var dtSensorList = $("#tableSensorList").DataTable({
                dom: 'Blfrtip',
                "scrollX": true,
                buttons: [
                    {   extend: 'csv',
                        exportOptions: {
                            columns: [ 0, 1 ,2,3]
                        }, title: "User List", download: 'open'
                    },
                    {   extend: 'pdfHtml5',
                        exportOptions: {
                            columns: [ 0, 1, 2,3 ]
                        }, title: "User List", download: 'open'
                    },
                    {   extend: 'excelHtml5',
                        exportOptions: {
                            columns: [ 0, 1, 2,3]
                        }, title: "User List", download: 'open'
                    },
                ],
                "columns": [
                    { "width": "5%" },
                    { "width": "30%" },
                    { "width": "30%" },
                    { "width": "30%" },
                  ]
            });

            dtSensorList.rows.add(data).draw();
            //Export Events
            $(".dt-buttons").addClass("hidden")
            $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
            $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
            $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

            $('.add_modules').empty();
            $('.edit_modules').empty();
            $.wms.executeExternalPost('/ppa-api/wsv1/api/getAllUserTypeModules',JSON.stringify(payload)).done(function (result) {
                    console.log(result);

                    if(result.status === 'SUCCESS'){
                        for(i=0;i<result.payload.length;i++){
                            var USER_LEVEL_MODULE_ID = result.payload[i].USER_LEVEL_MODULE_ID;
                            var USER_LEVEL_MODULE_NAME = result.payload[i].USER_LEVEL_MODULE_NAME;
                           
                            $('.add_modules').append('<input data-id="'+USER_LEVEL_MODULE_ID+'" type="checkbox" name="'+USER_LEVEL_MODULE_ID+'" class="add_module_names"> '+USER_LEVEL_MODULE_NAME+"<br/>" )
                            $('.edit_modules').append('<input id="edit_cb_'+USER_LEVEL_MODULE_ID+'" data-id="'+USER_LEVEL_MODULE_ID+'" type="checkbox" name="'+USER_LEVEL_MODULE_ID+'" class="edit_module_names"> '+USER_LEVEL_MODULE_NAME+"<br/>" )
                        }
                    }else{
                        alert("Failed to add user.")
                    }
            });


            $("#tableSensorList").unbind("click").on("click",".btn-edit",function(){
                var id = $(this).data('id');
                
                $("#editLoading").removeClass("hidden");
                $("#editBody").addClass("hidden");

                $("#modalEdit").modal()
                var payload = { USER_ID : id }


                var payload2 = { LEVEL_ID : id }
                $.wms.executeExternalPost('/ppa-api/wsv1/api/getUserTypeByModulesByID',JSON.stringify(payload2)).done(function (result) {
                    console.log(result)
                    if(result.status === "SUCCESS"){
                        for(i=0;i<result.payload.length;i++){
                            if(result.payload[i].ACCESS_RIGHTS == "1"){
                                $("#edit_cb_"+result.payload[i].USER_LEVEL_MODULE_ID).prop("checked", true);
                            }else{
                                $("#edit_cb_"+result.payload[i].USER_LEVEL_MODULE_ID).prop("checked", false);
                            }
                        }
                    }else{
                        $(".edit_module_names").prop("checked",false)
                    }
                });
                



                $.wms.executeExternalPost('/ppa-api/wsv1/api/getUserTypeByID',JSON.stringify(payload)).done(function (result) {
                    ___debug(result);
                    var USER_LEVEL_ID  = result.payload.USER_LEVEL_ID;
                    var USER_LEVEL_NAME = result.payload.USER_LEVEL_NAME;
                    var STATUS = result.payload.STATUS;

                    $("#editLoading").addClass("hidden");
                    $("#editBody").removeClass("hidden");

                    $("#txtLevelID").val(USER_LEVEL_ID);
                    $("#txtFullname").val(USER_LEVEL_NAME);
                    
                    $("#ddUserStatus").val(STATUS).trigger("change")
                   
                    // $("#ddUserStatus").val(STATUS).trigger("change");
                    $("#btnSave").unbind("click").on("click",function(){

                        var checkbox = []

                        $(".edit_module_names").each(function(){
                            var payload2
                            if(this.checked){
                                payload2 = {
                                    USER_LEVEL_MODULE_ID : $(this).data("id"),
                                    STATUS : 1
                                }
                            }else{
                                payload2 = {
                                    USER_LEVEL_MODULE_ID : $(this).data("id"),
                                    STATUS : 0
                                }


                            }
                            checkbox.push(payload2)
                        })
                        //console.log(checkbox)


                        var payload = {
                                "USER_LEVEL_ID" : $("#txtLevelID").val(),
                                "USER_LEVEL_NAME" : $("#txtFullname").val(),
                                "STATUS" : $("#ddUserStatus").val(),
                                "checkbox" : checkbox
                        }              
                        $.wms.executeExternalPost('/ppa-api/wsv1/api/UpdateUserType',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if(result.status === 'SUCCESS'){
                                var user_id = result.USER_ID;
                                $("#modalEdit").modal("toggle")
                                alert(result.message)
                                __attachUserLevelEvent();
                                
                            }else{
                                alert("Failed to Update user.")
                            }
                        });
                    });

                });
                
                
                
            });

        });

        $("#btnAddSubmit").unbind("click").on("click",function(){
            ___debug("Submit Event")

            if(___validateAdd()){
                              

                var checkbox = []

                $(".add_module_names").each(function(){
                    var payload2
                    if(this.checked){
                        payload2 = {
                            USER_LEVEL_MODULE_ID : $(this).data("id"),
                            STATUS : 1
                        }
                    }else{
                        payload2 = {
                            USER_LEVEL_MODULE_ID : $(this).data("id"),
                            STATUS : 0
                        }


                    }
                    checkbox.push(payload2)
                })
                //console.log(checkbox)

                var payload = {
                        "USER_LEVEL_NAME" : $("#addtxtUserLevel").val(),
                        "USER_STATUS" : $("#ddUserStatus").val(),
                        "checkbox" : checkbox
                }  


                $.wms.executeExternalPost('/ppa-api/wsv1/api/AddUserType',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if(result.status === 'SUCCESS'){
                        var user_id = result.USER_ID;
                        $("#modalAdd").modal("toggle")
                        alert("User Level Added")
                        __attachUserLevelEvent();
                        
                    }else{
                        alert("Failed to add user.")
                    }
                });

            }else{
                //@TODO
                alert("Validation Failed")
            }

        });


        var ___validateAdd = function(){
            var dontSubmit = false;
            
            if($("#addtxtFullname").val() === ""){ dontSubmit = true; }            
            if($("#addtxtUsername").val() === ""){ dontSubmit = true; }            
            if($("#addtxtPassword1").val() === ""){ dontSubmit = true; }             
            if($("#addddUserType").val() === ""){ dontSubmit = true; }            
            if($("#addddUserStatus").val() === ""){ dontSubmit = true; }            
            if(dontSubmit){
                return false;
            }else{
                return true;    
            }
            


        }


    }

  
   var __attachFormsEvent = function(){
        ___debug("User List Event")
        var payload = { }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/getAllForms',JSON.stringify(payload)).done(function (result) {
            ($.wms.debug() ? console.log(result) : "" )
            var data = [];
            for(i=0;i<result.payload.length;i++){
                
                var form_id = result.payload[i].form_ID
                var form_page = result.payload[i].form_page
                var form_title = result.payload[i].form_TITLE;
                var form_caption = result.payload[i].form_CAPTION;
                
                
                var button = '<button class="btn-xs btn btn-primary btn-edit" data-id="'+form_page+'"><i class="fa fa-pencil"></i></button>'
                data.push(["<b>"+(i+1)+"</b>",form_title,form_caption,button])
            }

            if ( $.fn.DataTable.isDataTable('#tableSensorList') ) {
              $('#tableSensorList').DataTable().destroy();
              $('#tableSensorList tbody').empty();
            }

            var dtSensorList = $("#tableSensorList").DataTable({
                dom: 'Blfrtip',
                "scrollX": true,
                buttons: [
                    {   extend: 'csv',
                        exportOptions: {
                            columns: [ 0, 1 ,2]
                        }, title: "Form List", download: 'open'
                    },
                    {   extend: 'pdfHtml5',
                        exportOptions: {
                            columns: [ 0, 1, 2,]
                        }, title: "Form List", download: 'open'
                    },
                    {   extend: 'excelHtml5',
                        exportOptions: {
                            columns: [ 0, 1, 3]
                        }, title: "Form List", download: 'open'
                    },
                ],
                "columns": [
                    { "width": "5%" },
                    { "width": "30%" },
                    { "width": "30%" },
                    { "width": "30%" },
                  ]
            });

            dtSensorList.rows.add(data).draw();
            //Export Events
            $(".dt-buttons").addClass("hidden")
            $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
            $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
            $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

            
            


            $("#tableSensorList").unbind("click").on("click",".btn-edit",function(){
                var form_page = $(this).data('id');
                
                $("#editLoading").removeClass("hidden");
                $("#editBody").addClass("hidden");

                $("#modalEdit").modal()
                var payload = { form_page : form_page }

                $.wms.executeExternalPost('/ppa-api/wsv1/api/getFormByPage',JSON.stringify(payload)).done(function (result) {
                    ___debug(result);
                    var form_ID  = result.payload.form_ID;
                    var form_TITLE = result.payload.form_TITLE;
                    var form_CAPTION = result.payload.form_CAPTION;

                    $("#editLoading").addClass("hidden");
                    $("#editBody").removeClass("hidden");

                    $("#txtformTitle").val(form_TITLE);
                    $("#txtformID").val(form_ID);
                    $("#txtformCaption").val(form_CAPTION);
                    // $("#ddUserStatus").val(STATUS).trigger("change");
                    $("#btnSave").unbind("click").on("click",function(){

                       
                        var payload = {
                                "form_ID" : $("#txtformID").val(),
                                "form_CAPTION" : $("#txtformCaption").val(),
                        }              
                        $.wms.executeExternalPost('/ppa-api/wsv1/api/UpdateForm',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if(result.status === 'SUCCESS'){
                                var user_id = result.USER_ID;
                                $("#modalEdit").modal("toggle")
                                alert(result.message)
                                __attachFormsEvent();
                                
                            }else{
                                alert("Failed to Update Form.")
                            }
                        });
                    });

                });
                
                
                
            });

        });

        $("#btnAddSubmit").unbind("click").on("click",function(){
            ___debug("Submit Event")

            if(___validateAdd()){
                              

                var checkbox = []

                $(".add_module_names").each(function(){
                    var payload2
                    if(this.checked){
                        payload2 = {
                            USER_LEVEL_MODULE_ID : $(this).data("id"),
                            STATUS : 1
                        }
                    }else{
                        payload2 = {
                            USER_LEVEL_MODULE_ID : $(this).data("id"),
                            STATUS : 0
                        }


                    }
                    checkbox.push(payload2)
                })
                //console.log(checkbox)

                var payload = {
                        "USER_LEVEL_NAME" : $("#addtxtUserLevel").val(),
                        "USER_STATUS" : $("#ddUserStatus").val(),
                        "checkbox" : checkbox
                }  


                $.wms.executeExternalPost('/ppa-api/wsv1/api/AddUserType',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if(result.status === 'SUCCESS'){
                        var user_id = result.USER_ID;
                        $("#modalAdd").modal("toggle")
                        alert("User Level Added")
                        __attachUserLevelEvent();
                        
                    }else{
                        alert("Failed to add user.")
                    }
                });

            }else{
                //@TODO
                alert("Validation Failed")
            }

        });


        var ___validateAdd = function(){
            var dontSubmit = false;
            
            if($("#addtxtFullname").val() === ""){ dontSubmit = true; }            
            if($("#addtxtUsername").val() === ""){ dontSubmit = true; }            
            if($("#addtxtPassword1").val() === ""){ dontSubmit = true; }             
            if($("#addddUserType").val() === ""){ dontSubmit = true; }            
            if($("#addddUserStatus").val() === ""){ dontSubmit = true; }            
            if(dontSubmit){
                return false;
            }else{
                return true;    
            }
            


        }


    }


    // ################ QUERY ################# //


    var __loadUserType = function(element){
        ___debug("Load User Type List")
        var payload = { }
        $.wms.executeExternalPost('/ppa-api/wsv1/api/getAllUserType',JSON.stringify(payload)).done(function (result) {
            ___debug(result)
            
            for(i=0;i<result.payload.length;i++){
                var USER_LEVEL_ID = result.payload[i].USER_LEVEL_ID;
                var USER_LEVEL_NAME = result.payload[i].USER_LEVEL_NAME;
               
                $('.'+element).append($('<option>', {
                    value: USER_LEVEL_ID,
                    text: USER_LEVEL_NAME
                }));
            }
        });
    }

    // ################ LIST OF VALUES ################# //
    
    var ___debug = function(msg){
        ($.wms.debug() ? console.log(msg) : "" )      
    }

    var getDaysInMonth = function(month,year) {
          // Here January is 1 based
          //Day 0 is the last day in the previous month
         return new Date(year, month, 0).getDate();
        // Here January is 0 based
        // return new Date(year, month+1, 0).getDate();
    };

    var ___navHighlight = function(){
        var str  = document.URL;
        var n=str.split("/");
        var word = n[n.length - 1];
        //console.log(word)
        //console.log(word)
        if (word ==  'dashboard'){
            $("#navHome").addClass("active"); 
        } 
        if (word.indexOf("caseload") >= 0){
            $("#navCL").addClass("active");
        }

        if (word.indexOf("user") >= 0){
            $("#navMT").addClass("active");
        } 

        if (word.indexOf("probationer") >= 0){
            $("#navML").addClass("active");
        }
       ___formControlCheck();

        
    }

    return {
        
        attachUserListEvent : __attachUserListEvent,
        attachUserLevelEvent : __attachUserLevelEvent,

        attachPageEvent : __attachPageEvent,

        loadUserType : __loadUserType,
        navHighlight : ___navHighlight,
        loggedIn : ___loggedIn,
        loadAuditTrail : __loadAuditTrail,
        
        formControlCheck : ___formControlCheck,
        attachDeletedListEvent: __attachDeletedListEvent,
        attachCaseloadListEvent : __attachCaseloadListEvent,
        checkPermission : __checkPermission,
        attachFormsEvent:  __attachFormsEvent
    };
}());
