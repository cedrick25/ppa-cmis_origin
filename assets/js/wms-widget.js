/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.widget = (typeof $.wms.widget !== 'undefined') ? $.wms : {};

$.wms.widget = (function() {

    var __attachWidgetEvent = function() {

        $(".panel-widget").lobiPanel({
           reload: false,
            close: false,
            editTitle: false,
            sortable: true,
            stateful: 500,
            expand: false,
            unpin : false,
        })
        
        if($.cookie("USER_LEVEL_ID") == 1 || $.cookie("USER_LEVEL_ID") == 2 || $.cookie("USER_LEVEL_ID") == 8 || $.cookie("USER_LEVEL_ID") == 9){
            $(".sel_field_office").append($('<option>', {
                value: "ALL",
                text: 'All',
                "data-id" : "ALL"
            }));    
        }
        

        $(".sel_field_office2").append($('<option>', {
            value: "",
            text: ''
        }));

        //Set Field Offices to all dropdown
        var fieldOffices = "<optgroup label='Field Offices'>";
        var payload = { 
            "FIELD_OFFICE" : $.cookie("FIELD_OFFICE"),
            "USER_LEVEL_ID" : $.cookie("USER_LEVEL_ID")
         };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/getAllFieldOffices',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(field){
                    
                    $(".sel_field_office").append($('<option>', {
                        value: field.NAME,
                        text: field.NAME,
                        "data-region" : field.REGION,
                        "data-id" : field.ID
                    }));

                    $(".sel_field_office2").append($('<option>', {
                        value: field.NAME,
                        text: field.NAME,
                        "data-region" : field.REGION,
                        "data-id" : field.ID
                    }));
                })
            }
        });
        fieldOffices += "</optgroup>"


        var fieldOffices3 = "<optgroup label='Field Offices'>";
        $(".sel_field_office3").append($('<option>', {
                        value: "",
                        text: "Please Select"
                    }));
        var payload = { 
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/getAllFieldOffices2',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(field){
                    
                    $(".sel_field_office3").append($('<option>', {
                        value: field.NAME,
                        text: field.NAME
                    }));
                })
            }
        });
        fieldOffices3 += "</optgroup>"



        $(".sel_field_office").append(fieldOffices)
        $(".sel_field_office2").append(fieldOffices)
        $(".sel_field_office3").append(fieldOffices3)


        var regionalOffices = "<optgroup label='Regional Offices'>";
        $(".sel_regional_office").append($('<option>', {
                        value: "",
                        text: "Please Select"
                    }));
        var payload = { 
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(field){
                    
                    $(".sel_regional_office").append($('<option>', {
                        value: field.VALUE_,
                        text: field.VALUE_,
                        id: field.ID
                    }));
                })
            }
        });
        regionalOffices += "</optgroup>"
        $(".sel_regional_office").append(regionalOffices)

        var quarterlyOffices = "<optgroup label='Quarterly Offices'>";
        $(".sel_quarterly_office").append($('<option>', {
                        value: "",
                        text: "Please Select"
                    }));
        var payload = { 
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                result.payload.forEach(function(field){
                    
                    $(".sel_quarterly_office").append($('<option>', {
                        value: field.VALUE_,
                        text: field.VALUE_,
                        id: field.ID
                    }));
                })
            }
        });
        quarterlyOffices += "</optgroup>"
        $(".sel_quarterly_office").append(quarterlyOffices)


        //Set Current Y-M to all date picker
        
        $(".sel_date").datepicker({
            changeMonth: true,
              changeYear: true,
              showButtonPanel: true,
              dateFormat: 'yy-mm',
              //maxDate: "0y",

              beforeShow: function(input) {
                $(input).datepicker("widget").addClass('hide-calendar');
                //ui-datepicker-month
              },
              onChangeMonthYear: function (year, month, inst) {
                $(this).val($.datepicker.formatDate('yy-mm', new Date(year, month - 1, 1)));
              },
              onClose: function(dateText, inst) {
                console.log(inst);
                $(this).datepicker('setDate', new Date( $(".ui-datepicker-year").val(), $(".ui-datepicker-month").val(), 1));
                //$(this).datepicker('widget').removeClass('hide-calendar');
              }
        });
        $(".sel_date").unbind("click").on("click",function(){
            var date = $.wms.urlParam('date')
            if(date != undefined){
                var y = date.substr(0,4)
                var m = parseInt(date.substr(5,7))
                $(".ui-datepicker-month").val(m-1)
                $(".ui-datepicker-year").val(y)
            }
        })
        $(".sel_date").attr('maxlength','7');

        $(".sel_date2").datepicker({
            changeMonth: true,
              changeYear: true,
              showButtonPanel: true,
              dateFormat: 'yy-mm-dd',
              yearRange: "-50:+10"
        });
        $(".sel_date2").attr("autocomplete","off");
        $(".sel_date").datepicker("setDate", 'today');

        
        //WorkloadHandled
        $(".btn-workload").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            start_date = $("#widget_workload_date").val().substring(0,4)+"-01"
            $(".loading-data-workload").fadeIn();
            var payload = {
                "start_date" : start_date,
                "end_date" : $("#widget_workload_date").val(),
                "field_office" : $("#widget_workload_field_office").val(),
                "region_id" : $('#widget_workload_field_office option:selected').data('region'),
                "method" : "workload"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-workload").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload
                    $(".WLtotal").html(payload.total.count)
                    $(".WLtotalSupv").html(payload.totalSupv.count)
                    $(".WLTotalInv").html(payload.TotalInv.count)

                    $(".WLProbationInv").html(payload.ProbationInv.count)
                    $(".WLProbationSupv").html(payload.ProbationSupv.count)
                    $(".WLProbationTotal").html(payload.ProbationTotal.count)

                    $(".wl_graph").unbind("click").on("click",function(){
                        var config = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [
                                        payload.ProbationInv.count,
                                        payload.ParoleInv.count,
                                        payload.PardonInv.count
                                    ],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                        window.chartColors.yellow,
                                    ],
                                    label: 'Investigation'
                                }],
                                labels: [
                                    'Probation',
                                    'Parole',
                                    'Pardon',
                                ]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: 'Investigation',
                                    fontSize: '16',
                                    fontStyle: 'bold',
                                    fontColor: '#000',

                                },
                                 plugins: {
                                      labels: [{
                                        render: 'percentage',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      },{
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      }]
                                    }
                            }
                        };
                        


                        var config2 = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [
                                        payload.ProbationSupv.count,
                                        payload.ParoleSupv.count,
                                        payload.PardonSupv.count
                                    ],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                        window.chartColors.yellow,
                                    ],
                                    label: 'Supervision'
                                }],
                                labels: [
                                    'Probation',
                                    'Parole',
                                    'Pardon',
                                ]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: 'Supervision',
                                    fontSize: '16',
                                    fontStyle: 'bold',
                                    fontColor: '#000',
                                },
                                 plugins: {
                                      labels: [{
                                        render: 'percentage',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      },{
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      }]
                                    }
                            }
                        };
                        setTimeout(function () {
                            var ctx1 = document.getElementById('wl_graph1').getContext('2d');
                            window.myPie = new Chart(ctx1, config);


                            var ctx2 = document.getElementById('wl_graph2').getContext('2d');
                            window.myPie = new Chart(ctx2, config2);
                        },250);
                    })
                    $(".WLParoleInv").html(payload.ParoleInv.count)
                    $(".WLParoleSupv").html(payload.ParoleSupv.count)
                    $(".WLParoleTotal").html(payload.ParoleTotal.count)
                    
                    $(".WLPardonInv").html(payload.PardonInv.count)
                    $(".WLPardonSupv").html(payload.PardonSupv.count)
                    $(".WLPardonTotal").html(payload.PardonTotal.count)
                    $('#t1').DataTable().destroy();
                    
                    $("#t1").dataTable({
                        dom: "Brt",
                        buttons: [

                            {   extend: 'print',
                                
                            },
                            {   extend: 'pdfHtml5',
                                exportOptions: {
                                    
                                }, title: "Workload Handled", download: 'open'
                            },
                            {   extend: 'excelHtml5',
                                exportOptions: {
                                    
                                }, title: "Workload Handled", download: 'open'
                            },
                        ],
                    })
                    $(".dt-buttons").addClass("hidden")
                    $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })
                    $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
                    $(".btnPrint").unbind('click').on("click",function(){ $(".buttons-print").click(); })
                }
            });

        })

        
        //New Referral
        $(".btn-nr").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-nr").fadeIn();
            var payload = {
                "start_date" : $("#widget_nrr_date").val(),
                "end_date" : $("#widget_nrr_date").val(),
                "field_office" : $("#widget_nrr_field_office").val(),
                "region_id" : $('#widget_nrr_field_office option:selected').data('region'),
                "method" : "new_referral"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-nr").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload

                    $(".NRTotalInv").html(payload.TotalInv.count)
                    $(".NRtotalSupv").html(payload.totalSupv.count)
                    $(".NRtotal").html(payload.total.count)
                    $(".NRProbationInv").html(payload.ProbationInv.count)
                    $(".NRProbationSupv").html(payload.ProbationSupv.count)
                    $(".NRProbationTotal").html(payload.ProbationTotal.count)
                    $(".NRParoleInv").html(payload.ParoleInv.count)
                    $(".NRParoleSupv").html(payload.ParoleSupv.count)
                    $(".NRParoleTotal").html(payload.ParoleTotal.count)
                    $(".NRPardonInv").html(payload.PardonInv.count)
                    $(".NRPardonSupv").html(payload.PardonSupv.count)
                    $(".NRPardonTotal").html(payload.PardonTotal.count)
                    $('#t2').DataTable().destroy();
                    $("#t2").dataTable({
                        dom: "Brt",
                        buttons: [

                            {   extend: 'print',
                                
                            },
                            {   extend: 'pdfHtml5',
                                exportOptions: {
                                    
                                }, title: "New Referral Received", download: 'open'
                            },
                            {   extend: 'excelHtml5',
                                exportOptions: {
                                    
                                }, title: "New Referral Received", download: 'open'
                            },
                        ],
                    })
                    $(".dt-buttons").addClass("hidden")
                    $(".btnXLS").unbind('click').on("click",function(){ $(".buttons-excel").click(); })
                    $(".btnPDF").unbind('click').on("click",function(){ $(".buttons-pdf").click(); })
                    $(".btnPrint").unbind('click').on("click",function(){ $(".buttons-print").click(); })

                    $(".nr_graph").unbind("click").on("click",function(){
                        var config = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [
                                        payload.ProbationInv.count,
                                        payload.ParoleInv.count,
                                        payload.PardonInv.count
                                    ],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                        window.chartColors.yellow,
                                    ],
                                    label: 'Investigation'
                                }],
                                labels: [
                                    'Probation',
                                    'Parole',
                                    'Pardon',
                                ]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: 'Investigation',
                                    fontSize: '16',
                                    fontStyle: 'bold',
                                    fontColor: '#000',

                                },
                                 plugins: {
                                      labels: [{
                                        render: 'percentage',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      },{
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      }]
                                    }
                            }
                        };
                        


                        var config2 = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [
                                        payload.ProbationSupv.count,
                                        payload.ParoleSupv.count,
                                        payload.PardonSupv.count
                                    ],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                        window.chartColors.yellow,
                                    ],
                                    label: 'Supervision'
                                }],
                                labels: [
                                    'Probation',
                                    'Parole',
                                    'Pardon',
                                ]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: 'Supervision',
                                    fontSize: '16',
                                    fontStyle: 'bold',
                                    fontColor: '#000',
                                },
                                 plugins: {
                                      labels: [{
                                        render: 'percentage',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      },{
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      }]
                                    }
                            }
                        };
                        setTimeout(function () {
                            var ctx1 = document.getElementById('nr_graph1').getContext('2d');
                            window.myPie = new Chart(ctx1, config);


                            var ctx2 = document.getElementById('nr_graph2').getContext('2d');
                            window.myPie = new Chart(ctx2, config2);
                        },250);
                    })


                }
            });
        })


        // Completed Investigation Cases
        $(".btn-CmpltdInv").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-CmpltdInv").fadeIn();
            var payload = {
                "start_date" : $("#widget_cic_date").val(),
                "end_date" : $("#widget_cic_date").val(),
                "field_office" : $("#widget_cic_field_office").val(),
                "region_id" : $('#widget_cic_field_office option:selected').data('region'),
                "method" : "completed_inv_cases"
            }

            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-CmpltdInv").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload

                    $(".CmpltdInvProbationPSIR").html(payload.ProbationPSIR.count)
                    $(".CmpltdInvProbationManifest").html(payload.ProbationManifest.count)
                    $(".CmpltdInvProbationTotal").html(payload.ProbationTotal.count)
                    $(".CmpltdInvPreParole").html(payload.PreParole.count)
                    $(".CmpltdInvPreCommutation").html(payload.PreCommutation.count)
                    $(".CmpltdInvPreConditional").html(payload.PreConditional.count)
                    $(".CmpltdInvPreAbsolute").html(payload.PreAbsolute.count)
                    $(".CmpltdInvPreOther").html(payload.PreOther.count)
                    $(".CmpltdInvpreTotal").html(payload.preTotal.count)


                    $(".CmpltdInv_graph").unbind("click").on("click",function(){
                        var config = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [
                                        payload.ProbationPSIR.count,
                                        payload.ProbationManifest.count,
                                    ],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                    ],
                                    label: 'Investigation'
                                }],
                                labels: [
                                    'PSIR Submitted ',
                                    'Manifestation Submitted',
                                ]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: 'Probation',
                                    fontSize: '16',
                                    fontStyle: 'bold',
                                    fontColor: '#000',

                                },
                                 plugins: {
                                      labels: [{
                                        render: 'percentage',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      },{
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      }]
                                    }
                            }
                        };
                        


                        var config2 = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [
                                        payload.PreParole.count,
                                        payload.PreCommutation.count,
                                        payload.PreConditional.count,
                                        payload.PreAbsolute.count,
                                        payload.PreOther.count
                                    ],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                        window.chartColors.yellow,
                                        window.chartColors.blue,
                                        window.chartColors.grey,
                                    ],
                                    label: 'Pre-Parole/Executive Clemency'
                                }],
                                labels: [
                                    'Parole',
                                    'Commutation of Sentence',
                                    'Conditional Pardon',
                                    'Absolute Pardon',
                                    'Others',
                                ]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: 'Supervision',
                                    fontSize: '16',
                                    fontStyle: 'bold',
                                    fontColor: '#000',
                                },
                                 plugins: {
                                      labels: [{
                                        render: 'percentage',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      },{
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      }]
                                    }
                            }
                        };
                        setTimeout(function () {
                            var ctx1 = document.getElementById('CmpltdInv_graph1').getContext('2d');
                            window.myPie = new Chart(ctx1, config);


                            var ctx2 = document.getElementById('CmpltdInv_graph2').getContext('2d');
                            window.myPie = new Chart(ctx2, config2);
                        },250);
                    })
                    
                }
            });
        })


        //Completed Supervision Cases
        $(".btn-CmpltdSupv").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-CmpltdSupv").fadeIn();
            var payload = {
                "start_date" : $("#widget_scs_date").val(),
                "end_date" : $("#widget_scs_date").val(),
                "field_office" : $("#widget_scs_field_office").val(),
                "region_id" : $('#widget_scs_field_office option:selected').data('region'),
                "method" : "completed_supv_cases"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-CmpltdSupv").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload

                    $(".CmpltdSupvProbationTotal").html(payload.ProbationTotal.count)
                    $(".CmpltdSupvParoleTotal").html(payload.ParoleTotal.count)
                    $(".CmpltdSupvPardonTotal").html(payload.PardonTotal.count)

                    $(".CmpltdSupvProbationTerm").html(payload.ProbationTerm.count)
                    $(".CmpltdSupvProbationRevoc").html(payload.ProbationRevoc.count)
                    $(".CmpltdSupvProbationOther").html(payload.ProbationOther.count)
                    $(".CmpltdSupvProbationDied").html(payload.ProbationDied.count)
                    $(".CmpltdSupvProbationTotal").html(payload.ProbationTotal.count)

                    $(".CmpltdSupvParoleTotal").html(payload.ParoleTotal.count)
                    $(".CmpltdSupvParoleFinal").html(payload.ParoleFinal.count)
                    $(".CmpltdSupvParoleArrest").html(payload.ParoleArrest.count)
                    $(".CmpltdSupvParoleDeath").html(payload.ParoleDeath.count)
                    $(".CmpltdSupvParoleOther").html(payload.ParoleOther.count)

                    $(".CmpltdSupvPardonTotal").html(payload.PardonTotal.count)
                    $(".CmpltdSupvPardonFinal").html(payload.PardonFinal.count)
                    $(".CmpltdSupvPardonArrest").html(payload.PardonArrest.count)
                    $(".CmpltdSupvPardonDeath").html(payload.PardonDeath.count)
                    $(".CmpltdSupvPardonOther").html(payload.PardonOther.count)
                    


                    $(".CmpltdSupv_graph").unbind("click").on("click",function(){
                        var config = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [
                                        payload.ProbationTotal.count,
                                        payload.ParoleTotal.count,
                                        payload.PardonTotal.count,
                                    ],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                        window.chartColors.yellow,
                                    ],
                                    label: 'Investigation'
                                }],
                                labels: [
                                    'Probation',
                                    'Parole',
                                    'Pardon',
                                ]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: 'Completed Supervision Cases',
                                    fontSize: '16',
                                    fontStyle: 'bold',
                                    fontColor: '#000',

                                },
                                 plugins: {
                                      labels: [{
                                        render: 'percentage',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      },{
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      }]
                                    }
                            }
                        };
                        


                        
                        setTimeout(function () {
                            var ctx1 = document.getElementById('CmpltdSupv_graph1').getContext('2d');
                            window.myPie = new Chart(ctx1, config);


                           
                        },250);
                    })
                }
            });
        })

        //Completed Court Disposition
        $(".btn-cd").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-cd").fadeIn();
            var payload = {
                "start_date" : $("#widget_cd_date").val(),
                "end_date" : $("#widget_cd_date").val(),
                "field_office" : $("#widget_cd_field_office").val(),
                "region_id" : $('#widget_cd_field_office option:selected').data('region'),
                "method" : "court_disposition"
            }

            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-cd").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload

                    $(".CDProbationGranted").html(payload.ProbationGranted.count)
                    $(".CDProbationDenied").html(payload.ProbationDenied.count)
                    $(".CDProbationWithdrawal").html(payload.ProbationWithdrawal.count)

                    $(".CDProbationDismissed").html(payload.ProbationDismissed.count)
                    $(".CDProbationDisqualified").html(payload.ProbationDisqualified.count)
                    $(".CDProbationOthers").html(payload.ProbationOther.count)
                    $(".CDProbationTotal").html(payload.ProbationTotal.count)
                    

                    $(".cd1_graph").unbind("click").on("click",function(){
                        console.log("CD")
                        var config = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [
                                        payload.ProbationGranted.count,
                                        payload.ProbationDenied.count,
                                        payload.ProbationDismissed.count,
                                        payload.ProbationDisqualified.count,
                                        payload.ProbationOther.count,
                                    ],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                        window.chartColors.yellow,
                                        window.chartColors.green,
                                        window.chartColors.grey,
                                    ],
                                    label: 'Investigation'
                                }],
                                labels: [
                                    'Granted',
                                    'Denied',
                                    'Dismissed due to Death ',
                                    'Withdrawn',
                                    'Other',
                                ]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: 'Completed Supervision Cases',
                                    fontSize: '16',
                                    fontStyle: 'bold',
                                    fontColor: '#000',

                                },
                                 plugins: {
                                      labels: [{
                                        render: 'percentage',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      },{
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 14,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                      }]
                                    }
                            }
                        };
                        


                        
                        setTimeout(function () {
                            var ctx1 = document.getElementById('cd_graph1').getContext('2d');
                            window.myPie = new Chart(ctx1, config);


                           
                        },250);
                    })
                }
            });
        })

        $(".btn-rspr").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-rspr").fadeIn();
            var payload = {
                "start_date" : $("#widget_rspr_date").val(),
                "end_date" : $("#widget_rspr_date").val(),
                "field_office" : $("#widget_rspr_field_office").val(),
                "region_id" : $('#widget_rspr_field_office option:selected').data('region'),
                "method" : "reports_submitted"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-rspr").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload
                    $(".rsprInv").html(payload.rsprInv.count)
                    $(".rsprSupv").html(payload.rsprSupv.count)
                }else{
                    $(".rsprInv").html("100%")
                    $(".rsprSupv").html("100%")
                }
            });
        });

        $(".btn-rsib").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-rsib").fadeIn();
            var payload = {
                "start_date" : $("#widget_rsrib_date").val(),
                "end_date" : $("#widget_rsrib_date").val(),
                "field_office" : $("#widget_rsrib_field_office").val(),
                "region_id" : $('#widget_rsrib_field_office option:selected').data('region'),
                "method" : "recommend_board"
            }

            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-rsib").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload
                    $(".rsibInv").html(payload.rsibInv.count)
                    $(".rsibSupv").html(payload.rsibSupv.count)
                }else{
                    $(".rsibInv").html("100%")
                    $(".rsibSupv").html("100%")
                }
            });
        });

        $(".btn-rsic").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-rsic").fadeIn();
            var payload = {
                "start_date" : $("#widget_rsr_date").val(),
                "end_date" : $("#widget_rsr_date").val(),
                "field_office" : $("#widget_rsr_field_office").val(),
                "region_id" : $('#widget_rsr_field_office option:selected').data('region'),
                "method" : "recommend_court"

            }

            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-rsic").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload
                    $(".rsicInv").html(payload.rsibInv.count)
                    $(".rsicSupv").html(payload.rsibSupv.count)
                }else{
                    $(".rsicInv").html("100%")
                    $(".rsicSupv").html("100%")
                }
            });
        });

        $(".btn-disp").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-disp").fadeIn();
            var payload = {
                "start_date" : $("#widget_dr_date").val(),
                "end_date" : $("#widget_dr_date").val(),
                "field_office" : $("#widget_dr_field_office").val(),
                "region_id" : $('#widget_dr_field_office option:selected').data('region'),
                "method" : "disposition_rate"

            }

            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-disp").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload
                    $(".dispProv").html(payload.rsibInv.count)
                    $(".dispPre").html(payload.rsibSupv.count)
                }else{
                    $(".dispProv").html("100%")
                    $(".dispPre").html("100%")
                }
            });
        });

        $(".btn-pbargain").unbind("click").on("click",function(){
            console.log("WorkloadHandled");
            $(".loading-data-pbargain").fadeIn();
            var payload = {
                "start_date" : $("#widget_pbargain_date").val(),
                "end_date" : $("#widget_pbargain_date").val(),
                "field_office" : $("#widget_pbargain_field_office").val(),
                "region_id" : $('#widget_pbargain_field_office option:selected').data('region'),
                "method" : "plea_bargain"

            }

            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-pbargain").fadeOut();
                if(result.status != undefined && result.status == "SUCCESS"){
                    payload = result.payload
                    $(".InvestigationCases").html(payload.InvestigationCases)
                    $(".DrugRelated").html(payload.DrugRelated)
                    $(".NonDrugRelated").html(payload.NonDrugRelated)
                    $(".NonPlea").html(payload.NonPlea)
                    /*$(".dispProv").html(payload.rsibInv.count)
                    $(".dispPre").html(payload.rsibSupv.count)*/
                }else{
                    /*$(".dispProv").html("100%")
                    $(".dispPre").html("100%")*/
                }
            });
        });


        $(".btn-widgetsF").unbind("click").on("click",function(){
            console.log("widgetsF");
            $(".loading-data-widgetsF").fadeIn();


            var officeId; 
            if ($("#widgets_field_office").val() === "ALL") {
                var fi = [];
                for (var x=0; x<=242; x++) {
                    fi.push(x);
                }
                var officeId = fi; 
            } else {
                var officeId = [$("#widgets_field_office").select2().find(":selected").data("id")]; 
            }

            var payload =  {
                "officeIdList": officeId,
                "yearMonthList": [
                    $("#widgets_date").val()
                ],
            }
            $.wms.executeExternalPost('http://192.168.1.33:8000/widgets',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                $(".loading-data-widgetsF").fadeOut();
               console.log(result)
                $('.ssi1').text(result.ssi1);
                $('.ssi2').text(result.ssi2);
                $('.ssi3').text(result.ssi3);
                $('.ssi4').text(result.ssi4);
                $('.ssi5').text(result.ssi5+"%");
                $('.ssc6').text(result.ssc6);
                $('.csi1').text(result.csi1);
                $('.csi2').text(result.csi2);
                $('.csi3').text(result.csi3);
                $('.csi4').text(result.csi4);

                $('.csi5').text(result.csi5+"%");
                $('.css6').text(result.css6);
                $('.vc1').text(result.vc1);
                $('.vc2').text(result.vc2);
                $('.vc3').text(result.vc3);
                $('.vc4').text(result.vc4);
                $('.ror1').text(result.ror1);
                $('.ror2').text(result.ror2);
                $('.ror3').text(result.ror3);
                $('.csiph1').text(result.csiph1);

                $('.csiph2').text(result.csiph2);
                $('.csiph3').text(result.csiph3);
                $('.csiph4').text(result.csiph4);
                $('.csiph5').text(result.csiph5);
                $('.csiph6').text(result.csiph6);
                $('.csiph7').text(result.csiph7);
                $('.csiph8').text(result.csiph8);
                $('.csipsp9').text(result.csipsp9);
                $('.csipsp10').text(result.csipsp10);
                $('.csipsp11').text(result.csipsp11);
            });
        });
        function checkPendingRequest() {
            if ($.active > 0) {
                console.log("waiting...")
                window.setTimeout(checkPendingRequest, 250);
            }
            else {
                $(".btn-workload").trigger("click")
                $(".btn-nr").trigger("click")
                $(".btn-CmpltdInv").trigger("click")
                $(".btn-CmpltdSupv").trigger("click")
                $(".btn-cd").trigger("click")
                $(".btn-pbargain").trigger("click")
                $(".btn-widgetsF").trigger("click")

                //@TODO
                $(".btn-rspr").trigger("click");
                $(".btn-rsib").trigger("click");
                $(".btn-rsic").trigger("click");
                $(".btn-disp").trigger("click");
            }
        };
        window.setTimeout(checkPendingRequest, 500);

    };  

    var __attachWidgetFilterEvent = function() {

        var selForm = $.wms.urlParam('form')
        switch(selForm){
            case 'F5PCS':   $.wms.form5.attachF5PCSPageEvent(); 
                            $.wms.reports.attachF5PCS(); break;
            case 'F21PCS':  $.wms.form21.attachF21PCSPageEvent(); 
                            $.wms.reports.attachF21PCS();
                            break;
            case 'F44SSCS': $.wms.form44.attachF44SSCSPageEvent(); 
                            break;

            case 'F50VCCS': $.wms.form50.attachF50VCCSPageEvent(); 
                            break; 
            case 'F50T1': $.wms.form50.attachF50T1PageEvent(); 
                                $.wms.reports.form_lock();
                break;
            case 'F50T2': $.wms.form50.attachF50T2PageEvent(); 
                                $.wms.reports.form_lock();
                break;

            case 'F51RORCS': $.wms.form51.attachF51RORCSPageEvent();
                            break;
            case 'F51T1': $.wms.form51.attachF51T1PageEvent(); 
                                $.wms.reports.form_lock();
                             break;
            case 'F51T2': $.wms.form51.attachF51T2PageEvent(); 
                                $.wms.reports.form_lock();
                             break;
            case 'F51T3': $.wms.form51.attachF51T3PageEvent(); 
                                $.wms.reports.form_lock();
                             break;
            case 'F51T4': $.wms.form51.attachF51T4PageEvent(); 
                                $.wms.reports.form_lock();
                             break;

            case 'F53CSAIPCS': $.wms.form53.attachF53CSAIPCSPageEvent();
                            break;
            case 'F53T1': $.wms.form53.attachF53T1PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T2': $.wms.form53.attachF53T2PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T3': $.wms.form53.attachF53T3PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T4': $.wms.form53.attachF53T4PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T5': $.wms.form53.attachF53T5PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T6': $.wms.form53.attachF53T6PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T7': $.wms.form53.attachF53T7PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T8': $.wms.form53.attachF53T8PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T9': $.wms.form53.attachF53T9PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T10': $.wms.form53.attachF53T10PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F53T11': $.wms.form53.attachF53T11PageEvent(); 
                                $.wms.reports.form_lock();
                            break;

            case 'F45CSCS': $.wms.form45.attachF45CSCSPageEvent();
                            break;
            case 'F45T1': $.wms.form45.attachF45T1PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T2': $.wms.form45.attachF45T2PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T3': $.wms.form45.attachF45T3PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T4': $.wms.form45.attachF45T4PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T5': $.wms.form45.attachF45T5PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T6': $.wms.form45.attachF45T6PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T7': $.wms.form45.attachF45T7PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T8': $.wms.form45.attachF45T8PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T9': $.wms.form45.attachF45T9PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T10': $.wms.form45.attachF45T10PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T11': $.wms.form45.attachF45T11PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T12': $.wms.form45.attachF45T12PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F45T13': $.wms.form45.attachF45T13PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
                            
            case 'F44T1': $.wms.form44.attachF44T1PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T2': $.wms.form44.attachF44T2PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T3': $.wms.form44.attachF44T3PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T4': $.wms.form44.attachF44T4PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T5': $.wms.form44.attachF44T5PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T6': $.wms.form44.attachF44T6PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T7': $.wms.form44.attachF44T7PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T8': $.wms.form44.attachF44T8PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T9': $.wms.form44.attachF44T9PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T10': $.wms.form44.attachF44T10PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T11': $.wms.form44.attachF44T11PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T12': $.wms.form44.attachF44T12PageEvent(); 
                                $.wms.reports.form_lock();
                            break;
            case 'F44T13': $.wms.form44.attachF44T13PageEvent(); 
                                $.wms.reports.form_lock();
                            break;

            case 'F5T1': $.wms.form5.attachF5T1PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T2': $.wms.form5.attachF5T2PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T3': $.wms.form5.attachF5T3PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T4': $.wms.form5.attachF5T4PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T5': $.wms.form5.attachF5T5PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T6': $.wms.form5.attachF5T6PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T7': $.wms.form5.attachF5T7PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T8': $.wms.form5.attachF5T8PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T9': $.wms.form5.attachF5T9PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T10': $.wms.form5.attachF5T10PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T11': $.wms.form5.attachF5T11PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T12': $.wms.form5.attachF5T12PageEvent(); $.wms.reports.form_lock(); break;
            case 'F5T13': $.wms.form5.attachF5T13PageEvent(); $.wms.reports.form_lock(); break;

            case 'F21T1': $.wms.form21.attachF21T1PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T2': $.wms.form21.attachF21T2PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T3': $.wms.form21.attachF21T3PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T4': $.wms.form21.attachF21T4PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T5': $.wms.form21.attachF21T5PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T6': $.wms.form21.attachF21T6PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T7': $.wms.form21.attachF21T7PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T8': $.wms.form21.attachF21T8PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T9': $.wms.form21.attachF21T9PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T10': $.wms.form21.attachF21T10PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T11': $.wms.form21.attachF21T11PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T12': $.wms.form21.attachF21T12PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T13': $.wms.form21.attachF21T13PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T14': $.wms.form21.attachF21T14PageEvent(); $.wms.reports.form_lock(); break;
            case 'F21T15': $.wms.form21.attachF21T15PageEvent(); $.wms.reports.form_lock(); break;
            break;
        }

        var date        = $.wms.urlParam('date')
        var field       = $.wms.urlParam('field')
        var officeId    = $.wms.urlParam('officeId')
        var reg2        = $.wms.urlParam('reg2')
        var reg         = $.wms.urlParam('reg')

        $(".btn-print").unbind("click").on("click",function(){
            var isocode     = $(".isocode_").val()
            window.open('print_caseload?form='+selForm+'&date='+date+'&field='+field+"&officeId="+officeId+"&page="+0+"&size="+"500"+"&isocode="+isocode, '_blank'); 
        });
        

        $(".btn-print-report").unbind("click").on("click",function(){
            window.open('report_print?form='+selForm+'&date='+date+'&reg2='+reg2+'&reg='+reg, '_blank'); 
        });

        function checkPendingRequest() {
            if ($.active > 0) {
                console.log("waiting...")
                window.setTimeout(checkPendingRequest, 250);
            }
            else {
                console.log("done...")
                var y = date.substr(0,4)
                var m = date.substr(5,7)
                //console.log(y);
                //console.log(m);
                //
                $("#filter_date").datepicker("setDate",new Date(y,m-1));
                $("#add_Y_M").datepicker("setDate",new Date(y,m-1));
                $("#filter_office").val(field).trigger("change")
                
                if(field != "ALL"){
                    var selField = $.wms.urlParam('field')
                    $(".sel_field_office2").val(selField).trigger("change");
                    //$(".field").remove();
                }
                //trigger for Regional Report
                if(~selForm.indexOf("regional")){
                     $("#sel-report-regional-forms").val(selForm).trigger("change");
                     $("#report-regional-date").val(date).trigger("change");
                }else{
                    $("#sel-report-field-forms").val(selForm).trigger("change");
                    $("#report-field-date").val(date).trigger("change");
                    $("#sel-report-field").val(reg).trigger("change");
                }

                if(~selForm.indexOf("quarterly")){
                    $("#sel-report-quarterly-forms").val(selForm).trigger("change");
                    $("#report-quarterly-date").val(date).trigger("change");
                }
            }
        };
        window.setTimeout(checkPendingRequest, 250);
        if (selForm.substring(0,3) == "F21") {
            $("#sel-parole-forms").removeClass("hidden")
            $("#sel-parole-forms").select2()
            $("#sel-parole-forms").val(selForm).trigger("change")
        }else if (selForm.substring(0,3) == "F44") {
            $("#sel-44-forms").removeClass("hidden")
            $("#sel-44-forms").select2()
            $("#sel-44-forms").val(selForm).trigger("change")
        }else if (selForm.substring(0,3) == "F45") {
            $("#sel-45-forms").removeClass("hidden")
            $("#sel-45-forms").select2()
            $("#sel-45-forms").val(selForm).trigger("change")
        }else if (selForm.substring(0,3) == "F50") {
            $("#sel-50-forms").removeClass("hidden")
            $("#sel-50-forms").select2()
            $("#sel-50-forms").val(selForm).trigger("change")
        }else if (selForm.substring(0,3) == "F51") {
            $("#sel-51-forms").removeClass("hidden")
            $("#sel-51-forms").select2()
            $("#sel-51-forms").val(selForm).trigger("change")
        }else if (selForm.substring(0,3) == "F53") {
            $("#sel-53-forms").removeClass("hidden")
            $("#sel-53-forms").select2()
            $("#sel-53-forms").val(selForm).trigger("change")

        } else {
            $("#sel-probation-forms").removeClass("hidden")
            $("#sel-probation-forms").select2();
            $("#sel-probation-forms").val(selForm).trigger("change")
        }


        //Case Load Filtering Widget
        $(".btn-filter").unbind("click").on("click",function(){
            console.log("Trigger");
            var selForm = $.wms.urlParam('form')
            var sel = "";
            if (selForm.substring(0,3) == "F21") {
                sel = $("#sel-parole-forms").val();
            }else if (selForm.substring(0,3) == "F44") {
                sel = $("#sel-44-forms").val();
            }else if (selForm.substring(0,3) == "F45") {
                sel = $("#sel-45-forms").val();
            }else if (selForm.substring(0,3) == "F50") {
                sel = $("#sel-50-forms").val();
            }else if (selForm.substring(0,3) == "F51") {
                sel = $("#sel-51-forms").val();
            }else if (selForm.substring(0,3) == "F53") {
                sel = $("#sel-53-forms").val();
            } else {
                sel = $("#sel-probation-forms").val();
            }

            var date  = $("#filter_date").val();
            var field = $("#filter_office").val();
            var officeId   = $("#filter_office").select2().find(":selected").data("id");

            window.location.href="caseload?form="+sel+"&date="+date+"&field="+field+"&officeId="+officeId+"&page="+0+"&size="+700
        });

        $(".btn-regional-filter").unbind("click").on("click",function(){
            console.log("Trigger");
            var selForm = $("#sel-report-regional-forms").val();
            var date = $("#report-regional-date").val();
            window.location.href="report?form="+selForm+"&date="+date
        });

        $(".btn-field-filter").unbind("click").on("click",function(){
            console.log("Trigger");
            var selForm = $("#sel-report-field-forms").val();
            var date = $("#report-field-date").val();
            var reg = $("#sel-report-field").val()
            var reg2 = $("#sel-report-field :selected").attr("id")
            window.location.href="report?form="+selForm+"&date="+date+"&reg="+reg+"&reg2="+reg2
        });

        $(".btn-quarterly-filter").unbind("click").on("click",function(){
            console.log("Trigger");
            var selForm = $("#sel-report-quarterly-forms").val();
            var date = $("#report-quarterly-date").val();
            window.location.href="report?form="+selForm+"&date="+date
        });


        __getFeedback();
        $(".addFeedbackSubmitButton").unbind("click").on("click",function(){
            $(".addFeedbackSubmitButton").addClass("hidden")
            $(".addFeedbackProceedButton").removeClass("hidden")
            $(".confirmFeedbackAdd").removeClass("hidden")
            $("#addFeedbackMsg").attr("disabled",true)
        });

        $(".addFeedbackCancelButton").unbind("click").on("click",function(){
             $(".addFeedbackSubmitButton").removeClass("hidden")
            $(".addFeedbackProceedButton").addClass("hidden")
            $(".confirmFeedbackAdd").addClass("hidden")
            $("#addFeedbackMsg").attr("disabled",false)
        });

        $(".addFeedbackProceedButton").unbind("click").on("click",function(){
            var payload = {
                "date" : $.wms.urlParam('date'),
                "field" : $.wms.urlParam('field'),
                "form" : $.wms.urlParam('form'),
                "message" : $("#addFeedbackMsg").val(),
                "created_by": $.cookie("USER_ID"),
                "seen" : "0",
                "done" : "0",
                "method" : "insert"
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertFeedback',JSON.stringify(payload)).done(function (result) {
                console.log(result)
                $(".addFeedbackSubmitButton").removeClass("hidden")
                $(".addFeedbackProceedButton").addClass("hidden")
                $(".confirmFeedbackAdd").addClass("hidden")
                $("#addFeedbackMsg").attr("disabled",false)
                $("#modal-addFeedback").modal("toggle");
                //@TODO
                //GET LIST OF UPDATED 
                __getFeedback();
            });
                
                
                
                
        })
    }

    var __getFeedback = function(){
        var payload = {
                "date" : $.wms.urlParam('date'),
                "field" : $.wms.urlParam('field'),
                "form" : $.wms.urlParam('form'),
                "method" : "fetchByFormID"
            }
            $('.fb_msg').empty()
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertFeedback',JSON.stringify(payload)).done(function (result) {
                console.log(result)
                if(result.status != undefined && result.status == 'SUCCESS'){
                    result.payload.forEach(function(data){
                        $('.fb_msg').append("<tr>"+
                            "<td>"+data.created_date+"</td>"+
                            "<td>"+data.USER_FULLNAME+"</td>"+
                            "<td>"+data.FIELD_OFFICE+"</td>"+
                            "<td>"+data.message+"</td>"
                            );    
                    });
                }else{
                    $('.fb_msg').append("<tr>"+
                        "<td colspan=4 class='center b'>No Feedback Yet!</td>"
                    );
                }
                

            });
    }


    var __getRcvFeedback = function(){
        var payload = {
                "field" : $.cookie("FIELD_OFFICE"),
                "method" : "fetchByFormID2",
                "seen" : "0"
            }
            $('.fb_rcv_msg').empty()
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertFeedback',JSON.stringify(payload)).done(function (result) {
                console.log(result)
                if(result.status != undefined && result.status == 'SUCCESS'){
                    $("#fb_rcv_form").removeClass("hidden")
                    result.payload.forEach(function(data){
                        $('.fb_rcv_msg').append("<tr>"+
                            "<td>"+data.created_date+"</td>"+
                            "<td>"+data.USER_FULLNAME+"</td>"+
                            "<td>"+data.FIELD_OFFICE+"</td>"+
                            "<td>"+data.form+"</td>"+
                            "<td>"+data.date+"</td>"+
                            "<td>"+data.message+"</td>" +
                            "<td>"
                                +"<a class='btn btn-success' href='caseload?form="+data.form+"&date="+data.date+"&field="+data.field+"'>View</a> "
                                +"<a class='btn btn-success btn-fb-hide' data-id="+data.feedback_id+"'>Hide</a>"+
                            "</td>"
                            );    
                    });

                    $(".btn-fb-hide").unbind("click").on("click",function(){
                        //console.log($(this).data());
                        var payload = {
                            "feedback_id" : $(this).data("id"),
                            "seen" : "1",
                            "method" : "update"
                        }
                        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/upsertFeedback',JSON.stringify(payload)).done(function (result) {
                            console.log(result)
                        });
                        __getRcvFeedback();
                    });


                }else{
                    $("#fb_rcv_form").addClass("hidden")
                }
            });


    }



    
    return {
        attachWidgetFilterEvent : __attachWidgetFilterEvent,
        attachWidgetEvent : __attachWidgetEvent,
        getFeedback : __getFeedback,
        getRcvFeedback : __getRcvFeedback
    };
}());
