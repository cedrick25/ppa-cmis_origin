<?php $this->load->view('templates/header.php'); ?> 
<style>
  #sortable1, #sortable2, #sortable3 { list-style-type: none; margin: 0; float: left; margin-right: 10px; background: #eee; padding: 5px; width: 100%;}
  #sortable1 li, #sortable2 li, #sortable3 li { margin: 5px; padding: 5px; font-size: 10px; width: 100%; }
  </style>
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 

<div class="container loggedBody" hidden>
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
				 <div class="panel-body">
				 	
				 	<div class="row">
				 		<!-- <div class="col-md-3">
				 			<?php $this->load->view('templates/user_list_nav.php'); ?>
				 		</div> -->
				 		<div class="col-md-12">


				 			<div class="panel panel-primary">
								<div class="panel-heading"> <h3 class="nav-pills" style="margin-top: 5px; margin-bottom: 5px;   font-size: 18;"><i class="fa fa-list"></i>  Created Caseload Report </h3> </div>

								<div class="panel-body">
							    	<!-- Export: <button class="btn btn-primary btnCSV">CSV</button> <button class="btn btn-primary btnPDF">PDF</button> <button class="btn btn-primary btnXLS">EXCEL</button> -->

							    	<span class="pull-right "><button class="btn btn-primary" data-toggle="modal" data-target="#modalAdd">Add Report</button></span>

						 		<br/><br/>
						 			<table id="tableSensorList" class="display " cellspacing="0" width="100%">
								        <thead>
								            <tr>
								                <th>ID</th>
								                <th>Report Name</th>
								                <th>Created Date</th>
								                <th>Status</th>
								                <th>Option</th>
								            </tr>
								        </thead>
								        <tbody id="TBsensorList">
								        </tbody>
								    </table>
								</div>

							</div>

				 		</div>

				 		<div class="col-md-12">


				 			<div class="panel panel-primary">
								<div class="panel-heading"> <h3 class="nav-pills" style="margin-top: 5px; margin-bottom: 5px;   font-size: 18;"><i class="fa fa-list"></i>  Sent Caseload Report </h3> </div>

								<div class="panel-body">
							    	<!-- Export: <button class="btn btn-primary btnCSV">CSV</button> <button class="btn btn-primary btnPDF">PDF</button> <button class="btn btn-primary btnXLS">EXCEL</button> -->

							    	

						 		<br/><br/>
						 			<table id="fwdList" class="display " cellspacing="0" width="100%">
								        <thead>
								            <tr>
								                <th>ID</th>
								                <th>Report Name</th>
								                <th>To</th>
								                <th>Field</th>
								                <th>Sent Date</th>
								                <th>Status</th>
								                <th>Option</th>
								            </tr>
								        </thead>
								        <tbody id="TBsensorList">
								        </tbody>
								    </table>
								</div>

							</div>

				 		</div>


				 		<div class="col-md-12">


				 			<div class="panel panel-primary">
								<div class="panel-heading"> <h3 class="nav-pills" style="margin-top: 5px; margin-bottom: 5px;   font-size: 18;"><i class="fa fa-list"></i>  Received Caseload Report </h3> </div>

								<div class="panel-body">
							    	<!-- Export: <button class="btn btn-primary btnCSV">CSV</button> <button class="btn btn-primary btnPDF">PDF</button> <button class="btn btn-primary btnXLS">EXCEL</button> -->

							    	

						 		<br/><br/>
						 			<table id="rcvList" class="display " cellspacing="0" width="100%">
								        <thead>
								            <tr>
								                <th>ID</th>
								                <th>Report Name</th>
								                <th>From</th>
								                <th>Field</th>
								                <th>Received Date</th>
								                <th>Status</th>
								                <th>Option</th>
								            </tr>
								        </thead>
								        <tbody id="TBsensorList">
								        </tbody>
								    </table>
								</div>

							</div>

				 		</div>


				 	</div>
				 </div>
			</div>
		</div>
	</div>
</div>



