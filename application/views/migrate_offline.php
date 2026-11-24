
<?php $this->load->view('templates/header.php'); ?>
<style>
  #manual-status { margin: 12px 0 8px; }
  #manual-track { height: 24px; border-radius: 4px; background: #e9ecef; overflow: hidden; }
  #manual-bar { height: 24px; width: 0%; background: #337ab7; color: #fff; text-align: center; line-height: 24px; font-size: 12px; font-variant-numeric: tabular-nums; }
</style> 

<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 

<div class="container loggedBody" hidden>
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
				 <div class="panel-body">
				 	
				 	<div class="row hidden">
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






	<div class="row">
		<div class="col-md-12">
	        <div class="panel panel-primary">
	        	<div class="panel-heading">
	        		<?php 
	        		$current_form = "Form 21 - ";
	        		$current_table = "Caseload Summary";
	        		$current_type = "Parole/Executive Clemency ";
	        		$current_link = "#form21modal";
	        		$widget = "";
	        		$widget = "widget_filter_migration.php";

	        		
	        		?>
	            	<span class="font_20"><u><a href="#" class="text-white"  data-toggle="modal" data-target="<?= $current_link; ?>"><?= $current_type; ?>Caseload</a></u> > Migration</span>
	          	</div>
	          	<div class="panel-body">


	          			<?php $this->load->view('widgets/'.$widget); ?>
	          			<div id="manual-carry" style="display:none;">
	          				<p id="manual-status">Starting carry over...</p>
	          				<div id="manual-track">
	          					<div id="manual-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">0%</div>
	          				</div>
	          			</div> 
	          		 
	          			<div class="form_loader hidden"><h2><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Processing.... </h2></div>
	          			<div class="result_form">

						<?php 
						if(isset($_GET['form'])){
							$form = $_GET['form'];

							#$this->load->view('forms-control/'.$form.'.php');

							?>

							<?php
							
							

							
						}
						?>
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
    		$.wms.dashboard.attachPageEvent();
    		$.wms.modal.attachModalEvent();

    		$(".loading-data").fadeOut();

    		$('.filter-modal select').css('width', '100%')
    		$(".select2").select2()
    		
    		$.wms.widget.attachWidgetEvent();
    		
    		var manualRoutes = {
    			"btn-migrate": "migrate_offline",
    			"btn-F5T1": "migrate_f5t1",
    			"btn-F5T3": "migrate_f5t3",
    			"btn-F5T5": "migrate_f5t5",
    			"btn-F5T7": "migrate_f5t7",
    			"btn-F5T10": "migrate_f5t10",
    			"btn-F5T12": "migrate_f5t12",
    			"btn-F21T1": "migrate_f21t1",
    			"btn-F21T3": "migrate_f21t3",
    			"btn-F21T5": "migrate_f21t5",
    			"btn-F21T7_PAROL": "migrate_f21t7_parol",
    			"btn-F21T7_PARDON": "migrate_f21t7_pardon",
    			"btn-F21T10_PAROL": "migrate_f21t10_parol",
    			"btn-F21T10_PARDON": "migrate_f21t10_pardon",
    			"btn-F21T12_PAROL": "migrate_f21t12_parol",
    			"btn-F21T12_PARDON": "migrate_f21t12_pardon",
    			"btn-F21T14_PAROL": "migrate_f21t14_parol",
    			"btn-F21T14_PARDON": "migrate_f21t14_pardon"
    		};
    		var manualButtonSelector = "." + Object.keys(manualRoutes).join(", .");
    		var manualRunning = false;
    		var manualPct = 0;
    		var manualStatus = "Starting carry over...";
    		var manualSettled = false;

    		function manualPercent(progress) {
    			var tables = progress.tables > 0 ? progress.tables : 1;
    			var table = progress.table > 0 ? progress.table : 1;
    			var fraction = progress.total > 0 ? (progress.done / progress.total) : 1;
    			var pct = Math.round((((table - 1) + fraction) / tables) * 100);
    			if (pct < 0) {
    				return 0;
    			}
    			if (pct > 100) {
    				return 100;
    			}
    			return pct;
    		}

    		function manualSetBar(pct, label, color) {
    			manualPct = pct;
    			manualStatus = label;
    			$("#manual-carry").show();
    			$("#manual-bar").css({width: pct + "%", background: color || "#337ab7"}).text(pct + "%").attr("aria-valuenow", pct);
    			$("#manual-status").text(label);
    		}

    		function manualProgressText(progress) {
    			var text = progress.label || "Carry over";
    			if (progress.total > 0) {
    				text += ", docket " + progress.done + " of " + progress.total;
    			} else {
    				text += ", no dockets to carry over";
    			}
    			if (progress.tables > 1) {
    				text += " (table " + progress.table + " of " + progress.tables + ")";
    			}
    			return text;
    		}

    		function manualHandleLine(line) {
    			try {
    				var progress = line.match(/@@PROGRESS@@\s*(\{.*\})/);
    				if (progress) {
    					var data = JSON.parse(progress[1]);
    					manualSetBar(manualPercent(data), manualProgressText(data), "#337ab7");
    					return;
    				}
    				var done = line.match(/@@DONE@@\s*(\{.*\})/);
    				if (done) {
    					manualSettled = true;
    					var doneData = JSON.parse(done[1]);
    					manualSetBar(100, doneData.message || "Carry over finished.", "#5cb85c");
    					return;
    				}
    				var failed = line.match(/@@FAILED@@\s*(\{.*\})/);
    				if (failed) {
    					manualSettled = true;
    					var failedData = JSON.parse(failed[1]);
    					manualSetBar(manualPct, failedData.message || "Carry over failed.", "#d9534f");
    				}
    			} catch (e) {}
    		}

    		function manualConsume(text) {
    			text.split("\n").forEach(function(line) {
    				if (line.indexOf("@@") !== -1) {
    					manualHandleLine(line);
    				}
    			});
    		}

    		function manualRun(endpoint) {
    			if (manualRunning) {
    				return;
    			}
    			var field = $.trim($("#filter_office").val() || "");
    			var date = $.trim($("#filter_date").val() || "");
    			if (!field || !/^(19|20)\d{2}-(0[1-9]|1[0-2])$/.test(date)) {
    				manualSettled = true;
    				manualSetBar(0, "Choose a field office and year-month before carry over.", "#d9534f");
    				return;
    			}
    			manualRunning = true;
    			manualSettled = false;
    			manualPct = 0;
    			$(manualButtonSelector).prop("disabled", true);
    			manualSetBar(0, "Starting carry over...", "#337ab7");
    			var officeId = $("#filter_office").find(":selected").data("id") || "";
    			officeId = $.trim(String(officeId));
    			if (officeId === "ALL") {
    				officeId = "";
    			}
    			var url = "/ppa-cmis-api_origin/wsv1/api/" + endpoint + "?submit=yes&field=" + encodeURIComponent(field) + "&date=" + encodeURIComponent(date);
    			if (officeId) {
    				url += "&officeId=" + encodeURIComponent(officeId);
    			}
    			fetch(url).then(function(response) {
    				if (!response.ok || !response.body || !response.body.getReader) {
    					return response.text().then(function(text) {
    						manualConsume(text);
    						if (!manualSettled) {
    							manualSetBar(manualPct, "Carry over stopped at " + manualStatus + ". Dockets already copied were saved.", "#d9534f");
    						}
    					});
    				}
    				var reader = response.body.getReader();
    				var decoder = new TextDecoder();
    				var buffer = "";
    				function pump() {
    					return reader.read().then(function(result) {
    						if (result.value) {
    							buffer += decoder.decode(result.value, {stream: !result.done});
    							var lines = buffer.split("\n");
    							buffer = lines.pop();
    							lines.forEach(manualHandleLine);
    						}
    						if (result.done) {
    							if (buffer) {
    								manualHandleLine(buffer);
    							}
    							if (!manualSettled) {
    								manualSetBar(manualPct, "Carry over stopped at " + manualStatus + ". Dockets already copied were saved.", "#d9534f");
    							}
    							return;
    						}
    						return pump();
    					});
    				}
    				return pump();
    			}).catch(function() {
    				if (!manualSettled) {
    					manualSetBar(manualPct, "Carry over stopped at " + manualStatus + ". Dockets already copied were saved.", "#d9534f");
    				}
    			}).then(function() {
    				manualRunning = false;
    				$(manualButtonSelector).prop("disabled", false);
    			});
    		}

    		$(manualButtonSelector).unbind("click").on("click", function() {
    			var route = "";
    			var className = this.className.split(/\s+/);
    			for (var i = 0; i < className.length; i++) {
    				if (manualRoutes[className[i]]) {
    					route = manualRoutes[className[i]];
    				}
    			}
    			if (route) {
    				manualRun(route);
    			}
    		});
        }, 200);
   });
</script>