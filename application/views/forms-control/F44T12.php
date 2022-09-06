 <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <span class="pull-right" style="padding-right: 10px;">
        <button type="button" class="access_f44_write btn btn-sm btn-primary form_lock" data-toggle="modal" data-target="#modal-add"><i class="fa fa-plus-circle"></i> Add New Record</button>
        <button type="button" class="btn btn-sm btn-primary btn-download"><i class="fa fa-cloud-download"></i> Download</button>
        <button type="button" class="btn btn-sm btn-primary btn-print"><i class="fa fa-print"></i> Print</button>
      </span>
      <span class="pull-right" style="padding-right: 10px;">
        <button type="button" class="access_f44_write btn btn-sm btn-success btn-carryover"  data-toggle="modal" data-target="#modal-carryover"><i class="fa fa-stack-overflow"></i> Carry Over</button>
      </span>
    </div>
  </div>

<!-- carry over -->
  <div class="modal fade" id="modal-carryover" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header tb-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b><i class="fa fa-stack-overflow"></i> Carry Over</b></h4>
        </div>
        <div class="modal-body">
          <p><b>Are you sure you want CARRY OVER COURTESY SUPERVISION REFERRALS RECEIVED?</b></p>
          <span class="hidden sel-id"></span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success carryoverProceedButton" >Confirm  <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
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
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CSSS</i></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Offender's First Name</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_offender_fname" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Offender's Middle Name</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_offender_mname" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Offender's Last Name</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_offender_lname" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Offender's Suffix Name</label>
                <div class="col-sm-9 filter-modal">
                    <select class="form-control select2 modal" id="edit_offender_sname" >
                      <option value=""> </option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="JR">JR</option>
                      <option value="SR">SR</option>
                    </select>
                </div>
            </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Referring Field Office (Optional)</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office3" id="edit_field_offices">
                    
                    <!-- <option value="">OFFICE 2</option> -->
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Date Received by PPO</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date2" id="edit_rep_date_submitted" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Supervising Officer</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_supervising_officer" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Reasons for Referral</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_reason_for_referral" placeholder="">
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
                  <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CSSS</i></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's First Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_offender_fname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Middle Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_offender_mname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Last Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_offender_lname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Suffix Name</label>
                <div class="col-sm-9 filter-modal">
                    <select class="form-control select2 modal" id="add_offender_sname" >
                      <option value=""> </option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="JR">JR</option>
                      <option value="SR">SR</option>
                    </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Referring Field Office (Optional)</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office3" id="add_field_offices">
                    
                    <!-- <option value="">OFFICE 2</option> -->
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Date Received by PPO</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date2" id="add_rep_date_submitted" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Supervising Officer</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_supervising_officer" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Reasons for Referral</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_reason_for_referral" placeholder="">
                </div>
              </div>
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