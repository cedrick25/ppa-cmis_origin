<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPA-CMR-FO-005
(CMRD-PI-F4)
    </title>
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
      <h4 class="" style=""><b>PPA-CMR-FO-005</b></h4>
      <h4 class="" style=""><b>(CMRD-PI-F4)</b></h4>   
    </div>
  </div>
  <!-- <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class="" style="text-align: center;"><b>TABLE 4</b></h4>
    </div>
  </div> -->
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class="" style="text-align: center;"><b>FIELD OFFICE QUARTERLY PROBATION DISPOSITION RATE</b></h4>
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
            <th colspan="1" style="text-align: center;"><span class="curr_reg"></span><br>PROBATION OFFICE</th>
            <th colspan="1" style="text-align: center;"> CARRY OVER</th>
            <th colspan="1" style="text-align: center;">REF REC'D</th>
            <th colspan="1" style="text-align: center;">HANDLED</th>
            <th colspan="11" style="text-align: center;">(D)  INVESTIGATION REFERRALS ACTED UPON</th>
            <th colspan="3" style="text-align: center;">INV. REFERRALS NOT ACTED UPON DUE TO</th>
            <th colspan="1" style="text-align: center;">DISPOSITION RATE (%)</th>
          </tr>
          <tr>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="6" style="text-align: center;">PSIR FOR</th>
            <th colspan="3" style="text-align: center;">MANIFESTATION</th>
            <th colspan="1" style="text-align: center;">INV. CASES TRANS. TO OTHER PPOs</th>
            <th colspan="1" style="text-align: center;">TOTAL</th>
            <th colspan="1" style="text-align: center;">RECALL</th>
            <th colspan="1" style="text-align: center;">WARRANT OF ARREST</th>
            <th colspan="1" style="text-align: center;">TOTAL</th>
            <th colspan="1" style="text-align: center;"></th>
          </tr>
          <tr>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="3" style="text-align: center;">GRANT</th>
            <th colspan="3" style="text-align: center;">DENIAL</th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
            <th colspan="1" style="text-align: center;"></th>
          </tr>
          <tr>
            <th style="text-align: center;"></th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;">within 30 days</th>
            <th style="text-align: center;">within 31-60 days</th>
            <th style="text-align: center;">beyond 60 days</th>
            <th style="text-align: center;">within 30 days</th>
            <th style="text-align: center;">within 31-60 days</th>
            <th style="text-align: center;">beyond 60 days</th>
            <th style="text-align: center;">within 30 days</th>
            <th style="text-align: center;">within 31-60 days</th>
            <th style="text-align: center;">beyond 60 days</th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;"></th>
          </tr>
        </thead>
        <tbody class="repbody">
          <tr>
            <!-- <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td> -->
          </tr>
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
