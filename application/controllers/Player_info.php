<?php
defined('BASEPATH') OR exit('No direct script access allowed');


// localhost/player_info?player=Peralta&t=2024-03-20T18:38:37.892Z
class Player_info extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('Player_info_model');
    }

    public function index() {
        
        $player = $this->input->get('player', TRUE);
        $last_time_played = $this->input->get('t', TRUE);

        $id = $this->Player_info_model->get_id_player($player, $last_time_played);
        $response = array('id' => $id);
        
        echo json_encode($response);
    }
}
