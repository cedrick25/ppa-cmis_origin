/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.form5 = (typeof $.wms.form5 !== 'undefined') ? $.wms : {};

$.wms.form5 = (function() {

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
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                if(result2.status == 'SUCCESS'){
                    dontSubmit = true;

                    docket.addClass("error_field")
                    $("<p class='err_msg color-red font_12 i'>*Docket existing in "+checkTable.join("/")+"</p>").insertAfter(docket)
                }else{
                    // dontSubmit = false;
                    if (required === 0) {
                        
                        dontSubmit = false;
                    }else{
                        dontSubmit = true;

                    }

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

    function deleteItem(event) {
        const id = $(event.currentTarget).data('id');
        const filePath = $(event.currentTarget).data('file_path');
        const fileName = $(event.currentTarget).data('file_name');

        console.log('Deleting item:', { id, filePath, fileName });

        if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
            $.ajax({
                url: `${PPIS_path_upload}/file/delete/${id}`, // Corrected this line
                method: 'POST',
                data: { id, file_path: filePath, file_name: fileName },
                success: function(response) {
                    alert('Deleted successfully!');
                    // You can reload your table or remove the element from DOM here
                },
                error: function(err) {
                    alert('Failed to delete.');
                }
            });
        }
    }
    var __attachF5T1PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field')
        }
        $('.F5T1_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T1ByYM',JSON.stringify(payload)).done(function (result) {
            
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                   data = $.wms.upper($.wms.sanitize(data))
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F5T1_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.petitioner.toUpperCase()+"</td>"+
                        "<td>"+data.date_rcv+"</td>"+
                        "<td>"+data.investigating_officer+"</td>"+
                        "<td class='options field'>"+data.field_office+"</td>"+
                        "<td class='options'>"+source+"</td>"+
                        "<td align='center' class='options'>" + 
                        "<button class='access_f5_write btn btn-success btn-sm btn-edit form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "'><i class='fa fa-pencil'></i> Update</button> " +
                        "<button class='access_f5_write btn btn-danger btn-sm btn-delete form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "'><i class='fa fa-trash'></i> Delete</button> " +
                    "</td></tr>");
                });
            }else{
            }
            $(document).ready(function () {
                // var table = $('#T_F5T1').DataTable();
                $('.dataTables_length').addClass('bs-select');
                $('#T_F5T1').dataTable( {
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
            });


            //Table Control Events
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var payload = {
                    "checkTable" : ['F5T2_ACTED','F5T2_NOTACTED'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()

                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteProceedButton").prop('disabled', true);

                    } else {
                        $(".deleteProceedButton").prop('disabled', false);
                    }
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
                var payload = {
                    "ID" : data_id
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T1ByID',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_petitioner").val(payload.petitioner)
                        $("#edit_date_rcv").val(payload.date_rcv)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_investigating_officer").val(payload.investigating_officer)
                        $("#edit_Y_M").val(payload.Y_M)
                       
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


        //Update
        $(".editProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "id" : $("#edit_id").val(),
                "docket_no" : $("#edit_docket_no").val(),
                "petitioner": $("#edit_petitioner").val(),
                "date_rcv": $("#edit_date_rcv").val(),
                "field_office": $.wms.urlParam('field'),
                "investigating_officer": $("#edit_investigating_officer").val(),
                "Y_M": $.wms.urlParam('date'),
                "created_by" : $.cookie("USER_ID")
            }
            console.log(payload)
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/updateF5T1',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".editProceedButton").attr('disabled',false)
                $("#modal-edit").modal('toggle')
                if(result.status != undefined && result.status == "SUCCESS"){
                    // __attachF5T1PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });

            // var table = $('#T_F5T1').DataTable();
            // $("#T_F5T1").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form5-Table1",
            //     filename: "Form5-Table1.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 

            var table = $('#T_F5T1').DataTable();
            var clonedRows = table.$('tr').clone(); // Clone the data rows

            // Get the table headers
            var tableHeaders = table.columns().header().toArray();

            // Columns to exclude from the header (0-based index)
            var excludedColumns = [4, 5, 6]; // Example: excluding columns 6,7 and 8

            // Create the header row HTML string
            var headerRowHtml = '<tr>';
            tableHeaders.forEach(function(header, index) {
              if (!excludedColumns.includes(index)) {
                headerRowHtml += '<th>' + $(header).text() + '</th>';
              }
            });
            headerRowHtml += '</tr>';

            // Create a temporary table element and append the header row and cloned rows
            var tempTable = $('<table></table>');
            tempTable.append(headerRowHtml);
            tempTable.append(clonedRows);

            // Export the temporary table
            tempTable.table2excel({
              exclude: ".options",
              name: "Form5-Table1",
              filename: "Form5-Table1", // File name without extension
              fileext: ".xls",
              preserveColors: true
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPI', 'PI', 'JRPI', 'RPI', 'JTPI', 'TPI' ];
            var requiredField= [ 'add_petitioner', 'add_date_rcv', 'add_investigating_officer'];
            var check = true
            var checkTable = ['F5T1']

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
                "docket_no" : $("#add_docket_no").val(),
                "petitioner": $("#add_petitioner").val(),
                "date_rcv": $("#add_date_rcv").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "investigating_officer": $("#add_investigating_officer").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "created_by" : $.cookie("USER_ID")
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertF5T1',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                $(".btn-reset").trigger("click")    
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T1PageEvent();
                    location.reload();

                }else{
                    //Error Prompt
                }
            });
        })

        //Delete
        $(".deleteProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")

            var payload = {
                "id" : $(".sel-id").html(),
                "status" : "0",
                "created_by" : $.cookie("USER_ID"),
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/updateF5T1',JSON.stringify(payload)).done(function (result) {
                $("#modal-delete").modal('toggle')
                $(".modal-loader").addClass("hidden")
                $(".deleteProceedButton").attr('disabled',false)
                if(result.status != undefined && result.status == "SUCCESS"){
                   // __attachF5T1PageEvent();

                    var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                    var payload = {
                        "created_by" : $.cookie("USER_ID"),
                        "module" : "CASELOAD",
                        "action" : form
                        
                    }
                    $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                        location.reload();
                    });
                }
            });    
        })
    };


    var __attachF5T2PageEvent = function() {
        var __maxTableSize = 0;
        var __counter = 0;

        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        var __received = function(){
            console.log("received events")
            $('.F5T2_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field')

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_RCV_ByYM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                if(result.status != undefined && result.status == "SUCCESS"){

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                           
                            result.payload.forEach(function(data){
                                data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $('.F5T2_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner_name.toUpperCase()+"</td>"+
                                    "<td>"+data.plea_bargain+"</td>"+
                                    "<td>"+data.case_no+"</td>"+
                                    "<td>"+data.court_origin+"</td>"+
                                    "<td>"+data.offense+"</td>"+
                                    "<td>"+data.sentence+"</td>"+
                                    "<td>"+data.date_of_court_order+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.investigating_officer_name+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner_name + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f5_write btn btn-success btn-xs btn-rcv-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f5_write btn btn-danger btn-xs btn-rcv-delete form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });

                            $(document).on('click', '.btn-attachment-rcv', function() {
                                var docketNo = $(this).data('docket');
                                var recordId = $(this).data('id');
                                var petitioner = $(this).data('petitioner');
                                var field_office_id = $(this).data('field_office_id');
                                console.log(petitioner)
                                console.log(field_office_id)

                                // Set docketNo, petitioner, and field_office_id in the form's hidden fields
                                $('#docket_no').val(docketNo);
                                $('#petitioner_name').val(petitioner);
                                $('#FOId').val(field_office_id);

                                // Populate the type select dropdown
                                $('#type').empty().append(`
                                    <option value="" disabled selected>Select Type</option>
                                    <option value="Order to Conduct PSI">Order to Conduct PSI</option>
                                    <option value="Other Document/s">Other Document/s</option>
                                `);
                                
                                // Remove any previous 'change' event and bind a new one to handle the select change
                                $(document).off('change', '#type').on('change', '#type', function() {
                                    var selectedValue = $(this).val();
                                    
                                    if (selectedValue === 'Other Document/s') {
                                        $('.remarks-row').show(); // Show the remarks field
                                    } else {
                                        $('.remarks-row').hide(); // Hide the remarks field
                                    }
                                });

                                // Open the Bootstrap modal
                                $('#attachmentModal').modal('show');

                                // Call load_table function
                                load_table("investigation", docketNo, field_office_id, "F5T2RR");
                            });
                            function tableColumns() {
                                return [
                                    {
                                        "title": "#",  // Add title for index column
                                        "data": null,
                                        "render": function (data, type, row, meta) {
                                            return meta.settings._iDisplayStart + meta.row + 1;
                                        }
                                    },
                                    { "title": "File Name", "data": "fileName" },  // Add title
                                    { "title": "Type", "data": "remarks" },  // Add title (Change if needed)
                                    {
                                        "title": "Actions",  // Add title for actions column
                                        "data": null,
                                        "render": function (data, type, row, meta) {
                                            let actions = `
                                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                                        <i class='fa fa-eye'></i> View
                                                    </button>
                                                </a>
                                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                                        <i class='fa fa-download'></i> Download
                                                    </button>
                                                </a>
                                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                                    <i class='fa fa-trash'></i> Delete
                                                </button>
                                            `;
                                            return actions;
                                        }
                                    }
                                ];
                            }
                            $(document).on('click', '.btn-delete-upload', deleteItem);

                            var dataTable = null; // Initialize DataTable globally

                            function load_table(type, uuid, officeId, kind) {
                                if (dataTable) {
                                    $('.table_head').DataTable().destroy();
                                    $('.table_head tbody').empty(); // Clear table body to avoid duplicates
                                }

                                dataTable = $('.table_head').DataTable({
                                    "processing": false,
                                    "serverSide": true,
                                    "scrollX": true,
                                    "scrollCollapse": true,  
                                    "autoWidth": false,
                                    "responsive": true, 
                                    "lengthMenu": [10, 25, 50, 100],
                                    "pageLength": 10,
                                    "ordering": false,
                                    "drawCallback": function() {
                                        $($.fn.dataTable.tables(true)).css('width', '100%'); 
                                    },
                                    ajax: {
                                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                                        type: 'GET',
                                        cache: true,
                                        data: function (d) {
                                            return { 
                                                page: d.start / d.length, // Pagination logic
                                                size: d.length           // Page size 
                                            };
                                        },
                                        dataFilter: function (data) {
                                            var json = jQuery.parseJSON(data);
                                            json.recordsTotal = json.totalElements;
                                            json.recordsFiltered = json.totalElements;
                                            json.data = json.content;
                                            return JSON.stringify(json);
                                        }
                                    },
                                    columns: tableColumns() // Call function to get table columns
                                });
                                setTimeout(function () {
                                    dataTable.columns.adjust().draw();
                                }, 200);
                            }

                            $('#uploadButton').on('click', function(e) {
                                e.preventDefault(); // Prevent default form submission
                                $(this).prop('disabled', true).text('Uploading...');
                                // Create FormData object
                                var formData = new FormData();
                                formData.append('uuid', $('#docket_no').val());
                                formData.append('createdby', $('#petitioner_name').val());
                                formData.append('type', "investigation");
                                var type = $('#type').val();
                                var remarks = $('#remarks').val();
                                if (remarks) {
                                    formData.append('remarks', type + " - " + remarks);
                                } else {
                                    formData.append('remarks', type);
                                }
                                formData.append('officeId', $('#FOId').val());
                                formData.append('version', "0");
                                var file = $('#fileupload')[0].files[0];
                                if (!file) {
                                    alert('Please select a file to upload.');
                                    $('#uploadButton').prop('disabled', false).text('Upload');
                                    return; // Exit if no file is selected
                                }
                                formData.append('file', file);
                                var fileInput = $('#fileupload')[0];
                                if (fileInput.files.length > 0) {
                                    var fileName = fileInput.files[0].name;  // Get the file name
                                    formData.append('kind', "F5T2RR");  // Append file name to formData
                                }

                                // **Console log all form data**
                                console.log('File name:', fileName); // Log the file name to console
                                console.log('--- Form Data ---');
                                for (var pair of formData.entries()) {
                                    if (pair[1] instanceof File) {
                                        console.log(`${pair[0]}: (File) Name: ${pair[1].name}, Size: ${pair[1].size}, Type: ${pair[1].type}`);
                                    } else {
                                        console.log(`${pair[0]}: ${pair[1]}`);
                                    }
                                }

                                var url = `${PPIS_path_upload}/file/upload`;
                                // Send AJAX request
                                $.ajax({
                                    url: url,
                                    type: 'POST',
                                    data: formData,
                                    processData: false,
                                    contentType: false,
                                    success: function(response) {
                                        console.log('Response:', response);
                                        if ("true") {
                                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F5T2RR");
                                             // Clear the remarks textarea
                                            $('#remarks').val(''); 
                                            
                                            // Clear the file input (reset file input)
                                            $('#fileupload').val('');
                                        } else {
                                            alert('Error: ' + "Failed to upload");
                                        }
                                        $('#uploadButton').prop('disabled', false).text('Upload');
                                    },
                                    error: function(xhr, status, error) {
                                        console.error('Upload failed: ', error);
                                        alert('An error occurred during the upload.');
                                        $('#uploadButton').prop('disabled', false).text('Upload');
                                    }
                                });
                            });
                            $(document).ready(function () {
                                var table = $('#T_F5T2_a').DataTable( {
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                });
                            });
                            ___updateRCV_event();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __received()

        var __acted = function(){
            console.log("received events")
            $('.F5T2_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field')

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_ACTED_ByYM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                if(result.status != undefined && result.status == "SUCCESS"){

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                           
                            result.payload.forEach(function(data){
                                data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                ppo_recommendation = (data.ppo_recommendation == "PSIR - FOR GRANTED" ? "PSIR - FOR GRANT" : data.ppo_recommendation)
                                $('.F5T2_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner_name.toUpperCase()+"</td>"+
                                    "<td>"+data.psir_date+"</td>"+
                                    "<td>"+data.manifest_date+"</td>"+
                                    "<td>"+ppo_recommendation+"</td>"+
                                    "<td>"+data.transfer_date+"</td>"+
                                    "<td>"+data.transfer_to+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner_name + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f5_write btn btn-success btn-xs btn-acted-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f5_write btn btn-danger btn-xs btn-acted-delete form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });

                $(document).on('click', '.btn-attachment-rcv-modal2', function() {
                    var docketNo = $(this).data('docket');
                    var recordId = $(this).data('id');
                    var petitioner = $(this).data('petitioner');
                    var field_office_id = $(this).data('field_office_id');

                    // Set docketNo, petitioner, and field_office_id in the form's hidden fields for modal2
                    $('#docket_no2').val(docketNo);
                    $('#petitioner_name2').val(petitioner);
                    $('#FOId2').val(field_office_id);

                    // Populate the type select dropdown for modal2
                    $('#type2').empty().append(`
                        <option value="" disabled selected>Select Type</option>
                        <option value="Post-Sentence Investigation Report">Post-Sentence Investigation Report</option>
                        <option value="Manifestation">Manifestation</option>
                        <option value="Other Document/s">Other Document/s</option>
                    `);

                    // Remove any previous 'change' event and bind a new one to handle the select change for modal2
                    $(document).off('change', '#type2').on('change', '#type2', function() {
                        var selectedValue = $(this).val();

                        if (selectedValue === 'Other Document/s') {
                            $('.remarks-row2').show(); // Show the remarks field
                        } else {
                            $('.remarks-row2').hide(); // Hide the remarks field
                        }
                    });

                    // Open the Bootstrap modal for modal2
                    $('#attachmentModal2').modal('show');

                    // Call load_table function specific to modal2
                    load_table2("investigation", docketNo, field_office_id, "F5T2_RAU");
                });
                function tableColumns() {
                    return [
                        {
                            "data": null,
                            "render": function (data, type, row, meta) {
                                return meta.settings._iDisplayStart + meta.row + 1;
                            }
                        },
                        { "data": 'fileName' }, // Keep only file name
                        { "data": 'remarks' }, // Keep remarks column
                        {
                            "data": null,
                            "render": function (data, type, row, meta) {
                                let actions = `
                                    <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                        <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                            <i class='fa fa-eye'></i> View
                                        </button>
                                    </a>
                                    <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                        <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                            <i class='fa fa-download'></i> Download
                                        </button>
                                    </a>
                                    <button class='btn btn-danger btn-sm btn-delete' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-trash'></i> Delete
                                    </button>
                                `;

                                return actions;
                            }
                        }
                    ];
                }

                var dataTable = null; // Initialize DataTable globally

                function load_table2(type, uuid, officeId, kind) {
                    if (dataTable) {
                        dataTable.destroy();
                        $('.table_head2 tbody').empty(); // Clear table body to avoid duplicates
                    }

                    dataTable = $('.table_head2').DataTable({
                        "processing": false,
                        "serverSide": true,
                        "scrollX": true,
                        "searching": false,
                        "autoWidth": false,
                        "lengthMenu": [10, 25, 50, 100],
                        "pageLength": 10,
                        "ordering": false,
                        ajax: {
                            url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                            type: 'GET',
                            cache: true,
                            data: function (d) {
                                return { 
                                    page: d.start / d.length, // Pagination logic
                                    size: d.length           // Page size 
                                };
                            },
                            dataFilter: function (data) {
                                var json = jQuery.parseJSON(data);
                                json.recordsTotal = json.totalElements;
                                json.recordsFiltered = json.totalElements;
                                json.data = json.content;
                                return JSON.stringify(json);
                            }
                        },
                        columns: tableColumns() // Call function to get table columns
                    });
                    setTimeout(function () {
                        dataTable.columns.adjust().draw();
                    }, 100);
                }
                $('#uploadButton2').on('click', function(e) {
                    e.preventDefault(); // Prevent default form submission for modal2
                    $(this).prop('disabled', true).text('Uploading...');

                    var formData = new FormData();
                    formData.append('uuid', $('#docket_no2').val());
                    formData.append('createdby', $('#petitioner_name2').val());
                    formData.append('type', "investigation");
                    var type = $('#type2').val();
                    var remarks = $('#remarks2').val();
                    if (remarks) {
                        formData.append('remarks', type + " - " + remarks);
                    } else {
                        formData.append('remarks', type);
                    }
                    formData.append('officeId', $('#FOId2').val());
                    formData.append('version', "0");
                    var file = $('#fileupload2')[0].files[0];
                    if (!file) {
                        alert('Please select a file to upload.');
                        $('#uploadButton2').prop('disabled', false).text('Upload');
                        return; // Exit if no file is selected
                    }
                    formData.append('file', file);

                    var fileInput = $('#fileupload2')[0];
                    if (fileInput.files.length > 0) {
                        var fileName = fileInput.files[0].name;
                        formData.append('kind', "F5T2_RAU");
                    }

                    var url = `${PPIS_path_upload}/file/upload`;
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            console.log('Response:', response);
                                load_table2('investigation', $('#docket_no2').val(), $('#FOId2').val(), "F5T2_RAU");
                                $('#remarks2').val(''); // Clear the remarks textarea
                                $('#fileupload2').val(''); // Clear the file input
                            
                            $('#uploadButton2').prop('disabled', false).text('Upload');
                        },
                        error: function(xhr, status, error) {
                            console.error('Upload failed: ', error);
                            alert('An error occurred during the upload.');
                            $('#uploadButton2').prop('disabled', false).text('Upload');
                        }
                    });
                });
                            $(document).ready(function () {
                                var table = $('#T_F5T2_b').DataTable( {
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                            });

                            ___updateACTED_event();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __acted()
       
        var __not_acted_a = function(){
            console.log("received eventss")
            $('.F5T2_tbody_c1').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "disposed_decision" : "Recall"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_NOTACTED_ByYM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                if(result.status != undefined && result.status == "SUCCESS"){

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                           
                            result.payload.forEach(function(data){
                                data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $('.F5T2_tbody_c1').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner_name.toUpperCase()+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv-modal3 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner_name + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f5_write btn btn-success btn-xs btn-notacted-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f5_write btn btn-danger btn-xs btn-notacted-delete form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
            $(document).on('click', '.btn-attachment-rcv-modal3', function() {
                var docketNo = $(this).data('docket');
                var recordId = $(this).data('id');
                var petitioner = $(this).data('petitioner');
                var field_office_id = $(this).data('field_office_id');

                // Set docketNo, petitioner, and field_office_id in the form's hidden fields for modal3
                $('#docket_no3').val(docketNo);
                $('#petitioner_name3').val(petitioner);
                $('#FOId3').val(field_office_id);

                // Populate the type select dropdown for modal3
                $('#type3').empty().append(`
                    <option value="" disabled selected>Select Type</option>
                    <option value="Recall" selected>Recall</option>
                    <option value="Other Document/s">Other Document/s</option>
                `);

                // Remove any previous 'change' event and bind a new one to handle the select change for modal3
                $(document).off('change', '#type3').on('change', '#type3', function() {
                    var selectedValue = $(this).val();

                    if (selectedValue === 'Other Document/s') {
                        $('.remarks-row3').show(); // Show the remarks field
                    } else {
                        $('.remarks-row3').hide(); // Hide the remarks field
                    }
                });

                // Open the Bootstrap modal for modal3
                $('#attachmentModal3').modal('show');

                // Call load_table function specific to modal3
                load_table3("investigation", docketNo, field_office_id, "F5T2_recall");
            });

                function tableColumns() {
                    return [
                        {
                            "data": null,
                            "render": function (data, type, row, meta) {
                                return meta.settings._iDisplayStart + meta.row + 1;
                            }
                        },
                        { "data": 'fileName' }, // Keep only file name
                        { "data": 'remarks' }, // Keep remarks column
                        {
                            "data": null,
                            "render": function (data, type, row, meta) {
                                let actions = `
                                    <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                        <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                            <i class='fa fa-eye'></i> View
                                        </button>
                                    </a>
                                    <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                        <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                            <i class='fa fa-download'></i> Download
                                        </button>
                                    </a>
                                    <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-trash'></i> Delete
                                    </button>
                                `;

                                return actions;
                            }
                        }
                    ];
                }

                $(document).on('click', '.btn-delete-upload', deleteItem);
                var dataTable = null; // Initialize DataTable globally

                function load_table3(type, uuid, officeId, kind) {
                    if (dataTable) {
                        dataTable.destroy();
                        $('.table_head3 tbody').empty(); // Clear table body to avoid duplicates
                    }

                    dataTable = $('.table_head3').DataTable({
                        "processing": false,
                        "serverSide": true,
                        "scrollX": true,
                        "searching": false,
                        "autoWidth": false,
                        "lengthMenu": [10, 25, 50, 100],
                        "pageLength": 10,
                        "ordering": false,
                        ajax: {
                            url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                            type: 'GET',
                            cache: true,
                            data: function (d) {
                                return { 
                                    page: d.start / d.length, // Pagination logic
                                    size: d.length           // Page size 
                                };
                            },
                            dataFilter: function (data) {
                                var json = jQuery.parseJSON(data);
                                json.recordsTotal = json.totalElements;
                                json.recordsFiltered = json.totalElements;
                                json.data = json.content;
                                return JSON.stringify(json);
                            }
                        },
                        columns: tableColumns() // Call function to get table columns
                    });
                    setTimeout(function () {
                        dataTable.columns.adjust().draw();
                    }, 100);
                }
            $('#uploadButton3').on('click', function(e) {
                e.preventDefault(); // Prevent default form submission for modal3
                $(this).prop('disabled', true).text('Uploading...');

                var formData = new FormData();
                formData.append('uuid', $('#docket_no3').val());
                formData.append('createdby', $('#petitioner_name3').val());
                formData.append('type', "investigation");
                var type = $('#type3').val();
                var remarks = $('#remarks3').val();
                if (remarks) {
                    formData.append('remarks', type + " - " + remarks);
                } else {
                    formData.append('remarks', type);
                }
                formData.append('officeId', $('#FOId3').val());
                formData.append('version', "0");
                var file = $('#fileupload3')[0].files[0];
                if (!file) {
                    alert('Please select a file to upload.');
                    $('#uploadButton3').prop('disabled', false).text('Upload');
                    return; // Exit if no file is selected
                }
                formData.append('file', file);

                var fileInput = $('#fileupload3')[0];
                if (fileInput.files.length > 0) {
                    var fileName = fileInput.files[0].name;
                    formData.append('kind', "F5T2_recall");
                }

                var url = `${PPIS_path_upload}/file/upload`;
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Response:', response);
                            load_table3('investigation', $('#docket_no3').val(), $('#FOId3').val(), "F5T2_recall");
                            $('#remarks3').val(''); // Clear the remarks textarea
                            $('#fileupload3').val(''); // Clear the file input
                        
                        $('#uploadButton3').prop('disabled', false).text('Upload');
                    },
                    error: function(xhr, status, error) {
                        console.error('Upload failed: ', error);
                        alert('An error occurred during the upload.');
                        $('#uploadButton3').prop('disabled', false).text('Upload');
                    }
                });
            });
                            $(document).ready(function () {
                                var table = $('#T_F5T2_c1').DataTable( {
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                            });
                            
                            ___updateNOTACTED_event();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __not_acted_a()

        var __not_acted_b = function(){
            console.log("received eventss")
            $('.F5T2_tbody_c2').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "disposed_decision" : "Warrant of Arrest"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_NOTACTED_ByYM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                if(result.status != undefined && result.status == "SUCCESS"){

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                           
                            result.payload.forEach(function(data){
                                data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $('.F5T2_tbody_c2').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner_name.toUpperCase()+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv-modal4 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner_name + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f5_write btn btn-success btn-xs btn-notacted-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f5_write btn btn-danger btn-xs btn-notacted-delete form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                $(document).on('click', '.btn-attachment-rcv-modal4', function() {
                    var docketNo = $(this).data('docket');
                    var recordId = $(this).data('id');
                    var petitioner = $(this).data('petitioner');
                    var field_office_id = $(this).data('field_office_id');

                    // Set docketNo, petitioner, and field_office_id in the form's hidden fields for modal4
                    $('#docket_no4').val(docketNo);
                    $('#petitioner_name4').val(petitioner);
                    $('#FOId4').val(field_office_id);

                    // Populate the type select dropdown for modal4
                    $('#type4').empty().append(`
                        <option value="" disabled selected>Select Type</option>
                        <option value="Warrant" selected>Warrant</option>
                        <option value="Other Document/s">Other Document/s</option>
                    `);

                    // Remove any previous 'change' event and bind a new one to handle the select change for modal4
                    $(document).off('change', '#type4').on('change', '#type4', function() {
                        var selectedValue = $(this).val();

                        if (selectedValue === 'Other Document/s') {
                            $('.remarks-row4').show(); // Show the remarks field
                        } else {
                            $('.remarks-row4').hide(); // Hide the remarks field
                        }
                    });

                    // Open the Bootstrap modal for modal4
                    $('#attachmentModal4').modal('show');

                    // Call load_table function specific to modal4
                    load_table4("investigation", docketNo, field_office_id, "F5T2_warant");
                });


                function tableColumns() {
                    return [
                        {
                            "data": null,
                            "render": function (data, type, row, meta) {
                                return meta.settings._iDisplayStart + meta.row + 1;
                            }
                        },
                        { "data": 'fileName' }, // Keep only file name
                        { "data": 'remarks' }, // Keep remarks column
                        {
                            "data": null,
                            "render": function (data, type, row, meta) {
                                let actions = `
                                    <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                        <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                            <i class='fa fa-eye'></i> View
                                        </button>
                                    </a>
                                    <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                        <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                            <i class='fa fa-download'></i> Download
                                        </button>
                                    </a>
                                    <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-trash'></i> Delete
                                    </button>
                                `;

                                return actions;
                            }
                        }
                    ];
                }
                $(document).on('click', '.btn-delete-upload', deleteItem);

                var dataTable = null; // Initialize DataTable globally

                function load_table4(type, uuid, officeId, kind) {
                    if (dataTable) {
                        dataTable.destroy();
                        $('.table_head4 tbody').empty(); // Clear table body to avoid duplicates
                    }

                    dataTable = $('.table_head4').DataTable({
                        "processing": false,
                        "serverSide": true,
                        "scrollX": true,
                        "searching": false,
                        "autoWidth": false,
                        "lengthMenu": [10, 25, 50, 100],
                        "pageLength": 10,
                        "ordering": false,
                        ajax: {
                            url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                            type: 'GET',
                            cache: true,
                            data: function (d) {
                                return { 
                                    page: d.start / d.length, // Pagination logic
                                    size: d.length           // Page size 
                                };
                            },
                            dataFilter: function (data) {
                                var json = jQuery.parseJSON(data);
                                json.recordsTotal = json.totalElements;
                                json.recordsFiltered = json.totalElements;
                                json.data = json.content;
                                return JSON.stringify(json);
                            }
                        },
                        columns: tableColumns() // Call function to get table columns
                    });
                    setTimeout(function () {
                        dataTable.columns.adjust().draw();
                    }, 100);
                }
                $('#uploadButton4').on('click', function(e) {
                    e.preventDefault(); // Prevent default form submission for modal4
                    $(this).prop('disabled', true).text('Uploading...');

                    var formData = new FormData();
                    formData.append('uuid', $('#docket_no4').val());
                    formData.append('createdby', $('#petitioner_name4').val());
                    formData.append('type', "investigation");
                    var type = $('#type4').val();
                    var remarks = $('#remarks4').val();
                    if (remarks) {
                        formData.append('remarks', type + " - " + remarks);
                    } else {
                        formData.append('remarks', type);
                    }
                    formData.append('officeId', $('#FOId4').val());
                    formData.append('version', "0");
                    var file = $('#fileupload4')[0].files[0];
                    if (!file) {
                        alert('Please select a file to upload.');
                        $('#uploadButton4').prop('disabled', false).text('Upload');
                        return; // Exit if no file is selected
                    }
                    formData.append('file', file);

                    var fileInput = $('#fileupload4')[0];
                    if (fileInput.files.length > 0) {
                        var fileName = fileInput.files[0].name;
                        formData.append('kind', "F5T2_warant");
                    }

                    var url = `${PPIS_path_upload}/file/upload`;
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            console.log('Response:', response);

                            // Reload the table for modal4 after successful upload
                            load_table4('investigation', $('#docket_no4').val(), $('#FOId4').val(), "F5T2_warant");

                            // Clear the form fields after upload
                            $('#remarks4').val(''); // Clear the remarks textarea
                            $('#fileupload4').val(''); // Clear the file input

                            // Reset the button state
                            $('#uploadButton4').prop('disabled', false).text('Upload');
                        },
                        error: function(xhr, status, error) {
                            console.error('Upload failed: ', error);
                            alert('An error occurred during the upload.');

                            // Reset the button state
                            $('#uploadButton4').prop('disabled', false).text('Upload');
                        }
                    });
                });


                            $(document).ready(function () {
                                var table = $('#T_F5T2_c2').DataTable( {
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                            });

                            ___updateNOTACTED_event();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __not_acted_b()

        var __download_print_list = function(){

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field')

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_RCV_ByYM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                __counter += 1;
                if(result.status != undefined && result.status == "SUCCESS"){

                    if(result.payload.length > __maxTableSize){
                        __maxTableSize = result.payload.length
                        // console.log(__maxTableSize);
                    }
                    
                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                            r = 1;
                            result.payload.forEach(function(data){
                               data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                //console.log(data);
                                $("#r"+r+"c1").html(data.docket_no.toUpperCase());
                                $("#r"+r+"c2").html(data.petitioner_name.toUpperCase());
                                $("#r"+r+"c3").html(data.plea_bargain);
                                $("#r"+r+"c4").html(data.case_no);
                                $("#r"+r+"c5").html(data.court_origin);
                                $("#r"+r+"c6").html(data.offense);
                                $("#r"+r+"c7").html(data.sentence);
                                $("#r"+r+"c8").html(data.date_of_court_order);
                                $("#r"+r+"c9").html(data.received_date);
                                $("#r"+r+"c10").html(data.investigating_officer_name);
                                $("#r"+r+"c11").html(data.field_office).addClass("options");
                                $("#r"+r+"c12").html(source).addClass("options");
                                $("#r"+r+"c13").html("").addClass("options");
                                r += 1;
                            });


                            ___updateRCV_event();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);

                    
                }
                ___checker();
            });    

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field')
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_ACTED_ByYM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                __counter += 1;
                if(result.status != undefined && result.status == "SUCCESS"){
                    if(result.payload.length > __maxTableSize){
                        __maxTableSize = result.payload.length
                        // console.log(__maxTableSize);
                    }
                   
                    function checkPendingRequest() {
                        if ($.active > 0) {
                            //console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                            r = 1
                            result.payload.forEach(function(data){
                               data = $.wms.upper($.wms.sanitize(data))
                                //console.log(data);
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                ppo_recommendation = (data.ppo_recommendation == "PSIR - FOR GRANTED" ? "PSIR - FOR GRANT" : data.ppo_recommendation)
                                $("#r"+r+"c14").html("("+data.docket_no.toUpperCase()+") "+data.petitioner_name.toUpperCase());
                                
                                $("#r"+r+"c15").html(data.psir_date);
                                $("#r"+r+"c16").html(data.manifest_date);
                                $("#r"+r+"c17").html(ppo_recommendation);
                                $("#r"+r+"c18").html(data.transfer_date);
                                $("#r"+r+"c19").html(data.transfer_to);
                                $("#r"+r+"c20").html(data.field_office).addClass("options");
                                $("#r"+r+"c21").html(source).addClass("options");
                                $("#r"+r+"c22").html("").addClass("options");
                                r += 1;
                            });

                            ___updateACTED_event();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
                ___checker();
            });

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "disposed_decision" : "Recall"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_NOTACTED_ByYM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                __counter += 1;
                if(result.status != undefined && result.status == "SUCCESS"){
                    if(result.payload.length > __maxTableSize){
                        __maxTableSize = result.payload.length
                        // console.log(__maxTableSize);
                    }

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                            r = 1
                            result.payload.forEach(function(data){
                               data = $.wms.upper($.wms.sanitize(data))
                                // console.log(data);
                               
                                $("#r"+r+"c23").html("("+data.docket_no.toUpperCase()+") "+data.petitioner_name.toUpperCase());
                                $("#r"+r+"c24").html(data.received_date);
                                $("#r"+r+"c25").html(data.field_office).addClass("options");
                                $("#r"+r+"c26").html(source).addClass("options");
                                $("#r"+r+"c27").html("").addClass("options");
                                
                                r += 1;
                            });

                            ___updateNOTACTED_event();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
                ___checker();
            });   


            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "disposed_decision" : "Warrant of Arrest"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_NOTACTED_ByYM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                __counter += 1;
                if(result.status != undefined && result.status == "SUCCESS"){
                    if(result.payload.length > __maxTableSize){
                        __maxTableSize = result.payload.length
                        // console.log(__maxTableSize);
                    }

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                            r = 1
                            result.payload.forEach(function(data){
                               
                                // console.log(data);
                               data = $.wms.upper($.wms.sanitize(data))
                                
                                $("#r"+r+"c28").html("("+data.docket_no.toUpperCase()+") "+data.petitioner_name.toUpperCase());
                                $("#r"+r+"c29").html(data.received_date);
                                $("#r"+r+"c30").html(data.field_office).addClass("options");
                                $("#r"+r+"c31").html(source).addClass("options");
                                $("#r"+r+"c32").html("").addClass("options");
                                
                                r += 1;
                            });

                            ___updateNOTACTED_event();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
                ___checker();
            }); 
        }
        __download_print_list();

        var ___checker = function(){
            if(__counter == 4){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F5T2_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F5T2_tbody").append(
                            "<tr>"+
                                "<td id='r"+i+"c1' class=''>"+
                                "<td id='r"+i+"c2' class=''>"+
                                "<td id='r"+i+"c3' class=''>"+
                                "<td id='r"+i+"c4' class=''>"+
                                "<td id='r"+i+"c5' class=''>"+
                                "<td id='r"+i+"c6' class=''>"+
                                "<td id='r"+i+"c7' class=''>"+
                                "<td id='r"+i+"c8' class='options'>"+
                                "<td id='r"+i+"c9' class=''>"+
                                "<td id='r"+i+"c10' >"+
                                "<td id='r"+i+"c11' class='options'>"+
                                "<td id='r"+i+"c12' class='options'>"+
                                "<td id='r"+i+"c13' class='options'>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class=''>"+
                                "<td id='r"+i+"c16' class=''>"+
                                "<td id='r"+i+"c17' class=''>"+
                                "<td id='r"+i+"c18' class=''>"+
                                "<td id='r"+i+"c19' >"+
                                "<td id='r"+i+"c20' class='options'>"+
                                "<td id='r"+i+"c21' class='options'>"+
                                "<td id='r"+i+"c22' class='options'>"+
                                "<td id='r"+i+"c23' class=''>"+
                                "<td id='r"+i+"c24' >"+
                                "<td id='r"+i+"c25' class='options'>"+
                                "<td id='r"+i+"c26' class='options'>"+
                                "<td id='r"+i+"c27' class='options'>"+
                                "<td id='r"+i+"c28' class=''>"+
                                "<td id='r"+i+"c29' class=''>"+
                                "<td id='r"+i+"c30' class='options'>"+
                                "<td id='r"+i+"c31' class='options'>"+
                                "<td id='r"+i+"c32' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F5T2_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='20' class='center b'>NONE</td>"+
                    //         "</tr>");
                }
            }
        }

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            ////$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }
        //Add RCV
        $(".addSubmitRCVButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPI', 'PI', 'JRPI', 'RPI', 'JTPI', 'TPI' ];
            var requiredField= [ 'add_rcv_petitioner', 'add_date_rcv', 'add_rcv_date_of_court_order','add_rcv_date_rcv'];
            var check = true
            var checkTable = ['F5T1', 'F5T2_RCV']


            ___validateSaveCarryOver(allowedDocket,$("#add_rcv_docket_no"),requiredField,check,checkTable).done(function(result){
                console.log(result)
                if(result){
                    selected_month = $("#add_rcv_date_rcv").val()
                    var selected_month = selected_month.substring(0, 7);
                    current_month = $("#filter_date").val();
                    /*if(selected_month != current_month){
                        alert("Invalid Entry:. Encode or place the entries to the corresponding month the cases are received")
                    }else{*/
                        $(".modal-form input").attr("disabled",true);
                        $(".modal-form select").attr("disabled",true);
                        $(".addSubmitRCVButton").addClass("hidden");
                        $(".confirmAdd").removeClass("hidden")
                        $(".addProceedRCVButton").removeClass("hidden")
                    /*}*/
                }else{

                }
            });
        });
        $(".addCancelRCVButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitRCVButton").removeClass("hidden")
            $(".addProceedRCVButton").addClass("hidden")
        });

        $(".addProceedRCVButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_rcv_docket_no").val(),
                "petitioner_name": $("#add_rcv_petitioner").val(),
                "case_no": $("#add_rcv_case_no").val(),
                "plea_bargain": $("#add_rcv_plea_bargain").val(),
                "court_origin": $("#add_rcv_court_origin").val(),
                "offense": $("#add_rcv_offense").val(),
                "sentence" : $("#add_rcv_sentence").val(),
                "date_of_court_order": $("#add_rcv_date_of_court_order").val(),
                "received_date": $("#add_rcv_date_rcv").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "investigating_officer_name": $("#add_rcv_investigating_officer").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "created_by" : $.cookie("USER_ID")
            }
            console.log(payload);
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertF5T2_RCV',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                ___modalReset();
               
                $(".addSubmitRCVButton").removeClass("hidden")
                $(".addProceedRCVButton").addClass("hidden")
                $("#modal-add-rcv").modal('toggle')
                
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T2PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });

            var PPISPayload = {
                    "clientType"            : "PROBATIONER",
                    "docketNumber"          : $("#add_rcv_docket_no").val(),
                    "fullName"              : $("#add_rcv_petitioner").val(),
                    "receivedDateByPPO"     : $("#add_rcv_date_rcv").val(),
                    "fieldOfficeId"         : $.wms.urlParam('officeId'),
                    "investigatingOfficer"  : $("#add_rcv_investigating_officer").val(),
                    "firstName"             : null,
                    "middleName"            : null,
                    "lastName"              : null,
                    "suffixName"            : null,
                    "manualDocket"          : false,
                    "criminalCaseNo"        : $("#add_rcv_case_no").val(),
                    "criminalCaseNumber"    : $("#add_rcv_case_no").val(),
                    "pleaBargain"           : $("#add_rcv_plea_bargain").val(), // string to sa cmis
                    "courtOfOrigin"         : $("#add_rcv_court_origin").val(),
                    "offense"               : $("#add_rcv_offense").val(),
                    "sentence"              : $("#add_rcv_sentence").val(),
                    "courtOrderDate"        : $("#add_rcv_date_of_court_order").val(),
                    "type"                  : "PIS_INV",
                }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        })

        //Add ACTED
        $(".addSubmitACTEDButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPI', 'PI', 'JRPI', 'RPI', 'JTPI', 'TPI' ];
            var requiredField= [ 'add_acted_petitioner'];
            var check = true
            var checkTable = ['F5T1', 'F5T2_RCV']

            ___validateSave(allowedDocket,$("#add_acted_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".addSubmitACTEDButton").addClass("hidden");
                $(".confirmAdd").removeClass("hidden")
                $(".addProceedACTEDButton").removeClass("hidden")
                }
            });
        });

        $(".addCancelACTEDButton").unbind("click").on("click",function(){
            ___modalReset();
           
            $(".addSubmitACTEDButton").removeClass("hidden")
            $(".addProceedACTEDButton").addClass("hidden")
           
        });

         $(".addProceedACTEDButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_acted_docket_no").val(),
                "petitioner_name": $("#add_acted_petitioner").val(),
                "psir_date": $("#add_acted_psir").val(),
                "manifest_date": $("#add_acted_manifest").val(),
                "received_date": $("#add_acted_date_rcv").val(),
                "transfer_date": $("#add_acted_transfer_date").val(),
                "transfer_to": $("#add_acted_transfer_to").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "ppo_recommendation" : $("#add_acted_recommendation").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "created_by" : $.cookie("USER_ID")
            }
            console.log(payload);
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertF5T2_ACTED',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                ___modalReset();

                $(".addSubmitACTEDButton").removeClass("hidden")
                $(".addProceedACTEDButton").addClass("hidden")
                $("#modal-add-acted").modal('toggle')
                
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T2PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });

            var PPISPayload = {
                    "clientType"            : "PROBATIONER",
                    "docketNumber"          : $("#add_acted_docket_no").val(),
                    "fullName"              : $("#add_acted_petitioner").val(),
                    "firstName"             : null,
                    "middleName"            : null,
                    "lastName"              : null,
                    "suffixName"            : null,
                    "receivedDateByPPO"     : $("#add_acted_date_rcv").val(),
                    "fieldOfficeId"         : $.wms.urlParam('officeId'),
                    "manualDocket"          : false,
                    "ppoRecommendation"     : $("#add_acted_recommendation").val(),
                    "type"                  : "PIS_INV",
                }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        });

         //Add NOT ACTED
        $(".addSubmitNOTACTEDButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPI', 'PI', 'JRPI', 'RPI', 'JTPI', 'TPI' ];
            var requiredField= [ 'add_notacted_petitioner', 'add_notacted_date'];
            var check = true
            var checkTable = ['F5T1', 'F5T2_RCV']

            ___validateSave(allowedDocket,$("#add_notacted_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitNOTACTEDButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedNOTACTEDButton").removeClass("hidden")
                    $(".addProceedNOTACTEDButton").attr('disabled',false)
                }
            })
        });

        $(".addCancelNOTACTEDButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitNOTACTEDButton").removeClass("hidden")
            $(".addProceedNOTACTEDButton").addClass("hidden")
           
        });

        $(".addProceedNOTACTEDButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_notacted_docket_no").val(),
                "petitioner_name": $("#add_notacted_petitioner").val(),
                "received_date": $("#add_notacted_date").val(),
                "disposed_decision" : $("#add_notacted_decision").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "created_by" : $.cookie("USER_ID")
            }
            console.log(payload);
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertF5T2_NOTACTED',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                ___modalReset();
                $(".addSubmitNOTACTEDButton").removeClass("hidden")
                $(".addProceedNOTACTEDButton").addClass("hidden")
                $("#modal-add-notacted").modal('toggle')
                
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T2PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload = {
                    "clientType"            : "PROBATIONER",
                    "docketNumber"          : $("#add_notacted_docket_no").val(),
                    "fullName"              : $("#add_notacted_petitioner").val(),
                    "firstName"             : null,
                    "middleName"            : null,
                    "lastName"              : null,
                    "suffixName"            : null,
                    "receivedDateByPPO"     : $("#add_notacted_date").val(),
                    // "type"                  : $("#add_notacted_decision").val(),
                    "fieldOfficeId"         : $.wms.urlParam('officeId'),
                    "manualDocket"          : false,
                    "type"                  : "PIS_INV",
                }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        });

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            $("#T_F5T2").clone().table2excel({
                // Exclude CSS class
                exclude: ".options",
                name: "Form5-Table2",
                filename: "Form5-Table2.xls", //do not include extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table2" // Custom sheet name
            });
        });

            $("#sel_please").unbind("change").on("change",function(){
              console.log($(this).val())
              if($(this).val() == "Yes"){
                $("#plea-classification").removeClass("hidden")
              }else{
                $("#plea-classification").addClass("hidden")
              }
            });


            $("#edit_sel_please").unbind("change").on("change",function(){
              console.log($(this).val())
              if($(this).val() == "Yes"){
                $("#edit_plea-classification").removeClass("hidden")
              }else{
                $("#edit_plea-classification").addClass("hidden")
                $("#edit_rcv_plea_bargain").val("")
              }
            });
              
            


        var ___updateRCV_event = function(){
            $(".btn-rcv-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-rcv-delete").modal();


                var payload = {
                    "checkTable" : ['F5T2_ACTED','F5T2_NOTACTED'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteRCVProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteRCVProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteRCVProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "method" : "update",
                    "created_by" : $.cookie("USER_ID")
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/updateF5T2_RCV',JSON.stringify(payload)).done(function (result) {
                    $("#modal-rcv-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteRCVProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T2PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })


            $(".btn-rcv-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id")
                console.log(data_id);
                $("#modal-edit-rcv").modal('toggle')
                $(".modal-form").addClass('hidden')
                $(".modal-loader2").removeClass('hidden')
                var payload = {
                    "ID" : data_id
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_RCV_ByID',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_rcv_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_rcv_id").val(payload.id)
                        $("#edit_rcv_petitioner").val(payload.petitioner_name)
                        $("#edit_rcv_case_no").val(payload.case_no)
                        if(payload.plea_bargain != "" && payload.plea_bargain != null){
                            $("#edit_sel_please").val("Yes").trigger("change")
                            $("#edit_rcv_plea_bargain").val(payload.plea_bargain).trigger("change")
                            $("#edit_plea-classification").removeClass("hidden")
                        }
                        $("#edit_rcv_court_origin").val(payload.court_origin)
                        $("#edit_rcv_offense").val(payload.offense)
                        $("#edit_rcv_sentence").val(payload.sentence)
                        $("#edit_rcv_date_of_court_order").val(payload.date_of_court_order)
                        $("#edit_rcv_date_rcv").val(payload.received_date)
                        $("#edit_rcv_field_office").val(payload.field_office).trigger("change");
                        $("#edit_rcv_investigating_officer").val(payload.investigating_officer_name)
                        $("#edit_rcv_Y_M").val(payload.Y_M).attr("disabled",true)
                    
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            })

            $(".editSubmitRCVButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editSubmitRCVButton").addClass("hidden");
                $(".confirmEdit").removeClass("hidden")
                $(".editProceedRCVButton").removeClass("hidden")
            });

            $(".editCancelRCVButton").unbind("click").on("click",function(){
                ___modalReset();
                $(".editSubmitRCVButton").removeClass("hidden")
                $(".editProceedRCVButton").addClass("hidden")
            }); 

            $(".editProceedRCVButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
               
                
                $("#modal-edit-rcv").modal("toggle");
                var payload = { 
                    "id" : $("#edit_rcv_id").val(),
                    "docket_no" : $("#edit_rcv_docket_no").val(),
                    "petitioner_name": $("#edit_rcv_petitioner").val(),
                    "case_no" : $("#edit_rcv_case_no").val(),
                    "plea_bargain" : $("#edit_rcv_plea_bargain").val(),
                    "court_origin" : $("#edit_rcv_court_origin").val(),
                    "offense" : $("#edit_rcv_offense").val(),
                    "sentence" : $("#edit_rcv_sentence").val(),
                    "date_of_court_order" : $("#edit_rcv_date_of_court_order").val(),
                    "received_date" : $("#edit_rcv_date_rcv").val(),
                    "investigating_officer_name" : $("#edit_rcv_investigating_officer").val(),
                    "Y_M" : $("#edit_rcv_Y_M").val(),
                    "field_office":$.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "created_by" : $.cookie("USER_ID")
                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/updateF5T2_RCV',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedRCVButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                     ___modalReset();
                    $(".editSubmitRCVButton").removeClass("hidden")
                    $(".editProceedRCVButton").addClass("hidden")
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T2PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }


        //ACTED EVENTS
        var ___updateACTED_event = function(){
            $(".btn-acted-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-acted-delete").modal();
                $(".err_msg").remove()
            });

            //Delete
            $(".deleteACTEDProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "method" : "update",
                    "created_by" : $.cookie("USER_ID")
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/updateF5T2_ACTED',JSON.stringify(payload)).done(function (result) {
                    $("#modal-acted-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteACTEDProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T2PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })


            $(".btn-acted-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id")
                console.log(data_id);
                $("#modal-edit-acted").modal('toggle')
                $(".modal-form").addClass('hidden')
                $(".modal-loader2").removeClass('hidden')
                var payload = {
                    "ID" : data_id
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_ACTED_ByID',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_acted_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_acted_id").val(payload.id)
                        $("#edit_acted_petitioner").val(payload.petitioner_name)
                        $("#edit_acted_psir").val(payload.psir_date)
                        $("#edit_acted_manifest").val(payload.manifest_date)
                        $("#edit_acted_recommendation").val(payload.ppo_recommendation).trigger("change")
                        $("#edit_acted_transfer_date").val(payload.transfer_date)
                        $("#edit_acted_transfer_to").val(payload.transfer_to)
                        $("#edit_acted_field_office").val(payload.field_office).trigger("change")
                        $("#edit_acted_investigating_officer").val(payload.investigating_officer_name)
                        $("#edit_acted_Y_M").val(payload.Y_M).attr("disabled",true)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            })

            $(".editSubmitACTEDButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editSubmitACTEDButton").addClass("hidden");
                $(".confirmEdit").removeClass("hidden")
                $(".editProceedACTEDButton").removeClass("hidden")
            });

            $(".editCancelACTEDButton").unbind("click").on("click",function(){
                ___modalReset();
                $(".editSubmitACTEDButton").removeClass("hidden")
                $(".editProceedACTEDButton").addClass("hidden")
            }); 

            $(".editProceedACTEDButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
               
                
                $("#modal-edit-acted").modal("toggle");
                var payload = { 
                    "id" : $("#edit_acted_id").val(),
                    "docket_no" : $("#edit_acted_docket_no").val(),
                    "petitioner_name": $("#edit_acted_petitioner").val(),
                    "psir_date" : $("#edit_acted_psir").val(),
                    "manifest_date" : $("#edit_acted_manifest").val(),
                    "ppo_recommendation" : $("#edit_acted_recommendation").val(),
                    "transfer_date" :  $("#edit_acted_transfer_date").val(),
                    "transfer_to" : $("#edit_acted_transfer_to").val(),
                    "Y_M" : $("#edit_acted_Y_M").val(),
                    "field_office": $.wms.urlParam('field'),
                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/updateF5T2_ACTED',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedACTEDButton").attr('disabled',false)
                     ___modalReset();
                    $(".editSubmitACTEDButton").removeClass("hidden")
                    $(".editProceedACTEDButton").addClass("hidden")
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T2PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }


        //NOTACTED EVENTS
        var ___updateNOTACTED_event = function(){
            $(".btn-notacted-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-notacted-delete").modal();
            });    

            //Delete
            $(".deleteNOTACTEDProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "method" : "update",
                    "created_by" : $.cookie("USER_ID"),
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/updateF5T2_NOTACTED',JSON.stringify(payload)).done(function (result) {
                    $("#modal-notacted-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteNOTACTEDProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T2PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })


            $(".btn-notacted-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id")
                console.log(data_id);
                $("#modal-edit-notacted").modal('toggle')
                $(".modal-form").addClass('hidden')
                $(".modal-loader2").removeClass('hidden')
                var payload = {
                    "ID" : data_id
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/fetchF5T2_NOTACTED_ByID',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_notacted_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_notacted_id").val(payload.id)
                        $("#edit_notacted_petitioner").val(payload.petitioner_name)
                        $("#edit_notacted_decision").val(payload.disposed_decision).trigger("change");
                        $("#edit_notacted_date").val(payload.received_date)
                        $("#edit_notacted_field_office").val(payload.field_office).trigger("change")
                        $("#edit_notacted_investigating_officer").val(payload.investigating_officer_name)
                        $("#edit_notacted_Y_M").val(payload.Y_M).attr("disabled",true)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            })

            $(".editSubmitNOTACTEDButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editSubmitNOTACTEDButton").addClass("hidden");
                $(".confirmEdit").removeClass("hidden")
                $(".editProceedNOTACTEDButton").removeClass("hidden")
            });

            $(".editCancelNOTACTEDButton").unbind("click").on("click",function(){
                ___modalReset();
                $(".editSubmitNOTACTEDButton").removeClass("hidden")
                $(".editProceedNOTACTEDButton").addClass("hidden")
            }); 

            $(".editProceedNOTACTEDButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
               
                
                $("#modal-edit-notacted").modal("toggle");
                var payload = { 
                    "id" : $("#edit_notacted_id").val(),
                    "docket_no" : $("#edit_notacted_docket_no").val(),
                    "petitioner_name": $("#edit_notacted_petitioner").val(),
                    "disposed_decision" : $("#edit_notacted_decision").val(),
                    "received_date" : $("#edit_notacted_date").val(),
                    "Y_M" : $("#edit_notacted_Y_M").val(),
                    "field_office": $.wms.urlParam('field'),
                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/updateF5T2_NOTACTED',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedNOTACTEDButton").attr('disabled',false)
                     ___modalReset();
                    $(".editSubmitNOTACTEDButton").removeClass("hidden")
                    $(".editProceedNOTACTEDButton").addClass("hidden")
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T2PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }

    };

    var __attachF5T3PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T3_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T3',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                    data = $.wms.sanitize(data);
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F5T3_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.petitioner.toUpperCase()+"</td>"+
                        "<td>"+(data.psir_rec == "PSIR - For Granted" ? data.psir_date : "")+"</td>"+
                        "<td>"+(data.psir_rec == "PSIR - For Denial" ? data.psir_date : "")+"</td>"+
                        "<td>"+data.manifest+"</td>"+
                        "<td>"+data.investigating_officer.toUpperCase()+"</td>"+
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td width='15%' align='center' class='options'> <button class='access_f5_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+ 
                        "<button class='access_f5_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });
                ___tableControls();
            }else{
                // $(".F5T3_tbody").append(
                //         "<tr>"+
                //             "<td colspan='9' class='center b'>NONE</td>"+
                //         "</tr>");
            }

            $(document).ready(function () {
                var table = $('#T_F5T3').DataTable( {
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
            });
        });


        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });

            var table = $('#T_F5T3').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T3").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T3 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table3",
                filename: "Form5-Table3.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table3" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPI', 'PI', 'JRPI', 'RPI', 'JTPI', 'TPI' ];
            var requiredField= [ 'add_petitioner', 'add_investigating_officer'];
            var check = true
            var checkTable = ['F5T3', 'F5T2_ACTED']

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
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "petitioner": $("#add_petitioner").val(),
                "psir_date": $("#add_psir").val(),
                "psir_rec": $("#add_psir_rec").val(),
                "investigating_officer": $("#add_investigating_officer").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office" : $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T3',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T3PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T3',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T3PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T3',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_petitioner").val(payload.petitioner)
                        $("#edit_manifestation").val(payload.manifest)
                        $("#edit_psir_rec").val(payload.psir_rec).trigger("change")
                        $("#edit_psir").val(payload.psir_date)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_investigating_officer").val(payload.investigating_officer)
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "petitioner": $("#edit_petitioner").val(),
                    "manifest": $("#edit_manifestation").val(),
                    "psir_rec": $("#edit_psir_rec").val(),
                    "psir_date": $("#edit_psir").val(),
                    "field_office": $.wms.urlParam('field'),
                    "investigating_officer": $("#edit_investigating_officer").val(),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T3',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T3PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

    };

    var __attachF5T4PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T4_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T4',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                    data = $.wms.sanitize(data);
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F5T4_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.petitioner.toUpperCase()+"</td>"+
                        "<td>"+(data.disposed_decision == "Granted" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "Denied" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "Dismissed" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "Withdrawal" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "Reinvestigation" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "Others" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "Warrant of Arrest" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "Recall" ? data.disposed_date : "")+"</td>"+
                        "<td class=' center'>"+data.reason_denial+"</td>"+
                        "<td class=' center'>"+data.other_types+"</td>"+
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td align='center' class='options'>" + 
                        "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                        "<button class='access_f5_write btn btn-success btn-xs btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> </button> " +
                        "<button class='access_f5_write btn btn-danger btn-xs btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> </button> </td></tr>")
                });
                ___tableControls();
            }else{
            }

            $(document).on('click', '.btn-attachment-rcv', function() {
                var docketNo = $(this).data('docket');
                var recordId = $(this).data('id');
                var petitioner = $(this).data('petitioner');
                var field_office_id = $(this).data('field_office_id');
                console.log(petitioner)
                console.log(field_office_id)

                // Set docketNo, petitioner, and field_office_id in the form's hidden fields
                $('#docket_no').val(docketNo);
                $('#petitioner_name').val(petitioner);
                $('#FOId').val(field_office_id);

                // Populate the type select dropdown
                $('#type').empty().append(`
                    <option value="" disabled selected>Select Type</option>
                    <option value="Probation Order">Probation Order</option>
                    <option value="Order of Denial">Order of Denial</option>
                    <option value="Order to Withdraw Application for Probation">Order to Withdraw Application for Probation</option>
                    <option value="Other Document/s">Other Document/s</option>
                `);
                
                // Remove any previous 'change' event and bind a new one to handle the select change
                $(document).off('change', '#type').on('change', '#type', function() {
                    var selectedValue = $(this).val();
                    
                    if (selectedValue === 'Other Document/s') {
                        $('.remarks-row').show(); // Show the remarks field
                    } else {
                        $('.remarks-row').hide(); // Hide the remarks field
                    }
                });

                // Open the Bootstrap modal
                $('#attachmentModal').modal('show');

                // Call load_table function
                load_table("investigation", docketNo, field_office_id, "F5T4RR");
            });

            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' }, // Keep only file name
                    { "data": 'remarks' }, // Keep remarks column
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            let actions = `
                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-trash'></i> Delete
                                </button>
                            `;

                            return actions;
                        }
                    }
                ];
            }
            $(document).on('click', '.btn-delete-upload', deleteItem);

            var dataTable = null; // Initialize DataTable globally

            function load_table(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head tbody').empty(); // Clear table body to avoid duplicates
                }

                dataTable = $('.table_head').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": false,
                    "autoWidth": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "ordering": false,
                    ajax: {
                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return { 
                                page: d.start / d.length, // Pagination logic
                                size: d.length           // Page size 
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call function to get table columns
                });
                setTimeout(function () {
                    dataTable.columns.adjust().draw();
                }, 100);
            }
            $('#uploadButton').on('click', function(e) {
                e.preventDefault(); // Prevent default form submission
                $(this).prop('disabled', true).text('Uploading...');
                // Create FormData object
                var formData = new FormData();
                formData.append('uuid', $('#docket_no').val());
                formData.append('createdby', $('#petitioner_name').val());
                formData.append('type', "investigation");
                var type = $('#type').val();
                var remarks = $('#remarks').val();
                if (remarks) {
                    formData.append('remarks', type + " - " + remarks);
                } else {
                    formData.append('remarks', type);
                }
                formData.append('officeId', $('#FOId').val());
                formData.append('version', "0");
                var file = $('#fileupload')[0].files[0];
                if (!file) {
                    alert('Please select a file to upload.');
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    return; // Exit if no file is selected
                }
                formData.append('file', file);
                var fileInput = $('#fileupload')[0];
                if (fileInput.files.length > 0) {
                    var fileName = fileInput.files[0].name;  // Get the file name
                    formData.append('kind', "F5T4RR");  // Append file name to formData
                }

                // **Console log all form data**
                console.log('File name:', fileName); // Log the file name to console
                console.log('--- Form Data ---');
                for (var pair of formData.entries()) {
                    if (pair[1] instanceof File) {
                        console.log(`${pair[0]}: (File) Name: ${pair[1].name}, Size: ${pair[1].size}, Type: ${pair[1].type}`);
                    } else {
                        console.log(`${pair[0]}: ${pair[1]}`);
                    }
                }

                var url = `${PPIS_path_upload}/file/upload`;
                // Send AJAX request
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Response:', response);
                        if ("true") {
                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F5T4RR");
                             // Clear the remarks textarea
                            $('#remarks').val(''); 
                            
                            // Clear the file input (reset file input)
                            $('#fileupload').val('');
                        } else {
                            alert('Error: ' + "Failed to upload");
                        }
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    },
                    error: function(xhr, status, error) {
                        console.error('Upload failed: ', error);
                        alert('An error occurred during the upload.');
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    }
                });
            });

            $(document).ready(function () {
                var table = $('#T_F5T4').DataTable( {
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
            });
        });


        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            
            var table = $('#T_F5T4').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T4").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T4 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table4",
                filename: "Form5-Table4.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table4" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPI', 'PI', 'JRPI', 'RPI', 'JTPI', 'TPI' ];
            var requiredField= [ 'add_petitioner','add_psir'];
            var check = true
            var checkTable = ['F5T2_ACTED', 'F5T3']

            ___validateSave(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){

                    var checkTable2 = ['F5T4']
                    ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable2).done(function(result){
                        if(result){
                            $(".modal-form input").attr("disabled",true);
                            $(".modal-form select").attr("disabled",true);
                            $(".addSubmitButton").addClass("hidden");
                            $(".confirmAdd").removeClass("hidden")
                            $(".addProceedButton").removeClass("hidden")
                        }
                    })

                }
            })
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true);
            $(".modal-loader").removeClass("hidden");
            var fullname = $("#add_lname").val() +', '+ $("#add_fname").val() +' y '+ $("#add_mname").val();
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "petitioner": fullname,
                "fname": $("#add_fname").val(),
                "mname": $("#add_mname").val(),
                "lname": $("#add_lname").val(),
                "suffixname": $("#add_sname").val(),
                "alias": $("#add_probationer_alias").val(),
                "reason_denial": $("#add_reason_denial").val(),
                "other_types": $("#add_other_types").val(),
                "disposed_date": $("#add_psir").val(),
                "disposed_decision": $("#add_psir_rec").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office" :$.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T4',JSON.stringify(payload)).done(function (result) {
                if(result.status != undefined && result.status == "SUCCESS"){

                    $(".modal-loader").addClass("hidden")
                    $(".addProceedButton").attr('disabled',false)
                    $("#modal-add").modal('toggle')
                    ___modalReset();
                    location.reload();
                         
                }else{
                    //Error Prompt
                }
            });

            var PPISPayload = {
                "clientType"            : "PROBATIONER",
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : fullname,
                "courtOrderDate"        : $("#add_psir").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "firstName"             : $("#add_fname").val(),
                "middleName"            : $("#add_mname").val(),
                "lastName"              : $("#add_lname").val(),
                "suffixName"            : $("#add_sname").val(),
                "manualDocket"          : false,
                "type"                  : "PIS_INV",
            }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T4',JSON.stringify(payload)).done(function (result) {
                    if(result.status != undefined && result.status == "SUCCESS"){

                        $(".modal-loader").addClass("hidden")
                        $(".deleteProceedButton").attr('disabled',false)
                        $("#modal-edit").modal('toggle')
                        ___modalReset();

                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });

                       // location.reload();
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T4',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        // $("#edit_petitioner").val(payload.petitioner)
                        $("#edit_fname").val(payload.fname)
                        $("#edit_mname").val(payload.mname)
                        $("#edit_lname").val(payload.lname)
                        $("#edit_sname").val(payload.suffixname)
                        $("#edit_probationer_alias").val(payload.alias)
                        $("#edit_manifestation").val(payload.manifest)
                        $("#edit_reason_denial").val(payload.reason_denial)
                        $("#edit_other_types").val(payload.other_types)
                        $("#edit_psir_rec").val(payload.disposed_decision).trigger("change")
                        $("#edit_psir").val(payload.disposed_date)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var fullname = $("#edit_lname").val() +', '+ $("#edit_fname").val() +' y '+ $("#edit_mname").val();
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "petitioner": fullname,
                    "fname": $("#edit_fname").val(),
                    "mname": $("#edit_mname").val(),
                    "lname": $("#edit_lname").val(),
                    "suffixname": $("#edit_sname").val(),
                    "alias" : $("#edit_probationer_alias").val(),
                    "other_types": $("#edit_other_types").val(),
                    "reason_denial": $("#edit_reason_denial").val(),
                    "disposed_decision": $("#edit_psir_rec").val(),
                    "disposed_date": $("#edit_psir").val(),
                    "field_office": $.wms.urlParam('field'),
                    "field_office_id": $.wms.urlParam('officeId'),
                    "Y_M": $.wms.urlParam('date'),
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"

                }
                // console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T4',JSON.stringify(payload)).done(function (result) {
                    
                    if(result.status != undefined && result.status == "SUCCESS"){
                        $(".modal-loader").addClass("hidden")
                        $(".editProceedButton").attr('disabled',false)
                        $("#modal-edit").modal('toggle')
                        ___modalReset();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });

            })
        }
        

    };


    var __attachF5T5PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T5_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T5',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                   data = $.wms.upper($.wms.sanitize(data))
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F5T5_tbody').append("<tr>"+
                                                "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                                "<td>"+data.petitioner.toUpperCase()+"</td>"+
                                                
                                                "<td class='center'>"+data.referring_office+"</td>"+
                                                "<td class='center'>"+data.received_date+"</td>"+
                                                "<td class='center'>"+data.investigating_officer+"</td>"+
                                                "<td class='center'>"+data.reasons+"</td>"+
                                                "<td class='options center'>"+data.field_office+"</td>"+
                                                "<td class='options center'>"+source+"</td>"+
                                                "<td width='15%' align='center' class='options'> <button class='access_f5_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                                                "<button class='access_f5_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });
                ___tableControls();
            }else{
                // $(".F5T5_tbody").append(
                //         "<tr>"+
                //             "<td colspan='12' class='center b'>NONE</td>"+
                //         "</tr>");
            }

            $(document).ready(function () {
                var table = $('#T_F5T5').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
            });

        });


        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            // var table = $('#T_F5T5').DataTable();
            // $("#T_F5T5").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form5-Table5",
            //     filename: "Form5-Table5.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F5T5').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T5").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T5 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table5",
                filename: "Form5-Table5.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table5" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JCPI', 'CPI', 'FBCI'];
            var requiredField= [ 'add_petitioner', 'add_date_rcv', 'add_investigating_officer'];
            var check = true
            var checkTable = ['F5T5', 'F5T6_RCV']

            ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "petitioner": $("#add_petitioner").val(),
                "referring_office" : $("#add_referring_office").val(),
                "received_date" : $("#add_date_rcv").val(),
                "investigating_officer" : $("#add_investigating_officer").val(),
                "reasons" : $("#add_reasons").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T5',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T5PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();
                
                var payload = {
                    "checkTable" : ['F5T6_CMPLTD'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T5',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T5PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T5',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_petitioner").val(payload.petitioner)
                        $("#edit_referring_office").val(payload.referring_office).trigger("change")
                        $("#edit_date_rcv").val(payload.received_date)
                        $("#edit_investigating_officer").val(payload.investigating_officer)
                        $("#edit_reasons").val(payload.reasons)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "petitioner" : $("#edit_petitioner").val(),
                    "referring_office" : $("#edit_referring_office").val(),
                    "received_date" : $("#edit_date_rcv").val(),
                    "investigating_officer" : $("#edit_investigating_officer").val(),
                    "reasons" : $("#edit_reasons").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T5',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T5PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

    };



    var __attachF5T6PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T6_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;

        var __received = function(){
            console.log("received events")
            $('.F5T6_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_RCV',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                if(result.status != undefined && result.status == "SUCCESS"){

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                           
                            result.payload.forEach(function(data){
                                data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $('.F5T6_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner.toUpperCase()+"</td>"+
                                    "<td>"+data.referring_office+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.reasons+"</td>"+
                                    "<td>"+data.investigating_officer+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f5_write btn btn-success btn-xs btn-rcv-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f5_write btn btn-danger btn-xs btn-rcv-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });

            $(document).on('click', '.btn-attachment-rcv', function() {
                var docketNo = $(this).data('docket');
                var recordId = $(this).data('id');
                var petitioner = $(this).data('petitioner');
                var field_office_id = $(this).data('field_office_id');
                console.log(petitioner)
                console.log(field_office_id)

                // Set docketNo, petitioner, and field_office_id in the form's hidden fields
                $('#docket_no').val(docketNo);
                $('#petitioner_name').val(petitioner);
                $('#FOId').val(field_office_id);

                // Populate the type select dropdown
                $('#type').empty().append(`
                    <option value="" disabled selected>Select Type</option>
                    <option value="Courtesy Probation Investigation">Courtesy Probation Investigation</option>
                    <option value="Full-blown Courtesy Probation Investigation">Full-blown Courtesy Probation Investigation</option>
                    <option value="Other Document/s">Other Document/s</option>
                `);
                
                // Remove any previous 'change' event and bind a new one to handle the select change
                $(document).off('change', '#type').on('change', '#type', function() {
                    var selectedValue = $(this).val();
                    
                    if (selectedValue === 'Other Document/s') {
                        $('.remarks-row').show(); // Show the remarks field
                    } else {
                        $('.remarks-row').hide(); // Hide the remarks field
                    }
                });

                // Open the Bootstrap modal
                $('#attachmentModal').modal('show');

                // Call load_table function
                load_table("investigation", docketNo, field_office_id, "F5T6RR");
            });
            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' }, // Keep only file name
                    { "data": 'remarks' }, // Keep remarks column
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            let actions = `
                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-trash'></i> Delete
                                </button>
                            `;

                            return actions;
                        }
                    }
                ];
            }

            $(document).on('click', '.btn-delete-upload', deleteItem);

            var dataTable = null; // Initialize DataTable globally

            function load_table(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head tbody').empty(); // Clear table body to avoid duplicates
                }

                dataTable = $('.table_head').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": false,
                    "autoWidth": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "ordering": false,
                    ajax: {
                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return { 
                                page: d.start / d.length, // Pagination logic
                                size: d.length           // Page size 
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call function to get table columns
                });
                setTimeout(function () {
                    dataTable.columns.adjust().draw();
                }, 100);
            }
            $('#uploadButton').on('click', function(e) {
                e.preventDefault(); // Prevent default form submission
                $(this).prop('disabled', true).text('Uploading...');
                // Create FormData object
                var formData = new FormData();
                formData.append('uuid', $('#docket_no').val());
                formData.append('createdby', $('#petitioner_name').val());
                formData.append('type', "investigation");
                var type = $('#type').val();
                var remarks = $('#remarks').val();
                if (remarks) {
                    formData.append('remarks', type + " - " + remarks);
                } else {
                    formData.append('remarks', type);
                }
                formData.append('officeId', $('#FOId').val());
                formData.append('version', "0");
                var file = $('#fileupload')[0].files[0];
                if (!file) {
                    alert('Please select a file to upload.');
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    return; // Exit if no file is selected
                }
                formData.append('file', file);
                var fileInput = $('#fileupload')[0];
                if (fileInput.files.length > 0) {
                    var fileName = fileInput.files[0].name;  // Get the file name
                    formData.append('kind', "F5T6RR");  // Append file name to formData
                }

                // **Console log all form data**
                console.log('File name:', fileName); // Log the file name to console
                console.log('--- Form Data ---');
                for (var pair of formData.entries()) {
                    if (pair[1] instanceof File) {
                        console.log(`${pair[0]}: (File) Name: ${pair[1].name}, Size: ${pair[1].size}, Type: ${pair[1].type}`);
                    } else {
                        console.log(`${pair[0]}: ${pair[1]}`);
                    }
                }

                var url = `${PPIS_path_upload}/file/upload`;
                // Send AJAX request
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Response:', response);
                        if ("true") {
                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F5T6RR");
                             // Clear the remarks textarea
                            $('#remarks').val(''); 
                            
                            // Clear the file input (reset file input)
                            $('#fileupload').val('');
                        } else {
                            alert('Error: ' + "Failed to upload");
                        }
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    },
                    error: function(xhr, status, error) {
                        console.error('Upload failed: ', error);
                        alert('An error occurred during the upload.');
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    }
                });
            });
                            $(document).ready(function () {
                                var table = $('#T_F5T6_a').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                            });


                            ___tableControlsRCV();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __received()
        var __car = function(){
            console.log("received events")
            $('.F5T6_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                if(result.status != undefined && result.status == "SUCCESS"){

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                           
                            result.payload.forEach(function(data){
                                data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $('.F5T6_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner.toUpperCase()+"</td>"+
                                    "<td>"+data.completed_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f5_write btn btn-success btn-xs btn-cmpltd-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f5_write btn btn-danger btn-xs btn-cmpltd-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>").addClass("options")
                            });

                $(document).on('click', '.btn-attachment-rcv-modal2', function() {
                    var docketNo = $(this).data('docket');
                    var recordId = $(this).data('id');
                    var petitioner = $(this).data('petitioner');
                    var field_office_id = $(this).data('field_office_id');

                    // Set docketNo, petitioner, and field_office_id in the form's hidden fields for modal2
                    $('#docket_no2').val(docketNo);
                    $('#petitioner_name2').val(petitioner);
                    $('#FOId2').val(field_office_id);

                    // Populate the type select dropdown for modal2
                    $('#type2').empty().append(`
                        <option value="" disabled selected>Select Type</option>
                        <option value="Accomplished CPI">Accomplished CPI</option>
                        <option value="Accomplished FBCI">Accomplished FBCI</option>
                        <option value="Other Document/s">Other Document/s</option>
                    `);

                    // Remove any previous 'change' event and bind a new one to handle the select change for modal2
                    $(document).off('change', '#type2').on('change', '#type2', function() {
                        var selectedValue = $(this).val();

                        if (selectedValue === 'Other Document/s') {
                            $('.remarks-row2').show(); // Show the remarks field
                        } else {
                            $('.remarks-row2').hide(); // Hide the remarks field
                        }
                    });

                    // Open the Bootstrap modal for modal2
                    $('#attachmentModal2').modal('show');

                    // Call load_table function specific to modal2
                    load_table2("investigation", docketNo, field_office_id, "F5T6RCR");
                });

            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' }, // Keep only file name
                    { "data": 'remarks' }, // Keep remarks column
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            let actions = `
                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-trash'></i> Delete
                                </button>
                            `;

                            return actions;
                        }
                    }
                ];
            }
            $(document).on('click', '.btn-delete-upload', deleteItem);

            var dataTable = null; // Initialize DataTable globally

            function load_table2(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head2 tbody').empty(); // Clear table body to avoid duplicates
                }

                dataTable = $('.table_head2').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": false,
                    "autoWidth": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "ordering": false,
                    ajax: {
                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return { 
                                page: d.start / d.length, // Pagination logic
                                size: d.length           // Page size 
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call function to get table columns
                });
                setTimeout(function () {
                    dataTable.columns.adjust().draw();
                }, 100);
            }

                $('#uploadButton2').on('click', function(e) {
                    e.preventDefault(); // Prevent default form submission for modal2
                    $(this).prop('disabled', true).text('Uploading...');

                    var formData = new FormData();
                    formData.append('uuid', $('#docket_no2').val());
                    formData.append('createdby', $('#petitioner_name2').val());
                    formData.append('type', "investigation");
                    var type = $('#type2').val();
                    var remarks = $('#remarks2').val();
                    if (remarks) {
                        formData.append('remarks', type + " - " + remarks);
                    } else {
                        formData.append('remarks', type);
                    }
                    formData.append('officeId', $('#FOId2').val());
                    formData.append('version', "0");
                    var file = $('#fileupload2')[0].files[0];
                    if (!file) {
                        alert('Please select a file to upload.');
                        $('#uploadButton2').prop('disabled', false).text('Upload');
                        return; // Exit if no file is selected
                    }
                    formData.append('file', file);

                    var fileInput = $('#fileupload2')[0];
                    if (fileInput.files.length > 0) {
                        var fileName = fileInput.files[0].name;
                        formData.append('kind', "F5T6RCR");
                    }

                    var url = `${PPIS_path_upload}/file/upload`;
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            console.log('Response:', response);
                                load_table2('investigation', $('#docket_no2').val(), $('#FOId2').val(), "F5T6RCR");
                                $('#remarks2').val(''); // Clear the remarks textarea
                                $('#fileupload2').val(''); // Clear the file input
                            
                            $('#uploadButton2').prop('disabled', false).text('Upload');
                        },
                        error: function(xhr, status, error) {
                            console.error('Upload failed: ', error);
                            alert('An error occurred during the upload.');
                            $('#uploadButton2').prop('disabled', false).text('Upload');
                        }
                    });
                });

                            $(document).ready(function () {
                                var table = $('#T_F5T6_b').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                            });


                            ___tableControlsCMPLTD();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __car()

        var __download_print_list = function(){

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"
            }

            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_RCV',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                __counter += 1;
                if(result.status != undefined && result.status == "SUCCESS"){
                    if(result.payload.length > __maxTableSize){
                        __maxTableSize = result.payload.length
                        // console.log(__maxTableSize);
                    }
                    
                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                            r = 1;
                            result.payload.forEach(function(data){
                               data = $.wms.upper($.wms.sanitize(data))
                                //console.log(data);
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $("#r"+r+"c1").html(data.docket_no.toUpperCase());
                                $("#r"+r+"c2").html(data.petitioner);
                                $("#r"+r+"c3").html(data.referring_office);
                                $("#r"+r+"c4").html(data.received_date);
                                $("#r"+r+"c5").html(data.reasons);
                                $("#r"+r+"c6").html(data.investigating_officer);
                                $("#r"+r+"c7").html(data.field_office).addClass('');
                                $("#r"+r+"c8").html(source).addClass('');
                                $("#r"+r+"c9").html("").addClass("");
                                r += 1;
                            });


                            // ___tableControlsRCV();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);

                    
                }
                ___checker();
            });
 

            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                __counter += 1;
                if(result.status != undefined && result.status == "SUCCESS"){
                    if(result.payload.length > __maxTableSize){
                        __maxTableSize = result.payload.length
                        // console.log(__maxTableSize);
                    }
                    
                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                            r = 1;
                            result.payload.forEach(function(data){
                               data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                //console.log(data);
                                //$("#r"+r+"c1").html(data.docket_no.toUpperCase());
                                $("#r"+r+"c10").html("("+data.docket_no.toUpperCase()+") "+data.petitioner);
                                $("#r"+r+"c11").html(data.completed_date);
                                $("#r"+r+"c12").html(data.field_office).addClass("options");
                                $("#r"+r+"c13").html(source).addClass("options");
                                $("#r"+r+"c14").html("").addClass("options");
                                r += 1;
                            });


                            
                            // ___tableControlsCMPLTD();
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);

                    
                }
                ___checker();
            });
        }
        __download_print_list();

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F5T6_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F5T6_tbody").append(
                            "<tr>"+
                                "<td id='r"+i+"c1' class=''>"+
                                "<td id='r"+i+"c2' class=''>"+
                                "<td id='r"+i+"c3' class=''>"+
                                "<td id='r"+i+"c4' class=''>"+
                                "<td id='r"+i+"c5' class=''>"+
                                "<td id='r"+i+"c6' class=''>"+
                                "<td id='r"+i+"c7' class='options'>"+
                                "<td id='r"+i+"c8' class='options'>"+
                                "<td id='r"+i+"c9' class='options'>"+
                                "<td id='r"+i+"c10' class=''>"+
                                "<td id='r"+i+"c11' class=''>"+
                                "<td id='r"+i+"c12' class='options'>"+
                                "<td id='r"+i+"c13' class='options'>"+
                                "<td id='r"+i+"c14' class='options'>"+
                            "</tr>"
                            )
                    }
                    $.wms.dashboard.formControlCheck()
                }else{
                    // $(".F5T6_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='14' class='center b'>NONE</td>"+
                    //         "</tr>");
                }
            }
        }


        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            // var table = $('#T_F5T6').DataTable();
            // $("#T_F5T6").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form5-Table6",
            //     filename: "Form5-Table6.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   });
            var table = $('#T_F5T6').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T6").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T6 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table6",
                filename: "Form5-Table6.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table6" // Custom sheet name
            }); 
        });

        //ADD
        
        $(".addRCVSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JCPI', 'CPI', 'FBCI'];
            var requiredField= [ 'add_rcv_docket_no', 'add_rcv_petitioner', 'add_rcv_date_rcv','add_rcv_investigating_officer','add_rcv_reasons'];
            var check = true
            var checkTable = ['F5T6_RCV', 'F5T5']

            ___validateSaveCarryOver(allowedDocket,$("#add_rcv_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addRCVSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addRCVProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addRCVCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addRCVSubmitButton").removeClass("hidden")
            $(".addRCVProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addRCVProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_rcv_docket_no").val(),
                "petitioner": $("#add_rcv_petitioner").val(),
                "referring_office" : $("#add_rcv_referring_office").val(),
                "received_date" : $("#add_rcv_date_rcv").val(),
                "investigating_officer" : $("#add_rcv_investigating_officer").val(),
                "reasons" : $("#add_rcv_reasons").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office" : $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_RCV',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addRCVProceedButton").attr('disabled',false)
                $("#modal-rcv-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T6PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload_a = {
                "clientType"            : "PROBATIONER",
                "docketNumber"          : $("#add_rcv_docket_no").val(),
                "fullName"              : $("#add_rcv_petitioner").val(),
                "receivedDateByPPO"     : $("#add_rcv_date_rcv").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "investigatingOfficer"  : $("#add_rcv_investigating_officer").val(),
                "referringOfficeId"     : $("#add_rcv_referring_office").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "manualDocket"          : false,
                "type"                  : "PIS_CSINV",
            }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload_a), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        })
        //ADD

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControlsRCV = function(){
            $(".btn-rcv-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-rcv-delete").modal();

                var payload = {
                    "checkTable" : ['F5T6_CMPLTD'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteRCVProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteRCVProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteRCVProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_RCV',JSON.stringify(payload)).done(function (result) {
                    $("#modal-rcv-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteRCVProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T6PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-rcv-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-rcv-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_RCV',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editRCVSubmitButton").removeClass("hidden");
                    $(".editRCVroceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_rcv_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_rcv_id").val(payload.id)
                        $("#edit_rcv_petitioner").val(payload.petitioner)
                        $("#edit_rcv_referring_office").val(payload.referring_office).trigger("change")
                        $("#edit_rcv_date_rcv").val(payload.received_date)
                        $("#edit_rcv_investigating_officer").val(payload.investigating_officer)
                        $("#edit_rcv_reasons").val(payload.reasons)
                        $("#edit_rcv_field_office").val(payload.field_office).trigger("change");
                        $("#edit_rcv_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            });

            $(".editRCVSubmitButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editRCVSubmitButton").addClass("hidden");
                $(".confirmEdit").removeClass("hidden")
                $(".editRCVProceedButton").removeClass("hidden")
            });

            $(".editRCVCancelButton").unbind("click").on("click",function(){
                ___modalReset();
                $(".editRCVSubmitButton").removeClass("hidden")
                $(".editRCVProceedButton").addClass("hidden")
            });


            //Update
            $(".editRCVProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_rcv_id").val(),
                    "docket_no" : $("#edit_rcv_docket_no").val(),
                    "petitioner" : $("#edit_rcv_petitioner").val(),
                    "referring_office" : $("#edit_rcv_referring_office").val(),
                    "received_date" : $("#edit_rcv_date_rcv").val(),
                    "investigating_officer" : $("#edit_rcv_investigating_officer").val(),
                    "reasons" : $("#edit_rcv_reasons").val(),
                    "field_office": $.wms.urlParam('field'),
                    "field_office_id": $.wms.urlParam('officeId'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_RCV',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editRCVProceedButton").addClass("hidden").attr('disabled',false)

                    $("#modal-rcv-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T6PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

        //ADD_CMPLTD
        //ADD
        
        $(".addCMPLTDSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JCPI', 'CPI', 'FBCI'];
            var requiredField= [ 'add_cmpltd_docket_no','add_cmpltd_petitioner','add_cmpltd_date'];
            var check = true
            var checkTable = ['F5T5', 'F5T6_RCV']

            ___validateSave(allowedDocket,$("#add_cmpltd_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".addCMPLTDSubmitButton").addClass("hidden");
                $(".confirmAdd").removeClass("hidden")
                $(".addCMPLTDProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addCMPLTDCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addCMPLTDSubmitButton").removeClass("hidden")
            $(".addCMPLTDProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addCMPLTDProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_cmpltd_docket_no").val(),
                "petitioner": $("#add_cmpltd_petitioner").val(),
                "completed_date" : $("#add_cmpltd_date").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office" : $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addCMPLTDProceedButton").attr('disabled',false)
                $("#modal-cmpltd-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T6PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload_b = {
                "clientType"            : "PROBATIONER",
                "docketNumber"          : $("#add_cmpltd_docket_no").val(),
                "fullName"              : $("#add_cmpltd_petitioner").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "manualDocket"          : false,
                "type"                  : "PIS_CSINV",
            }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload_b), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        })
        //ADD
        //ADD_CMPLTD

        //CMPLTD

        var ___tableControlsCMPLTD = function(){
            $(".btn-cmpltd-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-cmpltd-delete").modal();
            });    

            //Delete
            $(".deleteCMPLTDProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
                    $("#modal-cmpltd-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteCMPLTDProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T6PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-cmpltd-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-cmpltd-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_CMPLTD',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editCMPLTDSubmitButton").removeClass("hidden");
                    $(".editCMPLTDProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_cmpltd_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_cmpltd_id").val(payload.id)
                        $("#edit_cmpltd_petitioner").val(payload.petitioner)
                        $("#edit_cmpltd_date").val(payload.completed_date)
                        $("#edit_cmpltd_field_office").val(payload.field_office).trigger("change");
                        $("#edit_cmpltd_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            });

            $(".editCMPLTDSubmitButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editCMPLTDSubmitButton").addClass("hidden");
                $(".confirmEdit").removeClass("hidden")
                $(".editCMPLTDProceedButton").removeClass("hidden")
            });

            $(".editCMPLTDCancelButton").unbind("click").on("click",function(){
                ___modalReset();
                $(".editCMPLTDSubmitButton").removeClass("hidden")
                $(".editCMPLTDProceedButton").addClass("hidden")
            });


            //Update
            $(".editCMPLTDProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_cmpltd_id").val(),
                    "docket_no" : $("#edit_cmpltd_docket_no").val(),
                    "petitioner" : $("#edit_cmpltd_petitioner").val(),
                    "completed_date" : $("#edit_cmpltd_date").val(),
                    "field_office": $.wms.urlParam('field'),
                    "field_office_id": $.wms.urlParam('officeId'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editCMPLTDProceedButton").addClass("hidden").attr('disabled',false)

                    $("#modal-cmpltd-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T6PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }

        //CMPLTD

    };

    var __attachF5T7PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T7_tbody').empty();
        $(".form_loader").removeClass("hidden");
        $(".result_form").addClass("hidden");
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T7',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                   data = $.wms.upper($.wms.sanitize(data))
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F5T7_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.probationer+"</td>"+
                        
                        "<td class='center'>"+data.case_classification+"</td>"+
                        "<td class='center'>"+data.supervising_officer+"</td>"+
                        "<td class='center'>"+data.received_date+"</td>"+
                        "<td class='center'>"+data.probation_start+"</td>"+
                        "<td class='center'>"+data.probation_end+"</td>"+
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td width='15%' align='center' class='options'> <button class='btn btn-success btn-sm btn-edit access_f5_write form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f5_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });
                ___tableControls();
            }else{
                // $(".F5T7_tbody").append(
                //         "<tr>"+
                //             "<td colspan='12' class='center b'>NONE</td>"+
                //         "</tr>");
            }

            $(document).ready(function () {
                var table = $('#T_F5T7').DataTable({
                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                    "language": {
                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                    },
                    "drawCallback": function( settings ) {
                        $.wms.reports.form_lock();
                    }
                });

                // Event handler for the btn-download button
                $(".btn-download").unbind("click").on("click", function () {
                    var form = "Download Caseload Form: " + $.wms.urlParam('form') + ", Field: " + $.wms.urlParam('field') + ", Date:" + $.wms.urlParam('date');
                    var payload = {
                        "created_by": $.cookie("USER_ID"),
                        "module": "CASELOAD",
                        "action": form
                    };

                    $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert', JSON.stringify(payload)).done(function (result) {
                        // Handle the result of the API call, if needed
                    });

                    // var table = $('#T_F5T7').DataTable();
                    // $("#T_F5T7").append(table.$('tr').clone()).table2excel({
                    //     // exclude CSS class
                    //     exclude: ".options",
                    //     name: "Form5-Table7",
                    //     filename: "Form5-Table7.xls", //do not include extension
                    //     fileext: ".xls",
                    //     preserveColors: true
                    // });
                    var table = $('#T_F5T7').DataTable();
                    var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
                    var cloneTable = $("#T_F5T7").clone(); // Clone the table

                    // Append the original table's thead (header) to the cloned table
                    cloneTable.empty().append($("#T_F5T7 thead").clone());

                    // Append all rows to the cloned table
                    cloneTable.append($(allData).clone());

                    // Export the cloned table to Excel
                    cloneTable.table2excel({
                        exclude: ".options", // Exclude CSS class
                        name: "Form5-Table7",
                        filename: "Form5-Table7.xls", // Do not include the extension
                        fileext: ".xls",
                        preserveColors: true,
                        exclude_img: true, // Option to exclude images if present
                        exclude_links: true, // Option to exclude links if present
                        exclude_inputs: true, // Option to exclude input fields if present
                        sheetName: "Form5-Table7" // Custom sheet name
                    });
                });
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [  'JPS', 'PS', 'JRPS', 'RPS', 'JTPS', 'TPS'];
            var requiredField= [ 'add_probationer','add_date_rcv','add_supervising','add_start','add_end'];  
            var check = true
            var checkTable = ['F5T7', 'F5T8']        
            
            ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "probationer": $("#add_probationer").val(),
                "received_date" : $("#add_date_rcv").val(),
                "case_classification" : $("#add_case_classification").val(),
                "supervising_officer" : $("#add_supervising").val(),
                "probation_start" : $("#add_start").val(),
                "probation_end" : $("#add_end").val(),
                
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T7',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T7PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var payload = {
                    "checkTable" : ['F5T11'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T7',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T7PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T7',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_date_rcv").val(payload.received_date)
                        $("#edit_case_classification").val(payload.case_classification).trigger("change")
                        $("#edit_supervising").val(payload.supervising_officer)
                        $("#edit_start").val(payload.probation_start)
                        $("#edit_end").val(payload.probation_end)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "probationer" : $("#edit_probationer").val(),
                    "received_date" : $("#edit_date_rcv").val(),
                    "case_classification" : $("#edit_case_classification").val(),
                    "supervising_officer" : $("#edit_supervising").val(),
                    "probation_start" : $("#edit_start").val(),
                    "probation_end" : $("#edit_end").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T7',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T7PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

    };

    var __attachF5T8PageEvent = function() {
        console.log("open");
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T8_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        $("#add_type_referrals").change(function() {
          var val = $(this).children(":selected").val();
          console.log(val)
          if (val == "Direct Transfer, Court to Court") {
            $(".refer").removeClass("hide")
          } else if(val == "Transfer from other Offices/Courts") {
            $(".refer").removeClass("hide")
          } else {
            $(".refer").addClass("hide")
          }
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T8',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                   data = $.wms.upper($.wms.sanitize(data))
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F5T8_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.probationer+"</td>"+
                        "<td class='center'>"+data.referral_type+"</td>"+
                        "<td class='center'>"+data.cc_no+"</td>"+
                        "<td class='center'>"+data.court_origin+"</td>"+
                        "<td class='center'>"+data.case_classification+"</td>"+
                        "<td class='center'>"+data.supervising_officer+"</td>"+
                        "<td class='center'>"+data.received_date+"</td>"+
                        "<td class='center'>"+data.probation_start+"</td>"+
                        "<td class='center'>"+data.probation_end+"</td>"+
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td align='center' class='options'>" + 
                        "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                        "<button class='access_f5_write btn btn-success btn-xs btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> </button> "+
                        "<button class='access_f5_write btn btn-danger btn-xs btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> </button> </td></tr>")
                });
                ___tableControls();
            }else{
            }
            $(document).on('click', '.btn-attachment-rcv', function() {
                var docketNo = $(this).data('docket');
                var recordId = $(this).data('id');
                var petitioner = $(this).data('petitioner');
                var field_office_id = $(this).data('field_office_id');
                console.log(petitioner)
                console.log(field_office_id)

                // Set docketNo, petitioner, and field_office_id in the form's hidden fields
                $('#docket_no').val(docketNo);
                $('#petitioner_name').val(petitioner);
                $('#FOId').val(field_office_id);

                // Populate the type select dropdown
                $('#type').empty().append(`
                    <option value="" disabled selected>Select Type</option>
                    <option value="Probation Order">Probation Order</option>
                    <option value="Transfer Order">Transfer Order</option>
                    <option value="Other Document/s">Other Document/s</option>
                `);
                
                // Remove any previous 'change' event and bind a new one to handle the select change
                $(document).off('change', '#type').on('change', '#type', function() {
                    var selectedValue = $(this).val();
                    
                    if (selectedValue === 'Other Document/s') {
                        $('.remarks-row').show(); // Show the remarks field
                    } else {
                        $('.remarks-row').hide(); // Hide the remarks field
                    }
                });

                // Open the Bootstrap modal
                $('#attachmentModal').modal('show');

                // Call load_table function
                load_table("supervision", docketNo, field_office_id, "F5T8");
            });

            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' }, // Keep only file name
                    { "data": 'remarks' }, // Keep remarks column
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            let actions = `
                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-trash'></i> Delete
                                </button>
                            `;

                            return actions;
                        }
                    }
                ];
            }
            $(document).on('click', '.btn-delete-upload', deleteItem);

            var dataTable = null; // Initialize DataTable globally

            function load_table(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head tbody').empty(); // Clear table body to avoid duplicates
                }

                dataTable = $('.table_head').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": false,
                    "autoWidth": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "ordering": false,
                    ajax: {
                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return { 
                                page: d.start / d.length, // Pagination logic
                                size: d.length           // Page size 
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call function to get table columns
                });
                setTimeout(function () {
                    dataTable.columns.adjust().draw();
                }, 100);
            }
            $('#uploadButton').on('click', function(e) {
                e.preventDefault(); // Prevent default form submission
                $(this).prop('disabled', true).text('Uploading...');
                // Create FormData object
                var formData = new FormData();
                formData.append('uuid', $('#docket_no').val());
                formData.append('createdby', $('#petitioner_name').val());
                formData.append('type', "supervision");
                var type = $('#type').val();
                var remarks = $('#remarks').val();
                if (remarks) {
                    formData.append('remarks', type + " - " + remarks);
                } else {
                    formData.append('remarks', type);
                }
                formData.append('officeId', $('#FOId').val());
                formData.append('version', "0");
                var file = $('#fileupload')[0].files[0];
                if (!file) {
                    alert('Please select a file to upload.');
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    return; // Exit if no file is selected
                }
                formData.append('file', file);
                var fileInput = $('#fileupload')[0];
                if (fileInput.files.length > 0) {
                    var fileName = fileInput.files[0].name;  // Get the file name
                    formData.append('kind', "F5T8");  // Append file name to formData
                }

                // **Console log all form data**
                console.log('File name:', fileName); // Log the file name to console
                console.log('--- Form Data ---');
                for (var pair of formData.entries()) {
                    if (pair[1] instanceof File) {
                        console.log(`${pair[0]}: (File) Name: ${pair[1].name}, Size: ${pair[1].size}, Type: ${pair[1].type}`);
                    } else {
                        console.log(`${pair[0]}: ${pair[1]}`);
                    }
                }

                var url = `${PPIS_path_upload}/file/upload`;
                // Send AJAX request
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Response:', response);
                        if ("true") {
                            load_table('supervision', $('#docket_no').val(), $('#FOId').val(), "F5T8");
                             // Clear the remarks textarea
                            $('#remarks').val(''); 
                            
                            // Clear the file input (reset file input)
                            $('#fileupload').val('');
                        } else {
                            alert('Error: ' + "Failed to upload");
                        }
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    },
                    error: function(xhr, status, error) {
                        console.error('Upload failed: ', error);
                        alert('An error occurred during the upload.');
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    }
                });
            });
            $(document).ready(function () {
                var table = $('#T_F5T8').DataTable({
                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                    "language": {
                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                });
            });
        });


        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            // var table = $('#T_F5T8').DataTable();
            // $("#T_F5T8").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form5-Table8",
            //     filename: "Form5-Table8.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F5T8').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T8").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T8 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table8",
                filename: "Form5-Table8.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table8" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [  'JPS', 'PS', 'JRPS', 'RPS', 'JTPS', 'TPS'];
            var requiredField= [ 'add_probationer','add_cc_no','add_court_origin','add_date_rcv','add_supervising','add_fname','add_lname'];          
            var check = true
            var checkTable = ['F5T8', 'F5T7']
            
            ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true);
            $(".modal-loader").removeClass("hidden")
            var fullname = $("#add_lname").val() +', '+ $("#add_fname").val() +' y '+ $("#add_mname").val();
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "probationer": fullname,
                "fname": $("#add_fname").val(),
                "mname": $("#add_mname").val(),
                "lname": $("#add_lname").val(),
                "suffixname": $("#add_sname").val(),
                "alias": $("#add_probationer_alias").val(),
                "cc_no": $("#add_cc_no").val(),
                "court_origin": $("#add_court_origin").val(),
                "referral_type": $("#add_type_referrals").val(),
                "case_classification": $("#add_case_classification").val(),
                "received_date" : $("#add_date_rcv").val(),
                "supervising_officer" : $("#add_supervising").val(),
                "probation_start" : $("#add_start").val(),
                "probation_end" : $("#add_end").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            console.log(payload)
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T8',JSON.stringify(payload)).done(function (result) {
                
                if(result.status != undefined && result.status == "SUCCESS"){


                    var start_date = new Date($("#add_start").val());
                    console.log(start_date)
                    var start_dd = String(start_date.getDate()).padStart(2, '0');
                    var start_mm = String(start_date.getMonth() + 1).padStart(2, '0'); 
                    var start_yyyy = start_date.getFullYear();

                    var end_date = new Date($("#add_end").val());
                    console.log(end_date)
                    var end_dd = String(end_date.getDate()).padStart(2, '0');
                    var end_mm = String(end_date.getMonth() + 1).padStart(2, '0'); 
                    var end_yyyy = end_date.getFullYear();

                    var payload_request = {
                        "method"        :"insert",
                        "FORM_TABLE"    :"F5T8",
                        "REGION"        :"",
                        "YEAR"          :start_yyyy+"-"+end_yyyy,
                        "SDOCKETNO"     :$("#add_docket_no").val(),
                        "FIRSTNAME"     :$("#add_fname").val(),
                        "MIDDLENAME"    :$("#add_mname").val(),
                        "LASTNAME"      :$("#add_lname").val(),
                        "ALIAS"         :$("#add_probationer_alias").val(),
                        "SUPVOFFICE"    :$("#add_supervising").val(),
                        "REMARKS"       :$("#add_reffering").val(),
                        "STARTMM"       :start_mm,
                        "STARTDD"       :start_dd,
                        "STARTYY"       :start_yyyy,
                        "ENDMM"         :end_mm,
                        "ENDDD"         :end_dd,
                        "ENDYY"         :end_yyyy,
                        "FIELD_OFFICE"  : $.wms.urlParam('field'),
                    }
                    console.log(payload_request)
                    $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist_request',JSON.stringify(payload_request)).done(function (result) {
                    //__attachF5T8PageEvent();
                        if(result.status == "SUCCESS"){
                            $(".modal-loader").addClass("hidden")
                            $(".addProceedButton").attr('disabled',false)
                            $("#modal-add").modal('toggle')
                            ___modalReset();
                            location.reload();
                        }else{
                            alert("Failed")
                        }
                    });    
                }else{
                    //Error Prompt
                }
            });

            var PPISPayload = {
                "clientType"            : "PROBATIONER",
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : fullname,
                "receivedDateByPPO"     : $("#add_date_rcv").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "supervisingOfficer"    : $("#add_supervising").val(),
                "firstName"             : $("#add_fname").val(),
                "middleName"            : $("#add_mname").val(),
                "lastName"              : $("#add_lname").val(),
                "suffixName"            : $("#add_sname").val(),
                "manualDocket"          : false,
                "referralType"          : $("#add_type_referrals").val(),
                "criminalCaseNo"        : $("#add_cc_no").val(),
                "courtOfOrigin"         : $("#add_court_origin").val(),
                "caseClassification"    : $("#add_case_classification").val(),
                "probationStartDate"    : $("#add_start").val(),
                "probationEndDate"      : $("#add_end").val(),
                "type"                  : "PIS_SUP",
            }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var payload = {
                    "checkTable" : ['F5T11'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T8',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){

                        var payloadDocket = {
                            "method"    : "fetchByDocket",
                            "SDOCKETNO" : $(".sel-docket").html()
                        }
                        console.log(payload)
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist_request',JSON.stringify(payloadDocket)).done(function (result) {
                            console.log(result)
                            if(result.status == "SUCCESS"){

                                var payloadUpdate = {
                                    "method"        : "update",
                                    "id"            : result.payload.id,
                                    "STATUS"        : 0,
                                }
                                console.log(payloadUpdate)
                                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist_request',JSON.stringify(payloadUpdate)).done(function (result) {
                                    console.log(result)
                                    if(result.status == "SUCCESS"){
                                        $(".modal-loader").addClass("hidden")
                                        $(".deleteProceedButton").attr('disabled',false)
                                        $("#modal-edit").modal('toggle')
                                        ___modalReset();
                                        
                                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                                        var payload = {
                                            "created_by" : $.cookie("USER_ID"),
                                            "module" : "CASELOAD",
                                            "action" : form
                                            
                                        }
                                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                                            location.reload();
                                        });
                                    }else{
                                        console.log("no data found")
                                    }
                                });
                            }else{
                                console.log("no data found")
                                $(".modal-loader").addClass("hidden")
                                $(".deleteProceedButton").attr('disabled',false)
                                $("#modal-edit").modal('toggle')
                                ___modalReset();

                                var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                                var payload = {
                                    "created_by" : $.cookie("USER_ID"),
                                    "module" : "CASELOAD",
                                    "action" : form
                                    
                                }
                                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                                    location.reload();
                                });
                            }
                        });

                       // location.reload();
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T8',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        // $("#edit_probationer").val(payload.probationer)
                        $("#edit_fname").val(payload.fname)
                        $("#edit_mname").val(payload.mname)
                        $("#edit_lname").val(payload.lname)
                        $("#edit_sname").val(payload.suffixname)
                        $("#edit_probationer_alias").val(payload.alias)
                        $("#edit_type_referrals").val(payload.referral_type).trigger("change");

                        $("#edit_date_rcv").val(payload.received_date)
                        $("#edit_cc_no").val(payload.cc_no)
                        $("#edit_court_origin").val(payload.court_origin)
                        $("#edit_case_classification").val(payload.case_classification).trigger("change")
                        $("#edit_supervising").val(payload.supervising_officer)
                        $("#edit_start").val(payload.probation_start)
                        $("#edit_end").val(payload.probation_end)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var fullname = $("#edit_lname").val() +', '+ $("#edit_fname").val() +' y '+ $("#edit_mname").val();
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "probationer" : fullname,
                    "fname": $("#edit_fname").val(),
                    "mname": $("#edit_mname").val(),
                    "lname": $("#edit_lname").val(),
                    "suffixname": $("#edit_sname").val(),
                    "alias" : $("#edit_probationer_alias").val(),
                    "referral_type" : $("#edit_type_referrals").val(),
                    "received_date" : $("#edit_date_rcv").val(),
                    "case_classification" : $("#edit_case_classification").val(),
                    "supervising_officer" : $("#edit_supervising").val(),
                    "cc_no": $("#edit_cc_no").val(),
                    "court_origin": $("#edit_court_origin").val(),
                    "probation_start" : $("#edit_start").val(),
                    "probation_end" : $("#edit_end").val(),
                    "field_office": $.wms.urlParam('field'),
                    "field_office_id": $.wms.urlParam('officeId'),
                    "Y_M": $.wms.urlParam('date'),
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T8',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        var payloadDocket = {
                            "method"    : "fetchByDocket",
                            "SDOCKETNO" : $("#edit_docket_no").val()
                        }
                        console.log(payload)
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist_request',JSON.stringify(payloadDocket)).done(function (result) {
                            console.log(result)
                            if(result.status == "SUCCESS"){

                                var start_date = new Date($("#edit_start").val());
                                console.log(start_date)
                                var start_dd = String(start_date.getDate()).padStart(2, '0');
                                var start_mm = String(start_date.getMonth() + 1).padStart(2, '0'); 
                                var start_yyyy = start_date.getFullYear();

                                var end_date = new Date($("#edit_end").val());
                                console.log(end_date)
                                var end_dd = String(end_date.getDate()).padStart(2, '0');
                                var end_mm = String(end_date.getMonth() + 1).padStart(2, '0'); 
                                var end_yyyy = end_date.getFullYear();

                                var payloadUpdate = {
                                    "method"        :"update",
                                    "id"            : result.payload.id,
                                    "FORM_TABLE"    :"F5T8",
                                    "REGION"        :"",
                                    "SDOCKETNO"     :$("#edit_docket_no").val(),
                                    "YEAR"          :start_yyyy+"-"+end_yyyy,
                                    "FIRSTNAME"     :$("#edit_fname").val(),
                                    "MIDDLENAME"    :$("#edit_mname").val(),
                                    "LASTNAME"      :$("#edit_lname").val(),
                                    "ALIAS"         :$("#edit_probationer_alias").val(),
                                    "SUPVOFFICE"    :$("#edit_supervising").val(),
                                    "REMARKS"       :"",
                                    "STARTMM"       :start_mm,
                                    "STARTDD"       :start_dd,
                                    "STARTYY"       :start_yyyy,
                                    "ENDMM"         :end_mm,
                                    "ENDDD"         :end_dd,
                                    "ENDYY"         :end_yyyy,
                                }
                                console.log(payloadUpdate)
                                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist_request',JSON.stringify(payloadUpdate)).done(function (result) {
                                    console.log(result)
                                    if(result.status == "SUCCESS"){
                                        $(".modal-loader").addClass("hidden")
                                        $(".editProceedButton").attr('disabled',false)
                                        $("#modal-edit").modal('toggle')
                                        ___modalReset();
                                        location.reload();
                                    }else{
                                        console.log("no data found")
                                    }
                                });
                            }else{
                                console.log("no data found")
                                $(".modal-loader").addClass("hidden")
                                $(".editProceedButton").attr('disabled',false)
                                $("#modal-edit").modal('toggle')
                                ___modalReset();
                                location.reload();
                            }
                        });

                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

    };
    var __attachF5T9PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T9_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        //OFFICE_FINDINGS_SUPV_TERMINATION
        //Termination - Full Term
        //Termination - Early Termination
        //Termination - Died
        //REVOC
        //Revocation - Abscond
        //Revocation - Commission of Another Offense
        //Revocation - Violation of Probation Conditions
        //Revocation - Other
        //
        //Extension of Probation Period
        //

        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T9',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                    data = $.wms.sanitize(data);

                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F5T9_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.probationer.toUpperCase()+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Termination - Full Term" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Termination - Early Termination" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Termination - Died" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Revocation - Abscond" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Revocation - Commission of Another Offense" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Revocation - Violation of Probation Conditions" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Revocation - Other" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Extension of Probation Period" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Transfer to Other Courts/PPO" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Others" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+data.reason_other+"</td>"+
                        "<td class='center'>"+data.transfer+"</td>"+
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td align='center' class='options'>" + 
                        "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                        "<button class='btn btn-success btn-xs btn-edit access_f5_write form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> </button> "+
                        "<button class='access_f5_write btn btn-danger btn-xs btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> </button> </td></tr>")
                });
                ___tableControls();
            }else{
            }
            $(document).on('click', '.btn-attachment-rcv', function() {
                var docketNo = $(this).data('docket');
                var recordId = $(this).data('id');
                var petitioner = $(this).data('petitioner');
                var field_office_id = $(this).data('field_office_id');
                console.log(petitioner)
                console.log(field_office_id)

                // Set docketNo, petitioner, and field_office_id in the form's hidden fields
                $('#docket_no').val(docketNo);
                $('#petitioner_name').val(petitioner);
                $('#FOId').val(field_office_id);

                // Populate the type select dropdown
                $('#type').empty().append(`
                    <option value="" disabled selected>Select Type</option>
                    <option value="Motion to Terminate">Motion to Terminate</option>
                    <option value="Motion to Terminate (Died)">Motion to Terminate (Died)</option>
                    <option value="Violation Report">Violation Report</option>
                    <option value="Motion for Extension">Motion for Extension</option>
                    <option value="Motion for Transfer">Motion for Transfer</option>
                    <option value="Other Document/s">Other Document/s</option>
                `);
                
                // Remove any previous 'change' event and bind a new one to handle the select change
                $(document).off('change', '#type').on('change', '#type', function() {
                    var selectedValue = $(this).val();
                    
                    if (selectedValue === 'Other Document/s') {
                        $('.remarks-row').show(); // Show the remarks field
                    } else {
                        $('.remarks-row').hide(); // Hide the remarks field
                    }
                });

                // Open the Bootstrap modal
                $('#attachmentModal').modal('show');

                // Call load_table function
                load_table("supervision", docketNo, field_office_id, "F5T9");
            });


            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' }, // Keep only file name
                    { "data": 'remarks' }, // Keep remarks column
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            let actions = `
                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-trash'></i> Delete
                                </button>
                            `;

                            return actions;
                        }
                    }
                ];
            }
            $(document).on('click', '.btn-delete-upload', deleteItem);

            var dataTable = null; // Initialize DataTable globally

            function load_table(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head tbody').empty(); // Clear table body to avoid duplicates
                }

                dataTable = $('.table_head').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": false,
                    "autoWidth": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "ordering": false,
                    ajax: {
                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return { 
                                page: d.start / d.length, // Pagination logic
                                size: d.length           // Page size 
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call function to get table columns
                });
                setTimeout(function () {
                    dataTable.columns.adjust().draw();
                }, 100);
            }
            $('#uploadButton').on('click', function(e) {
                e.preventDefault(); // Prevent default form submission
                $(this).prop('disabled', true).text('Uploading...');
                // Create FormData object
                var formData = new FormData();
                formData.append('uuid', $('#docket_no').val());
                formData.append('createdby', $('#petitioner_name').val());
                formData.append('type', "supervision");
                var type = $('#type').val();
                var remarks = $('#remarks').val();
                if (remarks) {
                    formData.append('remarks', type + " - " + remarks);
                } else {
                    formData.append('remarks', type);
                }
                formData.append('officeId', $('#FOId').val());
                formData.append('version', "0");
                var file = $('#fileupload')[0].files[0];
                if (!file) {
                    alert('Please select a file to upload.');
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    return; // Exit if no file is selected
                }
                formData.append('file', file);
                var fileInput = $('#fileupload')[0];
                if (fileInput.files.length > 0) {
                    var fileName = fileInput.files[0].name;  // Get the file name
                    formData.append('kind', "F5T9");  // Append file name to formData
                }

                // **Console log all form data**
                console.log('File name:', fileName); // Log the file name to console
                console.log('--- Form Data ---');
                for (var pair of formData.entries()) {
                    if (pair[1] instanceof File) {
                        console.log(`${pair[0]}: (File) Name: ${pair[1].name}, Size: ${pair[1].size}, Type: ${pair[1].type}`);
                    } else {
                        console.log(`${pair[0]}: ${pair[1]}`);
                    }
                }

                var url = `${PPIS_path_upload}/file/upload`;
                // Send AJAX request
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Response:', response);
                        if ("true") {
                            load_table('supervision', $('#docket_no').val(), $('#FOId').val(), "F5T9");
                             // Clear the remarks textarea
                            $('#remarks').val(''); 
                            
                            // Clear the file input (reset file input)
                            $('#fileupload').val('');
                        } else {
                            alert('Error: ' + "Failed to upload");
                        }
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    },
                    error: function(xhr, status, error) {
                        console.error('Upload failed: ', error);
                        alert('An error occurred during the upload.');
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    }
                });
            });
            $(document).ready(function () {
                var table = $('#T_F5T9').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
                $('.dataTables_length').addClass('bs-select');
            });
        });


        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            var table = $('#T_F5T9').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T9").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T9 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table9",
                filename: "Form5-Table9.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table9" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPS', 'PS', 'JRPS', 'RPS', 'JTPS', 'TPS' ];
            var requiredField= [ 'add_probationer','add_submitted'];
            var check = true
            var checkTable = ['F5T7', 'F5T8']

            ___validateSave(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    var checkTable2 = ['F5T9']
                    ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable2).done(function(result){
                        if(result){
                            $(".modal-form input").attr("disabled",true);
                            $(".modal-form select").attr("disabled",true);
                            $(".addSubmitButton").addClass("hidden");
                            $(".confirmAdd").removeClass("hidden")
                            $(".addProceedButton").removeClass("hidden")
                        }
                    })
                }
            })
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });
        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "probationer": $("#add_probationer").val(),
                "disposed_decision": $("#add_findings").val(),
                "disposed_date" : $("#add_submitted").val(),
                "Y_M": $.wms.urlParam('date'),
                "others_specify" : $("#add_other_specify").val(),
                "reason_other" : $("#add_reason_other").val(),
                "transfer" : $("#add_transfer").val(),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T9',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T9PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload = {
                "clientType"            : "PROBATIONER",
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : $("#add_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "PIS_SUP",
            }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var payload = {
                    "checkTable" : ['F5T11'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T9',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T9PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T9',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_findings").val(payload.disposed_decision).trigger("change")
                        $("#edit_reason_other").val(payload.reason_other)
                        $("#edit_transfer").val(payload.transfer)
                        $("#edit_submitted").val(payload.disposed_date)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "probationer" : $("#edit_probationer").val(),
                    "reason_other" : $("#edit_reason_other").val(),
                    "transfer" : $("#edit_transfer").val(),
                    "disposed_decision" : $("#edit_findings").val(),
                    "disposed_date" : $("#edit_submitted").val(),
                    "field_office": $.wms.urlParam('field'),
                    "field_office_id": $.wms.urlParam('officeId'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T9',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T9PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };
    
    var __attachF5T10PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T10_tbody').empty();
        $('.Download_F5T10_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        //OFFICE_FINDINGS_SUPV_TERMINATION
        //Termination - Full Term
        //Termination - Early Termination
        //Termination - Died
        //REVOC
        //Revocation - Abscond
        //Revocation - Commission of Another Offense
        //Revocation - Violation of Probation Conditions
        //Revocation - Other
        //
        //Extension of Probation Period
        //

        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T10',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                    data = $.wms.sanitize(data);
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    var termination = "";
                    var revocation = "";
                    var ext = "";
                    var transfer = "";
                    var Others = "";

                    switch(data.submitted_decision){
                        case "Termination - Full Term":
                        case "Termination - Early Termination":
                        case "Termination - Died": termination = data.submitted_date;break;
                        case "Revocation - Abscond":
                        case "Revocation - Commission of Another Offense":
                        case "Revocation - Violation of Probation Conditions":
                        case "Revocation - Other":  revocation = data.submitted_date; break;
                        case "Extension of Probation Period": ext = data.submitted_date; break;
                        case "Transfer to Other Courts/PPO": transfer = data.submitted_date; break;
                        case "Others": Others = data.submitted_date; break;
                    }
                    $('.Download_F5T10_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.probationer.toUpperCase()+"</td>"+
                        "<td class='center'>"+termination+"</td>"+
                        "<td class='center'>"+revocation+"</td>"+

                        "<td class='center'>"+ext+"</td>"+
                        "<td class='center'>"+transfer+"</td>"+
                        "<td class='center'>"+Others+"</td>"+
                        "<td class='center'>"+data.supervising_officer+"</td>"+
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td width='15%' align='center' class='options'> <button class='access_f5_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f5_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                    $('.F5T10_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.probationer.toUpperCase()+"</td>"+
                        "<td class='center'>"+termination+"</td>"+
                        "<td class='center'>"+revocation+"</td>"+

                        "<td class='center'>"+ext+"</td>"+
                        "<td class='center'>"+transfer+"</td>"+
                        "<td class='center'>"+Others+"</td>"+
                        "<td class='center'>"+data.supervising_officer+"</td>"+
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td width='15%' align='center' class='options'> <button class='access_f5_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                        "<button class='access_f5_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });
                ___tableControls();
            }else{
                // $(".F5T10_tbody").append(
                //         "<tr>"+
                //             "<td colspan='14' class='center b'>NONE</td>"+
                //         "</tr>");
            }
            $(document).ready(function () {
                var table = $('#T_F5T10').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
                $('.dataTables_length').addClass('bs-select');
            });
        });


        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            
            // $("#Download_F5T10").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form5-Table10",
            //     filename: "Form5-Table10.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            // }); 
            var table = $('#T_F5T10').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T10").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T10 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table10",
                filename: "Form5-Table10.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table10" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPS', 'PS', 'JRPS', 'RPS', 'JTPS', 'TPS' ]     
            var requiredField= [ 'add_probationer', 'add_submitted', 'add_supervising'];
            var check = true
            var checkTable = ['F5T10', 'F5T9']

            ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedButton").removeClass("hidden")
                }
            });

        });

        $(".addCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "probationer": $("#add_probationer").val(),
                "submitted_decision": $("#add_findings").val(),
                "submitted_date" : $("#add_submitted").val(),
                "supervising_officer" : $("#add_supervising").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T10',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T10PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var payload = {
                    "checkTable" : ['F5T11'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T10',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T10PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T10',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_findings").val(payload.submitted_decision).trigger("change")
                        $("#edit_submitted").val(payload.submitted_date)
                        $("#edit_supervising").val(payload.supervising_officer)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "probationer" : $("#edit_probationer").val(),
                    "submitted_decision" : $("#edit_findings").val(),
                    "submitted_date" : $("#edit_submitted").val(),
                    "supervising_officer" : $("#edit_supervising").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T10',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T10PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };
    
    
    var __attachF5T11PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T11_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T11',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                    data = $.wms.sanitize(data);
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    var termination = "";
                    var revocation = "";

                    switch(data.disposed_decision){
                        case "Termination - Full Term":
                        case "Termination - Early Termination":
                        case "Termination - Died": termination = data.disposed_date;break;
                        case "Revocation - Abscond":
                        case "Revocation - Commission of Another Offense":
                        case "Revocation - Violation of Probation Conditions":
                        case "Revocation - Other":  revocation = data.disposed_date; break;
                    }
                    
                    $('.F5T11_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.probationer.toUpperCase()+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Termination - Full Term" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Termination - Early Termination" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Termination - Died" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Revocation - Abscond" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Revocation - Commission of Another Offense" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Revocation - Violation of Probation Conditions" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Revocation - Other" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Extension of Probation Period" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Transfer to Other Courts/PPO" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+(data.disposed_decision == "Others" ? data.disposed_date : "")+"</td>"+
                        "<td class='center'>"+data.reason_other+"</td>"+
                        "<td class='center'>"+data.transfer+"</td>"+
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td align='center' class='options'>" + 
                        "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                        "<button class='access_f5_write btn btn-success btn-xs btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> </button> "+
                        "<button class='btn btn-danger access_f5_write btn-xs btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> </button> </td></tr>")
                });
                ___tableControls();
            }else{
            }
            $(document).on('click', '.btn-attachment-rcv', function() {
                var docketNo = $(this).data('docket');
                var recordId = $(this).data('id');
                var petitioner = $(this).data('petitioner');
                var field_office_id = $(this).data('field_office_id');
                console.log(petitioner)
                console.log(field_office_id)

                // Set docketNo, petitioner, and field_office_id in the form's hidden fields
                $('#docket_no').val(docketNo);
                $('#petitioner_name').val(petitioner);
                $('#FOId').val(field_office_id);

                // Populate the type select dropdown
                $('#type').empty().append(`
                    <option value="" disabled selected>Select Type</option>
                    <option value="Terminate Order">Terminate Order</option>
                    <option value="Revocation Order">Revocation Order</option>
                    <option value="Violation Order">Violation Order</option>
                    <option value="Order for Extension">Order for Extension</option>
                    <option value="Order for Transfer">Order for Transfer</option>
                    <option value="Other Document/s">Other Document/s</option>
                `);
                
                // Remove any previous 'change' event and bind a new one to handle the select change
                $(document).off('change', '#type').on('change', '#type', function() {
                    var selectedValue = $(this).val();
                    
                    if (selectedValue === 'Other Document/s') {
                        $('.remarks-row').show(); // Show the remarks field
                    } else {
                        $('.remarks-row').hide(); // Hide the remarks field
                    }
                });

                // Open the Bootstrap modal
                $('#attachmentModal').modal('show');

                // Call load_table function
                load_table("supervision", docketNo, field_office_id, "F5T11");
            });

            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' }, // Keep only file name
                    { "data": 'remarks' }, // Keep remarks column
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            let actions = `
                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-trash'></i> Delete
                                </button>
                            `;

                            return actions;
                        }
                    }
                ];
            }
            $(document).on('click', '.btn-delete-upload', deleteItem);

            var dataTable = null; // Initialize DataTable globally

            function load_table(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head tbody').empty(); // Clear table body to avoid duplicates
                }

                dataTable = $('.table_head').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": false,
                    "autoWidth": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "ordering": false,
                    ajax: {
                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return { 
                                page: d.start / d.length, // Pagination logic
                                size: d.length           // Page size 
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call function to get table columns
                });
                setTimeout(function () {
                    dataTable.columns.adjust().draw();
                }, 100);
            }
            $('#uploadButton').on('click', function(e) {
                e.preventDefault(); // Prevent default form submission
                $(this).prop('disabled', true).text('Uploading...');
                // Create FormData object
                var formData = new FormData();
                formData.append('uuid', $('#docket_no').val());
                formData.append('createdby', $('#petitioner_name').val());
                formData.append('type', "supervision");
                var type = $('#type').val();
                var remarks = $('#remarks').val();
                if (remarks) {
                    formData.append('remarks', type + " - " + remarks);
                } else {
                    formData.append('remarks', type);
                }
                formData.append('officeId', $('#FOId').val());
                formData.append('version', "0");
                var file = $('#fileupload')[0].files[0];
                if (!file) {
                    alert('Please select a file to upload.');
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    return; // Exit if no file is selected
                }
                formData.append('file', file);
                var fileInput = $('#fileupload')[0];
                if (fileInput.files.length > 0) {
                    var fileName = fileInput.files[0].name;  // Get the file name
                    formData.append('kind', "F5T11");  // Append file name to formData
                }

                // **Console log all form data**
                console.log('File name:', fileName); // Log the file name to console
                console.log('--- Form Data ---');
                for (var pair of formData.entries()) {
                    if (pair[1] instanceof File) {
                        console.log(`${pair[0]}: (File) Name: ${pair[1].name}, Size: ${pair[1].size}, Type: ${pair[1].type}`);
                    } else {
                        console.log(`${pair[0]}: ${pair[1]}`);
                    }
                }

                var url = `${PPIS_path_upload}/file/upload`;
                // Send AJAX request
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Response:', response);
                        if ("true") {
                            load_table('supervision', $('#docket_no').val(), $('#FOId').val(), "F5T11");
                             // Clear the remarks textarea
                            $('#remarks').val(''); 
                            
                            // Clear the file input (reset file input)
                            $('#fileupload').val('');
                        } else {
                            alert('Error: ' + "Failed to upload");
                        }
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    },
                    error: function(xhr, status, error) {
                        console.error('Upload failed: ', error);
                        alert('An error occurred during the upload.');
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    }
                });
            });
            $(document).ready(function () {
                var table = $('#T_F5T11').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
                $('.dataTables_length').addClass('bs-select');
            });
        });

        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            // var table = $('#T_F5T11').DataTable();
            // $("#T_F5T11").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form5-Table11",
            //     filename: "Form5-Table11.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F5T11').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T11").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T11 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table11",
                filename: "Form5-Table11.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table11" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JPS', 'PS', 'JRPS', 'RPS', 'JTPS', 'TPS' ]       
            var requiredField= [ 'add_probationer','add_submitted'];
            var check = true
            var checkTable = ['F5T9', 'F5T10']

            ___validateSave(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    var checkTable2 = ['F5T11']

                    ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable2).done(function(result){
                        if(result){

                            $(".modal-form input").attr("disabled",true);
                            $(".modal-form select").attr("disabled",true);
                            $(".addSubmitButton").addClass("hidden");
                            $(".confirmAdd").removeClass("hidden")
                            $(".addProceedButton").removeClass("hidden")
                        }
                    });
                }
            });
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "probationer": $("#add_probationer").val(),
                "disposed_decision": $("#add_findings").val(),
                "disposed_date" : $("#add_submitted").val(),
                "supervising_officer" : $("#add_supervising").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "reason_other" : $("#add_reason_other").val(),
                "transfer" : $("#add_transfer").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T11',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T11PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload = {
                "clientType"            : "PROBATIONER",
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : $("#add_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "supervisingOfficer"    : $("#add_supervising").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "PIS_SUP",
            }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            });
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T11',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T11PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T11',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_findings").val(payload.disposed_decision).trigger("change")
                        $("#edit_reason_other").val(payload.reason_other)
                        $("#edit_transfer").val(payload.transfer)

                        $("#edit_submitted").val(payload.disposed_date)
                        $("#edit_supervising").val(payload.supervising_officer)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "probationer" : $("#edit_probationer").val(),
                    "disposed_decision" : $("#edit_findings").val(),
                    "reason_other" : $("#edit_reason_other").val(),
                    "transfer" : $("#edit_transfer").val(),
                    "disposed_date" : $("#edit_submitted").val(),
                    "supervising_officer" : $("#edit_supervising").val(),
                    "field_office": $.wms.urlParam('field'),
                    "field_office_id": $.wms.urlParam('officeId'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T11',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T11PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };

    var __attachF5T12PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F5T12_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        //OFFICE_FINDINGS_SUPV_TERMINATION
        //Termination - Full Term
        //Termination - Early Termination
        //Termination - Died
        //REVOC
        //Revocation - Abscond
        //Revocation - Commission of Another Offense
        //Revocation - Violation of Probation Conditions
        //Revocation - Other
        //
        //Extension of Probation Period
        //

        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T12',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                    data = $.wms.sanitize(data);
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    var termination = "";
                    var revocation = "";

                    switch(data.disposed_decision){
                        case "Termination - Full Term":
                        case "Termination - Early Termination":
                        case "Termination - Died": termination = data.disposed_date;break;
                        case "Revocation - Abscond":
                        case "Revocation - Commission of Another Offense":
                        case "Revocation - Violation of Probation Conditions":
                        case "Revocation - Other":  revocation = data.disposed_date; break;
                    }
                    
                    $('.F5T12_tbody').append("<tr>"+
                                                "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                                "<td>"+data.probationer.toUpperCase()+"</td>"+
                                                "<td>"+data.referral_office+"</td>"+
                                                "<td>"+data.received_date+"</td>"+
                                                "<td>"+data.supervising_officer+"</td>"+
                                                "<td>"+data.reasons+"</td>"+
                                                "<td>"+data.case_classification+"</td>"+
                                                "<td class='options center'>"+data.field_office+"</td>"+
                                                "<td class='options center'>"+source+"</td>"+
                                                "<td width='15%' align='center' class='options'> <button class='access_f5_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                                                "<button class='access_f5_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });
                ___tableControls();
            }else{
                // $(".F5T12_tbody").append(
                //         "<tr>"+
                //             "<td colspan='14' class='center b'>NONE</td>"+
                //         "</tr>");
            }
            $(document).ready(function () {
                var table = $('#T_F5T12').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
                $('.dataTables_length').addClass('bs-select');
            });
        });


        //Download
        $(".btn-download").unbind("click").on("click",function(){
            var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "CASELOAD",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });
            // var table = $('#T_F5T12').DataTable();
            // $("#T_F5T12").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form5-Table12",
            //     filename: "Form5-Table12.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F5T12').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F5T12").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F5T12 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form5-Table12",
                filename: "Form5-Table12.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form5-Table12" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JCPS', 'CPS'];
            var requiredField= [ 'add_probationer','add_reasons','add_date_rcv','add_supervising'];  
            var check = true
            var checkTable = ['F5T12', 'F5T13_RCV']        
            
            ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addSubmitButton").removeClass("hidden")
            $(".addProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_docket_no").val(),
                "probationer": $("#add_probationer").val(),
                "referral_office": $("#add_referring_office").val(),
                "reasons": $("#add_reasons").val(),
                "case_classification": $("#add_case_classification").val(),
                "received_date": $("#add_date_rcv").val(),
                "supervising_officer" : $("#add_supervising").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T12',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T12PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var payload = {
                    "checkTable" : ['F5T13_TERM'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T12',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T12PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T12',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_referring_office").val(payload.referral_office).trigger("change");
                        $("#edit_reasons").val(payload.reasons)
                        $("#edit_case_classification").val(payload.case_classification).trigger("change")
                        $("#edit_date_rcv").val(payload.received_date)
                        
                        $("#edit_supervising").val(payload.supervising_officer)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                        $("#edit_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
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
                ___modalReset();
                $(".editSubmitButton").removeClass("hidden")
                $(".editProceedButton").addClass("hidden")
            });


            //Update
            $(".editProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "probationer" : $("#edit_probationer").val(),
                    "referral_office" : $("#edit_referring_office").val(),
                    "reasons" : $("#edit_reasons").val(),
                    "case_classification" : $("#edit_case_classification").val(),
                    "received_date" : $("#edit_date_rcv").val(),
                    "supervising_officer" : $("#edit_supervising").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T12',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T12PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };

    var __attachF5T13PageEvent = function() {
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.reports.form_lock();
        var __maxTableSize = 0;
        var __counter = 0;

        var __received = function(){
            console.log("received events")
            $('.F5T13_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_RCV',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                if(result.status != undefined && result.status == "SUCCESS"){

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                           
                            result.payload.forEach(function(data){
                                data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $('.F5T13_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.cc_no+"</td>"+
                                    "<td>"+data.court_origin+"</td>"+
                                    "<td>"+data.referral_office+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.period+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f5_write btn btn-success btn-xs btn-rcv-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f5_write btn btn-danger btn-xs btn-rcv-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                            $(document).on('click', '.btn-attachment-rcv', function() {
                var docketNo = $(this).data('docket');
                var recordId = $(this).data('id');
                var petitioner = $(this).data('petitioner');
                var field_office_id = $(this).data('field_office_id');
                console.log(petitioner)
                console.log(field_office_id)

                // Set docketNo, petitioner, and field_office_id in the form's hidden fields
                $('#docket_no').val(docketNo);
                $('#petitioner_name').val(petitioner);
                $('#FOId').val(field_office_id);

                // Populate the type select dropdown
                $('#type').empty().append(`
                    <option value="" disabled selected>Select Type</option>
                    <option value="Courtesy Referrals">Courtesy Referrals</option>
                    <option value="Other Document/s">Other Document/s</option>
                `);
                
                // Remove any previous 'change' event and bind a new one to handle the select change
                $(document).off('change', '#type').on('change', '#type', function() {
                    var selectedValue = $(this).val();
                    
                    if (selectedValue === 'Other Document/s') {
                        $('.remarks-row').show(); // Show the remarks field
                    } else {
                        $('.remarks-row').hide(); // Hide the remarks field
                    }
                });

                // Open the Bootstrap modal
                $('#attachmentModal').modal('show');

                // Call load_table function
                load_table("supervision", docketNo, field_office_id, "F5T13RR");
            });

            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' }, // Keep only file name
                    { "data": 'remarks' }, // Keep remarks column
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            let actions = `
                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-trash'></i> Delete
                                </button>
                            `;

                            return actions;
                        }
                    }
                ];
            }
            $(document).on('click', '.btn-delete-upload', deleteItem);

            var dataTable = null; // Initialize DataTable globally

            function load_table(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head tbody').empty(); // Clear table body to avoid duplicates
                }

                dataTable = $('.table_head').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": false,
                    "autoWidth": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "ordering": false,
                    ajax: {
                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return { 
                                page: d.start / d.length, // Pagination logic
                                size: d.length           // Page size 
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call function to get table columns
                });
                setTimeout(function () {
                    dataTable.columns.adjust().draw();
                }, 100);
            }
            $('#uploadButton').on('click', function(e) {
                e.preventDefault(); // Prevent default form submission
                $(this).prop('disabled', true).text('Uploading...');
                // Create FormData object
                var formData = new FormData();
                formData.append('uuid', $('#docket_no').val());
                formData.append('createdby', $('#petitioner_name').val());
                formData.append('type', "supervision");
                var type = $('#type').val();
                var remarks = $('#remarks').val();
                if (remarks) {
                    formData.append('remarks', type + " - " + remarks);
                } else {
                    formData.append('remarks', type);
                }
                formData.append('officeId', $('#FOId').val());
                formData.append('version', "0");
                var file = $('#fileupload')[0].files[0];
                if (!file) {
                    alert('Please select a file to upload.');
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    return; // Exit if no file is selected
                }
                formData.append('file', file);
                var fileInput = $('#fileupload')[0];
                if (fileInput.files.length > 0) {
                    var fileName = fileInput.files[0].name;  // Get the file name
                    formData.append('kind', "F5T13RR");  // Append file name to formData
                }

                // **Console log all form data**
                console.log('File name:', fileName); // Log the file name to console
                console.log('--- Form Data ---');
                for (var pair of formData.entries()) {
                    if (pair[1] instanceof File) {
                        console.log(`${pair[0]}: (File) Name: ${pair[1].name}, Size: ${pair[1].size}, Type: ${pair[1].type}`);
                    } else {
                        console.log(`${pair[0]}: ${pair[1]}`);
                    }
                }

                var url = `${PPIS_path_upload}/file/upload`;
                // Send AJAX request
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Response:', response);
                        if ("true") {
                            load_table('supervision', $('#docket_no').val(), $('#FOId').val(), "F5T13RR");
                             // Clear the remarks textarea
                            $('#remarks').val(''); 
                            
                            // Clear the file input (reset file input)
                            $('#fileupload').val('');
                        } else {
                            alert('Error: ' + "Failed to upload");
                        }
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    },
                    error: function(xhr, status, error) {
                        console.error('Upload failed: ', error);
                        alert('An error occurred during the upload.');
                        $('#uploadButton').prop('disabled', false).text('Upload');
                    }
                });
            });
                            $(document).ready(function () {
                                var table = $('#T_F5T13_a').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                            ___tableControlsRCV();
                            $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __received()

        var __term = function(){
            console.log("received events")
            $('.F5T13_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_TERM',JSON.stringify(payload)).done(function (result) {
                $(".form_loader").addClass("hidden")
                $(".result_form").removeClass("hidden")
                if(result.status != undefined && result.status == "SUCCESS"){

                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                           
                            result.payload.forEach(function(data){
                                data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $('.F5T13_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.terminated_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f5_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f5_write btn btn-success btn-xs btn-cmpltd-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                        "<button class='access_f5_write btn btn-danger btn-xs btn-cmpltd-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });

                $(document).on('click', '.btn-attachment-rcv-modal2', function() {
                    var docketNo = $(this).data('docket');
                    var recordId = $(this).data('id');
                    var petitioner = $(this).data('petitioner');
                    var field_office_id = $(this).data('field_office_id');

                    // Set docketNo, petitioner, and field_office_id in the form's hidden fields for modal2
                    $('#docket_no2').val(docketNo);
                    $('#petitioner_name2').val(petitioner);
                    $('#FOId2').val(field_office_id);

                    // Populate the type select dropdown for modal2
                    $('#type2').empty().append(`
                        <option value="" disabled selected>Select Type</option>
                        <option value="Courtesy Referrals Returned and Completed">Courtesy Referrals Returned and Completed</option>
                        <option value="Other Document/s">Other Document/s</option>
                    `);

                    // Remove any previous 'change' event and bind a new one to handle the select change for modal2
                    $(document).off('change', '#type2').on('change', '#type2', function() {
                        var selectedValue = $(this).val();

                        if (selectedValue === 'Other Document/s') {
                            $('.remarks-row2').show(); // Show the remarks field
                        } else {
                            $('.remarks-row2').hide(); // Hide the remarks field
                        }
                    });

                    // Open the Bootstrap modal for modal2
                    $('#attachmentModal2').modal('show');

                    // Call load_table function specific to modal2
                    load_table2("supervision", docketNo, field_office_id, "F5T13Term");
                });

            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' }, // Keep only file name
                    { "data": 'remarks' }, // Keep remarks column
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            let actions = `
                                <a href=${PPIS_path_upload}/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${PPIS_path_upload}/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-danger btn-sm btn-delete-upload' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-trash'></i> Delete
                                </button>
                            `;

                            return actions;
                        }
                    }
                ];
            }

            $(document).on('click', '.btn-delete-upload', deleteItem);
            var dataTable = null; // Initialize DataTable globally

            function load_table2(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head2 tbody').empty(); // Clear table body to avoid duplicates
                }

                dataTable = $('.table_head2').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": false,
                    "autoWidth": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "ordering": false,
                    ajax: {
                        url: `${PPIS_path_upload}/file/page/${type}/${uuid}/${kind}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return { 
                                page: d.start / d.length, // Pagination logic
                                size: d.length           // Page size 
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call function to get table columns
                });
                setTimeout(function () {
                    dataTable.columns.adjust().draw();
                }, 100);
            }

                $('#uploadButton2').on('click', function(e) {
                    e.preventDefault(); // Prevent default form submission for modal2
                    $(this).prop('disabled', true).text('Uploading...');

                    var formData = new FormData();
                    formData.append('uuid', $('#docket_no2').val());
                    formData.append('createdby', $('#petitioner_name2').val());
                    formData.append('type', "supervision");
                    var type = $('#type2').val();
                    var remarks = $('#remarks2').val();
                    if (remarks) {
                        formData.append('remarks', type + " - " + remarks);
                    } else {
                        formData.append('remarks', type);
                    }
                    formData.append('officeId', $('#FOId2').val());
                    formData.append('version', "0");
                    var file = $('#fileupload2')[0].files[0];
                    if (!file) {
                        alert('Please select a file to upload.');
                        $('#uploadButton2').prop('disabled', false).text('Upload');
                        return; // Exit if no file is selected
                    }
                    formData.append('file', file);

                    var fileInput = $('#fileupload2')[0];
                    if (fileInput.files.length > 0) {
                        var fileName = fileInput.files[0].name;
                        formData.append('kind', "F5T13Term");
                    }

                    var url = `${PPIS_path_upload}/file/upload`;
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            console.log('Response:', response);
                                load_table2('supervision', $('#docket_no2').val(), $('#FOId2').val(), "F5T13Term");
                                $('#remarks2').val(''); // Clear the remarks textarea
                                $('#fileupload2').val(''); // Clear the file input
                            
                            $('#uploadButton2').prop('disabled', false).text('Upload');
                        },
                        error: function(xhr, status, error) {
                            console.error('Upload failed: ', error);
                            alert('An error occurred during the upload.');
                            $('#uploadButton2').prop('disabled', false).text('Upload');
                        }
                    });
                });

                            $(document).ready(function () {
                                var table = $('#T_F5T13_b').DataTable({
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                                    "language": {
                                        "lengthMenu": "Show _MENU_ entries", // Customizing the "Show Entries" label
                                    },
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                            ___tableControlsCMPLTD();
                            $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __term()
        var __download_print = function(){

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"
            }
            $('.F5T13_tbody').empty();
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_RCV',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                __counter += 1;
                if(result.status != undefined && result.status == "SUCCESS"){
                    if(result.payload.length > __maxTableSize){
                        __maxTableSize = result.payload.length
                        // console.log(__maxTableSize);
                    }
                    
                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                            r = 1;
                            result.payload.forEach(function(data){
                               data = $.wms.upper($.wms.sanitize(data))
                                //console.log(data);
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                $("#r"+r+"c1").html(data.docket_no.toUpperCase());
                                $("#r"+r+"c2").html(data.probationer);
                                $("#r"+r+"c3").html(data.cc_no);
                                $("#r"+r+"c4").html(data.court_origin);
                                $("#r"+r+"c5").html(data.referral_office);
                                $("#r"+r+"c6").html(data.supervising_officer);
                                $("#r"+r+"c7").html(data.period);
                                $("#r"+r+"c8").html(data.received_date);
                                $("#r"+r+"c9").html(data.case_classification);
                                $("#r"+r+"c10").html(data.field_office).addClass("options");
                                $("#r"+r+"c11").html(source).addClass("options");
                                $("#r"+r+"c12").html("").addClass("options");
                                r += 1;
                            });


                            $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);

                    
                }
                ___checker();
            });


            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_TERM',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                __counter += 1;
                if(result.status != undefined && result.status == "SUCCESS"){
                    if(result.payload.length > __maxTableSize){
                        __maxTableSize = result.payload.length
                        // console.log(__maxTableSize);
                    }
                    
                    function checkPendingRequest() {
                        if ($.active > 0) {
                            console.log("waiting...")
                            window.setTimeout(checkPendingRequest, 100);
                        }
                        else {
                            r = 1;
                            result.payload.forEach(function(data){
                               data = $.wms.upper($.wms.sanitize(data))
                                source = ((data.source==1) ? 'PIS' : 'MANUAL');
                                //console.log(data);
                                //$("#r"+r+"c1").html(data.docket_no.toUpperCase());
                                $("#r"+r+"c13").html("("+data.docket_no.toUpperCase()+") "+data.probationer);
                                $("#r"+r+"c14").html(data.terminated_date);
                                $("#r"+r+"c15").html(data.field_office).addClass("options");
                                $("#r"+r+"c16").html(source).addClass("options");
                                $("#r"+r+"c17").html("").addClass("options");
                                r += 1;
                            });


                            
                              $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);

                    
                }
                ___checker();
            });
        }
        __download_print();

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F5T13_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F5T13_tbody").append(
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
                                "<td id='r"+i+"c10' class='options'>"+
                                "<td id='r"+i+"c11' class='options'>"+
                                "<td id='r"+i+"c12' class='options'>"+
                                "<td id='r"+i+"c13' class=''>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class='options'>"+
                                "<td id='r"+i+"c16' class='options'>"+
                                "<td id='r"+i+"c17' class='options'>"+
                            "</tr>"
                            )
                    }

                }else{
                    // $(".F5T13_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='17' class='center b'>NONE</td>"+
                    //         "</tr>");
                }

            }
            //Download
            $(".btn-download").unbind("click").on("click",function(){
                var form = "Download Caseload Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                var payload = {
                    "created_by" : $.cookie("USER_ID"),
                    "module" : "CASELOAD",
                    "action" : form
                    
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                });
                // var table = $('#T_F5T13').DataTable();
                // $("#T_F5T13").table2excel({
                //     // exclude CSS class
                //     exclude: ".options",
                //     name: "Form5-Table13",
                //     filename: "Form5-Table13.xls", //do not include extension
                //     fileext: ".xls",
                //     preserveColors: true
                //   }); 
                var table = $('#T_F5T13').DataTable();
                var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
                var cloneTable = $("#T_F5T13").clone(); // Clone the table

                // Append the original table's thead (header) to the cloned table
                cloneTable.empty().append($("#T_F5T13 thead").clone());

                // Append all rows to the cloned table
                cloneTable.append($(allData).clone());

                // Export the cloned table to Excel
                cloneTable.table2excel({
                    exclude: ".options", // Exclude CSS class
                    name: "Form5-Table13",
                    filename: "Form5-Table13.xls", // Do not include the extension
                    fileext: ".xls",
                    preserveColors: true,
                    exclude_img: true, // Option to exclude images if present
                    exclude_links: true, // Option to exclude links if present
                    exclude_inputs: true, // Option to exclude input fields if present
                    sheetName: "Form5-Table13" // Custom sheet name
                });
            });
        }

        //ADD
        $(".addRCVSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JCPS', 'CPS'];
            var requiredField= [ 'add_rcv_docket_no','add_rcv_probationer','add_rcv_case_no','add_rcv_court_origin','add_rcv_date_rcv','add_rcv_supervising','add_rcv_period'];          
            var check = true
            var checkTable = ['F5T13_RCV', 'F5T12']        
            
            ___validateSaveCarryOver(allowedDocket,$("#add_rcv_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addRCVSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addRCVProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addRCVCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addRCVSubmitButton").removeClass("hidden")
            $(".addRCVProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addRCVProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_rcv_docket_no").val(),
                "probationer" : $("#add_rcv_probationer").val(),
                "referral_office" : $("#add_rcv_referring_office").val(),
                "received_date" : $("#add_rcv_date_rcv").val(),
                "court_origin" : $("#add_rcv_court_origin").val(),
                "cc_no" : $("#add_rcv_case_no").val(),
                "supervising_officer" : $("#add_rcv_supervising").val(),
                "period" : $("#add_rcv_period").val(),
                "case_classification" : $("#add_rcv_classification").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office" : $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_RCV',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addRCVProceedButton").attr('disabled',false)
                $("#modal-rcv-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T13PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload = {
                "clientType"            : "PROBATIONER",
                "docketNumber"          : $("#add_rcv_docket_no").val(),
                "fullName"              : $("#add_rcv_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "receivedDateByPPO"     : $("#add_rcv_date_rcv").val(),
                "referralData"          : $("#add_rcv_referring_office").val(),
                "courtOfOrigin"         : $("#add_rcv_court_origin").val(),
                "criminalCaseNo"        : $("#add_rcv_case_no").val(),
                "supervisingOfficer"    : $("#add_rcv_supervising").val(),
                "supervisionStartDate"  : $("#add_rcv_period").val(),
                "caseClassification"    : $("#add_rcv_classification").val(),
                "manualDocket"          : false,
                "type"                  : "PIS_CSUP",
            }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            }); 
        })
        //ADD

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            //$(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControlsRCV = function(){
            $(".btn-rcv-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-rcv-delete").modal();

                var payload = {
                    "checkTable" : ['F5T13_TERM'],
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                $(".err_msg").remove()
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                    if(result2.status == 'SUCCESS'){
                        $("<p class='err_msg color-red font_12 i'>*Unable to delete: docket number is listed in "+payload.checkTable.join("/")+"</p>").insertAfter($(".sel-id"));
                        $(".deleteRCVProceedButton").prop('disabled', true);
                    } else {
                        $(".deleteRCVProceedButton").prop('disabled', false);
                    }
                })
            });    

            //Delete
            $(".deleteRCVProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_RCV',JSON.stringify(payload)).done(function (result) {
                    $("#modal-rcv-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteRCVProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T13PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-rcv-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-rcv-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_RCV',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editRCVSubmitButton").removeClass("hidden");
                    $(".editRCVroceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_rcv_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_rcv_id").val(payload.id)
                        $("#edit_rcv_probationer").val(payload.probationer)
                        $("#edit_rcv_referring_office").val(payload.referral_office).trigger("change")
                        $("#edit_rcv_court_origin").val(payload.court_origin)
                        $("#edit_rcv_case_no").val(payload.cc_no)
                        $("#edit_rcv_date_rcv").val(payload.received_date)
                        $("#edit_rcv_supervising").val(payload.supervising_officer)
                        $("#edit_rcv_period").val(payload.period)
                        $("#edit_rcv_classification").val(payload.case_classification)
                        $("#edit_rcv_field_office").val(payload.field_office).trigger("change");
                        $("#edit_rcv_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            });

            $(".editRCVSubmitButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editRCVSubmitButton").addClass("hidden");
                $(".confirmEdit").removeClass("hidden")
                $(".editRCVProceedButton").removeClass("hidden")
            });

            $(".editRCVCancelButton").unbind("click").on("click",function(){
                ___modalReset();
                $(".editRCVSubmitButton").removeClass("hidden")
                $(".editRCVProceedButton").addClass("hidden")
            });


            //Update
            $(".editRCVProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_rcv_id").val(),
                    "docket_no" : $("#edit_rcv_docket_no").val(),
                    "probationer" : $("#edit_rcv_probationer").val(),
                    "referral_office" : $("#edit_rcv_referring_office").val(),
                    "received_date" : $("#edit_rcv_date_rcv").val(),
                    "court_origin" : $("#edit_rcv_court_origin").val(),
                    "cc_no" : $("#edit_rcv_case_no").val(),
                    "supervising_officer" : $("#edit_rcv_supervising").val(),
                    "period" : $("#edit_rcv_period").val(),
                    "case_classification" : $("#edit_rcv_classification").val(),
                    "field_office": $.wms.urlParam('field'),
                    "field_office_id": $.wms.urlParam('officeId'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_RCV',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editRCVProceedButton").addClass("hidden").attr('disabled',false)

                    $("#modal-rcv-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T13PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

        //ADD_CMPLTD
        //ADD
        
        $(".addCMPLTDSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'JCPS', 'CPS' ];
            var requiredField= [ 'add_cmpltd_petitioner','add_cmpltd_date'];
            var check = true
            var checkTable = ['F5T12', 'F5T13_RCV']

            ___validateSave(allowedDocket,$("#add_cmpltd_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addCMPLTDSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addCMPLTDProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addCMPLTDCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addCMPLTDSubmitButton").removeClass("hidden")
            $(".addCMPLTDProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addCMPLTDProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_cmpltd_docket_no").val(),
                "probationer": $("#add_cmpltd_petitioner").val(),
                "terminated_date" : $("#add_cmpltd_date").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office" : $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_TERM',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addCMPLTDProceedButton").attr('disabled',false)
                $("#modal-cmpltd-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF5T13PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload = {
                "clientType"            : "PROBATIONER",
                "docketNumber"          : $("#add_cmpltd_docket_no").val(),
                "fullName"              : $("#add_cmpltd_petitioner").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "PIS_CSUP",
            }
            $.ajax({
                url: `${PPIS_path}/ppis/create`, // Replace with your endpoint URL
                type: 'POST',
                data: JSON.stringify(PPISPayload), // Pass your payload here
                contentType: 'application/json',   // Specify content type for JSON data
                success: function (PPISResult) {
                    console.log(PPISResult);       // Handle success response
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error); // Handle error response
                }
            }); 
        })
        //ADD
        //ADD_CMPLTD

        //CMPLTD

        var ___tableControlsCMPLTD = function(){
            $(".btn-cmpltd-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-cmpltd-delete").modal();
            });    

            //Delete
            $(".deleteCMPLTDProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_TERM',JSON.stringify(payload)).done(function (result) {
                    $("#modal-cmpltd-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteCMPLTDProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF5T13PageEvent();
                       // location.reload();
                        var form = "Delete: Docket no. "+$(".sel-docket").html()+", Form: "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date')
                        var payload = {
                            "created_by" : $.cookie("USER_ID"),
                            "module" : "CASELOAD",
                            "action" : form
                            
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
                            location.reload();
                        });
                    }
                });    
            })

            $(".btn-cmpltd-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-cmpltd-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_TERM',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editCMPLTDSubmitButton").removeClass("hidden");
                    $(".editCMPLTDProceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_cmpltd_docket_no").val(payload.docket_no).attr("disabled",true)
                        $("#edit_cmpltd_id").val(payload.id)
                        $("#edit_cmpltd_petitioner").val(payload.probationer)
                        $("#edit_cmpltd_date").val(payload.terminated_date)
                        $("#edit_cmpltd_field_office").val(payload.field_office).trigger("change");
                        $("#edit_cmpltd_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            });

            $(".editCMPLTDSubmitButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editCMPLTDSubmitButton").addClass("hidden");
                $(".confirmEdit").removeClass("hidden")
                $(".editCMPLTDProceedButton").removeClass("hidden")
            });

            $(".editCMPLTDCancelButton").unbind("click").on("click",function(){
                ___modalReset();
                $(".editCMPLTDSubmitButton").removeClass("hidden")
                $(".editCMPLTDProceedButton").addClass("hidden")
            });


            //Update
            $(".editCMPLTDProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_cmpltd_id").val(),
                    "docket_no" : $("#edit_cmpltd_docket_no").val(),
                    "probationer" : $("#edit_cmpltd_petitioner").val(),
                    "terminated_date" : $("#edit_cmpltd_date").val(),
                    "field_office": $.wms.urlParam('field'),
                    "field_office_id": $.wms.urlParam('officeId'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T13_TERM',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editCMPLTDProceedButton").addClass("hidden").attr('disabled',false)

                    $("#modal-cmpltd-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF5T13PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }

        //CMPLTD

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
                  "formTable"       : 'F5',
                  "requestorId"     : $.cookie("USER_ID"),
                  "createdBy"       : $.cookie("USER_ID"),
                }
                    console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/form/submit',JSON.stringify(payload)).done(function (result) {
                    console.log(result)
                    // location.reload();

                    var form = "Submitted form : "+$.wms.urlParam('form')+", Field: "+ $.wms.urlParam('field')+", Date:"+ $.wms.urlParam('date') + ". ";
                    var payload_audit = {
                        "created_by" : $.cookie("USER_ID"),
                        "module" : "CASELOAD",
                        "action" : form
                        
                    }
                    $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload_audit)).done(function (result) {
                        location.reload();
                    });
                })
            })
        };

        __submitCPPO();
    };


    var __attachF5PCSPageEvent = function() {
        var field_office =  $.wms.urlParam('field')
        var date =  $.wms.urlParam('date')
        $(".office_selected").html(field_office)

        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        var month = monthNames[date.substr(5,6)-1];
        $(".year_selected").html(date.substr(0,4))
        $(".month_selected").html(month)


    };

    

    return {
        attachF5T1PageEvent : __attachF5T1PageEvent,
        attachF5T2PageEvent : __attachF5T2PageEvent,
        attachF5T3PageEvent : __attachF5T3PageEvent,
        attachF5T4PageEvent : __attachF5T4PageEvent,
        attachF5T5PageEvent : __attachF5T5PageEvent,
        attachF5T6PageEvent : __attachF5T6PageEvent,
        attachF5T7PageEvent : __attachF5T7PageEvent,
        attachF5T8PageEvent : __attachF5T8PageEvent,
        attachF5T9PageEvent : __attachF5T9PageEvent,
        attachF5T10PageEvent : __attachF5T10PageEvent,
        attachF5T11PageEvent : __attachF5T11PageEvent,
        attachF5T12PageEvent : __attachF5T12PageEvent,
        attachF5T13PageEvent : __attachF5T13PageEvent,
        attachF5PCSPageEvent : __attachF5PCSPageEvent
    };
}());
