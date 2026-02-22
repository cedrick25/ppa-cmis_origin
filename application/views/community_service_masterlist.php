<?php $this->load->view('templates/header.php'); ?> 
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 
<br/>
 	<div class="modal fade" id="modal-search" role="dialog" data-backdrop="static" data-keyboard="false">
	    <div class="modal-dialog">
	    
	      <div class="modal-content">
	        <div class="modal-header tb-header">
	          <button type="button" class="close" data-dismiss="modal">&times;</button>
	          <h4 class="modal-title ppa-f24"><b><i class="fa fa-search"></i> No Record Found</b></h4>
	        </div>
	        <div class="modal-body ppa-f24">
	          <p><b>Search Another?</b></p>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-primary btnSearchNo"><u>N</u>o</button>
	          <button type="button" class="btn btn-danger btnSearchYes" ><u>Y</u>es </button>
	        </div>
	      </div>
	    </div>
  	</div>
<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<span class="font_20"><i class="fa fa-search"></i> Search Community Service</b></span>
					<span class="font_20 pull-right sshow" style="cursor: pointer;"><i class="fa fa-caret-square-o-down"></i> <u>S</u>how</span>

					<span class="font_20 pull-right shide hidden" style="cursor: pointer;"><i class="fa fa-caret-square-o-up"></i> <u>H</u>ide</span>
				</div>
				<div class="panel-body p1 pp1" style="display:none"><br/>
				    <div class="col-lg-12">
				      <div class="row">
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">DOCKET NO</label>
				            <div class="col-sm-3">
				              <input type="text" tabindex="1" class="form-control input-sm upperCase" id="docket_number" placeholder="">
				            </div>
				            <label for="" class="col-sm-2">YEAR</label>
				            <div class="col-sm-3">
				              <input type="text" tabindex="-1" class="form-control input-sm upperCase" id="year" placeholder="">
				            </div>
				          </div>
				        </div>
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">CC NO</label>
				            <div class="col-sm-8">
				              <input type="text" tabindex="-1"  class="form-control input-sm upperCase" id="cc_number" placeholder="">
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				    <div class="col-lg-12">
				      <div class="row">
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">LAST NAME</label>
				            <div class="col-sm-8">
				              <input type="text" tabindex="1" class="form-control input-sm upperCase" id="last_name" placeholder="">
				            </div>
				          </div>
				        </div>
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">COURT OF ORIGIN</label>
				            <div class="col-sm-8">
				              <input type="text" tabindex="-1"  class="form-control input-sm upperCase" id="court_of_origin" placeholder="">
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				    <div class="col-lg-12">
				      <div class="row">
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">FIRST NAME</label>
				            <div class="col-sm-8">
				              <input type="text" tabindex="2" class="form-control input-sm upperCase" id="first_name" placeholder="">
				            </div>
				          </div>
				        </div>
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">ASSIGNED OFFICER</label>
				            <div class="col-sm-8">
				              <input type="text" tabindex="-1" class="form-control input-sm upperCase" id="assigned_officer" placeholder="">
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				    <div class="col-lg-12">
				      <div class="row">
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">MIDDLE NAME</label>
				            <div class="col-sm-8">
				              <input type="text" tabindex="3" class="form-control input-sm upperCase" id="middle_name" placeholder="">
				            </div>
				          </div>
				        </div>
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">START DATE</label>
				            <div class="col-sm-8">
				              <input type="date" tabindex="3" class="form-control input-sm upperCase" id="start_date" placeholder="">
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				    <div class="col-lg-12">
				      <div class="row">
				        <div class="col-lg-6">
				          <div class="form-group row hidden">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">FIELD OFFICE</label>
				            <div class="col-sm-8">
			             		<select class="form-control select2 sel_field_office3" id="field_office">
			             			<option value="ALL" selected>All</option>
			              		</select>
				            </div>
				          </div>
				        </div>
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">END DATE</label>
				            <div class="col-sm-8">
		              			<input type="date" tabindex="3" class="form-control input-sm upperCase" id="end_date" placeholder="">
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
	  				
				</div>
				<div class="panel-footer p1" style="display:none">
					
			     	<div class="row">
			     		<div class="col-lg-9">
		     			</div>
		     			<div class="col-lg-3">
		     				<span class="pull-right">
								<button type="button" class="btn btn btn-reset btn-danger">Reset</button>
			    				<button  tabindex="4" type="button" class="btn btn btn-primary btn-search"><i class="fa fa-search"></i> Search</button>
		    				</span>
    					</div>
					</div>
				</div>
			</div>
		</div>

	<div class="col-md-12">
		<div class="panel panel-primary">
			<div class="panel-heading">
				<span class="font_20"><i class="fa fa-users"></i> <b>Community Service Masterlist</b></span>
				<form id="downloadReportForm" action="<?= base_url('download_report_CS') ?>" method="POST" style="display:none;">
				    <input type="hidden" name="docket_number" id="report_docket_number">
				    <input type="hidden" name="first_name" id="report_first_name">
				    <input type="hidden" name="middle_name" id="report_middle_name">
				    <input type="hidden" name="last_name" id="report_last_name">
				    <input type="hidden" name="cc_number" id="report_cc_number">
				    <input type="hidden" name="court_of_origin" id="report_court_of_origin">
				    <input type="hidden" name="assigned_officer" id="report_assigned_officer">
				    <input type="hidden" name="start_date" id="report_start_date">
				    <input type="hidden" name="end_date" id="report_end_date">
				    <input type="hidden" name="field_office" id="report_field_office">
				    <input type="hidden" name="year" id="report_year">
				</form>

				<span class="pull-right">
					  	<!-- <button id="downloadReportBtn" class="btn btn-success" style="display:;">
						  <i class="fa fa-download"></i> Download
						</button> -->
				</span>
			</div>
			<div class="panel-body">
				<div id="result_table" class="">
					<table id="probationer_table" class="display table-bordered table-condensed nowrap" style="width:100%">
				        <thead class="tb-header small">
				          <tr>
				            <th style="text-align: center;">ID</th>
				            <th style="text-align: center;">DOCKET NO.</th>
				            <th style="text-align: center;">CLIENT NAME</th>
				            <th style="text-align: center;">CC NO.</th>
				            <th style="text-align: center;">COURT OF ORIGIN</th>
				            <th style="text-align: center;">ASSIGNED OFFICER</th>
				            <th style="text-align: center;">DATE ORDER RECEIVED BY THE PPO</th>
				            <th style="text-align: center;">YEAR</th>
				            <th style="text-align: center;">PERIOD - START</th>
				            <th style="text-align: center;">PERIOD - END</th>
				            <th style="text-align: center;">FIELD OFFICE</th>
				          </tr>
				        </thead>
				        <tbody class="small">
				        </tbody>
			      	</table>
		      	</div>
			</div>
		</div>
	</div>