<!-- Modal -->
<div id="modalAdd" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg" style="width: 1340px;">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-body">
       	<div class="panel panel-primary">
			<div class="panel-heading"> <h3 class="nav-pills" style="margin-top: 5px; margin-bottom: 5px;   font-size: 24px;"><i class="fa fa-plus"></i>  Add Report <i class="pull-right fa fa-close"  data-dismiss="modal"></i></h3> </div>

			<div class="panel-body">

				

				<div class="" id="addBody">
			    	<div class="form-group">
						<label for="">Report Name:</label>
						<input type="text" class="form-control" id="addtxtFullname">
					</div>

					<div class="form-group filter-modal ">
						<label for="">Field Office:</label>
						<select class="form-control select2 modal sel_field_office3" id="field"></select>
					</div>

					<div class="form-group">
						<label for="">Year-Month</label>
						
						<select class="form-control" id="addreport_YM">
						<?php for($i = 2019; $i<= date("Y"); $i++){
							?>
							<?php if($i != date("Y")){
								for($y=1; $y<=12;$y++){
									?><option><?= $i."-".str_pad($y, 2, '0', STR_PAD_LEFT); ?></option> <?php
								}
							}else{  
								for($y=1; $y<=date("m");$y++){
									?><option><?= $i."-".str_pad($y, 2, '0', STR_PAD_LEFT); ?></option> <?php
								}
							} ?>
							<?php
						} ?>
						</select>
					</div>



					<div class="form-group">
						<div class="col-md-6">
						<label for="">Available Report</label>
						
