<?php
defined('BASEPATH') OR exit('No direct script access allowed');


// localhost/endgame/save_has_winner?winnerId=1&loserId=3
class Endgame extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('Endgame_model');
    }

    public function save_has_winner()
    {
        
        $winner_id = $this->input->get('winnerId', TRUE);
        $loser_id = $this->input->get('loserId', TRUE);
        
        try {
            $this->Endgame_model->save_winner($winner_id);
            $this->Endgame_model->save_loser($loser_id);
        } catch (\Throwable $th) {            
            http_response_code(500);
            echo json_encode(['message' => false , 'message' => $th->getMessage()]);
            exit();
        }
    }

    public function save_is_tie()
    {
        $player1 = $this->input->get('p1', TRUE);
        $player2 = $this->input->get('p2', TRUE);
        
        try {
            $this->Endgame_model->save_is_tie($player1, $player2);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['message' => false , 'message' => $th->getMessage()]);
            exit();
        }

    }
}
