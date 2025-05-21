/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.form21 = (typeof $.wms.form21 !== 'undefined') ? $.wms : {};

$.wms.form21 = (function() {


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
                dtype = $("#"+data).attr('type')
                if($("#"+data).val() == ""){
                    dontSubmit = true;
                    if(dtype == 'text'){
                        $("#"+data).addClass("error_field");
                        $("<p class='err_msg color-red font_12 i'>*Required Field</p>").insertAfter(("#"+data))    
                    }else{
                        $("#select2-"+data+"-container").parent().addClass("error_field");
                        $("<p class='err_msg color-red font_12 i'>*Required Field</p>").insertAfter($("#select2-"+data+"-container"))    

                    }
                    
                }else{
                    if(dtype == 'text'){
                        $("#"+data).removeClass("error_field");
                    }else{
                        $("#select2-"+data+"-container").parent().removeClass("error_field");
                    }
                }
                /*console.log($("#"+data).attr('type'))

                if($("#"+data).val() == ""){
                    dontSubmit = true;
                    $("#"+data).addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*Required Field</p>").insertAfter(("#"+data))
                }else{
                    $("#"+data).removeClass("error_field");
                }*/
            });
            var d = $.Deferred();
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/validateDocket',JSON.stringify(payload)).done(function (result2) {   
                if(result2.status == 'SUCCESS'){

                }else{
                    dontSubmit = true;
                    docket.addClass("error_field")
                    checkTable = checkTable.join("/")
                    $("<p class='err_msg color-red font_12 i'>*Docket not found in "+checkTable+"</p>").insertAfter(docket)
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
            dtype = $("#"+data).attr('type')
            if($("#"+data).val() == ""){
                dontSubmit = true;
                if(dtype == 'text'){
                    $("#"+data).addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*Required Field</p>").insertAfter(("#"+data))    
                }else{
                    $("#select2-"+data+"-container").parent().addClass("error_field");
                    $("<p class='err_msg color-red font_12 i'>*Required Field</p>").insertAfter($("#select2-"+data+"-container"))    

                }
                
            }else{
                if(dtype == 'text'){
                    $("#"+data).removeClass("error_field");
                }else{
                    $("#select2-"+data+"-container").parent().removeClass("error_field");
                }
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

    var __attachF21T1PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F21T1_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T1',JSON.stringify(payload)).done(function (result) {
            
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                   data = $.wms.upper($.wms.sanitize(data))
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F21T1_tbody').append("<tr>"+
                                                "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                                "<td>"+data.petitioner.toUpperCase()+"</td>"+
                                                "<td>"+data.date_rcv+"</td>"+
                                                "<td>"+data.investigating_officer+"</td>"+
                                                "<td class='options'>"+data.field_office+"</td>"+
                                                "<td class='options'>"+source+"</td>"+
                                                "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                                                "<button class='access_f21_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });
            }else{
                console.log("NO FOUND")
                // $('.F21T1_tbody').append("<tr>"+
                //                                 "<td colspan='7' class='center b'>NONE</td>"+
                //                                 "</tr>")
            }

            $(document).ready(function () {
                var table = $('#T_F21T1').DataTable({
                    "drawCallback": function( settings ) {
                            $.wms.reports.form_lock();
                    }
                } );
                $('.dataTables_length').addClass('bs-select');
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
                    "checkTable" : ['F21T2_ACTED'],
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
                    "ID" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T1',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_docket_no").val(payload.docket_no)
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
                "method" : "update"
            }
            console.log(payload)
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T1',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".editProceedButton").attr('disabled',false)
                $("#modal-edit").modal('toggle')
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T1PageEvent();
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
            // var table = $('#T_F21T1').DataTable();
            // $("#T_F21T1").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table1",
            //     filename: "Form21-Table1.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T1').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T1").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T1 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-Table1",
                filename: "Form21-Table1.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-Table1" // Custom sheet name
            }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PPI', 'PECI', 'TPPI', 'TPECI' ];
            var requiredField= [ 'add_petitioner', 'add_date_rcv', 'add_investigating_officer'];
            var check = true
            var checkTable = ['F21T1']

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
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T1',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                $(".btn-reset").trigger("click")    
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T1PageEvent();
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
                "method" : "update"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T1',JSON.stringify(payload)).done(function (result) {
                $("#modal-delete").modal('toggle')
                $(".modal-loader").addClass("hidden")
                $(".deleteProceedButton").attr('disabled',false)
                if(result.status != undefined && result.status == "SUCCESS"){
                   //__attachF21T1PageEvent();
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
    };


    var __attachF21T2PageEvent = function() {
        var __maxTableSize = 0;
        var __counter = 0;

        var __received = function(){
            console.log("received events")
            $('.F21T2_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_RCV',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T2_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner_name.toUpperCase()+"</td>"+
                                    "<td>"+data.case_no+"</td>"+
                                    "<td>"+data.prison_name+ " (" + data.prison_type + ")"+"</td>"+
                                    "<td>"+data.offense+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.investigating_officer_name+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner_name + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-rcv-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> </button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-rcv-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> </button> </td></tr>")
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
                                    <option value="Pre-Parole Referral">Pre-Parole Referral</option>
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
                                load_table("investigation", docketNo, field_office_id, "F21T2RR");
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
                                    formData.append('kind', "F21T2RR");  // Append file name to formData
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
                                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F21T2RR");
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
                                var table = $('#T_F21T2_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                            ___updateRCV_event();
                            $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __received()

        var __acted = function(){
            console.log("received events")
            $('.F21T2_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_ACTED',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T2_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner_name.toUpperCase()+"</td>"+
                                    "<td>"+data.psir_date+"</td>"+
                                    "<td>"+data.ppo_recommendation+"</td>"+
                                    "<td>"+data.transfer_date+"</td>"+
                                    "<td>"+data.transfer_to+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner_name + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-acted-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> </button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-acted-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> </button> </td></tr>")
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
                        <option value="Pre-Parole/Executive Clemency Investigation Report">Pre-Parole/Executive Clemency Investigation Report</option>
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
                    load_table2("investigation", docketNo, field_office_id, "F21T2_RAU");
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
                        formData.append('kind', "F21T2_RAU");
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
                                load_table2('investigation', $('#docket_no2').val(), $('#FOId2').val(), "F21T2_RAU");
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
                                var table = $('#T_F21T2_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                            ___updateACTED_event();
                            $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __acted()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F21T2_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_RCV',JSON.stringify(payload)).done(function (result) {
            
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
                            //console.log(data);\
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.petitioner_name);
                            $("#r"+r+"c3").html(data.case_no);
                            $("#r"+r+"c4").html(data.prison_name + " (" + data.prison_type + ")");
                            $("#r"+r+"c5").html(data.offense);
                            $("#r"+r+"c6").html(data.received_date);
                            $("#r"+r+"c7").html(data.investigating_officer_name);
                            $("#r"+r+"c8").html(data.field_office);
                            $("#r"+r+"c9").html(source);
                            $("#r"+r+"c10").html("");

                            r += 1;
                        });

                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });    

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_ACTED',JSON.stringify(payload)).done(function (result) {
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
                            $("#r"+r+"c11").html(data.petitioner_name + " (" + data.docket_no +")");
                            $("#r"+r+"c12").html(data.psir_date);
                            $("#r"+r+"c13").html(data.ppo_recommendation);
                            $("#r"+r+"c14").html(data.transfer_date);
                            $("#r"+r+"c15").html(data.transfer_to);
                            $("#r"+r+"c16").html(data.field_office);
                            $("#r"+r+"c17").html(source);
                            $("#r"+r+"c18").html("");

                            r += 1;
                        });

                    }
                };
                window.setTimeout(checkPendingRequest, 100);
            }
            ___checker();
        });

        

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T2_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T2_tbody").append(
                            "<tr>"+
                                "<td id='r"+i+"c1' class=''>"+
                                "<td id='r"+i+"c2' class=''>"+
                                "<td id='r"+i+"c3' class=''>"+
                                "<td id='r"+i+"c4' class=''>"+
                                "<td id='r"+i+"c5' class=''>"+
                                "<td id='r"+i+"c6' class=''>"+
                                "<td id='r"+i+"c7' class=''>"+
                                "<td id='r"+i+"c8' class='options'>"+
                                "<td id='r"+i+"c9' class='options'>"+
                                "<td id='r"+i+"c10' class='options'>"+
                                "<td id='r"+i+"c11' class=''>"+
                                "<td id='r"+i+"c12' class=''>"+
                                "<td id='r"+i+"c13' class=''>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class=''>"+
                                "<td id='r"+i+"c16' class='options'>"+
                                "<td id='r"+i+"c17' class='options'>"+
                                "<td id='r"+i+"c18' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T2_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='18' class='center b'>NONE</td>"+
                    //         "</tr>");
                }
            }
        }


        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }
        
        //Add RCV
        $(".addSubmitRCVButton").unbind("click").on("click",function(){

            var allowedDocket= [ 'PPI', 'PECI', 'TPPI', 'TPECI' ];
            var requiredField= [ 'add_rcv_petitioner', 'add_rcv_date_rcv', 'add_rcv_investigating_officer'];
            var check = true
            var checkTable = ['F21T1', 'F21T2_RCV']

            ___validateSaveCarryOver(allowedDocket,$("#add_rcv_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitRCVButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedRCVButton").removeClass("hidden")
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
                "prison_name": $("#add_rcv_court_origin").val(),
                "prison_type": $("#add_rcv_from").val(),
                "offense": $("#add_rcv_offense").val(),
                /*"sentence" : $("#add_rcv_sentence").val(),
                "date_of_court_order": $("#add_rcv_date_of_court_order").val(),*/
                "received_date": $("#add_rcv_date_rcv").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "investigating_officer_name": $("#add_rcv_investigating_officer").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            console.log(payload);
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_RCV',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                ___modalReset();
               
                $(".addSubmitRCVButton").removeClass("hidden")
                $(".addProceedRCVButton").addClass("hidden")
                $("#modal-add-rcv").modal('toggle')
                
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T2PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload = {
                "clientType"            : "PAROLEE",
                "docketNumber"          : $("#add_rcv_docket_no").val(),
                "fullName"              : $("#add_rcv_petitioner").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "criminalCaseNo"        : $("#add_rcv_case_no").val(),
                "prisonName"            : $("#add_rcv_court_origin").val(),
                "offense"               : $("#add_rcv_offense").val(),
                "receivedDateByPPO"     : $("#add_rcv_date_rcv").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "investigatingOfficer"  : $("#add_rcv_investigating_officer").val(),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_INV",
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

            var allowedDocket= [ 'PPI', 'PECI', 'TPPI', 'TPECI' ];
            var requiredField= [ 'add_acted_petitioner'];

            var check = true
            var checkTable = ['F21T1', 'F21T2_RCV']

            ___validateSave(allowedDocket,$("#add_acted_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitACTEDButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedACTEDButton").removeClass("hidden")
                }
            })
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
                "received_date": $("#add_acted_date_rcv").val(),
                "transfer_date": $("#add_acted_transfer_date").val(),
                "transfer_to": $("#add_acted_transfer_to").val(),
                "field_office":$.wms.urlParam('field'),
                "ppo_recommendation" : $("#add_acted_recommendation").val(),
                "Y_M": $.wms.urlParam('date'),
                "field_office_id": $.wms.urlParam('officeId'),
                "source" : "2",
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            console.log(payload);
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_ACTED',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                ___modalReset();

                $(".addSubmitACTEDButton").removeClass("hidden")
                $(".addProceedACTEDButton").addClass("hidden")
                $("#modal-add-acted").modal('toggle')
                
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T2PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload = {
                "clientType"            : "PAROLEE",
                "docketNumber"          : $("#add_acted_docket_no").val(),
                "fullName"              : $("#add_acted_petitioner").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "receivedDateByPPO"     : $("#add_acted_date_rcv").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "dateOfTransfer"        : $("#add_acted_transfer_date").val(),
                "transferredOfficeId"   : $("#add_acted_transfer_to").val(),
                "ppoRecommendation"     : $("#add_acted_recommendation").val(),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_INV",
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
            // $("#T_F21T2").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table2",
            //     filename: "Form21-Table2.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T2').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T2").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T2 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T2",
                filename: "Form21-T_F21T2.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T2" // Custom sheet name
            }); 
        });

        var ___updateRCV_event = function(){

            $(".btn-rcv-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-rcv-delete").modal('toggle');

                var payload = {
                    "checkTable" : ['F21T2_ACTED'],
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
            $(".deleteRCVProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_RCV',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    ___modalReset();
                     $("#modal-rcv-delete").modal('toggle');
                    $(".deleteRCVProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T2PageEvent();
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
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_RCV',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_rcv_docket_no").val(payload.docket_no)
                        $("#edit_rcv_id").val(payload.id)
                        $("#edit_rcv_petitioner").val(payload.petitioner_name)
                        $("#edit_rcv_case_no").val(payload.case_no)
                        $("#edit_rcv_court_origin").val(payload.prison_name)
                        $("#edit_rcv_from").val(payload.prison_type).trigger("change");
                        $("#edit_rcv_offense").val(payload.offense)
                        /*$("#edit_rcv_sentence").val(payload.sentence)
                        $("#edit_rcv_date_of_court_order").val(payload.date_of_court_order)*/
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

            //Update
            //@TODO
            $(".editProceedRCVButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_rcv_id").val(),
                    "docket_no" : $("#edit_rcv_docket_no").val(),
                    "petitioner_name": $("#edit_rcv_petitioner").val(),
                    "date_rcv": $("#edit_date_rcv").val(),
                    "case_no" : $("#edit_rcv_case_no").val(),
                    "offense" :  $("#edit_rcv_offense").val(),
                    "received_date" : $("#edit_rcv_date_rcv").val(),
                    "prison_name": $("#edit_rcv_court_origin").val(),
                    "prison_type": $("#edit_rcv_from").val(),
                    "field_office": $.wms.urlParam('field'),
                    "investigating_officer_name": $("#edit_rcv_investigating_officer").val(),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"
                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_RCV',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    ___modalReset();
                    $("#modal-edit-rcv").modal('toggle')
                    $(".editSubmitRCVButton").removeClass("hidden")
                    $(".editProceedRCVButton").addClass("hidden")
                    $(".editProceedRCVButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T2PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }

        var ___updateACTED_event = function(){

            $(".btn-acted-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-acted-delete").modal('toggle');

                var payload = {
                    "checkTable" : ['F21T4'],
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
            $(".deleteACTEDProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_ACTED',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    ___modalReset();
                     $("#modal-acted-delete").modal('toggle');
                    $(".deleteACTEDProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T2PageEvent();
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
                    "id" : data_id,
                    "method" : "fetchByID"
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_ACTED',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#acted_acted_docket_no").val(payload.docket_no)
                        $("#acted_acted_id").val(payload.id)
                        $("#acted_acted_petitioner").val(payload.petitioner_name)
                        $("#acted_acted_psir").val(payload.psir_date)
                        $("#acted_acted_recommendation").val(payload.ppo_recommendation).trigger("change")
                        $("#acted_acted_transfer_date").val(payload.transfer_date)
                        $("#acted_acted_transfer_to").val(payload.transfer_to)
                        $("#acted_acted_field_office").val(payload.field_office).trigger("change");
                        $("#acted_acted_investigating_officer").val(payload.investigating_officer_name)
                        $("#acted_acted_Y_M").val(payload.Y_M).attr("disabled",true)
                       
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

            //Update
            //@TODO
            $(".editProceedACTEDButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#acted_acted_id").val(),
                    "docket_no" : $("#acted_acted_docket_no").val(),
                    "petitioner_name": $("#acted_acted_petitioner").val(),
                    "psir_date"  : $("#acted_acted_psir").val(),
                    "ppo_recommendation" : $("#acted_acted_recommendation").val(),
                    "transfer_date" : $("#acted_acted_transfer_date").val(),
                    "transfer_to" : $("#acted_acted_transfer_to").val(),
                    "field_office":$.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"
                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T2_ACTED',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    ___modalReset();
                    $("#modal-edit-acted").modal('toggle')
                    $(".editSubmitACTEDButton").removeClass("hidden")
                    $(".editProceedACTEDButton").addClass("hidden")
                    $(".editProceedACTEDButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T2PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }



    };

    var __attachF21T3PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F21T3_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T3',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                    data = $.wms.sanitize(data);
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F21T3_tbody').append("<tr>"+
                                                "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                                "<td>"+data.petitioner.toUpperCase()+"</td>"+
                                                "<td>"+data.psir_date+"</td>"+
                                                "<td>"+(data.psir_rec == "Parole - For Granted" ? data.psir_date : "")+"</td>"+
                                                "<td>"+(data.psir_rec == "Parole - For Denial" ? data.psir_date : "")+"</td>"+
                                                "<td>"+(data.psir_rec == "Commutation - For Granted" ? data.psir_date : "")+"</td>"+
                                                "<td>"+(data.psir_rec == "Commutation - For Denial" ? data.psir_date : "")+"</td>"+
                                                "<td>"+(data.psir_rec == "Conditional Pardon - For Granted" ? data.psir_date : "")+"</td>"+
                                                "<td>"+(data.psir_rec == "Conditional Pardon - For Denial" ? data.psir_date : "")+"</td>"+
                                                "<td>"+(data.psir_rec == "Absolute Pardon - For Granted" ? data.psir_date : "")+"</td>"+
                                                "<td>"+(data.psir_rec == "Absolute Pardon - For Denial" ? data.psir_date : "")+"</td>"+
                                                "<td>"+(data.psir_rec == "Other" ? data.psir_date : "")+"</td>"+
                                                /*"<td>"+data.manifest+"</td>"+*/
                                                "<td>"+data.investigating_officer+"</td>"+
                                                "<td class='options center'>"+data.field_office+"</td>"+
                                                "<td class='options center'>"+source+"</td>"+
                                                "<td width='15%' align='center' class='options'> <button class='access_f21_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                                                "<button class='access_f21_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });
                ___tableControls();
            }else{
                // $(".F21T3_tbody").append(
                //         "<tr>"+
                //             "<td colspan='15' class='center b'>NONE</td>"+
                //         "</tr>");
            }

            $(document).ready(function () {
                var table = $('#T_F21T3').DataTable({
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
            // var table = $('#T_F21T3').DataTable();
            // $("#T_F21T3").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table3",
            //     filename: "Form21-Table3.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T3').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T3").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T3 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T3",
                filename: "Form21-T_F21T3.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T3" // Custom sheet name
            }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PPI', 'PECI', 'TPPI', 'TPECI' ];
            var requiredField= [ 'add_petitioner', 'add_psir', 'add_psir_rec', 'add_investigating_officer'];
            var check = true
            var checkTable = ['F21T2_ACTED','F21T3']

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
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T3',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T3PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".modal-form select").val('').trigger('change');
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
                    "checkTable" : ['F21T4'],
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T3',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T3PageEvent();
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T3',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_docket_no").val(payload.docket_no)
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T3',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T3PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

    };

    var __attachF21T4PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F21T4_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T4',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                    data = $.wms.sanitize(data);
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F21T4_tbody').append("<tr>"+
                        "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                        "<td>"+data.petitioner.toUpperCase()+"</td>"+
                        "<td>"+(data.disposed_decision == "PAROLE - Granted" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "COMMUTATION - Granted" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "CONDITIONAL - Granted" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "ABSOLUTE - Granted" ? data.disposed_date : "")+"</td>"+

                        
                        "<td>"+(data.disposed_decision == "PAROLE - Denial" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "COMMUTATION - Denial" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "CONDITIONAL - Denial" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "ABSOLUTE - Denial" ? data.disposed_date : "")+"</td>"+
                        

                        "<td>"+(data.disposed_decision == "PAROLE - Cancelled" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "COMMUTATION - Cancelled" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "CONDITIONAL - Cancelled" ? data.disposed_date : "")+"</td>"+
                        /*"<td>"+(data.disposed_decision == "ABSOLUTE - Cancelled" ? data.disposed_date : "")+"</td>"+*/

                        "<td>"+(data.disposed_decision == "Died" ? data.disposed_date : "")+"</td>"+
                        "<td>"+(data.disposed_decision == "Others" ? data.disposed_date : "")+"</td>"+
                        
                        
                        "<td class='options center'>"+data.field_office+"</td>"+
                        "<td class='options center'>"+source+"</td>"+
                        "<td align='center' class='options'>" + 
                        "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                        "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> </button> "+
                        "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> </button> </td></tr>")
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
                    <option value="Discharge on Parole">Discharge on Parole</option>
                    <option value="Arrival Report">Arrival Report</option>
                    <option value="Briefing Report">Briefing Report</option>
                    <option value="Certificate of Undertaking">Certificate of Undertaking</option>
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
                load_table("investigation", docketNo, field_office_id, "F21T4");
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
                    formData.append('kind', "F21T4");  // Append file name to formData
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
                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F21T4");
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
                var table = $('#T_F21T4').DataTable({
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
            // var table = $('#T_F21T4').DataTable();
            // $("#T_F21T4").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table4",
            //     filename: "Form21-Table4.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T4').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T4").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T4 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T4",
                filename: "Form21-T_F21T4.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T4" // Custom sheet name
            }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PPI', 'PECI', 'TPPI', 'TPECI' ];
            var requiredField= [ 'add_petitioner','add_psir', 'add_psir_rec'];
            var check = true
            var checkTable = ['F21T2_ACTED', 'F21T3']

            ___validateSave(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){

                    var checkTable2 = ['F21T4']
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
                "disposed_date": $("#add_psir").val(),
                "disposed_decision": $("#add_psir_rec").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T4',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T4PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
            var PPISPayload = {
                "clientType"            : "PAROLEE",
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : $("#add_petitioner").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "receivedDateByPPO"     : $("#add_date_rcv").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_INV",
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
            $(".modal-form select").val('').trigger('change');
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T4',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T4PageEvent();
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T4',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_id").val(payload.id)
                        $("#edit_petitioner").val(payload.petitioner)
                        $("#edit_manifestation").val(payload.manifest)
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
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "petitioner": $("#edit_petitioner").val(),
                    "disposed_decision": $("#edit_psir_rec").val(),
                    "disposed_date": $("#edit_psir").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T4',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T4PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

    };


    var __attachF21T5PageEvent = function() {
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F21T5_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T5',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".form_loader").addClass("hidden")
            $(".result_form").removeClass("hidden")
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(data){
                   data = $.wms.upper($.wms.sanitize(data))
                    source = ((data.source==1) ? 'PIS' : 'MANUAL');
                    $('.F21T5_tbody').append("<tr>"+
                                                "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                                "<td>"+data.petitioner.toUpperCase()+"</td>"+
                                                
                                                "<td class='center'>"+data.referring_office+"</td>"+
                                                "<td class='center'>"+data.received_date+"</td>"+
                                                "<td class='center'>"+data.investigating_officer+"</td>"+
                                                "<td class='center'>"+data.reasons+"</td>"+
                                                "<td class='options center'>"+data.field_office+"</td>"+
                                                "<td class='options center'>"+source+"</td>"+
                                                "<td width='15%' align='center' class='options'> <button class='access_f21_write btn btn-success btn-sm btn-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i> Update</button> "+
                                                "<button class='access_f21_write btn btn-danger btn-sm btn-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i> Delete</button> </td></tr>")
                });
                ___tableControls();
            }else{
                // $(".F21T5_tbody").append(
                //         "<tr>"+
                //             "<td colspan='12' class='center b'>NONE</td>"+
                //         "</tr>");
            }

            $(document).ready(function () {
                var table = $('#T_F21T5').DataTable({
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
            // var table = $('#T_F21T5').DataTable();
            // $("#T_F21T5").append(table.$('tr').clone()).table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table5",
            //     filename: "Form21-Table5.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T5').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T5").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T5 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T5",
                filename: "Form21-T_F21T5.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T5" // Custom sheet name
            }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CPPI', 'CPECI' ];
            var requiredField= [ 'add_petitioner', 'add_date_rcv', 'add_investigating_officer'];
            var check = true
            var checkTable = ['F21T5']

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
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T5',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T5PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".modal-form select").val('').trigger('change');
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
                    "checkTable" : ['F21T6_CMPLTED'],
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T5',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T5PageEvent();
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T5',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_docket_no").val(payload.docket_no)
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T5',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T5PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        
    };

    var __attachF21T6PageEvent = function() {

        var __received = function(){
            console.log("received events")
            $('.F21T6_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_RCV',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T6_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner.toUpperCase()+"</td>"+
                                    "<td>"+data.referring_office+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.reasons+"</td>"+
                                    "<td>"+data.investigating_officer+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-rcv-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-rcv-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                                    <option value="Request for Community Interview">Request for Community Interview</option>
                                    <option value="Indorsement">Indorsement</option>
                                    <option value="General Inter-Office Referral">General Inter-Office Referral</option>
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
                                load_table("investigation", docketNo, field_office_id, "F21T6RR");
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
                                    formData.append('kind', "F21T6RR");  // Append file name to formData
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
                                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F21T6RR");
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
                                var table = $('#T_F21T6_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
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
            $('.F21T6_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll"

            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T6_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.petitioner.toUpperCase()+"</td>"+
                                    "<td>"+data.completed_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.petitioner + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-cmpltd-edit form_lock' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-cmpltd-delete form_lock'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                    <option value="Community Interview Report">Community Interview Report</option>
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
                load_table2("investigation", docketNo, field_office_id, "F21T6CAR");
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
                    formData.append('kind', "F21T6CAR");
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
                            load_table2('investigation', $('#docket_no2').val(), $('#FOId2').val(), "F21T6CAR");
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
                                var table = $('#T_F21T6_b').DataTable({
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
        __car()

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll"
        }
        $('.F21T6_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_RCV',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.petitioner);
                            $("#r"+r+"c3").html(data.referring_office);
                            $("#r"+r+"c4").html(data.received_date);
                            $("#r"+r+"c5").html(data.reasons);
                            $("#r"+r+"c6").html(data.investigating_officer);
                            $("#r"+r+"c7").html(data.field_office).addClass("options");
                            $("#r"+r+"c8").html(source).addClass("options");
                            $("#r"+r+"c9").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControlsRCV();
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //$("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c10").html(data.petitioner + " (" + data.docket_no +")");
                            $("#r"+r+"c11").html(data.completed_date);
                            $("#r"+r+"c12").html(data.field_office).addClass("options");
                            $("#r"+r+"c13").html(source).addClass("options");
                            $("#r"+r+"c14").html("").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControlsCMPLTD();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T6_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T6_tbody").append(
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
                }else{
                    // $(".F21T6_tbody").append(
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
            // $("#T_F21T6").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table6",
            //     filename: "Form21-Table6.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T6').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T6").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T6 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T6",
                filename: "Form21-T_F21T6.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T6" // Custom sheet name
            }); 
        });

        //ADD
        
        $(".addRCVSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CPPI', 'CPECI' ];
            var requiredField= [ 'add_rcv_petitioner', 'add_rcv_date_rcv', 'add_rcv_investigating_officer'];
            var check = true
            var checkTable = ['F21T5', 'F21T6_RCV']

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
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_RCV',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addRCVProceedButton").attr('disabled',false)
                $("#modal-rcv-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T6PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var PPISPayload = {
                "clientType"            : "PAROLEE",
                "docketNumber"          : $("#add_rcv_docket_no").val(),
                "fullName"              : $("#add_rcv_petitioner").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "referringOfficeId"     : $("#add_rcv_referring_office").val(),
                "receivedDateByPPO"     : $("#add_rcv_date_rcv").val(),
                "investigatingOfficer"  : $("#add_rcv_investigating_officer").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_CSINV",
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
            $(".modal-form select").val('').trigger('change');
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
                    "checkTable" : ['F21T6_CMPLTED'],
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
            $(".deleteRCVProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_RCV',JSON.stringify(payload)).done(function (result) {
                    $("#modal-rcv-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteRCVProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T6PageEvent();
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_RCV',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_rcv_docket_no").val(payload.docket_no)
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
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_RCV',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editRCVProceedButton").addClass("hidden").attr('disabled',false)

                    $("#modal-rcv-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T6PageEvent();
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
            var allowedDocket= [ 'CPPI', 'CPECI' ];
            var requiredField= [ 'add_cmpltd_petitioner','add_cmpltd_date'];
            var check = true
            var checkTable = ['F21T5', 'F21T6_RCV']

            ___validateSave(allowedDocket,$("#add_cmpltd_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addCMPLTDSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addCMPLTDProceedButton").removeClass("hidden")
                }
            })
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
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addCMPLTDProceedButton").attr('disabled',false)
                $("#modal-cmpltd-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T6PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
            var PPISPayload = {
                "clientType"            : "PAROLEE",
                "docketNumber"          : $("#add_cmpltd_docket_no").val(),
                "fullName"              : $("#add_cmpltd_petitioner").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_CSINV",
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
                    $("#modal-cmpltd-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteCMPLTDProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T6PageEvent();
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
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_CMPLTD',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_cmpltd_docket_no").val(payload.docket_no)
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
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update"

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T6_CMPLTD',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editCMPLTDProceedButton").addClass("hidden").attr('disabled',false)

                    $("#modal-cmpltd-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T6PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }

        //CMPLTD

    };

    var __attachF21T7PageEvent = function() {
        var __parolees = function(){
            console.log("received events")
            $('.F21T7_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T7_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T7',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T7_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.probation_start+"</td>"+
                                    "<td>"+data.probation_end+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T7_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                                "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T7_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                            $(document).ready(function () {
                                var table = $('#T_F21T7_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var __pardonees = function(){
            console.log("received events")
            $('.F21T7_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T7_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T7',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T7_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.probation_start+"</td>"+
                                    "<td>"+data.probation_end+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T7_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                                "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T7_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                            $(document).ready(function () {
                                var table = $('#T_F21T7_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __pardonees()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T7_PAROL"
        }
        $('.F21T7_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T7',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.case_classification);
                            $("#r"+r+"c4").html(data.supervising_officer);
                            $("#r"+r+"c5").html(data.received_date);
                            $("#r"+r+"c6").html(data.probation_start);
                            $("#r"+r+"c7").html(data.probation_end);
                            $("#r"+r+"c8").html(data.field_office).addClass("options");
                            $("#r"+r+"c9").html(source).addClass("options");
                            $("#r"+r+"c10").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T7_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T7',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //$("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c11").html(data.docket_no);
                            $("#r"+r+"c12").html(data.probationer);
                            $("#r"+r+"c13").html(data.case_classification);
                            $("#r"+r+"c14").html(data.supervising_officer);
                            $("#r"+r+"c15").html(data.received_date);
                            $("#r"+r+"c16").html(data.probation_start);
                            $("#r"+r+"c17").html(data.probation_end);
                            $("#r"+r+"c18").html(data.field_office).addClass("options");
                            $("#r"+r+"c19").html(source).addClass("options");
                            $("#r"+r+"c20").html("").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();
                    }
                };
                window.setTimeout(checkPendingRequest, 100);
                  $.wms.dashboard.formControlCheck()

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T7_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T7_tbody").append(
                            "<tr>"+
                                "<td id='r"+i+"c1' class=''>"+
                                "<td id='r"+i+"c2' class=''>"+
                                "<td id='r"+i+"c3' class=''>"+
                                "<td id='r"+i+"c4' class=''>"+
                                "<td id='r"+i+"c5' class=''>"+
                                "<td id='r"+i+"c6' class=''>"+
                                "<td id='r"+i+"c7' class=''>"+
                                "<td id='r"+i+"c8' class='options'>"+
                                "<td id='r"+i+"c9' class='options'>"+
                                "<td id='r"+i+"c10' class=''>"+
                                "<td id='r"+i+"c11' class=''>"+
                                "<td id='r"+i+"c12' class=''>"+
                                "<td id='r"+i+"c13' class=''>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class=''>"+
                                "<td id='r"+i+"c16' class=''>"+
                                "<td id='r"+i+"c17' class=''>"+
                                "<td id='r"+i+"c18' class='options'>"+
                                "<td id='r"+i+"c19' class='options'>"+
                                "<td id='r"+i+"c20' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T7_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='20' class='center b'>NONE</td>"+
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
            // $("#T_F21T7").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table7",
            //     filename: "Form21-Table7.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T7').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T7").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T7 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T7",
                filename: "Form21-T_F21T7.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T7" // Custom sheet name
            }); 
        });

        //ADD
        

        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PR', 'PD', 'TPR', 'TPD' ];
            var requiredField= [ 'add_probationer', 'add_date_rcv', 'add_supervising','add_start','add_end'];
            var check = true
            var checkTable = ['F21T7_PARDON','F21T7_PAROL','F21T8_PARDON','F21T8_PAROL']

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
                "method" : "insert",
                "table" : $("#add_table").val()
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T7',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-rcv-add").modal('toggle')
                ___modalReset();
                $("#modal-add").modal('toggle')
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T7PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })
        //ADD

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


       
        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var data_table = $(this).data("table");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $(".sel-table").html(data_table)
                $("#modal-delete").modal();

                var checkTable = "";
                if (data_table == "F21T7_PARDON") {
                    checkTable = ['F21T11_PARDON', 'F21T13_PARDON'];
                } else {
                    checkTable = ['F21T11_PAROL','F21T13_PAROL'];
                }
                var payload = {
                    "checkTable" : checkTable,
                    "Y_M" : $.wms.urlParam('date'),
                    "docket_no" : docket_no,
                    "field_office" : $.wms.urlParam('field')
                }
                console.log(payload);
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
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T7',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T7PageEvent();
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
                var table = $(this).data("table");
                var docket_no = $(this).data("docket");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T7',JSON.stringify(payload)).done(function (result2) {
                    console.log(result2);
                    $(".modal-form input").attr("disabled",false);
                    $(".modal-form select").attr("disabled",false);
                    $(".modal-loader2").addClass("hidden")
                    $(".modal-form").removeClass("hidden")
                    $(".confirmEdit").addClass("hidden")
                    $(".editSubmitButton").removeClass("hidden");
                    $(".editroceedButton").addClass("hidden")
                    if(result2.status != undefined && result2.status == "SUCCESS"){
                        var payload = result2.payload;
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_table").val(table).trigger("change").attr("disabled",true)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_date_rcv").val(payload.received_date)
                        $("#edit_case_classification").val(payload.case_classification)
                        $("#edit_supervising").val(payload.supervising_officer)
                        $("#edit_start").val(payload.probation_start)
                        $("#edit_end").val(payload.probation_end)
                        $("#edit_field_office").val(payload.field_office).trigger("change");
                       
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
                    "method" : "update",
                    "table" : $("#edit_table").val()

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T7',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").addClass("hidden").attr('disabled',false)

                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T7PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }


        

    };
   

    var __attachF21T8PageEvent = function() {
        var __parolees = function(){
            console.log("received events")
            $('.F21T8_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T8_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T8',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T8_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.referral_type+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.probation_start+"</td>"+
                                    "<td>"+data.probation_end+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T8_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T8_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                                    <option value="Discharge in Parole">Discharge in Parole</option>
                                    <option value="Arrival Report">Arrival Report</option>
                                    <option value="Briefing Report">Briefing Report</option>
                                    <option value="Certificate of Undertaking">Certificate of Undertaking</option>
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
                                load_table("supervision", docketNo, field_office_id, "F21T8_parolee");
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
                                    formData.append('kind', "F21T8_parolee");  // Append file name to formData
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
                                            load_table('supervision', $('#docket_no').val(), $('#FOId').val(), "F21T8_parolee");
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
                                var table = $('#T_F21T8_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var __pardonees = function(){
            console.log("received events")
            $('.F21T87_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T8_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T8',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T8_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.referral_type+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.probation_start+"</td>"+
                                    "<td>"+data.probation_end+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T8_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T8_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                    <option value="Discharge in Parole">Discharge in Parole</option>
                    <option value="Arrival Report">Arrival Report</option>
                    <option value="Briefing Report">Briefing Report</option>
                    <option value="Certificate of Undertaking">Certificate of Undertaking</option>
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
                load_table2("supervision", docketNo, field_office_id, "F21T8_pardonee");
            });
            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' },
                    { "data": 'version' },
                    { "data": 'remarks' },
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            const rows = meta.settings.json.data.filter(r => r.fileName === data.fileName);
                            const latestVersion = Math.max(...rows.map(r => r.version));
                            
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
                            `;

                            if (rows.length > 1 && data.version === latestVersion) {
                                actions += `
                                    <button class='btn btn-secondary btn-sm btn-showVersions2' data-file_name='${data.fileName}'>
                                        <i class='fa fa-angle-down'></i> Show All Versions
                                    </button>
                                `;
                            }

                            return actions;
                        }
                    }
                ];
            }
            function hideDuplicateRows2() {
                let fileGroups = {};

                $('.table_head2 tbody tr').each(function () {
                    const fileName = $(this).find('td:eq(1)').text().trim();
                    if (!fileGroups[fileName]) {
                        fileGroups[fileName] = [];
                    }
                    fileGroups[fileName].push($(this));
                });

                for (let fileName in fileGroups) {
                    const rows = fileGroups[fileName];
                    rows.sort((a, b) => {
                        const versionA = parseInt(a.find('td:eq(2)').text().trim());
                        const versionB = parseInt(b.find('td:eq(2)').text().trim());
                        return versionB - versionA;
                    });

                    rows.slice(1).forEach(row => row.addClass('hidden'));
                }
            }
            var dataTable = null; // Initialize the variable globally to store the DataTable instance
            function load_table2(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head2 tbody').empty(); // Clear table body for modal2
                }

                // Reinitialize the DataTable for modal2
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
                            json.content.sort((a, b) => 
                                a.fileName === b.fileName ? b.version - a.version : a.fileName.localeCompare(b.fileName)
                            );
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Reuse tableColumns function if structure is identical
                });

                $('.table_head2').on('draw.dt', function () {
                    hideDuplicateRows2(); // Call function specific to modal2
                });
            }
            $('.table_head2').on('click', '.btn-showVersions2', function () {
                const fileName = $(this).data('file_name');
                let rows = [];
                $('.table_head2 tbody tr').each(function () {
                    if ($(this).find('td:eq(1)').text().trim() === fileName) {
                        rows.push($(this));
                    }
                });

                rows.sort((a, b) => {
                    const versionA = parseInt(a.find('td:eq(2)').text().trim());
                    const versionB = parseInt(b.find('td:eq(2)').text().trim());
                    return versionB - versionA;
                });

                rows.forEach((row, index) => index === 0 ? row.removeClass('hidden') : row.toggleClass('hidden'));

                const isHidden = rows.slice(1).some(row => row.hasClass('hidden'));
                $(this).html(isHidden 
                    ? `<i class='fa fa-angle-down'></i> Show All Versions` 
                    : `<i class='fa fa-angle-up'></i> Hide Versions`);
            });

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
                    formData.append('kind', "F21T8_pardonee");
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
                            load_table2('supervision', $('#docket_no2').val(), $('#FOId2').val(), "F21T8_pardonee");
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
                                var table = $('#T_F21T8_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __pardonees()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T8_PAROL"
        }
        $('.F21T8_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T8',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.referral_type);
                            $("#r"+r+"c4").html(data.received_date);
                            $("#r"+r+"c5").html(data.case_classification);
                            $("#r"+r+"c6").html(data.supervising_officer);
                            $("#r"+r+"c7").html(data.probation_start);
                            $("#r"+r+"c8").html(data.probation_end);
                            $("#r"+r+"c9").html(data.field_office).addClass("options");
                            $("#r"+r+"c10").html(source).addClass("options");
                            $("#r"+r+"c11").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T8_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T8',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //$("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c12").html(data.docket_no);
                            $("#r"+r+"c13").html(data.probationer);
                            $("#r"+r+"c14").html(data.referral_type);
                            $("#r"+r+"c15").html(data.received_date);
                            $("#r"+r+"c16").html(data.case_classification);
                            $("#r"+r+"c17").html(data.supervising_officer);
                            $("#r"+r+"c18").html(data.probation_start);
                            $("#r"+r+"c19").html(data.probation_end);
                            $("#r"+r+"c20").html(data.field_office).addClass("options");
                            $("#r"+r+"c21").html(source).addClass("options");
                            $("#r"+r+"c22").html("").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T8_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T8_tbody").append(
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
                                "<td id='r"+i+"c12' class=''>"+
                                "<td id='r"+i+"c13' class=''>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class=''>"+
                                "<td id='r"+i+"c16' class=''>"+
                                "<td id='r"+i+"c17' class=''>"+
                                "<td id='r"+i+"c18' class=''>"+
                                "<td id='r"+i+"c19' class=''>"+
                                "<td id='r"+i+"c20' class='options'>"+
                                "<td id='r"+i+"c21' class='options'>"+
                                "<td id='r"+i+"c22' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T8_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='22' class='center b'>NONE</td>"+
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
            // $("#T_F21T8").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table8",
            //     filename: "Form21-Table8.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T8').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T8").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T8 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T8",
                filename: "Form21-T_F21T8.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T8" // Custom sheet name
            }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PR', 'PD', 'TPR', 'TPD' ];
            var requiredField= [ 'add_probationer', 'add_date_rcv', 'add_supervising'];
            var check = true
            var checkTable = ['F21T7_PARDON','F21T7_PAROL','F21T8_PARDON','F21T8_PAROL']

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
                "cc_no": $("#add_cc_no").val(),
                "court_origin": $("#add_court_origin").val(),
                "referral_type": "SUPERVISION",
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
                "method" : "insert",
                "table" : $("#add_table").val()
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T8',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T8PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });
            var addTableValue = $("#add_table").val(); // Get the value of #add_table
            var clientType;

            if (addTableValue === "F21T8_PAROL") {
                clientType = "PAROLEE";
            } else if (addTableValue === "F21T8_PARDON") {
                clientType = "PARDONEE";
            } else {
                clientType = "UNKNOWN"; // Optional, handle cases where the value doesn't match
            }
            console.log(clientType);
            var PPISPayload = {
                "clientType"            : clientType,
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : $("#add_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "criminalCaseNo"        : $("#add_cc_no").val(),
                "courtOfOrigin"         : $("#add_court_origin").val(),
                "caseClassification"    : $("#add_case_classification").val(),
                "receivedDateByPPO"     : $("#add_date_rcv").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "supervisingOfficer"    : $("#add_supervising").val(),
                "manualDocket"          : false,
                "referralType"          : $("#add_type_referrals").val(),
                "probationStartDate"    : $("#add_start").val(),
                "probationEndDate"      : $("#add_end").val(),
                "type"                  : "SC_PPI_SUP",
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
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                var data_table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $(".sel-table").html(table)
                $("#modal-delete").modal();

                var checkTable = "";
                if (data_table == "F21T8_PARDON") {
                    checkTable = ['F21T11_PARDON', 'F21T13_PARDON'];
                } else {
                    checkTable = ['F21T11_PAROL','F21T13_PAROL'];
                }

                var payload = {
                    "checkTable" : checkTable,
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
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T8',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T8PageEvent();
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
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T8',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_table").val(table).trigger("change")
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
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
                var payload = { 
                    "id" : $("#edit_id").val(),
                    "docket_no" : $("#edit_docket_no").val(),
                    "probationer" : $("#edit_probationer").val(),
                    "received_date" : $("#edit_date_rcv").val(),
                    "case_classification" : $("#edit_case_classification").val(),
                    "supervising_officer" : $("#edit_supervising").val(),
                    "cc_no": $("#edit_cc_no").val(),
                    "court_origin": $("#edit_court_origin").val(),
                    "probation_start" : $("#edit_start").val(),
                    "probation_end" : $("#edit_end").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update",
                    "table" : $("#edit_table").val(),
                    "created_by" : $.cookie("USER_ID"),
                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T8',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T8PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
        

    };
    var __attachF21T9PageEvent = function() {
        var __parolees = function(){
            console.log("received events")
            $('.F21T9_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T9_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T9',JSON.stringify(payload)).done(function (result) {
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
                                SUMMARY = data.disposed_decision == "SUMMARY" ? data.disposed_date : "";
                                INFRACTION = data.disposed_decision == "INFRACTION" ? data.disposed_date : "";
                                DEATH = data.disposed_decision == "DEATH" ? data.disposed_date : "";
                                OTHERS = data.disposed_decision == "OTHERS" ? data.disposed_date : "";
                                $('.F21T9_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+SUMMARY+"</td>"+
                                    "<td>"+INFRACTION+"</td>"+
                                    "<td>"+DEATH+"</td>"+
                                    "<td>"+OTHERS+"</td>"+
                                    "<td>"+data.submitted_report+"</td>"+
                                    "<td>"+data.transfer+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T9_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T9_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                        <option value="Summary Report">Summary Report</option>
                        <option value="Infraction Report">Infraction Report</option>
                        <option value="Death Report">Death Report</option>
                        <option value="Report for Transfer to Other PPO's">Report for Transfer to Other PPO's</option>
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
                    load_table("investigation", docketNo, field_office_id, "F21T9_parolee");
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
                        formData.append('kind', "F21T9_parolee");  // Append file name to formData
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
                                load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F21T9_parolee");
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
                                var table = $('#T_F21T9_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var __pardonees = function(){
            console.log("received events")
            $('.F21T9_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T9_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T9',JSON.stringify(payload)).done(function (result) {
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
                                SUMMARY = data.disposed_decision == "SUMMARY" ? data.disposed_date : "";
                                INFRACTION = data.disposed_decision == "INFRACTION" ? data.disposed_date : "";
                                DEATH = data.disposed_decision == "DEATH" ? data.disposed_date : "";
                                OTHERS = data.disposed_decision == "OTHERS" ? data.disposed_date : "";
                                $('.F21T9_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+SUMMARY+"</td>"+
                                    "<td>"+INFRACTION+"</td>"+
                                    "<td>"+DEATH+"</td>"+
                                    "<td>"+OTHERS+"</td>"+
                                    "<td>"+data.submitted_report+"</td>"+
                                    "<td>"+data.transfer+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T9_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T9_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                    <option value="Summary Report">Summary Report</option>
                    <option value="Infraction Report">Infraction Report</option>
                    <option value="Death Report">Death Report</option>
                    <option value="Report for Transfer to Other PPO's">Report for Transfer to Other PPO's</option>
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
                load_table2("investigation", docketNo, field_office_id, "F21T9_pardonee");
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
                    formData.append('kind', "F21T9_pardonee");
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
                            load_table2('investigation', $('#docket_no2').val(), $('#FOId2').val(), "F21T9_pardonee");
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
                                var table = $('#T_F21T9_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __pardonees()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T9_PAROL"
        }
        $('.F21T9_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T9',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.disposed_decision == "SUMMARY" ? data.disposed_date : "");
                            $("#r"+r+"c4").html(data.disposed_decision == "INFRACTION" ? data.disposed_date : "");
                            $("#r"+r+"c5").html(data.disposed_decision == "DEATH" ? data.disposed_date : "");
                            $("#r"+r+"c6").html(data.disposed_decision == "OTHERS" ? data.disposed_date : "");
                            $("#r"+r+"c7").html(data.submitted_report);
                            $("#r"+r+"c8").html(data.transfer);
                            $("#r"+r+"c9").html(data.field_office).addClass("options");
                            $("#r"+r+"c10").html(source).addClass("options");
                            $("#r"+r+"c11").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T9_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T9',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //$("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c12").html(data.docket_no);
                            $("#r"+r+"c13").html(data.probationer);
                            $("#r"+r+"c14").html(data.disposed_decision == "SUMMARY" ? data.disposed_date : "");
                            $("#r"+r+"c15").html(data.disposed_decision == "INFRACTION" ? data.disposed_date : "");
                            $("#r"+r+"c16").html(data.disposed_decision == "DEATH" ? data.disposed_date : "");
                            $("#r"+r+"c17").html(data.disposed_decision == "OTHERS" ? data.disposed_date : "");
                            $("#r"+r+"c18").html(data.submitted_report);
                            $("#r"+r+"c19").html(data.transfer);
                            $("#r"+r+"c20").html(data.field_office).addClass("options");
                            $("#r"+r+"c21").html(source).addClass("options");
                            $("#r"+r+"c22").html("<button class='access_f21_write btn btn-success btn-xs btn-edit' data-table='F21T9_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                                "<button class='access_f21_write btn btn-danger btn-xs btn-delete' data-table='F21T9_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T9_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T9_tbody").append(
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
                                "<td id='r"+i+"c12' class=''>"+
                                "<td id='r"+i+"c13' class=''>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class=''>"+
                                "<td id='r"+i+"c16' class=''>"+
                                "<td id='r"+i+"c17' class=''>"+
                                "<td id='r"+i+"c18' class=''>"+
                                "<td id='r"+i+"c19' class=''>"+
                                "<td id='r"+i+"c20' class='options'>"+
                                "<td id='r"+i+"c21' class='options'>"+
                                "<td id='r"+i+"c22' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T9_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='22' class='center b'>NONE</td>"+
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
            // $("#T_F21T9").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table9",
            //     filename: "Form21-Table9.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T9').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T9").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T9 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T9",
                filename: "Form21-T_F21T9.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T9" // Custom sheet name
            }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PR', 'PD', 'TPR', 'TPD' ];
            var requiredField;
            var findingsInputValue = $("#add_transfer").val();
            if (findingsInputValue === "") {
                requiredField= [ 'add_table','add_acted_petitioner','add_probationer', 'add_findings'];
            } else {
                requiredField= [ 'add_table','add_acted_petitioner','add_probationer'];
            }
            var check = true
            var checkTable = ['F21T9_PARDON','F21T9_PAROL','F21T10_PARDON','F21T10_PAROL']

            ___validateSaveCarryOver(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addProceedButton").removeClass("hidden")
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
                "submitted_report" : $("#add_submitted_report").val(),
                "transfer" : $("#add_transfer").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert",
                "table" : $("#add_table").val()
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T9',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T9PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
            var addTableValue = $("#add_table").val(); // Get the value of #add_table
            var clientType;

            if (addTableValue === "F21T9_PAROL") {
                clientType = "PAROLEE";
            } else if (addTableValue === "F21T9_PARDON") {
                clientType = "PARDONEE";
            } else {
                clientType = "UNKNOWN"; // Optional, handle cases where the value doesn't match
            }
            console.log(clientType);
            var PPISPayload = {
                "clientType"            : clientType,
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : $("#add_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "dateReportSubmittedToTheBoard"                 : $("#add_submitted").val(),
                "dateReportSubmittedToRDForTransferToOtherPPO"  : $("#add_transfer").val(),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_SUP",
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
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                var data_table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $(".sel-table").html(table)

                $("#modal-delete").modal();

                var checkTable = "";
                if (data_table == "F21T9_PARDON") {
                    checkTable = ['F21T11_PARDON','F21T13_PARDON'];
                } else {
                    checkTable = ['F21T11_PAROL','F21T13_PARDON'];
                }

                var payload = {
                    "checkTable" : checkTable,
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
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T9',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T9PageEvent();
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
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T9',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_table").val(table).trigger("change").attr("disabled",true)
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_findings").val(payload.disposed_decision).trigger("change")
                        $("#edit_submitted").val(payload.disposed_date)
                        $("#edit_submitted_report").val(payload.submitted_report)
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
                    "disposed_date" : $("#edit_submitted").val(),
                    "submitted_report" : $("#edit_submitted_report").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update",
                    "table" : $("#edit_table").val()

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T9',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T9PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };
    
    var __attachF21T10PageEvent = function() {
        var __parolees = function(){
            console.log("received events")
            $('.F21T10_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T10_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T10',JSON.stringify(payload)).done(function (result) {
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
                                SUMMARY = data.submitted_decision == "SUMMARY" ? data.submitted_date : "";
                                INFRACTION = data.submitted_decision == "INFRACTION" ? data.submitted_date : "";
                                DEATH = data.submitted_decision == "DEATH" ? data.submitted_date : "";
                                $('.F21T10_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+SUMMARY+"</td>"+
                                    "<td>"+INFRACTION+"</td>"+
                                    "<td>"+DEATH+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T10_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                        "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T10_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                            $(document).ready(function () {
                                var table = $('#T_F21T10_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var __pardonees = function(){
            console.log("received events")
            $('.F21T10_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T10_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T10',JSON.stringify(payload)).done(function (result) {
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
                                SUMMARY = data.submitted_decision == "SUMMARY" ? data.submitted_date : "";
                                INFRACTION = data.submitted_decision == "INFRACTION" ? data.submitted_date : "";
                                DEATH = data.submitted_decision == "DEATH" ? data.submitted_date : "";
                                $('.F21T10_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+SUMMARY+"</td>"+
                                    "<td>"+INFRACTION+"</td>"+
                                    "<td>"+DEATH+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T10_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                        "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T10_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                            $(document).ready(function () {
                                var table = $('#T_F21T10_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __pardonees()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T10_PAROL"
        }
        $('.F21T10_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T10',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.submitted_decision == "SUMMARY" ? data.submitted_date : "");
                            $("#r"+r+"c4").html(data.submitted_decision == "INFRACTION" ? data.submitted_date : "");
                            $("#r"+r+"c5").html(data.submitted_decision == "DEATH" ? data.submitted_date : "");
                            $("#r"+r+"c6").html(data.supervising_officer);
                            $("#r"+r+"c7").html(data.field_office).addClass("options");
                            $("#r"+r+"c8").html(source).addClass("options");
                            $("#r"+r+"c9").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T10_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T10',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //$("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c10").html(data.docket_no);
                            $("#r"+r+"c11").html(data.probationer);
                            $("#r"+r+"c12").html(data.submitted_decision == "SUMMARY" ? data.submitted_date : "");
                            $("#r"+r+"c13").html(data.submitted_decision == "INFRACTION" ? data.submitted_date : "");
                            $("#r"+r+"c14").html(data.submitted_decision == "DEATH" ? data.submitted_date : "");
                            $("#r"+r+"c15").html(data.supervising_officer);
                            $("#r"+r+"c16").html(data.field_office).addClass("options");
                            $("#r"+r+"c17").html(source).addClass("options");
                            $("#r"+r+"c18").html("").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T10_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T10_tbody").append(
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
                                "<td id='r"+i+"c12' class=''>"+
                                "<td id='r"+i+"c13' class=''>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class=''>"+
                                "<td id='r"+i+"c16' class='options'>"+
                                "<td id='r"+i+"c17' class='options'>"+
                                "<td id='r"+i+"c18' class='options'>"+
                                
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T10_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='18' class='center b'>NONE</td>"+
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
            // $("#T_F21T10").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table10",
            //     filename: "Form21-Table10.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T10').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T10").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T10 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T10",
                filename: "Form21-T_F21T10.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T10" // Custom sheet name
            }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PR', 'PD', 'TPR', 'TPD' ];
            var requiredField= [ 'add_table', 'add_probationer', 'add_submitted', 'add_supervising', 'add_findings'];
            var check = true
            var checkTable = ['F21T9_PARDON','F21T9_PAROL','F21T10_PARDON','F21T10_PAROL']

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
                "method" : "insert",
                "table" : $("#add_table").val()
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T10',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T10PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                var data_table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $(".sel-table").html(table)
                $("#modal-delete").modal();

                var checkTable = "";
                if (data_table == "F21T10_PARDON") {
                    checkTable = ['F21T11_PARDON'];
                } else {
                    checkTable = ['F21T11_PAROL'];
                }

                var payload = {
                    "checkTable" : checkTable,
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
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T10',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T10PageEvent();
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
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $(".sel-table").html(table)
                $("#modal-edit").modal();
                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T10',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_table").val(table).trigger("change").attr("disabled",true);
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
                    "method" : "update",
                    "table" : $("#edit_table").val()

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T10',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T10PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };
    
    
    var __attachF21T11PageEvent = function() {
        var __parolees = function(){
            console.log("received events")
            $('.F21T11_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T11_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T11',JSON.stringify(payload)).done(function (result) {
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
                                FINAL = data.disposed_decision == "FINAL" ? data.disposed_date : "";
                                ARREST = data.disposed_decision == "ARREST" ? data.disposed_date : "";
                                DEATH = data.disposed_decision == "DEATH" ? data.disposed_date : "";
                                OTHERS = data.disposed_decision == "OTHERS" ? data.disposed_date : "";
                                $('.F21T11_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+FINAL+"</td>"+
                                    "<td>"+ARREST+"</td>"+
                                    "<td>"+DEATH+"</td>"+
                                    "<td>"+OTHERS+"</td>"+
                                    "<td>"+data.submitted_report+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T11_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                        "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T11_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                    <option value="Final Release and Discharge">Final Release and Discharge</option>
                    <option value="Arrest/Recommitment">Arrest/Recommitment</option>
                    <option value="Death">Death</option>
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
                load_table("investigation", docketNo, field_office_id, "F21T11_parolee");
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
                    formData.append('kind', "F21T11_parolee");  // Append file name to formData
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
                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F21T11_parolee");
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
                                var table = $('#T_F21T11_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var __pardonees = function(){
            console.log("received events")
            $('.F21T11_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T11_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T11',JSON.stringify(payload)).done(function (result) {
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
                                FINAL = data.disposed_decision == "FINAL" ? data.disposed_date : "";
                                ARREST = data.disposed_decision == "ARREST" ? data.disposed_date : "";
                                DEATH = data.disposed_decision == "DEATH" ? data.disposed_date : "";
                                OTHERS = data.disposed_decision == "OTHERS" ? data.disposed_date : "";
                                $('.F21T11_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+FINAL+"</td>"+
                                    "<td>"+ARREST+"</td>"+
                                    "<td>"+DEATH+"</td>"+
                                    "<td>"+OTHERS+"</td>"+
                                    "<td>"+data.submitted_report+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T11_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T11_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                    <option value="Final Release and Discharge">Final Release and Discharge</option>
                    <option value="Arrest/Recommitment">Arrest/Recommitment</option>
                    <option value="Death">Death</option>
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
                load_table2("investigation", docketNo, field_office_id, "F21T11_pardonee");
            });
            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' },
                    { "data": 'version' },
                    { "data": 'remarks' },
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            const rows = meta.settings.json.data.filter(r => r.fileName === data.fileName);
                            const latestVersion = Math.max(...rows.map(r => r.version));
                            
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
                            `;

                            if (rows.length > 1 && data.version === latestVersion) {
                                actions += `
                                    <button class='btn btn-secondary btn-sm btn-showVersions2' data-file_name='${data.fileName}'>
                                        <i class='fa fa-angle-down'></i> Show All Versions
                                    </button>
                                `;
                            }

                            return actions;
                        }
                    }
                ];
            }
            function hideDuplicateRows2() {
                let fileGroups = {};

                $('.table_head2 tbody tr').each(function () {
                    const fileName = $(this).find('td:eq(1)').text().trim();
                    if (!fileGroups[fileName]) {
                        fileGroups[fileName] = [];
                    }
                    fileGroups[fileName].push($(this));
                });

                for (let fileName in fileGroups) {
                    const rows = fileGroups[fileName];
                    rows.sort((a, b) => {
                        const versionA = parseInt(a.find('td:eq(2)').text().trim());
                        const versionB = parseInt(b.find('td:eq(2)').text().trim());
                        return versionB - versionA;
                    });

                    rows.slice(1).forEach(row => row.addClass('hidden'));
                }
            }
            var dataTable = null; // Initialize the variable globally to store the DataTable instance
            function load_table2(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head2 tbody').empty(); // Clear table body for modal2
                }

                // Reinitialize the DataTable for modal2
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
                            json.content.sort((a, b) => 
                                a.fileName === b.fileName ? b.version - a.version : a.fileName.localeCompare(b.fileName)
                            );
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Reuse tableColumns function if structure is identical
                });

                $('.table_head2').on('draw.dt', function () {
                    hideDuplicateRows2(); // Call function specific to modal2
                });
            }
            $('.table_head2').on('click', '.btn-showVersions2', function () {
                const fileName = $(this).data('file_name');
                let rows = [];
                $('.table_head2 tbody tr').each(function () {
                    if ($(this).find('td:eq(1)').text().trim() === fileName) {
                        rows.push($(this));
                    }
                });

                rows.sort((a, b) => {
                    const versionA = parseInt(a.find('td:eq(2)').text().trim());
                    const versionB = parseInt(b.find('td:eq(2)').text().trim());
                    return versionB - versionA;
                });

                rows.forEach((row, index) => index === 0 ? row.removeClass('hidden') : row.toggleClass('hidden'));

                const isHidden = rows.slice(1).some(row => row.hasClass('hidden'));
                $(this).html(isHidden 
                    ? `<i class='fa fa-angle-down'></i> Show All Versions` 
                    : `<i class='fa fa-angle-up'></i> Hide Versions`);
            });

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
                    formData.append('kind', "F21T11_pardonee");
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
                            load_table2('supervision', $('#docket_no2').val(), $('#FOId2').val(), "F21T11_pardonee");
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
                                var table = $('#T_F21T11_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __pardonees()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T11_PAROL"
        }
        $('.F21T11_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T11',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.disposed_decision == "FINAL" ? data.disposed_date : "");
                            $("#r"+r+"c4").html(data.disposed_decision == "ARREST" ? data.disposed_date : "");
                            $("#r"+r+"c5").html(data.disposed_decision == "DEATH" ? data.disposed_date : "");
                            $("#r"+r+"c6").html(data.disposed_decision == "OTHERS" ? data.disposed_date : "");
                            $("#r"+r+"c7").html(data.submitted_report);
                            $("#r"+r+"c8").html(data.field_office).addClass("options");
                            $("#r"+r+"c9").html(source).addClass("options");
                            $("#r"+r+"c10").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T11_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T11',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //$("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c11").html(data.docket_no);
                            $("#r"+r+"c12").html(data.probationer);
                            $("#r"+r+"c13").html(data.disposed_decision == "FINAL" ? data.disposed_date : "");
                            $("#r"+r+"c14").html(data.disposed_decision == "ARREST" ? data.disposed_date : "");
                            $("#r"+r+"c15").html(data.disposed_decision == "DEATH" ? data.disposed_date : "");
                            $("#r"+r+"c16").html(data.disposed_decision == "OTHERS" ? data.disposed_date : "");
                            $("#r"+r+"c17").html(data.submitted_report);
                            
                            $("#r"+r+"c18").html(data.field_office).addClass("options");
                            $("#r"+r+"c19").html(source).addClass("options");
                            $("#r"+r+"c20").html("<button class='access_f21_write btn btn-success btn-xs btn-edit' data-table='F21T11_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                                "<button class='access_f21_write btn btn-danger btn-xs btn-delete' data-table='F21T11_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T11_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T11_tbody").append(
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
                                "<td id='r"+i+"c12' class=''>"+
                                "<td id='r"+i+"c13' class=''>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class=''>"+
                                "<td id='r"+i+"c16' class=''>"+
                                "<td id='r"+i+"c17' class=''>"+
                                "<td id='r"+i+"c18' class='options'>"+
                                "<td id='r"+i+"c19' class='options'>"+
                                "<td id='r"+i+"c20' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T11_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='18' class='center b'>NONE</td>"+
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
            // $("#T_F21T11").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table11",
            //     filename: "Form21-Table11.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T11').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T11").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T11 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T11",
                filename: "Form21-T_F21T11.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T11" // Custom sheet name
            }); 
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){


            var allowedDocket= [ 'PR', 'PD', 'TPR', 'TPD' ];
            var requiredField= [ 'add_probationer','add_submitted','add_findings'];
            var check = true
            if($("#add_table").val() == "F21T11_PARDON"){
                var checkTable = ['F21T9_PARDON', 'F21T10_PARDON']    
            }else{
                var checkTable = ['F21T9_PAROL', 'F21T10_PAROL']    
            }
            

            ___validateSave(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){


                    var checkTable2 = ['F21T11_PARDON','F21T11_PAROL']

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
                "submitted_report" : $("#add_submitted_report").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert",
                "table" : $("#add_table").val()
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T11',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").attr('disabled',false)
                $(".addProceedButton").addClass("hidden")
                $(".addSubmitButton").removeClass("hidden")
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T11PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });  
            var addTableValue = $("#add_table").val(); // Get the value of #add_table
            var clientType;

            if (addTableValue === "F21T11_PAROL") {
                clientType = "PAROLEE";
            } else if (addTableValue === "F21T11_PARDON") {
                clientType = "PARDONEE";
            } else {
                clientType = "UNKNOWN"; // Optional, handle cases where the value doesn't match
            }
            console.log(clientType);
            var PPISPayload = {
                "clientType"            : clientType,
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : $("#add_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "resolutionType":       $("#add_findings").val(),
                "dateReportSubmittedToTheBoard": $("#add_submitted").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_SUP",
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
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-table").html(table)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T11',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T11PageEvent();
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
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();

                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T11',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_table").val(table).trigger("change").attr("disabled",true)
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_findings").val(payload.disposed_decision).trigger("change")
                        $("#edit_submitted").val(payload.disposed_date)
                        $("#edit_submitted_report").val(payload.submitted_report)
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
                    "disposed_date" : $("#edit_submitted").val(),
                    "submitted_report" : $("#edit_submitted_report").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update",
                    "table" : $("#edit_table").val()

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T11',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T11PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };

    var __attachF21T12PageEvent = function() {
        var __parolees = function(){
            console.log("received events")
            $('.F21T12_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T12_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T12',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T12_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.submitted_date+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T12_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                        "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T12_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                            $(document).ready(function () {
                                var table = $('#T_F21T12_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var __pardonees = function(){
            console.log("received events")
            $('.F21T12_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T12_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T12',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T12_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.submitted_date+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T12_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                        "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T12_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>>")
                            });
                            $(document).ready(function () {
                                var table = $('#T_F21T12_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __pardonees()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T12_PAROL"
        }
        $('.F21T12_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T12',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.submitted_date);
                            $("#r"+r+"c4").html(data.supervising_officer);
                            $("#r"+r+"c5").html(data.field_office).addClass("options");
                            $("#r"+r+"c6").html(source).addClass("options");
                            $("#r"+r+"c7").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T12_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T12',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //$("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c8").html(data.docket_no);
                            $("#r"+r+"c9").html(data.probationer);
                            $("#r"+r+"c10").html(data.submitted_date);
                            $("#r"+r+"c11").html(data.supervising_officer);
                            $("#r"+r+"c12").html(data.field_office).addClass("options");
                            $("#r"+r+"c13").html(source).addClass("options");
                            $("#r"+r+"c14").html("").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T12_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T12_tbody").append(
                            "<tr>"+
                                "<td id='r"+i+"c1' class=''>"+
                                "<td id='r"+i+"c2' class=''>"+
                                "<td id='r"+i+"c3' class=''>"+
                                "<td id='r"+i+"c4' class=''>"+
                                "<td id='r"+i+"c5' class='options'>"+
                                "<td id='r"+i+"c6' class='options'>"+
                                "<td id='r"+i+"c7' class='options'>"+
                                "<td id='r"+i+"c8' class=''>"+
                                "<td id='r"+i+"c9' class=''>"+
                                "<td id='r"+i+"c10' class=''>"+
                                "<td id='r"+i+"c11' class=''>"+
                                "<td id='r"+i+"c12' class='options'>"+
                                "<td id='r"+i+"c13' class='options'>"+
                                "<td id='r"+i+"c14' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T12_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='18' class='center b'>NONE</td>"+
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
            // $("#T_F21T12").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table12",
            //     filename: "Form21-Table12.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T12').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T12").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T12 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T12",
                filename: "Form21-T_F21T12.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T12" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PR', 'PD', 'TPR', 'TPD' ];
            var requiredField= [ 'add_probationer', 'add_submitted', 'add_supervising'];
            var check = true
            var checkTable = ['F21T9_PARDON','F21T9_PAROL','F21T12_PARDON','F21T12_PAROL']

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
                "submitted_date" : $("#add_submitted").val(),
                "supervising_officer": $("#add_supervising").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert",
                "table" : $("#add_table").val()
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T12',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").addClass("hidden")
                $(".addSubmitButton").removeClass("hidden")

                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T12PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                var data_table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-table").html(table)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var checkTable = "";
                if (data_table == "F21T12_PARDON") {
                    checkTable = ['F21T13_PARDON'];
                } else {
                    checkTable = ['F21T13_PAROL'];
                }

                var payload = {
                    "checkTable" : checkTable,
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
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T12',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T12PageEvent();
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
                var table = $(this).data("table");
                console.log(docket_no)
                console.log(table)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();

                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T12',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_table").val(table).trigger("change").attr("disabled",true)
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
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
                    
                    "submitted_date" : $("#edit_submitted").val(),
                    "field_office": $.wms.urlParam('field'),
                    "supervising_officer": $("#edit_supervising").val(),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update",
                    "table" : $("#edit_table").val()

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T12',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T12PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };

    var __attachF21T13PageEvent = function() {
        var __parolees = function(){
            console.log("received events")
            $('.F21T13_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T13_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T13_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.disposed_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T13_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T13_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                    <option value="Approved Transfer of Residence">Approved Transfer of Residence</option>
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
                load_table("investigation", docketNo, field_office_id, "F21T13_parolee");
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
                    formData.append('kind', "F21T13_parolee");  // Append file name to formData
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
                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F21T13_parolee");
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
                                var table = $('#T_F21T13_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var __pardonees = function(){
            console.log("received events")
            $('.F21T13_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T13_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T13',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T14_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.disposed_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T13_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T13_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                    <option value="Discharge in Parole">Discharge in Parole</option>
                    <option value="Arrival Report">Arrival Report</option>
                    <option value="Briefing Report">Briefing Report</option>
                    <option value="Certificate of Undertaking">Certificate of Undertaking</option>
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
                load_table2("investigation", docketNo, field_office_id, "F21T13_pardonee");
            });
            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' },
                    { "data": 'version' },
                    { "data": 'remarks' },
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            const rows = meta.settings.json.data.filter(r => r.fileName === data.fileName);
                            const latestVersion = Math.max(...rows.map(r => r.version));
                            
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
                            `;

                            if (rows.length > 1 && data.version === latestVersion) {
                                actions += `
                                    <button class='btn btn-secondary btn-sm btn-showVersions2' data-file_name='${data.fileName}'>
                                        <i class='fa fa-angle-down'></i> Show All Versions
                                    </button>
                                `;
                            }

                            return actions;
                        }
                    }
                ];
            }
            function hideDuplicateRows2() {
                let fileGroups = {};

                $('.table_head2 tbody tr').each(function () {
                    const fileName = $(this).find('td:eq(1)').text().trim();
                    if (!fileGroups[fileName]) {
                        fileGroups[fileName] = [];
                    }
                    fileGroups[fileName].push($(this));
                });

                for (let fileName in fileGroups) {
                    const rows = fileGroups[fileName];
                    rows.sort((a, b) => {
                        const versionA = parseInt(a.find('td:eq(2)').text().trim());
                        const versionB = parseInt(b.find('td:eq(2)').text().trim());
                        return versionB - versionA;
                    });

                    rows.slice(1).forEach(row => row.addClass('hidden'));
                }
            }
            var dataTable = null; // Initialize the variable globally to store the DataTable instance
            function load_table2(type, uuid, officeId, kind) {
                if (dataTable) {
                    dataTable.destroy();
                    $('.table_head2 tbody').empty(); // Clear table body for modal2
                }

                // Reinitialize the DataTable for modal2
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
                            json.content.sort((a, b) => 
                                a.fileName === b.fileName ? b.version - a.version : a.fileName.localeCompare(b.fileName)
                            );
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Reuse tableColumns function if structure is identical
                });

                $('.table_head2').on('draw.dt', function () {
                    hideDuplicateRows2(); // Call function specific to modal2
                });
            }
            $('.table_head2').on('click', '.btn-showVersions2', function () {
                const fileName = $(this).data('file_name');
                let rows = [];
                $('.table_head2 tbody tr').each(function () {
                    if ($(this).find('td:eq(1)').text().trim() === fileName) {
                        rows.push($(this));
                    }
                });

                rows.sort((a, b) => {
                    const versionA = parseInt(a.find('td:eq(2)').text().trim());
                    const versionB = parseInt(b.find('td:eq(2)').text().trim());
                    return versionB - versionA;
                });

                rows.forEach((row, index) => index === 0 ? row.removeClass('hidden') : row.toggleClass('hidden'));

                const isHidden = rows.slice(1).some(row => row.hasClass('hidden'));
                $(this).html(isHidden 
                    ? `<i class='fa fa-angle-down'></i> Show All Versions` 
                    : `<i class='fa fa-angle-up'></i> Hide Versions`);
            });

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
                    formData.append('kind', "F21T13_pardonee");
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
                            load_table2('supervision', $('#docket_no2').val(), $('#FOId2').val(), "F21T13_pardonee");
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
                                var table = $('#T_F21T14_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __pardonees()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T13_PAROL"
        }
        $('.F21T13_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T13',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.disposed_date);
                            $("#r"+r+"c4").html(data.field_office).addClass("options");
                            $("#r"+r+"c5").html(source).addClass("options");
                            $("#r"+r+"c6").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T13_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T13',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //$("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c7").html(data.docket_no);
                            $("#r"+r+"c8").html(data.probationer);
                            $("#r"+r+"c9").html(data.disposed_date);
                            $("#r"+r+"c10").html(data.field_office).addClass("options");
                            $("#r"+r+"c11").html(source).addClass("options");
                            $("#r"+r+"c12").html("").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T13_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T13_tbody").append(
                            "<tr>"+
                                "<td id='r"+i+"c1' class=''>"+
                                "<td id='r"+i+"c2' class=''>"+
                                "<td id='r"+i+"c3' class=''>"+
                                "<td id='r"+i+"c4' class='options'>"+
                                "<td id='r"+i+"c5' class='options'>"+
                                "<td id='r"+i+"c6' class='options'>"+
                                "<td id='r"+i+"c7' class=''>"+
                                "<td id='r"+i+"c8' class=''>"+
                                "<td id='r"+i+"c9' class=''>"+
                                "<td id='r"+i+"c10' class='options'>"+
                                "<td id='r"+i+"c11' class='options'>"+
                                "<td id='r"+i+"c12' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T13_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='18' class='center b'>NONE</td>"+
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
            // $("#T_F21T13").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table11",
            //     filename: "Form21-Table11.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T13').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T13").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T13 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T13",
                filename: "Form21-T_F21T13.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T13" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'PR', 'PD', 'TPR', 'TPD' ];
            var requiredField= [ 'add_probationer','add_submitted'];
            var check = true
            if($("#add_table").val() == "F21T11_PARDON"){
                var checkTable = ['F21T9_PARDON', 'F21T12_PARDON']    
            }else{
                var checkTable = ['F21T9_PAROL', 'F21T12_PAROL']    
            }
            

            ___validateSave(allowedDocket,$("#add_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){

                    var checkTable2 = ['F21T13_PARDON','F21T13_PAROL']

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
                "disposed_date" : $("#add_submitted").val(),
                "Y_M": $.wms.urlParam('date'),
                "source" : "2",
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert",
                "table" : $("#add_table").val()
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T13',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").addClass("hidden")
                $(".addSubmitButton").removeClass("hidden")

                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T13PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
            var addTableValue = $("#add_table").val(); // Get the value of #add_table
            var clientType;

            if (addTableValue === "F21T13_PAROL") {
                clientType = "PAROLEE";
            } else if (addTableValue === "F21T13_PARDON") {
                clientType = "PARDONEE";
            } else {
                clientType = "UNKNOWN"; // Optional, handle cases where the value doesn't match
            }
            console.log(clientType);
            var PPISPayload = {
                "clientType"            : clientType,
                "docketNumber"          : $("#add_docket_no").val(),
                "fullName"              : $("#add_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "dateOrderReceivedFromTheBoard": $("#add_submitted").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_SUP",
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
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-table").html(table)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();
            });    

            //Delete
            $(".deleteProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = {
                    "id" : $(".sel-id").html(),
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T13',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T13PageEvent();
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
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();

                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T13',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_table").val(table).trigger("change").attr("disabled",true)
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
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
                    "disposed_date" : $("#edit_submitted").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update",
                    "table" : $("#edit_table").val()

                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T13',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T13PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };

    var __attachF21T14PageEvent = function() {
        var __parolees = function(){
            console.log("received events")
            $('.F21T14_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T14_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T14_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.referral_office+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.reasons+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T14_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                        "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T14_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                            $(document).ready(function () {
                                var table = $('#T_F21T14_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var __parolees = function(){
            console.log("received events")
            $('.F21T14_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T14_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T14_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.referral_office+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.reasons+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'> <button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T14_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                        "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T14_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
                            });
                            $(document).ready(function () {
                                var table = $('#T_F21T14_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __parolees()
        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T14_PAROL"
        }
        $('.F21T14_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.referral_office);
                            $("#r"+r+"c4").html(data.received_date);
                            $("#r"+r+"c5").html(data.supervising_officer);
                            $("#r"+r+"c6").html(data.reasons);
                            $("#r"+r+"c7").html(data.case_classification);

                            $("#r"+r+"c8").html(data.field_office).addClass("options");
                            $("#r"+r+"c9").html(source).addClass("options");
                            $("#r"+r+"c10").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T14_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            
                            $("#r"+r+"c11").html(data.docket_no);
                            $("#r"+r+"c12").html(data.probationer);
                            $("#r"+r+"c13").html(data.referral_office);
                            $("#r"+r+"c14").html(data.received_date);
                            $("#r"+r+"c15").html(data.supervising_officer);
                            $("#r"+r+"c16").html(data.reasons);
                            $("#r"+r+"c17").html(data.case_classification);
                            $("#r"+r+"c18").html(data.field_office).addClass("options");
                            $("#r"+r+"c19").html(source).addClass("options");
                            $("#r"+r+"c20").html("<button class='access_f21_write btn btn-success btn-xs btn-edit' data-table='F21T14_PARDON' data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                                "<button class='access_f21_write btn btn-danger btn-xs btn-delete' data-table='F21T14_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 2){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T14_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T14_tbody").append(
                            "<tr>"+
                                "<td id='r"+i+"c1' class=''>"+
                                "<td id='r"+i+"c2' class=''>"+
                                "<td id='r"+i+"c3' class=''>"+
                                "<td id='r"+i+"c4' class=''>"+
                                "<td id='r"+i+"c5' class=''>"+
                                "<td id='r"+i+"c6' class=''>"+
                                "<td id='r"+i+"c7' class=''>"+
                                "<td id='r"+i+"c8' class='options'>"+
                                "<td id='r"+i+"c9' class='options'>"+
                                "<td id='r"+i+"c10' class='options'>"+
                                "<td id='r"+i+"c11' class=''>"+
                                "<td id='r"+i+"c12' class=''>"+
                                "<td id='r"+i+"c13' class=''>"+
                                "<td id='r"+i+"c14' class=''>"+
                                "<td id='r"+i+"c15' class=''>"+
                                "<td id='r"+i+"c16' class=''>"+
                                "<td id='r"+i+"c17' class=''>"+
                                "<td id='r"+i+"c18' class='options'>"+
                                "<td id='r"+i+"c19' class='options'>"+
                                "<td id='r"+i+"c20' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T14_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='18' class='center b'>NONE</td>"+
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
            // $("#T_F21T14").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table11",
            //     filename: "Form21-Table11.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T14').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T14").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T14 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T14",
                filename: "Form21-T_F21T14.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T14" // Custom sheet name
            });
        });

        //Add
        $(".addSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CPD', 'CPR'    ];
            var requiredField= [ 'add_probationer', 'add_date_rcv', 'add_supervising'];
            var check = true
            var checkTable = ['F21T14_PARDON','F21T14_PAROL','F21T15_RCV_PAROL','F21T15_RCV_PARDON']

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
                "case_classification": $("#add_case_classification").val(),
                "probationer" : $("#add_probationer").val(),
                "received_date" : $("#add_date_rcv").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "Y_M": $.wms.urlParam('date'),
                "method" : "update",
                "table" : $("#add_table").val(),
                "referral_office" : $("#add_referring_office").val(),
                "reasons" : $("#add_reasons").val(),
                "supervising_officer" : $("#add_supervising").val(),
                "Y_M" : $.wms.urlParam('date'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert",
                "table" : $("#add_table").val()
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addProceedButton").addClass("hidden")
                $(".addSubmitButton").removeClass("hidden")

                $(".addProceedButton").attr('disabled',false)
                $("#modal-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T14PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
        })

        var ___modalReset = function(){
            $(".modal-form input").attr("disabled",false);
            $(".modal-form select").attr("disabled",false);
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                var data_table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-table").html(table)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var checkTable = "";
                if (data_table == "F21T14_PARDON") {
                    checkTable = ['F21T15_TERM_PARDON'];
                } else {
                    checkTable = ['F21T15_TERM_PAROL'];
                }

                var payload = {
                    "checkTable" : checkTable,
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
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T14PageEvent();
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
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-edit").modal();

                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_table").val(table).trigger("change").attr("disabled",true)
                        $("#edit_docket_no").val(payload.docket_no)
                        $("#edit_id").val(payload.id)
                        $("#edit_probationer").val(payload.probationer)
                        $("#edit_referring_office").val(payload.referral_office).trigger("change")
                        $("#edit_date_rcv").val(payload.received_date)
                        $("#edit_reasons").val(payload.reasons)
                        $("#edit_case_classification").val(payload.case_classification)
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
                    "case_classification": $("#edit_case_classification").val(),
                    "probationer" : $("#edit_probationer").val(),
                    "received_date" : $("#edit_date_rcv").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update",
                    "table" : $("#edit_table").val(),
                    "referral_office" : $("#edit_referring_office").val(),
                    "reasons" : $("#edit_reasons").val(),
                    "supervising_officer" : $("#edit_supervising").val(),
                    "Y_M" : $("#edit_Y_M").val()
                    
                    
                    


                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T14',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editProceedButton").attr('disabled',false)
                    $("#modal-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T14PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }
    };


    var __attachF21T15PageEvent = function() {
        var __a = function(){
            console.log("received events")
            $('.F21T15_tbody_a').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T15_RCV_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T15_tbody_a').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.referral_office+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.period+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T15_RCV_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T15_RCV_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                                    <option value="Letter re Courtesy Supervision">Letter re Courtesy Supervision</option>
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
                                load_table("investigation", docketNo, field_office_id, "F21T15RR_parolee");
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
                                    formData.append('kind', "F21T15RR_parolee");  // Append file name to formData
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
                                            load_table('investigation', $('#docket_no').val(), $('#FOId').val(), "F21T15RR_parolee");
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
                                var table = $('#T_F21T15_a').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __a()
        
        var __b = function(){
            console.log("received events")
            $('.F21T15_tbody_b').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T15_TERM_PAROL"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T15_tbody_b').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.terminated_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal2 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-term-edit form_lock' data-table='F21T15_TERM_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T15_TERM_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                        <option value="Both Parolees and Pardonees">Both Parolees and Pardonees</option>
                        <option value="Referrals Received">Referrals Received</option>
                        <option value="Referrals Terminated">Referrals Terminated</option>
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
                    load_table2("investigation", docketNo, field_office_id, "F21T15TERM_parolee");
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
                        formData.append('kind', "F21T15TERM_parolee");
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
                                load_table2('investigation', $('#docket_no2').val(), $('#FOId2').val(), "F21T15TERM_parolee");
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
                                var table = $('#T_F21T15_b').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __b()
        
        var __c = function(){
            console.log("received events")
            $('.F21T15_tbody_c').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T15_RCV_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T15_tbody_c').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.referral_office+"</td>"+
                                    "<td>"+data.supervising_officer+"</td>"+
                                    "<td>"+data.period+"</td>"+
                                    "<td>"+data.received_date+"</td>"+
                                    "<td>"+data.case_classification+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal3 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-edit form_lock' data-table='F21T15_RCV_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T15_RCV_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                    <option value="Letter re Courtesy Supervision" selected>Letter re Courtesy Supervision</option>
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
                load_table3("investigation", docketNo, field_office_id, "F21T15_pardonee_rcv");
            });

            function tableColumns3() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    { "data": 'fileName' },
                    { "data": 'version' },
                    { "data": 'remarks' },
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            const rows = meta.settings.json.data.filter(r => r.fileName === data.fileName);
                            const latestVersion = Math.max(...rows.map(r => r.version));

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
                            `;

                            if (rows.length > 1 && data.version === latestVersion) {
                                actions += `
                                    <button class='btn btn-secondary btn-sm btn-showVersions3' data-file_name='${data.fileName}'>
                                        <i class='fa fa-angle-down'></i> Show All Versions
                                    </button>
                                `;
                            }

                            return actions;
                        }
                    }
                ];
            }

            function hideDuplicateRows3() {
                let fileGroups = {};

                $('.table_head3 tbody tr').each(function () {
                    const fileName = $(this).find('td:eq(1)').text().trim();
                    if (!fileGroups[fileName]) {
                        fileGroups[fileName] = [];
                    }
                    fileGroups[fileName].push($(this));
                });

                for (let fileName in fileGroups) {
                    const rows = fileGroups[fileName];
                    rows.sort((a, b) => {
                        const versionA = parseInt(a.find('td:eq(2)').text().trim());
                        const versionB = parseInt(b.find('td:eq(2)').text().trim());
                        return versionB - versionA;
                    });

                    rows.slice(1).forEach(row => row.addClass('hidden'));
                }
            }

            var dataTable3 = null; // Initialize the variable globally to store the DataTable instance
            function load_table3(type, uuid, officeId, kind) {
                if (dataTable3) {
                    dataTable3.destroy();
                    $('.table_head3 tbody').empty(); // Clear table body for modal3
                }

                // Reinitialize the DataTable for modal3
                dataTable3 = $('.table_head3').DataTable({
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
                            json.content.sort((a, b) => 
                                a.fileName === b.fileName ? b.version - a.version : a.fileName.localeCompare(b.fileName)
                            );
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns3() // Reuse tableColumns3 function if structure is identical
                });

                $('.table_head3').on('draw.dt', function () {
                    hideDuplicateRows3(); // Call function specific to modal3
                });
            }

            $('.table_head3').on('click', '.btn-showVersions3', function () {
                const fileName = $(this).data('file_name');
                let rows = [];
                $('.table_head3 tbody tr').each(function () {
                    if ($(this).find('td:eq(1)').text().trim() === fileName) {
                        rows.push($(this));
                    }
                });

                rows.sort((a, b) => {
                    const versionA = parseInt(a.find('td:eq(2)').text().trim());
                    const versionB = parseInt(b.find('td:eq(2)').text().trim());
                    return versionB - versionA;
                });

                rows.forEach((row, index) => index === 0 ? row.removeClass('hidden') : row.toggleClass('hidden'));

                const isHidden = rows.slice(1).some(row => row.hasClass('hidden'));
                $(this).html(isHidden 
                    ? `<i class='fa fa-angle-down'></i> Show All Versions` 
                    : `<i class='fa fa-angle-up'></i> Hide Versions`);
            });

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
                    formData.append('kind', "F21T15_pardonee_rcv");
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
                            load_table3('supervision', $('#docket_no3').val(), $('#FOId3').val(), "F21T15_pardonee_rcv");
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
                                var table = $('#T_F21T15_c').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });

                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __c()
        
        var __d = function(){
            console.log("received events")
            $('.F21T15_tbody_d').empty();

            var payload = {
                "Y_M" : $.wms.urlParam('date'),
                "field_office" : $.wms.urlParam('field'),
                "method" : "fetchAll",
                "table" : "F21T15_TERM_PARDON"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
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
                                $('.F21T15_tbody_d').append("<tr>"+
                                    "<td><a class='docket_view' data-docket='"+data.docket_no.toUpperCase()+"' title='View Docket Investigation Record From PIS'>"+data.docket_no.toUpperCase()+"</a></td>"+
                                    "<td>"+data.probationer.toUpperCase()+"</td>"+
                                    "<td>"+data.terminated_date+"</td>"+
                                    "<td class='options field'>"+data.field_office+"</td>"+
                                    "<td class='options'>"+source+"</td>"+
                                    "<td align='center' class='options'>" + 
                                    "<button class='access_f21_write btn btn-success btn-xs btn-attachment-rcv-modal4 form_lock' data-docket='" + data.docket_no.toUpperCase() + "' data-id='" + data.id + "' data-petitioner='" + data.probationer + "' data-field_office_id='" + data.field_office_id + "'><i class='fa fa-upload'></i> </button> " +
                                    "<button class='access_f21_write btn btn-success btn-xs btn-term-edit form_lock' data-table='F21T15_TERM_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                    "<button class='access_f21_write btn btn-danger btn-xs btn-delete form_lock' data-table='F21T15_TERM_PAROL'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>")
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
                        <option value="Both Parolees and Pardonees">Both Parolees and Pardonees</option>
                        <option value="Referrals Received">Referrals Received</option>
                        <option value="Referrals Terminated">Referrals Terminated</option>
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
                    load_table4("investigation", docketNo, field_office_id, "F21T15_pardonee_term");
                });

                function tableColumns4() {
                    return [
                        {
                            "data": null,
                            "render": function (data, type, row, meta) {
                                return meta.settings._iDisplayStart + meta.row + 1;
                            }
                        },
                        { "data": 'fileName' },
                        { "data": 'version' },
                        { "data": 'remarks' },
                        {
                            "data": null,
                            "render": function (data, type, row, meta) {
                                const rows = meta.settings.json.data.filter(r => r.fileName === data.fileName);
                                const latestVersion = Math.max(...rows.map(r => r.version));

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
                                `;

                                if (rows.length > 1 && data.version === latestVersion) {
                                    actions += `
                                        <button class='btn btn-secondary btn-sm btn-showVersions4' data-file_name='${data.fileName}'>
                                            <i class='fa fa-angle-down'></i> Show All Versions
                                        </button>
                                    `;
                                }

                                return actions;
                            }
                        }
                    ];
                }

                function hideDuplicateRows4() {
                    let fileGroups = {};

                    $('.table_head4 tbody tr').each(function () {
                        const fileName = $(this).find('td:eq(1)').text().trim();
                        if (!fileGroups[fileName]) {
                            fileGroups[fileName] = [];
                        }
                        fileGroups[fileName].push($(this));
                    });

                    for (let fileName in fileGroups) {
                        const rows = fileGroups[fileName];
                        rows.sort((a, b) => {
                            const versionA = parseInt(a.find('td:eq(2)').text().trim());
                            const versionB = parseInt(b.find('td:eq(2)').text().trim());
                            return versionB - versionA;
                        });

                        rows.slice(1).forEach(row => row.addClass('hidden'));
                    }
                }

                var dataTable4 = null; // Initialize the variable globally to store the DataTable instance
                function load_table4(type, uuid, officeId, kind) {
                    if (dataTable4) {
                        dataTable4.destroy();
                        $('.table_head4 tbody').empty(); // Clear table body for modal4
                    }

                    // Reinitialize the DataTable for modal4
                    dataTable4 = $('.table_head4').DataTable({
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
                                json.content.sort((a, b) => 
                                    a.fileName === b.fileName ? b.version - a.version : a.fileName.localeCompare(b.fileName)
                                );
                                json.recordsTotal = json.totalElements;
                                json.recordsFiltered = json.totalElements;
                                json.data = json.content;
                                return JSON.stringify(json);
                            }
                        },
                        columns: tableColumns4() // Reuse tableColumns4 function if structure is identical
                    });

                    $('.table_head4').on('draw.dt', function () {
                        hideDuplicateRows4(); // Call function specific to modal4
                    });
                }

                $('.table_head4').on('click', '.btn-showVersions4', function () {
                    const fileName = $(this).data('file_name');
                    let rows = [];
                    $('.table_head4 tbody tr').each(function () {
                        if ($(this).find('td:eq(1)').text().trim() === fileName) {
                            rows.push($(this));
                        }
                    });

                    rows.sort((a, b) => {
                        const versionA = parseInt(a.find('td:eq(2)').text().trim());
                        const versionB = parseInt(b.find('td:eq(2)').text().trim());
                        return versionB - versionA;
                    });

                    rows.forEach((row, index) => index === 0 ? row.removeClass('hidden') : row.toggleClass('hidden'));

                    const isHidden = rows.slice(1).some(row => row.hasClass('hidden'));
                    $(this).html(isHidden 
                        ? `<i class='fa fa-angle-down'></i> Show All Versions` 
                        : `<i class='fa fa-angle-up'></i> Hide Versions`);
                });

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
                        formData.append('kind', "F21T15_pardonee_term");
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
                            load_table4('supervision', $('#docket_no4').val(), $('#FOId4').val(), "F21T15_pardonee_term");

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
                                var table = $('#T_F21T15_d').DataTable({
                                    "drawCallback": function( settings ) {
                                            $.wms.reports.form_lock();
                                    }
                                } );
                                $('.dataTables_length').addClass('bs-select');
                            });


                        ___tableControls();
                          $.wms.dashboard.formControlCheck()
                        }
                    };
                    window.setTimeout(checkPendingRequest, 100);
                }
            });
        }
        __d()

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T15_RCV_PAROL"
        }
        $('.F21T15_tbody').empty();
        $(".form_loader").removeClass("hidden")
        $(".result_form").addClass("hidden")
        $(".sel_field_office2").select2({
           placeholder: "Select Field Office",
        });

        var __maxTableSize = 0;
        var __counter = 0;


        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            //console.log(data);
                            source = ((data.source==1) ? 'PIS' : 'MANUAL');
                            $("#r"+r+"c1").html(data.docket_no);
                            $("#r"+r+"c2").html(data.probationer);
                            $("#r"+r+"c3").html(data.referral_office);
                            $("#r"+r+"c4").html(data.supervising_officer);
                            $("#r"+r+"c5").html(data.period);
                            
                            $("#r"+r+"c6").html(data.received_date);
                            $("#r"+r+"c7").html(data.case_classification);

                            $("#r"+r+"c8").html(data.field_office).addClass("options");
                            $("#r"+r+"c9").html(source).addClass("options");
                            $("#r"+r+"c10").html("").addClass("options");
                            r += 1;
                        });


                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T15_RCV_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            
                            $("#r"+r+"c16").html(data.docket_no);
                            $("#r"+r+"c17").html(data.probationer);
                            $("#r"+r+"c18").html(data.referral_office);
                            $("#r"+r+"c19").html(data.supervising_officer);
                            $("#r"+r+"c20").html(data.period);
                            
                            $("#r"+r+"c21").html(data.received_date);
                            $("#r"+r+"c22").html(data.case_classification);

                            $("#r"+r+"c23").html(data.field_office).addClass("options");
                            $("#r"+r+"c24").html(source).addClass("options");
                            $("#r"+r+"c25").html("").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });


        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T15_TERM_PAROL"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            
                            
                            $("#r"+r+"c11").html(data.probationer  + " (" + data.docket_no +")");
                            $("#r"+r+"c12").html(data.terminated_date);
                            
                            $("#r"+r+"c13").html(data.field_office).addClass("options");
                            $("#r"+r+"c14").html(source).addClass("options");
                            $("#r"+r+"c15").html("").addClass("options");
                            r += 1;
                        });


                        
                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });


        var payload = {
            "Y_M" : $.wms.urlParam('date'),
            "field_office" : $.wms.urlParam('field'),
            "method" : "fetchAll",
            "table" : "F21T15_TERM_PARDON"
        }
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
            console.log(result);
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
                            
                            
                            $("#r"+r+"c26").html(data.probationer  + " (" + data.docket_no +")");
                            $("#r"+r+"c27").html(data.terminated_date);
                            
                            $("#r"+r+"c28").html(data.field_office).addClass("options");
                            $("#r"+r+"c29").html(source).addClass("options");
                            $("#r"+r+"c30").html("<button class='access_f21_write btn btn-success btn-xs btn-term-edit' data-table='F21T15_TERM_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-pencil'></i></button> "+
                                                "<button class='access_f21_write btn btn-danger btn-xs btn-delete' data-table='F21T15_TERM_PARDON'  data-docket='"+data.docket_no.toUpperCase()+"' data-id='"+data.id+"'><i class='fa fa-trash'></i></button> </td></tr>").addClass("options");
                            r += 1;
                        });
                        ___tableControls();  $.wms.dashboard.formControlCheck()
                    }
                };
                window.setTimeout(checkPendingRequest, 100);

                
            }
            ___checker();
        });

        var ___checker = function(){
            if(__counter == 4){
                console.log("FINISH")
                console.log(__maxTableSize);
                if(__maxTableSize > 0){

                    $(".F21T15_tbody").empty()
                    for(i=1;i<=__maxTableSize;i++){
                        $(".F21T15_tbody").append(
                            "<tr>"+
                                "<td id='r"+i+"c1' class=''>"+
                                "<td id='r"+i+"c2' class=''>"+
                                "<td id='r"+i+"c3' class=''>"+
                                "<td id='r"+i+"c4' class=''>"+
                                "<td id='r"+i+"c5' class=''>"+
                                "<td id='r"+i+"c6' class=''>"+
                                "<td id='r"+i+"c7' class=''>"+
                                "<td id='r"+i+"c8' class='options'>"+
                                "<td id='r"+i+"c9' class='options'>"+
                                "<td id='r"+i+"c10' class='options'>"+
                                "<td id='r"+i+"c11' class=''>"+
                                "<td id='r"+i+"c12' class=''>"+
                                "<td id='r"+i+"c13' class='options'>"+
                                "<td id='r"+i+"c14' class='options'>"+
                                "<td id='r"+i+"c15' class='options'>"+
                                "<td id='r"+i+"c16' class=''>"+
                                "<td id='r"+i+"c17' class=''>"+
                                "<td id='r"+i+"c18' class=''>"+
                                "<td id='r"+i+"c19' class=''>"+
                                "<td id='r"+i+"c20' class=''>"+
                                "<td id='r"+i+"c21' class=''>"+
                                "<td id='r"+i+"c22' class=''>"+
                                "<td id='r"+i+"c23' class='options'>"+
                                "<td id='r"+i+"c24' class='options'>"+
                                "<td id='r"+i+"c25' class='options'>"+
                                "<td id='r"+i+"c26' class=''>"+
                                "<td id='r"+i+"c27' class=''>"+
                                "<td id='r"+i+"c28' class='options'>"+
                                "<td id='r"+i+"c29' class='options'>"+
                                "<td id='r"+i+"c30' class='options'>"+
                            "</tr>"
                            )
                    }
                }else{
                    // $(".F21T15_tbody").append(
                    //         "<tr>"+
                    //             "<td colspan='30' class='center b'>NONE</td>"+
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
            // $("#T_F21T15").table2excel({
            //     // exclude CSS class
            //     exclude: ".options",
            //     name: "Form21-Table11",
            //     filename: "Form21-Table11.xls", //do not include extension
            //     fileext: ".xls",
            //     preserveColors: true
            //   }); 
            var table = $('#T_F21T15').DataTable();
            var allData = table.rows({ search: 'applied' }).nodes(); // Get all rows, considering the current search/filter
            var cloneTable = $("#T_F21T15").clone(); // Clone the table

            // Append the original table's thead (header) to the cloned table
            cloneTable.empty().append($("#T_F21T15 thead").clone());

            // Append all rows to the cloned table
            cloneTable.append($(allData).clone());

            // Export the cloned table to Excel
            cloneTable.table2excel({
                exclude: ".options", // Exclude CSS class
                name: "Form21-T_F21T15",
                filename: "Form21-T_F21T15.xls", // Do not include the extension
                fileext: ".xls",
                preserveColors: true,
                exclude_img: true, // Option to exclude images if present
                exclude_links: true, // Option to exclude links if present
                exclude_inputs: true, // Option to exclude input fields if present
                sheetName: "Form21-T_F21T15" // Custom sheet name
            });
        });

        //RCV
        //Add
        $(".addRCVSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CPD', 'CPR'    ];
            var requiredField= [ 'add_rcv_probationer', 'add_rcv_date_rcv', 'add_rcv_supervising'];
            var check = true
            var checkTable = ['F21T15_TERM_PARDON','F21T15_TERM_PAROL']
            
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
                "case_classification": $("#add_rcv_case_classification").val(),
                "probationer" : $("#add_rcv_probationer").val(),
                "received_date" : $("#add_rcv_date_rcv").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
                "Y_M": $.wms.urlParam('date'),
                "method" : "update",
                "table" : $("#add_rcv_table").val(),
                "referral_office" : $("#add_rcv_referring_office").val(),
                "period" : $("#add_rcv_period").val(),
                "supervising_officer" : $("#add_rcv_supervising").val(),
                "Y_M" : $.wms.urlParam('date'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert",
            }
            console.log(payload);
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addRCVProceedButton").addClass("hidden")
                $(".addRCVSubmitButton").removeClass("hidden")

                $(".addRCVProceedButton").attr('disabled',false)
                $("#modal-rcv-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T15PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
            var addTableValue = $("#add_rcv_table").val(); // Get the value of #add_table
            var clientType;

            if (addTableValue === "F21T15_RCV_PAROL") {
                clientType = "PAROLEE";
            } else if (addTableValue === "F21T15_RCV_PARDON") {
                clientType = "PARDONEE";
            } else {
                clientType = "UNKNOWN"; // Optional, handle cases where the value doesn't match
            }
            console.log(clientType);
            var PPISPayload = {
                "clientType"            : clientType,
                "docketNumber"          : $("#add_rcv_docket_no").val(),
                "fullName"              : $("#add_rcv_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "caseClassification"    : $("#add_rcv_case_classification").val(),
                "receivedDateByPPO"     : $("#add_rcv_date_rcv").val(),
                "referralData"          : $("#add_rcv_referring_office").val(),
                "supervisionStartDate"  : $("#add_rcv_period").val(),
                "supervisingOfficer"    : $("#add_rcv_supervising").val(),
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_CSUP",
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

        //ADD TERM
        //RCV
        //Add
        $(".addTERMSubmitButton").unbind("click").on("click",function(){
            var allowedDocket= [ 'CPD', 'CPR'    ];
            var requiredField= [ 'add_term_probationer','add_term_date_terminated'];
            var check = true
            if($("#add_table").val() == "F21T15_TERM_PARDON"){
                var checkTable = ['F21T14_PARDON', 'F21T15_RCV_PARDON']    
            }else{
                var checkTable = ['F21T14_PAROL', 'F21T15_RCV_PAROL']    
            }
            

            ___validateSave(allowedDocket,$("#add_term_docket_no"),requiredField,check,checkTable).done(function(result){
                if(result){
                    $(".modal-form input").attr("disabled",true);
                    $(".modal-form select").attr("disabled",true);
                    $(".addTERMSubmitButton").addClass("hidden");
                    $(".confirmAdd").removeClass("hidden")
                    $(".addTERMProceedButton").removeClass("hidden")
                }
            });
        });

        $(".addTERMCancelButton").unbind("click").on("click",function(){
            ___modalReset();
            $(".addTERMSubmitButton").removeClass("hidden")
            $(".addTERMProceedButton").addClass("hidden")
           
        });

        //Add
        $(".addTERMProceedButton").unbind("click").on("click",function(){
            $(this).attr('disabled',true)
            $(".modal-loader").removeClass("hidden")
            var payload = { 
                "docket_no" : $("#add_term_docket_no").val(),
                "probationer" : $("#add_term_probationer").val(),
                "terminated_date" : $("#add_term_date_terminated").val(),
                "field_office": $.wms.urlParam('field'),
                "field_office_id": $.wms.urlParam('officeId'),
               
                "method" : "update",
                "table" : $("#add_term_table").val(),
                "Y_M" : $.wms.urlParam('date'),
                "created_by" : $.cookie("USER_ID"),
                "method" : "insert",
            }
            console.log(payload);
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
                $(".modal-loader").addClass("hidden")
                $(".addTERMProceedButton").addClass("hidden")
                $(".addTERMSubmitButton").removeClass("hidden")

                $(".addTERMProceedButton").attr('disabled',false)
                $("#modal-term-add").modal('toggle')
                ___modalReset();
                if(result.status != undefined && result.status == "SUCCESS"){
                    //__attachF21T15PageEvent();
                    location.reload();
                }else{
                    //Error Prompt
                }
            });    
            var addTableValue = $("#add_term_table").val(); // Get the value of #add_table
            var clientType;

            if (addTableValue === "F21T15_TERM_PAROL") {
                clientType = "PAROLEE";
            } else if (addTableValue === "F21T15_TERM_PARDON") {
                clientType = "PARDONEE";
            } else {
                clientType = "UNKNOWN"; // Optional, handle cases where the value doesn't match
            }
            console.log(clientType);
            var PPISPayload = {
                "clientType"            : clientType,
                "docketNumber"          : $("#add_term_docket_no").val(),
                "fullName"              : $("#add_term_probationer").val(),
                "firstName"             : null,
                "middleName"            : null,
                "lastName"              : null,
                "suffixName"            : null,
                "fieldOfficeId"         : $.wms.urlParam('officeId'),
                "manualDocket"          : false,
                "type"                  : "SC_PPI_CSUP",
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
            $(".modal-form select").val('').trigger('change');
            $(".confirmAdd").addClass("hidden")
            $(".btn-reset").trigger('click');
        }


        var ___tableControls = function(){
            $(".btn-delete").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-table").html(table)
                $(".sel-id").html(data_id)
                $("#modal-delete").modal();

                var checkTable = "";
                if (data_table == "F21T15_RCV_PARDON") {
                    checkTable = ['F21T15_TERM_PARDON'];
                } else {
                    checkTable = ['F21T15_TERM_PAROL'];
                }

                var payload = {
                    "checkTable" : checkTable,
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
                    "table" : $(".sel-table").html(),
                    "status" : "0",
                    "created_by" : $.cookie("USER_ID"),
                    "method" : "update"
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
                    $("#modal-delete").modal('toggle')
                    $(".modal-loader").addClass("hidden")
                    $(".deleteProceedButton").attr('disabled',false)
                    if(result.status != undefined && result.status == "SUCCESS"){
                       //__attachF21T15PageEvent();
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
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-rcv-edit").modal();

                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_rcv_table").val(table).trigger("change").attr("disabled",true)
                        $("#edit_rcv_docket_no").val(payload.docket_no)
                        $("#edit_rcv_id").val(payload.id)
                        $("#edit_rcv_probationer").val(payload.probationer)
                        $("#edit_rcv_referring_office").val(payload.referral_office).trigger("change")
                        $("#edit_rcv_date_rcv").val(payload.received_date)
                        $("#edit_rcv_period").val(payload.period)
                        $("#edit_rcv_case_classification").val(payload.case_classification)
                        $("#edit_rcv_supervising").val(payload.supervising_officer)
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

            $(".editCancelButton").unbind("click").on("click",function(){
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
                    "case_classification": $("#edit_rcv_case_classification").val(),
                    "probationer" : $("#edit_rcv_probationer").val(),
                    "received_date" : $("#edit_rcv_date_rcv").val(),
                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update",
                    "table" : $("#edit_rcv_table").val(),
                    "referral_office" : $("#edit_rcv_referring_office").val(),
                    "period" : $("#edit_rcv_period").val(),
                    "supervising_officer" : $("#edit_rcv_supervising").val(),
                   
                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editRCVProceedButton").attr('disabled',false)
                    $(".editRCVProceedButton").addClass("hidden")
                    $(".editRCVSubmitButton").removeClass("hidden")
                    $("#modal-rcv-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T15PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })



            $(".btn-term-edit").unbind("click").on("click",function(){
                var data_id = $(this).data("id");
                var docket_no = $(this).data("docket");
                var table = $(this).data("table");
                console.log(docket_no)
                //console.log(data);
                $(".sel-docket").html(docket_no)
                $(".sel-id").html(data_id)
                $("#modal-term-edit").modal();

                var payload = {
                    "id" : data_id,
                    "method" : "fetchByID",
                    "table" : table
                }
                $(".modal-loader2").removeClass("hidden")
                $(".modal-form").addClass("hidden")
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result2) {
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
                        $("#edit_term_table").val(table).trigger("change").attr("disabled",true)
                        $("#edit_term_docket_no").val(payload.docket_no)
                        $("#edit_term_id").val(payload.id)
                        $("#edit_term_probationer").val(payload.probationer)
                        $("#edit_term_date_terminated").val(payload.terminated_date)
                        $("#edit_term_field_office").val(payload.field_office).trigger("change");
                        $("#edit_term_Y_M").val(payload.Y_M)
                       
                    }else{
                        alert("[Error] Please try again...")
                    }
                });
            });

            $(".editTERMSubmitButton").unbind("click").on("click",function(){
                $(".modal-form input").attr("disabled",true);
                $(".modal-form select").attr("disabled",true);
                $(".editTERMSubmitButton").addClass("hidden");
                $(".confirmEdit").removeClass("hidden")
                $(".editTERMProceedButton").removeClass("hidden")
            });

            $(".editTERMCancelButton").unbind("click").on("click",function(){
                ___modalReset();
                $(".editTERMSubmitButton").removeClass("hidden")
                $(".editTERMProceedButton").addClass("hidden")
            });


            //Update
            $(".editTERMProceedButton").unbind("click").on("click",function(){
                $(this).attr('disabled',true)
                $(".modal-loader").removeClass("hidden")
                var payload = { 
                    "id" : $("#edit_term_id").val(),
                    "docket_no" : $("#edit_term_docket_no").val(),
                    "case_classification": $("#edit_term_case_classification").val(),
                    "probationer" : $("#edit_term_probationer").val(),
                    "terminated_date" : $("#edit_term_date_terminated").val(),

                    "field_office": $.wms.urlParam('field'),
                    "Y_M": $.wms.urlParam('date'),
                    "method" : "update",
                    "table" : $("#edit_term_table").val(),
                    "Y_M" : $("#edit_term_Y_M").val()
                }
                console.log(payload)
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F21T15',JSON.stringify(payload)).done(function (result) {
                    $(".modal-loader").addClass("hidden")
                    $(".editTERMProceedButton").attr('disabled',false)
                    $(".editTERMProceedButton").addClass("hidden")
                    $(".editTERMSubmitButton").removeClass("hidden")
                    $("#modal-term-edit").modal('toggle')
                    ___modalReset();
                    if(result.status != undefined && result.status == "SUCCESS"){
                        //__attachF21T15PageEvent();
                        location.reload();
                    }else{
                        //Error Prompt
                    }
                });    
            })
        }


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
                  "formTable"       : 'F21',
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




    var __attachF21PCSPageEvent = function() {
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
        attachF21T1PageEvent : __attachF21T1PageEvent,
        attachF21T2PageEvent : __attachF21T2PageEvent,
        attachF21T3PageEvent : __attachF21T3PageEvent,
        attachF21T4PageEvent : __attachF21T4PageEvent,
        attachF21T5PageEvent : __attachF21T5PageEvent,
        attachF21T6PageEvent : __attachF21T6PageEvent,
        attachF21T7PageEvent : __attachF21T7PageEvent,
        attachF21T8PageEvent : __attachF21T8PageEvent,
        attachF21T9PageEvent : __attachF21T9PageEvent,
        attachF21T10PageEvent : __attachF21T10PageEvent,
        attachF21T11PageEvent : __attachF21T11PageEvent,
        attachF21T12PageEvent : __attachF21T12PageEvent,
        attachF21T13PageEvent : __attachF21T13PageEvent,
        attachF21T14PageEvent : __attachF21T14PageEvent,
        attachF21T15PageEvent : __attachF21T15PageEvent,
        attachF21PCSPageEvent : __attachF21PCSPageEvent
    };
}());