<ul id="sortable1" class="droptrue" style="font-size:10px">
 	<li data-id="F5PCS" class="ui-state-default">F5 PROBATION CASELOAD SUMMARY</li>
	<li data-id="F5T1" class="ui-state-default">F5 TABLE 1 - CARRY OVER PROBATION INVESTIGATION CASELOAD</li>
	<li data-id="F5T2"  class="ui-state-default">F5 TABLE 2 - COURT INVESTIGATION REFERRALS RECEIVED, ACTED UPON, AND NOT ACTED UPON</li>
	<li data-id="F5T3" class="ui-state-default">F5 TABLE 3 - CARRY OVER PROBATION INVESTIGATION CASES PENDING DISPOSITION IN COURT</li>
	<li data-id="F5T4"  class="ui-state-default">F5 TABLE 4 - PROBATION INVESTIGATION CASES DISPOSED OF BY THE COURT AND ISSUANCE OF</li>
	<li  data-id="F5T5" class="ui-state-default">F5 TABLE 5 - CARRY OVER COURTESY PROBATION INVESTIGATION REFERRALS RECEIVED</li>
	<li  data-id="F5T6" class="ui-state-default">F5 TABLE 6 - NEW COURTESY PROBATION INVESTIGATION REFERRALS RECEIVED, AND COMPLETED AND RETURNED</li>
	<li  data-id="F5T7" class="ui-state-default">F5 TABLE 7 - CARRY OVER PROBATION SUPERVISION CASELOAD</li>
	<li  data-id="F5T8" class="ui-state-default">F5 TABLE 8 - PROBATION SUPERVISION REFERRALS RECEIVED</li>
	<li  data-id="F5T9" class="ui-state-default">F5 TABLE 9 - PROBATION SUPERVISION CASES ACTED UPON</li>
	<li  data-id="F5T10" class="ui-state-default">F5 TABLE 10 - CARRY OVER PROBATION SUPERVISION CASES PENDING DISPOSITION IN COURT</li>
	<li  data-id="F5T11" class="ui-state-default">F5 TABLE 11 - PROBATION SUPERVISION CASES DISPOSED OF BY THE COURT</li>
	<li  data-id="F5T12" class="ui-state-default">F5 TABLE 12 - CARRY OVER COURTESY PROBATION SUPERVISION REFERRALS RECEIVED</li>
	<li  data-id="F5T13" class="ui-state-default">F5 TABLE 13 - NEW COURTESY PROBATION SUPERVISION REFERRALS RECEIVED AND TERMINATED</li>

	<li data-id="F21PCS" class="ui-state-default">F21 PRE-PAROLE/EXECUTIVE CLEMENCY CASELOAD SUMMARY</li>
	<li data-id="F21T1" class="ui-state-default">F21 Table 1 - CARRY OVER PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION CASELOAD</li>
	<li data-id="F21T2" class="ui-state-default">F21 Table 2 - PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION REFERRALS RECEIVED AND ACTED UPON</li>
	<li data-id="F21T3" class="ui-state-default">F21 Table 3 - CARRY OVER PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION CASES PENDING RESOLUTION BY THE BOARD</li>
	<li data-id="F21T4" class="ui-state-default">F21 Table 4 - PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION CASES RESOLVED BY THE BOARD</li>
	<li data-id="F21T5" class="ui-state-default">F21 Table 5 - CARRY OVER COURTESY PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION REFERRALS RECEIVED</li>
	<li data-id="F21T6" class="ui-state-default">F21 Table 6 - NEW COURTESY PRE-PAROLE/EXECUTIVE CLEMENCY INVESTIGATION REFERRALS RECEIVED AND COMPLETED AND RETURNED</li>
	<li data-id="F21T7" class="ui-state-default">F21 Table 7 - CARRY OVER PAROLE AND PARDON SUPERVISION CASELOAD</li>
	<li data-id="F21T8" class="ui-state-default">F21 Table 8 - PAROLE AND PARDON SUPERVISION REFERRALS RECEIVED</li>
	<li data-id="F21T9" class="ui-state-default">F21 Table 9 - PAROLE AND PARDON SUPERVISION CASES ACTED UPON</li>
	<li data-id="F21T10" class="ui-state-default">F21 Table 10 - CARRY OVER PAROLE AND PARDON SUPERVISION CASES PENDING RESOLUTION BY THE BOARD</li>
	<li data-id="F21T11" class="ui-state-default">F21 Table 11 - PAROLE AND PARDON SUPERVISION CASES RESOLVED BY THE BOARD</li>
	<li data-id="F21T12" class="ui-state-default">F21 Table 12 - CARRY OVER PAROLE AND PARDON SUPERVISION CASES PENDING RESOLUTION BY THE REGIONAL DIRECTOR</li>
	<li data-id="F21T13" class="ui-state-default">F21 Table 13 - PAROLE AND PARDON SUPVERVISION CASES RESOLVED BY THE REGIONAL DIRECTOR</li>
	<li data-id="F21T14" class="ui-state-default">F21 Table 14 - CARRY OVER COURTESY PAROLE AND PARDON SUPERVISION REFERRALS RECEIVED</li>
	<li data-id="F21T15" class="ui-state-default">F21 Table 15 - NEW COURTESY PAROLE AND PARDON SUPVERVISION REFERRALS RECEIVED AND TERMINATED</li>

	<li data-id="F44SSCS" class="ui-state-default">F44 SUSPENDED SENTENCE CASELOAD SUMMARY</li>
	<li data-id="F44T1" class="ui-state-default">F44 Table 1 - CARRY OVER INVESTIGATION CASELOAD</li>
	<li data-id="F44T2" class="ui-state-default">F44 Table 2 - INVESTIGATION REFERRALS RECEIVED AND ACTED UPON</li>
	<li data-id="F44T3" class="ui-state-default">F44 Table 3 - CARRY OVER INVESTIGATION CASES PENDING DISPOSITION BY THE EXECUTIVE DIRECTOR</li>
	<li data-id="F44T4" class="ui-state-default">F44 Table 4 - INVESTIGATION CASES DISPOSED OF BY THE EXECUTIVE DIRECTOR</li>
	<li data-id="F44T5" class="ui-state-default">F44 Table 5 - CARRY OVER COURTESY REFERRALS RECEIVED</li>
	<li data-id="F44T6" class="ui-state-default">F44 Table 6 - COURTESY INVESTIGATION REFERRALS RECEIVED AND COMPLETED AND RETURNED</li>
	<li data-id="F44T7" class="ui-state-default">F44 Table 7 - CARRY OVER SUPERVISION CASELOAD</li>
	<li data-id="F44T8" class="ui-state-default">F44 Table 8 - SUPERVISION REFERRALS RECEIVED</li>
	<li data-id="F44T9" class="ui-state-default">F44 Table 9 - SUPERVISION CASES ACTED UPON</li>
	<li data-id="F44T10" class="ui-state-default">F44 Table 10 - CARRY OVER SUPERVISION CASES PENDING RESOLUTION BY THE EXECUTIVE DIRECTOR</li>
	<li data-id="F44T11" class="ui-state-default">F44 Table 11 - SUPERVISION CASES DISPOSED OF BY THE EXECUTIVE DIRECTOR</li>
	<li data-id="F44T12" class="ui-state-default">F44 Table 12 - CARRY OVER COURTESY SUPERVISION REFERRALS RECEIVED</li>
	<li data-id="F44T13" class="ui-state-default">F44 Table 13 - COURTESY SUPERVISION REFERRALS RECEIVED AND TERMINATED</li>

	<li data-id="F45CSCS" class="ui-state-default">F45 COMMUNITY SERVICE CASELOAD SUMMARY</li>
	<li data-id="F45T1" class="ui-state-default">F45 Table 1 - CARRY OVER INVESTIGATION CASELOAD</li>
	<li data-id="F45T2" class="ui-state-default">F45 Table 2 - INVESTIGATION REFERRALS RECEIVED AND ACTED UPON</li>
	<li data-id="F45T3" class="ui-state-default">F45 Table 3 - CARRY OVER INVESTIGATION CASES PENDING DISPOSITION BY THE COURT</li>
	<li data-id="F45T4" class="ui-state-default">F45 Table 4 - INVESTIGATION CASES DISPOSED OF BY THE COURT</li>
	<li data-id="F45T5" class="ui-state-default">F45 Table 5 - CARRY OVER COURTESY INVESTIGATION REFERRALS RECEIVED</li>
	<li data-id="F45T6" class="ui-state-default">F45 Table 6 - COURTESY INVESTIGATION REFERRALS RECEIVED AND COMPLETED AND RETURNED</li>
	<li data-id="F45T7" class="ui-state-default">F45 Table 7 - CARRY OVER SUPERVISION CASELOAD</li>
	<li data-id="F45T8" class="ui-state-default">F45 Table 8 - SUPERVISION REFERRALS RECEIVED</li>
	<li data-id="F45T9" class="ui-state-default">F45 Table 9 - SUPERVISION CASES ACTED UPON</li>
	<li data-id="F45T10" class="ui-state-default">F45 Table 10 - CARRY OVER SUPERVISION CASES PENDING DISPOSITION BY THE COURT</li>
	<li data-id="F45T11" class="ui-state-default">F45 Table 11 - SUPERVISION CASES DISPOSED OF BY THE COURT</li>
	<li data-id="F45T12" class="ui-state-default">F45 Table 12 - CARRY OVER COURTESY SUPERVISION REFERRALS RECEIVED</li>
	<li data-id="F45T13" class="ui-state-default">F45 Table 13 - COURTESY SUPERVISION REFERRALS RECEIVED AND COMPLETED AND TERMINATED</li>

	<li data-id="F50VCCS" class="ui-state-default">F50 VOLUNTARY CONFINEMENT CASELOAD SUMMARY</li>
	<li data-id="F50T1" class="ui-state-default">F50 Table 1 - VOLUNTARY CONFINEMENT CASES HANDLED</li>
	<li data-id="F50T2" class="ui-state-default">F50 Table 2 - COURT DISPOSITION ON VOLUNTARY CONFINEMENT</li>

	<li data-id="F51RORCS" class="ui-state-default">F51 RELEASE ON RECOGNIZANCE CASELOAD SUMMARY</li>
	<li data-id="F51T1" class="ui-state-default">F51 Table 1 - CARRY OVER SUPERVISION CASELOAD</li>
	<li data-id="F51T2" class="ui-state-default">F51 Table 2 - SUPERVISION REFERRALS RECEIVED</li>
	<li data-id="F51T3" class="ui-state-default">F51 Table 3 - MONITORING REPORT SUBMITTED TO COURT</li>
	<li data-id="F51T4" class="ui-state-default">F51 Table 4 - COURT DISPOSITION OF RELEASE ON RECOGNIZANCE</li>

	<li data-id="F53CSAIPCS" class="ui-state-default">F53 COMMUNITY SERVICE AS IMPRISONMENT PENALTY CASELOAD SUMMARY</li>
	<li data-id="F53T1" class="ui-state-default">F53 Table 1 - CARRY OVER FOR APPLICATION FOR COMMUNITY SERVICE CASELOAD</li>
	<li data-id="F53T2" class="ui-state-default">F53 Table 2 - NEW APPLICATION FOR COMMUNITY SERVICE RECEIVED</li>
	<li data-id="F53T3" class="ui-state-default">F53 Table 3 - CARRY OVER NOTICE OF HEARING RECEIVED</li>
	<li data-id="F53T4" class="ui-state-default">F53 Table 4 - NEW NOTICE OF HEARING RECEIVED</li>
	<li data-id="F53T5" class="ui-state-default">F53 Table 5 - CARRY OVER FOR ORDER RECEIVED REGARDING SETTING APPLICATION FOR HEARING AND SUBMISSION REPORTS</li>
	<li data-id="F53T6" class="ui-state-default">F53 Table 6 - NEW ORDER RECEIVED REGARDING SETTING APPLICATION FOR HEARING AND SUBMISSION OF REPORTS AND COMMUNITY SERVICE PROGRAM AND REHABILITATION COUNSELLING SCHEDULE SUBMITTED</li>
	<li data-id="F53T7" class="ui-state-default">F53 Table 7 - CARRY OVER APPLICATION PENDING DISPOSITION IN COURT</li>
	<li data-id="F53T8" class="ui-state-default">F53 Table 8 - APPLICATION FOR COMMUNITY SERVICE RESOLVED BY THE COURT</li>
	<li data-id="F53T9" class="ui-state-default">F53 Table 9 - CARRY OVER COMMUNITY SERVICE CASELOAD</li>
	<li data-id="F53T10" class="ui-state-default">F53 Table 10 - NEW COMMUNITY SERVICE CASELOAD</li>
	<li data-id="F53T11" class="ui-state-default">F53 Table 11 - COMMUNITY SERVICES TERMINATED</li>