</div>
<!-- <div class="row">
    <div class="col-md-12">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <span class="font_20"><b>NOTIFICATION:  Field Offices without Caseload Report in the System</b>
            </div>
            <div class="panel-body"><br>
                <div id="result_table">
                    <table id="no_report_table" class="display table-bordered table-condensed nowrap" style="width:100%">
                        <thead class="tb-header small">
                            <tr>
                                <th style="text-align: center;">FIELD OFFICE</th>
                                <th style="text-align: center;">REGION</th>
                                <th style="text-align: center;">MONTH-YEAR</th>
                            </tr>
                        </thead>
                        <tbody class="tbody-sm" style="text-align:center"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div> -->
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
	          $.wms.probationer.attachCommunityMasterlist();
      		}
        }, 200);

        shortcuts.add('alt+r',function() {
        	$(".btn-reset").focus();
        	 setTimeout(function () {
		    $(".btn-reset").trigger("click")
			    $("input").val('');
			    $("#search_lname").focus();
			});

		})

		shortcuts.add('alt+s',function() {
		    $(".sshow").trigger("click")
		    setTimeout(function () {
		    $("#search_lname").focus();
			},10)
		})

		shortcuts.add('alt+h',function() {
		    $(".shide").trigger("click")
		})
   });
$(document).ready(function () {
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
		var origin = window.location.origin + "/";
	    
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
});
</script>