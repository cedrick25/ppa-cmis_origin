 <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <span class="pull-right" style="padding-right: 10px;">
        <button type="button" class="access_f44_write btn-add-rcv btn btn-sm btn-primary form_lock"  data-toggle="modal" data-target="#modal-add-rcv"><i class="fa fa-plus-circle"></i> Add New Referrals Received</button>

        <button type="button" class="access_f44_write btn-add-acted btn btn-sm btn-primary form_lock" data-toggle="modal" data-target="#modal-add-acted"><i class="fa fa-plus-circle"></i> Add New Referrals Acted Upon</button>

      
        
        <button type="button" class="btn btn-sm btn-primary btn-download"><i class="fa fa-cloud-download"></i> Download</button>

        <button type="button" class="btn btn-sm btn-primary btn-print"><i class="fa fa-print"></i> Print</button>
      </span>
    </div>
  </div>


<!-- Add Modal -->
<div class="modal fade" id="modal-add-rcv"  role="dialog" data-backdrop="static" data-keyboard="false">
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
                  <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CSI, RCSI, TCSI</i></span>
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
                <label for="" class="col-sm-3">CC no.</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_cc_no" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Date Received</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date2" id="add_date_rcv">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Investigating Officer</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_investigating_officer" placeholder="">
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

<!-- Edit Modal -->
<div class="modal fade" id="modal-edit-rcv" role="dialog" data-backdrop="static" data-keyboard="false">
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
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CSI, RCSI, TCSI</i></span>
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
              <label for="" class="col-sm-3">CC no.</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_cc_no" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Received</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  sel_date2" id="edit_date_rcv">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Investigating Officer</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_investigating_officer" placeholder="">
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



 <!-- /////////////////acted -->

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
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal docket_list" id="add_acted_docket_no">
                    <option disabled selected>Select Docket number</option>
                  </select>
                  <input type="hidden" class="form-control " id="add_id" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's First Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" disabled id="add_acted_offenders_fname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Middle Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" disabled id="add_acted_offenders_mname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Last Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" disabled id="add_acted_offenders_lname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Suffix Name</label>
                <div class="col-sm-9 filter-modal">
                  <input type="text" class="form-control  upperCase" disabled id="add_acted_offenders_sname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Date Report Submitted</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="add_acted_report_submitted" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">PPO's Recommendation</label>
                <div class="col-sm-9 filter-modal">
                  
                  <select class="form-control select2 modal" id="add_acted_recommendation" >
                    <option value="FOR_GRANT">FOR GRANT</option>
                    <option value="FOR_DENIAL">FOR DENIAL</option>
                  </select>
                </div>
               
              </div>
              <!-- <div class="form-group row">
                <label for="" class="col-sm-3">Field Office</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office2" id="add_acted_field_office">
                    
                  </select>
                </div>
              </div> -->
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

          <button type="button" class="btn btn-sm btn-secondary addCancelButton_cted" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-sm btn-primary addSubmitButton_acted">Submit</button>
          <button type="button" class="btn btn-sm btn-primary hidden addProceedButton_acted">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
  </div>
</div>
<!-- Add Modal -->


<!-- Delete Modal -->
  <div class="modal fade" id="modal-delete-acted" role="dialog" data-backdrop="static" data-keyboard="false">
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
                  <input type="text" class="form-control  upperCase" id="edit_acted_docket_no" placeholder="" >
                <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: CSI, RCSI, TCSI</i></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's First Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_acted_offenders_fname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Middle Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_acted_offenders_mname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Last Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_acted_offenders_lname" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Offender's Suffix Name</label>
                <div class="col-sm-9 filter-modal">
                    <select class="form-control select2 modal" id="edit_acted_offenders_sname" >
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
                <label for="" class="col-sm-3">Date Report Submitted</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="edit_acted_report_submitted" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">PPO's Recommendation</label>
                <div class="col-sm-9 filter-modal">
                  
                  <select class="form-control select2 modal" id="edit_acted_recommendation" >
                    <option value="FOR_GRANT">FOR GRANT</option>
                    <option value="FOR_DENIAL">FOR DENIAL</option>
                  </select>
                </div>
               
              </div>
              <!-- <div class="form-group row">
                <label for="" class="col-sm-3">Field Office</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office2" id="add_acted_field_office">
                    
                  </select>
                </div>
              </div> -->
              <div class="form-group row">
                <label for="" class="col-sm-3">Transfer Date</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase sel_date2" id="edit_acted_transfer_date" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Transfer To</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="edit_acted_transfer_to" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Year-Month</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date" id="edit_acted_Y_M" placeholder="">
                </div>
              </div>
            </div>
          </div>
          <div class="confirmEdit-acted hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
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