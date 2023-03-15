<?php $this->load->view('templates/header.php'); ?> 
<style>
  #sortable1, #sortable2, #sortable3 { list-style-type: none; margin: 0; float: left; margin-right: 10px; background: #eee; padding: 5px; width: 100%;}
  #sortable1 li, #sortable2 li, #sortable3 li { margin: 5px; padding: 5px; font-size: 10px; width: 100%; }
  </style>
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 

  <div class="modal fade" id="modal-approve" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header tb-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b><i class="fa fa-check"></i> Approve Form</b></h4>
        </div>
        <div class="modal-body">
            <div class="form-group row">
                <label for="" class="col-sm-12">Are you sure you want to approve this form?</label>
                <span class="hidden sel-id"></span>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Remarks</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="remarks_a" placeholder="">
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success btnApprove" >Confirm  <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="modal-carryover" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header tb-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b><i class="fa fa-share"></i> Carry Over </b></h4>
        </div>
        <div class="modal-body">
            <div class="alert alert-success">
              <strong>Processing!</strong> Please wait.<i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span>
            </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modal-reject" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header tb-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b><i class="fa fa-ban"></i> Reject Form</b></h4>
        </div>
        <div class="modal-body">
            <div class="form-group row">
                <label for="" class="col-sm-12">Are you sure you want to reject this form?</label>
                <span class="hidden sel-id"></span>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3">Remarks</label>
              <div class="col-sm-9">
                <input type="text" class="form-control  upperCase" id="remarks_r" placeholder="">
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success btnReject" >Confirm  <span class="pull-right modal-loader hidden"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i></span></button>
        </div>
      </div>
    </div>
  </div>
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
                                <div class="panel-heading"> <h3 class="nav-pills" style="margin-top: 5px; margin-bottom: 5px;   font-size: 18;"><i class="fa fa-list"></i>  CPPO List Review </h3> </div>

                                <div class="panel-body">
                                    <!-- Export: <button class="btn btn-primary btnCSV">CSV</button> <button class="btn btn-primary btnPDF">PDF</button> <button class="btn btn-primary btnXLS">EXCEL</button> -->

                                    <!-- <span class="pull-right "><button class="btn btn-primary" data-toggle="modal" data-target="#modalAdd">Add Report</button></span> -->

                                <br/><br/>
                                    <table id="rlist_table" class="display rlist_table" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>FORM</th>
                                                <th>FIELD</th>
                                                <th>ENCODING MONTH</th>
                                                <th>APPROVAL DATE</th>
                                                <th>APPROVAL STATUS</th>
                                                <th>REMARKS</th>
                                                <th>OPTION</th>
                                            </tr>
                                        </thead>
                                        <tbody id="rlist_tbody" class="rlist_tbody">
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
            // $.wms.dashboard.attachCaseloadListEvent();
            $.wms.reports.form_review();
            
        }, 200);
   });
</script>