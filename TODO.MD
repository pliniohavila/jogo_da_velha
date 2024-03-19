# TODO

[X] Escolher entre um ou dois jogadores
[X] Nome do Jogador 
[X] Jogador Escolhe entre `X` ou `O`  
[X] Destacar os quadrados relativos à vitória 
[X] Placar
[X] Remove Event listerner
[ ] Impedir usuário de utilizar nome 'Baymax'

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
[ ] att_input_lis
[ ] Não incluir Baymax no ranking
[ ] Ranking dos jogadores
    Deve constar:
        nome do jogador, data da última partida, Quantidade de vitórias, empates e derrotas 
        Ordenado, por vitória: 3pts, Empates 1pts, Derrota 0pts

        Critérios de desempate 
        1 - Por mais vitórias 
        2 - Menos empates 
        3 - Menos derrotas

TIC-TAC-TOE [
    Player: {
        name: 
        wins: 
        losses:
        ties:
        lastTimePleyed: timestamp
    }, 
]


TABLE TIC-TAC-TOE 

id 
name
wins
losses
ties
lastTimePleyed: date


class Player {
    constructor(name, symbol) {
        this.id;
        this.name = name;
        this.symbol = symbols[symbol];
    }
}

https://www.w3schools.com/tags/att_input_list.asp

Toda vez que um novo é iniciado, recupera os dados do localStorage. 
Verifica-se há algum registro pelo nome do jogador
    Se sim: 
        Atualiza o timestamp
    Caso não:
        insere o no localStorage  

Ao final de cada partida os dados do jogador é atualizado no localStorage


Para exibir:
    Recuperar os dados do localStorage, ordenada e relaciona
