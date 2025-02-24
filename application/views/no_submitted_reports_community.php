<?php $this->load->view('templates/header.php'); ?> 
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 
<br/>
<div class="row">
    <div class="col-md-12">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <span class="font_20"> <b>NOTIFICATION:  Field Offices without Caseload Report in the System</b>
                <span class="pull-right">
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAdd_no_report">
                        <i class="fa fa-plus-circle"></i> Add No Report
                    </button>
                </span>
            </div>
            <div class="panel-body"><br>
                <div id="result_table">
                    <table id="no_report_table" class="display table-bordered table-condensed nowrap" style="width:100%">
                        <thead class="tb-header small">
                            <tr>
                                <th style="text-align: center;">FIELD OFFICE</th>
                                <th style="text-align: center;">REGION</th>
                                <th style="text-align: center;">MONTH-YEAR</th>
                                <th style="text-align: center;">ACTION</th>
                            </tr>
                        </thead>
                        <tbody class="tbody-sm" style="text-align:center"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalDelete" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Report</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="alert alert-success hidden" role="alert">
                    Successfully Deleted!
                </div>
                <div class="alert alert-danger hidden" role="alert">
                    Error Deleting!
                </div>
                <p>Are you sure you want to delete this report?</p>
                <input type="hidden" id="delete_id">
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" id="confirmDelete">Delete</button>
            </div>
        </div>
    </div>
</div>
</body>
<?php $this->load->view('templates/footer.php'); ?> 
<?php $this->load->view('templates/admin_footer.php'); ?> 

<script type="text/javascript">
	$( window ).ready(function() {
        setTimeout(function () {
        	if($.wms.dashboard.checkPermission("7")){
	      		$.wms.dashboard.attachPageEvent();
	         	$.wms.modal.attachModalEvent();
	      		
	      		$(".loading-data").fadeOut();
	      		$('.filter-modal select').css('width', '100%')
	      		$(".select2").select2({
				        placeholder: "Select a form",
				        width: '100%'
				    });
	      		//$(".sel-date2").datepicker()

	          $.wms.widget.attachWidgetEvent();
      		}
        }, 200);
   });
