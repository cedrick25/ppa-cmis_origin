<?php $this->load->view('templates/header.php'); ?> 
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 

<div class="container loggedBody" hidden>
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
				 <div class="panel-body">
				 	
				 	<div class="row">
				 		<div class="col-md-2">
				 		</div>
				 		<div class="col-md-8">

				 			<center>
				                <br>	
				                	<h4>WELCOME <u><b class="loggedUserName"></b></u> TO THE EXPANSION CASE MANAGEMENT INFORMATION SYSTEM! </h4>
			                </center>    
							
				            
		            		<div class="col-lg-12 hidden" style="text-align:justify"><br>
				                <br>Please note that every activity is monitored closely. For any problem in the system, contact <a href="mail:info@centricitgroup.com">AppCentric Solutions Inc.</a> for details. Click the links under NAVIGATION to select operation. It is recommended to logout by clicking the logout button everytime you leave your PC.
		                   	<br> <br>
		                    	If you do not agree with the terms and conditions or you are not <b class="loggedUserName"></b>, please <a class="lnkLogout">logout</a>.
		                 	<br><br>

		                    </div>


				 		</div>
				 		<div class="col-md-2">
				 		</div>
				 	</div>
			 	</div>
		 	</div>
	 	</div>
 	</div>



  <?php $this->load->view('widgets/feedback_rcv.php'); ?> 


  <?php $this->load->view('widgets/widgets.php'); ?> 

		



</body>
<?php $this->load->view('templates/footer.php'); ?> 

<script type="text/javascript">
	$( window ).ready(function() {
        setTimeout(function () {
      		$.wms.dashboard.attachPageEvent();
          $.wms.modal.attachModalEvent();
      		
      		
      		//$(".loading-data").fadeOut();

      		$('.filter-modal select').css('width', '100%')
      		$(".select2").select2()
      		/*$('.sel_date').datepicker( {
  		        changeMonth: true,
  		        changeYear: true,
  		        showButtonPanel: true,
  		        dateFormat: 'yy-mm',
  		        onClose: function(dateText, inst) { 
  		            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
  		        }
  		    });*/


          $.wms.widget.attachWidgetEvent();
          $.wms.widget.getRcvFeedback()

        }, 200);
   });
</script>