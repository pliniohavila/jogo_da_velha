<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Endgame_model extends CI_Model {

    public function __construct() 
    {
        parent::__construct();
        $this->load->database();
    }

    public function saveWinner(int $id)
    {
        $this->db->set('wins', 'wins + 1', FALSE);
        $this->db->where('id', $id);
        $this->db->update('game_data');
    
        $this->db->set('points', 'wins * 3', FALSE);
        $this->db->where('id', $id);
        $this->db->update('game_data');
    }
}