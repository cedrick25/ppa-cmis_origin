 <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
    	<span class="pull-right" style="padding-right: 10px;">
        <button type="button" class="access_f21_write btn btn-sm btn-success btn-form-submit cppoIsApproved" data-toggle="modal" data-target="#modal-submit"><i class="fa fa-paper-plane"></i> Submit to CPPO Review</button>
        
    		<button type="button" class="access_f21_write btn btn-sm btn-primary form_lock" data-toggle="modal" data-target="#modal-rcv-add"><i class="fa fa-plus-circle"></i> Add New Referral Received Record</button>

        <button type="button" class="access_f21_write btn btn-sm btn-primary form_lock" data-toggle="modal" data-target="#modal-term-add"><i class="fa fa-plus-circle"></i> Add New Referral Terminated Record</button>

        <button type="button" class="btn btn-sm btn-primary btn-download"><i class="fa fa-cloud-download"></i> Download</button>
    		<button type="button" class="btn btn-sm btn-primary btn-print"><i class="fa fa-print"></i> Print</button>
    	</span>
    </div>
  </div>

  <div class="modal fade" id="modal-submit" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header tb-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b><i class="fa fa-paper-plane"></i> Submit To CPPO</b></h4>
        </div>
        <div class="modal-body">
          <p><b>Are you sure you want to submit this to CPPO?</b></p>
          <span class="hidden sel-id"></span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success btnSubmitProceed" >Confirm  <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>


        </div>
        
      </div>

      
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
          <span class="hidden sel-table"></span>
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
<div class="modal fade" id="modal-rcv-edit" role="dialog" data-backdrop="static" data-keyboard="false">
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
                <label for="" class="col-sm-3">Record Type</label>
                <div class="col-sm-9 filter-modal">
                  <select class="select2 modal" id="edit_rcv_table" disabled="">
                    <option value="">Please choose</option>
                    <option value="F21T15_RCV_PAROL">PAROLEE</option>
                    <option value="F21T15_RCV_PARDON">PARDONEE</option>
                  </select>

                </div>
              </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Docket No.</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_docket_no" placeholder="">
                <input type="hidden" class="form-control " id="edit_rcv_id" placeholder="">
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CPD, CPR</i></span>
              </div>
            </div>
            <div class="form-group row">
                <label for="" class="col-sm-3">Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_rcv_probationer" placeholder="">
                </div>
              </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Referring Office</label>
              <div class="col-sm-9   filter-modal ">    
                <select class="form-control select2 modal sel_field_office3" id="edit_rcv_referring_office">
                  
                  <!-- <option value="">OFFICE 2</option> -->
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Received from the PPO</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control  sel_date2" id="edit_rcv_date_rcv">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Supervising Officer</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_supervising" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Period</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_period" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Case Classification</label>
                <div class="col-sm-9 filter-modal">
                   <select class="form-control select2 modal" id="edit_rcv_case_classification" >
                    <option value="MINIMUM">MINIMUM</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="MAXIMUM">MAXIMUM</option>
                  </select>
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
                <input type="text" class="form-control sel_date" Id="edit_rcv_Y_M" placeholder="">
              </div>
            </div>
          </div>
        </div>
        <div class="confirmEdit hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
      </div>
      <div class="modal-footer" id="modal_footer">

        <button type="button" class="btn btn-sm btn-secondary editRCVCancelButton" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary editRCVSubmitButton">Submit</button>
        <button type="button" class="btn btn-sm btn-primary hidden editRCVProceedButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
      </div>
    </div>
  </div>
</div>
<!-- Edit Modal -->

<!-- Add Modal -->
<div class="modal fade" id="modal-rcv-add"  role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <form>
      <div class="modal-content">
        <div class="modal-header tb-header">
          <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Add New Referral Received Record</h4>
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
                <label for="" class="col-sm-3">Record Type</label>
                <div class="col-sm-9 filter-modal">
                  <select class="select2 modal" id="add_rcv_table" >
                    <option value="">Please choose</option>
                    <option value="F21T15_RCV_PAROL">PAROLEE</option>
                    <option value="F21T15_RCV_PARDON">PARDONEE</option>
                  </select>

                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Docket No.</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_rcv_docket_no" placeholder="" >
                  <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CPD, CPR</i></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_rcv_probationer" placeholder="">
                </div>
              </div>
            
            <div class="form-group row">
              <label for="" class="col-sm-3">Referring Office</label>
              <div class="col-sm-9   filter-modal ">    
                <select class="form-control select2 modal sel_field_office3" id="add_rcv_referring_office">
                  
                  <!-- <option value="">OFFICE 2</option> -->
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Received from the PPO</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control  sel_date2" id="add_rcv_date_rcv">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Supervising Officer</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="add_rcv_supervising" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Period of Courtesy Supervision</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="add_rcv_period" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Case Classification</label>
                <div class="col-sm-9 filter-modal">
                   <select class="form-control select2 modal" id="add_rcv_case_classification" >
                    <option value="MINIMUM">MINIMUM</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="MAXIMUM">MAXIMUM</option>
                  </select>
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
                  <input type="text" class="form-control  sel_date" id="add_rcv_Y_M" placeholder="">
                </div>
              </div>
              <!-- upload start -->
              <div class="form-group row">
                <label for="type" class="col-md-3 col-form-label">Type</label>
                <div class="col-sm-9">
                  <select class="form-control add_upload_type col-md-3" id="add_upload_type" name="type" required>
                    <option value="" selected>Select Type</option>
                    <option value="Request for Courtesy Supervision">Request for Courtesy Supervision</option>
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

          <button type="button" class="btn btn-sm btn-secondary addRCVCancelButton" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-sm btn-primary addRCVSubmitButton">Submit</button>
          <button type="button" class="btn btn-sm btn-primary hidden addRCVProceedButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
  </div>
