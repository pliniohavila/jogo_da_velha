<?php
defined('BASEPATH') OR exit('No direct script access allowed');


// localhost/players_info?player1=Olaaa&player2=Maycon
class Players_info extends CI_Controller {

    public function index() {
        echo '<pre>';
        print_r($_GET);
        echo '</pre>';
        exit();
        
        $player1 = $this->input->get('player1', TRUE);
        $player2 = $this->input->get('player2', TRUE);

        $data = array(
            'player1' => $player1,
            'player2' => $player2,
        );
        var_dump(parse_str($_SERVER['REQUEST_URI'], $_GET));
        var_dump($data);
        // exit();
        

        // $this->load->view('players_info_view', $data);
    }
}
