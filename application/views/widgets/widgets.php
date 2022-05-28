<div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <span class="font_20">Statistical Data (Widgets)</span>
          </div>
          <div class="widget-panel panel-body" data-inner-id="widget-panel">
            <div class="col-md-6" data-inner-id="panel-w-1">


              <div class=" panel panel-primary panel-widget" id="widget_workload" data-inner-id="panel-1">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> 
                  Workload Handled

                  <span class="pull-right loading-data-workload"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> 
                 
                  
                </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_workload_field_office">

                      
                    </select>
                    <b>Date:</b> <input type="text" id="widget_workload_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-workload">Filter</button>
                  </span>
                  
                  <span class="pull-left">
                    <ul class="nav nav-tabs">
                      <li class="active"><a data-toggle="tab" href="#wl_table"><i class="fa fa-table"></i> Tabular</a></li>
                      <li><a data-toggle="tab" href="#wl_graph" class="wl_graph"><i class="fa fa-pie-chart"></i> Graph</a></li>  
                    </ul>

                  </span> 
                  <span class="pull-right"><button class="btn btn-primary btn-sm btnXLS">XLS</button> <button  class="btn btn-primary btn-sm btnPDF">PDF</button> <button class="btn btn-primary btn-sm btnPrint">Print</button></span>
                  <div class="tab-content">

                    <div id="wl_table" class="tab-pane fade in active">
                    <table class="table table-bordered table-condensed" id="t1">
                      <thead>
                        <tr class="tb-header">
                        <td></td>
                        <td align="center" class="b">Investigation</td>
                        <td align="center" class="b">Supervision</td>
                        <td align="center" class="b">Total</td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td class="b">Probation, Parole and Pardon</td>
                        <td align="center" class="WLTotalInv">0</td>
                        <td align="center" class="WLtotalSupv">0</td>
                        <td align="center" class="WLtotal b">0</td>
                      </tr>
                      <tr>
                        <td class="b">Probation</td>
                        <td align="center" class="WLProbationInv">0</td>
                        <td align="center" class="WLProbationSupv">0</td>
                        <td align="center" class="WLProbationTotal b">0</td>
                      </tr>
                      <tr>
                        <td class="b">Parole</td>
                        <td align="center" class="WLParoleInv">0</td>
                        <td align="center" class="WLParoleSupv">0</td>
                        <td align="center" class="WLParoleTotal b">0</td>
                      </tr>
                      <tr>
                        <td class="b">Pardon</td>
                        <td align="center" class="WLPardonInv">0</td>
                        <td align="center" class="WLPardonSupv">0</td>
                        <td align="center" class="WLPardonTotal b">0</td>
                      </tr>
                      </tbody>
                    </table>
                    </div>

                    <div id="wl_graph" class="tab-pane fade">
                        <canvas id="wl_graph1" width="250px"></canvas>

                        <canvas id="wl_graph2" width="250px"></canvas>
                    </div>

                  </div>
                </div>
              </div>



            </div>

            <div class="col-md-6" data-inner-id="panel-w-2">
              <div class="panel panel-primary panel-widget" id="widget_nrr" data-inner-id="panel-2">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> New Referrals Received<span class="pull-right loading-data-nr"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_nrr_field_office">
                      </select>
                    <b>Date:</b> <input type="text" id="widget_nrr_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-nr">Filter</button>
                  </span>

                  <span class="pull-left">
                    <ul class="nav nav-tabs">
                      <li class="active"><a data-toggle="tab" href="#nr_table"><i class="fa fa-table"></i> Tabular</a></li>
                      <li><a data-toggle="tab" href="#nr_graph" class="nr_graph"><i class="fa fa-pie-chart"></i> Graph</a></li>  
                    </ul>
                  </span> 
                  <span class="pull-right"><button class="btn btn-primary btn-sm btnXLS">XLS</button> <button  class="btn btn-primary btn-sm btnPDF">PDF</button> <button class="btn btn-primary btn-sm btnPrint">Print</button></span>
                  <div class="tab-content">
                    
                    <div id="nr_table" class="tab-pane fade in active">
                      <table class="table table-bordered table-condensed" id="t2">
                         <thead>
                        <tr class="tb-header">
                          <td></td>
                          <td align="center" class="b">Investigation</td>
                          <td align="center" class="b">Supervision</td>
                          <td align="center" class="b">Total</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="b">Probation, Parole and Pardon</td>
                          <td align="center" class="NRTotalInv">0</td>
                          <td align="center" class="NRtotalSupv">0</td>
                          <td align="center" class="NRtotal b">0</td>
                        </tr>
                        <tr>
                          <td class="b">Probation</td>
                          <td align="center" class="NRProbationInv">0</td>
                          <td align="center" class="NRProbationSupv">0</td>
                          <td align="center" class="NRProbationTotal b">0</td>
                        </tr>
                        <tr>
                          <td class="b">Parole</td>
                          <td align="center" class="NRParoleInv">0</td>
                          <td align="center" class="NRParoleSupv">0</td>
                          <td align="center" class="NRParoleTotal b">0</td>
                        </tr>
                        <tr>
                          <td class="b">Pardon</td>
                          <td align="center" class="NRPardonInv">0</td>
                          <td align="center" class="NRPardonSupv">0</td>
                          <td align="center" class="NRPardonTotal b">0</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>

                     <div id="nr_graph" class="tab-pane fade">
                        <canvas id="nr_graph1" width="250px"></canvas>

                        <canvas id="nr_graph2" width="250px"></canvas>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            
            <div class="col-md-6" data-inner-id="panel-w-3">
              <div class="panel panel-primary panel-widget" data-inner-id="panel-3">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> Completed Investigation Cases<span class="pull-right loading-data-CmpltdInv"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_cic_field_office"></select>
                    <b>Date:</b> <input type="text" id="widget_cic_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-CmpltdInv">Filter</button>
                  </span>
                  <span class="pull-left">
                    <ul class="nav nav-tabs">
                      <li class="active"><a data-toggle="tab" href="#CmpltdInv_table"><i class="fa fa-table"></i> Tabular</a></li>
                      <li><a data-toggle="tab" href="#CmpltdInv_graph" class="CmpltdInv_graph"><i class="fa fa-pie-chart"></i> Graph</a></li>  
                    </ul>
                  </span> 

                  <div class="tab-content">

                    <div id="CmpltdInv_table" class="tab-pane fade in active">

                      <table class="table table-bordered table-condensed">
                        <tr class="tb-header">
                          <td width="50%"></td>
                          <td align="center" class="b">Total</td>
                        </tr>
                        <tr>
                          <td class="b">Probation</td>
                          <td align="center" class="CmpltdInvProbationTotal">0</td>
                          
                        </tr><tr>
                          <td class="b">Pre-Parole/Executive Clemency</td>
                          <td align="center" class="CmpltdInvpreTotal">0</td>
                        </tr>
                      </table>  

                      <table class="table table-bordered table-condensed">
                        <tr class="tb-header">
                          <td width="50%"></td>
                          <td align="center" class="b">Probation</td>
                        </tr>
                        <tr>
                          <td class="b">PSIR Submitted</td>
                          <td align="center" class="CmpltdInvProbationPSIR">0</td>
                        </tr><tr>
                          <td class="b">Manifestation Submitted</td>
                          <td align="center" class="CmpltdInvProbationManifest">0</td>
                        </tr><tr>
                          <td class="b">Total</td>
                          <td align="center" class="CmpltdInvProbationTotal">0</td>
                        </tr>
                      </table>

                      <table class="table table-bordered table-condensed">
                        <tr class="tb-header">
                          <td width="50%"></td>
                          <td align="center" class="b">Pre-Parole/Executive Clemency</td>
                        </tr>
                        <tr>
                          <td class="b">Parole</td>
                          <td align="center" class="CmpltdInvPreParole">0</td>
                        </tr>
                        <tr>
                          <td class="b">Commutation of Sentence</td>
                          <td align="center" class="CmpltdInvPreCommutation">0</td>
                        </tr>
                        <tr>
                          <td class="b">Conditional Pardon</td>
                          <td align="center" class="CmpltdInvPreConditional">0</td>
                        </tr>
                        <tr>
                          <td class="b">Absolute Pardon</td>
                          <td align="center" class="CmpltdInvPreAbsolute">0</td>
                        </tr>
                        <tr>
                          <td class="b">Others</td>
                          <td align="center" class="CmpltdInvPreOther">0</td>
                        </tr>
                        <tr>
                          <td class="b">Total</td>
                          <td align="center" class="CmpltdInvpreTotal">0</td>
                        </tr>

                      </table>
                    </div>

                    <div id="CmpltdInv_graph" class="tab-pane fade">
                        <canvas id="CmpltdInv_graph1" width="250px"></canvas>

                        <canvas id="CmpltdInv_graph2" width="250px"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6" data-inner-id="panel-w-4">
              <div class="panel panel-primary panel-widget" data-inner-id="panel-4">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> Completed Supervision Cases<span class="pull-right loading-data-CmpltdSupv"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_scs_field_office"></select>
                    <b>Date:</b> <input type="text" id="widget_scs_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-CmpltdSupv">Filter</button>
                  </span>

                  <br/>


                  <span class="pull-left">
                    <ul class="nav nav-tabs">
                      <li class="active"><a data-toggle="tab" href="#CmpltdSupv_table"><i class="fa fa-table"></i> Tabular</a></li>
                      <li><a data-toggle="tab" href="#CmpltdSupv_graph" class="CmpltdSupv_graph"><i class="fa fa-pie-chart"></i> Graph</a></li>  
                    </ul>
                  </span> 

                  <div class="tab-content">

                    <div id="CmpltdSupv_table" class="tab-pane fade in active">
                      <table class="table table-bordered table-condensed">
                        <tr class="tb-header">
                          <td width="50%"></td>
                          <td align="center" class="b">Total</td>
                        </tr>
                        <tr>
                          <td class="b">Probation</td>
                          <td align="center" class="CmpltdSupvProbationTotal">0</td>
                        </tr>
                        <tr>
                          <td class="b">Parole</td>
                          <td align="center" class="CmpltdSupvParoleTotal">0</td>
                        </tr>
                        <tr>
                          <td class="b">Pardon</td>
                          <td align="center" class="CmpltdSupvPardonTotal">0</td>
                        </tr>

                      </table>

                      <table class="table table-bordered table-condensed" width="90%" align="center">
                        <tr class="tb-header">
                          <td width="20%"></td>
                          <!-- <td align="center" class="b">Probation</td> -->
                          <td align="center" class="b">Terminated</td>
                          <td align="center" class="b">Revoked</td>
                          <td align="center" class="b">Died</td>
                          <td align="center" class="b">Others</td>
                          <td align="center" class="b">Total</td>
                        </tr>
                        <tr>
                          <td class="b">Probation</td>
                          <!-- <td align="center">0</td>
                          <td align="center">0</td> -->
                          <td align="center" class="CmpltdSupvProbationTerm">0</td>
                          <td align="center" class="CmpltdSupvProbationRevoc">0</td>
                          <td align="center" class="CmpltdSupvProbationDied">0</td>
                          <td align="center" class="CmpltdSupvProbationOther">0</td>
                          <td align="center" class="CmpltdSupvProbationTotal b">0</td>
                        </tr>
                        

                      </table>



                      <table class="table table-bordered table-condensed" width="90%" align="center">
                        <tr class="tb-header">
                          <td width="20%"></td>
                          <td width="15%" align="center" class="b">Final Release and Discharge</td>
                          <td width="15%" align="center" class="b">Arrest / Recommitment</td>
                          <td width="15%" align="center" class="b">Died</td>
                          <td width="15%" align="center" class="b">Others</td>
                          <td width="15%" align="center" class="b">Total</td>
                        </tr>
                        <tr>
                          <td class="b">Parole</td>
                          <td align="center" class="CmpltdSupvParoleFinal">0</td>
                          <td align="center" class="CmpltdSupvParoleArrest">0</td>
                          <td align="center" class="CmpltdSupvParoleDeath">0</td>
                          <td align="center" class="CmpltdSupvParoleOther">0</td>
                          <td align="center" class="CmpltdSupvParoleTotal b">0</td>
                        </tr>
                        
                      </table>

                      <table class="table table-bordered table-condensed" width="90%" align="center">
                        <tr class="tb-header">
                          <td width="20%"></td>
                          <td width="15%" align="center" class="b">Final Release and Discharge</td>
                          <td width="15%" align="center" class="b">Arrest / Recommitment</td>
                          <td width="15%" align="center" class="b">Died</td>
                          <td width="15%" align="center" class="b">Others</td>
                          <td width="15%" align="center" class="b">Total</td>
                        </tr>
                        <tr>
                          <td class="b">Pardon</td>
                          <td align="center" class="CmpltdSupvPardonFinal">0</td>
                          <td align="center" class="CmpltdSupvPardonArrest">0</td>
                          <td align="center" class="CmpltdSupvPardonDeath">0</td>
                          <td align="center" class="CmpltdSupvPardonOther">0</td>
                          <td align="center" class="CmpltdSupvPardonTotal b">0</td>
                        </tr>
                        

                      </table>
                    </div>

                    <div id="CmpltdSupv_graph" class="tab-pane fade">
                        <canvas id="CmpltdSupv_graph1" width="250px"></canvas>
                    </div>

                  <br/>

                </div>
              </div>
            </div><br/>
          </div>


            <div class="col-md-6" data-inner-id="panel-w-5">
              <div class="panel panel-primary panel-widget" data-inner-id="panel-5">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> Court Disposition<span class="pull-right loading-data-cd"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_cd_field_office"></select>
                    <b>Date:</b> <input type="text" id="widget_cd_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-cd">Filter</button>
                  </span>

                  <span class="pull-left">
                    <ul class="nav nav-tabs">
                      <li class="active"><a data-toggle="tab" href="#cd_table"><i class="fa fa-table"></i> Tabular</a></li>
                      <li><a data-toggle="tab" href="#cd_graph" class="cd1_graph"><i class="fa fa-pie-chart"></i> Graph</a></li>  
                    </ul>
                  </span> 

                  <div class="tab-content">

                    <div id="cd_table" class="tab-pane fade in active">

                      <table class="table table-bordered table-condensed" width="90%" align="center">
                        <tr class="tb-header">
                          <td width="50%"></td>
                          <td align="center" class="b">Probation</td>
                        </tr>
                        <tr>
                          <td class="b">Granted</td>
                          <td align="center" class="CDProbationGranted">0</td>
                        </tr>
                        <tr>
                          <td class="b">Denied</td>
                          <td align="center" class="CDProbationDenied">0</td>
                        </tr>
                        <tr class="hidden">
                          <td class="b">Disqualified</td>
                          <td align="center" class="CDProbationDisqualified">0</td>
                        </tr>
                        <tr>
                          <td class="b">Dismissed due to Death</td>
                          <td align="center" class="CDProbationDismissed">0</td>
                        </tr>

                        <tr>
                          <td class="b">Withdrawn</td>
                          <td align="center" class="CDProbationWithdrawal">0</td>
                        </tr>
                        <tr>
                          <td class="b">Other</td>
                          <td align="center" class="CDProbationOthers">0</td>
                        </tr>
                        <tr>
                          <td class="b">Total</td>
                          <td align="center" class="CDProbationTotal b">0</td>
                        </tr>

                      </table>
                    </div>

                    <div id="cd_graph" class="tab-pane fade">
                      1
                        <canvas id="cd_graph1" width="250px"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6" data-inner-id="panel-w-6">
              <div class="panel panel-primary panel-widget" data-inner-id="panel-6">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> Disposition Rate<span class="pull-right loading-data-disp"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_dr_field_office"></select>
                    <b>Date:</b> <input type="text" id="widget_dr_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-disp">Filter</button>
                  </span>

                  <table class="table table-bordered table-condensed" width="90%" align="center">
                    <tr class="tb-header">
                      <td width="50%"></td>
                      <td align="center" class="b">Rate</td>
                    </tr>
                    <tr>
                      <td class="b">Probation Investigation</td>
                      <td align="center" class="dispProv">0</td>
                    </tr><tr>
                      <td class="b">Pre-Parole Investigation</td>
                      <td align="center" class="dispPre">0</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-md-6" data-inner-id="panel-w-7">
              <div class="panel panel-primary panel-widget" data-inner-id="panel-7">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> Rate of Sustained Recommendation by the Court<span class="pull-right loading-data-rsic"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_rsr_field_office"></select>
                    <b>Date:</b> <input type="text" id="widget_rsr_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-rsic">Filter</button>
                  </span>

                  <table class="table table-bordered table-condensed" width="90%" align="center">
                    <tr class="tb-header">
                      <td width="50%"></td>
                      <td align="center" class="b">Rate</td>
                    </tr>
                    <tr>
                      <td class="b">Investigation</td>
                      <td align="center" class="rsicInv">0</td>
                    </tr><tr>
                      <td class="b">Supervision</td>
                      <td align="center" class="rsicSupv">0</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-md-6" data-inner-id="panel-w-8">
              <div class="panel panel-primary panel-widget" data-inner-id="panel-8">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> Rate of Sustained Recommendation  by the Board<span class="pull-right loading-data-rsib"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_rsrib_field_office"></select>
                    <b>Date:</b> <input type="text" id="widget_rsrib_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-rsib">Filter</button>
                  </span>

                  <table class="table table-bordered table-condensed" width="90%" align="center">
                    <tr class="tb-header">
                      <td width="50%"></td>
                      <td align="center" class="b">Rate</td>
                    </tr>
                    <tr>
                      <td class="b">Investigation</td>
                      <td align="center" class="rsibInv">0</td>
                    </tr><tr>
                      <td class="b">Supervision</td>
                      <td align="center" class="rsibSupv">0</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-md-6" data-inner-id="panel-w-9">
              <div class="panel panel-primary panel-widget" data-inner-id="panel-9">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i> Reports Submitted Within the Prescribed Period<span class="pull-right loading-data-rspr"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_rspr_field_office"></select>
                    <b>Date:</b> <input type="text" id="widget_rspr_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-rspr">Filter</button>
                  </span>

                  <table class="table table-bordered table-condensed" width="90%" align="center">
                    <tr class="tb-header">
                      <td width="50%"></td>
                      <td align="center" class="b">Rate</td>
                    </tr>
                    <tr>
                      <td class="b">Investigation</td>
                      <td align="center" class="rsprInv">0</td>
                    </tr><tr>
                      <td class="b">Supervision</td>
                      <td align="center" class="rsprSupv">0</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-md-6" data-inner-id="panel-w-9">
              <div class="panel panel-primary panel-widget" data-inner-id="panel-9">
                <div class="panel-heading font_18"><i class="fa fa-bar-chart"></i>  Plea Bargain / Non Plea Bargain Cases<span class="pull-right loading-data-pbargain"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">

                  <span class="pull-right">
                    <b>Field Office:</b> <select class="form-control sel_field_office select2" id="widget_pbargain_field_office"></select>
                    <b>Date:</b> <input type="text" id="widget_pbargain_date" class="sel_date">
                    <button class="btn btn-success btn-sm btn-pbargain">Filter</button>
                  </span>

                  <table class="table table-bordered table-condensed" width="90%" align="center">
                    <tr class="tb-header">
                      
                      <td align="center" class="b" rowspan="2">Number of Investigation Cases</td>
                      <td align="center" class="b" colspan="2">Plea Bargain Cases</td>
                      <td rowspan="2" align="center" class="b">Non-Plea Bargain Cases</td>
                    </tr>
                    <tr class="tb-header">
                      <td align="center" class="b">Drug Related</td>
                      <td align="center" class="b">Non-Drug Related</td>
                    </tr>
                    <!-- <tr>
                      <td class="b">Investigation</td>
                      <td align="center" class="rsprInv">0</td>
                    </tr><tr>
                      <td class="b">Supervision</td>
                      <td align="center" class="rsprSupv">0</td>
                    </tr> -->
                    <tr>
                      <td align="center"  class="InvestigationCases"></td>
                      <td align="center"  class="DrugRelated"></td>
                      <td align="center"  class="NonDrugRelated"></td>
                      <td align="center"  class="NonPlea"></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <!-- <div class="col-md-6">
              <div class="panel panel-primary panel-widget">
                <div class="panel-heading"><i class="fa fa-bar-chart"></i> Other widgets which are deemed necessary which were gathered during the systems investigation and design<span class="pull-right loading-data"><i class="fa fa-refresh fa-spin fa-1x fa-fw spin"></i> <span class="hidden-xs">Retrieving Data...</span></span> </div>
                <div class="panel-body map-wrapper">
                  No Available Data
                </div>
              </div>
            </div> -->
            
          </div>
        </div>
      </div>
    </div>