 <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
    	<span class="pull-right" style="padding-right: 10px;">
    		<button type="button" class="access_f21_write btn-add-rcv btn btn-sm btn-primary"  data-toggle="modal" data-target="#modal-add-rcv"><i class="fa fa-plus-circle"></i> Add New Referrals Received</button>

    		<button type="button" class="access_f21_write btn-add-acted btn btn-sm btn-primary" data-toggle="modal" data-target="#modal-add-acted"><i class="fa fa-plus-circle"></i> Add New Referrals Acted Upon</button>

    	
        
        <button type="button" class="btn btn-sm btn-primary btn-download"><i class="fa fa-cloud-download"></i> Download</button>

    		<button type="button" class="btn btn-sm btn-primary btn-print"><i class="fa fa-print"></i> Print</button>
    	</span>
    </div>
  </div>





<!-- Add Modal -->
<div class="modal fade" id="modal-add-rcv" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form>
      <div class="modal-header tb-header">
        <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Add Referrals Received Record</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          
        </button>
      </div>
      <div class="modal-body modal-loader2 hidden">
        <div class="row b">
          <div><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Loading Data...</div>
        </div>
      </div>
      <div class="  modal-body modal-form">
        <div class="row" id="form_">
          <div class="col-lg-12">
            <div class="form-group row">
              <label for="" class="col-sm-3">Docket No.</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="add_rcv_docket_no" placeholder="" >
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: PPI, PECI, TPPI, TPECI</i></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Petitioner's Name</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="add_rcv_petitioner" placeholder="">
              </div>
            </div>
             <div class="form-group row">
		        <label for="" class="col-sm-3">CC NO.</label>
		        <div class="col-sm-9">
		          <input type="text" class="form-control " id="add_rcv_case_no" placeholder="">
		        </div>
	      	</div>
	      	<div class="form-group row">
            <label for="" class="col-sm-3">Name of Prison/Jail</label>
            <div class="col-sm-9">
              <input type="text" class="form-control " id="add_rcv_court_origin" placeholder="">
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-3">From</label>
              <div class="col-sm-9 filter-modal">
                 <select class="form-control select2 modal" id="add_rcv_from" >
                  <option value="Penal Colony">Penal Colony</option>
                  <option value="Prison">Prison</option>
                  <option value="Jail">Jail</option>
                </select>
              </div>
          </div>
		      <div class="form-group row">
		        <label for="" class="col-sm-3">Offense</label>
		        <div class="col-sm-9">
		          <input type="text" class="form-control " id="add_rcv_offense" placeholder="">
		        </div>
		      </div>
		      <!-- <div class="form-group row">
		        <label for="" class="col-sm-3">Sentence</label>
		        <div class="col-sm-9">
		          <input type="text" class="form-control " id="add_rcv_sentence" placeholder="">
		        </div>
		      </div> -->
		      <!-- <div class="form-group row">
		        <label for="" class="col-sm-3">Date of Court Order</label>
		        <div class="col-sm-9">
		          <input type="text" class="form-control  sel_date2" id="add_rcv_date_of_court_order">
		        </div>
		      </div> -->
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Received by the PPO</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="add_rcv_date_rcv">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Investigating Officer</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="add_rcv_investigating_officer" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Field Office</label>
              <div class="col-sm-9   filter-modal ">    
                <select class="form-control select2 modal sel_field_office2" id="add_rcv_field_office">
                  
                  <!-- <option value="">OFFICE 2</option> -->
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Year-Month</label>
              <div class="col-sm-9">
                <input type="text" class="form-control sel_date" id="add_rcv_Y_M" placeholder="">
              </div>
            </div>
          </div>
        </div>
        <div class="confirmAdd hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
      </div>
      <div class="modal-footer" id="modal_footer">

        <button type="button" class="btn btn-sm btn-secondary addCancelRCVButton" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary addSubmitRCVButton">Submit</button>
        <button type="button" class="btn btn-sm btn-primary hidden addProceedRCVButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
    </div>
  </div>
</div>
<!-- Add Modal -->


