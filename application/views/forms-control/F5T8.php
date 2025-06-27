 <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
    	<span class="pull-right" style="padding-right: 10px;">
    		<button type="button" class="access_f5_write btn btn-sm btn-primary form_lock" data-toggle="modal" data-target="#modal-add"><i class="fa fa-plus-circle"></i> Add New Record</button>
        <button type="button" class="btn btn-sm btn-primary btn-download"><i class="fa fa-cloud-download"></i> Download</button>
    		<button type="button" class="btn btn-sm btn-primary btn-print"><i class="fa fa-print"></i> Print</button>
    	</span>
    </div>
  </div>


<!-- Delete Modal -->
  <div class="modal fade" id="modal-delete" role="dialog" data-backdrop="static" data-keyboard="false">
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
          <button type="button" class="btn btn-danger deleteProceedButton" >Confirm  <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>


        </div>
        
      </div>

      
    </div>
  </div>
<!-- Delete Modal -->


<!-- Edit Modal -->
<div class="modal fade" id="modal-edit" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header tb-header">
        <h4 class="modal-title" id=""><i class="fa fa-pencil"></i> Update Record</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          
        </button>
      </div>
      <div class="modal-body modal-loader2 hidden">
        <div class="row b">
          <div><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Loading Data...</div>
        </div>
      </div>
      <div class=" hidden modal-body modal-form">
        <div class="row" id="form_">
          <div class="col-lg-12">
            <div class="form-group row">
              <label for="" class="col-sm-3">Docket No.</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_docket_no" placeholder="">
                <input type="hidden" class="form-control " id="edit_id" placeholder="">
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: JPS, PS, JRPS, RPS, JTPS, TPS</i></span>
              </div>
            </div><!-- 
            <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_probationer" placeholder="">
                </div>
              </div> -->

              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's First Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_fname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Middle Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_mname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Last Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_lname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Suffix Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_sname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Alias</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_probationer_alias" placeholder="">
                </div>
              </div>
               <div class="form-group row">
                <label for="" class="col-sm-3">Type of Referrals</label>
                <div class="col-sm-9 filter-modal">
                   <select class="form-control select2 modal" id="edit_type_referrals" >
                    <option value="From Local Courts">From Local Courts</option>
                    <option value="Direct Transfer, Court to Court">Direct Transfer, Court to Court</option>
                    <option value="From Military Courts">From Military Courts</option>
                    <option value="Transfer from other Offices/Courts">Transfer from other Offices/Courts</option>
                    <option value="Reconsidered/Reinstated">Reconsidered/Reinstated</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-3">CC no.</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control upperCase input-sm" id="edit_cc_no" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Court of Origin</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control upperCase input-sm" id="edit_court_origin" placeholder="">
                </div>
              </div>
            
            
             <div class="form-group row">
              <label for="" class="col-sm-3">Case Classification</label>
              <div class="col-sm-9 filter-modal">
                   <select class="form-control select2 modal" id="edit_case_classification" >
                    <option value="MINIMUM">MINIMUM</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="MAXIMUM">MAXIMUM</option>
                  </select>
                </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Received by the PPO </label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="edit_date_rcv">
              </div>
            </div>
            <div class="form-group row">
                <label for="" class="col-sm-3">Supervising Officer</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_supervising" placeholder="">
                </div>
              </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Probation Start Date</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="edit_start">
              </div>
            </div>

            <div class="form-group row">
              <label for="" class="col-sm-3">Probation End Date</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="edit_end">
              </div>
            </div>
           
            <div class="form-group row">
              <label for="" class="col-sm-3">Field Office</label>
              <div class="col-sm-9   filter-modal ">    
                <select class="form-control select2 modal sel_field_office2" id="edit_field_office">
                  
                  <!-- <option value="">OFFICE 2</option> -->
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Year-Month</label>
              <div class="col-sm-9">
                <input type="text" class="form-control sel_date" Id="edit_Y_M" placeholder="">
              </div>
            </div>
          </div>
        </div>
        <div class="confirmEdit hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
      </div>
      <div class="modal-footer" id="modal_footer">

        <button type="button" class="btn btn-sm btn-secondary editCancelButton" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary editSubmitButton">Submit</button>
        <button type="button" class="btn btn-sm btn-primary hidden editProceedButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
      </div>
    </div>
  </div>
