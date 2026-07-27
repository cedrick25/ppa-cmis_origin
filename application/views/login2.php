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
								  <div class="panel-heading ppa-f24">Logging in to Expansion Case Management Information System</div>
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
        		//$.wms.login.attachLoginEvent();
        		//console.log()
        		var payload = {
                       key : $.wms.urlParam('key'),
                    }

                    // $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/api/authenticateSSO',JSON.stringify(payload)).done(function (result) {
                    //     if(result.status == 'SUCCESS'){
                    //     	var payload2 = {
                    //            LEVEL_ID : result.payload.USER_LEVEL_ID
	                   //      }
	                   //      var date = new Date();
	                   //      date.setTime(date.getTime() + (180 * 1440 * 60 * 1000));
	                   //      $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/api/getUserTypeByModulesByID',JSON.stringify(payload2)).done(function (result2) {
	                   //      if(result2.status == 'SUCCESS'){
	                   //          $.cookie("PERMISSIONS", JSON.stringify(result2.payload), {expires: date});
	                   //          /*for(i=0;i<result2.payload.length;i++){
	                   //              $.cookie(result2.payload[i].USER_LEVEL_ID, result2.payload[i].ACCESS_RIGHTS, {expires: date});
	                   //          }*/
	                   //      }                       
	                   //          $("#divSuccess").removeClass("hidden");
	                   //          //alert("Login Success!")
	                   //          var USER_ID = result.payload.USER_ID
	                   //          var USER_NAME = result.payload.USER_NAME
	                   //          var USER_STATUS = result.payload.USER_STATUS
	                   //          var USER_LEVEL_ID = result.payload.USER_LEVEL_ID
	                   //          var USER_FULLNAME = result.payload.USER_FULLNAME
	                   //          var FIELD_OFFICE = result.payload.FIELD_OFFICE

	                            
	                   //          $.cookie("USER_ID", USER_ID, {expires: date});
	                   //          $.cookie("USER_NAME", USER_NAME, {expires: date});
	                   //          $.cookie("USER_FULLNAME", USER_FULLNAME, {expires: date});
	                   //          $.cookie("FIELD_OFFICE", FIELD_OFFICE, {expires: date});
	                   //          $.cookie("USER_STATUS", USER_STATUS, {expires: date});
	                   //          $.cookie("USER_LEVEL_ID", USER_LEVEL_ID, {expires: date});

	                   //          window.location.href="dashboard"
	                   //      });
                    //     }
                    // });


            		$.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/api/authenticateSSO',JSON.stringify(payload)).done(function (result) {
            			console.log(result);
                        if(result.status == 'SUCCESS'){
                			$("#divLoading").addClass("hidden");

		                    if(result.payload.USER_STATUS === '0'){
		                        $("#divInactive").removeClass("hidden")
		                    }else{
		                        OTP_KEY = Math.floor(Math.random()*90000) + 10000;
		                        $("#otpkeygen").val(OTP_KEY)
		                        $("#otpkeygen").val(OTP_KEY)
		                        if(result.payload.USER_LEVEL_ID == 1){
		                            var payload2 = {
		                                LEVEL_ID : result.payload.USER_LEVEL_ID
		                            }
		                            var date = new Date();
		                            date.setTime(date.getTime() + (180 * 1440 * 60 * 1000));
		                            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/api/getUserTypeByModulesByID',JSON.stringify(payload2)).done(function (result2) {
		                            if(result2.status == 'SUCCESS'){
		                                $.cookie("PERMISSIONS", JSON.stringify(result2.payload), {expires: date});

		                            }

		                                $("#divOtpEnter").addClass("hidden");
		                                $("#divSuccess").removeClass("hidden");
		                                //alert("Login Success!")
		                                var USER_ID = result.payload.USER_ID
		                                var USER_NAME = result.payload.USER_NAME
		                                var USER_STATUS = result.payload.USER_STATUS
		                                var USER_LEVEL_ID = result.payload.USER_LEVEL_ID
		                                var USER_FULLNAME = result.payload.USER_FULLNAME
		                                var USER_EMAIL = result.payload.USER_EMAIL
		                                var FIELD_OFFICE = result.payload.FIELD_OFFICE
		                                var H = result.payload.HASH

		                                
		                                $.cookie("USER_ID", USER_ID, {expires: date});
		                                $.cookie("USER_NAME", USER_NAME, {expires: date});
		                                $.cookie("USER_FULLNAME", USER_FULLNAME, {expires: date});
		                                $.cookie("USER_EMAIL", USER_EMAIL, {expires: date});
		                                $.cookie("FIELD_OFFICE", FIELD_OFFICE, {expires: date});
		                                $.cookie("USER_STATUS", USER_STATUS, {expires: date});
		                                $.cookie("USER_LEVEL_ID", USER_LEVEL_ID, {expires: date});
		                                $.cookie("H", H, {expires: date});
		                                setTimeout(function () {
		                                    window.location.href="dashboard"
		                                },1000);
		                            });
		                        }else{
		                            var myDate = new Date();
		                            dt = (myDate.getFullYear() + '-' +('0' + (myDate.getMonth()+1)).slice(-2)+ '-' +  ('0' + myDate.getDate()).slice(-2) + ' '+myDate.getHours()+ ':'+('0' + (myDate.getMinutes())).slice(-2)+ ':'+myDate.getSeconds());
		                                    
		                        var payload3  = {
		                            api_key : "98809558920210831045603",
		                            message_CONTENT : "Hi " + result.payload.USER_FULLNAME + ", your OTP KEY is " + $("#otpkeygen").val() +".",
		                            message_TO : result.payload.USER_CONTACT,
		                            CREATED_BY : "1",
		                            message_DATETIME : dt
		                        }
		                        $.wms.executeExternalPost2(window.location.protocol + '//otp.probation.gov.ph/ppa-api-uams/wsv1/api/insertSMSManually',JSON.stringify(payload3)).done(function (result2) {
		                            
		                        });

		                        var payloadEmail  = {
		                            "message_CONTENT" : "Hi " + result.payload.USER_FULLNAME + ", your OTP KEY is " + $("#otpkeygen").val() +".",
		                            "message_TO" : result.payload.USER_EMAIL,
		                            // "message_TO" : "notification@probation.gov.ph",
		                        }
		                        $.wms.executeExternalPost2(window.location.protocol  + '//eppcmis.probation.gov.ph/ppa-api-uams/wsv1/api/email',JSON.stringify(payloadEmail)).done(function (resultemail) {
		                           
		                        });
		                        $("#divLogin").addClass("hidden");
		                        $("#divLoginOTP").removeClass("hidden");

		                        $("#btnResendOtp").unbind("click").on("click",function(){
		                            $("#btnResendOtp").addClass("hidden");
		                            var payload3  = {
		                                api_key : "98809558920210831045603",
		                                message_CONTENT : "Hi " + result.payload.USER_FULLNAME + ", your OTP KEY is " + $("#otpkeygen").val() +".",
		                                message_TO : result.payload.USER_CONTACT,
		                                CREATED_BY : "1",
		                                message_DATETIME : dt
		                            }
		                            $.wms.executeExternalPost2(window.location.protocol + '//otp.probation.gov.ph/ppa-api-uams/wsv1/api/insertSMSManually',JSON.stringify(payload3)).done(function (result2) {
		                            });


		                            var payloadEmail  = {
		                                "message_CONTENT" : "Hi " + result.payload.USER_FULLNAME + ", your OTP KEY is " + $("#otpkeygen").val() +".",
		                                "message_TO" : result.payload.USER_EMAIL,
		                            }
		                            $.wms.executeExternalPost2(window.location.protocol  + '//eppcmis.probation.gov.ph/ppa-api-uams/wsv1/api/email',JSON.stringify(payloadEmail)).done(function (resultemail) {
		                            
		                            });

		                            setTimeout(function(){
		                                $("#btnResendOtp").removeClass("hidden");
		                            }, 60*1000*5);
		                            
		                        });


		                        setTimeout(function(){
		                            $("#btnResendOtp").removeClass("hidden");
		                        }, 60*1000*5);
		                        

		                        $("#btnLoginOtp").unbind("click").on("click",function(){
		                            //if($("#txtLoginOtp").val() == 'ppa2021'){
		                            if($("#txtLoginOtp").val() == $("#otpkeygen").val()){


		                                        var payload2 = {
		                                            LEVEL_ID : result.payload.USER_LEVEL_ID
		                                        }
		                                        var date = new Date();
		                                        date.setTime(date.getTime() + (180 * 1440 * 60 * 1000));
		                                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/api/getUserTypeByModulesByID',JSON.stringify(payload2)).done(function (result2) {
		                                        if(result2.status == 'SUCCESS'){
		                                            $.cookie("PERMISSIONS", JSON.stringify(result2.payload), {expires: date});
		                                           
		                                        }             

		                                            $("#divOtpEnter").addClass("hidden");
		                                            $("#divOtpSuccess").removeClass("hidden");
		                                            //alert("Login Success!")
		                                            var USER_ID = result.payload.USER_ID
		                                            var USER_NAME = result.payload.USER_NAME
		                                            var USER_STATUS = result.payload.USER_STATUS
		                                            var USER_LEVEL_ID = result.payload.USER_LEVEL_ID
		                                            var USER_FULLNAME = result.payload.USER_FULLNAME
		                                            var FIELD_OFFICE = result.payload.FIELD_OFFICE
		                                            var H = result.payload.HASH
		                                            var USER_EMAIL = result.payload.USER_EMAIL
		                                            $.cookie("USER_EMAIL", USER_EMAIL, {expires: date});
		                                            $.cookie("USER_ID", USER_ID, {expires: date});
		                                            $.cookie("USER_NAME", USER_NAME, {expires: date});
		                                            $.cookie("USER_FULLNAME", USER_FULLNAME, {expires: date});
		                                            $.cookie("FIELD_OFFICE", FIELD_OFFICE, {expires: date});
		                                            $.cookie("USER_STATUS", USER_STATUS, {expires: date});
		                                            $.cookie("USER_LEVEL_ID", USER_LEVEL_ID, {expires: date});
		                                            $.cookie("H", H, {expires: date});
		                                            setTimeout(function () {
		                                                window.location.href="dashboard"
		                                            },1000);
		                                        });
		                                }else{
		                                    alert("Invalid OTP");
		                                }
		                            });

		                        }
		                        

		                        
		                    }

		                    
		                }else{
		                    $("#divAlert").removeClass("hidden");
		                    $("#txtPassword").focus();
		                }
                    });
            }, 150);
       });
	</script>