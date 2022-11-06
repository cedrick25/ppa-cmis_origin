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
      <h4 class="" style=""><b>PPA-CMR-FO-054</b></h4>
      <h4 class="" style=""><b>CMRD-CSS-R2</b></h4>   
      <h4 class="" style=""><b>Page 1</b></h4>   
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class="" style="text-align: center;"><b>REGIONAL QUARTERLY COURT DISPOSITION OF COMMUNITY SERVICE SUPERVISION CASELOAD</b></h4>
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
            </th>
            <th colspan="4" rowspan="1" style="text-align: center;">(A) CARRY OVER</th>
            <th colspan="4" rowspan="1" style="text-align: center;">(B) SUBMITTED TO COURT</th>
            <th colspan="1" rowspan="3" style="text-align: center;">(C) TOTAL CASES TO BE ACTED UPON BY COURT</th>
          </tr>
          <tr>
            <th colspan="1" rowspan="2" style="text-align: center;">TERMINATION</th>
            <th colspan="1" rowspan="2" style="text-align: center;">REVOCATION</th>
            <th colspan="1" rowspan="2" style="text-align: center;">TRANS. TO OTHER OFFICES</th>
            <th colspan="1" rowspan="2" style="text-align: center;">TOTAL CARRYOVER</th>
            <th colspan="1" rowspan="2" style="text-align: center;">TERMINATION</th>
            <th colspan="1" rowspan="2" style="text-align: center;">REVOCATION</th>
            <th colspan="1" rowspan="2" style="text-align: center;">TRANS. TO OTHER OFFICES</th>
            <th colspan="1" rowspan="2" style="text-align: center;">TOTAL REPORTS SUBMITTED TO COURT</th>
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