$(document).ready(function () {
    
	var origin = window.location.origin + "/";
	function formatFullName(report) {
	    let fullName = `${report.first_name || ''} ${report.middle_name || ''} ${report.last_name || ''}`;
	    
	    // Add suffix if it exists
	    if (report.suffix) {
	        fullName += `, ${report.suffix}`;
	    }
	    // Trim extra spaces and return
	    return fullName.trim();
	}
    function fetchReports() {
	    console.log('Fetching reports...');
	    
	    $.ajax({
		    url: origin + `ppa-cmis-api_origin/wsv1/no_reports/get_reports/F53`,
		    type: 'GET',
		    dataType: 'json',
		    success: function (data) {
		        // Log the data to inspect its structure
		        console.log('Received Data:', data);

		        // Ensure that data is sorted by 'id' in descending order
		        data.sort(function(a, b) {
		            return parseInt(b.id) - parseInt(a.id);  // Ensure the id is treated as an integer
		        });


		        if ($.fn.DataTable.isDataTable('#no_report_table')) {
		            $('#no_report_table').DataTable().clear().destroy();
		        }

		        $('#no_report_table tbody').empty();

		        $.each(data, function (index, report) {
		            $('#no_report_table tbody').append(`
		                <tr>
		                    <td>${report.office}</td>
		                    <td>${report.region_name}</td>
		                    <td>${report.month_year}</td>
		                    <td>
		                        <button class="btn btn-primary btn-sm btn_update_no_reports" data-id="${report.id}">Edit</button>
		                        <button class="btn btn-danger btn-sm btn-delete" data-id="${report.id}">Delete</button>
		                    </td>
		                </tr>
		            `);
		        });

		        $('#no_report_table').DataTable(); // Reinitialize DataTable
		    },
		    error: function (xhr, status, error) {
		        console.error('AJAX Error:', error);
		    }
		});

	}

    fetchReports();

	$('.btn_no_reports').on('click', function() {
	    $(".alert-success").addClass('hidden');
	    $(".alert-danger").addClass('hidden');

	    var payload = {
	        "office": $("#office_no_report").val(),
	        "month_year": $("#no_report_date").val(),
	        "office_id": $("#office_no_report").find(":selected").attr("data-id"),
			"type": "F53",
	    };

	    $.ajax({
            url: origin+`ppa-cmis-api_origin/wsv1/no_reports/create_report`,
	        type: 'POST', // HTTP Method
	        contentType: 'application/json', // Content-Type Header
	        data: JSON.stringify(payload), // Convert to JSON string
	        dataType: 'json', // Expected Response Type
	        success: function(result) {
	            if (result.status !== "ERROR") {
	                $(".alert-success").removeClass('hidden');
	                $(".alert-danger").addClass('hidden');

					fetchReports();
	                // Hide modal after 1.5 seconds
	                setTimeout(function() {
	                	$(".alert-success").addClass('hidden');
	                    $('#modalAdd_no_report').modal('hide');
                    	clearAddForm()
	                }, 1500);
	            } else {
	                $(".alert-danger").removeClass('hidden');
	                $(".alert-success").addClass('hidden');
	            }
	        },
	        error: function() {
	            $(".alert-danger").removeClass('hidden');
	        }
	    });
	});

	function clearAddForm() {
	    $("#office_no_report").val('All').trigger('change'); // Clear office selection
	    $("#no_report_date").val(''); // Clear date field
	}
	$(document).on('click', '.btn_update_no_reports', function() {
	    var reportId = $(this).data('id'); // Get report ID from button attribute

	    $.ajax({
	        url: origin + `ppa-cmis-api_origin/wsv1/no_reports/get_report/${reportId}`,
	        type: 'GET',
	        dataType: 'json',
	        success: function(report) {
	            if (report) {
	            	console.log(report)
	                // Populate modal fields with the fetched report data
	                $("#update_report_id").val(report.id);
	                $("#update_office_no_report").val(report.office).trigger('change');
	                $("#update_no_report_date").val(report.month_year);

	                // Show the update modal
	                $('#modalUpdate_no_report').modal('show');
	            }
	        },
	        error: function() {
	            alert("Failed to fetch report details.");
	        }
	    });
	});
	$('.btn_save_update_no_reports').on('click', function() {
	    $(".alert-success").addClass('hidden');
	    $(".alert-danger").addClass('hidden');

	    var reportId = $("#update_report_id").val(); // Get the ID of the report to update

	    var payload = {
	        "office": $("#update_office_no_report").val(),
	        "month_year": $("#update_no_report_date").val(),
	        "office_id": $("#update_office_no_report").find(":selected").attr("data-id")
	    };

	    $.ajax({
	        url: origin + `ppa-cmis-api_origin/wsv1/no_reports/update_report/${reportId}`,
	        type: 'PUT',
	        contentType: 'application/json',
	        data: JSON.stringify(payload),
	        dataType: 'json',
	        success: function(result) {
	            if (result.status !== "ERROR") {
	                $(".alert-success").removeClass('hidden');
	                $(".alert-danger").addClass('hidden');

	                fetchReports(); // Reload the table after update

	                setTimeout(function() {
	                    $('#modalUpdate_no_report').modal('hide');
	                	$(".alert-success").addClass('hidden');
	                }, 1500);
	            } else {
	                $(".alert-danger").removeClass('hidden');
	                $(".alert-success").addClass('hidden');
	            }
	        },
	        error: function() {
	            $(".alert-danger").removeClass('hidden');
	        }
	    });
	});

	$(document).on('click', '.btn-delete', function() {
	    $(".alert-success").addClass('hidden');
	    $(".alert-danger").addClass('hidden');

	    var reportId = $(this).data('id'); // Get the id of the report to delete
	    $('#delete_id').val(reportId); // Set the report id in the hidden input
	    $('#modalDelete').modal('show'); // Show the modal
	});

	$('#confirmDelete').on('click', function() {
	    var reportId = $('#delete_id').val(); // Get the report id from the hidden input

	    $.ajax({
	        url: origin + `ppa-cmis-api_origin/wsv1/no_reports/delete_report/${reportId}`, // Use DELETE request
	        type: 'DELETE',
	        success: function(response) {
	            if (response.status == "Report Deleted") {
	                $(".alert-success").removeClass('hidden');
	                $(".alert-danger").addClass('hidden');
	                
	                // Remove the deleted row from the table
					fetchReports();

	                setTimeout(function() {
	                    $('#modalDelete').modal('hide');
	                	$(".alert-success").addClass('hidden');
	                }, 1500);
	            } else {
	                $(".alert-danger").removeClass('hidden');
	                $(".alert-success").addClass('hidden');
	            }
	        },
	        error: function(xhr, status, error) {
	            $(".alert-danger").removeClass('hidden');
	        }
	    });
	});


});
</script>