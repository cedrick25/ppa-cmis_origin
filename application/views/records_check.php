<?php $this->load->view('templates/header.php'); ?> 
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 
<br/>
<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<span class="font_20"><b><i class="fa fa-search"></i> Search Caseload</b></span>
					<span class="font_20 pull-right sshow hidden" style="cursor: pointer;"><i class="fa fa-caret-square-o-down"></i> <u>S</u>how</span>

					<span class="font_20 pull-right shide " style="cursor: pointer;"><i class="fa fa-caret-square-o-up"></i> <u>H</u>ide</span>
				</div>
				<div class="panel-body p1 pp1" style=""><br/>
					<div class="col-lg-12">
			      <div class="row">
			        <div class="col-lg-6">
			          <div class="form-group row">
			            <div class="col-sm-1"></div>
			            <label for="" class="col-sm-3">Forms</label>
			            <div class="col-sm-8">
			              <select class="form-control select2" id="RC_forms">
			                <option value="F5">F5</option>
			                <option value="F21">F21</option>
			                <option value="F44">F44</option>
			                <option value="F45">F45</option>
			                <option value="F50">F50</option>
			                <option value="F51">F51</option>
			                <option value="F53">F53</option>
			              </select>
			            </div>
			          </div>
			        </div>
			        <div class="col-lg-6">
			          <div class="form-group row">
			            <div class="col-sm-1"></div>
			            <label for="" class="col-sm-3">Table</label>
			            <div class="col-sm-8">
    								<div id="RC-5-forms-container" class="hidden">
				            	<select class="form-control select2" id="RC-5-forms">
					            	<optgroup label="Forms 5">
						                <option value="F5T1">TABLE 1 - CARRY OVER PROBATION INVESTIGATION CASELOAD</option>
						                <option value="F5T2">TABLE 2 - COURT INVESTIGATION REFERRALS RECEIVED, ACTED UPON, AND NOT ACTED UPON</option>
						                <option value="F5T3">TABLE 3 - CARRY OVER PROBATION INVESTIGATION CASES PENDING DISPOSITION IN COURT</option>
						                <option value="F5T4">TABLE 4 - PROBATION INVESTIGATION CASES DISPOSED OF BY THE COURT AND ISSUANCE OF</option>
						                <option value="F5T5">TABLE 5 - CARRY OVER COURTESY PROBATION INVESTIGATION REFERRALS RECEIVED</option>
						                <option value="F5T6">TABLE 6 - NEW COURTESY PROBATION INVESTIGATION REFERRALS RECEIVED, AND COMPLETED AND RETURNED</option>
						                <option value="F5T7">TABLE 7 - CARRY OVER PROBATION SUPERVISION CASELOAD</option>
						                <option value="F5T8">TABLE 8 - PROBATION SUPERVISION REFERRALS RECEIVED</option>
						                <option value="F5T9">TABLE 9 - PROBATION SUPERVISION CASES ACTED UPON</option>
						                <option value="F5T10">TABLE 10 - CARRY OVER PROBATION SUPERVISION CASES PENDING DISPOSITION IN COURT</option>
						                <option value="F5T11">TABLE 11 - PROBATION SUPERVISION CASES DISPOSED OF BY THE COURT</option>
						                <option value="F5T12">TABLE 12 - CARRY OVER COURTESY PROBATION SUPERVISION REFERRALS RECEIVED</option>
						                <option value="F5T13">TABLE 13 - NEW COURTESY PROBATION SUPERVISION REFERRALS RECEIVED AND TERMINATED</option>
				                </optgroup>
			              	</select>
			            	</div>
										<div id="RC-21-forms-container" class="hidden">
			              	<select class="form-control select2" id="RC-21-forms">
			              		<optgroup label="Forms 21">
					                <option value="F21PCS">PRE-PAROLE/EXECUTIVE CLEMENCY CASELOAD SUMMARY</option>
					                <option value="F21T1">Table 1 - CARRY OVER PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION CASELOAD</option>
					                <option value="F21T2">Table 2 - PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION REFERRALS RECEIVED AND ACTED UPON</option>
					                <option value="F21T3">Table 3 - CARRY OVER PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION CASES PENDING RESOLUTION BY THE BOARD</option>
					                <option value="F21T4">Table 4 - PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION CASES RESOLVED BY THE BOARD</option>
					                <option value="F21T5">Table 5 - CARRY OVER COURTESY PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION REFERRALS RECEIVED</option>
					                <option value="F21T6">Table 6 - NEW COURTESY PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION REFERRALS RECEIVED AND COMPLETED AND RETURNED</option>
					                <option value="F21T7">Table 7 - CARRY OVER PAROLE AND PARDON SUPERVISION CASELOAD</option>
					                <option value="F21T8">Table 8 - PAROLE AND PARDON SUPERVISION REFERRALS RECEIVED</option>
					                <option value="F21T9">Table 9 - PAROLE AND PARDON SUPERVISION CASES ACTED UPON</option>
					                <option value="F21T10">Table 10 - CARRY OVER PAROLE AND PARDON SUPERVISION CASES PENDING RESOLUTION BY THE BOARD</option>
					                <option value="F21T11">Table 11 - PAROLE AND PARDON SUPERVISION CASES RESOLVED BY THE BOARD</option>
					                <option value="F21T12">Table 12 - CARRY OVER PAROLE AND PARDON SUPERVISION CASES PENDING RESOLUTION BY THE REGIONAL DIRECTOR</option>
					                <option value="F21T13">Table 13 - PAROLE AND PARDON SUPERVISION CASES RESOLVED BY THE REGIONAL DIRECTOR</option>
					                <option value="F21T14">Table 14 - CARRY OVER COURTESY PAROLE AND PARDON SUPERVISION REFERRALS RECEIVED</option>
					                <option value="F21T15">Table 15 - NEW COURTESY PAROLE AND PARDON SUPERVISION REFERRALS RECEIVED AND TERMINATED</option>
				                </optgroup>
			              	</select>
			            	</div>
										<div id="RC-44-forms-container" class="hidden">
			              	<select class="form-control select2" id="RC-44-forms">
			              		<optgroup label="Forms 44">
					                <option value="F44SSCS">SUSPENDED SENTENCE CASELOAD SUMMARY</option>
					                <option value="F44T1">Table 1 - CARRY OVER INVESTIGATION CASELOAD</option>
					                <option value="F44T2">Table 2 - INVESTIGATION REFERRALS RECEIVED AND ACTED UPON</option>
					                <option value="F44T3">Table 3 - CARRY OVER INVESTIGATION CASES PENDING DISPOSITION BY THE EXECUTIVE DIRECTOR</option>
					                <option value="F44T4">Table 4 - INVESTIGATION CASES DISPOSED OF BY THE EXECUTIVE DIRECTOR</option>
					                <option value="F44T5">Table 5 - CARRY OVER COURTESY REFERRALS RECEIVED</option>
					                <option value="F44T6">Table 6 - COURTESY INVESTIGATION REFERRALS RECEIVED AND COMPLETED AND RETURNED</option>
					                <option value="F44T7">Table 7 - CARRY OVER SUPERVISION CASELOAD</option>
					                <option value="F44T8">Table 8 - SUPERVISION REFERRALS RECEIVED</option>
					                <option value="F44T9">Table 9 - SUPERVISION CASES ACTED UPON</option>
					                <option value="F44T10">Table 10 - CARRY OVER SUPERVISION CASES PENDING RESOLUTION BY THE EXECUTIVE DIRECTOR</option>
					                <option value="F44T11">Table 11 - SUPERVISION CASES DISPOSED OF BY THE EXECUTIVE DIRECTOR</option>
					                <option value="F44T12">Table 12 - CARRY OVER COURTESY SUPERVISION REFERRALS RECEIVED</option>
					                <option value="F44T13">Table 13 - COURTESY SUPERVISION REFERRALS RECEIVED AND TERMINATED</option>
				                </optgroup>
			              	</select>
			            	</div>
										<div id="RC-45-forms-container" class="hidden">
			              	<select class="form-control select2" id="RC-45-forms">
			              		<optgroup label="Forms 45">
					                <option value="F45CSCS">COMMUNITY SERVICE FOR A FIRST-TIME MINOR DRUG OFFENDER IN LIEU OF IMPRISONMENT CASELOAD SUMMARY</option>
					                <option value="F45T1">Table 1 - CARRY OVER INVESTIGATION CASELOAD</option>
					                <option value="F45T2">Table 2 - INVESTIGATION REFERRALS RECEIVED AND ACTED UPON</option>
					                <option value="F45T3">Table 3 - CARRY OVER INVESTIGATION CASES PENDING DISPOSITION BY THE COURT</option>
					                <option value="F45T4">Table 4 - INVESTIGATION CASES DISPOSED OF BY THE COURT</option>
					                <option value="F45T5">Table 5 - CARRY OVER COURTESY INVESTIGATION REFERRALS RECEIVED</option>
					                <option value="F45T6">Table 6 - COURTESY INVESTIGATION REFERRALS RECEIVED AND COMPLETED AND RETURNED</option>
					                <option value="F45T7">Table 7 - CARRY OVER SUPERVISION CASELOAD</option>
					                <option value="F45T8">Table 8 - SUPERVISION REFERRALS RECEIVED</option>
					                <option value="F45T9">Table 9 - SUPERVISION REFERRALS ACTED UPON</option>
					                <option value="F45T10">Table 10 - CARRY OVER SUPERVISION CASES PENDING DISPOSITION BY THE COURT</option>
					                <option value="F45T11">Table 11 - SUPERVISION CASES DISPOSED OF BY THE COURT</option>
					                <option value="F45T12">Table 12 - CARRY OVER COURTESY SUPERVISION REFERRALS RECEIVED</option>
					                <option value="F45T13">Table 13 - COURTESY SUPERVISION REFERRALS RECEIVED AND COMPLETED AND TERMINATED</option>
				                </optgroup>
			              	</select>
			            	</div>
										<div id="RC-50-forms-container" class="hidden">
			              	<select class="form-control select2" id="RC-50-forms">
			              		<optgroup label="Forms 50">
					                <option value="F50VCCS">VOLUNTARY CONFINEMENT CASELOAD SUMMARY</option>
					                <option value="F50T1">Table 1 - VOLUNTARY CONFINEMENT CASES HANDLED</option>
					                <option value="F50T2">Table 2 - COURT DISPOSITION ON VOLUNTARY CONFINEMENT</option>
				                </optgroup>
			              	</select>
			            	</div>
										<div id="RC-51-forms-container" class="hidden">
			              	<select class="form-control select2" id="RC-51-forms">
			              		<optgroup label="Forms 51">
					                <option value="F51RORCS">RELEASE ON RECOGNIZANCE CASELOAD SUMMARY</option>
					                <option value="F51T1">Table 1 - CARRY OVER SUPERVISION CASELOAD</option>
					                <option value="F51T2">Table 2 - SUPERVISION REFERRALS RECEIVED</option>
					                <option value="F51T3">Table 3 - MONITORING REPORT SUBMITTED TO COURT</option>
					                <option value="F51T4">Table 4 - COURT DISPOSITION OF RELEASE ON RECOGNIZANCE</option>
				                </optgroup>
			              	</select>
			            	</div>
										<div id="RC-53-forms-container" class="hidden">
			              	<select class="form-control select2" id="RC-53-forms">
			              		<optgroup label="Forms 53">
					                <option value="F53CSAIPCS">COMMUNITY SERVICE IN LIEU OF  IMPRISONMENT FOR THE PENALTIES ARRESTO MENOR AND ARESTO MAYOR CASELOAD SUMMARY</option>
					                <option value="F53T1">Table 1 - CARRY OVER FOR APPLICATION FOR COMMUNITY SERVICE CASELOAD</option>
					                <option value="F53T2">Table 2 - NEW APPLICATION FOR COMMUNITY SERVICE RECEIVED</option>
					                <option value="F53T3">Table 3 - CARRY OVER NOTICE OF HEARING RECEIVED</option>
					                <option value="F53T4">Table 4 - NEW NOTICE OF HEARING RECEIVED</option>
					                <option value="F53T5">Table 5 - CARRY OVER FOR ORDER RECEIVED REGARDING SETTING APPLICATION FOR HEARING AND SUBMISSION REPORTS</option>
					                <option value="F53T6">Table 6 - NEW ORDER RECEIVED REGARDING SETTING APPLICATION FOR HEARING AND SUBMISSION OF REPORTS AND COMMUNITY SERVICE PROGRAM AND REHABILITATION COUNSELLING SCHEDULE SUBMITTED</option>
					                <option value="F53T7">Table 7 - CARRY OVER APPLICATION PENDING DISPOSITION IN COURT</option>
					                <option value="F53T8">Table 8 - APPLICATION FOR COMMUNITY SERVICE RESOLVED BY THE COURT</option>
					                <option value="F53T9">Table 9 - CARRY OVER COMMUNITY SERVICE CASELOAD</option>
					                <option value="F53T10">Table 10 - NEW COMMUNITY SERVICE CASELOAD</option>
					                <option value="F53T11">Table 11 - COMMUNITY SERVICES TERMINATED</option>
				                </optgroup>
			              	</select>
			            	</div>
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
			            <label for="" class="col-sm-3">Field Office</label>
			            <div class="col-sm-8">
			             	<select class="form-control select2 sel_field_office" id="RC_FO">
			              </select>
			            </div>
			          </div>
			        </div>
			        <div class="col-lg-6">
			          <div class="form-group row">
			            <div class="col-sm-1"></div>
			            <label for="" class="col-sm-3">Year-Month</label>
			            <div class="col-sm-8">
			              <input name="Date" id="RC_date" class="sel_date date-picker form-control" >
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
			            <label for="" class="col-sm-3">Name</label>
			            <div class="col-sm-8">
			              <input type="text" tabindex="1" class="form-control input-sm upperCase" id="RC_name" placeholder="">
			            </div>
			          </div>
			        </div>
			        <div class="col-lg-6">
			          <div class="form-group row">
			            <div class="col-sm-1"></div>
			            <label for="" class="col-sm-3">Docket No.</label>
			            <div class="col-sm-8">
			              <input type="text" tabindex="-1"  class="form-control input-sm upperCase" id="RC_docket" placeholder="">
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
				</div>
				<div class="panel-footer p1" style="">
					
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
</div>

	<div class="col-md-12">
		<div class="panel panel-primary">
			<div class="panel-heading">
				<span class="" style="font-size: 16px;"><b>TABLE 1 - CARRY OVER PROBATION INVESTIGATION CASELOAD</b></span>
			</div>
			<div class="panel-body">
				<div class="form_loader center"><h2><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Processing.... </h2></div>
				
				<div id="result_table" class="">
					<table id="probationerRequest_table" class="display table-bordered table-condensed nowrap" style="width:100%">
				        <thead class="tb-header small">
				          <tr>
				            <th style="text-align: center;">DOCKET NO.</th>
				            <th style="text-align: center;">PETITIONER'S NAME</th>
				            <th style="text-align: center;">DATE RECEIVED BY THE PPO</th>
				            <th style="text-align: center;">INVESTIGATION OFFICER</th>
				            <th style="text-align: center;">FIELD OFFICE</th>
				          </tr>
				        </thead>
				        <tbody class="small">
				        	<tr>
				        		<td class="sorting_1">PI-2024-07-00068</td>
				        		<td>RAYMUND STA. IGLESIA Y DEGAMON</td>
				        		<td>2024-07-26</td>
				        		<td>SPPO ARIANDNE L. SIOSANA</td>
				        		<td class="options field">BAYBAY CITY PAROLE AND PROBATION OFFICE</td>
				        	</tr>
				        	<tr>
				        		<td class="sorting_1">PI-2024-07-00067</td>
				        		<td>JOEL ABENOJA Y MARTE</td>
				        		<td>2024-07-12</td>
				        		<td>SPPO ARIANDNE L. SIOSANA</td>
				        		<td class="options field">BAYBAY CITY PAROLE AND PROBATION OFFICE</td>
				        	</tr>
				        	<tr>
				        		<td class="sorting_1">PI-2024-07-00066</td>
				        		<td>ARMANDO NGOHO Y AGUSTIN</td>
				        		<td>2024-07-26</td>
				        		<td>SPPO ARIANDNE L. SIOSANA</td>
				        		<td class="options field">BAYBAY CITY PAROLE AND PROBATION OFFICE</td>
				        	</tr>
				        </tbody>
			      	</table>
		      	</div>
			</div>
		</div>
	</div>
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
    		$(".form_loader").addClass("hidden");

    		$('.filter-modal select').css('width', '100%')
	    	$(document).ready(function() {
				    // Initialize Select2 for the RC_forms dropdown (main selection)
				    $(".select2").select2({
				        placeholder: "Select a form",
				        width: '100%'
				    });

				    // Function to show the relevant table options based on the selected form
				    function updateTableOptions() {
				        // Get the selected form
				        var selectedForm = $("#RC_forms").val();
				        
				        // Hide all containers
				        $("#RC-5-forms-container, #RC-21-forms-container, #RC-44-forms-container, #RC-45-forms-container, #RC-50-forms-container, #RC-51-forms-container, #RC-53-forms-container").addClass("hidden");

				        // Show the relevant container and reinitialize Select2 based on the selected form
				        switch (selectedForm) {
				            case "F5":
				                $("#RC-5-forms-container").removeClass("hidden").find('select').select2({
				                    placeholder: "Select an option",
				                    width: '100%'
				                });
				                break;
				            case "F21":
				                $("#RC-21-forms-container").removeClass("hidden").find('select').select2({
				                    placeholder: "Select an option",
				                    width: '100%'
				                });
				                break;
				            case "F44":
				                $("#RC-44-forms-container").removeClass("hidden").find('select').select2({
				                    placeholder: "Select an option",
				                    width: '100%'
				                });
				                break;
				            case "F45":
				                $("#RC-45-forms-container").removeClass("hidden").find('select').select2({
				                    placeholder: "Select an option",
				                    width: '100%'
				                });
				                break;
				            case "F50":
				                $("#RC-50-forms-container").removeClass("hidden").find('select').select2({
				                    placeholder: "Select an option",
				                    width: '100%'
				                });
				                break;
				            case "F51":
				                $("#RC-51-forms-container").removeClass("hidden").find('select').select2({
				                    placeholder: "Select an option",
				                    width: '100%'
				                });
				                break;
				            case "F53":
				                $("#RC-53-forms-container").removeClass("hidden").find('select').select2({
				                    placeholder: "Select an option",
				                    width: '100%'
				                });
				                break;
				            default:
				                // If no match, keep all containers hidden
				                $("#RC-5-forms-container, #RC-21-forms-container, #RC-44-forms-container, #RC-45-forms-container, #RC-50-forms-container, #RC-51-forms-container, #RC-53-forms-container").addClass("hidden");
				                break;
				        }
				    }

				    // Attach the updateTableOptions function to the change event of the Forms dropdown
				    $("#RC_forms").on("change", updateTableOptions);

				    // Trigger the updateTableOptions function on page load to set the initial state
				    updateTableOptions();
				});

        $.wms.widget.attachWidgetEvent();
        // $.wms.probationer.attachProbationerEvent();
        // $.wms.probationer.attachProbationerRequestEvent();
  		}
    }, 200);


    $(".sshow").unbind("click").on("click",function(){
    	$(".sshow").addClass("hidden")
    	$(".shide").removeClass("hidden")
    	$(".p1").fadeIn();
    })

    $(".shide").unbind("click").on("click",function(){
    	$(".shide").addClass("hidden")	
    	$(".sshow").removeClass("hidden")
    	$(".p1").fadeOut();
    })
 });
</script>