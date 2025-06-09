<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends CI_Controller {

    public function download_report()
    {
        // Load CI's download helper
        $this->load->helper('download');

        // Customize the content
        $content = "This is a dynamically generated report.\nGenerated at: " . date("Y-m-d H:i:s");

        // Force download as 'report.txt'
        force_download('report.pdf', $content);
    }
}
