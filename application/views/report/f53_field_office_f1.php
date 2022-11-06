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
      <!-- <h4 class="" style=""><b>PPA-CMR-FO-058</b></h4> -->
      <!-- <h4 class="" style=""><b>CMRD-ROR-F1</b></h4>    -->
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class=""><b>Region: <span class="curr_reg"></span></b></h4>
      <h4 class="" style="text-align: center;"><b>HEARING PHASE</b></h4>
      <!-- <h4 class="" style="text-align: center;"><b>As of <span class='curr_date'></span></b></h4> -->
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
              Field Offices
            </th>
            <th colspan="2" rowspan="1" style="text-align: center;">Application for Community Service Received</th>
            <th colspan="2" rowspan="1" style="text-align: center;">Notice Of Hearing Received</th>
            <th colspan="3" rowspan="1" style="text-align: center;">Order Received Regarding Setting Apllication For Hearing And Submission of Reports</th>
            <th colspan="1" rowspan="3" style="text-align: center;">Community Service Program and Rehabilitation Counselling Schedule Submitted</th>
            <th colspan="1" rowspan="3" style="text-align: center;">Total Order Pending Submission Report</th>
            <th colspan="6" rowspan="1" style="text-align: center;">Court Resolution on the Application for Community Service</th>
          </tr>
          <tr>
            <th colspan="1" rowspan="2" style="text-align: center;">Total Carry Over</th>
            <th colspan="1" rowspan="2" style="text-align: center;">New Application/s</th>
            <th colspan="1" rowspan="2" style="text-align: center;">Total Carry Over</th>
            <th colspan="1" rowspan="2" style="text-align: center;">New Notice of Hearing</th>
            <th colspan="1" rowspan="2" style="text-align: center;">Total Carry Over</th>
            <th colspan="1" rowspan="2" style="text-align: center;">New Order Setting Application for Hearing and Submission of Reports</th>
            <th colspan="1" rowspan="2" style="text-align: center;">Total Order to be acted upon</th>
            <th colspan="1" rowspan="2" style="text-align: center;">Total Carry Over Application Pending Disposition in Court</th>
            <th colspan="1" rowspan="2" style="text-align: center;">Total Community Service Program and Rehabilitation Counselling Schedule Submitted</th>
            <th colspan="1" rowspan="2" style="text-align: center;">Total Application to be Acted by the Court</th>
            <th colspan="2" rowspan="1" style="text-align: center;">Total Application Resolved by the Court</th>
            <th colspan="1" rowspan="2" style="text-align: center;">Total Application Pending Disposition in Court</th>
          </tr>
          <tr>
            <th colspan="1" rowspan="1" style="text-align: center;">Granting</th>
            <th colspan="1" rowspan="1" style="text-align: center;">Denying</th>
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
