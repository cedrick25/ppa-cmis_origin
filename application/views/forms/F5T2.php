

<div class="container-fluid" style="padding-top: 30px">
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class="" style=""><b>FORM 5</b></h4>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class="" style="text-align: center;"><b>TABLE 2</b></h4>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <h4 class="" style="text-align: center;"><b>COURT INVESTIGATION REFERRALS RECEIVED, ACTED UPON, AND NOT ACTED UPON</b></h4>
    </div>
  </div><br>
  <?php $curr = $_SERVER['REQUEST_URI']; ?>
  <div class="row">
    <div class="col-lg-12 col-sm-12 col-md-12 div-table">
      <table id="T_F5T2" class="table table-bordered table-darker table-condensed text-nowrap" style="width:100%">
        <thead class="small tb-header">
          <tr>
            <th style="text-align: center;vertical-align: middle" rowspan="3">Docket No.</th>
            <th colspan="<?php if(strpos($curr,'print') !== false){ echo "8"; }else{ echo "9"; } ?>" rowspan="2" valign="top" style="text-align: center;">REFERRALS RECEIVED</th>
             <th class="options" colspan="3" rowspan="2"></th>
            <th colspan="6" style="text-align: center;">REFERRALS ACTED UPON</th>
            <th class="options" colspan="3" rowspan="2"></th>
            <th colspan="4" style="text-align: center;">REFERRALS NOT ACTED UPON</th>
            <th class="options" colspan="6"></th>
          </tr>
          <tr>
            
            <th colspan="1" style="text-align: center;">&nbsp;</th>
            <th colspan="2" style="text-align: center;">Date Subtd. to Court</th>
            <th colspan="1" style="text-align: center;">&nbsp;</th>
            <th colspan="2" style="text-align: center;">Transferred</th>
            <th colspan="2" style="text-align: center;">Recalled</th>
            <th class="options" colspan="3"></th>
            <th colspan="2" style="text-align: center;">Warrant of Arrest</th>
            <th class="options" colspan="3"></th>
          </tr>
          <tr>
            
            <th style="text-align: center;">Petitioner's<br/>Name</th>
            <th style="text-align: center;">Plea Bargain</th>
            <th style="text-align: center;">CC No.</th>
            <th class="" style="text-align: center;">Court of<br/>Origin</th>
            <th style="text-align: center;">Offense</th>
            <th style="text-align: center;">Sentence</th>
            <th style="text-align: center;" class="options">Date of<br/>Court Order</th>
            <th style="text-align: center;">Date Rec'd</th>
            <th style="text-align: center;">Investigating<br/>Officer</th>
            <th class="options" style="text-align: center;">FIELD OFFICE</th>
            <th class="options" style="text-align: center;">DATA SOURCE</th>
            <th class="options" style="text-align: center;">OPTIONS</th>


            <th style="text-align: center;">Petitioner's<br/>Name</th>
            <th style="text-align: center;">PSIR</th>
            <th style="text-align: center;">Manifestation</th>
            <th style="text-align: center;">PPO's<br/>Recommendation</th>
            <th style="text-align: center;">Date</th>
            <th style="text-align: center;">To</th>
            <th class="options" style="text-align: center;">FIELD OFFICE</th>
            <th class="options" style="text-align: center;">DATA SOURCE</th>
            <th class="options" style="text-align: center;">OPTIONS</th>

            
            <th style="text-align: center;">Petitioner’s<br/>Name</th>
            <th style="text-align: center;">Date Order<br/>Rec’d.</th>
            <th class="options" style="text-align: center;">FIELD OFFICE</th>
            <th class="options" style="text-align: center;">DATA SOURCE</th>
            <th class="options" style="text-align: center;">OPTIONS</th>


            <th style="text-align: center;">Petitioner’s<br/>Name</th>
            <th style="text-align: center;">Date Order<br/>Rec’d.</th>
            <th class="options" style="text-align: center;">FIELD OFFICE</th>
            <th class="options" style="text-align: center;">DATA SOURCE</th>
            <th class="options" style="text-align: center;">OPTIONS</th>
          </tr>
        </thead>
        <tbody class="F5T2_tbody tbody-sm">
          
        </tbody>
      </table>


    </div>
  </div>
