

GET players_info?player1={player1}&player2={player2}


POST saveIsWinner
    body: JSON
        winner: winner.id
        losser: losser.id


POST saveIsTies
    body: JSON 
        ties: [
            player1.id, 
            player2.id,
        ]


        var host = window.location.protocol + "//" + window.location.host;