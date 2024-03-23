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
[X] Não incluir Baymax no ranking
[X] Ranking dos jogadores
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


TABLE GAME_DATA

id: int unsigned auto_increment NOT NULL
name: varchar NOT NULL
wins: int NOT NULL DEFAULT 0
losses: int NOT NULL DEFAULT 0
ties: int NOT NULL DEFAULT 0
lastTimePleyed: varchar


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



Variáveis de ambiente:

https://stackoverflow.com/questions/45852926/how-can-i-add-env-to-codeigniter

Migrations

https://medium.com/@sunfreitas/entendendo-as-migrações-do-codeigniter-3-parte-i-79b1e28a580c