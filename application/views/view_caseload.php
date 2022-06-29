
<?php $this->load->view('templates/header.php'); ?> 




<body  style="background-color: #f1f1f1;">
<?php #$this->load->view('templates/nav.php'); ?> 

<div id="load"></div>


					
					
				
			

		



</body>
<?php $this->load->view('templates/footer.php'); ?> 

<script type="text/javascript">
    function getDocHeight(doc) {
        doc = doc || document;
        // stackoverflow.com/questions/1145850/
        var body = doc.body, html = doc.documentElement;
        var height = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        return height;
    }

    function setIframeHeight(id) {
        var ifrm = document.getElementById(id);
        var doc = ifrm.contentDocument? ifrm.contentDocument: 
            ifrm.contentWindow.document;
        ifrm.style.visibility = 'hidden';
        ifrm.style.height = "10px"; // reset to minimal height ...
        // IE opt. for bing/msn needs a bit added or scrollbar appears
        ifrm.style.height = getDocHeight( doc ) + 50 + "px";
        ifrm.style.visibility = 'visible';
    }


	$( window ).ready(function() {
		$(".footer_notes").remove();
        setTimeout(function () {
    		$.wms.dashboard.attachPageEvent();
    		$.wms.modal.attachModalEvent();

    		$(".loading-data").fadeOut();
    		var id = $(this).data('id');
            console.log(id);
            var payload = { id : $.wms.urlParam('id') , method : "view_single" }
            $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/api/caseload_reports',JSON.stringify(payload)).done(function (result) {
                console.log(result)
                if(result.status === 'SUCCESS'){
                	report_YM = result.payload.report_YM;
                	report_field = result.payload.report_field;
                	report_content = JSON.parse(result.payload.report_content);

                    var payload = { field_office : report_field}
                    $.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Pis/getFieldOfficeByFieldOffice',JSON.stringify(payload)).done(function (result) {
                        if(result.status === 'SUCCESS'){
                            var officeId = result.payload.ID
                            
                            report_content.forEach(function(key){

                                $("#load").append('<iframe id="'+key+'"  class="iframe" height="500px"  width="100%" onload="setIframeHeight(this.id)" src="report_caseload?form='+key+'&date='+report_YM+'&field='+report_field+'&officeId='+officeId+'&page='+0+'&size='+15+'"></iframe>')


                                /*var div = document.getElementById(key); 
                                div.onload = function() { 
                                    div.style.height = 
                                      div.contentWindow.document.body.scrollHeight + 'px'; 
                                } */
                                $(".isocode_").replaceWith($("<span />").text($(".isocode_").val()));
                            });

                        }
                    });
                	

                }
                

            });
    		

        }, 200);
   });
</script>