</div>
<!-- Edit Modal -->

<!-- Add Modal -->
<div class="modal fade" id="modal-add"  role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <form>
      <div class="modal-content">
        <div class="modal-header tb-header">
          <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Add Record</h4>
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
                  <input type="text" class="form-control  upperCase" id="add_docket_no" placeholder="" >
                  <input type="hidden" class="form-control " id="add_id" placeholder="">
                  <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: JPS, PS, JRPS, RPS, JTPS, TPS</i></span>
                </div>
              </div>
              <!-- <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_probationer" placeholder="">
                </div>
              </div> -->
              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's First Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_fname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Middle Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_mname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Last Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_lname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Suffix Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_sname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Alias</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_probationer_alias" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Type of Referrals</label>
                <div class="col-sm-9 filter-modal">
                   <select class="form-control select2 modal" id="add_type_referrals" >
                    <option value="From Local Courts">From Local Courts</option>
                    <option value="Direct Transfer, Court to Court">Direct Transfer, Court to Court</option>
                    <option value="From Military Courts">From Military Courts</option>
                    <option value="Transfer from other Offices/Courts">Transfer from other Offices/Courts</option>
                    <option value="Reconsidered/Reinstated">Reconsidered/Reinstated</option>
                  </select>
                </div>
              </div>
              <div class="form-group row refer hide">
                <label for="" class="col-sm-3">Reffering Office</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control upperCase input-sm" id="add_reffering" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">CC no.</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control upperCase input-sm" id="add_cc_no" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Court of Origin</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control upperCase input-sm" id="add_court_origin" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Case Classification</label>
                <div class="col-sm-9 filter-modal">
                   <select class="form-control select2 modal" id="add_case_classification" >
                    <option value="MINIMUM">MINIMUM</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="MAXIMUM">MAXIMUM</option>
                  </select>
                </div>
              </div>
            
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Received by the PPO </label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="add_date_rcv">
              </div>
            </div>
            <div class="form-group row">
                <label for="" class="col-sm-3">Supervising Officer</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_supervising" placeholder="">
                </div>
              </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Probation Start Date</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="add_start">
              </div>
            </div>

            <div class="form-group row">
              <label for="" class="col-sm-3">Probation End Date</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="add_end">
              </div>
            </div>
            
              <div class="form-group row">
                <label for="" class="col-sm-3">Field Office</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office2" id="add_field_office">
                    
                    <!-- <option value="">OFFICE 2</option> -->
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Year-Month</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date" id="add_Y_M" placeholder="">
                </div>
              </div>
              <!-- upload start -->
              <div class="form-group row">
                <label for="type" class="col-md-3 col-form-label">Type</label>
                <div class="col-sm-9">
                  <select class="form-control add_upload_type col-md-3" id="add_upload_type" name="type" required>
                    <option value="" selected>Select Type</option>
                    <option value="Order of Grant of Probation">Order of Grant of Probation</option>
                    <option value="Transfer Order">Transfer Order</option>
                    <option value="Fingerprint Record">Fingerprint Record</option>
                    <option value="Other Document/s">Other Document/s</option>
                  </select>
                </div>
              </div>
              <div class="form-group row remarks-row" style="display: none;">
                  <label for="remarks" class="col-md-3 col-form-label">Remarks</label>
                  <div class="col-sm-9">
                      <textarea class="form-control add_remarks" id="add_remarks" name="remarks" rows="2" placeholder="Enter remarks..."></textarea>
                  </div>
              </div>
              <div class="form-group row">
                <label for="add_fileupload" class="col-md-3 col-form-label">Upload File</label>
                <div class="col-sm-9">
                  <input type="file" class="form-control-file add_fileupload form-control" id="add_fileupload" accept=".jpg, .png, .pdf, .docx" multiple>
                </div>
              </div>
              <input type="hidden" id="FOId" name="FOId">
              <!-- upload end -->
            </div>
          </div>
          <div class="confirmAdd hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
        </div>
        <div class="modal-footer" id="modal_footer">

          <button type="button" class="btn btn-sm btn-secondary addCancelButton" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-sm btn-primary addSubmitButton">Submit</button>
          <button type="button" class="btn btn-sm btn-primary hidden addProceedButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
  </div>
</div>
<!-- Add Modal -->