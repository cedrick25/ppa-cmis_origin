 <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
    	<span class="pull-right" style="padding-right: 10px;">
    		<button type="button" class="access_f5_write btn btn-sm btn-primary form_lock" data-toggle="modal" data-target="#modal-rcv-add"><i class="fa fa-plus-circle"></i> Add New Courtesy Referral Received Record</button>

        <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal-cmpltd-add"><i class="fa fa-plus-circle"></i> Add New Courtesy Referral Completed Record</button>

        <button type="button" class="btn btn-sm btn-primary btn-download"><i class="fa fa-cloud-download"></i> Download</button>
    		<button type="button" class="btn btn-sm btn-primary btn-print"><i class="fa fa-print"></i> Print</button>
    	</span>
    </div>
  </div>


<!--RCV-->
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
              <label for="" class="col-sm-3">Docket No.</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_docket_no" placeholder="">
                <input type="hidden" class="form-control " id="edit_rcv_id" placeholder="">
                  <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: JCPI, CPI, FBCI</i></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Petitioner's Name</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_petitioner" placeholder="">
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
              <label for="" class="col-sm-3">Investigating Officer</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_investigating_officer" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Reasons</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_rcv_reasons" placeholder="">
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
          <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Add Courtesy Referrals Record</h4>
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
                  <input type="hidden" class="form-control " id="add_rcv_id" placeholder="">
                    <span class="font_10 error_msg"><i class="b">Acceptable Docket Series: JCPI, CPI, FBCI</i></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Petitioner's Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_rcv_petitioner" placeholder="">
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
              <label for="" class="col-sm-3">Investigating Officer</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="add_rcv_investigating_officer" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Reasons</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="add_rcv_reasons" placeholder="">
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
<!--RCV-->



<!-- CMPLTD -->

<!-- Add Modal -->
<div class="modal fade" id="modal-cmpltd-add"  role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <form>
      <div class="modal-content">
        <div class="modal-header tb-header">
          <h4 class="modal-title" id=""><i class="fa fa-plus"></i> Add Courtesy Referrals Returned & Completed Record</h4>
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
                  <input type="text" class="form-control  upperCase" id="add_cmpltd_docket_no" placeholder="" >
                  <input type="hidden" class="form-control " id="add_cmpltd_id" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Petitioner's Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  upperCase" id="add_cmpltd_petitioner" placeholder="">
                </div>
              </div>
              
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Completed and Returned</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control  sel_date2" id="add_cmpltd_date">
              </div>
            </div>
            
              <div class="form-group row">
                <label for="" class="col-sm-3">Field Office</label>
                <div class="col-sm-9   filter-modal ">    
                  <select class="form-control select2 modal sel_field_office2" id="add_cmpltd_field_office">
                    
                    <!-- <option value="">OFFICE 2</option> -->
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3">Year-Month</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control  sel_date" id="add_cmpltd_Y_M" placeholder="">
                </div>
              </div>
            </div>
          </div>
          <div class="confirmAdd hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
        </div>
        <div class="modal-footer" id="modal_footer">

          <button type="button" class="btn btn-sm btn-secondary addCMPLTDCancelButton" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-sm btn-primary addCMPLTDSubmitButton">Submit</button>
          <button type="button" class="btn btn-sm btn-primary hidden addCMPLTDProceedButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
      <input type="reset" class="hidden btn-reset">
    </form>
  </div>
</div>
<!-- Add Modal -->

<!-- Delete Modal -->
  <div class="modal fade" id="modal-cmpltd-delete" role="dialog" data-backdrop="static" data-keyboard="false">
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
          <button type="button" class="btn btn-danger deleteCMPLTDProceedButton" >Confirm  <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>


        </div>
        
      </div>

      
    </div>
  </div>
<!-- Delete Modal -->

<!-- Edit Modal -->
<div class="modal fade" id="modal-cmpltd-edit" role="dialog" data-backdrop="static" data-keyboard="false">
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
                <input type="text" class="form-control  upperCase" id="edit_cmpltd_docket_no" placeholder="">
                <input type="hidden" class="form-control " id="edit_cmpltd_id" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Petitioner's Name</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="edit_cmpltd_petitioner" placeholder="">
              </div>
            </div>
           
            <div class="form-group row">
              <label for="" class="col-sm-3">Date Completed and Returned</label>
              <div class="col-sm-9">
                <input type="text" autocomplete="off" class="form-control  sel_date2" id="edit_cmpltd_date">
              </div>
            </div>
            
            <div class="form-group row">
              <label for="" class="col-sm-3">Field Office</label>
              <div class="col-sm-9   filter-modal ">    
                <select class="form-control select2 modal sel_field_office2" id="edit_cmpltd_field_office">
                  
                  <!-- <option value="">OFFICE 2</option> -->
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Year-Month</label>
              <div class="col-sm-9">
                <input type="text" class="form-control sel_date" Id="edit_cmpltd_Y_M" placeholder="">
              </div>
            </div>
          </div>
        </div>
        <div class="confirmEdit hidden center">Make sure all details are correct. Click <b>Confirm</b> button to proceed: </div>
      </div>
      <div class="modal-footer" id="modal_footer">

        <button type="button" class="btn btn-sm btn-secondary editCMPLTDCancelButton" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary editCMPLTDSubmitButton">Submit</button>
        <button type="button" class="btn btn-sm btn-primary hidden editCMPLTDProceedButton">Confirm <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
      </div>
    </div>
  </div>
</div>
<!-- Edit Modal -->
<!-- CMPLTD -->
