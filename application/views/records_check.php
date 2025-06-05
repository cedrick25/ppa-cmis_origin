<?php $this->load->view('templates/header.php'); ?> 
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 
<br/>
<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<span class="font_20"><b><i class="fa fa-search"></i> Search Records</b></span>
					<span class="font_20 pull-right sshow hidden" style="cursor: pointer;"><i class="fa fa-caret-square-o-down"></i> <u>S</u>how</span>

					<span class="font_20 pull-right shide " style="cursor: pointer;"><i class="fa fa-caret-square-o-up"></i> <u>H</u>ide</span>
				</div>
				<div class="panel-body p1 pp1" style=""><br/>
				    <div class="col-lg-12">
				      <div class="row">
				        <div class="col-lg-6">
				          <div class="form-group row">
				            <div class="col-sm-1"></div>
				            <label for="" class="col-sm-3">Docket No.</label>
				            <div class="col-sm-8">
				              <input type="text" tabindex="-1"  class="form-control input-sm upperCase docket_no" id="docket_no" placeholder="">
				            </div>
				          </div>
				        </div>
				        <div class="col-lg-6">
				          	<div class="form-group row">
					            <div class="col-sm-1"></div>
					            <label for="" class="col-sm-3">Name</label>
					            <div class="col-sm-8">
					              	<input type="text" tabindex="1" class="form-control input-sm upperCase name" id="name" placeholder="">
					            </div>
				          	</div>
						</div>
				      </div>
				    </div>
				</div>
				<div class="panel-footer p1" style="">
					
			     	<div class="row">
			     		<div class="col-lg-9">
		     			</div>
		     			<div class="col-lg-3">
		     				<span class="pull-right">
								<button type="button" class="btn btn btn-reset btn-danger">Reset</button>
			    				<button  tabindex="4" type="button" class="btn btn btn-primary btn-search"><i class="fa fa-search"></i> Search</button>
		    				</span>
    					</div>
					</div>
				</div>
			</div>
		</div>
</div>

<?php
$tables = [
    // f5 tables
    'f5t1', 'f5t2_rcv', 'f5t2_acted', 'f5t2_notacted', 'f5t3', 'f5t4', 'f5t5', 'f5t6_rcv', 'f5t6_cmpltd', 'f5t7', 'f5t8', 'f5t9', 'f5t10', 'f5t11', 'f5t12', 'f5t13_rcv', 'f5t13_term',
    'f21t1', 'f21t2_rcv', 'f21t2_acted', 'f21t4', 'f21t5', 'f21t6_rcv', 'f21t6_cmpltd', 'f21t7_pardon', 'f21t7_parol', 'f21t8_pardon', 'f21t8_parol', 'f21t9_pardon', 'f21t9_parol',
    'f21t10_pardon', 'f21t10_parol', 'f21t11_pardon', 'f21t11_parol', 'f21t12_pardon', 'f21t12_parol', 'f21t13_pardon', 'f21t13_parol', 'f21t14_pardon', 'f21t14_parol', 
    'f21t15_rcv_pardon', 'f21t15_rcv_parol', 'f21t15_term_pardon', 'f21t15_term_parol',
    'f44t1', 'f44t2', 'f44t2_acted', 'f44t3', 'f44t4', 'f44t5', 'f44t6', 'f44t6_car', 'f44t7', 'f44t8', 'f44t9', 'f44t10', 'f44t11', 'f44t12', 'f44t13', 'f44t13_crt',
    'f45t1', 'f45t2', 'f45t2_acted', 'f45t3', 'f45t4', 'f45t5', 'f45t6', 'f45t6_car', 'f45t7', 'f45t8', 'f45t9', 'f45t10', 'f45t11', 'f45t12', 'f45t13', 'f44t13_crt',
    'f50t1', 'f50t2',
    'f51t1', 'f51t2','f51t3', 'f51t4',
    'f53t1', 'f53t2','f53t3', 'f53t4','f53t5','f53t6', 'f53t7','f53t8', 'f53t9','f53t10','f53t11', 
];

foreach ($tables as $table) {
    echo '
    <div class="col-md-12 result_table_' . $table . ' hidden"> <!-- Entire div is hidden initially -->
        <div class="panel panel-primary">
            <div class="panel-body">
                <div class="form_loader_' . $table . ' hidden" center><h2><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Processing.... </h2></div>
                <div class="table-container">
                    <table id="' . $table . '" class="display table-bordered table-condensed nowrap" style="width:100%">
                        <thead class="tb-header small" style="text-align: center;">
                            <tr>
                                <th style="text-align: center;">FORM TABLE</th>
                                <th style="text-align: center;">DOCKET NO.</th>
                                <th style="text-align: center;">NAME</th>
                                <th style="text-align: center;">FIELD OFFICE</th>
                                <th style="text-align: center;">YEAR-MONTH</th>
                                <th style="text-align: center;">CREATED DATE</th>
                            </tr>
                        </thead>
                        <tbody class="small" id="result_body_' . $table . '" style="text-align: center;">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="form_loader_' . $table . ' hidden"><h2><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Processing.... </h2></div>
    ';
}
?>

 <div class="modal fade" id="modal-search" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header tb-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title ppa-f24"><b><i class="fa fa-search"></i> No Record Found</b></h4>
        </div>
        <div class="modal-body ppa-f24">
          <p><b>Search Another?</b></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btnSearchNo"><u>N</u>o</button>
          <button type="button" class="btn btn-danger btnSearchYes" ><u>Y</u>es </button>


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
    	if($.wms.dashboard.checkPermission("7")){
    		$.wms.dashboard.attachPageEvent();
       		$.wms.modal.attachModalEvent();
    		
    		$(".loading-data").fadeOut();

    		$('.filter-modal select').css('width', '100%')
    		
		    $(".select2").select2({
		        width: '100%'
		    });
	        $.wms.widget.attachWidgetEvent();
	        $.wms.records.attachRecordsEvent();
  		}
    }, 200);


    $(".sshow").unbind("click").on("click",function(){
    	$(".sshow").addClass("hidden")
    	$(".shide").removeClass("hidden")
    	$(".p1").fadeIn();
    })

    $(".shide").unbind("click").on("click",function(){
    	$(".shide").addClass("hidden")	
    	$(".sshow").removeClass("hidden")
    	$(".p1").fadeOut();
    })
 });
</script>