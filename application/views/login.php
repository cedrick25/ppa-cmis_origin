<?php $this->load->view('templates/header.php'); ?> 
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 


<div class="container">

	<div class="row" >
		<div class="col-md-12" >
				<div class="panel panel-default">
					 <div class="panel-body" style="background-image: url('assets/img/bg.jpg');height:450px">
					 	<div class="col-md-3">
							</div>		

							<div class="col-md-6 ">
								<div class="hidden-xs"><br/><br/></div><br/>
								<div class="panel panel-default panel-primary">
								  <div class="panel-heading ppa-f24">Login to Case Management Information System</div>
								  <div class="panel-body">
									

								  	
								  	<div class="alert alert-info" role="alert"  style="font-weight: bolder" id="divLoading">
									  <i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Loading...
									</div>

									<div id="divLogin" style="display:none">

									  	<div class="alert alert-danger hidden" role="alert" id="divAlert">
										  <i class="fa fa-exclamation-triangle"></i>
										  <span class="sr-only">Error:</span>
										  Enter a valid Username/Password
										</div>

										<div class="alert alert-danger hidden" role="alert" id="divInactive">
										  <i class="fa fa-exclamation-triangle"></i>
										  <span class="sr-only">Error:</span>
										  User is currently inactive. Please contact System Administrator!
										</div>

										<div class="alert alert-success hidden" role="alert" id="divSuccess">
										  <i class="fa fa-check"></i>
										  Success! Redirecting...
										</div>


										<div class="input-group">
											<span class="input-group-addon" ><i class="fa fa-user"></i>&nbsp;</span>
											<input id="txtUsername" type="text" class="form-control font_18" placeholder="Email">

										</div>

										<div>&nbsp;</div>

										<div class="input-group">
											<span class="input-group-addon" ><i class="fa fa-key"></i></span>
											<input id="txtPassword" type="password" class="form-control font_18" placeholder="Password">
										</div>

										<div>&nbsp;</div>

										<div><button id="btnLogin" class="btn btn-primary btn-block pull-right font_20">Log In</button></div>
									</div>

									<div id="divLoginOTP"  class="hidden">

									  	
										<input type="hidden" id="otpkeygen" value="">
										<div class="alert alert-danger hidden" role="alert" id="divInactive">
										  <i class="fa fa-exclamation-triangle"></i>
										  <span class="sr-only">Error:</span>
										  User is currently inactive. Please contact System Administrator!
										</div>

										<div class="alert alert-success hidden" role="alert" id="divOtpSuccess">
										  <i class="fa fa-check"></i>
										  OTP verified Success! Redirecting to dashboard...
										</div>

										<div class="alert alert-info " role="alert" id="divOtpEnter">
										  <i class="fa fa-info"></i>
										  One Time PIN (OTP) key has been sent to your Contact Number. The key will be expire in 5 Minutes.
										</div>
										

										<div class="input-group">
											<span class="input-group-addon" ><i class="fa fa-key"></i></span>
											<input id="txtLoginOtp" type="text" class="form-control font_18" placeholder="One Time PIN">
										</div>

										<div>&nbsp;</div>

										<div>
											<button id="btnResendOtp" class="hidden btn btn-success btn-block pull-right font_20">Resend OTP</button>
											<button id="btnLoginOtp" class="btn btn-primary btn-block pull-right font_20">Submit OTP</button>

											
										</div>
									</div>
								  </div>
								</div>
							</div>

							<div class="col-md-3">
							</div>		
					 </div>
				 </div>
		 </div>
		

	</div>
</div>



</body>
<?php $this->load->view('templates/footer.php'); ?> 


	<script type="text/javascript">
		$( window ).ready(function() {
            setTimeout(function () {
        		$.wms.login.attachLoginEvent();

            }, 150);
       });
	</script>