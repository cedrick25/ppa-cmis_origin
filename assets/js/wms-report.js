/* 
 * This the Login js of WMS 
 *  Portal web services.
 */

$ = (typeof $ !== 'undefined') ? $ : {};
$.wms.report = (typeof $.wms.report !== 'undefined') ? $.wms : {};

$.wms.report = (function() {

    var __load = function() {
        console.log("-LOAD-")
        var date = $.wms.urlParam('date')
        var form = $.wms.urlParam('form')
        var reg = $.wms.urlParam('reg')
        if(reg != ""){
            $(".curr_reg").html(reg);    
        }
        
        $(".curr_date").html(date);

        switch(form){
            
            case "f44_field_office_ssi_f1":
                f44_field_office_ssi_f1();
            break;
            case "f44_field_office_ssi_f2":
                f44_field_office_ssi_f2();
            break;
            case "f44_field_office_ssi_f3":
                f44_field_office_ssi_f3();
            break;
            case "f44_field_office_sss_f1":
                f44_field_office_sss_f1();
            break;
            case "f44_field_office_sss_f2_p1":
                f44_field_office_sss_f2_p1();
            break;
            case "f44_field_office_sss_f2_p2":
                f44_field_office_sss_f2_p2();
            break;
            case "f44_field_office_sss_f3":
                f44_field_office_sss_f3();
            break;

            case "f45_field_office_csi_f1":
                f45_field_office_csi_f1();
            break;
            case "f45_field_office_csi_f2":
                f45_field_office_csi_f2();
            break;
            case "f45_field_office_csi_f3":
                f45_field_office_csi_f3();
            break;
            case "f45_field_office_css_f1":
                f45_field_office_css_f1();
            break;
            case "f45_field_office_css_f2_p1":
                f45_field_office_css_f2_p1();
            break;
            case "f45_field_office_css_f2_p2":
                f45_field_office_css_f2_p2();
            break;
            case "f45_field_office_css_f3":
                f45_field_office_css_f3();
            break;
            case "f50_field_office_vc_f1":
                f50_field_office_vc_f1();
            break;
            case "f51_field_office_ror_f1":
                f51_field_office_ror_f1();
            break;
            case "f53_field_office_f1":
                f53_field_office_f1();
            break;
            case "f53_field_office_f2":
                f53_field_office_f2();
            break;

            case "f44_regional_ssi_r1":
                f44_regional_ssi_r1();
            break;
            case "f44_regional_ssi_r2":
                f44_regional_ssi_r2();
            break;
            case "f44_regional_ssi_r3":
                f44_regional_ssi_r3();
            break;
            case "f44_regional_sss_r1":
                f44_regional_sss_r1();
            break;
            case "f44_regional_sss_r2_p1":
                f44_regional_sss_r2_p1();
            break;
            case "f44_regional_sss_r2_p2":
                f44_regional_sss_r2_p2();
            break;
            case "f44_regional_sss_r3":
                f44_regional_sss_r3();
            break;

            case "f45_regional_csi_r1":
                f45_regional_csi_r1();
            break;
            case "f45_regional_csi_r2":
                f45_regional_csi_r2();
            break;
            case "f45_regional_csi_r3":
                f45_regional_csi_r3();
            break;
            case "f45_regional_css_r1":
                f45_regional_css_r1();
            break;
            case "f45_regional_css_r2_p1":
                f45_regional_css_r2_p1();
            break;
            case "f45_regional_css_r2_p2":
                f45_regional_css_r2_p2();
            break;
            case "f45_regional_css_r3":
                f45_regional_css_r3();
            break;
            case "f50_regional_vc_r1":
                f50_regional_vc_r1();
            break;
            case "f51_regional_ror_r1":
                f51_regional_ror_r1();
            break;
            case "f53_regional_r1":
                f53_regional_r1();
            break;
            case "f53_regional_r2":
                f53_regional_r2();
            break;
            case "quarterly_f1":
                quarterly_f1();
            break;
            case "quarterly_f2":
                quarterly_f2();
            break;

            case "quarterly_f3":
                quarterly_f3();
            break;

            case "quarterly_f4":
                quarterly_f4();
            break;

            case "quarterly_f5":
                quarterly_f5();
            break;

            case "quarterly_f6":
                quarterly_f6();
            break;

            case "quarterly_f7":
                quarterly_f7();
            break;

            case "quarterly_f8":
                quarterly_f8();
            break;

            case "quarterly_f9":
                quarterly_f9();
            break;

            case "quarterly_f10":
                quarterly_f10();
            break;

            case "quarterly_f11":
                quarterly_f11();
            break;

            case "quarterly_f12":
                quarterly_f12();
            break;

            case "f5_regional_pi_r1_p1":
                f5_regional_pi_r1_p1();
            break;

            case "f5_regional_pi_r1_p2":
                f5_regional_pi_r1_p2();
            break; 

            case "f5_regional_pi_r2":
                f5_regional_pi_r2();
            break;
            case "f5_regional_pi_r3":
                f5_regional_pi_r3();
            break;
            case "f5_regional_pi_r4":
                f5_regional_pi_r4();
            break;
            
            case "f5_regional_ps_r1_p1":
                f5_regional_ps_r1_p1();
            break;

            case "f5_regional_ps_r1_p2":
                f5_regional_ps_r1_p2();
            break;;

            case "f5_regional_ps_r1_p3":
                f5_regional_ps_r1_p3();
            break;

            case "f5_regional_ps_r2_p1":
                f5_regional_ps_r2_p1();
            break;

            case "f5_regional_ps_r2_p2":
                f5_regional_ps_r2_p2();
            break;

            case "f5_regional_ps_r3":
                f5_regional_ps_r3();
            break;

            case "f21_regional_ppi_r1_p1":
                f21_regional_ppi_r1_p1();
            break;

            case "f21_regional_ppi_r1_p2":
                //TODO
                f21_regional_ppi_r1_p2();
            break;

            case "f21_regional_ppi_r1_p3":
                f21_regional_ppi_r1_p3();
            break;

            case "f21_regional_ppi_r2_p1":
                f21_regional_ppi_r2_p1();
            break;

            case "f21_regional_ppi_r3":
                f21_regional_ppi_r3();
            break;

            case "f21_regional_ppi_r4_p1":
                f21_regional_ppi_r4_p1();
            break;

            case "f21_regional_ppi_r4_p2":
                f21_regional_ppi_r4_p2();
            break;

            case "f21_regional_pr_pd_r1_p1":
                f21_regional_pr_pd_r1_p1();
            break;

            case "f21_regional_pr_pd_r1_p2":
                f21_regional_pr_pd_r1_p2();
            break;

            case "f21_regional_pr_pd_r1_p3":
                f21_regional_pr_pd_r1_p3();
            break;

            case "f21_regional_pr_pd_r2_p1":
                f21_regional_pr_pd_r2_p1();
            break;

            case "f21_regional_pr_pd_r2_p2":
                f21_regional_pr_pd_r2_p2();
            break;

            case "f21_regional_pr_pd_r3":
                f21_regional_pr_pd_r3();
            break;

            case "f21_regional_pr_pd_r4":
                f21_regional_pr_pd_r4();
            break;

            //FIELD

            case "f5_field_office_pi_f1_p1":
                    f5_field_office_pi_f1_p1();
            break;
            case "f5_field_office_pi_f1_p2":
                f5_field_office_pi_f1_p2();
                break;
            case "f5_field_office_pi_f2":
                f5_field_office_pi_f2();
            break;

            case "f5_field_office_pi_f3":
                f5_field_office_pi_f3();
            break;

            case "f5_field_office_ps_f1_p1":
                f5_field_office_ps_f1_p1();
            break;
            case "f5_field_office_ps_f1_p2":
                f5_field_office_ps_f1_p2();
            break;


            //FIELD OFFICE QUARTERLY PROBATION SUPERVISION CASELOAD PAGE 3
            case "f5_field_office_ps_f1_p3":
                f5_field_office_ps_f1_p3();
            break;

            //TODO need to get DAYS in PIS
            case "f5_field_office_pi_f4":
                f5_field_office_pi_f4();
            break;

            case "f5_field_office_ps_f2_p1":
                f5_field_office_ps_f2_p1();
            break;
            case "f5_field_office_ps_f2_p2":
                f5_field_office_ps_f2_p2();
            break;
            case "f5_field_office_ps_f3":
                f5_field_office_ps_f3();
            break;

            case "f21_field_office_ppi_f1_p1":
                f21_field_office_ppi_f1_p1();
            break;

            case "f21_field_office_ppi_f1_p2":
                //TODO
                f21_field_office_ppi_f1_p2();
            break; 

            case "f21_field_office_ppi_f1_p3":
                f21_field_office_ppi_f1_p3();
            break;

            case "f21_field_office_ppi_f2_p1":
                f21_field_office_ppi_f2_p1();
            break;

            case "f21_field_office_ppi_f2_p2":
                f21_field_office_ppi_f2_p2();
            break;

            case "f21_field_office_ppi_f3":
                f21_field_office_ppi_f3();
            break;

            case "f21_field_office_ppi_f4_p1":
                f21_field_office_ppi_f4_p1();
            break;

            case "f21_field_office_ppi_f4_p2":
                f21_field_office_ppi_f4_p2();
            break;

            case "f21_field_office_pr_pd_f1_p1":
                f21_field_office_pr_pd_f1_p1();
            break;
            
            case "f21_field_office_pr_pd_f1_p2":
                f21_field_office_pr_pd_f1_p2();
            break;

            case "f21_field_office_pr_pd_f1_p3":
                f21_field_office_pr_pd_f1_p3();
            break;

            case "f21_field_office_pr_pd_f2_p1":
                f21_field_office_pr_pd_f2_p1();
            break;
            
            case "f21_field_office_pr_pd_f2_p2":
                f21_field_office_pr_pd_f2_p2();
            break;
            
            case "f21_field_office_pr_pd_f3":
                f21_field_office_pr_pd_f3();
            break;
            
            case "f21_field_office_pr_pd_f4":
                f21_field_office_pr_pd_f4();
            break;


        }

        $(".btn-download").unbind("click").on("click",function(){

            const eym = $.wms.urlParam('date');
            const d = new Date(eym);
            const Y_M = d.getFullYear()+'-01';

            var form = "Download Reports Form: "+$.wms.urlParam('form')+", Date-from:"+Y_M +" to "+ $.wms.urlParam('date')
            var payload = {
                "created_by" : $.cookie("USER_ID"),
                "module" : "REPORTS",
                "action" : form
                
            }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/AuditInsert',JSON.stringify(payload)).done(function (result) {
            });

            $("#Table").table2excel({
                // exclude CSS class
                exclude: ".options",
                name: form,
                filename: form+".xls", //do not include extension
                fileext: ".xls",
                preserveColors: true
              }); 
        });

    };  
    // sel
    var f44_field_office_ssi_f1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.ib1 + result.ib2;
                    var total2 = result.ia + result.ib;
                    var total3 = result.id1a + result.id1b + result.id2;
                    var total4 = total2 - total3;
                    a += result.ia;
                    b += result.ib1;
                    c += result.ib2;
                    d += total1;
                    e += total2;
                    f += result.id1a;
                    g += result.id1b;
                    h += result.id2;
                    i += total3;
                    j += total4;
                    console.log(a)
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.ia+"</td>"+
                                "<td class='center'>"+result.ib1+"</td>"+
                                "<td class='center'>"+result.ib2+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                                "<td class='center'>"+result.id1a+"</td>"+
                                "<td class='center'>"+result.id1b+"</td>"+
                                "<td class='center'>"+result.id2+"</td>"+
                                "<td class='center'>"+total3+"</td>"+
                                "<td class='center'>"+total4+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                            "<td class='center b'>"+h+"</td>"+
                            "<td class='center b'>"+i+"</td>"+
                            "<td class='center b'>"+j+"</td>"+
                        "</tr>"
                );
                })
            })
        })
    }
    var f44_field_office_ssi_f2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.iia + result.iib;
                    var total2 = result.iid1 + result.iid2;
                    var total3 = total1 - total2;
                    a += result.iia;
                    b += result.iib;
                    c += total1;
                    d += result.iid1;
                    e += result.iid2;
                    f += total2;
                    g += total3;
                    console.log(a)
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.iia+"</td>"+
                                "<td class='center'>"+result.iib+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.iid1+"</td>"+
                                "<td class='center'>"+result.iid2+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                                "<td class='center'>"+total3+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                        "</tr>"
                );
                })
            })
        })
    }
    var f44_field_office_ssi_f3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.iiia + result.iiib;
                    var total2 = total1 - result.iiid;
                    a += result.iiia;
                    b += result.iiib;
                    c += total1;
                    d += result.iiid;
                    e += total2;
                    console.log(a)
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.iiia+"</td>"+
                                "<td class='center'>"+result.iiib+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.iiid+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                        "</tr>"
                );
                })
            })
        })
    }
    var f44_field_office_sss_f1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.iva + result.ivb;
                    var total2 = result.ivd2 + result.ivd2 + result.ivd3;
                    var total3 = result.ive1a + result.ive1b + result.ive1c;
                    var total4 = total1 - total2;

                    a += result.iva;
                    b += result.ivb;
                    c += total1;
                    d += result.ivd1;
                    e += result.ivd2;
                    f += result.ivd3;
                    g += total2;
                    h += result.ive1a;
                    i += result.ive1b;
                    j += result.ive1c;
                    k += total3;
                    l += total4;
                    console.log(a)
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.iva+"</td>"+
                                "<td class='center'>"+result.ivb+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.ivd1+"</td>"+
                                "<td class='center'>"+result.ivd2+"</td>"+
                                "<td class='center'>"+result.ivd3+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                                "<td class='center'>"+result.ive1a+"</td>"+
                                "<td class='center'>"+result.ive1b+"</td>"+
                                "<td class='center'>"+result.ive1c+"</td>"+
                                "<td class='center'>"+total3+"</td>"+
                                "<td class='center'>"+total4+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                            "<td class='center b'>"+h+"</td>"+
                            "<td class='center b'>"+i+"</td>"+
                            "<td class='center b'>"+j+"</td>"+
                            "<td class='center b'>"+k+"</td>"+
                            "<td class='center b'>"+l+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f44_field_office_sss_f2_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.va1 + result.va2 + result.va3;
                    var total2 = result.vb1 + result.vb2 + result.vb3;
                    var total3 = total1 + total2;

                    a += result.va1;
                    b += result.va2;
                    c += result.va3;
                    d += total1;
                    e += result.vb1;
                    f += result.vb2;
                    g += result.vb3;
                    h += total2;
                    i += total3;
                    console.log(a)
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.va1+"</td>"+
                                "<td class='center'>"+result.va2+"</td>"+
                                "<td class='center'>"+result.va3+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.vb1+"</td>"+
                                "<td class='center'>"+result.vb2+"</td>"+
                                "<td class='center'>"+result.vb3+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                                "<td class='center'>"+total3+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                            "<td class='center b'>"+h+"</td>"+
                            "<td class='center b'>"+i+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f44_field_office_sss_f2_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.va1 + result.va2 + result.va3;
                    var total2 = result.vb1 + result.vb2 + result.vb3;
                    var total3 = total1 + total2;
                    var total4 = result.vd1 + result.vd2 + result.vd3;
                    var total5 = total3 - total4;

                    a += total3;
                    b += result.vd1;
                    c += result.vd2;
                    d += result.vd3;
                    e += total4;
                    f += total5;
                    console.log(a)
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+total3+"</td>"+
                                "<td class='center'>"+result.vd1+"</td>"+
                                "<td class='center'>"+result.vd2+"</td>"+
                                "<td class='center'>"+result.vd3+"</td>"+
                                "<td class='center'>"+total4+"</td>"+
                                "<td class='center'>"+total5+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f44_field_office_sss_f3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.via + result.vib;
                    var total2 = total1 - result.vid;

                    a += result.via;
                    b += result.vib;
                    c += total1;
                    d += result.vid;
                    e += total2;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.via+"</td>"+
                                "<td class='center'>"+result.vib+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.vid+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f45_field_office_csi_f1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.ib1 + result.ib2;
                    var total2 = result.id1a + result.id1b + result.id2;

                    a += result.ia;
                    b += result.ib1;
                    c += result.ib2;
                    d += total1;
                    e += result.ic;
                    f += result.id1a;
                    g += result.id1b;
                    h += result.id2;
                    i += total2;
                    j += result.ie;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.ia+"</td>"+
                                "<td class='center'>"+result.ib1+"</td>"+
                                "<td class='center'>"+result.ib2+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.ic+"</td>"+
                                "<td class='center'>"+result.id1a+"</td>"+
                                "<td class='center'>"+result.id1b+"</td>"+
                                "<td class='center'>"+result.id2+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                                "<td class='center'>"+result.ie+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                            "<td class='center b'>"+h+"</td>"+
                            "<td class='center b'>"+i+"</td>"+
                            "<td class='center b'>"+j+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f45_field_office_csi_f2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.iid1 + result.iid2;

                    a += result.iia;
                    b += result.iib;
                    c += result.iic;
                    d += result.iid1;
                    e += result.iid2;
                    f += total1;
                    g += result.iie;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.iia+"</td>"+
                                "<td class='center'>"+result.iib+"</td>"+
                                "<td class='center'>"+result.iic+"</td>"+
                                "<td class='center'>"+result.iid1+"</td>"+
                                "<td class='center'>"+result.iid2+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.iie+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f45_field_office_csi_f3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.iid1 + result.iid2;

                    a += result.iiia;
                    b += result.iiib;
                    c += result.iiic;
                    d += result.iiid;
                    e += result.iiie;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.iiia+"</td>"+
                                "<td class='center'>"+result.iiib+"</td>"+
                                "<td class='center'>"+result.iiic+"</td>"+
                                "<td class='center'>"+result.iiid+"</td>"+
                                "<td class='center'>"+result.iiie+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f45_field_office_css_f1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.ivd1 + result.ivd2 + result.ivd3;
                    var total2 = result.ive1a + result.ive1b + result.ive1c;

                    a += result.iva;
                    b += result.ivb;
                    c += result.ivc;
                    d += result.ivd1;
                    e += result.ivd2;
                    f += result.ivd3;
                    g += total1;
                    h += result.ive1a;
                    i += result.ive1b;
                    j += result.ive1c;
                    k += total2;
                    l += result.ivf;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.iva+"</td>"+
                                "<td class='center'>"+result.ivb+"</td>"+
                                "<td class='center'>"+result.ivc+"</td>"+
                                "<td class='center'>"+result.ivd1+"</td>"+
                                "<td class='center'>"+result.ivd2+"</td>"+
                                "<td class='center'>"+result.ivd3+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.ive1a+"</td>"+
                                "<td class='center'>"+result.ive1b+"</td>"+
                                "<td class='center'>"+result.ive1c+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                                "<td class='center'>"+result.ivf+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                            "<td class='center b'>"+h+"</td>"+
                            "<td class='center b'>"+i+"</td>"+
                            "<td class='center b'>"+j+"</td>"+
                            "<td class='center b'>"+k+"</td>"+
                            "<td class='center b'>"+l+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f45_field_office_css_f2_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.va1 + result.va2 + result.va3;
                    var total2 = result.vb1 + result.vb2 + result.vb3;

                    a += result.va1;
                    b += result.va2;
                    c += result.va3;
                    d += total1;
                    e += result.vb1;
                    f += result.vb2;
                    g += result.vb3;
                    h += total2;
                    i += result.vc;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.va1+"</td>"+
                                "<td class='center'>"+result.va2+"</td>"+
                                "<td class='center'>"+result.va3+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.vb1+"</td>"+
                                "<td class='center'>"+result.vb2+"</td>"+
                                "<td class='center'>"+result.vb3+"</td>"+
                                "<td class='center'>"+total2+"</td>"+
                                "<td class='center'>"+result.vc+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                            "<td class='center b'>"+h+"</td>"+
                            "<td class='center b'>"+i+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f45_field_office_css_f2_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.vd1 + result.vd2 + result.vd3;
                    var total2 = result.vb1 + result.vb2 + result.vb3;

                    a += result.vc;
                    b += result.vd1;
                    c += result.vd2;
                    d += result.vd3;
                    e += total1;
                    f += result.ve;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.vc+"</td>"+
                                "<td class='center'>"+result.vd1+"</td>"+
                                "<td class='center'>"+result.vd2+"</td>"+
                                "<td class='center'>"+result.vd3+"</td>"+
                                "<td class='center'>"+total1+"</td>"+
                                "<td class='center'>"+result.ve+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f45_field_office_css_f3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.vd1 + result.vd2 + result.vd3;
                    var total2 = result.vb1 + result.vb2 + result.vb3;

                    a += result.via;
                    b += result.vib;
                    c += result.vic;
                    d += result.vid;
                    e += result.vie;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.via+"</td>"+
                                "<td class='center'>"+result.vib+"</td>"+
                                "<td class='center'>"+result.vic+"</td>"+
                                "<td class='center'>"+result.vid+"</td>"+
                                "<td class='center'>"+result.vie+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f50_field_office_vc_f1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F50Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    var total1 = result.vd1 + result.vd2 + result.vd3;
                    var total2 = result.vb1 + result.vb2 + result.vb3;

                    a += result.a;
                    b += result.b;
                    c += result.c;
                    d += result.d;
                    e += result.e;
                    f += result.f;
                    g += result.g;
                    h += result.h;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.a+"</td>"+
                                "<td class='center'>"+result.b+"</td>"+
                                "<td class='center'>"+result.c+"</td>"+
                                "<td class='center'>"+result.d+"</td>"+
                                "<td class='center'>"+result.e+"</td>"+
                                "<td class='center'>"+result.f+"</td>"+
                                "<td class='center'>"+result.g+"</td>"+
                                "<td class='center'>"+result.h+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                            "<td class='center b'>"+h+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f51_field_office_ror_f1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F51Caseload',JSON.stringify(payload)).done(function (result) {
                    // console.log(result)
                    $("#divLoading").addClass("hidden");

                    // var total1 = result.vd1 + result.vd2 + result.vd3;
                    // var total2 = result.vb1 + result.vb2 + result.vb3;

                    a += result.ia;
                    b += result.ib;
                    c += result.ic;
                    d += result.id;
                    e += result.ie;
                    f += result.if;
                    g += result.ii;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.ia+"</td>"+
                                "<td class='center'>"+result.ib+"</td>"+
                                "<td class='center'>"+result.ic+"</td>"+
                                "<td class='center'>"+result.id+"</td>"+
                                "<td class='center'>"+result.ie+"</td>"+
                                "<td class='center'>"+result.if+"</td>"+
                                "<td class='center'>"+result.ii+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f53_field_office_f1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            let m = 0;
            let n = 0;
            let o = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F53Caseload',JSON.stringify(payload)).done(function (result) {
                    console.log(result)
                    $("#divLoading").addClass("hidden");

                    // var total1 = result.vd1 + result.vd2 + result.vd3;
                    // var total2 = result.vb1 + result.vb2 + result.vb3;

                    a += result.ia;
                    b += result.ib;
                    c += result.iia;
                    d += result.iib;
                    e += result.iiia;
                    f += result.iiib;
                    g += result.iiic;
                    h += result.iv;
                    i += result.v;
                    j += result.via;
                    k += result.vib;
                    l += result.vic;
                    m += result.vid1;
                    n += result.vid2;
                    o += result.vie;
                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.ia+"</td>"+
                                "<td class='center'>"+result.ib+"</td>"+
                                "<td class='center'>"+result.iia+"</td>"+
                                "<td class='center'>"+result.iib+"</td>"+
                                "<td class='center'>"+result.iiia+"</td>"+
                                "<td class='center'>"+result.iiib+"</td>"+
                                "<td class='center'>"+result.iiic+"</td>"+
                                "<td class='center'>"+result.iv+"</td>"+
                                "<td class='center'>"+result.v+"</td>"+
                                "<td class='center'>"+result.via+"</td>"+
                                "<td class='center'>"+result.vib+"</td>"+
                                "<td class='center'>"+result.vic+"</td>"+
                                "<td class='center'>"+result.vid1+"</td>"+
                                "<td class='center'>"+result.vid2+"</td>"+
                                "<td class='center'>"+result.vie+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                            "<td class='center b'>"+f+"</td>"+
                            "<td class='center b'>"+g+"</td>"+
                            "<td class='center b'>"+h+"</td>"+
                            "<td class='center b'>"+i+"</td>"+
                            "<td class='center b'>"+j+"</td>"+
                            "<td class='center b'>"+k+"</td>"+
                            "<td class='center b'>"+l+"</td>"+
                            "<td class='center b'>"+m+"</td>"+
                            "<td class='center b'>"+n+"</td>"+
                            "<td class='center b'>"+o+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }
    var f53_field_office_f2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        const reg2 = $.wms.urlParam('reg2');

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        var payload2 = {
            REGION  : reg2,
        }
        console.log(payload2)
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result) {
            console.log("================")
            // console.log(result)
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            let m = 0;
            let n = 0;
            let o = 0;
            result.payload.forEach(function(data){
                // console.log(data.ID)
                // console.log(data.NAME)

                var payload = {
                    officeIdList  : [data.ID],
                    yearMonthList : quarter
                }
                // console.log(payload)

                $.wms.executeExternalPost('http://192.168.1.33:8000/F53Caseload',JSON.stringify(payload)).done(function (result) {
                    console.log(result)
                    $("#divLoading").addClass("hidden");

                    // var total1 = result.vd1 + result.vd2 + result.vd3;
                    // var total2 = result.vb1 + result.vb2 + result.vb3;

                    a += result.viia;
                    b += result.viib;
                    c += result.viic;
                    d += result.viid;
                    e += result.viie;

                    data = "<tr>"+
                                "<td class='b'>"+data.NAME+"</td>"+
                                "<td class='center'>"+result.viia+"</td>"+
                                "<td class='center'>"+result.viib+"</td>"+
                                "<td class='center'>"+result.viic+"</td>"+
                                "<td class='center'>"+result.viid+"</td>"+
                                "<td class='center'>"+result.viie+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
            
                    $(".repfoot").html(
                        "<tr>"+
                            "<td class='b'>Total</td>"+
                            "<td class='center b'>"+a+"</td>"+
                            "<td class='center b'>"+b+"</td>"+
                            "<td class='center b'>"+c+"</td>"+
                            "<td class='center b'>"+d+"</td>"+
                            "<td class='center b'>"+e+"</td>"+
                        "</tr>"
                    );
                })
            })
        })
    }

    var f44_regional_ssi_r1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.ib1 + result3.ib2;
                            var total2 = result3.ia + result3.ib;
                            var total3 = result3.id1a + result3.id1b + result3.id2;
                            var total4 = total2 - total3;
                            a += result3.ia;
                            b += result3.ib1;
                            c += result3.ib2;
                            d += total1;
                            e += total2;
                            f += result3.id1a;
                            g += result3.id1b;
                            h += result3.id2;
                            i += total3;
                            j += total4;

                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.ia+"</td>"+
                                        "<td class='center'>"+result3.ib1+"</td>"+
                                        "<td class='center'>"+result3.ib2+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                        "<td class='center'>"+result3.id1a+"</td>"+
                                        "<td class='center'>"+result3.id1b+"</td>"+
                                        "<td class='center'>"+result3.id2+"</td>"+
                                        "<td class='center'>"+total3+"</td>"+
                                        "<td class='center'>"+total4+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                    "<td class='center b'>"+h+"</td>"+
                                    "<td class='center b'>"+i+"</td>"+
                                    "<td class='center b'>"+j+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f44_regional_ssi_r2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.iia + result3.iib;
                            var total2 = result3.iid1 + result3.iid2;
                            var total3 = total1 - total2;
                            a += result3.iia;
                            b += result3.iib;
                            c += total1;
                            d += result3.iid1;
                            e += result3.iid2;
                            f += total2;
                            g += total3;
                            console.log(a)
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.iia+"</td>"+
                                        "<td class='center'>"+result3.iib+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.iid1+"</td>"+
                                        "<td class='center'>"+result3.iid2+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                        "<td class='center'>"+total3+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f44_regional_ssi_r3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.iiia + result3.iiib;
                            var total2 = total1 - result3.iiid;
                            a += result3.iiia;
                            b += result3.iiib;
                            c += total1;
                            d += result3.iiid;
                            e += total2;
                            console.log(a)
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.iiia+"</td>"+
                                        "<td class='center'>"+result3.iiib+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.iiid+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f44_regional_sss_r1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.iva + result3.ivb;
                            var total2 = result3.ivd2 + result3.ivd2 + result3.ivd3;
                            var total3 = result3.ive1a + result3.ive1b + result3.ive1c;
                            var total4 = total1 - total2;

                            a += result3.iva;
                            b += result3.ivb;
                            c += total1;
                            d += result3.ivd1;
                            e += result3.ivd2;
                            f += result3.ivd3;
                            g += total2;
                            h += result3.ive1a;
                            i += result3.ive1b;
                            j += result3.ive1c;
                            k += total3;
                            l += total4;
                            console.log(a)
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.iva+"</td>"+
                                        "<td class='center'>"+result3.ivb+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.ivd1+"</td>"+
                                        "<td class='center'>"+result3.ivd2+"</td>"+
                                        "<td class='center'>"+result3.ivd3+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                        "<td class='center'>"+result3.ive1a+"</td>"+
                                        "<td class='center'>"+result3.ive1b+"</td>"+
                                        "<td class='center'>"+result3.ive1c+"</td>"+
                                        "<td class='center'>"+total3+"</td>"+
                                        "<td class='center'>"+total4+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                    "<td class='center b'>"+h+"</td>"+
                                    "<td class='center b'>"+i+"</td>"+
                                    "<td class='center b'>"+j+"</td>"+
                                    "<td class='center b'>"+k+"</td>"+
                                    "<td class='center b'>"+l+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f44_regional_sss_r2_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.va1 + result3.va2 + result3.va3;
                            var total2 = result3.vb1 + result3.vb2 + result3.vb3;
                            var total3 = total1 + total2;

                            a += result3.va1;
                            b += result3.va2;
                            c += result3.va3;
                            d += total1;
                            e += result3.vb1;
                            f += result3.vb2;
                            g += result3.vb3;
                            h += total2;
                            i += total3;
                            console.log(a)
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.va1+"</td>"+
                                        "<td class='center'>"+result3.va2+"</td>"+
                                        "<td class='center'>"+result3.va3+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.vb1+"</td>"+
                                        "<td class='center'>"+result3.vb2+"</td>"+
                                        "<td class='center'>"+result3.vb3+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                        "<td class='center'>"+total3+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                    "<td class='center b'>"+h+"</td>"+
                                    "<td class='center b'>"+i+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f44_regional_sss_r2_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.va1 + result3.va2 + result3.va3;
                            var total2 = result3.vb1 + result3.vb2 + result3.vb3;
                            var total3 = total1 + total2;
                            var total4 = result3.vd1 + result3.vd2 + result3.vd3;
                            var total5 = total3 - total4;

                            a += total3;
                            b += result3.vd1;
                            c += result3.vd2;
                            d += result3.vd3;
                            e += total4;
                            f += total5;
                            console.log(a)
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+total3+"</td>"+
                                        "<td class='center'>"+result3.vd1+"</td>"+
                                        "<td class='center'>"+result3.vd2+"</td>"+
                                        "<td class='center'>"+result3.vd3+"</td>"+
                                        "<td class='center'>"+total4+"</td>"+
                                        "<td class='center'>"+total5+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f44_regional_sss_r3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F44Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)
                            var total1 = result3.via + result3.vib;
                            var total2 = total1 - result3.vid;

                            a += result3.via;
                            b += result3.vib;
                            c += total1;
                            d += result3.vid;
                            e += total2;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.via+"</td>"+
                                        "<td class='center'>"+result3.vib+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.vid+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f45_regional_csi_r1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.ib1 + result3.ib2;
                            var total2 = result3.id1a + result3.id1b + result3.id2;

                            a += result3.ia;
                            b += result3.ib1;
                            c += result3.ib2;
                            d += total1;
                            e += result3.ic;
                            f += result3.id1a;
                            g += result3.id1b;
                            h += result3.id2;
                            i += total2;
                            j += result3.ie;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.ia+"</td>"+
                                        "<td class='center'>"+result3.ib1+"</td>"+
                                        "<td class='center'>"+result3.ib2+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.ic+"</td>"+
                                        "<td class='center'>"+result3.id1a+"</td>"+
                                        "<td class='center'>"+result3.id1b+"</td>"+
                                        "<td class='center'>"+result3.id2+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                        "<td class='center'>"+result3.ie+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                    "<td class='center b'>"+h+"</td>"+
                                    "<td class='center b'>"+i+"</td>"+
                                    "<td class='center b'>"+j+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f45_regional_csi_r2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.iid1 + result3.iid2;

                            a += result3.iia;
                            b += result3.iib;
                            c += result3.iic;
                            d += result3.iid1;
                            e += result3.iid2;
                            f += total1;
                            g += result3.iie;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.iia+"</td>"+
                                        "<td class='center'>"+result3.iib+"</td>"+
                                        "<td class='center'>"+result3.iic+"</td>"+
                                        "<td class='center'>"+result3.iid1+"</td>"+
                                        "<td class='center'>"+result3.iid2+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.iie+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f45_regional_csi_r3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.iid1 + result3.iid2;

                            a += result3.iiia;
                            b += result3.iiib;
                            c += result3.iiic;
                            d += result3.iiid;
                            e += result3.iiie;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.iiia+"</td>"+
                                        "<td class='center'>"+result3.iiib+"</td>"+
                                        "<td class='center'>"+result3.iiic+"</td>"+
                                        "<td class='center'>"+result3.iiid+"</td>"+
                                        "<td class='center'>"+result3.iiie+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f45_regional_css_r1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.ivd1 + result3.ivd2 + result3.ivd3;
                            var total2 = result3.ive1a + result3.ive1b + result3.ive1c;

                            a += result3.iva;
                            b += result3.ivb;
                            c += result3.ivc;
                            d += result3.ivd1;
                            e += result3.ivd2;
                            f += result3.ivd3;
                            g += total1;
                            h += result3.ive1a;
                            i += result3.ive1b;
                            j += result3.ive1c;
                            k += total2;
                            l += result3.ivf;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.iva+"</td>"+
                                        "<td class='center'>"+result3.ivb+"</td>"+
                                        "<td class='center'>"+result3.ivc+"</td>"+
                                        "<td class='center'>"+result3.ivd1+"</td>"+
                                        "<td class='center'>"+result3.ivd2+"</td>"+
                                        "<td class='center'>"+result3.ivd3+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.ive1a+"</td>"+
                                        "<td class='center'>"+result3.ive1b+"</td>"+
                                        "<td class='center'>"+result3.ive1c+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                        "<td class='center'>"+result3.ivf+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                    "<td class='center b'>"+h+"</td>"+
                                    "<td class='center b'>"+i+"</td>"+
                                    "<td class='center b'>"+j+"</td>"+
                                    "<td class='center b'>"+k+"</td>"+
                                    "<td class='center b'>"+l+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f45_regional_css_r2_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.va1 + result3.va2 + result3.va3;
                            var total2 = result3.vb1 + result3.vb2 + result3.vb3;

                            a += result3.va1;
                            b += result3.va2;
                            c += result3.va3;
                            d += total1;
                            e += result3.vb1;
                            f += result3.vb2;
                            g += result3.vb3;
                            h += total2;
                            i += result3.vc;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.va1+"</td>"+
                                        "<td class='center'>"+result3.va2+"</td>"+
                                        "<td class='center'>"+result3.va3+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.vb1+"</td>"+
                                        "<td class='center'>"+result3.vb2+"</td>"+
                                        "<td class='center'>"+result3.vb3+"</td>"+
                                        "<td class='center'>"+total2+"</td>"+
                                        "<td class='center'>"+result3.vc+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                    "<td class='center b'>"+h+"</td>"+
                                    "<td class='center b'>"+i+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f45_regional_css_r2_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.vd1 + result3.vd2 + result3.vd3;
                            var total2 = result3.vb1 + result3.vb2 + result3.vb3;

                            a += result3.vc;
                            b += result3.vd1;
                            c += result3.vd2;
                            d += result3.vd3;
                            e += total1;
                            f += result3.ve;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.vc+"</td>"+
                                        "<td class='center'>"+result3.vd1+"</td>"+
                                        "<td class='center'>"+result3.vd2+"</td>"+
                                        "<td class='center'>"+result3.vd3+"</td>"+
                                        "<td class='center'>"+total1+"</td>"+
                                        "<td class='center'>"+result3.ve+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f45_regional_css_r3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F45Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.vd1 + result3.vd2 + result3.vd3;
                            var total2 = result3.vb1 + result3.vb2 + result3.vb3;

                            a += result3.via;
                            b += result3.vib;
                            c += result3.vic;
                            d += result3.vid;
                            e += result3.vie;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.via+"</td>"+
                                        "<td class='center'>"+result3.vib+"</td>"+
                                        "<td class='center'>"+result3.vic+"</td>"+
                                        "<td class='center'>"+result3.vid+"</td>"+
                                        "<td class='center'>"+result3.vie+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f50_regional_vc_r1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F50Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            var total1 = result3.vd1 + result3.vd2 + result3.vd3;
                            var total2 = result3.vb1 + result3.vb2 + result3.vb3;

                            a += result3.a;
                            b += result3.b;
                            c += result3.c;
                            d += result3.d;
                            e += result3.e;
                            f += result3.f;
                            g += result3.g;
                            h += result3.h;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.a+"</td>"+
                                        "<td class='center'>"+result3.b+"</td>"+
                                        "<td class='center'>"+result3.c+"</td>"+
                                        "<td class='center'>"+result3.d+"</td>"+
                                        "<td class='center'>"+result3.e+"</td>"+
                                        "<td class='center'>"+result3.f+"</td>"+
                                        "<td class='center'>"+result3.g+"</td>"+
                                        "<td class='center'>"+result3.h+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                    "<td class='center b'>"+h+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f51_regional_ror_r1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F51Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            // var total1 = result3.vd1 + result3.vd2 + result3.vd3;
                            // var total2 = result3.vb1 + result3.vb2 + result3.vb3;

                            a += result3.ia;
                            b += result3.ib;
                            c += result3.ic;
                            d += result3.id;
                            e += result3.ie;
                            f += result3.if;
                            g += result3.ii;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.ia+"</td>"+
                                        "<td class='center'>"+result3.ib+"</td>"+
                                        "<td class='center'>"+result3.ic+"</td>"+
                                        "<td class='center'>"+result3.id+"</td>"+
                                        "<td class='center'>"+result3.ie+"</td>"+
                                        "<td class='center'>"+result3.if+"</td>"+
                                        "<td class='center'>"+result3.ii+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f53_regional_r1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            let m = 0;
            let n = 0;
            let o = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F53Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            // var total1 = result3.vd1 + result3.vd2 + result3.vd3;
                            // var total2 = result3.vb1 + result3.vb2 + result3.vb3;

                            a += result3.ia;
                            b += result3.ib;
                            c += result3.iia;
                            d += result3.iib;
                            e += result3.iiia;
                            f += result3.iiib;
                            g += result3.iiic;
                            h += result3.iv;
                            i += result3.v;
                            j += result3.via;
                            k += result3.vib;
                            l += result3.vic;
                            m += result3.vid1;
                            n += result3.vid2;
                            o += result3.vie;
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.ia+"</td>"+
                                        "<td class='center'>"+result3.ib+"</td>"+
                                        "<td class='center'>"+result3.iia+"</td>"+
                                        "<td class='center'>"+result3.iib+"</td>"+
                                        "<td class='center'>"+result3.iiia+"</td>"+
                                        "<td class='center'>"+result3.iiib+"</td>"+
                                        "<td class='center'>"+result3.iiic+"</td>"+
                                        "<td class='center'>"+result3.iv+"</td>"+
                                        "<td class='center'>"+result3.v+"</td>"+
                                        "<td class='center'>"+result3.via+"</td>"+
                                        "<td class='center'>"+result3.vib+"</td>"+
                                        "<td class='center'>"+result3.vic+"</td>"+
                                        "<td class='center'>"+result3.vid1+"</td>"+
                                        "<td class='center'>"+result3.vid2+"</td>"+
                                        "<td class='center'>"+result3.vie+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                    "<td class='center b'>"+f+"</td>"+
                                    "<td class='center b'>"+g+"</td>"+
                                    "<td class='center b'>"+h+"</td>"+
                                    "<td class='center b'>"+i+"</td>"+
                                    "<td class='center b'>"+j+"</td>"+
                                    "<td class='center b'>"+k+"</td>"+
                                    "<td class='center b'>"+l+"</td>"+
                                    "<td class='center b'>"+m+"</td>"+
                                    "<td class='center b'>"+n+"</td>"+
                                    "<td class='center b'>"+o+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var f53_regional_r2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';

        let quarter;

        const quartersByYear = {
            "2022": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2023": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            "2024": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        };

        const [year, month] = eym.split("-");

        if (quartersByYear.hasOwnProperty(year)) {
            quarter = quartersByYear[year];

            if (month < "03") {
                quarter = quarter.slice(0, 3);
            }
            else if (month < "06") {
                quarter = quarter.slice(0, 6);
            }
            else if (month < "09") {
                quarter = quarter.slice(0, 9);
            }
        }

        $.wms.executeExternalGet('/ppa-cmis-api_origin/wsv1/Pis/fetchAllRegion2').done(function (result) {
            console.log("================")
            console.log(result)
            $("#divLoading").addClass("hidden");

            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            let e = 0;
            let f = 0;
            let g = 0;
            let h = 0;
            let i = 0;
            let j = 0;
            let k = 0;
            let l = 0;
            let m = 0;
            let n = 0;
            let o = 0;
            
            result.payload.forEach(function(data){
                // console.log(data.VALUE_)

                var payload2 = {
                    REGION  : data.ID,
                }
                $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/fetchFieldOfficeByRegion',JSON.stringify(payload2)).done(function (result2) {
                    console.log(result2)
                    if (result2.status === "SUCCESS") {

                        var list = [];
                        result2.payload.forEach(function(data){
                            list.push(data.ID)
                        })

                        var payload3 = {
                            officeIdList  : list,
                            yearMonthList : quarter
                        }
                        console.log(payload3)
                        $.wms.executeExternalPost('http://192.168.1.33:8000/F53Caseload',JSON.stringify(payload3)).done(function (result3) {
                            // console.log(result3)

                            // var total1 = result3.vd1 + result3.vd2 + result3.vd3;
                            // var total2 = result3.vb1 + result3.vb2 + result3.vb3;

                            a += result3.viia;
                            b += result3.viib;
                            c += result3.viic;
                            d += result3.viid;
                            e += result3.viie;
                            
                            data = "<tr>"+
                                        "<td class='b'>"+data.VALUE_+"</td>"+
                                        "<td class='center'>"+result3.viia+"</td>"+
                                        "<td class='center'>"+result3.viib+"</td>"+
                                        "<td class='center'>"+result3.viic+"</td>"+
                                        "<td class='center'>"+result3.viid+"</td>"+
                                        "<td class='center'>"+result3.viie+"</td>"+
                                    "</tr>";

                            $(".repbody").append(data);
                    
                            $(".repfoot").html(
                                "<tr>"+
                                    "<td class='b'>Total</td>"+
                                    "<td class='center b'>"+a+"</td>"+
                                    "<td class='center b'>"+b+"</td>"+
                                    "<td class='center b'>"+c+"</td>"+
                                    "<td class='center b'>"+d+"</td>"+
                                    "<td class='center b'>"+e+"</td>"+
                                "</tr>"
                            );
                        })

                    } else {

                    }
                })
            })
        })
    }
    var quarterly_f1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var carryOver = 0;
                var totalRcv2 = 0;
                var totalInvestigation = 0;
                var totalGrant = 0;
                var totalDenial = 0;
                var totalManifest = 0;
                var totalTransfer = 0;
                var totalActed = 0;
                var totalRecall = 0;
                var totalWarrant = 0;
                var totalNotActed = 0;
                var totalActiveInvestigationCaseload = 0;

                result.payload.forEach(function(data){
                    carryOver += data.carryOver;
                    totalRcv2 += data.totalRcv2;
                    totalInvestigation += data.totalInvestigation;
                    totalGrant += data.totalGrant;
                    totalDenial += data.totalDenial;
                    totalManifest += data.totalManifest;
                    totalTransfer += data.totalTransfer;
                    totalActed += data.totalActed;
                    totalRecall += data.totalRecall;
                    totalWarrant += data.totalWarrant;
                    totalNotActed += data.totalNotActed;
                    totalActiveInvestigationCaseload += data.totalActiveInvestigationCaseload;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.carryOver+"</td>"+
                                "<td class='center b'>"+data.totalRcv2+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                                "<td class='center b'>"+data.totalGrant+"</td>"+
                                "<td class='center b'>"+data.totalDenial+"</td>"+
                                "<td class='center b'>"+data.totalManifest+"</td>"+
                                "<td class='center b'>"+data.totalTransfer+"</td>"+
                                "<td class='center b'>"+data.totalActed+"</td>"+
                                "<td class='center b'>"+data.totalRecall+"</td>"+
                                "<td class='center b'>"+data.totalWarrant+"</td>"+
                                "<td class='center b'>"+data.totalNotActed+"</td>"+
                                "<td class='center b'>"+data.totalActiveInvestigationCaseload+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+carryOver+"</td>"+
                        "<td class='center b'>"+totalRcv2+"</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                        "<td class='center b'>"+totalGrant+"</td>"+
                        "<td class='center b'>"+totalDenial+"</td>"+
                        "<td class='center b'>"+totalManifest+"</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+totalActed+"</td>"+
                        "<td class='center b'>"+totalRecall+"</td>"+
                        "<td class='center b'>"+totalWarrant+"</td>"+
                        "<td class='center b'>"+totalNotActed+"</td>"+
                        "<td class='center b'>"+totalActiveInvestigationCaseload+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var quarterly_f2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalSubmitted = 0;
                var totalGrant = 0;
                var totalDenial = 0;
                var totalDismiss = 0;
                var totalWithdraw = 0;
                var totalReinv = 0;
                var totalOther = 0;
                var totalDisposed = 0;

                result.payload.forEach(function(data){
                    totalCarryOver += data.totalCarryOver;
                    totalSubmitted += data.totalSubmitted;
                    totalGrant += data.totalGrant;
                    totalDenial += data.totalDenial;
                    totalDismiss += data.totalDismiss;
                    totalWithdraw += data.totalWithdraw;
                    totalReinv += data.totalReinv;
                    totalOther += data.totalOther;
                    totalDisposed += data.totalDisposed;

                    const totalCasesforDisposition = data.totalCarryOver + data.totalSubmitted
                    const totalPendingDisposition = totalCasesforDisposition - data.totalDisposed
                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center'>"+data.totalCarryOver+"</td>"+
                                "<td class='center'>"+data.totalSubmitted+"</td>"+
                                "<td class='center'>"+totalCasesforDisposition+"</td>"+
                                "<td class='center'>"+data.totalGrant+"</td>"+
                                "<td class='center'>"+data.totalDenial+"</td>"+
                                "<td class='center'>"+data.totalDismiss+"</td>"+
                                "<td class='center'>"+data.totalWithdraw+"</td>"+
                                "<td class='center'>"+data.totalReinv+"</td>"+
                                "<td class='center'>"+data.totalOther+"</td>"+
                                "<td class='center'>"+data.totalDisposed+"</td>"+
                                "<td class='center'>"+totalPendingDisposition+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })

                    const totalCasesforDispositionTotal = totalCarryOver + totalSubmitted
                    const totalPendingDispositionTotal = totalCasesforDispositionTotal - totalDisposed

                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center'>"+totalCarryOver+"</td>"+
                        "<td class='center'>"+totalSubmitted+"</td>"+
                        "<td class='center'>"+totalCasesforDispositionTotal+"</td>"+
                        "<td class='center'>"+totalGrant+"</td>"+
                        "<td class='center'>"+totalDenial+"</td>"+
                        "<td class='center'>"+totalDismiss+"</td>"+
                        "<td class='center'>"+totalWithdraw+"</td>"+
                        "<td class='center'>"+totalReinv+"</td>"+
                        "<td class='center'>"+totalOther+"</td>"+
                        "<td class='center'>"+totalDisposed+"</td>"+
                        "<td class='center'>"+totalPendingDispositionTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var quarterly_f3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalRcv2 = 0;
                var totalInvestigation = 0;
                var totalTerm = 0;
                var totalRevoc = 0;
                var totalTransfer = 0;
                var totalOthers = 0;
                var totalDropped = 0;

                result.payload.forEach(function(data){
                    totalCarryOver += data.totalCarryOver;
                    totalRcv2 += data.totalRcv2;
                    totalInvestigation += data.totalInvestigation;
                    totalTerm += data.totalTerm;
                    totalRevoc += data.totalRevoc;
                    totalTransfer += data.totalTransfer;
                    totalOthers += data.totalOthers;
                    totalDropped += data.totalDropped;

                    const totalSuperActive = data.totalInvestigation - data.totalDropped
                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.totalCarryOver+"</td>"+
                                "<td class='center b'>"+data.totalRcv2+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                                "<td class='center b'>"+data.totalTerm+"</td>"+
                                "<td class='center b'>"+data.totalRevoc+"</td>"+
                                "<td class='center b'>"+data.totalTransfer+"</td>"+
                                "<td class='center b'>"+data.totalOthers+"</td>"+
                                "<td class='center b'>"+data.totalDropped+"</td>"+
                                "<td class='center b'>"+totalSuperActive+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                const totalSuperActiveTotal = totalInvestigation - totalDropped
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalCarryOver+"</td>"+
                        "<td class='center b'>"+totalRcv2+"</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                        "<td class='center b'>"+totalTerm+"</td>"+
                        "<td class='center b'>"+totalRevoc+"</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+totalOthers+"</td>"+
                        "<td class='center b'>"+totalDropped+"</td>"+
                        "<td class='center b'>"+totalSuperActiveTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var quarterly_f4 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f4",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalRcv = 0;
                var totalCasesHandled = 0;
                var totalParole = 0;
                var totalcommutation = 0;
                var absoluteTotalGrant = 0;
                var totalTransfer = 0;
                var totalInvRef = 0;
                var totalActiveInv = 0;

                result.payload.forEach(function(data){
                    totalCarryOver += data.totalCarryOver;
                    totalRcv += data.totalRcv;
                    totalCasesHandled += data.totalCasesHandled;
                    totalParole += data.totalParole;
                    totalcommutation += data.totalcommutation;
                    absoluteTotalGrant += data.absoluteTotalGrant;
                    totalTransfer += data.totalTransfer;
                    totalInvRef += data.totalInvRef;
                    totalActiveInv += data.totalActiveInv
                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.totalCarryOver+"</td>"+
                                "<td class='center b'>"+data.totalRcv+"</td>"+
                                "<td class='center b'>"+data.totalCasesHandled+"</td>"+
                                "<td class='center b'>"+data.totalParole+"</td>"+
                                "<td class='center b'>"+data.totalcommutation+"</td>"+
                                "<td class='center b'>"+0+"</td>"+
                                "<td class='center b'>"+data.absoluteTotalGrant+"</td>"+
                                "<td class='center b'>"+data.totalTransfer+"</td>"+
                                "<td class='center b'>"+0+"</td>"+
                                "<td class='center b'>"+data.totalInvRef+"</td>"+
                                "<td class='center b'>"+data.totalActiveInv+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalCarryOver+"</td>"+
                        "<td class='center b'>"+totalRcv+"</td>"+
                        "<td class='center b'>"+totalCasesHandled+"</td>"+
                        "<td class='center b'>"+totalParole+"</td>"+
                        "<td class='center b'>"+totalcommutation+"</td>"+
                        "<td class='center b'>"+0+"</td>"+
                        "<td class='center b'>"+absoluteTotalGrant+"</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+0+"</td>"+
                        "<td class='center b'>"+totalInvRef+"</td>"+
                        "<td class='center b'>"+totalActiveInv+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var quarterly_f5 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f5",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverSupvParolIV = 0;
                var totalCarryOverSupvPardonIV = 0;
                var totalCarryOverSupvIV = 0;
                var totalRefRcvSupvParol = 0;
                var totalRefRcvSupvPardon = 0;
                var totalRefRcvSupv = 0;
                var totalSupervCasesHandledPR = 0;
                var totalSupervCasesHandledPD = 0;
                var totalSupervCasesHandled = 0;

                result.payload.forEach(function(data){
                    totalCarryOverSupvParolIV += data.totalCarryOverSupvParolIV;
                    totalCarryOverSupvPardonIV += data.totalCarryOverSupvPardonIV;
                    totalCarryOverSupvIV += data.totalCarryOverSupvIV;
                    totalRefRcvSupvParol += data.totalRefRcvSupvParol;
                    totalRefRcvSupvPardon += data.totalRefRcvSupvPardon;
                    totalRefRcvSupv += data.totalRefRcvSupv;
                    totalSupervCasesHandledPR += data.totalSupervCasesHandledPR;
                    totalSupervCasesHandledPD += data.totalSupervCasesHandledPD;
                    totalSupervCasesHandled += data.totalSupervCasesHandled

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.totalCarryOverSupvParolIV+"</td>"+
                                "<td class='center b'>"+data.totalCarryOverSupvPardonIV+"</td>"+
                                "<td class='center b'>"+data.totalCarryOverSupvIV+"</td>"+
                                "<td class='center b'>"+data.totalRefRcvSupvParol+"</td>"+
                                "<td class='center b'>"+data.totalRefRcvSupvPardon+"</td>"+
                                "<td class='center b'>"+data.totalRefRcvSupv+"</td>"+
                                "<td class='center b'>"+data.totalSupervCasesHandledPR+"</td>"+
                                "<td class='center b'>"+data.totalSupervCasesHandledPD+"</td>"+
                                "<td class='center b'>"+data.totalSupervCasesHandled+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalCarryOverSupvParolIV+"</td>"+
                        "<td class='center b'>"+totalCarryOverSupvPardonIV+"</td>"+
                        "<td class='center b'>"+totalCarryOverSupvIV+"</td>"+
                        "<td class='center b'>"+totalRefRcvSupvParol+"</td>"+
                        "<td class='center b'>"+totalRefRcvSupvPardon+"</td>"+
                        "<td class='center b'>"+totalRefRcvSupv+"</td>"+
                        "<td class='center b'>"+totalSupervCasesHandledPR+"</td>"+
                        "<td class='center b'>"+totalSupervCasesHandledPD+"</td>"+
                        "<td class='center b'>"+totalSupervCasesHandled+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var quarterly_f6 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f6",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
            $("#divLoading").addClass("hidden");

            var totalCasesResolvedFinalParol = 0;
            var totalCasesResolvedFinalPardon = 0;
            var totalCasesResolvedFinal = 0;
            var totalCasesResolvedArrestParol = 0;
            var totalCasesResolvedArrestPardon = 0;
            var totalCasesResolvedArrest = 0;
            var totalCasesResolvedDeathParol = 0;
            var totalCasesResolvedDeathPardon = 0;
            var totalCasesResolvedDeath = 0;
            var totalCasesResolvedRegionalParol = 0;
            var totalCasesResolvedRegionalPardon = 0;
            var totalCasesResolvedRegional = 0;
            var totalCasesResolvedOtherParol = 0;
            var totalCasesResolvedOtherPardon = 0;
            var totalCasesResolvedPSOther = 0;
            var totalCasesDropPR = 0;
            var totalCasesDropPD = 0;
            var totalCasesDrop = 0;
            var totalActiveSuperVisionPR = 0;
            var totalActiveSuperVisionPD = 0;
            var totalActiveSuperVision = 0;

                result.payload.forEach(function(data){
                    totalCasesResolvedFinalParol += data.totalCasesResolvedFinalParol;
                    totalCasesResolvedFinalPardon += data.totalCasesResolvedFinalPardon;
                    totalCasesResolvedFinal += data.totalCasesResolvedFinal;
                    totalCasesResolvedArrestParol += data.totalCasesResolvedArrestParol;
                    totalCasesResolvedArrestPardon += data.totalCasesResolvedArrestPardon;
                    totalCasesResolvedArrest += data.totalCasesResolvedArrest;
                    totalCasesResolvedDeathParol += data.totalCasesResolvedDeathParol;
                    totalCasesResolvedDeathPardon += data.totalCasesResolvedDeathPardon;
                    totalCasesResolvedDeath += data.totalCasesResolvedDeath;
                    totalCasesResolvedRegionalParol += data.totalCasesResolvedRegionalParol;
                    totalCasesResolvedRegionalPardon += data.totalCasesResolvedRegionalPardon
                    totalCasesResolvedRegional += data.totalCasesResolvedRegional;
                    totalCasesResolvedOtherParol += data.totalCasesResolvedOtherParol;
                    totalCasesResolvedOtherPardon += data.totalCasesResolvedOtherPardon;
                    totalCasesResolvedPSOther += data.totalCasesResolvedPSOther;
                    totalCasesDropPR += data.totalCasesDropPR;
                    totalCasesDropPD += data.totalCasesDropPD;
                    totalCasesDrop += data.totalCasesDrop
                    totalActiveSuperVisionPR += data.totalActiveSuperVisionPR;
                    totalActiveSuperVisionPD += data.totalActiveSuperVisionPD;
                    totalActiveSuperVision += data.totalActiveSuperVision
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinal+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrest+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeath+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegional+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedPSOther+"</td>"+
                                "<td class='b center'>"+data.totalCasesDropPR+"</td>"+
                                "<td class='b center'>"+data.totalCasesDropPD+"</td>"+
                                "<td class='b center'>"+data.totalCasesDrop+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVisionPR+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVisionPD+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVision+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinal+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrest+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeath+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegional+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedPSOther+"</td>"+
                        "<td class='b center'>"+totalCasesDropPR+"</td>"+
                        "<td class='b center'>"+totalCasesDropPD+"</td>"+
                        "<td class='b center'>"+totalCasesDrop+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVisionPR+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVisionPD+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVision+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var quarterly_f7 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f7",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalHandled = 0;
                var totalN = 0;

                result.payload.forEach(function(data){
                    totalHandled += data.totalHandled;
                    totalN += data.totalN;

                    var disRate = 0;
                    if (data.totalHandled != "0") {
                       disRate = (data.totalHandled / data.totalN) * 100;
                    }else {
                         disRate = "0";
                    }
                    const total = Math.round(disRate) + "%";

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalHandled+"</td>"+
                                "<td class='b center'>"+data.totalN+"</td>"+
                                "<td class='b center'>"+total+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalN+"</td>"+
                                "<td class='b center'>"+total+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })

                var disRatetotal = 0;
                if (totalHandled != "0") {
                    disRatetotal = (totalHandled / totalN) * 100;
                }else {
                    disRatetotal = "0";
                }
                const totalTotal = Math.round(disRatetotal) + "%";

                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalHandled+"</td>"+
                        "<td class='b center'>"+totalN+"</td>"+
                        "<td class='b center'>"+totalTotal+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalN+"</td>"+
                        "<td class='b center'>"+totalTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var quarterly_f8 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f8",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
            $("#divLoading").addClass("hidden");

                var totalCasesHandled = 0;
                var totalPPIR = 0;
                var totalInvRef = 0;

                result.payload.forEach(function(data){
                    totalCasesHandled += data.totalCasesHandled;
                    totalPPIR += data.totalPPIR;
                    totalInvRef += data.totalInvRef;

                    var disRate = 0;
                    if (data.totalInvRef != "0") {
                       disRate = (data.totalInvRef / data.totalCasesHandled) * 100;
                    }else {
                         disRate = "0";
                    }
                    const total = Math.round(disRate) + "%";

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCasesHandled+"</td>"+
                                "<td class='b center'>"+data.totalPPIR+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalInvRef+"</td>"+
                                "<td class='b center'>"+total+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                var disRatetotal = 0;
                if (totalInvRef != "0") {
                    disRatetotal = (totalInvRef / totalCasesHandled) * 100;
                }else {
                    disRatetotal = "0";
                }
                const totalTotal = Math.round(disRatetotal) + "%";

                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCasesHandled+"</td>"+
                        "<td class='b center'>"+totalPPIR+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalInvRef+"</td>"+
                        "<td class='b center'>"+totalTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var quarterly_f9 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "quarterly_f9",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
            $("#divLoading").addClass("hidden");

                var carryOver = 0;
                var totalRcv = 0;
                var totalInvestigation = 0;
                var totalCmpltd = 0;
                var totalActive = 0;

                result.payload.forEach(function(data){
                    carryOver += data.carryOver;
                    totalRcv += data.totalRcv;
                    totalInvestigation += data.totalInvestigation;
                    totalCmpltd += data.totalCmpltd;
                    totalActive += data.totalActive;

                    var completionRate = 0;
                    if (data.totalCmpltd != "0") {
                        completionRate = (data.totalCmpltd / data.totalInvestigation) * 100 
                    }else {
                        completionRate = "0";
                    }
                    const total = Math.round(completionRate) + "%";

                    // const completionRate = (data.totalCmpltd / data.totalInvestigation) * 100 
                    // const total = Math.round(completionRate) + "%"

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='b'>"+data.carryOver+"</td>"+
                                "<td class='b'>"+data.totalRcv+"</td>"+
                                "<td class='b'>"+data.totalInvestigation+"</td>"+
                                "<td class='b'>"+data.totalCmpltd+"</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>"+data.totalCmpltd+"</td>"+
                                "<td class='b'>"+data.totalActive+"</td>"+
                                "<td class='b'>"+total+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                var completionRateTotal = 0;
                if (totalCmpltd != "0") {
                    completionRateTotal = (totalCmpltd / totalInvestigation) * 100 
                }else {
                    completionRateTotal = "0";
                }
                const totalTotal = Math.round(completionRateTotal) + "%";

                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b'>"+carryOver+"</td>"+
                        "<td class='b'>"+totalRcv+"</td>"+
                        "<td class='b'>"+totalInvestigation+"</td>"+
                        "<td class='b'>"+totalCmpltd+"</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>"+totalCmpltd+"</td>"+
                        "<td class='b'>"+totalActive+"</td>"+
                        "<td class='b'>"+totalTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var quarterly_f10 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "quarterly_f10",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
                if(result.status != undefined && result.status == "SUCCESS"){
            $("#divLoading").addClass("hidden");

                var totalCarryOverCI = 0;
                var totalRcvCI = 0;
                var totalCountCI = 0;
                var totalCmpltdCI = 0;
                var totalCountActiveCI = 0;

                result.payload.forEach(function(data){
                    totalCarryOverCI += data.totalCarryOverCI;
                    totalRcvCI += data.totalRcvCI;
                    totalCountCI += data.totalCountCI;
                    totalCmpltdCI += data.totalCmpltdCI;
                    totalCountActiveCI += data.totalCountActiveCI;

                    var comRate = 0;
                    if (data.totalCountCI != "0") {
                        comRate = (data.totalCountCI / data.totalCmpltdCI) * 100;
                    }else {
                        comRate = "0";
                    }
                    const total = Math.round(comRate) + "%";

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverCI+"</td>"+
                                "<td class='b center'>"+data.totalRcvCI+"</td>"+
                                "<td class='b center'>"+data.totalCountCI+"</td>"+
                                "<td class='b center'>"+data.totalCmpltdCI+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalCmpltdCI+"</td>"+
                                "<td class='b center'>"+data.totalCountActiveCI+"</td>"+
                                "<td class='b center'>"+total+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                var comRateTotal = 0;
                if (totalCountCI != "0") {
                    comRateTotal = (totalCountCI / totalCmpltdCI) * 100;
                }else {
                    comRateTotal = "0";
                }
                const totalTotal = Math.round(comRateTotal) + "%";
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverCI+"</td>"+
                        "<td class='b center'>"+totalRcvCI+"</td>"+
                        "<td class='b center'>"+totalCountCI+"</td>"+
                        "<td class='b center'>"+totalCmpltdCI+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalCmpltdCI+"</td>"+
                        "<td class='b center'>"+totalCountActiveCI+"</td>"+
                        "<td class='b center'>"+totalTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var quarterly_f11 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f11",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
            $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalRcv = 0;
                var totalCasesHandled = 0;
                var totalCompltd = 0;
                var totalCourtesy = 0;

                result.payload.forEach(function(data){
                    totalCarryOver += data.totalCarryOver;
                    totalRcv += data.totalRcv;
                    totalCasesHandled += data.totalCasesHandled;
                    totalCompltd += data.totalCompltd;
                    totalCourtesy += data.totalCourtesy;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOver+"</td>"+
                                "<td class='b center'>"+data.totalRcv+"</td>"+
                                "<td class='b center'>"+data.totalCasesHandled+"</td>"+
                                "<td class='b center'>"+data.totalCompltd+"</td>"+
                                "<td class='b center'>"+data.totalCourtesy+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOver+"</td>"+
                        "<td class='b center'>"+totalRcv+"</td>"+
                        "<td class='b center'>"+totalCasesHandled+"</td>"+
                        "<td class='b center'>"+totalCompltd+"</td>"+
                        "<td class='b center'>"+totalCourtesy+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var quarterly_f12 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "quarterly_f12",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
            $("#divLoading").addClass("hidden");

                var totalCarryOverSupvParol = 0;
                var totalCarryOverSupvPardon = 0;
                var totalCarryOverSupv = 0;
                var totalRcvSupvParol = 0;
                var totalRcvSupvPardon = 0;
                var totalRcvSupv = 0;
                var totalCourtesySupvParol = 0;
                var totalCourtesySupvPardon = 0;
                var totalCourtesySupvTotal = 0;
                var totalTermSupvParol = 0;
                var totalTermSupvPardon = 0;
                var totalTermSupv = 0;
                var totalActCourtesySupvParol = 0;
                var totalActCourtesySupvPardon = 0;
                var totalActCourtesySupv = 0;

                result.payload.forEach(function(data){
                    totalCarryOverSupvParol += data.totalCarryOverSupvParol;
                    totalCarryOverSupvPardon += data.totalCarryOverSupvPardon;
                    totalCarryOverSupv += data.totalCarryOverSupv;
                    totalRcvSupvParol += data.totalRcvSupvParol;
                    totalRcvSupvPardon += data.totalRcvSupvPardon;
                    totalRcvSupv += data.totalRcvSupv;
                    totalCourtesySupvParol += data.totalCourtesySupvParol;
                    totalCourtesySupvPardon += data.totalCourtesySupvPardon;
                    totalCourtesySupvTotal += data.totalCourtesySupvTotal;
                    totalTermSupvParol += data.totalTermSupvParol;
                    totalTermSupvPardon += data.totalTermSupvPardon;
                    totalTermSupv += data.totalTermSupv;
                    totalActCourtesySupvParol += data.totalActCourtesySupvParol;
                    totalActCourtesySupvPardon += data.totalActCourtesySupvPardon;
                    totalActCourtesySupv += data.totalActCourtesySupv;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupv+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupv+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvParol+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvTotal+"</td>"+
                                "<td class='b center'>"+data.totalTermSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalTermSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalTermSupv+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupvParol+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupv+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverSupvParol+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupvPardon+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupv+"</td>"+
                        "<td class='b center'>"+totalRcvSupvParol+"</td>"+
                        "<td class='b center'>"+totalRcvSupvPardon+"</td>"+
                        "<td class='b center'>"+totalRcvSupv+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvParol+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvPardon+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvTotal+"</td>"+
                        "<td class='b center'>"+totalTermSupvParol+"</td>"+
                        "<td class='b center'>"+totalTermSupvPardon+"</td>"+
                        "<td class='b center'>"+totalTermSupv+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupvParol+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupvPardon+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupv+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    // end
    var f5_regional_pi_r1_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_pi_r1_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var carryOver = 0;
                var totalRcv = 0;
                var totalRcv2 = 0;
                var totalInvestigation = 0;

                result.payload.forEach(function(data){

                    carryOver += data.carryOver;
                    totalRcv += data.totalRcv;
                    totalRcv2 += data.totalRcv2;
                    totalInvestigation += data.totalInvestigation;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.carryOver+"</td>"+
                                "<td class='center b'>"+data.totalRcv+"</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>"+data.totalRcv2+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+carryOver+"</td>"+
                        "<td class='center b'>"+totalRcv+"</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>"+totalRcv2+"</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                    "</tr>"
                );
            }
        });
    }


    var f5_regional_pi_r1_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_pi_r1_p2",
            // Y_M : "2019-01",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalGrant = 0;
                var totalDenial = 0;
                var totalManifest = 0;
                var totalTransfer = 0;
                var totalActed = 0;
                var totalRecall = 0;
                var totalWarrant = 0;
                var totalNotActed = 0;
                var totalActive = 0;

                result.payload.forEach(function(data){

                    totalGrant += data.totalGrant;
                    totalDenial += data.totalDenial;
                    totalManifest += data.totalManifest;
                    totalTransfer += data.totalTransfer;
                    totalActed += data.totalActed;
                    totalRecall += data.totalRecall;
                    totalWarrant += data.totalWarrant;
                    totalNotActed += data.totalNotActed;
                    totalActive += data.totalActive;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center'>"+data.totalGrant+"</td>"+
                                "<td class='center'>0</td>"+
                                "<td class='center'>0</td>"+
                                "<td class='center'>"+data.totalDenial+"</td>"+
                                "<td class='center'>0</td>"+
                                "<td class='center'>0</td>"+
                                "<td class='center'>"+data.totalManifest+"</td>"+
                                "<td class='center'>0</td>"+
                                "<td class='center'>0</td>"+
                                "<td class='center'>"+data.totalTransfer+"</td>"+
                                "<td class='center'>"+data.totalActed+"</td>"+
                                "<td class='center'>"+data.totalRecall+"</td>"+
                                "<td class='center'>"+data.totalWarrant+"</td>"+
                                "<td class='center'>"+data.totalNotActed+"</td>"+
                                "<td class='center'>"+data.totalActive+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center'>"+totalGrant+"</td>"+
                        "<td class='center'>0</td>"+
                        "<td class='center'>0</td>"+
                        "<td class='center'>"+totalDenial+"</td>"+
                        "<td class='center'>0</td>"+
                        "<td class='center'>0</td>"+
                        "<td class='center'>"+totalManifest+"</td>"+
                        "<td class='center'>0</td>"+
                        "<td class='center'>0</td>"+
                        "<td class='center'>"+totalTransfer+"</td>"+
                        "<td class='center'>"+totalActed+"</td>"+
                        "<td class='center'>"+totalRecall+"</td>"+
                        "<td class='center'>"+totalWarrant+"</td>"+
                        "<td class='center'>"+totalNotActed+"</td>"+
                        "<td class='center'>"+totalActive+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_regional_pi_r2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_pi_r2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalPSIR = 0;
                var totalManifest = 0;
                var totalSubmitted = 0;
                var totalbeActed = 0;
                var totalGrant = 0;
                var totalDenial = 0;
                var totalDismiss = 0;
                var totalWithdraw = 0;
                var totalReinv = 0;
                var totalOther = 0;
                var totalDisposed = 0;
                var totalWarrant = 0;
                var totalRecall = 0;
                var totalNotActed = 0;
                var totalPending = 0;

                result.payload.forEach(function(data){

                    totalCarryOver += data.totalCarryOver;
                    totalPSIR += data.totalPSIR;
                    totalManifest += data.totalManifest;
                    totalSubmitted += data.totalSubmitted;
                    totalbeActed += data.totalbeActed;
                    totalGrant += data.totalGrant;
                    totalDenial += data.totalDenial;
                    totalDismiss += data.totalDismiss;
                    totalWithdraw += data.totalWithdraw;
                    totalReinv += data.totalReinv;
                    totalOther += data.totalOther;
                    totalDisposed += data.totalDisposed;
                    totalWarrant += data.totalWarrant;
                    totalRecall += data.totalRecall;
                    totalNotActed += data.totalNotActed;
                    totalPending += data.totalPending;
                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center'>"+data.totalCarryOver+"</td>"+
                                "<td class='center'>"+data.totalPSIR+"</td>"+
                                "<td class='center'>"+data.totalManifest+"</td>"+
                                "<td class='center'>"+data.totalSubmitted+"</td>"+
                                "<td class='center'>"+data.totalbeActed+"</td>"+
                                "<td class='center'>"+data.totalGrant+"</td>"+
                                "<td class='center'>"+data.totalDenial+"</td>"+
                                "<td class='center'>"+data.totalDismiss+"</td>"+
                                "<td class='center'>"+data.totalWithdraw+"</td>"+
                                "<td class='center'>"+data.totalReinv+"</td>"+
                                "<td class='center'>"+data.totalOther+"</td>"+
                                "<td class='center'>"+data.totalDisposed+"</td>"+
                                "<td class='center'>"+data.totalWarrant+"</td>"+
                                "<td class='center'>"+data.totalRecall+"</td>"+
                                "<td class='center'>"+data.totalNotActed+"</td>"+
                                "<td class='center'>"+data.totalPending+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center'>"+totalCarryOver+"</td>"+
                        "<td class='center'>"+totalPSIR+"</td>"+
                        "<td class='center'>"+totalManifest+"</td>"+
                        "<td class='center'>"+totalSubmitted+"</td>"+
                        "<td class='center'>"+totalbeActed+"</td>"+
                        "<td class='center'>"+totalGrant+"</td>"+
                        "<td class='center'>"+totalDenial+"</td>"+
                        "<td class='center'>"+totalDismiss+"</td>"+
                        "<td class='center'>"+totalWithdraw+"</td>"+
                        "<td class='center'>"+totalReinv+"</td>"+
                        "<td class='center'>"+totalOther+"</td>"+
                        "<td class='center'>"+totalDisposed+"</td>"+
                        "<td class='center'>"+totalWarrant+"</td>"+
                        "<td class='center'>"+totalRecall+"</td>"+
                        "<td class='center'>"+totalNotActed+"</td>"+
                        "<td class='center'>"+totalPending+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_regional_pi_r3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_pi_r3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var carryOver = 0;
                var totalRcv = 0;
                var totalInvestigation = 0;
                var totalCmpltd = 0;
                var totalActive = 0;

                result.payload.forEach(function(data){

                    carryOver += data.carryOver;
                    totalRcv += data.totalRcv;
                    totalInvestigation += data.totalInvestigation;
                    totalCmpltd += data.totalCmpltd;
                    totalActive += data.totalActive;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='b'>"+data.carryOver+"</td>"+
                                "<td class='b'>"+data.totalRcv+"</td>"+
                                "<td class='b'>"+data.totalInvestigation+"</td>"+
                                "<td class='b'>"+data.totalCmpltd+"</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>0</td>"+
                                "<td class='b'>"+data.totalCmpltd+"</td>"+
                                "<td class='b'>"+data.totalActive+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b'>"+carryOver+"</td>"+
                        "<td class='b'>"+totalRcv+"</td>"+
                        "<td class='b'>"+totalInvestigation+"</td>"+
                        "<td class='b'>"+totalCmpltd+"</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>0</td>"+
                        "<td class='b'>"+totalCmpltd+"</td>"+
                        "<td class='b'>"+totalActive+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_regional_pi_r4 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_pi_r4",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var carryOverInvestigationTotal = 0;
                var rcvInvestigationTotal = 0;
                var totalHandled = 0;
                var actedInvestigationTotalGrant = 0;
                var actedInvestigationTotalDenial = 0;
                var actedInvestigationTotalManifest = 0;
                var actedInvestigationTotalTransfer = 0;
                var totalInvRefref = 0;
                var notactedTotalInvestigationRecalled = 0;
                var notactedTotalInvestigationWarrant = 0;
                var totalRef = 0;

                result.payload.forEach(function(data){

                    carryOverInvestigationTotal += data.carryOverInvestigationTotal;
                    rcvInvestigationTotal += data.rcvInvestigationTotal;
                    totalHandled += data.totalHandled;
                    actedInvestigationTotalGrant += data.actedInvestigationTotalGrant;
                    actedInvestigationTotalDenial += data.actedInvestigationTotalDenial;
                    actedInvestigationTotalManifest += data.actedInvestigationTotalManifest;
                    actedInvestigationTotalTransfer += data.actedInvestigationTotalTransfer;
                    totalInvRefref += data.totalInvRefref;
                    notactedTotalInvestigationRecalled += data.notactedTotalInvestigationRecalled;
                    notactedTotalInvestigationWarrant += data.notactedTotalInvestigationWarrant;
                    totalRef += data.totalRef;

                    var disRate = 0;
                    if (data.totalInvRefref != "0") {
                       disRate = (data.totalInvRefref / data.totalHandled) * 100;
                    }else {
                         disRate = "0";
                    }
                    const total = Math.round(disRate) + "%";
                    
                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='b'>"+data.carryOverInvestigationTotal+"</td>"+
                                "<td class='b'>"+data.rcvInvestigationTotal+"</td>"+
                                "<td class='b'>"+data.totalHandled+"</td>"+
                                "<td class='b'>"+data.actedInvestigationTotalGrant+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+data.actedInvestigationTotalDenial+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+data.actedInvestigationTotalManifest+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+data.actedInvestigationTotalTransfer+"</td>"+
                                "<td class='b'>"+data.totalInvRefref+"</td>"+
                                "<td class='b'>"+data.notactedTotalInvestigationRecalled+"</td>"+
                                "<td class='b'>"+data.notactedTotalInvestigationWarrant+"</td>"+
                                "<td class='b'>"+data.totalRef+"</td>"+
                                "<td class='b'>"+total+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                    var disRateTotal = 0;
                    if (totalInvRefref != "0") {
                        disRateTotal = (totalInvRefref / totalHandled) * 100;
                    }else {
                        disRateTotal = "0";
                    }
                    const totaltotal = Math.round(disRateTotal) + "%";
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b'>"+carryOverInvestigationTotal+"</td>"+
                        "<td class='b'>"+rcvInvestigationTotal+"</td>"+
                        "<td class='b'>"+totalHandled+"</td>"+
                        "<td class='b'>"+actedInvestigationTotalGrant+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+actedInvestigationTotalDenial+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+actedInvestigationTotalManifest+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+actedInvestigationTotalTransfer+"</td>"+
                        "<td class='b'>"+totalInvRefref+"</td>"+
                        "<td class='b'>"+notactedTotalInvestigationRecalled+"</td>"+
                        "<td class='b'>"+notactedTotalInvestigationWarrant+"</td>"+
                        "<td class='b'>"+totalRef+"</td>"+
                        "<td class='b'>"+totaltotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f5_regional_ps_r1_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_ps_r1_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var carryOver = 0;
                var totalRcv = 0;
                var totalRcv2 = 0;
                var totalInvestigation = 0;

                result.payload.forEach(function(data){

                    carryOver += data.carryOver;
                    totalRcv += data.totalRcv;
                    totalRcv2 += data.totalRcv2;
                    totalInvestigation += data.totalInvestigation;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.carryOver+"</td>"+
                                "<td class='center b'>"+data.totalRcv+"</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>"+data.totalRcv2+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+carryOver+"</td>"+
                        "<td class='center b'>"+totalRcv+"</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>"+totalRcv2+"</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_regional_ps_r1_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_ps_r1_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalInvestigation = 0;
                var totalFullTerm = 0;
                var totalEarlyTerm = 0;
                var totalDiedTerm = 0;
                var totalTerm = 0;
                var totalAbs = 0;
                var totalComm = 0;
                var totalVio = 0;
                var totalOther = 0;
                var totalRevoc = 0;
                var totalTransfer = 0;
                var totalOthers = 0;
                var totalDropped = 0;
                var totalActive = 0;

                result.payload.forEach(function(data){

                    totalInvestigation += data.totalInvestigation;
                    totalFullTerm += data.totalFullTerm;
                    totalEarlyTerm += data.totalEarlyTerm;
                    totalDiedTerm += data.totalDiedTerm;
                    totalTerm += data.totalTerm;
                    totalAbs += data.totalAbs;
                    totalComm += data.totalComm;
                    totalVio += data.totalVio;
                    totalOther += data.totalOther;
                    totalRevoc += data.totalRevoc;
                    totalTransfer += data.totalTransfer;
                    totalOthers += data.totalOthers;
                    totalDropped += data.totalDropped;
                    totalActive += data.totalActive;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                                "<td class='center b'>"+data.totalFullTerm+"</td>"+
                                "<td class='center b'>"+data.totalEarlyTerm+"</td>"+
                                "<td class='center b'>"+data.totalDiedTerm+"</td>"+
                                "<td class='center b'>"+data.totalTerm+"</td>"+
                                "<td class='center b'>"+data.totalAbs+"</td>"+
                                "<td class='center b'>"+data.totalComm+"</td>"+
                                "<td class='center b'>"+data.totalVio+"</td>"+
                                "<td class='center b'>"+data.totalOther+"</td>"+
                                "<td class='center b'>"+data.totalRevoc+"</td>"+
                                "<td class='center b'>"+data.totalTransfer+"</td>"+
                                "<td class='center b'>"+data.totalOthers+"</td>"+
                                "<td class='center b'>"+data.totalDropped+"</td>"+
                                "<td class='center b'>"+data.totalActive+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                        "<td class='center b'>"+totalFullTerm+"</td>"+
                        "<td class='center b'>"+totalEarlyTerm+"</td>"+
                        "<td class='center b'>"+totalDiedTerm+"</td>"+
                        "<td class='center b'>"+totalTerm+"</td>"+
                        "<td class='center b'>"+totalAbs+"</td>"+
                        "<td class='center b'>"+totalComm+"</td>"+
                        "<td class='center b'>"+totalVio+"</td>"+
                        "<td class='center b'>"+totalOther+"</td>"+
                        "<td class='center b'>"+totalRevoc+"</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+totalOthers+"</td>"+
                        "<td class='center b'>"+totalDropped+"</td>"+
                        "<td class='center b'>"+totalActive+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_regional_ps_r1_p3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_ps_r1_p3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalFullTerm = 0;
                var totalEarlyTerm = 0;
                var totalDiedTerm = 0;
                var totalTerm = 0;
                var totalAbs = 0;
                var totalComm = 0;
                var totalVio = 0;
                var totalOther = 0;
                var totalRevoc = 0;
                var totalExt = 0;
                var totalTransfer = 0;
                var totalOthers = 0;
                var totalDropped = 0;

                result.payload.forEach(function(data){

                    totalFullTerm += data.totalFullTerm;
                    totalEarlyTerm += data.totalEarlyTerm;
                    totalDiedTerm += data.totalDiedTerm;
                    totalTerm += data.totalTerm;
                    totalAbs += data.totalAbs;
                    totalComm += data.totalComm;
                    totalVio += data.totalVio;
                    totalOther += data.totalOther;
                    totalRevoc += data.totalRevoc;
                    totalExt += data.totalExt;
                    totalTransfer += data.totalTransfer;
                    totalOthers += data.totalOthers;
                    totalDropped += data.totalDropped;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.totalFullTerm+"</td>"+
                                "<td class='center b'>"+data.totalEarlyTerm+"</td>"+
                                "<td class='center b'>"+data.totalDiedTerm+"</td>"+
                                "<td class='center b'>"+data.totalTerm+"</td>"+
                                "<td class='center b'>"+data.totalAbs+"</td>"+
                                "<td class='center b'>"+data.totalComm+"</td>"+
                                "<td class='center b'>"+data.totalVio+"</td>"+
                                "<td class='center b'>"+data.totalOther+"</td>"+
                                "<td class='center b'>"+data.totalRevoc+"</td>"+
                                "<td class='center b'>"+data.totalExt+"</td>"+
                                "<td class='center b'>"+data.totalTransfer+"</td>"+
                                "<td class='center b'>"+data.totalOthers+"</td>"+
                                "<td class='center b'>"+data.totalDropped+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalFullTerm+"</td>"+
                        "<td class='center b'>"+totalEarlyTerm+"</td>"+
                        "<td class='center b'>"+totalDiedTerm+"</td>"+
                        "<td class='center b'>"+totalTerm+"</td>"+
                        "<td class='center b'>"+totalAbs+"</td>"+
                        "<td class='center b'>"+totalComm+"</td>"+
                        "<td class='center b'>"+totalVio+"</td>"+
                        "<td class='center b'>"+totalOther+"</td>"+
                        "<td class='center b'>"+totalRevoc+"</td>"+
                        "<td class='center b'>"+totalExt+"</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+totalOthers+"</td>"+
                        "<td class='center b'>"+totalDropped+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_regional_ps_r2_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_ps_r2_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryTerm = 0;
                var totalCarryRevoc = 0;
                var totalCarryExt = 0;
                var totalCarryTrans = 0;
                var totalCarryOth = 0;
                var totalCarryOver = 0;
                var totalTerm = 0;
                var totalRevoc = 0;
                var totalExt = 0;
                var totalOther = 0;
                var totalTrans = 0;
                var totalSubmitted = 0;
                var totalCasesBeActed = 0;

                result.payload.forEach(function(data){

                    totalCarryTerm += data.totalCarryTerm;
                    totalCarryRevoc += data.totalCarryRevoc;
                    totalCarryExt += data.totalCarryExt;
                    totalCarryTrans += data.totalCarryTrans;
                    totalCarryOth += data.totalCarryOth;
                    totalCarryOver += data.totalCarryOver;
                    totalTerm += data.totalTerm;
                    totalRevoc += data.totalRevoc;
                    totalExt += data.totalExt;
                    totalOther += data.totalOther;
                    totalTrans += data.totalTrans;
                    totalSubmitted += data.totalSubmitted;
                    totalCasesBeActed += data.totalCasesBeActed;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='center b'>"+data.totalCarryTerm+"</td>"+
                                "<td class='center b'>"+data.totalCarryRevoc+"</td>"+
                                "<td class='center b'>"+data.totalCarryExt+"</td>"+
                                "<td class='center b'>"+data.totalCarryTrans+"</td>"+
                                "<td class='center b'>"+data.totalCarryOth+"</td>"+
                                "<td class='center b'>"+data.totalCarryOver+"</td>"+
                                "<td class='center b'>"+data.totalTerm+"</td>"+
                                "<td class='center b'>"+data.totalRevoc+"</td>"+
                                "<td class='center b'>"+data.totalExt+"</td>"+
                                "<td class='center b'>"+data.totalOther+"</td>"+
                                "<td class='center b'>"+data.totalTrans+"</td>"+
                                "<td class='center b'>"+data.totalSubmitted+"</td>"+
                                "<td class='center b'>"+data.totalCasesBeActed+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalCarryTerm+"</td>"+
                        "<td class='center b'>"+totalCarryRevoc+"</td>"+
                        "<td class='center b'>"+totalCarryExt+"</td>"+
                        "<td class='center b'>"+totalCarryTrans+"</td>"+
                        "<td class='center b'>"+totalCarryOth+"</td>"+
                        "<td class='center b'>"+totalCarryOver+"</td>"+
                        "<td class='center b'>"+totalTerm+"</td>"+
                        "<td class='center b'>"+totalRevoc+"</td>"+
                        "<td class='center b'>"+totalExt+"</td>"+
                        "<td class='center b'>"+totalOther+"</td>"+
                        "<td class='center b'>"+totalTrans+"</td>"+
                        "<td class='center b'>"+totalSubmitted+"</td>"+
                        "<td class='center b'>"+totalCasesBeActed+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f5_regional_ps_r2_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_ps_r2_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCasesBeActed = 0;
                var totalFullTerm = 0;
                var totalEarlyTerm = 0;
                var totalDiedTerm = 0;
                var totalTerm = 0;
                var totalAbs = 0;
                var totalComm = 0;
                var totalVio = 0;
                var totalOther = 0;
                var totalRevoc = 0;
                var totalExt = 0;
                var totalTransfer = 0;
                var totalOthers = 0;
                var totalDisposed = 0;
                var totalPending = 0;

                result.payload.forEach(function(data){

                    totalCasesBeActed += data.totalCasesBeActed;
                    totalFullTerm += data.totalFullTerm;
                    totalEarlyTerm += data.totalEarlyTerm;
                    totalDiedTerm += data.totalDiedTerm;
                    totalTerm += data.totalTerm;
                    totalAbs += data.totalAbs;
                    totalComm += data.totalComm;
                    totalVio += data.totalVio;
                    totalOther += data.totalOther;
                    totalRevoc += data.totalRevoc;
                    totalExt += data.totalExt;
                    totalTransfer += data.totalTransfer;
                    totalOthers += data.totalOthers;
                    totalDisposed += data.totalDisposed;
                    totalPending += data.totalPending;

                    data = "<tr>"+
                                "<td class='b'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCasesBeActed+"</td>"+
                                "<td class='b center'>"+data.totalFullTerm+"</td>"+
                                "<td class='b center'>"+data.totalEarlyTerm+"</td>"+
                                "<td class='b center'>"+data.totalDiedTerm+"</td>"+
                                "<td class='b center'>"+data.totalTerm+"</td>"+
                                "<td class='b center'>"+data.totalAbs+"</td>"+
                                "<td class='b center'>"+data.totalComm+"</td>"+
                                "<td class='b center'>"+data.totalVio+"</td>"+
                                "<td class='b center'>"+data.totalOther+"</td>"+
                                "<td class='b center'>"+data.totalRevoc+"</td>"+
                                "<td class='b center'>"+data.totalExt+"</td>"+
                                "<td class='b center'>"+data.totalTransfer+"</td>"+
                                "<td class='b center'>"+data.totalOthers+"</td>"+
                                "<td class='b center'>"+data.totalDisposed+"</td>"+
                                "<td class='b center'>"+data.totalPending+"</td>"+
                                
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCasesBeActed+"</td>"+
                        "<td class='b center'>"+totalFullTerm+"</td>"+
                        "<td class='b center'>"+totalEarlyTerm+"</td>"+
                        "<td class='b center'>"+totalDiedTerm+"</td>"+
                        "<td class='b center'>"+totalTerm+"</td>"+
                        "<td class='b center'>"+totalAbs+"</td>"+
                        "<td class='b center'>"+totalComm+"</td>"+
                        "<td class='b center'>"+totalVio+"</td>"+
                        "<td class='b center'>"+totalOther+"</td>"+
                        "<td class='b center'>"+totalRevoc+"</td>"+
                        "<td class='b center'>"+totalExt+"</td>"+
                        "<td class='b center'>"+totalTransfer+"</td>"+
                        "<td class='b center'>"+totalOthers+"</td>"+
                        "<td class='b center'>"+totalDisposed+"</td>"+
                        "<td class='b center'>"+totalPending+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_regional_ps_r3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_regional_ps_r3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalRcv = 0;
                var totalCasesHandled = 0;
                var totalCompltd = 0;
                var totalCourtesy = 0;

                result.payload.forEach(function(data){

                    totalCarryOver += data.totalCarryOver;
                    totalRcv += data.totalRcv;
                    totalCasesHandled += data.totalCasesHandled;
                    totalCompltd += data.totalCompltd;
                    totalCourtesy += data.totalCourtesy;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOver+"</td>"+
                                "<td class='b center'>"+data.totalRcv+"</td>"+
                                "<td class='b center'>"+data.totalCasesHandled+"</td>"+
                                "<td class='b center'>"+data.totalCompltd+"</td>"+
                                "<td class='b center'>"+data.totalCourtesy+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOver+"</td>"+
                        "<td class='b center'>"+totalRcv+"</td>"+
                        "<td class='b center'>"+totalCasesHandled+"</td>"+
                        "<td class='b center'>"+totalCompltd+"</td>"+
                        "<td class='b center'>"+totalCourtesy+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    //REGIONAL -- FORM 21
    var f21_regional_ppi_r1_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_regional_ppi_r1_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalRcv = 0;
                var totalCasesHandled = 0;

                result.payload.forEach(function(data){

                    totalCarryOver += data.totalCarryOver;
                    totalRcv += data.totalRcv;
                    totalCasesHandled += data.totalCasesHandled;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOver+"</td>"+
                                "<td class='b center'>"+data.totalRcv+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.totalRcv+"</td>"+
                                "<td class='b center'>"+data.totalCasesHandled+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOver+"</td>"+
                        "<td class='b center'>"+totalRcv+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+totalRcv+"</td>"+
                        "<td class='b center'>"+totalCasesHandled+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_ppi_r1_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_regional_ppi_r1_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalGrant = 0;
                var totalDenial = 0;
                var commutationTotalGrant = 0;
                var commutationTotalDenial = 0;
                var absoluteTotalGrant = 0;
                var totalppir = 0;

                result.payload.forEach(function(data){

                    totalGrant += data.totalGrant;
                    totalDenial += data.totalDenial;
                    commutationTotalGrant += data.commutationTotalGrant;
                    commutationTotalDenial += data.commutationTotalDenial;
                    absoluteTotalGrant += data.absoluteTotalGrant;
                    totalppir += data.totalppir;


                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalGrant+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.totalDenial+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.commutationTotalGrant+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.commutationTotalDenial+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.absoluteTotalGrant+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.totalppir+"</td>"
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalGrant+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+totalDenial+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+commutationTotalGrant+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+commutationTotalDenial+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+absoluteTotalGrant+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+totalppir+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_ppi_r1_p3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_regional_ppi_r1_p3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalInvestigationReport = 0;
                var totalTransfer = 0;
                var totalOther = 0;
                var totalActed = 0;
                var totalActive = 0;

                result.payload.forEach(function(data){

                    totalInvestigationReport += data.totalInvestigationReport;
                    totalTransfer += data.totalTransfer;
                    totalOther += data.totalOther;
                    totalActed += data.totalActed;
                    totalActive += data.totalActive;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalInvestigationReport+"</td>"+
                                "<td class='b center'>"+data.totalTransfer+"</td>"+
                                "<td class='b center'>"+data.totalOther+"</td>"+
                                "<td class='b center'>"+data.totalActed+"</td>" +
                                "<td class='b center'>"+data.totalActive+"</td>" + 
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalInvestigationReport+"</td>"+
                        "<td class='b center'>"+totalTransfer+"</td>"+
                        "<td class='b center'>"+totalOther+"</td>"+
                        "<td class='b center'>"+totalActed+"</td>" +
                        "<td class='b center'>"+totalActive+"</td>" + 
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_ppi_r2_p1= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_regional_ppi_r2_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverPendingResolution = 0;
                var totalParole = 0;
                var totalCommutation = 0;
                var absoluteTotalGrant = 0;
                var totalRefOthers = 0;
                var totalReportSubmitted = 0;
                var totalCasestobeActedUpon = 0;

                result.payload.forEach(function(data){

                    totalCarryOverPendingResolution += data.totalCarryOverPendingResolution;
                    totalParole += data.totalParole;
                    totalCommutation += data.totalCommutation;
                    absoluteTotalGrant += data.absoluteTotalGrant;
                    totalRefOthers += data.totalRefOthers;
                    totalReportSubmitted += data.totalReportSubmitted;
                    totalCasestobeActedUpon += data.totalCasestobeActedUpon;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingResolution+"</td>"+
                                "<td class='b center'>"+data.totalParole+"</td>"+
                                "<td class='b center'>"+data.totalCommutation+"</td>"+
                                "<td class='b center'>"+0+"</td>" +
                                "<td class='b center'>"+data.absoluteTotalGrant+"</td>" + 
                                "<td class='b center'>"+data.totalRefOthers+"</td>" + 
                                "<td class='b center'>"+data.totalReportSubmitted+"</td>" + 
                                "<td class='b center'>"+data.totalCasestobeActedUpon+"</td>" + 
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverPendingResolution+"</td>"+
                        "<td class='b center'>"+totalParole+"</td>"+
                        "<td class='b center'>"+totalCommutation+"</td>"+
                        "<td class='b center'>"+0+"</td>" +
                        "<td class='b center'>"+absoluteTotalGrant+"</td>" + 
                        "<td class='b center'>"+totalRefOthers+"</td>" + 
                        "<td class='b center'>"+totalReportSubmitted+"</td>" + 
                        "<td class='b center'>"+totalCasestobeActedUpon+"</td>" + 
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_ppi_r3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_regional_ppi_r3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverCI = 0;
                var totalRcvCI = 0;
                var totalCountCI = 0;
                var totalCmpltdCI = 0;
                var totalCountActiveCI = 0;

                result.payload.forEach(function(data){

                    totalCarryOverCI += data.totalCarryOverCI;
                    totalRcvCI += data.totalRcvCI;
                    totalCountCI += data.totalCountCI;
                    totalCmpltdCI += data.totalCmpltdCI;
                    totalCountActiveCI += data.totalCountActiveCI;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverCI+"</td>"+
                                "<td class='b center'>"+data.totalRcvCI+"</td>"+
                                "<td class='b center'>"+data.totalCountCI+"</td>"+
                                "<td class='b center'>"+data.totalCmpltdCI+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalCountActiveCI+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverCI+"</td>"+
                        "<td class='b center'>"+totalRcvCI+"</td>"+
                        "<td class='b center'>"+totalCountCI+"</td>"+
                        "<td class='b center'>"+totalCmpltdCI+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalCountActiveCI+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_ppi_r4_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_regional_ppi_r4_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverInvestigation = 0;
                var totalRcvTotalInvestigation = 0;
                var totalCasesHandled = 0;
                var totalRefParoleGrantActed = 0;
                var totalRefParoleDeniedActed = 0;
                var totalRefCommGrantActed = 0;
                var totalRefCommDeniedActed = 0;
                var totalRefCondGrantActed = 0;
                var totalRefCondDeniedActed = 0;

                result.payload.forEach(function(data){

                    totalCarryOverInvestigation += data.totalCarryOverInvestigation;
                    totalRcvTotalInvestigation += data.totalRcvTotalInvestigation;
                    totalCasesHandled += data.totalCasesHandled;
                    totalRefParoleGrantActed += data.totalRefParoleGrantActed;
                    totalRefParoleDeniedActed += data.totalRefParoleDeniedActed;
                    totalRefCommGrantActed += data.totalRefCommGrantActed;
                    totalRefCommDeniedActed += data.totalRefCommDeniedActed;
                    totalRefCondGrantActed += data.totalRefCondGrantActed;
                    totalRefCondDeniedActed += data.totalRefCondDeniedActed;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverInvestigation+"</td>"+
                                "<td class='b center'>"+data.totalRcvTotalInvestigation+"</td>"+
                                "<td class='b center'>"+data.totalCasesHandled+"</td>"+
                                "<td class='b center'>"+data.totalRefParoleGrantActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefParoleDeniedActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefCommGrantActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefCommDeniedActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefCondGrantActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefCondDeniedActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverInvestigation+"</td>"+
                        "<td class='b center'>"+totalRcvTotalInvestigation+"</td>"+
                        "<td class='b center'>"+totalCasesHandled+"</td>"+
                        "<td class='b center'>"+totalRefParoleGrantActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefParoleDeniedActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefCommGrantActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefCommDeniedActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefCondGrantActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefCondDeniedActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_regional_ppi_r4_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_regional_ppi_r4_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalRefAbsGrantActed = 0;
                var totalRefAbsDeniedActed = 0;
                var totalPPIR = 0;
                var totalTransferredSubmitted = 0;
                var totalRefOthers = 0;
                var totalInvRef = 0;

                result.payload.forEach(function(data){

                    totalRefAbsGrantActed += data.totalRefAbsGrantActed;
                    totalRefAbsDeniedActed += data.totalRefAbsDeniedActed;
                    totalPPIR += data.totalPPIR;
                    totalTransferredSubmitted += data.totalTransferredSubmitted;
                    totalRefOthers += data.totalRefOthers;
                    totalInvRef += data.totalInvRef;

                    var disRate = 0;
                    if (data.totalInvRef != "0") {
                       disRate = (data.totalInvRef / data.totalPPIR) * 100;
                    }else {
                         disRate = "0";
                    }
                    const total = Math.round(disRate) + "%";

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalRefAbsGrantActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefAbsDeniedActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalPPIR+"</td>"+
                                "<td class='b center'>"+data.totalTransferredSubmitted+"</td>"+
                                "<td class='b center'>"+data.totalRefOthers+"</td>"+
                                "<td class='b center'>"+data.totalInvRef+"</td>"+
                                "<td class='b center'>"+total+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })

                var disRateTotal = 0;
                if (totalInvRef != "0") {
                    disRateTotal = (totalInvRef / totalPPIR) * 100;
                }else {
                    disRateTotal = "0";
                }
                const totalTotal = Math.round(disRateTotal) + "%";

                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalRefAbsGrantActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefAbsDeniedActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalPPIR+"</td>"+
                        "<td class='b center'>"+totalTransferredSubmitted+"</td>"+
                        "<td class='b center'>"+totalRefOthers+"</td>"+
                        "<td class='b center'>"+totalInvRef+"</td>"+
                        "<td class='b center'>"+totalTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_regional_pr_pd_r1_p1= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_regional_pr_pd_r1_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverSupvParolIV = 0;
                var totalCarryOverSupvPardonIV = 0;
                var totalCarryOverSupvIV = 0;
                var totalRefRcvSupvParol = 0;
                var totalRefRcvSupvPardon = 0;
                var totalRefRcvSupv = 0;
                var totalRefRcvSupv = 0;
                var totalSupervCasesHandledPR = 0;
                var totalSupervCasesHandledPD = 0;
                var totalSupervCasesHandled = 0;

                result.payload.forEach(function(data){

                    totalCarryOverSupvParolIV += data.totalCarryOverSupvParolIV;
                    totalCarryOverSupvPardonIV += data.totalCarryOverSupvPardonIV;
                    totalCarryOverSupvIV += data.totalCarryOverSupvIV;
                    totalRefRcvSupvParol += data.totalRefRcvSupvParol;
                    totalRefRcvSupvPardon += data.totalRefRcvSupvPardon;
                    totalRefRcvSupv += data.totalRefRcvSupv;
                    totalRefRcvSupv += data.totalRefRcvSupv;
                    totalSupervCasesHandledPR += data.totalSupervCasesHandledPR;
                    totalSupervCasesHandledPD += data.totalSupervCasesHandledPD;
                    totalSupervCasesHandled += data.totalSupervCasesHandled;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvParolIV+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvPardonIV+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvIV+"</td>"+
                                "<td class='b center'>"+data.totalRefRcvSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalRefRcvSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalRefRcvSupv+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefRcvSupv+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandledPR+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandledPD+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandled+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverSupvParolIV+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupvPardonIV+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupvIV+"</td>"+
                        "<td class='b center'>"+totalRefRcvSupvParol+"</td>"+
                        "<td class='b center'>"+totalRefRcvSupvPardon+"</td>"+
                        "<td class='b center'>"+totalRefRcvSupv+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefRcvSupv+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandledPR+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandledPD+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandled+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_pr_pd_r1_p2= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_regional_pr_pd_r1_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalSupervCasesHandledPR = 0;
                var totalSupervCasesHandledPD = 0;
                var totalSupervCasesHandled = 0;
                var totalCasesResolvedFinalParol = 0;
                var totalCasesResolvedFinalPardon = 0;
                var totalCasesResolvedFinal = 0;
                var totalCasesResolvedArrestParol = 0;
                var totalCasesResolvedArrestPardon = 0;
                var totalCasesResolvedArrest = 0;
                var totalCasesResolvedDeathParol = 0;
                var totalCasesResolvedDeathPardon = 0;
                var totalCasesResolvedDeath = 0;
                var totalCasesResolvedRegionalParol = 0;
                var totalCasesResolvedRegionalPardon = 0;
                var totalCasesResolvedRegional = 0;
                var totalCasesResolvedOtherParol = 0;
                var totalCasesResolvedOtherPardon = 0;
                var totalCasesResolvedPSOther = 0;
                var totalCasesDropPR = 0;
                var totalCasesDropPD = 0;
                var totalCasesDrop = 0;
                var totalActiveSuperVisionPR = 0;
                var totalActiveSuperVisionPD = 0;
                var totalActiveSuperVision = 0;

                result.payload.forEach(function(data){

                    totalSupervCasesHandledPR += data.totalSupervCasesHandledPR;
                    totalSupervCasesHandledPD += data.totalSupervCasesHandledPD;
                    totalSupervCasesHandled += data.totalSupervCasesHandled;
                    totalCasesResolvedFinalParol += data.totalCasesResolvedFinalParol;
                    totalCasesResolvedFinalPardon += data.totalCasesResolvedFinalPardon;
                    totalCasesResolvedFinal += data.totalCasesResolvedFinal;
                    totalCasesResolvedArrestParol += data.totalCasesResolvedArrestParol;
                    totalCasesResolvedArrestPardon += data.totalCasesResolvedArrestPardon;
                    totalCasesResolvedArrest += data.totalCasesResolvedArrest;
                    totalCasesResolvedDeathParol += data.totalCasesResolvedDeathParol;
                    totalCasesResolvedDeathPardon += data.totalCasesResolvedDeathPardon;
                    totalCasesResolvedDeath += data.totalCasesResolvedDeath;
                    totalCasesResolvedRegionalParol += data.totalCasesResolvedRegionalParol;
                    totalCasesResolvedRegionalPardon += data.totalCasesResolvedRegionalPardon;
                    totalCasesResolvedRegional += data.totalCasesResolvedRegional;
                    totalCasesResolvedOtherParol += data.totalCasesResolvedOtherParol;
                    totalCasesResolvedOtherPardon += data.totalCasesResolvedOtherPardon;
                    totalCasesResolvedPSOther += data.totalCasesResolvedPSOther;
                    totalCasesDropPR += data.totalCasesDropPR;
                    totalCasesDropPD += data.totalCasesDropPD;
                    totalCasesDrop += data.totalCasesDrop;
                    totalActiveSuperVisionPR += data.totalActiveSuperVisionPR;
                    totalActiveSuperVisionPD += data.totalActiveSuperVisionPD;
                    totalActiveSuperVision += data.totalActiveSuperVision;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandledPR+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandledPD+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandled+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinal+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrest+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeath+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegional+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedPSOther+"</td>"+
                                "<td class='b center'>"+data.totalCasesDropPR+"</td>"+
                                "<td class='b center'>"+data.totalCasesDropPD+"</td>"+
                                "<td class='b center'>"+data.totalCasesDrop+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVisionPR+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVisionPD+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVision+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalSupervCasesHandledPR+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandledPD+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandled+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinal+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrest+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeath+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegional+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedPSOther+"</td>"+
                        "<td class='b center'>"+totalCasesDropPR+"</td>"+
                        "<td class='b center'>"+totalCasesDropPD+"</td>"+
                        "<td class='b center'>"+totalCasesDrop+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVisionPR+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVisionPD+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVision+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_pr_pd_r1_p3= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_regional_pr_pd_r1_p3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var SupvActedSummaryParol = 0;
                var SupvActedSummaryPardon = 0;
                var SupvActedSummaryTotal = 0;
                var SupvActedInfraParol = 0;
                var SupvActedInfraPardon = 0;
                var SupvActedInfraTotal = 0;
                var SupvActedDeathParol = 0;
                var SupvActedDeathPardon = 0;
                var SupvActedDeathTotal = 0;
                var SupvActedOtherParol = 0;
                var SupvActedOtherPardon = 0;
                var SupvActedOtherTotal = 0;
                var totalPRSB = 0;
                var totalPR = 0;
                var totalPD = 0;
                var totalPDandPR = 0;
                var totalCasesActedUponByPPO = 0;

                result.payload.forEach(function(data){

                    SupvActedSummaryParol += data.SupvActedSummaryParol;
                    SupvActedSummaryPardon += data.SupvActedSummaryPardon;
                    SupvActedSummaryTotal += data.SupvActedSummaryTotal;
                    SupvActedInfraParol += data.SupvActedInfraParol;
                    SupvActedInfraPardon += data.SupvActedInfraPardon;
                    SupvActedInfraTotal += data.SupvActedInfraTotal;
                    SupvActedDeathParol += data.SupvActedDeathParol;
                    SupvActedDeathPardon += data.SupvActedDeathPardon;
                    SupvActedDeathTotal += data.SupvActedDeathTotal;
                    SupvActedOtherParol += data.SupvActedOtherParol;
                    SupvActedOtherPardon += data.SupvActedOtherPardon;
                    SupvActedOtherTotal += data.SupvActedOtherTotal;
                    totalPRSB += data.totalPRSB;
                    totalPR += data.totalPR;
                    totalPD += data.totalPD;
                    totalPDandPR += data.totalPDandPR;
                    totalCasesActedUponByPPO += data.totalCasesActedUponByPPO;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherTotal+"</td>"+
                                "<td class='b center'>"+data.totalPRSB+"</td>"+
                                "<td class='b center'>"+data.totalPR+"</td>"+
                                "<td class='b center'>"+data.totalPD+"</td>"+
                                "<td class='b center'>"+data.totalPDandPR+"</td>"+
                                "<td class='b center'>"+data.totalCasesActedUponByPPO+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+SupvActedSummaryParol+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryPardon+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryTotal+"</td>"+
                        "<td class='b center'>"+SupvActedInfraParol+"</td>"+
                        "<td class='b center'>"+SupvActedInfraPardon+"</td>"+
                        "<td class='b center'>"+SupvActedInfraTotal+"</td>"+
                        "<td class='b center'>"+SupvActedDeathParol+"</td>"+
                        "<td class='b center'>"+SupvActedDeathPardon+"</td>"+
                        "<td class='b center'>"+SupvActedDeathTotal+"</td>"+
                        "<td class='b center'>"+SupvActedOtherParol+"</td>"+
                        "<td class='b center'>"+SupvActedOtherPardon+"</td>"+
                        "<td class='b center'>"+SupvActedOtherTotal+"</td>"+
                        "<td class='b center'>"+totalPRSB+"</td>"+
                        "<td class='b center'>"+totalPR+"</td>"+
                        "<td class='b center'>"+totalPD+"</td>"+
                        "<td class='b center'>"+totalPDandPR+"</td>"+
                        "<td class='b center'>"+totalCasesActedUponByPPO+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_pr_pd_r2_p1= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_regional_pr_pd_r2_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverPendingParol = 0;
                var totalCarryOverPendingPardon = 0;
                var totalCarryOverPending = 0;
                var SupvActedSummaryParol = 0;
                var SupvActedSummaryPardon = 0;
                var SupvActedSummaryTotal = 0;
                var SupvActedInfraParol = 0;
                var SupvActedInfraPardon = 0;
                var SupvActedInfraTotal = 0;
                var SupvActedDeathParol = 0;
                var SupvActedDeathPardon = 0;
                var SupvActedDeathTotal = 0;
                var SupvActedOtherParol = 0;
                var SupvActedOtherPardon = 0;
                var SupvActedOtherTotal = 0;
                var totalReportSubmitted = 0;
                var totalPR = 0;
                var totalPD = 0;
                var totalPRandPD = 0;

                result.payload.forEach(function(data){

                    SupvActedSummaryParol += data.SupvActedSummaryParol;
                    SupvActedSummaryPardon += data.SupvActedSummaryPardon;
                    totalCarryOverPendingParol += data.totalCarryOverPendingParol;
                    totalCarryOverPendingPardon += data.totalCarryOverPendingPardon;
                    totalCarryOverPending += data.totalCarryOverPending;
                    SupvActedSummaryParol += data.SupvActedSummaryParol;
                    SupvActedSummaryPardon += data.SupvActedSummaryPardon;
                    SupvActedSummaryTotal += data.SupvActedSummaryTotal;
                    SupvActedInfraParol += data.SupvActedInfraParol;
                    SupvActedInfraPardon += data.SupvActedInfraPardon;
                    SupvActedInfraTotal += data.SupvActedInfraTotal;
                    SupvActedDeathParol += data.SupvActedDeathParol;
                    SupvActedDeathPardon += data.SupvActedDeathPardon;
                    SupvActedDeathTotal += data.SupvActedDeathTotal;
                    SupvActedOtherParol += data.SupvActedOtherParol;
                    SupvActedOtherPardon += data.SupvActedOtherPardon;
                    SupvActedOtherTotal += data.SupvActedOtherTotal;
                    totalReportSubmitted += data.totalReportSubmitted;
                    totalPR += data.totalPR;
                    totalPD += data.totalPD;
                    totalPRandPD += data.totalPRandPD;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingParol+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingPardon+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPending+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherTotal+"</td>"+
                                "<td class='b center'>"+data.totalReportSubmitted+"</td>"+
                                "<td class='b center'>"+data.totalPR+"</td>"+
                                "<td class='b center'>"+data.totalPD+"</td>"+
                                "<td class='b center'>"+data.totalPRandPD+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverPendingParol+"</td>"+
                        "<td class='b center'>"+totalCarryOverPendingPardon+"</td>"+
                        "<td class='b center'>"+totalCarryOverPending+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryParol+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryPardon+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryTotal+"</td>"+
                        "<td class='b center'>"+SupvActedInfraParol+"</td>"+
                        "<td class='b center'>"+SupvActedInfraPardon+"</td>"+
                        "<td class='b center'>"+SupvActedInfraTotal+"</td>"+
                        "<td class='b center'>"+SupvActedDeathParol+"</td>"+
                        "<td class='b center'>"+SupvActedDeathPardon+"</td>"+
                        "<td class='b center'>"+SupvActedDeathTotal+"</td>"+
                        "<td class='b center'>"+SupvActedOtherParol+"</td>"+
                        "<td class='b center'>"+SupvActedOtherPardon+"</td>"+
                        "<td class='b center'>"+SupvActedOtherTotal+"</td>"+
                        "<td class='b center'>"+totalReportSubmitted+"</td>"+
                        "<td class='b center'>"+totalPR+"</td>"+
                        "<td class='b center'>"+totalPD+"</td>"+
                        "<td class='b center'>"+totalPRandPD+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_regional_pr_pd_r2_p2= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_regional_pr_pd_r2_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalPR = 0;
                var totalPD = 0;
                var totalPRandPD = 0;
                var totalCasesResolvedFinalParol = 0;
                var totalCasesResolvedFinalPardon = 0;
                var totalCasesResolvedFinal = 0;
                var totalCasesResolvedArrestParol = 0;
                var totalCasesResolvedArrestPardon = 0;
                var totalCasesResolvedArrest = 0;
                var totalCasesResolvedDeathParol = 0;
                var totalCasesResolvedDeathPardon = 0;
                var totalCasesResolvedDeath = 0;
                var totalCasesResolvedOtherParol = 0;
                var totalCasesResolvedOtherPardon = 0;
                var totalCasesResolvedPSOther = 0;
                var totalPRCasesResolved = 0;
                var totalPDCasesResolved = 0;
                var totalCasesResolved = 0;
                var totalCasesPendingPR = 0;
                var totalCasesPendingPD = 0;
                var totalCasesPending = 0;

                result.payload.forEach(function(data){

                    totalPR += data.totalPR;
                    totalPD += data.totalPD;
                    totalPRandPD += data.totalPRandPD;
                    totalCasesResolvedFinalParol += data.totalCasesResolvedFinalParol;
                    totalCasesResolvedFinalPardon += data.totalCasesResolvedFinalPardon;
                    totalCasesResolvedFinal += data.totalCasesResolvedFinal;
                    totalCasesResolvedArrestParol += data.totalCasesResolvedArrestParol;
                    totalCasesResolvedArrestPardon += data.totalCasesResolvedArrestPardon;
                    totalCasesResolvedArrest += data.totalCasesResolvedArrest;
                    totalCasesResolvedDeathParol += data.totalCasesResolvedDeathParol;
                    totalCasesResolvedDeathPardon += data.totalCasesResolvedDeathPardon;
                    totalCasesResolvedDeath += data.totalCasesResolvedDeath;
                    totalCasesResolvedOtherParol += data.totalCasesResolvedOtherParol;
                    totalCasesResolvedOtherPardon += data.totalCasesResolvedOtherPardon;
                    totalCasesResolvedPSOther += data.totalCasesResolvedPSOther;
                    totalPRCasesResolved += data.totalPRCasesResolved;
                    totalPDCasesResolved += data.totalPDCasesResolved;
                    totalCasesResolved += data.totalCasesResolved;
                    totalCasesPendingPR += data.totalCasesPendingPR;
                    totalCasesPendingPD += data.totalCasesPendingPD;
                    totalCasesPending += data.totalCasesPending;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalPR+"</td>"+
                                "<td class='b center'>"+data.totalPD+"</td>"+
                                "<td class='b center'>"+data.totalPRandPD+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinal+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrest+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeath+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedPSOther+"</td>"+
                                "<td class='b center'>"+data.totalPRCasesResolved+"</td>"+
                                "<td class='b center'>"+data.totalPDCasesResolved+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolved+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingPR+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingPD+"</td>"+
                                "<td class='b center'>"+data.totalCasesPending+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalPR+"</td>"+
                        "<td class='b center'>"+totalPD+"</td>"+
                        "<td class='b center'>"+totalPRandPD+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinal+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrest+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeath+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedPSOther+"</td>"+
                        "<td class='b center'>"+totalPRCasesResolved+"</td>"+
                        "<td class='b center'>"+totalPDCasesResolved+"</td>"+
                        "<td class='b center'>"+totalCasesResolved+"</td>"+
                        "<td class='b center'>"+totalCasesPendingPR+"</td>"+
                        "<td class='b center'>"+totalCasesPendingPD+"</td>"+
                        "<td class='b center'>"+totalCasesPending+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_pr_pd_r3= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_regional_pr_pd_r3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverPendingRegionalParol = 0;
                var totalCarryOverPendingRegionalPardon = 0;
                var totalCarryOverPendingRegional = 0;
                var totalReportSubmittedRegionalParol = 0;
                var totalReportSubmittedRegionalPardon = 0;
                var totalReportSubmittedRegional = 0;
                var totalCasesResolvedRegionalParol = 0;
                var totalCasesResolvedRegionalPardon = 0;
                var totalCasesResolvedRegional = 0;
                var totalCasesPendingResolutionRegionalParol = 0;
                var totalCasesPendingResolutionRegionalPardon = 0;
                var totalCasesPendingResolutionRegional = 0;

                result.payload.forEach(function(data){

                    totalCarryOverPendingRegionalParol += data.totalCarryOverPendingRegionalParol;
                    totalCarryOverPendingRegionalPardon += data.totalCarryOverPendingRegionalPardon;
                    totalCarryOverPendingRegional += data.totalCarryOverPendingRegional;
                    totalReportSubmittedRegionalParol += data.totalReportSubmittedRegionalParol;
                    totalReportSubmittedRegionalPardon += data.totalReportSubmittedRegionalPardon;
                    totalReportSubmittedRegional += data.totalReportSubmittedRegional;
                    totalCasesResolvedRegionalParol += data.totalCasesResolvedRegionalParol;
                    totalCasesResolvedRegionalPardon += data.totalCasesResolvedRegionalPardon;
                    totalCasesResolvedRegional += data.totalCasesResolvedRegional;
                    totalCasesPendingResolutionRegionalParol += data.totalCasesPendingResolutionRegionalParol;
                    totalCasesPendingResolutionRegionalPardon += data.totalCasesPendingResolutionRegionalPardon;
                    totalCasesPendingResolutionRegional += data.totalCasesPendingResolutionRegional;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingRegional+"</td>"+
                                "<td class='b center'>"+data.totalReportSubmittedRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalReportSubmittedRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalReportSubmittedRegional+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegional+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingResolutionRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingResolutionRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingResolutionRegional+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverPendingRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCarryOverPendingRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCarryOverPendingRegional+"</td>"+
                        "<td class='b center'>"+totalReportSubmittedRegionalParol+"</td>"+
                        "<td class='b center'>"+totalReportSubmittedRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalReportSubmittedRegional+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegional+"</td>"+
                        "<td class='b center'>"+totalCasesPendingResolutionRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCasesPendingResolutionRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesPendingResolutionRegional+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_regional_pr_pd_r4= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_regional_pr_pd_r4",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverSupvParol = 0;
                var totalCarryOverSupvPardon = 0;
                var totalCarryOverSupv = 0;
                var totalRcvSupvParol = 0;
                var totalRcvSupvPardon = 0;
                var totalRcvSupv = 0;
                var totalCourtesySupvParol = 0;
                var totalCourtesySupvPardon = 0;
                var totalCourtesySupvTotal = 0;
                var totalTermSupvParol = 0;
                var totalTermSupvPardon = 0;
                var totalTermSupv = 0;
                var totalActCourtesySupvParol = 0;
                var totalActCourtesySupvPardon = 0;
                var totalActCourtesySupv = 0;

                result.payload.forEach(function(data){

                    totalCarryOverSupvParol += data.totalCarryOverSupvParol;
                    totalCarryOverSupvPardon += data.totalCarryOverSupvPardon;
                    totalCarryOverSupv += data.totalCarryOverSupv;
                    totalRcvSupvParol += data.totalRcvSupvParol;
                    totalRcvSupvPardon += data.totalRcvSupvPardon;
                    totalRcvSupv += data.totalRcvSupv;
                    totalCourtesySupvParol += data.totalCourtesySupvParol;
                    totalCourtesySupvPardon += data.totalCourtesySupvPardon;
                    totalCourtesySupvTotal += data.totalCourtesySupvTotal;
                    totalTermSupvParol += data.totalTermSupvParol;
                    totalTermSupvPardon += data.totalTermSupvPardon;
                    totalTermSupv += data.totalTermSupv;
                    totalActCourtesySupvParol += data.totalActCourtesySupvParol;
                    totalActCourtesySupvPardon += data.totalActCourtesySupvPardon;
                    totalActCourtesySupv += data.totalActCourtesySupv;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.REGION+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupv+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupv+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvParol+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvTotal+"</td>"+
                                "<td class='b center'>"+data.totalTermSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalTermSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalTermSupv+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupvParol+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupv+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverSupvParol+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupvPardon+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupv+"</td>"+
                        "<td class='b center'>"+totalRcvSupvParol+"</td>"+
                        "<td class='b center'>"+totalRcvSupvPardon+"</td>"+
                        "<td class='b center'>"+totalRcvSupv+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvParol+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvPardon+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvTotal+"</td>"+
                        "<td class='b center'>"+totalTermSupvParol+"</td>"+
                        "<td class='b center'>"+totalTermSupvPardon+"</td>"+
                        "<td class='b center'>"+totalTermSupv+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupvParol+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupvPardon+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupv+"</td>"+
                    "</tr>"
                );
            }
        });
    }


    //FIELD//
    //@breakpoint

    var f5_field_office_pi_f1_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_pi_f1_p1",
            Y_M : Y_M,
            REGION : $.wms.urlParam('reg2'),
            END_Y_M : $.wms.urlParam('date')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");
                var carryOver = 0;
                var civil_total = 0;
                var military_total = 0;
                var reInvRef = 0;
                var total = 0;
                var totalInvestigation = 0;
                
                const fieldsToRemove = [
                    "Central Office HQ",
                    "Technical Services Division",
                    "Office of the Administrator",
                    "Office of the Deputy Administrator",
                    "Case Management and Records Division(CMRD)",
                    "Regional Office - Region I",
                    "Regional Office - Region II",
                    "Regional Office - Region III",
                    "Regional Office - Region IV-A",
                    "Regional Office - Region IV-B",
                    "Regional Office - Region V",
                    "Regional Office - Region VI",
                    "Regional Office - Region VII",
                    "Regional Office - Region VIII",
                    "Regional Office - Region IX",
                    "Regional Office - Region X",
                    "Regional Office - Region XI",
                    "Regional Office - Region XII",
                    "Regional Office - Region XIII",
                    "Regional Office - CAR",
                    "Regional Office - NCR",
                ];

                const filteredPayload = result.payload.filter(function(data) {
                    return !fieldsToRemove.includes(data.FIELD);
                });

                filteredPayload.forEach(function(data) {
                    carryOver += data.carryOver;
                    civil_total += data.civil_total;
                    military_total += data.military_total;
                    reInvRef += data.reInvRef;
                    total += data.total;
                    totalInvestigation += data.totalInvestigation;
                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='center'>"+data.carryOver+"</td>"+
                                "<td class='center'>"+data.civil_total+"</td>"+
                                "<td class='center'>"+data.military_total+"</td>"+
                                "<td class='center'>"+data.reInvRef+"</td>"+
                                "<td class='center'>"+data.total+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);

                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center'>"+carryOver+"</td>"+
                        "<td class='center'>"+civil_total+"</td>"+
                        "<td class='center'>"+military_total+"</td>"+
                        "<td class='center'>"+reInvRef+"</td>"+
                        "<td class='center'>"+total+"</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                    "</tr>"

                );

            }
        });
    }

    var f5_field_office_pi_f1_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_pi_f1_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2'),
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalGrant = 0;
                var totalDenial = 0;
                var totalManifest = 0;
                var totalTransfer = 0;
                var totalActed = 0;
                var totalRecall = 0;
                var totalWarrant = 0;
                var totalNotActed = 0;
                var totalActiveCase = 0;
                var totalActive = 0;
                
                const fieldsToRemove = [
                    "Central Office HQ",
                    "Technical Services Division",
                    "Office of the Administrator",
                    "Office of the Deputy Administrator",
                    "Case Management and Records Division(CMRD)",
                    "Regional Office - Region I",
                    "Regional Office - Region II",
                    "Regional Office - Region III",
                    "Regional Office - Region IV-A",
                    "Regional Office - Region IV-B",
                    "Regional Office - Region V",
                    "Regional Office - Region VI",
                    "Regional Office - Region VII",
                    "Regional Office - Region VIII",
                    "Regional Office - Region IX",
                    "Regional Office - Region X",
                    "Regional Office - Region XI",
                    "Regional Office - Region XII",
                    "Regional Office - Region XIII",
                    "Regional Office - CAR",
                    "Regional Office - NCR",
                ];

                const filteredPayload = result.payload.filter(function(data) {
                    return !fieldsToRemove.includes(data.FIELD);
                });

                filteredPayload.forEach(function(data) {
                    // console.log(data)

                    totalGrant += data.totalGrant;
                    totalDenial += data.totalDenial;
                    totalManifest += data.totalManifest;
                    totalTransfer += data.totalTransfer;
                    totalActed += data.totalActed;
                    totalRecall += data.totalRecall;
                    totalWarrant += data.totalWarrant;
                    totalNotActed += data.totalNotActed;
                    totalActiveCase += data.totalActiveCase;
                    totalActive += data.totalActive;

                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='center b'>"+data.totalGrant+"</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>"+data.totalDenial+"</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>"+data.totalManifest+"</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>"+data.totalTransfer+"</td>"+
                                "<td class='center b'>"+data.totalActed+"</td>"+
                                "<td class='center b'>"+data.totalRecall+"</td>"+
                                "<td class='center b'>"+data.totalWarrant+"</td>"+
                                "<td class='center b'>"+data.totalNotActed+"</td>"+
                                "<td class='center b'>"+data.totalActive+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);

                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalGrant+"</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>"+totalDenial+"</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>"+totalManifest+"</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+totalActed+"</td>"+
                        "<td class='center b'>"+totalRecall+"</td>"+
                        "<td class='center b'>"+totalWarrant+"</td>"+
                        "<td class='center b'>"+totalNotActed+"</td>"+
                        "<td class='center b'>"+totalActiveCase+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_field_office_pi_f2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_pi_f2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalPSIR = 0;
                var totalManifest = 0;
                var totalSubmitted = 0;
                var totalbeActed = 0;
                var totalGrant = 0;
                var totalDenial = 0;
                var totalDismiss = 0;
                var totalWithdraw = 0;
                var totalReinv = 0;
                var totalOther = 0;
                var totalDisposed = 0;
                var totalWarrant = 0;
                var totalRecall = 0;
                var totalNotActed = 0;
                var totalPending = 0;
                
                const fieldsToRemove = [
                    "Central Office HQ",
                    "Technical Services Division",
                    "Office of the Administrator",
                    "Office of the Deputy Administrator",
                    "Case Management and Records Division(CMRD)",
                    "Regional Office - Region I",
                    "Regional Office - Region II",
                    "Regional Office - Region III",
                    "Regional Office - Region IV-A",
                    "Regional Office - Region IV-B",
                    "Regional Office - Region V",
                    "Regional Office - Region VI",
                    "Regional Office - Region VII",
                    "Regional Office - Region VIII",
                    "Regional Office - Region IX",
                    "Regional Office - Region X",
                    "Regional Office - Region XI",
                    "Regional Office - Region XII",
                    "Regional Office - Region XIII",
                    "Regional Office - CAR",
                    "Regional Office - NCR",
                ];

                const filteredPayload = result.payload.filter(function(data) {
                    return !fieldsToRemove.includes(data.FIELD);
                });

                filteredPayload.forEach(function(data) {
                    //console.log(field.NAME)

                    totalCarryOver += data.totalCarryOver;
                    totalPSIR += data.totalPSIR;
                    totalManifest += data.totalManifest;
                    totalSubmitted += data.totalSubmitted;
                    totalbeActed += data.totalbeActed;
                    totalGrant += data.totalGrant;
                    totalDenial += data.totalDenial;
                    totalDismiss += data.totalDismiss;
                    totalWithdraw += data.totalWithdraw;
                    totalReinv += data.totalReinv;
                    totalOther += data.totalOther;
                    totalDisposed += data.totalDisposed;
                    totalWarrant += data.totalWarrant;
                    totalRecall += data.totalRecall;
                    totalNotActed += data.totalNotActed;
                    totalPending += data.totalPending;

                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='center'>"+data.totalCarryOver+"</td>"+
                                "<td class='center'>"+data.totalPSIR+"</td>"+
                                "<td class='center'>"+data.totalManifest+"</td>"+
                                "<td class='center'>"+data.totalSubmitted+"</td>"+
                                "<td class='center b'>"+data.totalbeActed+"</td>"+
                                "<td class='center'>"+data.totalGrant+"</td>"+
                                "<td class='center'>"+data.totalDenial+"</td>"+
                                "<td class='center'>"+data.totalDismiss+"</td>"+
                                "<td class='center'>"+data.totalWithdraw+"</td>"+
                                "<td class='center'>"+data.totalReinv+"</td>"+
                                "<td class='center'>"+data.totalOther+"</td>"+
                                "<td class='center b'>"+data.totalDisposed+"</td>"+
                                "<td class='center'>"+data.totalRecall+"</td>"+
                                "<td class='center'>"+data.totalWarrant+"</td>"+
                                "<td class='center'>"+data.totalNotActed+"</td>"+
                                "<td class='center b'>"+data.totalPending+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);

                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center'>"+totalCarryOver+"</td>"+
                        "<td class='center'>"+totalPSIR+"</td>"+
                        "<td class='center'>"+totalManifest+"</td>"+
                        "<td class='center'>"+totalSubmitted+"</td>"+
                        "<td class='center b'>"+totalbeActed+"</td>"+
                        "<td class='center'>"+totalGrant+"</td>"+
                        "<td class='center'>"+totalDenial+"</td>"+
                        "<td class='center'>"+totalDismiss+"</td>"+
                        "<td class='center'>"+totalWithdraw+"</td>"+
                        "<td class='center'>"+totalReinv+"</td>"+
                        "<td class='center'>"+totalOther+"</td>"+
                        "<td class='center b'>"+totalDisposed+"</td>"+
                        "<td class='center'>"+totalWarrant+"</td>"+
                        "<td class='center'>"+totalRecall+"</td>"+
                        "<td class='center'>"+totalNotActed+"</td>"+
                        "<td class='center b'>"+totalPending+"</td>"+
                    "</tr>"
                );
            }
        });
    }


    var f5_field_office_pi_f3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_pi_f3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var carryOver = 0;
                var totalRcv = 0;
                var totalInvestigation = 0;
                var totalCmpltdPartial = 0;
                var totalFullBlown = 0;
                var totalD = 0;
                var totalActive = 0;
                
                const fieldsToRemove = [
                    "Central Office HQ",
                    "Technical Services Division",
                    "Office of the Administrator",
                    "Office of the Deputy Administrator",
                    "Case Management and Records Division(CMRD)",
                    "Regional Office - Region I",
                    "Regional Office - Region II",
                    "Regional Office - Region III",
                    "Regional Office - Region IV-A",
                    "Regional Office - Region IV-B",
                    "Regional Office - Region V",
                    "Regional Office - Region VI",
                    "Regional Office - Region VII",
                    "Regional Office - Region VIII",
                    "Regional Office - Region IX",
                    "Regional Office - Region X",
                    "Regional Office - Region XI",
                    "Regional Office - Region XII",
                    "Regional Office - Region XIII",
                    "Regional Office - CAR",
                    "Regional Office - NCR",
                ];

                const filteredPayload = result.payload.filter(function(data) {
                    return !fieldsToRemove.includes(data.FIELD);
                });

                filteredPayload.forEach(function(data) {
                    carryOver += data.carryOver;
                    totalRcv += data.totalRcv;
                    totalInvestigation += data.totalInvestigation;
                    totalCmpltdPartial += data.totalCmpltdPartial;
                    totalFullBlown += data.totalFullBlown;
                    totalD += data.totalD;
                    totalActive += data.totalActive;

                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='center b'>"+data.carryOver+"</td>"+
                                "<td class='center b'>"+data.totalRcv+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                                "<td class='center b'>"+data.totalCmpltdPartial+"</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>"+data.totalFullBlown+"</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>"+data.totalD+"</td>"+
                                "<td class='center b'>"+data.totalActive+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+carryOver+"</td>"+
                        "<td class='center b'>"+totalRcv+"</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                        "<td class='center b'>"+totalCmpltdPartial+"</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>"+totalFullBlown+"</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>"+totalD+"</td>"+
                        "<td class='center b'>"+totalActive+"</td>"+
                   "</tr>"
                );
            }
        });
    }

    var f5_field_office_ps_f1_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_ps_f1_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var carryOver = 0;
                var totalRcv = 0;
                var totalRcv2 = 0;
                var totalInvestigation = 0;

                result.payload.forEach(function(data){
                    carryOver += data.carryOver;
                    totalRcv += data.totalRcv;
                    totalRcv2 += data.totalRcv2;
                    totalInvestigation += data.totalInvestigation;

                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='center b'>"+data.carryOver+"</td>"+
                                "<td class='center b'>"+data.totalRcv+"</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>0</td>"+
                                "<td class='center b'>"+data.totalRcv2+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);

                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+carryOver+"</td>"+
                        "<td class='center b'>"+totalRcv+"</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>0</td>"+
                        "<td class='center b'>"+totalRcv2+"</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                   "</tr>"
                );
            }
        });
    }

    var f5_field_office_ps_f1_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_ps_f1_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalInvestigation = 0;
                var totalFullTerm = 0;
                var totalEarlyTerm = 0;
                var totalDiedTerm = 0;
                var totalTerm = 0;
                var totalAbs = 0;
                var totalComm = 0;
                var totalVio = 0;
                var totalOther = 0;
                var totalRevoc = 0;
                var totalTransfer = 0;
                var totalOthers = 0;
                var totalDropped = 0;
                var totalActive = 0;

                result.payload.forEach(function(data){
                    totalInvestigation += data.totalInvestigation;
                    totalFullTerm += data.totalFullTerm;
                    totalEarlyTerm += data.totalEarlyTerm;
                    totalDiedTerm += data.totalDiedTerm;
                    totalTerm += data.totalTerm;
                    totalAbs += data.totalAbs;
                    totalComm += data.totalComm;
                    totalVio += data.totalVio;
                    totalOther += data.totalOther;
                    totalRevoc += data.totalRevoc;
                    totalTransfer += data.totalTransfer;
                    totalOthers += data.totalOthers;
                    totalDropped += data.totalDropped;
                    totalActive += data.totalActive;

                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='center b'>"+data.totalInvestigation+"</td>"+
                                "<td class='center b'>"+data.totalFullTerm+"</td>"+
                                "<td class='center b'>"+data.totalEarlyTerm+"</td>"+
                                "<td class='center b'>"+data.totalDiedTerm+"</td>"+
                                "<td class='center b'>"+data.totalTerm+"</td>"+
                                "<td class='center b'>"+data.totalAbs+"</td>"+
                                "<td class='center b'>"+data.totalComm+"</td>"+
                                "<td class='center b'>"+data.totalVio+"</td>"+
                                "<td class='center b'>"+data.totalOther+"</td>"+
                                "<td class='center b'>"+data.totalRevoc+"</td>"+
                                "<td class='center b'>"+data.totalTransfer+"</td>"+
                                "<td class='center b'>"+data.totalOthers+"</td>"+
                                "<td class='center b'>"+data.totalDropped+"</td>"+
                                "<td class='center b'>"+data.totalActive+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalInvestigation+"</td>"+
                        "<td class='center b'>"+totalFullTerm+"</td>"+
                        "<td class='center b'>"+totalEarlyTerm+"</td>"+
                        "<td class='center b'>"+totalDiedTerm+"</td>"+
                        "<td class='center b'>"+totalTerm+"</td>"+
                        "<td class='center b'>"+totalAbs+"</td>"+
                        "<td class='center b'>"+totalComm+"</td>"+
                        "<td class='center b'>"+totalVio+"</td>"+
                        "<td class='center b'>"+totalOther+"</td>"+
                        "<td class='center b'>"+totalRevoc+"</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+totalOthers+"</td>"+
                        "<td class='center b'>"+totalDropped+"</td>"+
                        "<td class='center b'>"+totalActive+"</td>"+
                   "</tr>"
                );
            }
        });
    }

    var f5_field_office_ps_f1_p3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_ps_f1_p3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalFullTerm = 0;
                var totalEarlyTerm = 0;
                var totalDiedTerm = 0;
                var totalTerm = 0;
                var totalAbs = 0;
                var totalComm = 0;
                var totalVio = 0;
                var totalOther = 0;
                var totalRevoc = 0;
                var totalExt = 0;
                var totalTransfer = 0;
                var totalOthers = 0;
                var totalDropped = 0;
                result.payload.forEach(function(data){
                    totalFullTerm += data.totalFullTerm;
                    totalEarlyTerm += data.totalEarlyTerm;
                    totalDiedTerm += data.totalDiedTerm;
                    totalTerm += data.totalTerm;
                    totalAbs += data.totalAbs;
                    totalComm += data.totalComm;
                    totalVio += data.totalVio;
                    totalOther += data.totalOther;
                    totalRevoc += data.totalRevoc;
                    totalExt += data.totalExt;
                    totalTransfer += data.totalTransfer;
                    totalOthers += data.totalOthers;
                    totalDropped += data.totalDropped;
                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='center b'>"+data.totalFullTerm+"</td>"+
                                "<td class='center b'>"+data.totalEarlyTerm+"</td>"+
                                "<td class='center b'>"+data.totalDiedTerm+"</td>"+
                                "<td class='center b'>"+data.totalTerm+"</td>"+
                                "<td class='center b'>"+data.totalAbs+"</td>"+
                                "<td class='center b'>"+data.totalComm+"</td>"+
                                "<td class='center b'>"+data.totalVio+"</td>"+
                                "<td class='center b'>"+data.totalOther+"</td>"+
                                "<td class='center b'>"+data.totalRevoc+"</td>"+
                                "<td class='center b'>"+data.totalExt+"</td>"+
                                "<td class='center b'>"+data.totalTransfer+"</td>"+
                                "<td class='center b'>"+data.totalOthers+"</td>"+
                                "<td class='center b'>"+data.totalDropped+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalFullTerm+"</td>"+
                        "<td class='center b'>"+totalEarlyTerm+"</td>"+
                        "<td class='center b'>"+totalDiedTerm+"</td>"+
                        "<td class='center b'>"+totalTerm+"</td>"+
                        "<td class='center b'>"+totalAbs+"</td>"+
                        "<td class='center b'>"+totalComm+"</td>"+
                        "<td class='center b'>"+totalVio+"</td>"+
                        "<td class='center b'>"+totalOther+"</td>"+
                        "<td class='center b'>"+totalRevoc+"</td>"+
                        "<td class='center b'>"+totalExt+"</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+totalOthers+"</td>"+
                        "<td class='center b'>"+totalDropped+"</td>"+
                   "</tr>"
                );
            }
        });
    }

    //@TODO
    var f5_field_office_pi_f4 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_pi_f4",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var carryOverInvestigationTotal = 0;
                var rcvInvestigationTotal = 0;
                var totalHandled = 0;
                var actedInvestigationTotalGrant = 0;
                var actedInvestigationTotalDenial = 0;
                var actedInvestigationTotalManifest = 0;
                var actedInvestigationTotalTransfer = 0;
                var totalInvRefref = 0;
                var notactedTotalInvestigationRecalled = 0;
                var notactedTotalInvestigationWarrant = 0;
                var totalRef = 0;
                var total = 0;
                var disRateTotal = 0;
                
                const fieldsToRemove = [
                    "Central Office HQ",
                    "Technical Services Division",
                    "Office of the Administrator",
                    "Office of the Deputy Administrator",
                    "Case Management and Records Division(CMRD)",
                    "Regional Office - Region I",
                    "Regional Office - Region II",
                    "Regional Office - Region III",
                    "Regional Office - Region IV-A",
                    "Regional Office - Region IV-B",
                    "Regional Office - Region V",
                    "Regional Office - Region VI",
                    "Regional Office - Region VII",
                    "Regional Office - Region VIII",
                    "Regional Office - Region IX",
                    "Regional Office - Region X",
                    "Regional Office - Region XI",
                    "Regional Office - Region XII",
                    "Regional Office - Region XIII",
                    "Regional Office - CAR",
                    "Regional Office - NCR",
                ];

                const filteredPayload = result.payload.filter(function(data) {
                    return !fieldsToRemove.includes(data.FIELD);
                });

                filteredPayload.forEach(function(data) {

                    carryOverInvestigationTotal += data.carryOverInvestigationTotal;
                    rcvInvestigationTotal += data.rcvInvestigationTotal;
                    totalHandled += data.totalHandled;
                    actedInvestigationTotalGrant += data.actedInvestigationTotalGrant;
                    actedInvestigationTotalDenial += data.actedInvestigationTotalDenial;
                    actedInvestigationTotalManifest += data.actedInvestigationTotalManifest;
                    actedInvestigationTotalTransfer += data.actedInvestigationTotalTransfer;
                    totalInvRefref += data.totalInvRefref;
                    notactedTotalInvestigationRecalled += data.notactedTotalInvestigationRecalled;
                    notactedTotalInvestigationWarrant += data.notactedTotalInvestigationWarrant;
                    totalRef += data.totalRef;


                    if (data.totalInvRefref != "0") {
                        disRate = (data.totalInvRefref / data.totalHandled) * 100;
                    }else {
                        disRate = "0";
                    }
                    const total = Math.round(disRate) + "%";

                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='b'>"+data.carryOverInvestigationTotal+"</td>"+
                                "<td class='b'>"+data.rcvInvestigationTotal+"</td>"+
                                "<td class='b'>"+data.totalHandled+"</td>"+
                                "<td class='b'>"+data.actedInvestigationTotalGrant+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+data.actedInvestigationTotalDenial+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+data.actedInvestigationTotalManifest+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+0+"</td>"+
                                "<td class='b'>"+data.actedInvestigationTotalTransfer+"</td>"+
                                "<td class='b'>"+data.totalInvRefref+"</td>"+
                                "<td class='b'>"+data.notactedTotalInvestigationRecalled+"</td>"+
                                "<td class='b'>"+data.notactedTotalInvestigationWarrant+"</td>"+
                                "<td class='b'>"+data.totalRef+"</td>"+
                                "<td class='b'>"+total+"</td>"+
                            "</tr>";

                    $(".repbody").append(data);
                })

                if (totalInvRefref != "0") {
                    disRateTotal = (totalInvRefref / totalHandled) * 100;
                }else {
                    disRateTotal = "0";
                }
                const totalTotal = Math.round(disRateTotal) + "%";
                
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b'>"+carryOverInvestigationTotal+"</td>"+
                        "<td class='b'>"+rcvInvestigationTotal+"</td>"+
                        "<td class='b'>"+totalHandled+"</td>"+
                        "<td class='b'>"+actedInvestigationTotalGrant+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+actedInvestigationTotalDenial+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+actedInvestigationTotalManifest+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+0+"</td>"+
                        "<td class='b'>"+actedInvestigationTotalTransfer+"</td>"+
                        "<td class='b'>"+totalInvRefref+"</td>"+
                        "<td class='b'>"+notactedTotalInvestigationRecalled+"</td>"+
                        "<td class='b'>"+notactedTotalInvestigationWarrant+"</td>"+
                        "<td class='b'>"+totalRef+"</td>"+
                        "<td class='b'>"+totalTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }


    var f5_field_office_ps_f2_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_ps_f2_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryTerm = 0;
                var totalCarryRevoc = 0;
                var totalCarryExt = 0;
                var totalCarryTrans = 0;
                var totalCarryOth = 0;
                var totalCarryOver = 0;
                var totalTerm = 0;
                var totalRevoc = 0;
                var totalExt = 0;
                var totalOther = 0;
                var totalTrans = 0;
                var totalSubmitted = 0;
                var totalCasesBeActed = 0;
                result.payload.forEach(function(data){
                    totalCarryTerm += data.totalCarryTerm;
                    totalCarryRevoc += data.totalCarryRevoc;
                    totalCarryExt += data.totalCarryExt;
                    totalCarryTrans += data.totalCarryTrans;
                    totalCarryOth += data.totalCarryOth;
                    totalCarryOver += data.totalCarryOver;
                    totalTerm += data.totalTerm;
                    totalRevoc += data.totalRevoc;
                    totalExt += data.totalExt;
                    totalOther += data.totalOther;
                    totalTrans += data.totalTrans;
                    totalSubmitted += data.totalSubmitted;
                    totalCasesBeActed += data.totalCasesBeActed;

                   data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='center b'>"+data.totalCarryTerm+"</td>"+
                                "<td class='center b'>"+data.totalCarryRevoc+"</td>"+
                                "<td class='center b'>"+data.totalCarryExt+"</td>"+
                                "<td class='center b'>"+data.totalCarryTrans+"</td>"+
                                "<td class='center b'>"+data.totalCarryOth+"</td>"+
                                "<td class='center b'>"+data.totalCarryOver+"</td>"+
                                "<td class='center b'>"+data.totalTerm+"</td>"+
                                "<td class='center b'>"+data.totalRevoc+"</td>"+
                                "<td class='center b'>"+data.totalExt+"</td>"+
                                "<td class='center b'>"+data.totalOther+"</td>"+
                                "<td class='center b'>"+data.totalTrans+"</td>"+
                                "<td class='center b'>"+data.totalSubmitted+"</td>"+
                                "<td class='center b'>"+data.totalCasesBeActed+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalCarryTerm+"</td>"+
                        "<td class='center b'>"+totalCarryRevoc+"</td>"+
                        "<td class='center b'>"+totalCarryExt+"</td>"+
                        "<td class='center b'>"+totalCarryTrans+"</td>"+
                        "<td class='center b'>"+totalCarryOth+"</td>"+
                        "<td class='center b'>"+totalCarryOver+"</td>"+
                        "<td class='center b'>"+totalTerm+"</td>"+
                        "<td class='center b'>"+totalRevoc+"</td>"+
                        "<td class='center b'>"+totalExt+"</td>"+
                        "<td class='center b'>"+totalOther+"</td>"+
                        "<td class='center b'>"+totalTrans+"</td>"+
                        "<td class='center b'>"+totalSubmitted+"</td>"+
                        "<td class='center b'>"+totalCasesBeActed+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f5_field_office_ps_f2_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_ps_f2_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCasesBeActed = 0;
                var totalFullTerm = 0;
                var totalEarlyTerm = 0;
                var totalDiedTerm = 0;
                var totalTerm = 0;
                var totalAbs = 0;
                var totalComm = 0;
                var totalVio = 0;
                var totalOther = 0;
                var totalRevoc = 0;
                var totalExt = 0;
                var totalTransfer = 0;
                var totalOthers = 0;
                var totalDisposed = 0;
                var totalPending = 0;
                result.payload.forEach(function(data){
                    totalCasesBeActed += data.totalCasesBeActed;
                    totalFullTerm += data.totalFullTerm;
                    totalEarlyTerm += data.totalEarlyTerm;
                    totalDiedTerm += data.totalDiedTerm;
                    totalTerm += data.totalTerm;
                    totalAbs += data.totalAbs;
                    totalComm += data.totalComm;
                    totalVio += data.totalVio;
                    totalOther += data.totalOther;
                    totalRevoc += data.totalRevoc;
                    totalExt += data.totalExt;
                    totalTransfer += data.totalTransfer;
                    totalOthers += data.totalOthers;
                    totalDisposed += data.totalDisposed;
                    totalPending += data.totalPending;

                    data = "<tr>"+
                                "<td class='b'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCasesBeActed+"</td>"+
                                "<td class='b center'>"+data.totalFullTerm+"</td>"+
                                "<td class='b center'>"+data.totalEarlyTerm+"</td>"+
                                "<td class='b center'>"+data.totalDiedTerm+"</td>"+
                                "<td class='b center'>"+data.totalTerm+"</td>"+
                                "<td class='b center'>"+data.totalAbs+"</td>"+
                                "<td class='b center'>"+data.totalComm+"</td>"+
                                "<td class='b center'>"+data.totalVio+"</td>"+
                                "<td class='b center'>"+data.totalOther+"</td>"+
                                "<td class='b center'>"+data.totalRevoc+"</td>"+
                                "<td class='b center'>"+data.totalExt+"</td>"+
                                "<td class='b center'>"+data.totalTransfer+"</td>"+
                                "<td class='b center'>"+data.totalOthers+"</td>"+
                                "<td class='b center'>"+data.totalDisposed+"</td>"+
                                "<td class='b center'>"+data.totalPending+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='center b'>"+totalCasesBeActed+"</td>"+
                        "<td class='center b'>"+totalFullTerm+"</td>"+
                        "<td class='center b'>"+totalEarlyTerm+"</td>"+
                        "<td class='center b'>"+totalDiedTerm+"</td>"+
                        "<td class='center b'>"+totalTerm+"</td>"+
                        "<td class='center b'>"+totalAbs+"</td>"+
                        "<td class='center b'>"+totalComm+"</td>"+
                        "<td class='center b'>"+totalVio+"</td>"+
                        "<td class='center b'>"+totalOther+"</td>"+
                        "<td class='center b'>"+totalRevoc+"</td>"+
                        "<td class='center b'>"+totalExt+"</td>"+
                        "<td class='center b'>"+totalTransfer+"</td>"+
                        "<td class='center b'>"+totalOthers+"</td>"+
                        "<td class='center b'>"+totalDisposed+"</td>"+
                        "<td class='center b'>"+totalPending+"</td>"+
                    "</tr>"
                );
            }   
        });
    }


    var f5_field_office_ps_f3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f5_field_office_ps_f3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalRcv = 0;
                var totalCasesHandled = 0;
                var totalCompltd = 0;
                var totalCourtesy = 0;
                result.payload.forEach(function(data){
                    totalCarryOver += data.totalCarryOver;
                    totalRcv += data.totalRcv;
                    totalCasesHandled += data.totalCasesHandled;
                    totalCompltd += data.totalCompltd;
                    totalCourtesy += data.totalCourtesy;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOver+"</td>"+
                                "<td class='b center'>"+data.totalRcv+"</td>"+
                                "<td class='b center'>"+data.totalCasesHandled+"</td>"+
                                "<td class='b center'>"+data.totalCompltd+"</td>"+
                                "<td class='b center'>"+data.totalCourtesy+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOver+"</td>"+
                        "<td class='b center'>"+totalRcv+"</td>"+
                        "<td class='b center'>"+totalCasesHandled+"</td>"+
                        "<td class='b center'>"+totalCompltd+"</td>"+
                        "<td class='b center'>"+totalCourtesy+"</td>"+
                    "</tr>"
                );
            }
        });
    }

        //REGIONAL -- FORM 21
    var f21_field_office_ppi_f1_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_field_office_ppi_f1_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOver = 0;
                var totalRcv = 0;
                var totalCasesHandled = 0;

                result.payload.forEach(function(data){
                    totalCarryOver += data.totalCarryOver;
                    totalRcv += data.totalRcv;
                    totalCasesHandled += data.totalCasesHandled;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOver+"</td>"+
                                "<td class='b center'>"+data.totalRcv+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.totalRcv+"</td>"+
                                "<td class='b center'>"+data.totalCasesHandled+"</td>"
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOver+"</td>"+
                        "<td class='b center'>"+totalRcv+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+totalRcv+"</td>"+
                        "<td class='b center'>"+totalCasesHandled+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_ppi_f1_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_field_office_ppi_f1_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalGrant = 0;
                var totalDenial = 0;
                var commutationTotalGrant = 0;
                var commutationTotalDenial = 0;
                var absoluteTotalGrant = 0;
                var totalppir = 0;

                result.payload.forEach(function(data){
                    totalGrant += data.totalGrant;
                    totalDenial += data.totalDenial;
                    commutationTotalGrant += data.commutationTotalGrant;
                    commutationTotalDenial += data.commutationTotalDenial;
                    absoluteTotalGrant += data.absoluteTotalGrant;
                    totalppir += data.totalppir;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalGrant+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.totalDenial+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.commutationTotalGrant+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.commutationTotalDenial+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.absoluteTotalGrant+"</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>0</td>"+
                                "<td class='b center'>"+data.totalppir+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalGrant+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+totalDenial+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+commutationTotalGrant+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+commutationTotalDenial+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+absoluteTotalGrant+"</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>0</td>"+
                        "<td class='b center'>"+totalppir+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_ppi_f1_p3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_field_office_ppi_f1_p3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalInvestigationReport = 0;
                var totalTransfer = 0;
                var totalRefOthers = 0;
                var totalActed = 0;
                var totalActive = 0;

                result.payload.forEach(function(data){
                    totalInvestigationReport += data.totalInvestigationReport;
                    totalTransfer += data.totalTransfer;
                    totalRefOthers += data.totalRefOthers;
                    totalActed += data.totalActed;
                    totalActive += data.totalActive;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalInvestigationReport+"</td>"+
                                "<td class='b center'>"+data.totalTransfer+"</td>"+
                                "<td class='b center'>"+data.totalRefOthers+"</td>"+
                                "<td class='b center'>"+data.totalActed+"</td>" +
                                "<td class='b center'>"+data.totalActive+"</td>" + 
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalInvestigationReport+"</td>"+
                        "<td class='b center'>"+totalTransfer+"</td>"+
                        "<td class='b center'>"+totalRefOthers+"</td>"+
                        "<td class='b center'>"+totalActed+"</td>" +
                        "<td class='b center'>"+totalActive+"</td>" + 
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_ppi_f3 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_field_office_ppi_f3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverCI = 0;
                var totalRcvCI = 0;
                var totalCountCI = 0;
                var totalCmpltdCI = 0;
                var totalCountActiveCI = 0;

                result.payload.forEach(function(data){
                    totalCarryOverCI += data.totalCarryOverCI;
                    totalRcvCI += data.totalRcvCI;
                    totalCountCI += data.totalCountCI;
                    totalCmpltdCI += data.totalCmpltdCI;
                    totalCountActiveCI += data.totalCountActiveCI;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverCI+"</td>"+
                                "<td class='b center'>"+data.totalRcvCI+"</td>"+
                                "<td class='b center'>"+data.totalCountCI+"</td>"+
                                "<td class='b center'>"+data.totalCmpltdCI+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalCountActiveCI+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverCI+"</td>"+
                        "<td class='b center'>"+totalRcvCI+"</td>"+
                        "<td class='b center'>"+totalCountCI+"</td>"+
                        "<td class='b center'>"+totalCmpltdCI+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalCountActiveCI+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    
    var f21_field_office_ppi_f4_p1 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_field_office_ppi_f4_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverInvestigation = 0;
                var totalRcvTotalInvestigation = 0;
                var totalCasesHandled = 0;
                var totalRefParoleGrantActed = 0;
                var totalRefParoleDeniedActed = 0;

                var totalRefCommGrantActed = 0;
                var totalRefCommDeniedActed = 0;
                var totalRefCondGrantActed = 0;
                var totalRefCondDeniedActed = 0;

                result.payload.forEach(function(data){
                    totalCarryOverInvestigation += data.totalCarryOverInvestigation;
                    totalRcvTotalInvestigation += data.totalRcvTotalInvestigation;
                    totalCasesHandled += data.totalCasesHandled;
                    totalRefParoleGrantActed += data.totalRefParoleGrantActed;
                    totalRefParoleDeniedActed += data.totalRefParoleDeniedActed;
                    totalRefCommGrantActed += data.totalRefCommGrantActed;
                    totalRefCommDeniedActed += data.totalRefCommDeniedActed;
                    totalRefCondGrantActed += data.totalRefCondGrantActed;
                    totalRefCondDeniedActed += data.totalRefCondDeniedActed;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverInvestigation+"</td>"+
                                "<td class='b center'>"+data.totalRcvTotalInvestigation+"</td>"+
                                "<td class='b center'>"+data.totalCasesHandled+"</td>"+
                                "<td class='b center'>"+data.totalRefParoleGrantActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefParoleDeniedActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefCommGrantActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefCommDeniedActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefCondGrantActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefCondDeniedActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverInvestigation+"</td>"+
                        "<td class='b center'>"+totalRcvTotalInvestigation+"</td>"+
                        "<td class='b center'>"+totalCasesHandled+"</td>"+
                        "<td class='b center'>"+totalRefParoleGrantActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefParoleDeniedActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefCommGrantActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefCommDeniedActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefCondGrantActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefCondDeniedActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_field_office_ppi_f4_p2 = function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = { 
            method : "f21_field_office_ppi_f4_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalRefAbsGrantActed = 0;
                var totalRefAbsDeniedActed = 0;
                var totalPPIR = 0;
                var totalTransferredSubmitted = 0;
                var totalRefOthers = 0;
                var totalInvRef = 0;

                result.payload.forEach(function(data){
                    totalRefAbsGrantActed += data.totalRefAbsGrantActed;
                    totalRefAbsDeniedActed += data.totalRefAbsDeniedActed;
                    totalPPIR += data.totalPPIR;
                    totalTransferredSubmitted += data.totalTransferredSubmitted;
                    totalRefOthers += data.totalRefOthers;
                    totalInvRef += data.totalInvRef;

                    var disRate = 0;
                    if (data.totalInvRef != "0") {
                        disRate = (data.totalInvRef / data.totalPPIR) * 100;
                    }else {
                        disRate = "0";
                    }
                    const total = Math.round(disRate) + "%";

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalRefAbsGrantActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefAbsDeniedActed+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalPPIR+"</td>"+
                                "<td class='b center'>"+data.totalTransferredSubmitted+"</td>"+
                                "<td class='b center'>"+data.totalRefOthers+"</td>"+
                                "<td class='b center'>"+data.totalInvRef+"</td>"+
                                "<td class='b center'>"+total+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })

                var disRateTotal = 0;
                if (totalInvRef != "0") {
                    disRateTotal = (totalInvRef / totalPPIR) * 100;
                }else {
                    disRateTotal = "0";
                }
                const totalTotal = Math.round(disRateTotal) + "%";
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalRefAbsGrantActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefAbsDeniedActed+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalPPIR+"</td>"+
                        "<td class='b center'>"+totalTransferredSubmitted+"</td>"+
                        "<td class='b center'>"+totalRefOthers+"</td>"+
                        "<td class='b center'>"+totalInvRef+"</td>"+
                        "<td class='b center'>"+totalTotal+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_ppi_f2_p1= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_ppi_f2_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverPendingResolution = 0;
                var totalParole = 0;
                var totalCommutation = 0;
                var absoluteTotalGrant = 0;
                var totalRefOthers = 0;
                var totalReportSubmitted = 0;
                var totalCasestobeActedUpon = 0;

                result.payload.forEach(function(data){
                    totalCarryOverPendingResolution += data.totalCarryOverPendingResolution;
                    totalParole += data.totalParole;
                    totalCommutation += data.totalCommutation;
                    absoluteTotalGrant += data.absoluteTotalGrant;
                    totalRefOthers += data.totalRefOthers;
                    totalReportSubmitted += data.totalReportSubmitted;
                    totalCasestobeActedUpon += data.totalCasestobeActedUpon;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingResolution+"</td>"+
                                "<td class='b center'>"+data.totalParole+"</td>"+
                                "<td class='b center'>"+data.totalCommutation+"</td>"+
                                "<td class='b center'>"+0+"</td>" +
                                "<td class='b center'>"+data.absoluteTotalGrant+"</td>" + 
                                "<td class='b center'>"+data.totalRefOthers+"</td>" + 
                                "<td class='b center'>"+data.totalReportSubmitted+"</td>" + 
                                "<td class='b center'>"+data.totalCasestobeActedUpon+"</td>" + 
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverPendingResolution+"</td>"+
                        "<td class='b center'>"+totalParole+"</td>"+
                        "<td class='b center'>"+totalCommutation+"</td>"+
                        "<td class='b center'>"+0+"</td>" +
                        "<td class='b center'>"+absoluteTotalGrant+"</td>" + 
                        "<td class='b center'>"+totalRefOthers+"</td>" + 
                        "<td class='b center'>"+totalReportSubmitted+"</td>" + 
                        "<td class='b center'>"+totalCasestobeActedUpon+"</td>" + 
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_ppi_f2_p2= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_ppi_f2_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCasesResolvedGrantedParole = 0;
                var totalCasesResolvedGrantedComm = 0;
                var totalCasesResolvedGrantedCond = 0;
                var totalCasesResolvedGrantedAbs = 0;
                var totalCasesResolvedGranted = 0;
                var totalCasesResolvedDeniedParole = 0;
                var totalCasesResolvedDeniedComm = 0;
                var totalCasesResolvedDeniedCond = 0;
                var totalCasesResolvedDeniedAbs = 0;
                var totalCasesResolvedDenied = 0;
                var totalCasesResolvedCancelledParole = 0;
                var totalCasesResolvedCancelledComm = 0;
                var totalCasesResolvedCancelledCond = 0;
                var totalCasesResolvedCancelled = 0;
                var totalCasesResolvedDied = 0;
                var totalCasesResolvedOther = 0;
                var totalCasesResolvedCount = 0;
                var totalCasesPending = 0;

                result.payload.forEach(function(data){
                    totalCasesResolvedGrantedParole += data.totalCasesResolvedGrantedParole;
                    totalCasesResolvedGrantedComm += data.totalCasesResolvedGrantedComm;
                    totalCasesResolvedGrantedCond += data.totalCasesResolvedGrantedCond;
                    totalCasesResolvedGrantedAbs += data.totalCasesResolvedGrantedAbs;
                    totalCasesResolvedGranted += data.totalCasesResolvedGranted;
                    totalCasesResolvedDeniedParole += data.totalCasesResolvedDeniedParole;
                    totalCasesResolvedDeniedComm += data.totalCasesResolvedDeniedComm;
                    totalCasesResolvedDeniedCond += data.totalCasesResolvedDeniedCond;
                    totalCasesResolvedDeniedAbs += data.totalCasesResolvedDeniedAbs;
                    totalCasesResolvedDenied += data.totalCasesResolvedDenied;
                    totalCasesResolvedCancelledParole += data.totalCasesResolvedCancelledParole;
                    totalCasesResolvedCancelledComm += data.totalCasesResolvedCancelledComm;
                    totalCasesResolvedCancelledCond += data.totalCasesResolvedCancelledCond;
                    totalCasesResolvedCancelled += data.totalCasesResolvedCancelled;
                    totalCasesResolvedDied += data.totalCasesResolvedDied;
                    totalCasesResolvedOther += data.totalCasesResolvedOther;
                    totalCasesResolvedCount += data.totalCasesResolvedCount;
                    totalCasesPending += data.totalCasesPending;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedGrantedParole+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedGrantedComm+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedGrantedCond+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedGrantedAbs+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedGranted+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeniedParole+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeniedComm+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeniedCond+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeniedAbs+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDenied+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedCancelledParole+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedCancelledComm+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedCancelledCond+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedCancelled+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDied+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOther+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedCount+"</td>"+
                                "<td class='b center'>"+data.totalCasesPending+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCasesResolvedGrantedParole+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedGrantedComm+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedGrantedCond+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedGrantedAbs+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedGranted+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeniedParole+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeniedComm+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeniedCond+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeniedAbs+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDenied+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedCancelledParole+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedCancelledComm+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedCancelledCond+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedCancelled+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDied+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOther+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedCount+"</td>"+
                        "<td class='b center'>"+totalCasesPending+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_pr_pd_f1_p1= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_pr_pd_f1_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverSupvParolIV = 0;
                var totalCarryOverSupvPardonIV = 0;
                var totalCarryOverSupvIV = 0;
                var totalRefRcvSupvParol = 0;
                var totalRefRcvSupvPardon = 0;
                var totalRefRcvSupv = 0;
                var totalSupervCasesHandledPR = 0;
                var totalSupervCasesHandledPD = 0;
                var totalSupervCasesHandled = 0;

                result.payload.forEach(function(data){
                    totalCarryOverSupvParolIV += data.totalCarryOverSupvParolIV;
                    totalCarryOverSupvPardonIV += data.totalCarryOverSupvPardonIV;
                    totalCarryOverSupvIV += data.totalCarryOverSupvIV;
                    totalRefRcvSupvParol += data.totalRefRcvSupvParol;
                    totalRefRcvSupvPardon += data.totalRefRcvSupvPardon;
                    totalRefRcvSupv += data.totalRefRcvSupv;
                    totalSupervCasesHandledPR += data.totalSupervCasesHandledPR;
                    totalSupervCasesHandledPD += data.totalSupervCasesHandledPD;
                    totalSupervCasesHandled += data.totalSupervCasesHandled;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvParolIV+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvPardonIV+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvIV+"</td>"+
                                "<td class='b center'>"+data.totalRefRcvSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalRefRcvSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalRefRcvSupv+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalRefRcvSupv+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandledPR+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandledPD+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandled+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverSupvParolIV+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupvPardonIV+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupvIV+"</td>"+
                        "<td class='b center'>"+totalRefRcvSupvParol+"</td>"+
                        "<td class='b center'>"+totalRefRcvSupvPardon+"</td>"+
                        "<td class='b center'>"+totalRefRcvSupv+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalRefRcvSupv+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandledPR+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandledPD+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandled+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_pr_pd_f1_p2= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_pr_pd_f1_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalSupervCasesHandledPR = 0;
                var totalSupervCasesHandledPD = 0;
                var totalSupervCasesHandled = 0;
                var totalCasesResolvedFinalParol = 0;
                var totalCasesResolvedFinalPardon = 0;
                var totalCasesResolvedFinal = 0;
                var totalCasesResolvedArrestParol = 0;
                var totalCasesResolvedArrestPardon = 0;
                var totalCasesResolvedArrest = 0;
                var totalCasesResolvedDeathParol = 0;
                var totalCasesResolvedDeathPardon = 0;
                var totalCasesResolvedDeath = 0;
                var totalCasesResolvedRegionalParol = 0;
                var totalCasesResolvedRegionalPardon = 0;
                var totalCasesResolvedRegional = 0;
                var totalCasesResolvedOtherParol = 0;
                var totalCasesResolvedOtherPardon = 0;
                var totalCasesResolvedPSOther = 0;
                var totalCasesDropPR = 0;
                var totalCasesDropPD = 0;
                var totalCasesDrop = 0;
                var totalActiveSuperVisionPR = 0;
                var totalActiveSuperVisionPD = 0;
                var totalActiveSuperVision = 0;

                result.payload.forEach(function(data){
                    totalSupervCasesHandledPR += data.totalSupervCasesHandledPR;
                    totalSupervCasesHandledPD += data.totalSupervCasesHandledPD;
                    totalSupervCasesHandled += data.totalSupervCasesHandled;
                    totalCasesResolvedFinalParol += data.totalCasesResolvedFinalParol;
                    totalCasesResolvedFinalPardon += data.totalCasesResolvedFinalPardon;
                    totalCasesResolvedFinal += data.totalCasesResolvedFinal;
                    totalCasesResolvedArrestParol += data.totalCasesResolvedArrestParol;
                    totalCasesResolvedArrestPardon += data.totalCasesResolvedArrestPardon;
                    totalCasesResolvedArrest += data.totalCasesResolvedArrest;
                    totalCasesResolvedDeathParol += data.totalCasesResolvedDeathParol;
                    totalCasesResolvedDeathPardon += data.totalCasesResolvedDeathPardon;
                    totalCasesResolvedDeath += data.totalCasesResolvedDeath;
                    totalCasesResolvedRegionalParol += data.totalCasesResolvedRegionalParol;
                    totalCasesResolvedRegionalPardon += data.totalCasesResolvedRegionalPardon;
                    totalCasesResolvedRegional += data.totalCasesResolvedRegional;
                    totalCasesResolvedOtherParol += data.totalCasesResolvedOtherParol;
                    totalCasesResolvedOtherPardon += data.totalCasesResolvedOtherPardon;
                    totalCasesResolvedPSOther += data.totalCasesResolvedPSOther;
                    totalCasesDropPR += data.totalCasesDropPR;
                    totalCasesDropPD += data.totalCasesDropPD;
                    totalCasesDrop += data.totalCasesDrop;
                    totalActiveSuperVisionPR += data.totalActiveSuperVisionPR;
                    totalActiveSuperVisionPD += data.totalActiveSuperVisionPD;
                    totalActiveSuperVision += data.totalActiveSuperVision;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandledPR+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandledPD+"</td>"+
                                "<td class='b center'>"+data.totalSupervCasesHandled+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinal+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrest+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeath+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegional+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedPSOther+"</td>"+
                                "<td class='b center'>"+data.totalCasesDropPR+"</td>"+
                                "<td class='b center'>"+data.totalCasesDropPD+"</td>"+
                                "<td class='b center'>"+data.totalCasesDrop+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVisionPR+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVisionPD+"</td>"+
                                "<td class='b center'>"+data.totalActiveSuperVision+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalSupervCasesHandledPR+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandledPD+"</td>"+
                        "<td class='b center'>"+totalSupervCasesHandled+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinal+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrest+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeath+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegional+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedPSOther+"</td>"+
                        "<td class='b center'>"+totalCasesDropPR+"</td>"+
                        "<td class='b center'>"+totalCasesDropPD+"</td>"+
                        "<td class='b center'>"+totalCasesDrop+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVisionPR+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVisionPD+"</td>"+
                        "<td class='b center'>"+totalActiveSuperVision+"</td>"+

                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_pr_pd_f1_p3= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_pr_pd_f1_p3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var SupvActedSummaryParol = 0;
                var SupvActedSummaryPardon = 0;
                var SupvActedSummaryTotal = 0;
                var SupvActedInfraParol = 0;
                var SupvActedInfraPardon = 0;
                var SupvActedInfraTotal = 0;
                var SupvActedDeathParol = 0;
                var SupvActedDeathPardon = 0;
                var SupvActedDeathTotal = 0;
                var SupvActedOtherParol = 0;
                var SupvActedOtherPardon = 0;
                var SupvActedOtherTotal = 0;
                var totalPRSB = 0;
                var totalPR = 0;
                var totalPD = 0;
                var totalPDandPR = 0;
                var totalCasesActedUponByPPO = 0;

                result.payload.forEach(function(data){
                    SupvActedSummaryParol += data.SupvActedSummaryParol;
                    SupvActedSummaryPardon += data.SupvActedSummaryPardon;
                    SupvActedSummaryTotal += data.SupvActedSummaryTotal;
                    SupvActedInfraParol += data.SupvActedInfraParol;
                    SupvActedInfraPardon += data.SupvActedInfraPardon;
                    SupvActedInfraTotal += data.SupvActedInfraTotal;
                    SupvActedDeathParol += data.SupvActedDeathParol;
                    SupvActedDeathPardon += data.SupvActedDeathPardon;
                    SupvActedDeathTotal += data.SupvActedDeathTotal;
                    SupvActedOtherParol += data.SupvActedOtherParol;
                    SupvActedOtherPardon += data.SupvActedOtherPardon;
                    SupvActedOtherTotal += data.SupvActedOtherTotal;
                    totalPRSB += data.totalPRSB;
                    totalPR += data.totalPR;
                    totalPD += data.totalPD;
                    totalPDandPR += data.totalPDandPR;
                    totalCasesActedUponByPPO += data.totalCasesActedUponByPPO;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherTotal+"</td>"+
                                "<td class='b center'>"+data.totalPRSB+"</td>"+
                                "<td class='b center'>"+data.totalPR+"</td>"+
                                "<td class='b center'>"+data.totalPD+"</td>"+
                                "<td class='b center'>"+data.totalPDandPR+"</td>"+
                                "<td class='b center'>"+data.totalCasesActedUponByPPO+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+SupvActedSummaryParol+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryPardon+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryTotal+"</td>"+
                        "<td class='b center'>"+SupvActedInfraParol+"</td>"+
                        "<td class='b center'>"+SupvActedInfraPardon+"</td>"+
                        "<td class='b center'>"+SupvActedInfraTotal+"</td>"+
                        "<td class='b center'>"+SupvActedDeathParol+"</td>"+
                        "<td class='b center'>"+SupvActedDeathPardon+"</td>"+
                        "<td class='b center'>"+SupvActedDeathTotal+"</td>"+
                        "<td class='b center'>"+SupvActedOtherParol+"</td>"+
                        "<td class='b center'>"+SupvActedOtherPardon+"</td>"+
                        "<td class='b center'>"+SupvActedOtherTotal+"</td>"+
                        "<td class='b center'>"+totalPRSB+"</td>"+
                        "<td class='b center'>"+totalPR+"</td>"+
                        "<td class='b center'>"+totalPD+"</td>"+
                        "<td class='b center'>"+totalPDandPR+"</td>"+
                        "<td class='b center'>"+totalCasesActedUponByPPO+"</td>"+
                    "</tr>"
                );
            }
        });
    }

    var f21_field_office_pr_pd_f2_p1= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_pr_pd_f2_p1",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverPendingParol = 0;
                var totalCarryOverPendingPardon = 0;
                var totalCarryOverPending = 0;
                var SupvActedSummaryParol = 0;
                var SupvActedSummaryPardon = 0;
                var SupvActedSummaryTotal = 0;
                var SupvActedInfraParol = 0;
                var SupvActedInfraPardon = 0;
                var SupvActedInfraTotal = 0;
                var SupvActedDeathParol = 0;
                var SupvActedDeathPardon = 0;
                var SupvActedDeathTotal = 0;
                var SupvActedOtherParol = 0;
                var SupvActedOtherPardon = 0;
                var SupvActedOtherTotal = 0;
                var totalReportSubmitted = 0;
                var totalPR = 0;
                var totalPD = 0;
                var totalPRandPD = 0;

                result.payload.forEach(function(data){
                    totalCarryOverPendingParol += data.totalCarryOverPendingParol;
                    totalCarryOverPendingPardon += data.totalCarryOverPendingPardon;
                    totalCarryOverPending += data.totalCarryOverPending;
                    SupvActedSummaryParol += data.SupvActedSummaryParol;
                    SupvActedSummaryPardon += data.SupvActedSummaryPardon;
                    SupvActedSummaryTotal += data.SupvActedSummaryTotal;
                    SupvActedInfraParol += data.SupvActedInfraParol;
                    SupvActedInfraPardon += data.SupvActedInfraPardon;
                    SupvActedInfraTotal += data.SupvActedInfraTotal;
                    SupvActedDeathParol += data.SupvActedDeathParol;
                    SupvActedDeathPardon += data.SupvActedDeathPardon;
                    SupvActedDeathTotal += data.SupvActedDeathTotal;
                    SupvActedOtherParol += data.SupvActedOtherParol;
                    SupvActedOtherPardon += data.SupvActedOtherPardon;
                    SupvActedOtherTotal += data.SupvActedOtherTotal;
                    totalReportSubmitted += data.totalReportSubmitted;
                    totalPR += data.totalPR;
                    totalPD += data.totalPD;
                    totalPRandPD += data.totalPRandPD;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingParol+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingPardon+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPending+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedSummaryTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedInfraTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedDeathTotal+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherParol+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.SupvActedOtherTotal+"</td>"+
                                "<td class='b center'>"+data.totalReportSubmitted+"</td>"+
                                "<td class='b center'>"+data.totalPR+"</td>"+
                                "<td class='b center'>"+data.totalPD+"</td>"+
                                "<td class='b center'>"+data.totalPRandPD+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverPendingParol+"</td>"+
                        "<td class='b center'>"+totalCarryOverPendingPardon+"</td>"+
                        "<td class='b center'>"+totalCarryOverPending+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryParol+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryPardon+"</td>"+
                        "<td class='b center'>"+SupvActedSummaryTotal+"</td>"+
                        "<td class='b center'>"+SupvActedInfraParol+"</td>"+
                        "<td class='b center'>"+SupvActedInfraPardon+"</td>"+
                        "<td class='b center'>"+SupvActedInfraTotal+"</td>"+
                        "<td class='b center'>"+SupvActedDeathParol+"</td>"+
                        "<td class='b center'>"+SupvActedDeathPardon+"</td>"+
                        "<td class='b center'>"+SupvActedDeathTotal+"</td>"+
                        "<td class='b center'>"+SupvActedOtherParol+"</td>"+
                        "<td class='b center'>"+SupvActedOtherPardon+"</td>"+
                        "<td class='b center'>"+SupvActedOtherTotal+"</td>"+
                        "<td class='b center'>"+totalReportSubmitted+"</td>"+
                        "<td class='b center'>"+totalPR+"</td>"+
                        "<td class='b center'>"+totalPD+"</td>"+
                        "<td class='b center'>"+totalPRandPD+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_pr_pd_f2_p2= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_pr_pd_f2_p2",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalPR = 0;
                var totalPD = 0;
                var totalPRandPD = 0;
                var totalCasesResolvedFinalParol = 0;
                var totalCasesResolvedFinalPardon = 0;
                var totalCasesResolvedFinal = 0;
                var totalCasesResolvedArrestParol = 0;
                var totalCasesResolvedArrestPardon = 0;
                var totalCasesResolvedArrest = 0;
                var totalCasesResolvedDeathParol = 0;
                var totalCasesResolvedDeathPardon = 0;
                var totalCasesResolvedDeath = 0;
                var totalCasesResolvedOtherParol = 0;
                var totalCasesResolvedOtherPardon = 0;
                var totalCasesResolvedPSOther = 0;
                var totalPRCasesResolved = 0;
                var totalPDCasesResolved = 0;
                var totalCasesResolved = 0;
                var totalCasesPendingPR = 0;
                var totalCasesPendingPD = 0;
                var totalCasesPending = 0;
                result.payload.forEach(function(data){
                    totalPR += data.totalPR;
                    totalPD += data.totalPD;
                    totalPRandPD += data.totalPRandPD;
                    totalCasesResolvedFinalParol += data.totalCasesResolvedFinalParol;
                    totalCasesResolvedFinalPardon += data.totalCasesResolvedFinalPardon;
                    totalCasesResolvedFinal += data.totalCasesResolvedFinal;
                    totalCasesResolvedArrestParol += data.totalCasesResolvedArrestParol;
                    totalCasesResolvedArrestPardon += data.totalCasesResolvedArrestPardon;
                    totalCasesResolvedArrest += data.totalCasesResolvedArrest;
                    totalCasesResolvedDeathParol += data.totalCasesResolvedDeathParol;
                    totalCasesResolvedDeathPardon += data.totalCasesResolvedDeathPardon;
                    totalCasesResolvedDeath += data.totalCasesResolvedDeath;
                    totalCasesResolvedOtherParol += data.totalCasesResolvedOtherParol;
                    totalCasesResolvedOtherPardon += data.totalCasesResolvedOtherPardon;
                    totalCasesResolvedPSOther += data.totalCasesResolvedPSOther;
                    totalPRCasesResolved += data.totalPRCasesResolved;
                    totalPDCasesResolved += data.totalPDCasesResolved;
                    totalCasesResolved += data.totalCasesResolved;
                    totalCasesPendingPR += data.totalCasesPendingPR;
                    totalCasesPendingPD += data.totalCasesPendingPD;
                    totalCasesPending += data.totalCasesPending;

                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalPR+"</td>"+
                                "<td class='b center'>"+data.totalPD+"</td>"+
                                "<td class='b center'>"+data.totalPRandPD+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedFinal+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrestPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedArrest+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeathPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedDeath+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedOtherPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedPSOther+"</td>"+
                                "<td class='b center'>"+data.totalPRCasesResolved+"</td>"+
                                "<td class='b center'>"+data.totalPDCasesResolved+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolved+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingPR+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingPD+"</td>"+
                                "<td class='b center'>"+data.totalCasesPending+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalPR+"</td>"+
                        "<td class='b center'>"+totalPD+"</td>"+
                        "<td class='b center'>"+totalPRandPD+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedFinal+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrestPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedArrest+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeathPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedDeath+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedOtherPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedPSOther+"</td>"+
                        "<td class='b center'>"+totalPRCasesResolved+"</td>"+
                        "<td class='b center'>"+totalPDCasesResolved+"</td>"+
                        "<td class='b center'>"+totalCasesResolved+"</td>"+
                        "<td class='b center'>"+totalCasesPendingPR+"</td>"+
                        "<td class='b center'>"+totalCasesPendingPD+"</td>"+
                        "<td class='b center'>"+totalCasesPending+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_pr_pd_f3= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_pr_pd_f3",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverPendingRegionalParol = 0;
                var totalCarryOverPendingRegionalPardon = 0;
                var totalCarryOverPendingRegional = 0;
                var totalReportSubmittedRegionalParol = 0;
                var totalReportSubmittedRegionalPardon = 0;
                var totalReportSubmittedRegional = 0;
                var totalCasesResolvedRegionalParol = 0;
                var totalCasesResolvedRegionalPardon = 0;
                var totalCasesResolvedRegional = 0;
                var totalCasesPendingResolutionRegionalParol = 0;
                var totalCasesPendingResolutionRegionalPardon = 0;
                var totalCasesPendingResolutionRegional = 0;
                result.payload.forEach(function(data){
                    totalCarryOverPendingRegionalParol += data.totalCarryOverPendingRegionalParol;
                    totalCarryOverPendingRegionalPardon += data.totalCarryOverPendingRegionalPardon;
                    totalCarryOverPendingRegional += data.totalCarryOverPendingRegional;
                    totalReportSubmittedRegionalParol += data.totalReportSubmittedRegionalParol;
                    totalReportSubmittedRegionalPardon += data.totalReportSubmittedRegionalPardon;
                    totalReportSubmittedRegional += data.totalReportSubmittedRegional;
                    totalCasesResolvedRegionalParol += data.totalCasesResolvedRegionalParol;
                    totalCasesResolvedRegionalPardon += data.totalCasesResolvedRegionalPardon;
                    totalCasesResolvedRegional += data.totalCasesResolvedRegional;
                    totalCasesPendingResolutionRegionalParol += data.totalCasesPendingResolutionRegionalParol;
                    totalCasesPendingResolutionRegionalPardon += data.totalCasesPendingResolutionRegionalPardon;
                    totalCasesPendingResolutionRegional += data.totalCasesPendingResolutionRegional;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverPendingRegional+"</td>"+
                                "<td class='b center'>"+data.totalReportSubmittedRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalReportSubmittedRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalReportSubmittedRegional+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+0+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesResolvedRegional+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingResolutionRegionalParol+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingResolutionRegionalPardon+"</td>"+
                                "<td class='b center'>"+data.totalCasesPendingResolutionRegional+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverPendingRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCarryOverPendingRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCarryOverPendingRegional+"</td>"+
                        "<td class='b center'>"+totalReportSubmittedRegionalParol+"</td>"+
                        "<td class='b center'>"+totalReportSubmittedRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalReportSubmittedRegional+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+0+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesResolvedRegional+"</td>"+
                        "<td class='b center'>"+totalCasesPendingResolutionRegionalParol+"</td>"+
                        "<td class='b center'>"+totalCasesPendingResolutionRegionalPardon+"</td>"+
                        "<td class='b center'>"+totalCasesPendingResolutionRegional+"</td>"+
                    "</tr>"
                );
            }
        });
    }
    var f21_field_office_pr_pd_f4= function(){
        const eym = $.wms.urlParam('date');
        const d = new Date(eym);
        const Y_M = d.getFullYear()+'-01';
        var payload = {
            method : "f21_field_office_pr_pd_f4",
            Y_M : Y_M,
            END_Y_M: $.wms.urlParam('date'),
            REGION : $.wms.urlParam('reg2')
        };
        $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/reports',JSON.stringify(payload)).done(function (result) {
            if(result.status != undefined && result.status == "SUCCESS"){
                $("#divLoading").addClass("hidden");

                var totalCarryOverSupvParol = 0;
                var totalCarryOverSupvPardon = 0;
                var totalCarryOverSupv = 0;
                var totalRcvSupvParol = 0;
                var totalRcvSupvPardon = 0;
                var totalRcvSupv = 0;
                var totalCourtesySupvParol = 0;
                var totalCourtesySupvPardon = 0;
                var totalCourtesySupvTotal = 0;
                var totalTermSupvParol = 0;
                var totalTermSupvPardon = 0;
                var totalTermSupv = 0;
                var totalActCourtesySupvParol = 0;
                var totalActCourtesySupvPardon = 0;
                var totalActCourtesySupv = 0;
                result.payload.forEach(function(data){
                    totalCarryOverSupvParol += data.totalCarryOverSupvParol;
                    totalCarryOverSupvPardon += data.totalCarryOverSupvPardon;
                    totalCarryOverSupv += data.totalCarryOverSupv;
                    totalRcvSupvParol += data.totalRcvSupvParol;
                    totalRcvSupvPardon += data.totalRcvSupvPardon;
                    totalRcvSupv += data.totalRcvSupv;
                    totalCourtesySupvParol += data.totalCourtesySupvParol;
                    totalCourtesySupvPardon += data.totalCourtesySupvPardon;
                    totalCourtesySupvTotal += data.totalCourtesySupvTotal;
                    totalTermSupvParol += data.totalTermSupvParol;
                    totalTermSupvPardon += data.totalTermSupvPardon;
                    totalTermSupv += data.totalTermSupv;
                    totalActCourtesySupvParol += data.totalActCourtesySupvParol;
                    totalActCourtesySupvPardon += data.totalActCourtesySupvPardon;
                    totalActCourtesySupv += data.totalActCourtesySupv;
                    data = "<tr>"+
                                "<td class='b' width='15%'>"+data.FIELD+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalCarryOverSupv+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalRcvSupv+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvParol+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalCourtesySupvTotal+"</td>"+
                                "<td class='b center'>"+data.totalTermSupvParol+"</td>"+
                                "<td class='b center'>"+data.totalTermSupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalTermSupv+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupvParol+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupvPardon+"</td>"+
                                "<td class='b center'>"+data.totalActCourtesySupv+"</td>"+
                            "</tr>";
                    $(".repbody").append(data);
                })
                $(".repfoot").append(
                    "<tr>"+
                        "<td class='b'>Total</td>"+
                        "<td class='b center'>"+totalCarryOverSupvParol+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupvPardon+"</td>"+
                        "<td class='b center'>"+totalCarryOverSupv+"</td>"+
                        "<td class='b center'>"+totalRcvSupvParol+"</td>"+
                        "<td class='b center'>"+totalRcvSupvPardon+"</td>"+
                        "<td class='b center'>"+totalRcvSupv+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvParol+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvPardon+"</td>"+
                        "<td class='b center'>"+totalCourtesySupvTotal+"</td>"+
                        "<td class='b center'>"+totalTermSupvParol+"</td>"+
                        "<td class='b center'>"+totalTermSupvPardon+"</td>"+
                        "<td class='b center'>"+totalTermSupv+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupvParol+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupvPardon+"</td>"+
                        "<td class='b center'>"+totalActCourtesySupv+"</td>"+
                    "</tr>"
                );
            }
        });
    }


    
    return {
       load : __load
    };
}());
