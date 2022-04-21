<div class="row ">
	<div class="col-md-12">
		<div class="panel panel-primary" >
        	<div class="panel-heading" style="padding:0px 5px 0px;">
				<span class="font_16">Filter Options</span>
			</div>
			<div class="panel-body">
				
				<div class="form-group col-md-3">
					<b>Field Office:</b><br/>
		              <select class="form-control select2  sel_field_office" id="filter_office">
		              </select>	
	              	
              	</div>

              	<div class="form-group col-md-7">
	              	<b>Form:</b><br/>
		            <select class="form-control  hidden" id="sel-probation-forms">
		            	<optgroup label="Forms 5">
			                <option value="F5PCS">PROBATION CASELOAD SUMMARY</option>
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

	              	<select class="form-control  hidden" id="sel-parole-forms">
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
			                <option value="F21T13">Table 13 - PAROLE AND PARDON SUPVERVISION CASES RESOLVED BY THE REGIONAL DIRECTOR</option>
			                <option value="F21T14">Table 14 - CARRY OVER COURTESY PAROLE AND PARDON SUPERVISION REFERRALS RECEIVED</option>
			                <option value="F21T15">Table 15 - NEW COURTESY PAROLE AND PARDON SUPVERVISION REFERRALS RECEIVED AND TERMINATED</option>
		                </optgroup>
	              	</select>

	              	<select class="form-control  hidden" id="sel-44-forms">
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
			                <option value="F44T12">Table 12 - CARRY OVER COURTESY SUPERVISION SUPERVISION REFERRALS RECEIVED</option>
			                <option value="F44T13">Table 13 - COURTESY SUPERVISION REFERRALS RECEIVED AND TERMINATED</option>
		                </optgroup>
	              	</select>

	              	<select class="form-control  hidden" id="sel-45-forms">
	              		<optgroup label="Forms 45">
			                <option value="F45CSCS">COMMUNITY SERVICE CASELOAD SUMMARY</option>
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

	              	<select class="form-control  hidden" id="sel-50-forms">
	              		<optgroup label="Forms 50">
			                <option value="F50VCCS">VOLUNTARY CONFINEMENT CASELOAD SUMMARY</option>
			                <option value="F50T1">Table 1 - VOLUNTARY CONFINEMENT CASES HANDLED</option>
			                <option value="F50T2">Table 2 - COURT DISPOSITION ON VOLUNTARY CONFINEMENT</option>
		                </optgroup>
	              	</select>

	              	<select class="form-control  hidden" id="sel-51-forms">
	              		<optgroup label="Forms 51">
			                <option value="F50RORCS">RELEASE ON RECOGNIZANCE CASELOAD SUMMARY</option>
			                <option value="F51T1">Table 1 - CARRY OVER INVESTIGATION CASELOAD</option>
			                <option value="F51T2">Table 2 - INVESTIGATION REFERRALS RECEIVED AND ACTED UPON</option>
			                <option value="F51T3">Table 3 - CARRY OVER INVESTIGATION CASES PENDING DISPOSITION BY THE EXECUTIVE DIRECTOR</option>
			                <option value="F51T4">Table 4 - INVESTIGATION CASES DISPOSED OF BY THE EXECUTIVE DIRECTOR</option>
		                </optgroup>
	              	</select>

	              	<select class="form-control  hidden" id="sel-53-forms">
	              		<optgroup label="Forms 53">
			                <option value="F53CSAIPCS">COMMUNITY SERVICE AS IMPRISONMENT PENALTY CASELOAD SUMMARY</option>
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
	            <div class="form-group col-md-1">
            	 	<b>Year-Month:</b><br/>
		            <input name="Date" id="filter_date" class="sel_date date-picker form-control" value="" />
		            
            	</div>
            	<div class="form-group col-md-1">
            		<br/>
    				<button type="button" class="btn btn-primary btn-filter">Filter</button>  
				</div>
			</div>
		</div>

	</div>
</div>
