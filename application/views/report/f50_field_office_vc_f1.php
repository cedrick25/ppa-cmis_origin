<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <!-- <link rel="shortcut icon" href="<?php echo base_url(); ?>assets/images/osg-icon.png"> -->
    <!-- <link rel="shortcut icon" href="assets/img/ken.png"> -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/select2.min.css">
    
    <link rel="stylesheet" href="assets/css/styles.css">
  </head>

<body>

<div class="container-fluid" style="padding-top: 30px">
  <div class="row pull-right">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class="" style=""><b>PPA-CMR-FO-056</b></h4>
      <h4 class="" style=""><b>CMRD-VC-F1</b></h4>   
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class="" style="text-align: center;"><b>FIELD OFFICE QUARTERLY VOLUNTARY CONFINEMENT CASELOAD</b></h4>
      <h4 class="" style="text-align: center;"><b>As of <span class='curr_date'></span></b></h4>
    </div>
  </div><br>
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <div class="alert alert-info" role="alert"  style="font-weight: bolder" id="divLoading">
        <i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> Loading...
      </div>
      <table class="table table-bordered" id="Table" style="width:100%">
        <thead class="small tb-header">
          <tr>
            <th colspan="1" rowspan="3" style="text-align: center;">
              REGION<br>
              <span class="curr_reg"></span><br>
              PROBATION OFFICE
            </th>
            <th colspan="1" rowspan="3" style="text-align: center;">(A) NO. OF APPLICANTS GIVEN APPLICATION</th>
            <th colspan="1" rowspan="3" style="text-align: center;">(B) NO. OF VERIFIED APPLICATIONS RECEIVED</th>
            <th colspan="1" rowspan="3" style="text-align: center;">(C) NO. OF CASES TRANSFERRED/REFERRED TO OTHER DDB REPRESENTATIVES</th>
            <th colspan="1" rowspan="3" style="text-align: center;">(D) NO. OF APPLICANTS REFERRED FOR DD EXAM</th>
            <th colspan="1" rowspan="3" style="text-align: center;">(E) NO. OF DDE REPORTS RECEIVED</th>
            <th colspan="1" rowspan="3" style="text-align: center;">(F) NO. OF PETITIONS FOR VOLUNTARY CONFINEMENT FILED IN COURT</th>
            <th colspan="1" rowspan="3" style="text-align: center;">(G) NO. OF PETITION HEARINGS CONDUCTED</th>
            <th colspan="1" rowspan="3" style="text-align: center;">(H) NO. OF PETITIONS ACTED UPON BY COURT</th>
          </tr>

        </thead>
        <tbody class="repbody">
        </tbody>
        <tfoot class="repfoot">
        </tfoot>
      </table>
    </div>
  </div>

  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/jquery.cookie.min.js"></script>
  <script src="assets/js/select2.min.js"></script>  
  <script src="assets/js/bootstrap.min.js"></script>
  <script src="assets/js/jquery.dataTables.min.js"></script>


  </body>
</html>
