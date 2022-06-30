<?php $this->load->view('templates/header.php'); ?> 
<div class="cert_view">
    <a href="http://localhost:8000/cert/view/'+1" class="href"><button class="btn btn-sm btn-primary dl">donwload</button></a>
</div>
<?php $this->load->view('templates/footer.php'); ?> 
<script type="text/javascript">

    var certId =  $.wms.urlParam('certId')
    // $(".dl").unbind("click").on('click',)
	// $.wms.executeExternalGet('http://localhost:8000/cert/view/'+certId).done(function (result2) {
 //        console.log(result2);

 // //        $(".cert_view").html(
	// // 			// '<iframe src="'+result2+'" height="100%" width="100%" class="iframe" scrolling="auto"></iframe>'
	// // 			// '<embed src=""'+result2+'" type="application/pdf"   height="300px" width="100%">'
 //               '<a href="'+result2+'"></a>'
 // //        	)
 //    });
</script>