</div>
<!-- Add Modal -->








<!-- Edit Modal -->
<div class="modal fade" id="modal-term-edit" role="dialog" data-backdrop="static" data-keyboard="false">
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
                <label for="" class="col-sm-3">Record Type</label>
                <div class="col-sm-9 filter-modal">
                  <select class="select2 modal" id="edit_term_table" disabled="">
                    <option value="">Please choose</option>
                    <option value="F21T15_TERM_PAROL">PAROLEE</option>
                    <option value="F21T15_TERM_PARDON">PARDONEE</option>
                  </select>

                </div>
              </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Docket No.</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_term_docket_no" placeholder="">
                <input type="hidden" class="form-control " id="edit_term_id" placeholder="">
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CPD, CPR</i></span>
              </div>
            </div>
            <div class="form-group row">
                <label for="" class="col-sm-3">Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_term_probationer" placeholder="">
                </div>
              </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Terminated</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control  sel_date2" id="edit_term_date_terminated">
              </div>
            </div>
            
            <div class="form-group row">
              <label for="" class="col-sm-3">Field Office</label>
              <div class="col-sm-9   filter-modal ">    
                <select class="form-control select2 modal sel_field_office2" id="edit_term_field_office">
                  
                  <!-- <option value="">OFFICE 2</option> -->
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Year-Month</label>
              <div class="col-sm-9">
                <input type="text" class="form-control sel_date" Id="edit_term_Y_M" placeholder="">
              </div>
            </div>
          </div>
        </div>
        <div class="confirmEdit hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
      </div>
      <div class="modal-footer" id="modal_footer">

        <button type="button" class="btn btn-sm btn-secondary editTERMCancelButton" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary editTERMSubmitButton">Submit</button>
        <button type="button" class="btn btn-sm btn-primary hidden editTERMProceedButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
      </div>
    </div>
  </div>
</div>
<!-- Edit Modal -->


<!-- Add Modal -->
<div class="modal fade" id="modal-term-add"  role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <form>
      <div class="modal-content">
        <div class="modal-header tb-header">
          <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Add New Referral Terminated Record</h4>
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
                <label for="" class="col-sm-3">Record Type</label>
                <div class="col-sm-9 filter-modal">
                  <select class="select2 modal" id="add_term_table" >
                    <option value="">Please choose</option>
                    <option value="F21T15_TERM_PAROL">PAROLEE</option>
                    <option value="F21T15_TERM_PARDON">PARDONEE</option>
                  </select>

                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Docket No.</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_term_docket_no" placeholder="" >
                  <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CPD, CPR</i></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_term_probationer" placeholder="">
                </div>
              </div>
            
            <div class="form-group row">
              <label for="" class="col-sm-3">Referring Office</label>
              <div class="col-sm-9   filter-modal ">    
                <select class="form-control select2 modal sel_field_office3" id="add_term_referring_office">
                  
                  <!-- <option value="">OFFICE 2</option> -->
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Returned</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control  sel_date2" id="add_term_date_terminated">
              </div>
            </div>
           
           
                    
           
              <div class="form-group row">
                <label for="" class="col-sm-3">Field Office</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office2" id="add_term_field_office">
                    
                    <!-- <option value="">OFFICE 2</option> -->
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Year-Month</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date" id="add_term_Y_M" placeholder="">
                </div>
              </div>
            <!-- upload start -->
              <div class="form-group row">
                <label for="type" class="col-md-3 col-form-label">Type</label>
                <div class="col-sm-9">
                  <select class="form-control add_upload_type_rt col-md-3" id="add_upload_type_rt" name="type" required>
                    <option value="" selected>Select Type</option>
                    <option value="Courtesy Supervision Terminated">Courtesy Supervision Terminated</option>
                    <option value="Other Document/s">Other Document/s</option>
                  </select>
                </div>
              </div>
              <div class="form-group row remarks-row" style="display: none;">
                  <label for="remarks" class="col-md-3 col-form-label">Remarks</label>
                  <div class="col-sm-9">
                      <textarea class="form-control add_remarks_rt" id="add_remarks_rt" name="remarks" rows="2" placeholder="Enter remarks..."></textarea>
                  </div>
              </div>
              <div class="form-group row">
                <label for="add_fileupload" class="col-md-3 col-form-label">Upload File</label>
                <div class="col-sm-9">
                  <input type="file" class="form-control-file add_fileupload_rt form-control" id="add_fileupload_rt" accept=".jpg, .png, .pdf, .docx" multiple>
                </div>
              </div>
              <input type="hidden" id="FOId" name="FOId">
              <!-- upload end -->
            </div>
          </div>
          <div class="confirmAdd hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
        </div>
        <div class="modal-footer" id="modal_footer">

          <button type="button" class="btn btn-sm btn-secondary addTERMCancelButton" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-sm btn-primary addTERMSubmitButton">Submit</button>
          <button type="button" class="btn btn-sm btn-primary hidden addTERMProceedButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
  </div>
</div>
<!-- Add Modal -->