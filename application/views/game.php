<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" type="text/css" href="assets/css/styles.css" /> 
    <title>Jogo da Velha</title>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>
            Jogo da Velha
        </h1>
        <div class="actual-player" id="actual-player">
            <h3 id="actual-player-content"></h3>
        </div>
    </div>
    <div class="game">
        <table>
            <tr>
                <td class="td_border_right td-game" id="00">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>
                </td>
                <td class="td_border_right td-game" id="01">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>
                </td>
                <td class="td-game" id="02">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>
                </td>
            </tr>
            <tr class="tr-middle">
                <td class="td_border_right td-game" id="10">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>
                </td>
                <td class="td_border_right td-game" id="11">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>
                </td>
                <td class="td-game" id="12">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>
                </td>
            </tr>
            <tr>
                <td class="td_border_right td-game" id="20">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>
                </td>
                <td class="td_border_right td-game" id="21">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>  
                </td>
                <td class="td-game" id="22">
                    <div class="mark_x"></div>
                    <div class="mark_o"></div>
                </td>
            </tr>
        </table>
        <div class="placar">
            <div>
                <h3 class="placar-title">Placar</h3>
            </div>
            <table class="placar-table">
                <thead>
                    <tr>
                        <th>Jogador (a)</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="placar-player1-name"></td>
                        <td id="placar-player1-points"></td>
                    </tr>
                    <tr>
                        <td id="placar-player2-name"></td>
                        <td id="placar-player2-points"></th>
                    </tr>
                    <tr>
                        <td>Empates</td>
                        <td id="placar-tie"></th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="footer">
        <button id="retart" class="restart" onclick="resetGame()">
            Reiniciar Partida
        </button>
        <button id="retart" class="restart" onclick="newGame()">
            Novo Jogo
        </button>
    </div>
</div>

<div id="options" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Opções de Jogo</h2>
        </div>
    <div class="modal-body">
        <div class="infos-group">
            <label for="player1">
                Nome da Pessoa Jogadora 1: 
                <span class="player-name-empty">Insira o nome da Pessoa Jogadora</span>
            </label>
            <input type="text" name="player1" list="player1" id="player1" class="infos-input"/>
            <datalist id="player1">
                <option value="Peralta">
            </datalist>
        </div>
        <div class="infos-group">
            <button type="button" class="btn-add-player" id="option-two-players" onclick="showInputPlayer2()">
                Adicionar Pessoa Jogadora
            </button>
        </div>
        <div class="infos-group infos-group-hidden" id="input-player2">
            <label for="player2">
                Nome da Pessoa Jogadora 2: 
                <span class="player-name-empty">Insira o nome da Pessoa Jogadora</span>
            </label>
            <input type="text" name="player2" list="player2" id="player2" class="infos-input"/>
            <datalist id="player2">
                <option value="Diás">
            </datalist>
        </div>
        <div class="infos-group">
            <label for="player2">O Jogador 1 escolhe qual símbolo?</label>
            <div class="radio-image">
                <label for="x">
                    <input type="radio" name="symbol" id="x" value="x" checked>
                    <img src="assets/img/x.svg" alt="X">
                </label>
                <label for="o">
                    <input type="radio" name="symbol" id="o" value="o">
                    <img src="assets/img/o.svg" alt="O">
                </label>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="start" class="start" onclick="startGame()">
            Iniciar Jogo
        </button>
    </div>
</div>
</body>
<script src="assets/js/game.js"></script>
<script src="assets/js/gameData.js"></script>
</html>