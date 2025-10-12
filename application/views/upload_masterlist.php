<?php $this->load->view('templates/header.php'); ?> 
<body style="background-color: #f1f1f1;">
<?php $this->load->view('templates/nav.php'); ?> 
<br/>
<div class="container-fluid">
	<div class="col-md-12">
		<div class="panel panel-primary">
			<div class="panel-heading">
				<span class="font_20"><i class="fa fa-users"></i> <b>Upload Masterlist</b></span>
			</div>

			<div class="panel-body">
			  <div class="row justify-content-center">
			    <div class="col-md-4"> <!-- ✅ Restrict width to col-6 -->

			      <form id="uploadForm" enctype="multipart/form-data">
			        <div class="form-group">
			          <label for="fileUpload">Choose File</label>
			          <input type="file" id="fileUpload" name="file" class="form-control" required>
			        </div>
					<div id="loader" style="display:none; text-align:center; margin:10px 0;">
					  <i class="fa fa-spinner fa-spin fa-2x"></i>
					  <p>Loading file, please wait...</p>
					</div>
			        <!-- Hidden until file is analyzed -->
			        <div id="tabSection" style="display:none;">
			          <div class="form-group">
			            <label for="tabSelect">Select Tab</label>
			            <select id="tabSelect" name="tab" class="form-control" required>
			              <option value="">-- Select --</option>
			            </select>
			          </div>
			          <button id="uploadBtn" class="btn btn-primary btn-block">Upload</button>
			        </div>
			      </form>

			      <div id="uploadResult" style="display:none;" class="alert mt-3"></div>
			      
			    </div>
			  </div>
			</div>
		</div>
	</div>
</div>

</body>
<script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>
<?php $this->load->view('templates/footer.php'); ?> 
<?php $this->load->view('templates/admin_footer.php'); ?> 

<script type="text/javascript">
$(document).ready(function () {

  $("#fileUpload").on("change", function (e) {
    let file = e.target.files[0];
    if (!file) return;

    let fileName = file.name.toLowerCase();
    let ext = fileName.split(".").pop();

    // Show loader
    $("#loader").show();
    $("#tabSection").hide();
    $("#uploadResult").hide();

    if (ext === "xlsx" || ext === "xls") {
      let reader = new FileReader();
      reader.onload = function (e) {
        setTimeout(() => { // small delay so loader is visible
          let data = new Uint8Array(e.target.result);
          let workbook = XLSX.read(data, { type: "array" });

          let sheetNames = workbook.SheetNames;
          if (sheetNames.length === 0) {
            $("#uploadResult")
              .removeClass("alert-success")
              .addClass("alert-danger")
              .text("❌ Error detecting sheet names.")
              .show();
            $("#tabSection").hide();
            $("#loader").hide();
            return;
          }

          // Populate dropdown with sheet names
          let options = '<option value="">-- Select Sheet --</option>';
          sheetNames.forEach((name) => {
            options += `<option value="${name}">${name}</option>`;
          });

          $("#tabSelect").html(options);
          $("#loader").hide();
          $("#tabSection").show();
        }, 100); // <-- ensures UI updates before parsing
      };

      reader.readAsArrayBuffer(file);

    } else if (ext === "csv") {
      let options = `
        <option value="">-- Select --</option>
        <option value="CSV">CSV File</option>
      `;
      $("#tabSelect").html(options);
      $("#loader").hide();
      $("#tabSection").show();

    } else {
      $("#uploadResult")
        .removeClass("alert-success")
        .addClass("alert-danger")
        .text("❌ Error: Unsupported file type.")
        .show();
      $("#loader").hide();
      $("#tabSection").hide();
    }
  });

});

</script>
