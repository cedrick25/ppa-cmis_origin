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
            </div>
            <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_probationer" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Office Findings</label>
                <div class="col-sm-9 filter-modal">
                  <select class="select2 modal" id="edit_findings">
                    <option value="">Please choose</option>
                    <optgroup label="Termination">
                    <option value="Termination - Full Term">Termination - Full Term</option>
                    <option value="Termination - Early Termination">Termination - Early Termination</option>
                    <option value="Termination - Died">Termination - Died</option>
                    </optgroup>
                    <optgroup label="Revocation">
                      <option value="Revocation - Abscond">Revocation - Abscond</option>
                      <option value="Revocation - Commission of Another Offense">Revocation - Commission of Another Offense</option>
                      <option value="Revocation - Violation of Probation Conditions">Revocation - Violation of Probation Conditions</option>
                      <option value="Revocation - Other">Revocation - Other</option>
                    </optgroup>
                    <option value="Extension of Probation Period">Extension of Probation Period</option>
                    <option value="Transfer to Other Courts/PPO">Transfer to Other Courts/PPO</option>
                    <option value="Others">Others</option>
                  </select>

                </div>
              </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Specify the Other Reasons of Revocation</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control " id="edit_reason_other">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Specify the Court/PPO where the probationer is transferred</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control " id="edit_transfer">
              </div>
            </div>
            
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Disposed by the Court </label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control  sel_date2" id="edit_submitted">
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
              <div class="form-group row">
                <label for="" class="col-sm-3">Probationer's Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_probationer" placeholder="">
                </div>
              </div>
            <div class="form-group row">
                <label for="" class="col-sm-3">Office Findings</label>
                <div class="col-sm-9 filter-modal">
                  <select class="select2 modal" id="add_findings">
                    <option value="">Please choose</option>
                    <optgroup label="Termination">
                    <option value="Termination - Full Term">Termination - Full Term</option>
                    <option value="Termination - Early Termination">Termination - Early Termination</option>
                    <option value="Termination - Died">Termination - Died</option>
                    </optgroup>
                    <optgroup label="Revocation">
                      <option value="Revocation - Abscond">Revocation - Abscond</option>
                      <option value="Revocation - Commission of Another Offense">Revocation - Commission of Another Offense</option>
                      <option value="Revocation - Violation of Probation Conditions">Revocation - Violation of Probation Conditions</option>
                      <option value="Revocation - Other">Revocation - Other</option>
                    </optgroup>
                    <option value="Extension of Probation Period">Extension of Probation Period</option>
                    <option value="Transfer to Other Courts/PPO">Transfer to Other Courts/PPO</option>
                    <option value="Others">Others</option>
                  </select>

                </div>
              </div>
            <!-- <div class="form-group row hide" id="Other_specify">
              <label for="" class="col-sm-3"></label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control" id="add_other_specify" placeholder="Others (specify)">
              </div>
            </div> -->
             <div class="form-group row">
              <label for="" class="col-sm-3">Specify the Other Reasons of Revocation</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control " id="add_reason_other">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Specify the Court/PPO where the probationer is transferred</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control " id="add_transfer">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Order Received from the Court </label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control  sel_date2" id="add_submitted">
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
                    <option value="Terminate Order">Terminate Order</option>
                    <option value="Revocation Order">Revocation Order</option>
                    <option value="Violation Order">Violation Order</option>
                    <option value="Order for Extension">Order for Extension</option>
                    <option value="Order for Transfer">Order for Transfer</option>
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