</ul>
						 

						</div>
						<div class="col-md-6">
							<label for="">Selected Report</label>
							
							<ul id="sortable3" class="droptrue" style="    min-height: 2500px;">
							</ul>
						</div>
					</div>

					<!-- <div class="form-group">
						<label for="">Password:</label>
						<input type="password" class="form-control" id="txtPassword2">
					</div> -->

					<br style="clear:both">

					<!-- <div class="form-group">
						<label for="">Email Address:</label>
						<input type="text" class="form-control" id="addtxtEmail">
					</div>

					<div class="form-group">
						<label for="">User Level:</label>
						<select class="form-control ddUserType" id="addddUserType">
						   
						</select>
					</div>

					<div class="form-group">
						<label for="">Field Office:</label>
						<select style="width: 100%" class="form-control sel_field_office select2" id="addddSelOffice">
						   
						</select>
					</div>

					<div class="form-group">
						<label for="">Status:</label>
						<select class="form-control" id="addddUserStatus">
						    <option value="1">ACTIVE</option>
						    <option value="0">INACTIVE</option>
						</select>
					</div> -->
					<button class="btn btn-primary pull-right" id="btnAddSubmit">Save</button>
				</div>
			</div>

		</div>
      </div>
    </div>

  </div>
</div>


<!-- Modal -->
<div id="modalFwd" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-body">
       	<div class="panel panel-primary">
			<div class="panel-heading"> <h3 class="nav-pills" style="margin-top: 5px; margin-bottom: 5px;   font-size: 24px;"><i class="fa fa-plus"></i>  Forward Report <i class="pull-right fa fa-close"  data-dismiss="modal"></i></h3> </div>

			<div class="panel-body">

				

				<div class="" id="addBody">

			    	<div class="form-group">
						<label for="">Report Name:</label>
						<input type="text" class="form-control" id="fwdReportName" disabled="disabled">
						<input type="hidden" class="form-control" id="fwdReportID">
					</div>

					<div class="form-group filter-modal ">
						<label for="">To:</label>
						<select class="form-control select2 modal " id="fwdUsers"><option>Please select</option></select>
					</div>

					


					
					<button class="btn btn-secondary pull-right" data-dismiss="modal">Cancel</button>
					<button class="btn btn-primary pull-right" id="btnFwdSubmit">Save</button>
				</div>
			</div>

		</div>
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


	    $( "ul.droptrue" ).sortable({
	      connectWith: "ul"
	    });
	 
	    $( "ul.dropfalse" ).sortable({
	      connectWith: "ul",
	      dropOnEmpty: false
	    });
	 
	    $( "#sortable1, #sortable2, #sortable3" ).disableSelection();


        	$.wms.modal.attachModalEvent();
      		$('.filter-modal select').css('width', '100%')
      		$(".select2").select2()


          	$.wms.widget.attachWidgetEvent();

    		$.wms.dashboard.attachPageEvent();
    		$.wms.dashboard.attachCaseloadListEvent();
    		
        }, 200);
   });
</script>