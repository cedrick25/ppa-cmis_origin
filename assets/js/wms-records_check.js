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
        $(".btn-search").click(function() {

		    var origin = window.location.origin + "/";
		    var docket_no = $("#docket_no").val();
		    var name = $("#name").val();

		    if (docket_no === '' && name === "") {
		        // Apply error styles for both fields if they are empty
		        $("#docket_no").addClass("error_field");
		        $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>')
		            .insertAfter($("#docket_no"));  // Add error message after the input field

		        $("#name").addClass("error_field");
		        $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>')
		            .insertAfter($("#name"));  // Add error message after the input field

		        var tables = [
		            // f5 tables
		            'f5t1', 'f5t2_rcv', 'f5t2_acted', 'f5t2_notacted', 'f5t3', 'f5t4', 'f5t5', 'f5t6_rcv', 'f5t6_cmpltd', 
		            'f5t7', 'f5t8', 'f5t9', 'f5t10', 'f5t11', 'f5t12', 'f5t13_rcv', 'f5t13_term',
		            // f21 tables
		            'f21t1', 'f21t2_rcv', 'f21t2_acted', 'f21t4', 'f21t5', 'f21t6_rcv', 'f21t6_cmpltd', 
		            'f21t7_pardon', 'f21t7_parol', 'f21t8_pardon', 'f21t8_parol', 'f21t9_pardon', 'f21t9_parol',
		            'f21t10_pardon', 'f21t10_parol', 'f21t11_pardon', 'f21t11_parol', 'f21t12_pardon', 'f21t12_parol', 
		            'f21t13_pardon', 'f21t13_parol', 'f21t14_pardon', 'f21t14_parol', 
		            'f21t15_rcv_pardon', 'f21t15_rcv_parol', 'f21t15_term_pardon', 'f21t15_term_parol',
		            // f44 tables
	               	'f44t1', 'f44t2', 'f44t2_acted', 'f44t3', 'f44t4', 'f44t5', 'f44t6', 'f44t6_car', 'f44t7', 'f44t8', 'f44t9', 'f44t10', 'f44t11', 'f44t12', 'f44t13', 'f44t13_crt',
				    'f45t1', 'f45t2', 'f45t2_acted', 'f45t3', 'f45t4', 'f45t5', 'f45t6', 'f45t6_car', 'f45t7', 'f45t8', 'f45t9', 'f45t10', 'f45t11', 'f45t12', 'f45t13', 'f44t13_crt',
				    'f50t1', 'f50t2',
				    'f51t1', 'f51t2','f51t3', 'f51t4',
				    'f53t1', 'f53t2','f53t3', 'f53t4','f53t5','f53t6', 'f53t7','f53t8', 'f53t9','f53t10','f53t11', 
				];
		        $.each(tables, function(index, table) {
		            $('#result_body_' + table).empty(); // Clear the body of each table
		            $('.result_table_' + table).addClass("hidden");
		        });
		    } else {
		        // Remove error styles if fields are filled
		        $("#docket_no").removeClass("error_field");
		        $("#docket_no").next(".errorRequired").remove();  // Remove error message next to docket_no

		        $("#name").removeClass("error_field");
		        $("#name").next(".errorRequired").remove();  // Remove error message next to name

		        var tables = [
		            // f5 tables
		            'f5t1', 'f5t2_rcv', 'f5t2_acted', 'f5t2_notacted', 'f5t3', 'f5t4', 'f5t5', 'f5t6_rcv', 'f5t6_cmpltd', 
		            'f5t7', 'f5t8', 'f5t9', 'f5t10', 'f5t11', 'f5t12', 'f5t13_rcv', 'f5t13_term',

		            // f21 tables
		            'f21t1', 'f21t2_rcv', 'f21t2_acted', 'f21t4', 'f21t5', 'f21t6_rcv', 'f21t6_cmpltd', 
		            'f21t7_pardon', 'f21t7_parol', 'f21t8_pardon', 'f21t8_parol', 'f21t9_pardon', 'f21t9_parol',
		            'f21t10_pardon', 'f21t10_parol', 'f21t11_pardon', 'f21t11_parol', 'f21t12_pardon', 'f21t12_parol', 
		            'f21t13_pardon', 'f21t13_parol', 'f21t14_pardon', 'f21t14_parol', 
		            'f21t15_rcv_pardon', 'f21t15_rcv_parol', 'f21t15_term_pardon', 'f21t15_term_parol',
		            // f44 tables
	               	'f44t1', 'f44t2', 'f44t2_acted', 'f44t3', 'f44t4', 'f44t5', 'f44t6', 'f44t6_car', 'f44t7', 'f44t8', 'f44t9', 'f44t10', 'f44t11', 'f44t12', 'f44t13', 'f44t13_crt',
				    'f45t1', 'f45t2', 'f45t2_acted', 'f45t3', 'f45t4', 'f45t5', 'f45t6', 'f45t6_car', 'f45t7', 'f45t8', 'f45t9', 'f45t10', 'f45t11', 'f45t12', 'f45t13', 'f44t13_crt',
				    'f50t1', 'f50t2',
				    'f51t1', 'f51t2','f51t3', 'f51t4',
				    'f53t1', 'f53t2','f53t3', 'f53t4','f53t5','f53t6', 'f53t7','f53t8', 'f53t9','f53t10','f53t11', 
				];

		        // Loop through each table
		        $.each(tables, function(index, table_name) {

		            // Show the loader for the specific table
		            $('.result_table_' + table_name).addClass("hidden");

		            
		            // Hide the result table initially
		            
		            // Clear previous results
		            $('#result_body_' + table_name).empty();

		            var db_name = '';
					if (table_name.startsWith('f44') || table_name.startsWith('f45') || table_name.startsWith('f50') || table_name.startsWith('f51') || table_name.startsWith('f53')) {
					    db_name = 'expansion';  // For f44, f45, f50, f51, f53 tables
					}  else {
					    db_name = 'default';  // For f5 and f21 tables
					}

					// Construct the correct API URL based on table type
					var apiUrl = '';
					if (table_name.startsWith('f44') || table_name.startsWith('f45') || table_name.startsWith('f50') || table_name.startsWith('f51') || table_name.startsWith('f53')) {
					    apiUrl = origin + "ppa-cmis-api_origin/wsv1/Records_check/search_expansion_data?docket_no=" + docket_no + "&name=" + name + "&table_name=" + table_name + "&db_name=" + db_name;
					} else {
					    apiUrl = origin + "ppa-cmis-api_origin/wsv1/Records_check/search_data?docket_no=" + docket_no + "&name=" + name + "&table_name=" + table_name + "&db_name=" + db_name;
					}

		            $(".form_loader_f53t11").removeClass('hidden');
		            $.ajax({
		                url: apiUrl,
		                type: 'GET',
		                dataType: 'json',
		                success: function(response) {
		                    // Hide the loader after data is received
		                    $(".form_loader_" + table_name).addClass('hidden');

		                    // Check if the response contains data
		                    if (response && Array.isArray(response) && response.length > 0) {
		                        // Loop through the response data and populate the table
		                        $.each(response, function(index, item) {
		                            var createdDate = item.created_date ? item.created_date : "";
		                            var row = "<tr>" +
		                                "<td>" + table_name + "</td>" +
		                                "<td>" + item.docket_no + "</td>" +
		                                "<td>" + item.name + "</td>" +
		                                "<td>" + item.field_office + "</td>" +
		                                "<td>" + item.Y_M + "</td>" +
		                                "<td>" + createdDate + "</td>" +
		                                "</tr>";
		                            $('#result_body_' + table_name).append(row);
		                        });

		                        // Show the result table if there is data
		                        $('.result_table_' + table_name).removeClass("hidden");
		                    } else {
		                        // If no results found, show a message
		                        $('#result_body_' + table_name).append("<tr><td colspan='6' style='text-align:center;'>No results found</td></tr>");
		                        $('.result_table_' + table_name).addClass("hidden");
		                    }
		                },
		                error: function() {
		                    // Hide loader in case of error
		                    $(".form_loader_" + table_name).addClass('hidden');
		                    // Show error message
		                    alert('Error fetching data for table: ' + table_name);
		                }
		            });
		        });
		    }

		});


	    $(".btn-reset").click(function() {
		    // Clear the input fields
		    $("#docket_no").val('');
		    $("#name").val('');

		    var tables = [
			    // f5 tables
			    'f5t1', 'f5t2_rcv', 'f5t2_acted', 'f5t2_notacted', 'f5t3', 'f5t4', 'f5t5', 'f5t6_rcv', 'f5t6_cmpltd', 
			    'f5t7', 'f5t8', 'f5t9', 'f5t10', 'f5t11', 'f5t12', 'f5t13_rcv', 'f5t13_term',
			    'f21t1', 'f21t2_rcv', 'f21t2_acted', 'f21t4', 'f21t5', 'f21t6_rcv', 'f21t6_cmpltd', 
			    'f21t7_pardon', 'f21t7_parol', 'f21t8_pardon', 'f21t8_parol', 'f21t9_pardon', 'f21t9_parol',
			    'f21t10_pardon', 'f21t10_parol', 'f21t11_pardon', 'f21t11_parol', 'f21t12_pardon', 'f21t12_parol', 
			    'f21t13_pardon', 'f21t13_parol', 'f21t14_pardon', 'f21t14_parol', 
			    'f21t15_rcv_pardon', 'f21t15_rcv_parol', 'f21t15_term_pardon', 'f21t15_term_parol',
               	'f44t1', 'f44t2', 'f44t2_acted', 'f44t3', 'f44t4', 'f44t5', 'f44t6', 'f44t6_car', 'f44t7', 'f44t8', 'f44t9', 'f44t10', 'f44t11', 'f44t12', 'f44t13', 'f44t13_crt',
			    'f45t1', 'f45t2', 'f45t2_acted', 'f45t3', 'f45t4', 'f45t5', 'f45t6', 'f45t6_car', 'f45t7', 'f45t8', 'f45t9', 'f45t10', 'f45t11', 'f45t12', 'f45t13', 'f44t13_crt',
			    'f50t1', 'f50t2',
			    'f51t1', 'f51t2','f51t3', 'f51t4',
			    'f53t1', 'f53t2','f53t3', 'f53t4','f53t5','f53t6', 'f53t7','f53t8', 'f53t9','f53t10','f53t11', 
			];
		    $.each(tables, function(index, table) {
		        $('#result_body_' + table).empty(); // Clear the body of each table
                $('.result_table_' + table).addClass("hidden");
		    });
		});
    	// $(".btn-search").trigger("click")

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
    		$("#docket_no").focus();
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
	}
    
    return {
        attachRecordsEvent: __attachRecordsEvent,
    };
}());
