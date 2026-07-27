<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// Load Dompdf manually
require_once(APPPATH . 'third_party/dompdf/autoload.inc.php'); 
use Dompdf\Dompdf;

class Report extends CI_Controller {

    /**
     * Same-host API base URL using the current request scheme (http/https).
     */
    private function api_base_url()
    {
        $scheme = is_https() ? 'https' : 'http';
        $host = !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost';
        return $scheme . '://' . $host . '/ppa-cmis-api_origin';
    }

    public function download_report()
    {
        $dompdf = new Dompdf();

        $filters = [
            'REGION'        => $this->input->post('region'),
            'FIRSTNAME'     => $this->input->post('firstname'),
            'MIDDLENAME'    => $this->input->post('middlename'),
            'LASTNAME'      => $this->input->post('lastname'),
            'ALIAS'         => $this->input->post('alias'),
            'YEAR'          => $this->input->post('year'),
            'SDOCKETNO'     => $this->input->post('sdocketno'),
            'SUPERVOFFICE'  => $this->input->post('supervoffice'),
            'REMARKS'       => $this->input->post('remarks'),
            'START_DD'      => $this->input->post('start_dd'),
            'START_YY'      => $this->input->post('start_yy'),
            'START_MM'      => $this->input->post('start_mm'),
            'END_DD'        => $this->input->post('end_dd'),
            'END_YY'        => $this->input->post('end_yy'),
            'END_MM'        => $this->input->post('end_mm'),
        ];

        // Extract region and year for display
        $fname  = $filters['FIRSTNAME'];
        $mname  = $filters['MIDDLENAME'];
        $lname  = $filters['LASTNAME'];
        $full_name = $fname . ' ' . $mname . ' ' . $lname;

        // Use mb_convert_case for proper multi-byte (UTF-8) support, handles ñ correctly
        $fullname = mb_convert_case(mb_strtolower($full_name, 'UTF-8'), MB_CASE_TITLE, 'UTF-8');
        // Send request to API for masterlist
        $apiUrl_json = $this->api_base_url() . '/wsv1/Cmis/masterlist_json';
        $ch = curl_init($apiUrl_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($filters));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $response = curl_exec($ch);
        curl_close($ch);
        $data['masterlist'] = json_decode($response, true);

        // Get report data (non-filtered, just sorted)
        $apiUrl = $this->api_base_url() . '/wsv1/no_reports/get_reports/F5';
        $ch = curl_init($apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $apiResponse = curl_exec($ch);
        curl_close($ch);
        $reportData = json_decode($apiResponse, true);

        // Sort by id descending
        usort($reportData, function($a, $b) {
            return $b['id'] - $a['id'];
        });

        // Build HTML content
        $html = "
        <style>
            th,td {
                font-weight: normal;
                font-family: Arial, sans-serif;
                font-size: 8pt;
                text-align:center;
            }
            .p_sentence {
                text-indent: 60px;
                font-family: Arial, sans-serif;
                font-size: 12pt;
            }
            .p_title {
                font-family: Arial, sans-serif;
                font-weight: bold;
                font-size: 12pt;
                text-align: center;
            }
            .p_center {
                text-align: center;
                font-family: Arial, sans-serif;
                font-size: 12pt;
                font-weight: bold;
                text-decoration: underline;
            }
            .header-text {
                font-family: Tahoma, sans-serif;
                text-align: center;
            }

            .header-text .small {
                font-size: 8pt;
            }

            .header-text .large {
                font-size: 12pt;
                font-weight: bold;
            }
        </style>
        ";
        $leftLogoPath = FCPATH . 'images/ppa_logo.png';
        $rightLogoPath = FCPATH . 'images/bp_logo.png';

        $leftLogoData = base64_encode(file_get_contents($leftLogoPath));
        $rightLogoData = base64_encode(file_get_contents($rightLogoPath));

        $leftLogoSrc = 'data:image/png;base64,' . $leftLogoData;
        $rightLogoSrc = 'data:image/png;base64,' . $rightLogoData;
        $html .= "
        <table width='100%' style='margin-bottom: 20px;'>
            <tr>
                <td width='20%' style='text-align: left; padding-left:20px;'>
                    <img src='$leftLogoSrc' alt='Left Logo' style='height:80px;'>
                </td>
                <td width='60%'>
                    <div class='header-text'>
                        <div class='small'><strong>Republic of the Philippines</strong></div>
                        <div class='small'><strong>Department of Justice</strong></div>
                        <div class='large' style='color:#FF0000;'>PAROLE AND PROBATION ADMINISTRATION</div>
                        <div class='large' style='color:#006FC0;'>OFFICE OF THE ADMINISTRATOR</div>
                        <div class='small'>DOJ Agencies Building NIA Road cor. East Ave.</div>
                        <div class='small'>Telephone Number: (02) 8925-0235 | E-mail: aodojppa@gmail.com</div>
                        <div class='small'>Website: <span style='color:#0000FF'><u>https://probation.gov.ph</u></span></div>
                    </div>
                </td>
                <td width='20%' style='text-align: right; padding-right:20px;'>
                    <img src='$rightLogoSrc' alt='Right Logo' style='height:80px;'>
                </td>
            </tr>
        </table>
        ";
        $current_date = time(); 

        // Format the date using 'F j, Y'
        $formatted_date = date('F j, Y', $current_date);
        $html .= "<hr style='border: 1px solid #eb603c; margin: 20px 0;'>";
        $html .= "<br><br><div class='p_title'>RESULT OF RECORDS CHECK</div>";
        $html .= "<div class='p_title'>(PROBATION)</div>";
        $html .= "<div class='p_title'>". $formatted_date ."</div><br><br>";
        $html .= "<p class='p_sentence'>This has reference to the request for records check on petitioner</p>";
        $html .= "<p class='p_center' style='font-size: 10pt;'>$fullname</p>";
        if (!empty($data['masterlist'])) {
            $html .= "<br><p class='p_sentence'>The matrix below shows the similar name/s with the petitioner’s name being requested for records check from 1978 to " . date('Y') . ":</p>";
        } else {
            $html .= "<br><p class='p_sentence'>The matrix below shows no similar name/s with the petitioner’s name being requested for records check from 1978 to " . date('Y') . ".</p>";
        }
        $html .= "
        <table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'>
            <thead>
                <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>True Name/Alias</th>
                    <th>Supervising Office</th>
                    <th>Remarks</th>
                    <th>Region</th>
                    <th>Docket Number</th>
                    <th>Year</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
        ";        
        if (!empty($data['masterlist'])) {
            foreach ($data['masterlist'] as $row) {
                $html .= "<tr>
                            <td>{$row['LASTNAME']}</td>
                            <td>{$row['FIRSTNAME']}</td>
                            <td>{$row['MIDDLENAME']}</td>
                            <td>{$row['ALIAS']}</td>
                            <td>{$row['SUPVOFFICE']}</td>
                            <td>{$row['REMARKS']}</td>
                            <td>{$row['REGION']}</td>
                            <td>{$row['SDOCKETNO']}</td>
                            <td>{$row['YEAR']}</td>
                            <td>{$row['START_DATE']}</td>
                            <td>{$row['END_DATE']}</td>
                          </tr>";
            }
        } else {
            $html .= "<tr><td colspan='11'>No masterlist records found.</td></tr>";
        }
        $html .= "</tbody></table><br>";            
        $html .= "<p class='p_sentence'>The list above does not include the data of the field offices that have not yet submitted their caseload information to the PPCMIS. Please refer to the PPCMIS - Probation Masterlist to verify which field offices have not yet completed the system submission.</p>";
        
        $footer = FCPATH . 'images/footer.png';
        $footerData = base64_encode(file_get_contents($footer));

        $html .= "
            <style>
                @page {
                    margin-bottom: 165px;
                }
                .fixed-footer {
                    position: fixed;
                    bottom: -80px;
                    left: 0;
                    right: 0;
                    width: 100%;
                }
                .fixed-footer img {
                    /* display: block; */
                    width: 100%;
                    height: auto;
                }
            </style>

            <div style='
                margin-top:30px;
                margin-bottom:20px;
                font-family: Arial, sans-serif;
                font-size: 10pt;
                width: 100%;
                text-align: left;
                font-weight: bold;
            '>
                This is an Online Records Check Result. Signature is not required.<br>
                Please coordinate with the Supervising Office in case there is a similar name by using the Encrypted Communication Platform System.
            </div>

            <div class='fixed-footer'>
                <div style='
                    width: 100%;
                    text-align: center;
                '>
                    <img src='data:image/png;base64,{$footerData}' alt='ISO Footer Logo'>
                </div>
            </div>
        ";
        // Generate PDF
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $dompdf->stream("Download Result.pdf", ["Attachment" => true]);
    }
    public function download_report_CS()
    {
        $dompdf = new Dompdf();

        $filters = [
            'docket_number'   => $this->input->post('docket_number'),
            'first_name'      => $this->input->post('first_name'),
            'middle_name'     => $this->input->post('middle_name'),
            'last_name'       => $this->input->post('last_name'),
            'cc_number'       => $this->input->post('cc_number'),
            'court_of_origin' => $this->input->post('court_of_origin'),
            'assigned_officer'=> $this->input->post('assigned_officer'),
            'field_office'    => $this->input->post('field_office'),
            'year'            => $this->input->post('year'),
            'start_date'      => $this->input->post('start_date'), // expect YYYY-MM-DD
            'end_date'        => $this->input->post('end_date'),   // expect YYYY-MM-DD
        ];

        // Extract region and year for display
        $fname  = $filters['first_name'];
        $mname  = $filters['middle_name'];
        $lname  = $filters['last_name'];

        $full_name = $fname . ' ' . $mname . ' ' . $lname;
        $fullname = ucwords(strtolower($full_name));
        // Send request to API for community_masterlist
        $apiUrl_json = $this->api_base_url() . '/wsv1/Expansion/community_json';
        $ch = curl_init($apiUrl_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($filters));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $response = curl_exec($ch);
        curl_close($ch);
        $decoded = json_decode($response, true);
        // Keep PDF workflow intact when API returns HTML/error instead of JSON
        $data['community_masterlist'] = is_array($decoded) ? $decoded : array();

        // Get report data (non-filtered, just sorted)
        $apiUrl = $this->api_base_url() . '/wsv1/no_reports/get_reports/F53';
        $ch = curl_init($apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $apiResponse = curl_exec($ch);
        curl_close($ch);
        $reportData = json_decode($apiResponse, true);

        // Sort by id descending
        usort($reportData, function($a, $b) {
            return $b['id'] - $a['id'];
        });

        // Build HTML content
        $html = "
        <style>
            th,td {
                font-weight: normal;
                font-family: Arial, sans-serif;
                font-size: 8pt;
                text-align:center;
            }
            .p_sentence {
                text-indent: 60px;
                font-family: Arial, sans-serif;
                font-size: 12pt;
            }
            .p_title {
                font-family: Arial, sans-serif;
                font-weight: bold;
                font-size: 12pt;
                text-align: center;
            }
            .p_center {
                text-align: center;
                font-family: Arial, sans-serif;
                font-size: 12pt;
                font-weight: bold;
                text-decoration: underline;
            }
            .header-text {
                font-family: Tahoma, sans-serif;
                text-align: center;
            }

            .header-text .small {
                font-size: 8pt;
            }

            .header-text .large {
                font-size: 12pt;
                font-weight: bold;
            }
        </style>
        ";
        $leftLogoPath = FCPATH . 'images/ppa_logo.png';
        $rightLogoPath = FCPATH . 'images/bp_logo.png';

        $leftLogoData = base64_encode(file_get_contents($leftLogoPath));
        $rightLogoData = base64_encode(file_get_contents($rightLogoPath));

        $leftLogoSrc = 'data:image/png;base64,' . $leftLogoData;
        $rightLogoSrc = 'data:image/png;base64,' . $rightLogoData;
        $html .= "
        <table width='100%' style='margin-bottom: 20px;'>
            <tr>
                <td width='20%' style='text-align: left; padding-left:20px;'>
                    <img src='$leftLogoSrc' alt='Left Logo' style='height:80px;'>
                </td>
                <td width='60%'>
                    <div class='header-text'>
                        <div class='small'><strong>Republic of the Philippines</strong></div>
                        <div class='small'><strong>Department of Justice</strong></div>
                        <div class='large' style='color:#FF0000;'>PAROLE AND PROBATION ADMINISTRATION</div>
                        <div class='large' style='color:#006FC0;'>OFFICE OF THE ADMINISTRATOR</div>
                        <div class='small'>DOJ Agencies Building NIA Road cor. East Ave.</div>
                        <div class='small'>Telephone Number: (02) 8925-0235 | E-mail: aodojppa@gmail.com</div>
                        <div class='small'>Website: <span style='color:#0000FF'><u>https://probation.gov.ph</u></span></div>
                    </div>
                </td>
                <td width='20%' style='text-align: right; padding-right:20px;'>
                    <img src='$rightLogoSrc' alt='Right Logo' style='height:80px;'>
                </td>
            </tr>
        </table>
        ";
        $current_date = time(); 

        // Format the date using 'F j, Y'
        $formatted_date = date('F j, Y', $current_date);
        $html .= "<hr style='border: 1px solid #eb603c; margin: 20px 0;'>";
        $html .= "<br><br><div class='p_title'>RESULT OF RECORDS CHECK</div>";
        $html .= "<div class='p_title'>(COMMUNITY SERVICE)</div>";
        $html .= "<div class='p_title'>". $formatted_date ."</div><br><br>";
        $html .= "<p class='p_sentence'>This has reference to the request for records check on the client applying for community service</p>";
        $html .= "<p class='p_center' style='font-size: 10pt;'>$fullname</p>";
        if (!empty($data['community_masterlist'])) {
            $html .= "<br><p class='p_sentence'>The matrix below shows the similar name/s with the applicant’s name being requested for records check from 1978 to " . date('Y') . ":</p>";
        } else {
            $html .= "<br><p class='p_sentence'>The matrix below shows no similar name/s with the applicant’s name being requested for records check from 1978 to " . date('Y') . ".</p>";
        }
        $html .= "
        <table border='1' cellpadding='3' cellspacing='0' style='width:100%; border-collapse: collapse; table-layout: fixed; word-wrap: break-word;'>
            <thead>
                <tr>
                    <th rowspan='2' width='10%'>Docket Number</th>
                    <th rowspan='2' width='15%'>Client's Name</th>
                    <th rowspan='2' width='12%'>Criminal Case Number</th>
                    <th rowspan='2' width='13%'>Court of Origin</th>
                    <th rowspan='2' width='12%'>Assigned Officer</th>
                    <th rowspan='2' width='12%'>Field Office</th>
                    <th rowspan='2' width='12%'>Date Order Received by the PPO</th>
                    <th colspan='2' width='14%'>Community Service Period</th>
                </tr>
                <tr>
                    <th width='7%'>Start</th>
                    <th width='7%'>End</th>
                </tr>
            </thead>
            <tbody>
        ";        
        if (!empty($data['community_masterlist'])) {
            foreach ($data['community_masterlist'] as $row) {
                $html .= "<tr>
                            <td>{$row['docket_number']}</td>
                            <td>{$row['full_name']}</td>
                            <td>{$row['criminal_case_number']}</td>
                            <td>{$row['court_of_origin']}</td>
                            <td>{$row['assigned_officer']}</td>
                            <td>" . (!empty($row['field_office']) ? $row['field_office'] : '') . "</td>
                            <td>" . (!empty($row['date_received_by_ppo']) ? date('Y-m-d', strtotime($row['date_received_by_ppo'])) : '') . "</td>
                            <td>" . (!empty($row['community_service_start']) ? date('Y-m-d', strtotime($row['community_service_start'])) : '') . "</td>
                            <td>" . (!empty($row['community_service_end']) ? date('Y-m-d', strtotime($row['community_service_end'])) : '') . "</td>

                          </tr>";
            }
        } else {
            $html .= "<tr><td colspan='9'>No masterlist records found.</td></tr>";
        }
        $html .= "</tbody></table><br>";            
                  
        $html .= "<p class='p_sentence'>The list above does not include the data of the field offices that have not yet submitted their caseload information to the PPCMIS. Please refer to the PPCMIS - Community Service Masterlist to verify which field offices have not yet completed the system submission.</p>";
        $footer = FCPATH . 'images/footer.png';
        $footerData = base64_encode(file_get_contents($footer));

        $html .= "
            <style>
                @page {
                    margin-bottom: 200px;
                }
                .fixed-footer {
                    position: fixed;
                    bottom: -80px;
                    left: 0;
                    right: 0;
                    width: 100%;
                }
                .fixed-footer img {
                    /* display: block; */
                    width: 100%;
                    height: auto;
                }
            </style>

            <div style='
                margin-top:30px;
                margin-bottom:10px;
                font-family: Arial, sans-serif;
                font-size: 10pt;
                font-weight: bold;
                width: 100%;
                text-align: left;
            '>
                This is an Online Records Check Result. Signature is not required.<br>
                Please coordinate with the Supervising Office in case there is a similar name by using the Encrypted Communication Platform System.
            </div>

            <div class='fixed-footer'>
                <div style='
                    width: 100%;
                    text-align: center;
                '>
                    <img src='data:image/png;base64,{$footerData}' alt='ISO Footer Logo'>
                </div>
            </div>
        ";
        // Generate PDF
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        ob_end_clean(); // <--- ADD THIS LINE
        $dompdf->stream("Download Result.pdf", ["Attachment" => true]);
    }
    public function download_report_admin()
    {
        $dompdf = new Dompdf();

        $filters = [
            'REGION'        => $this->input->post('region'),
            'FIRSTNAME'     => $this->input->post('firstname'),
            'MIDDLENAME'    => $this->input->post('middlename'),
            'LASTNAME'      => $this->input->post('lastname'),
            'ALIAS'         => $this->input->post('alias'),
            'YEAR'          => $this->input->post('year'),
            'SDOCKETNO'     => $this->input->post('sdocketno'),
            'SUPERVOFFICE'  => $this->input->post('supervoffice'),
            'REMARKS'       => $this->input->post('remarks'),
            'START_DD'      => $this->input->post('start_dd'),
            'START_YY'      => $this->input->post('start_yy'),
            'START_MM'      => $this->input->post('start_mm'),
            'END_DD'        => $this->input->post('end_dd'),
            'END_YY'        => $this->input->post('end_yy'),
            'END_MM'        => $this->input->post('end_mm'),
        ];

        // Extract region and year for display
        $fname  = $filters['FIRSTNAME'];
        $mname  = $filters['MIDDLENAME'];
        $lname  = $filters['LASTNAME'];
        $full_name = $fname . ' ' . $mname . ' ' . $lname;

        // Use mb_convert_case for proper multi-byte (UTF-8) support, handles ñ correctly
        $fullname = mb_convert_case(mb_strtolower($full_name, 'UTF-8'), MB_CASE_TITLE, 'UTF-8');
        // Send request to API for masterlist
        $apiUrl_json = $this->api_base_url() . '/wsv1/Cmis/masterlist_json';
        $ch = curl_init($apiUrl_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($filters));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $response = curl_exec($ch);
        curl_close($ch);
        $data['masterlist'] = json_decode($response, true);

        // Get report data (non-filtered, just sorted)
        $apiUrl = $this->api_base_url() . '/wsv1/no_reports/get_reports/F5';
        $ch = curl_init($apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $apiResponse = curl_exec($ch);
        curl_close($ch);
        $reportData = json_decode($apiResponse, true);

        // Sort by id descending
        usort($reportData, function($a, $b) {
            return $b['id'] - $a['id'];
        });

        // Build HTML content
        $html = "
        <style>
            th,td {
                font-weight: normal;
                font-family: Arial, sans-serif;
                font-size: 8pt;
                text-align:center;
            }
            .p_sentence {
                text-indent: 60px;
                font-family: Arial, sans-serif;
                font-size: 12pt;
            }
            .p_title {
                font-family: Arial, sans-serif;
                font-weight: bold;
                font-size: 12pt;
                text-align: center;
            }
            .p_center {
                text-align: center;
                font-family: Arial, sans-serif;
                font-size: 12pt;
                font-weight: bold;
                text-decoration: underline;
            }
            .header-text {
                font-family: Tahoma, sans-serif;
                text-align: center;
            }

            .header-text .small {
                font-size: 8pt;
            }

            .header-text .large {
                font-size: 12pt;
                font-weight: bold;
            }
        </style>
        ";
        $leftLogoPath = FCPATH . 'images/ppa_logo.png';
        $rightLogoPath = FCPATH . 'images/bp_logo.png';

        $leftLogoData = base64_encode(file_get_contents($leftLogoPath));
        $rightLogoData = base64_encode(file_get_contents($rightLogoPath));

        $leftLogoSrc = 'data:image/png;base64,' . $leftLogoData;
        $rightLogoSrc = 'data:image/png;base64,' . $rightLogoData;
        $html .= "
        <table width='100%' style='margin-bottom: 20px;'>
            <tr>
                <td width='20%' style='text-align: left; padding-left:20px;'>
                    <img src='$leftLogoSrc' alt='Left Logo' style='height:80px;'>
                </td>
                <td width='60%'>
                    <div class='header-text'>
                        <div class='small'><strong>Republic of the Philippines</strong></div>
                        <div class='small'><strong>Department of Justice</strong></div>
                        <div class='large' style='color:#FF0000;'>PAROLE AND PROBATION ADMINISTRATION</div>
                        <div class='large' style='color:#006FC0;'>OFFICE OF THE ADMINISTRATOR</div>
                        <div class='small'>DOJ Agencies Building NIA Road cor. East Ave.</div>
                        <div class='small'>Telephone Number: (02) 8925-0235 | E-mail: aodojppa@gmail.com</div>
                        <div class='small'>Website: <span style='color:#0000FF'><u>https://probation.gov.ph</u></span></div>
                    </div>
                </td>
                <td width='20%' style='text-align: right; padding-right:20px;'>
                    <img src='$rightLogoSrc' alt='Right Logo' style='height:80px;'>
                </td>
            </tr>
        </table>
        ";
        $current_date = time(); 

        // Format the date using 'F j, Y'
        $formatted_date = date('F j, Y', $current_date);
        $html .= "<hr style='border: 1px solid #eb603c; margin: 20px 0;'>";
        $html .= "<br><br><div class='p_title'>RESULT OF RECORDS CHECK</div>";
        $html .= "<div class='p_title'>(PROBATION)</div>";
        $html .= "<div class='p_title'>". $formatted_date ."</div><br><br>";
        $html .= "<p class='p_sentence'>This has reference to the request for records check on petitioner</p>";
        $html .= "<p class='p_center' style='font-size: 10pt;'>$fullname</p>";
        if (!empty($data['masterlist'])) {
            $html .= "<br><p class='p_sentence'>The matrix below shows the similar name/s with the petitioner’s name being requested for records check from 1978 to " . date('Y') . ":</p>";
        } else {
            $html .= "<br><p class='p_sentence'>The matrix below shows no similar name/s with the petitioner’s name being requested for records check from 1978 to " . date('Y') . ".</p>";
        }
        $html .= "
        <table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'>
            <thead>
                <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>True Name/Alias</th>
                    <th>Supervising Office</th>
                    <th>Remarks</th>
                    <th>Region</th>
                    <th>Docket Number</th>
                    <th>Year</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
        ";        
        if (!empty($data['masterlist'])) {
            foreach ($data['masterlist'] as $row) {
                $html .= "<tr>
                            <td>{$row['LASTNAME']}</td>
                            <td>{$row['FIRSTNAME']}</td>
                            <td>{$row['MIDDLENAME']}</td>
                            <td>{$row['ALIAS']}</td>
                            <td>{$row['SUPVOFFICE']}</td>
                            <td>{$row['REMARKS']}</td>
                            <td>{$row['REGION']}</td>
                            <td>{$row['SDOCKETNO']}</td>
                            <td>{$row['YEAR']}</td>
                            <td>{$row['START_DATE']}</td>
                            <td>{$row['END_DATE']}</td>
                          </tr>";
            }
        } else {
            $html .= "<tr><td colspan='11'>No masterlist records found.</td></tr>";
        }
        $html .= "</tbody></table><br>";            
        $html .= "<p class='p_sentence'>The list above does not include the data of the field offices that have not filled out their caseload to the system, namely;</p>";
        $html .= "<table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'>
                    <thead>
                        <tr>
                            <th>Office</th>
                            <th>Region</th>
                            <th>Month-Year</th>
                        </tr>
                    </thead>
                    <tbody>";

        if (empty($reportData)) {
            $html .= "<tr><td colspan='3'>No records found.</td></tr>";
        } else {
            foreach ($reportData as $report) {
                $html .= "<tr>
                            <td>{$report['office']}</td>
                            <td>{$report['region_name']}</td>
                            <td>{$report['month_year']}</td>
                          </tr>";
            }
        }

        $html .= "</tbody></table>";
        $footer = FCPATH . 'images/footer.png';
        $footerData = base64_encode(file_get_contents($footer));

        $html .= "
            <div style='
                margin-top:40px;
                font-family: Arial, sans-serif;
                font-size: 10pt;
                width: 100%;
                text-align: left;
            '>
                This is an Online Records Check Result. Signature is not required.<br>
                Please coordinate with the Supervising Office in case there is a similar name by using the Encrypted Communication Platform System.
            </div>

            <div style='
                margin-top:20px;
                width: 100%;
                text-align: center;
            '>
                <img src='data:image/png;base64,{$footerData}' alt='ISO Footer Logo' style='width:100%; height:auto;'>
            </div>
        ";
        // Generate PDF
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $dompdf->stream("Download Result.pdf", ["Attachment" => true]);
    }
    public function download_report_CS_admin()
    {
        $dompdf = new Dompdf();

        $filters = [
            'docket_number'   => $this->input->post('docket_number'),
            'first_name'      => $this->input->post('first_name'),
            'middle_name'     => $this->input->post('middle_name'),
            'last_name'       => $this->input->post('last_name'),
            'cc_number'       => $this->input->post('cc_number'),
            'court_of_origin' => $this->input->post('court_of_origin'),
            'assigned_officer'=> $this->input->post('assigned_officer'),
            'field_office'    => $this->input->post('field_office'),
            'year'            => $this->input->post('year'),
            'start_date'      => $this->input->post('start_date'), // expect YYYY-MM-DD
            'end_date'        => $this->input->post('end_date'),   // expect YYYY-MM-DD
        ];

        // Extract region and year for display
        $fname  = $filters['first_name'];
        $mname  = $filters['middle_name'];
        $lname  = $filters['last_name'];

        $full_name = $fname . ' ' . $mname . ' ' . $lname;
        $fullname = ucwords(strtolower($full_name));
        // Send request to API for community_masterlist
        $apiUrl_json = $this->api_base_url() . '/wsv1/Expansion/community_json';
        $ch = curl_init($apiUrl_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($filters));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $response = curl_exec($ch);
        curl_close($ch);
        $decoded = json_decode($response, true);
        // Keep PDF workflow intact when API returns HTML/error instead of JSON
        $data['community_masterlist'] = is_array($decoded) ? $decoded : array();

        // Get report data (non-filtered, just sorted)
        $apiUrl = $this->api_base_url() . '/wsv1/no_reports/get_reports/F53';
        $ch = curl_init($apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $apiResponse = curl_exec($ch);
        curl_close($ch);
        $reportData = json_decode($apiResponse, true);

        // Sort by id descending
        usort($reportData, function($a, $b) {
            return $b['id'] - $a['id'];
        });

        // Build HTML content
        $html = "
        <style>
            th,td {
                font-weight: normal;
                font-family: Arial, sans-serif;
                font-size: 8pt;
                text-align:center;
            }
            .p_sentence {
                text-indent: 60px;
                font-family: Arial, sans-serif;
                font-size: 12pt;
            }
            .p_title {
                font-family: Arial, sans-serif;
                font-weight: bold;
                font-size: 12pt;
                text-align: center;
            }
            .p_center {
                text-align: center;
                font-family: Arial, sans-serif;
                font-size: 12pt;
                font-weight: bold;
                text-decoration: underline;
            }
            .header-text {
                font-family: Tahoma, sans-serif;
                text-align: center;
            }

            .header-text .small {
                font-size: 8pt;
            }

            .header-text .large {
                font-size: 12pt;
                font-weight: bold;
            }
        </style>
        ";
        $leftLogoPath = FCPATH . 'images/ppa_logo.png';
        $rightLogoPath = FCPATH . 'images/bp_logo.png';

        $leftLogoData = base64_encode(file_get_contents($leftLogoPath));
        $rightLogoData = base64_encode(file_get_contents($rightLogoPath));

        $leftLogoSrc = 'data:image/png;base64,' . $leftLogoData;
        $rightLogoSrc = 'data:image/png;base64,' . $rightLogoData;
        $html .= "
        <table width='100%' style='margin-bottom: 20px;'>
            <tr>
                <td width='20%' style='text-align: left; padding-left:20px;'>
                    <img src='$leftLogoSrc' alt='Left Logo' style='height:80px;'>
                </td>
                <td width='60%'>
                    <div class='header-text'>
                        <div class='small'><strong>Republic of the Philippines</strong></div>
                        <div class='small'><strong>Department of Justice</strong></div>
                        <div class='large' style='color:#FF0000;'>PAROLE AND PROBATION ADMINISTRATION</div>
                        <div class='large' style='color:#006FC0;'>OFFICE OF THE ADMINISTRATOR</div>
                        <div class='small'>DOJ Agencies Building NIA Road cor. East Ave.</div>
                        <div class='small'>Telephone Number: (02) 8925-0235 | E-mail: aodojppa@gmail.com</div>
                        <div class='small'>Website: <span style='color:#0000FF'><u>https://probation.gov.ph</u></span></div>
                    </div>
                </td>
                <td width='20%' style='text-align: right; padding-right:20px;'>
                    <img src='$rightLogoSrc' alt='Right Logo' style='height:80px;'>
                </td>
            </tr>
        </table>
        ";
        $current_date = time(); 

        // Format the date using 'F j, Y'
        $formatted_date = date('F j, Y', $current_date);
        $html .= "<hr style='border: 1px solid #eb603c; margin: 20px 0;'>";
        $html .= "<br><br><div class='p_title'>RESULT OF RECORDS CHECK</div>";
        $html .= "<div class='p_title'>(COMMUNITY SERVICE)</div>";
        $html .= "<div class='p_title'>". $formatted_date ."</div><br><br>";
        $html .= "<p class='p_sentence'>This has reference to the request for records check on the client applying for community service</p>";
        $html .= "<p class='p_center' style='font-size: 10pt;'>$fullname</p>";
        if (!empty($data['community_masterlist'])) {
            $html .= "<br><p class='p_sentence'>The matrix below shows the similar name/s with the applicant’s name being requested for records check from 1978 to " . date('Y') . ":</p>";
        } else {
            $html .= "<br><p class='p_sentence'>The matrix below shows no similar name/s with the applicant’s name being requested for records check from 1978 to " . date('Y') . ".</p>";
        }
        $html .= "
        <table border='1' cellpadding='3' cellspacing='0' style='width:100%; border-collapse: collapse; table-layout: fixed; word-wrap: break-word;'>
            <thead>
                <tr>
                    <th rowspan='2' width='10%'>Docket Number</th>
                    <th rowspan='2' width='15%'>Client's Name</th>
                    <th rowspan='2' width='12%'>Criminal Case Number</th>
                    <th rowspan='2' width='13%'>Court of Origin</th>
                    <th rowspan='2' width='12%'>Assigned Officer</th>
                    <th rowspan='2' width='12%'>Field Office</th>
                    <th rowspan='2' width='12%'>Date Order Received by the PPO</th>
                    <th colspan='2' width='14%'>Community Service Period</th>
                </tr>
                <tr>
                    <th width='7%'>Start</th>
                    <th width='7%'>End</th>
                </tr>
            </thead>
            <tbody>
        ";        
        if (!empty($data['community_masterlist'])) {
            foreach ($data['community_masterlist'] as $row) {
                $html .= "<tr>
                            <td>{$row['docket_number']}</td>
                            <td>{$row['full_name']}</td>
                            <td>{$row['criminal_case_number']}</td>
                            <td>{$row['court_of_origin']}</td>
                            <td>{$row['assigned_officer']}</td>
                            <td>" . (!empty($row['field_office']) ? $row['field_office'] : '') . "</td>
                            <td>" . (!empty($row['date_received_by_ppo']) ? date('Y-m-d', strtotime($row['date_received_by_ppo'])) : '') . "</td>
                            <td>" . (!empty($row['community_service_start']) ? date('Y-m-d', strtotime($row['community_service_start'])) : '') . "</td>
                            <td>" . (!empty($row['community_service_end']) ? date('Y-m-d', strtotime($row['community_service_end'])) : '') . "</td>

                          </tr>";
            }
        } else {
            $html .= "<tr><td colspan='9'>No masterlist records found.</td></tr>";
        }
        $html .= "</tbody></table><br>";            
        $html .= "<p class='p_sentence'>The list above does not include the data of the field offices that have not filled out their caseload to the system, namely;</p>";
        $html .= "<table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'>
                    <thead>
                        <tr>
                            <th>Office</th>
                            <th>Region</th>
                            <th>Month-Year</th>
                        </tr>
                    </thead>
                    <tbody>";

        if (empty($reportData)) {
            $html .= "<tr><td colspan='3'>No records found.</td></tr>";
        } else {
            foreach ($reportData as $report) {
                $html .= "<tr>
                            <td>{$report['office']}</td>
                            <td>{$report['region_name']}</td>
                            <td>{$report['month_year']}</td>
                          </tr>";
            }
        }

        $html .= "</tbody></table>";
        $footer = FCPATH . 'images/footer.png';
        $footerData = base64_encode(file_get_contents($footer));

        $html .= "

            <div style='
                margin-top:40px;
                font-family: Arial, sans-serif;
                font-size: 10pt;
                width: 100%;
                text-align: left;
            '>
                This is an Online Records Check Result. Signature is not required.<br>
                Please coordinate with the Supervising Office in case there is a similar name by using the Encrypted Communication Platform System.
            </div>

            <div style='
                margin-top:20px;
                width: 100%;
                text-align: center;
            '>
                <img src='data:image/png;base64,{$footerData}' alt='ISO Footer Logo' style='width:100%; height:auto;'>
            </div>
        ";
        // Generate PDF
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        ob_end_clean(); // <--- ADD THIS LINE
        $dompdf->stream("Download Result.pdf", ["Attachment" => true]);
    }
}
