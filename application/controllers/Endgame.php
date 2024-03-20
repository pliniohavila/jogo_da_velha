<?php
defined('BASEPATH') OR exit('No direct script access allowed');


// localhost/endgame/save_has_winner?winnerId=1&loserId=3
class Endgame extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('Endgame_model');
    }

    public function save_has_winner() {
        
        $winnerId = $this->input->get('winnerId', TRUE);
        $loserId = $this->input->get('loserId', TRUE);

        // Check an error handling later 
        $this->Endgame_model->saveWinner($winnerId);
        // $this->Endgame_model->saveLoser($winnerId);

        // $id = $this->Player_info_model->get_id_player($player, $last_time_played);
        // $response = array('id' => $id);
        
        // echo json_encode($response);
    }
}