<!-- Add Acted Modal -->
<div class="modal fade" id="modal-add-acted" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <form>
      <div class="modal-content">
        <div class="modal-header tb-header">
          <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Add Referrals Acted Upon Record</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            
          </button>
        </div>
        <div class="modal-body modal-loader2 hidden">
          <div class="row b">
            <div><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Loading Data...</div>
          </div>
        </div>
        <div class="  modal-body modal-form">
          <div class="row" id="form_">
            <div class="col-lg-12">
              <div class="form-group row">
                <label for="" class="col-sm-3">Docket No.</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_acted_docket_no" placeholder="" >
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: PPI, PECI, TPPI, TPECI</i></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Petitioner's Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_acted_petitioner" placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-3">Date Pre-Parole/Executive Clemency Investigation Report Submitted</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="add_acted_psir" placeholder="">
                </div>
              </div>

              <!-- <div class="form-group row">
                <label for="" class="col-sm-3">Manifestation Date</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="add_acted_manifest" placeholder="">
                </div>
              </div> -->
               
              <div class="form-group row">
                <label for="" class="col-sm-3">PPO's Recommendation</label>
                <div class="col-sm-9 filter-modal">
                  
                  <select class="form-control select2 modal" id="add_acted_recommendation" >
                    <option value="">None</option>
                    <option value="Parole - For Granted">Parole - For Grant</option>
                    <option value="Parole - For Denial">Parole - For Denial</option>
                    <option value="Commutation - For Granted">Commutation - For Grant</option>
                    <option value="Commutation - For Denial">Commutation - For Denial</option>
                    <option value="Conditional Pardon - For Granted">Conditional Pardon - For Grant</option>
                    <option value="Conditional Pardon - For Denial">Conditional Pardon - For Denial</option>
                    <option value="Absolute Pardon - For Granted">Absolute Pardon - For Grant</option>
                    <option value="Absolute Pardon - For Denial">Absolute Pardon - For Denial</option>
                    <option value="Other">Other</option>
                    <!-- <option value="Transferred">Transferred</option> -->
                  </select>
                </div>
               
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Field Office</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office2" id="add_acted_field_office">
                    
                    <!-- <option value="">OFFICE 2</option> -->
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Transfer Date</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="add_acted_transfer_date" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Transfer To</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_acted_transfer_to" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Year-Month</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date" id="add_acted_Y_M" placeholder="">
                </div>
              </div>
            </div>
          </div>
          <div class="confirmAdd hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
        </div>
        <div class="modal-footer" id="modal_footer">

          <button type="button" class="btn btn-sm btn-secondary addCancelACTEDButton" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-sm btn-primary addSubmitACTEDButton">Submit</button>
          <button type="button" class="btn btn-sm btn-primary hidden addProceedACTEDButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
  </div>
</div>
<!-- Add Modal -->





<!-- Edit RCV Modal -->
<div class="modal fade" id="modal-edit-rcv" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form>
      <div class="modal-header tb-header">
        <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Update Referrals Received Record</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          
        </button>
      </div>
      <div class="modal-body modal-loader2 hidden">
        <div class="row b">
          <div><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Loading Data...</div>
        </div>
      </div>
      <div class="  modal-body modal-form">
        <div class="row" id="form_">
          <div class="col-lg-12">
            <div class="form-group row">
              <label for="" class="col-sm-3">Docket No.</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_docket_no" placeholder="" >

                <input type="hidden" class="form-control  upperCase" id="edit_rcv_id" placeholder="" >
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: PPI, PECI, TPPI, TPECI</i></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Petitioner's Name</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_petitioner" placeholder="">
              </div>
            </div>
             <div class="form-group row">
            <label for="" class="col-sm-3">CC NO.</label>
            <div class="col-sm-9">
              <input type="text" class="form-control " id="edit_rcv_case_no" placeholder="">
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-3">Name of Prison/Jail</label>
            <div class="col-sm-9">
              <input type="text" class="form-control " id="edit_rcv_court_origin" placeholder="">
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-3">From</label>
              <div class="col-sm-9 filter-modal">
                 <select class="form-control select2 modal" id="edit_rcv_from" >
                  <option value="Penal Colony">Penal Colony</option>
                  <option value="Prison">Prison</option>
                  <option value="Jail">Jail</option>
                </select>
              </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-3">Offense</label>
            <div class="col-sm-9">
              <input type="text" class="form-control " id="edit_rcv_offense" placeholder="">
            </div>
          </div>
         <!--  <div class="form-group row">
            <label for="" class="col-sm-3">Sentence</label>
            <div class="col-sm-9">
              <input type="text" class="form-control " id="edit_rcv_sentence" placeholder="">
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-3">Date of Court Order</label>
            <div class="col-sm-9">
              <input type="text" class="form-control  sel_date2" id="edit_rcv_date_of_court_order">
            </div>
          </div> -->
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Received by the PPO</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="edit_rcv_date_rcv">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Investigating Officer</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_investigating_officer" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Field Office</label>
              <div class="col-sm-9   filter-modal ">    
                <select class="form-control select2 modal sel_field_office2" id="edit_rcv_field_office">
                  
                  <!-- <option value="">OFFICE 2</option> -->
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Year-Month</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date" id="edit_rcv_Y_M" placeholder="">
              </div>
            </div>
          </div>
        </div>
        <div class="confirmEdit hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
      </div>
      <div class="modal-footer" id="modal_footer">

        <button type="button" class="btn btn-sm btn-secondary editCancelRCVButton" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary editSubmitRCVButton">Submit</button>
        <button type="button" class="btn btn-sm btn-primary hidden editProceedRCVButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
    </div>
  </div>
