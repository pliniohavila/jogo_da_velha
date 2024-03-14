# TODO

[X] Escolher entre um ou dois jogadores
[X] Nome do Jogador 
[X] Jogador Escolhe entre `X` ou `O`  
[X] Destacar os quadrados relativos à vitória 
[X] Placar
[ ] Remove Event listerner

// baymax
Nome do jogador 1: 
Verifica se vai ser um ou dois jogadores, caso sim: insira o nome do segundo jogador 
Nome do jogador 2:


BUG NA ATUALIZAÇÃO DO NOME DOS PLAYERS

https://sweetalert2.github.io

[X] Remove o event listener após o término da partida
[X] Alerts mais legais
[X] Botão para reiniciar jogo
[X] Botão para adicionar jogador 
[X] Opção de símbolo seja gráfica
[ ] Ranking dos jogadores
    Deve constar:
        nome do jogador, data da última partida, Quantidade de vitórias, empates e derrotas 
        Ordenado, por vitória: 3pts, Empates 2pts, Derrota 0pts

TIC-TAC-TOE [
    Player: {
        name: 
        wins: 
        losses:
        ties:
        lastTimePleyed: timestamp
    }, 
]

Toda vez que um novo é iniciado, recupera os dados do localStorage. 
Verifica-se há algum registro pelo nome do jogador
    Se sim: 
        Atualiza o timestamp
    Caso não:
        insere o no localStorage  

Ao final de cada partida os dados do jogador é atualizado no localStorage


Para exibir:
    Recuperar os dados do localStorage, ordenada e relaciona
