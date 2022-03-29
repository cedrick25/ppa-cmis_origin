/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.probationer = (typeof $.wms.probationer !== 'undefined') ? $.wms : {};

$.wms.probationer = (function() {

    var __attachProbationerRequestEvent = function() {
    	console.log('testttt');
    	var payload = {
    		'method' : 'fetchAll'
    	};
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist_request',JSON.stringify(payload)).done(function (result) {
        	console.log(result)
	        var p = result.payload;
			var arr = [];
			for(x=0; x<p.length; x++){
				var obj = {};
				obj['id'] = p[x].id;
				obj['FORM_TABLE'] = p[x].FORM_TABLE;
				obj['LASTNAME'] = p[x].LASTNAME;
				obj['FIRSTNAME'] = p[x].FIRSTNAME;
				obj['MIDDLENAME'] = p[x].MIDDLENAME;
				obj['ALIAS'] = p[x].ALIAS;
				obj['SUPVOFFICE'] = p[x].SUPVOFFICE;
				obj['REMARKS'] = p[x].REMARKS;
				obj['SDOCKETNO'] = p[x].SDOCKETNO;
				obj['REGION'] = p[x].REGION;
				obj['YEAR'] = p[x].YEAR;
				var start_date
				if (p[x].STARTYY == null) {
					start_date = ""
				} else {
					start_date = p[x].STARTYY +'-'+p[x].STARTMM +'-'+p[x].STARTDD;
				}
				var end_date
				if (p[x].ENDYY == null) {
					end_date = ""
				} else {
					end_date = p[x].ENDYY +'-'+p[x].ENDMM +'-'+p[x].ENDDD;
				}
				obj['START_DATE'] = start_date;
				obj['END_DATE'] = end_date;
				obj['FIELD_OFFICE'] = p[x].FIELD_OFFICE;
				obj['ACTION'] = ``
				if (p[x].REQUEST_STATUS == 1) {
					obj['ACTION'] = `<button class="access_ml_write btn btn-xs btn-success btn-migrateRequest" 
						data-id="${p[x].id}"
						data-lastname="${p[x].LASTNAME}" 
						data-fistname="${p[x].FIRSTNAME}"
						data-middlename="${p[x].MIDDLENAME}"
						data-alias="${p[x].ALIAS}"
						data-super="${p[x].SUPVOFFICE}"
						data-docket="${p[x].SDOCKETNO}"
						data-region="${p[x].REGION}"
						data-year="${p[x].YEAR}"
						data-startyy="${p[x].STARTYY}"
						data-startmm="${p[x].STARTMM}"
						data-startdd="${p[x].STARTDD}"
						data-endyy="${p[x].ENDYY}"
						data-endmm="${p[x].ENDMM}"
						data-enddd="${p[x].ENDDD}"
					>Approve</button>
					`;
				} else if(p[x].REQUEST_STATUS == 2) {
					obj['ACTION'] = `<span>Approved</span>`
				}else{
					obj['ACTION'] = `<span>Rejected</span>`
				}
				arr.push(obj);
			}
			$(document).ready(function(){
				if ( $.fn.DataTable.isDataTable('#probationerRequest_table') ) {
	            $('#probationerRequest_table').DataTable().destroy();
	            $('#probationerRequest_table tbody').empty();
	        }
				$("#probationerRequest_table").DataTable({
					"lengthChange": false,
				"data": arr,
				"columns": [
	                {"data": "id"},
	                {"data": "FORM_TABLE"},
	                {"data": "LASTNAME"},
	                {"data": "FIRSTNAME"},
	                {"data": "MIDDLENAME"},
	                {"data": "ALIAS"},
	                {"data": "SUPVOFFICE"},
	                {"data": "REMARKS"},
	                {"data": "SDOCKETNO"},
	                {"data": "REGION"},
	                {"data": "YEAR"},
	                {"data": "START_DATE"},
	                {"data": "END_DATE"},
	                {"data": "FIELD_OFFICE"},
	                {"data": "ACTION"}
	            ],
	            "fnDrawCallback": function(){
	        //     	$(".btn-rejectRequest").unbind('click').on('click', function(){
	    				// var id 		= $(this).data("id");
	        //     		console.log(id);
	    				// $("#modalReject").modal('toggle')
	        //     		$(".saveReject").unbind('click').on('click', function(){
	        //             	var payloadReject = {
							  //   "method" : "update",
							  //   "id" : id,
							  //   "REQUEST_STATUS" : "0"
	        //             	}
	        //             	$.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist_request',JSON.stringify(payloadReject)).done(function (result) {
		       //                  if(result.status == "SUCCESS"){
		       //                      $(".saveRequest").attr('disabled',false)
		       //                      $("#modalReject").modal('toggle')
		       //                      location.reload();
		       //                  }else{
		       //                      alert("Failed")
		       //                  }
		       //              }); 
	        //             }); 
		                    
	        //     	})
	            	$(".btn-migrateRequest").unbind('click').on('click', function(){
	    				console.log($(this).data("lastname"))
	    				var id 		= $(this).data("id");
	    				var lname 	= $(this).data("lastname");
	    				var fname 	= $(this).data("fistname");
	    				var mname 	= $(this).data("middlename");
	    				var alias 	= $(this).data("alias");
	    				var superv 	= $(this).data("super");
	    				var docket 	= $(this).data("docket");
	    				var region 	= $(this).data("region");
	    				var year 	= $(this).data("year");
	    				var startyy = $(this).data("startyy");
	    				var startmm = $(this).data("startmm");
	    				var startdd = $(this).data("startdd");
	    				var endyy 	= $(this).data("endyy");
	    				var endmm 	= $(this).data("endmm");
	    				var enddd 	= $(this).data("enddd");
	    				$("#modalRequest").modal('toggle')

		            	$(".saveRequest").unbind('click').on('click', function(){
                            $(".saveRequest").attr('disabled',true)
	    					console.log(lname)

		                    var payload_request = {
		                        "method"        :"insert",
		                        "REGION"        :region,
		                        "YEAR"          :startyy+"-"+endyy,
		                        "SDOCKETNO"     :docket,
		                        "FIRSTNAME"     :fname,
		                        "MIDDLENAME"    :mname,
		                        "LASTNAME"      :lname,
		                        "ALIAS"         :alias,
		                        "SUPVOFFICE"    :superv,
		                        "REMARKS"       :"",
		                        "STARTMM"       :startmm,
		                        "STARTDD"       :startdd,
		                        "STARTYY"       :startyy,
		                        "ENDMM"         :endmm,
		                        "ENDDD"         :enddd,
		                        "ENDYY"         :endyy,
		                    }
		                    console.log(payload_request)
		                    $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist',JSON.stringify(payload_request)).done(function (result) {
		                        if(result.status == "SUCCESS"){
		                        	var payloadStatus = {
									    "method" : "update",
									    "id" : id,
									    "REQUEST_STATUS" : "2"
		                        	}
		                        	$.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist_request',JSON.stringify(payloadStatus)).done(function (result) {
				                        if(result.status == "SUCCESS"){
				                            $(".saveRequest").attr('disabled',false)
				                            $("#modalRequest").modal('toggle')
				                            location.reload();
				                        }else{
				                            alert("Failed")
				                        }
				                    }); 
		                        }else{
		                            alert("Failed")
		                        }
		                    }); 
		            	})
	            	})
	            }
				});
			});
		})
    }
    var __attachProbationerEvent = function() {
        
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
        
        $(".btn-search").unbind("click").on("click",function(){

	        $('#probationer_table').DataTable().destroy();
	        $('#probationer_table tbody').empty();
	        $(".form_loader").removeClass("hidden")
	        var origin   = window.location.origin+"/"
	        $('#probationer_table').DataTable({

	        	"scrollX": true,
	            'retrieve': true,
	            'serverSide': true,
	            'bFilter': true,
	            //'dom': '<"toolbar">frtip',
	            'dom': 'Bfrtip',
	            'buttons': [
                    {   extend: 'csv',
                        exportOptions: {
                           
                        }, title: "Probationers", download: 'open'
                    },
                    {   extend: 'pdfHtml5',
                        exportOptions: {
                         
                        }, title: "Probationers", download: 'open'
                    },
                    {   extend: 'excelHtml5',
                        exportOptions: {
                        
                        }, title: "Probationers", download: 'open'
                    },
                ],
	            'bStateSave': true,
	            'searchDelay': 50,
	            'ajax': {
	                // 'url': 'http://localhost/cmt-api/index.php/Search/sspSearch',
	                'url': origin+'ppa-api/wsv1/Cmis/masterlistSSP',
	                
	                // 'url': 'http://192.168.200.149/cmt-api/index.php/Search/sspSearch',
	                // 'url': 'http://192.168.200.168/cmt-api/index.php/Search/sspSearch',
	                'dataType': 'json',
	                'type': 'GET',
	                "data": {
	                    "REGION" : $("#search_region").val(),
						"FIRSTNAME" : $("#search_fname").val(),
						"MIDDLENAME": $("#search_mname").val(),
						"LASTNAME": $("#search_lname").val(),
						"ALIAS": $("#search_alias").val(),
						"YEAR": $("#search_year").val(),
						"SDOCKETNO": $("#search_docket").val(),
						"SUPERVOFFICE": $("#search_supervoffice").val(),
						"REMARKS": $("#search_remarks").val(),
						"START_DD": $("#search_start_dd").val(),
						"START_YY": $("#search_start_yy").val(),
						"START_MM": $("#search_start_mm").val(),
						"END_DD": $("#search_end_dd").val(),
						"END_YY" : $("#search_end_yy").val(),
						"END_MM": $("#search_end_mm").val()
	                }

	            },
	            rowCallback: function (row, data) {
	            },
	            'aaSorting': [
	                    [0, 'ASC']
	                ] // start to sort data in second column
	                ,
	            "initComplete": function(settings, json) {
	            	console.log(json);
	            	$(".pp1").focus();
	            	if(json.recordsTotal == 0){
	            		$("#modal-search").modal();
	            		
	            		//$(".btnSearchYes").focus();
	            		shortcuts.add('y',function() {
	            			$(".btnSearchYes").trigger("click")
							
	            		});

	            		shortcuts.add('n',function() {
	            			$(".btnSearchNo").trigger("click")
	            		});
	            	}
	            	

	            	$(".dataTables_filter").addClass("hidden")
	            	$(".form_loader").addClass("hidden")
	                },
        	})

        	$(".dt-buttons").addClass("hidden")
            $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
            $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
            $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })




    	});
        $("#probationer_table").unbind("click").on("click",".btn-edit",function(){
        	$(".form_loader").removeClass("hidden")
    		var data_id = $(this).data("id");
    		var payload = {
                "id" : data_id,
                "method" : "fetchByID"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist',JSON.stringify(payload)).done(function (result) {
                    $(".form_loader").addClass("hidden")
                    console.log(result);
                    $("#edit_region").val(result.payload.REGION)
					$("#edit_id").val(result.payload.id)
					$("#edit_year").val(result.payload.YEAR)
					$("#edit_docket").val(result.payload.SDOCKETNO)
					$("#edit_fname").val(result.payload.FIRSTNAME)
					$("#edit_mname").val(result.payload.MIDDLENAME)
					$("#edit_lname").val(result.payload.LASTNAME)
					$("#edit_alias").val(result.payload.ALIAS)
					$("#edit_superv").val(result.payload.SUPVOFFICE)
					$("#edit_remarks").val(result.payload.REMARKS)
					$("#edit_start_mm").val(result.payload.STARTMM)
					$("#edit_start_dd").val(result.payload.STARTDD)
					$("#edit_start_yy").val(result.payload.STARTYY)
					$("#edit_end_mm").val(result.payload.ENDMM)
					$("#edit_end_dd").val(result.payload.ENDDD)
					$("#edit_end_yy").val(result.payload.ENDYY)
            });
    		$("#modalEdit").modal('toggle')

    		$(".saveBtn").unbind("click").on("click",function(){
    			$(".saveBtn").addClass("hidden")
    			$(".confirm").removeClass("hidden")
				$(".proceedBtn").removeClass("hidden")
				$("#modalAdd input").attr("disabled",true)
    		})

    		$(".proceedBtn").unbind("click").on("click",function(){
    			$(".saveBtn").removeClass("hidden")
    			$(".confirm").addClass("hidden")
				$(".proceedBtn").addClass("hidden")
				var payload = {
                	"method" : "update",
                	"REGION" : $("#edit_region").val(),
					"id" : $("#edit_id").val(),
					"YEAR" : $("#edit_year").val(),
					"SDOCKETNO" :  $("#edit_docket").val(),
					"FIRSTNAME" : $("#edit_fname").val(),
					"MIDDLENAME" : $("#edit_mname").val(),
					"LASTNAME" : $("#edit_lname").val(),
					"ALIAS" : $("#edit_alias").val(),
					"SUPVOFFICE" : $("#edit_superv").val(),
					"REMARKS" : $("#edit_remarks").val(),
					"STARTMM" : $("#edit_start_mm").val(),
					"STARTDD" : $("#edit_start_dd").val(),
					"STARTYY" : $("#edit_start_yy").val(),
					"ENDMM" : $("#edit_end_mm").val(),
					"ENDDD" : $("#edit_end_dd").val(),
					"ENDYY": $("#edit_end_yy").val()
            	}
            	$.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist',JSON.stringify(payload)).done(function (result) {
            		$("#modalEdit").modal('toggle')
            		$("#modalEdit input").attr("disabled",false)
            		__attachProbationerEvent();
        		});

    		})
    	})
        

    	$(".btn-reset").unbind("click").on("click",function(){
    		$("input").val('');
    		$(".btn-search").trigger("click")
    	})
    	$(".btn-search").trigger("click")

    	$("input").keyup(function(e){
    		if(e.keyCode == 13)
		    {
		    	$(".btn-search").focus();

		        $(".btn-search").trigger("click");

		    }
    	})

    	$(".btnSearchYes").unbind("click").on("click",function(){
    		$("#modal-search").modal("toggle");
    		 setTimeout(function () {
    		$("#search_lname").focus();
    		})

    		shortcuts.remove('y',function() {
    		});

    		shortcuts.remove('n',function() {
    		});
    	});

    	$(".btnSearchNo").unbind("click").on("click",function(){
    		$("#modal-search").modal("toggle");
    		//$("#search_lname").focus();
    		shortcuts.remove('y',function() {
    		});

    		shortcuts.remove('n',function() {
    		});
    	});



    	$(".saveAddBtn").unbind("click").on("click",function(){
			$(".saveAddBtn").addClass("hidden")
			$(".confirm").removeClass("hidden")
			$(".proceedAddBtn").removeClass("hidden")
			$("#modalAdd input").attr("disabled",true)
		})

		$(".btn-add-cancel").unbind("click").on("click",function(){
			$("#modalAdd input").val('')
    		$("#modalAdd input").attr("disabled",false)
		})

		$(".proceedAddBtn").unbind("click").on("click",function(){
			$(".saveAddBtn").removeClass("hidden")
			$(".confirm").addClass("hidden")
			$(".proceedAddBtn").addClass("hidden")
			var payload = {
            	"method" : "insert",
            	"REGION" : $("#add_region").val(),
				"id" : $("#add_id").val(),
				"YEAR" : $("#add_year").val(),
				"SDOCKETNO" :  $("#add_docket").val(),
				"FIRSTNAME" : $("#add_fname").val(),
				"MIDDLENAME" : $("#add_mname").val(),
				"LASTNAME" : $("#add_lname").val(),
				"ALIAS" : $("#add_alias").val(),
				"SUPVOFFICE" : $("#add_superv").val(),
				"REMARKS" : $("#add_remarks").val(),
				"STARTMM" : $("#add_start_mm").val(),
				"STARTDD" : $("#add_start_dd").val(),
				"STARTYY" : $("#add_start_yy").val(),
				"ENDMM" : $("#add_end_mm").val(),
				"ENDDD" : $("#add_end_dd").val(),
				"ENDYY": $("#add_end_yy").val()
        	}
        	$.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertMasterlist',JSON.stringify(payload)).done(function (result) {
        		$("#modalAdd").modal('toggle')
        		$("#modalAdd input").val('')
        		$("#modalAdd input").attr("disabled",false)
        		//__attachProbationerEvent();
        		$(".btn-search").trigger("click");

    		});

		})
    	
	}

    



    
    return {
        attachProbationerEvent : __attachProbationerEvent,
        attachProbationerRequestEvent: __attachProbationerRequestEvent
    };
}());
