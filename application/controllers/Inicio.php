<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {
	
	function __construct()
    {
        parent::__construct();
		$this->load->model('Player_model');
        $this->load->helper('url');
    }
    
	public function index()
	{	
		try {
			$data['ranking'] = $this->Player_model->get_ranking();			
		} catch (\Throwable $th) {
			http_response_code(500);
            echo json_encode(['message' => false , 'message' => $th->getMessage()]);
            exit();
		}
		$this->load->view('inicio', $data);
	}
}
