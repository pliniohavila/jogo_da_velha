<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Endgame_model extends CI_Model {

    public function __construct() 
    {
        parent::__construct();
        $this->load->database();
    }

    public function save_winner(int $id)
    {
        try {
            $this->db->set('wins', 'wins + 1', FALSE);
            $this->db->where('id', $id);
            $this->db->update('game_data');
            $this->update_points($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function save_loser(int $id)
    {   
        try {
            $this->db->set('losses', 'losses + 1', FALSE);
            $this->db->where('id', $id);
            $this->db->update('game_data');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function save_is_tie(int $player1Id, int $player2Id)
    {
        try {
            $this->db->set('ties', 'ties + 1', FALSE);
            $this->db->where('id', $player1Id);
            $this->db->update('game_data');

            $this->db->set('ties', 'ties + 1', FALSE);
            $this->db->where('id', $player2Id);
            $this->db->update('game_data');

            $this->update_points($player1Id);
            $this->update_points($player2Id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    function update_points(int $id)
    {
        try {
            $this->db->set('points', '(wins * 3) + ties', FALSE);
            $this->db->where('id', $id);
            $this->db->update('game_data');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}