</div>
<!-- Edit RCV Modal -->


<!-- Delete Modal -->
  <div class="modal fade" id="modal-rcv-delete" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header tb-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b><i class="fa fa-trash-o"></i> Delete Record</b></h4>
        </div>
        <div class="modal-body">
          <p><b>Are you sure you want to delete <u class="color-red">Docket No.:<span class="sel-docket"></span></u>?</b></p>
          <span class="hidden sel-id"></span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger deleteRCVProceedButton" >Confirm  <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>


        </div>
        
      </div>

      
    </div>
  </div>
<!-- Delete Modal -->


<!-- Delete Modal -->
  <div class="modal fade" id="modal-acted-delete" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header tb-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b><i class="fa fa-trash-o"></i> Delete Record</b></h4>
        </div>
        <div class="modal-body">
          <p><b>Are you sure you want to delete <u class="color-red">Docket No.:<span class="sel-docket"></span></u>?</b></p>
          <span class="hidden sel-id"></span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger deleteACTEDProceedButton" >Confirm  <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>


        </div>
        
      </div>

      
    </div>
  </div>
<!-- Delete Modal -->


<!-- Edit Acted Modal -->
<div class="modal fade" id="modal-edit-acted" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <form>
      <div class="modal-content">
        <div class="modal-header tb-header">
          <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Edit Referrals Acted Upon Record</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            
          </button>
        </div>
        <div class="modal-body modal-loader2 hidden">
          <div class="row b">
            <div><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Loading Data...</div>
          </div>
        </div>
        <div class="  modal-body modal-form">
          <div class="row" id="form_">
            <div class="col-lg-12">
              <div class="form-group row">
                <label for="" class="col-sm-3">Docket No.</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="acted_acted_docket_no" placeholder="" >
                  <input type="hidden" class="form-control  upperCase" id="acted_acted_id" placeholder="" >
                  <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: PPI, PECI, TPPI, TPECI</i></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Petitioner's Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="acted_acted_petitioner" placeholder="">
                </div>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-3">Date Pre-Parole/Executive Clemency Investigation Report Submitted</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="acted_acted_psir" placeholder="">
                </div>
              </div>

              <!-- <div class="form-group row">
                <label for="" class="col-sm-3">Manifestation Date</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="acted_acted_manifest" placeholder="">
                </div>
              </div> -->
               
              <div class="form-group row">
                <label for="" class="col-sm-3">PPO's Recommendation</label>
                <div class="col-sm-9 filter-modal">
                  
                  <select class="form-control select2 modal" id="acted_acted_recommendation" >
                    <option value="">None</option>
                    <option value="Parole - For Granted">Parole - For Grant</option>
                    <option value="Parole - For Denial">Parole - For Denial</option>
                    <option value="Commutation - For Granted">Commutation - For Grant</option>
                    <option value="Commutation - For Denial">Commutation - For Denial</option>
                    <option value="Conditional Pardon - For Granted">Conditional Pardon - For Grant</option>
                    <option value="Conditional Pardon - For Denial">Conditional Pardon - For Denial</option>
                    <option value="Absolute Pardon - For Granted">Absolute Pardon - For Grant</option>
                    <option value="Absolute Pardon - For Denial">Absolute Pardon - For Denial</option>
                    <option value="Other">Other</option>
                    <!-- <option value="Transferred">Transferred</option> -->
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Field Office</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office2" id="acted_acted_field_office">
                    
                    <!-- <option value="">OFFICE 2</option> -->
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Transfer Date</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="acted_acted_transfer_date" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Transfer To</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="acted_acted_transfer_to" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Year-Month</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date" id="acted_acted_Y_M" placeholder="">
                </div>
              </div>
            </div>
          </div>
          <div class="confirmAdd hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
        </div>
        <div class="modal-footer" id="modal_footer">

          <button type="button" class="btn btn-sm btn-secondary editCancelACTEDButton" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-sm btn-primary editSubmitACTEDButton">Submit</button>
          <button type="button" class="btn btn-sm btn-primary hidden editProceedACTEDButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
  </div>
</div>
<!-- Edit Modal -->