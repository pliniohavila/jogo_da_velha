<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Player_model extends CI_Model {

    public function __construct() 
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_id_player(string $name, string $last_time_played)
    {
        $this->db->select('id');
        $this->db->from('game_data');
        $this->db->like('name', $name);
        $query = $this->db->get();
        $result = $query->result();

        if (empty($result)) 
        {
            $data = array(
                'name' => $name,
                'lastTimePlayed' => $last_time_played,
            );
            $this->db->insert('game_data', $data);
            return $this->db->insert_id();
        } 

        $id = $result[0]->id;   
        if (!empty($result)) 
        {
            $this->db->set('lastTimePlayed', $last_time_played)
                ->where('id', $id)
                ->update('game_data');
        }
        return $id;
    }

    public function get_ranking()
    {
        $query = $this->db->query(
            "SELECT id, name, points, wins, losses, ties, lastTimePlayed 
            FROM game_data 
            WHERE name != 'Baymax'
            ORDER BY points 
            DESC, wins DESC, losses ASC, ties ASC");
        return $query->result_array();
    }
}