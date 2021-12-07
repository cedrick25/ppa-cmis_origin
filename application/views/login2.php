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
								  <div class="panel-heading ppa-f24">Logging in to Case Management Information System</div>
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
											<input id="txtUsername" type="text" class="form-control font_18" placeholder="Username">

										</div>

										<div>&nbsp;</div>

										<div class="input-group">
											<span class="input-group-addon" ><i class="fa fa-key"></i></span>
											<input id="txtPassword" type="password" class="form-control font_18" placeholder="Password">
										</div>

										<div>&nbsp;</div>

										<div><button id="btnLogin" class="btn btn-primary btn-block pull-right font_20">Log In</button></div>
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
        		//$.wms.login.attachLoginEvent();
        		//console.log()
        		var payload = {
                       key : $.wms.urlParam('key'),
                    }

                    $.wms.executeExternalPost('/ppa-api/wsv1/api/authenticateSSO',JSON.stringify(payload)).done(function (result) {
                        if(result.status == 'SUCCESS'){
                        	var payload2 = {
                               LEVEL_ID : result.payload.USER_LEVEL_ID
	                        }
	                        var date = new Date();
	                        date.setTime(date.getTime() + (180 * 1440 * 60 * 1000));
	                        $.wms.executeExternalPost('/ppa-api/wsv1/api/getUserTypeByModulesByID',JSON.stringify(payload2)).done(function (result2) {
	                        if(result2.status == 'SUCCESS'){
	                            $.cookie("PERMISSIONS", JSON.stringify(result2.payload), {expires: date});
	                            /*for(i=0;i<result2.payload.length;i++){
	                                $.cookie(result2.payload[i].USER_LEVEL_ID, result2.payload[i].ACCESS_RIGHTS, {expires: date});
	                            }*/
	                        }                       
	                            $("#divSuccess").removeClass("hidden");
	                            //alert("Login Success!")
	                            var USER_ID = result.payload.USER_ID
	                            var USER_NAME = result.payload.USER_NAME
	                            var USER_STATUS = result.payload.USER_STATUS
	                            var USER_LEVEL_ID = result.payload.USER_LEVEL_ID
	                            var USER_FULLNAME = result.payload.USER_FULLNAME
	                            var FIELD_OFFICE = result.payload.FIELD_OFFICE

	                            
	                            $.cookie("USER_ID", USER_ID, {expires: date});
	                            $.cookie("USER_NAME", USER_NAME, {expires: date});
	                            $.cookie("USER_FULLNAME", USER_FULLNAME, {expires: date});
	                            $.cookie("FIELD_OFFICE", FIELD_OFFICE, {expires: date});
	                            $.cookie("USER_STATUS", USER_STATUS, {expires: date});
	                            $.cookie("USER_LEVEL_ID", USER_LEVEL_ID, {expires: date});

	                            window.location.href="dashboard"
	                        });
                        }
                    });
            }, 150);
       });
	</script>