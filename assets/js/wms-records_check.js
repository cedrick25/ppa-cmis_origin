/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.records = (typeof $.wms.records !== 'undefined') ? $.wms : {};

$.wms.records = (function() {

    var __attachRecordsEvent = function() {
        
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

	        $('#f5t1').DataTable().destroy();
	        $('#f5t1 tbody').empty();
	        $(".form_loader").removeClass("hidden")
	        var origin   = window.location.origin+"/"
	        var table = $('#f5t1').DataTable({
		        "scrollX": true,
		        'retrieve': true,
		        'serverSide': true,
		        'bFilter': false,
		        'pageLength': 20,
		        'lengthMenu': true,
		        'dom': 'Bfrtip',
		        'buttons': [
		            {
		                extend: 'csv',
		                title: "Probationers",
		                download: 'open'
		            },
		            {
		                extend: 'pdfHtml5',
		                title: "Probationers",
		                download: 'open'
		            },
		            {
		                extend: 'excelHtml5',
		                title: "Probationers",
		                download: 'open'
		            }
		        ],
		        'bStateSave': false,
		        'searchDelay': 50,
	            'ajax': {
	                'url': origin+'ppa-cmis-api_origin/wsv1/Records_check/f5t1',
	                'dataType': 'json',
	                'type': 'GET',
	                "data": function(d) {
			            d.docket_no = $("#docket_no").val();
			            d.petitioner = $("#petitioner").val();
			            d.year = $("#year").val();
			            d.month = $("#month").val();
			            d.field_office = $("#field_office").val();
			            d.quarter = $("#quarter").val();
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

    console.log('DataTable initialized with page length:', table.page.len());
        	$(".dt-buttons").addClass("hidden")
            $(".btnCSV").unbind('click').on("click",function(){ $(".buttons-csv").click(); })
            $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
            $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })

    	});
        

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
        attachRecordsEvent: __attachRecordsEvent,
    };
}());
