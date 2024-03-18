// DATA GAME

const data_game = [
    [0, 0 , 0],
    [0, 0 , 0],
    [0, 0 , 0],
];

const PLACAR = {
    player1: 0,
    player2: 0,
    tie: 0
}

const symbols = {
    'x': {
        symbolId: 1,
        symbolIcon: '.mark_x',
    }, 
    'o': {
        symbolId: 2,
        symbolIcon: '.mark_o',
    }
}

// const KEY_DATA_GAME = 'tic-tac-toe';

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbols[symbol];
    }
}
const tds = document.getElementsByTagName('td');
const tds_arr = Array.from(tds);

let PLAYER_1;
let PLAYER_2;
let ACTUAL_PLAYER;
let TWO_PLAYERS = false;
let MACHINE;

// HANDLERS

function startGame() {
    MACHINE = 1;
    addEventListeners();
    
    const players = getInfoPlayers();
    if (!checkNamePlayers(players))
        return;

    const modal = document.getElementById("options");  
    modal.style.display = 'none';
    PLAYER_1 = new Player(players.player1, players.player1Symbol);
    if (players.player2.length === 0) {
        PLAYER_2 = new Player('Baymax', players.player2Symbol);
    } else {
        PLAYER_2 = new Player(players.player2, players.player2Symbol);
        MACHINE = 0;
    }
    // Save localStorage game data
    saveInitialGame(PLAYER_1, PLAYER_2);
    getById('placar-player1-name').innerText = PLAYER_1.name;
    getById('placar-player2-name').innerText = PLAYER_2.name;

    const randomPlayerStart = getRandom() % 3;
    if (randomPlayerStart === 1) {
        ACTUAL_PLAYER = PLAYER_1;
    } else {
        if (MACHINE === 1) {
            ACTUAL_PLAYER = PLAYER_1;
            machineMark(); 
        }
        else {
            ACTUAL_PLAYER = PLAYER_2;
        } 
    }     
    updatePlacar();
    if (MACHINE === 0) 
        showPlacar();
}

function showPlacar() {
    getById('actual-player').style.display = 'block';
    updateActualPlayerShow();
}

function newGame() {
    PLAYER_1 = undefined;
    PLAYER_2 = undefined;
    ACTUAL_PLAYER = undefined;
    TWO_PLAYERS = false;
    MACHINE = 1;
    resetGame() 
    resetPlacar()
    removeEventListeners();
    getById('actual-player').style.display = 'none';
    document.getElementById("options").style.display = 'block';
}

function updateActualPlayerShow() {
    getById('actual-player-content').innerText = `Agora é a vez de ${ACTUAL_PLAYER.name}`;
}
let i = 0;
function playerMark(td) {
    const [line_s, column_s] = td.id.split('');
    const line = parseInt(line_s);
    const column = parseInt(column_s);
    if (data_game[line][column] !== 0) {
        return;
    }
    if (data_game[line][column] === 0)
    {
        data_game[line][column] = ACTUAL_PLAYER.symbol.symbolId;
        const x_div = td.querySelector(ACTUAL_PLAYER.symbol.symbolIcon);
        x_div.style.display = 'block';
    }
    if (checkEndGame()) {
        removeEventListeners();
        return;
    }
    if (MACHINE === 1) {
        machineMark();
    }
    else {
        ACTUAL_PLAYER = ACTUAL_PLAYER === PLAYER_1 ? PLAYER_2 : PLAYER_1;
        updateActualPlayerShow();
    } 
}

function machineMark() {
    let line = getRandom();
    let column = getRandom();
    let flag = true;
    while (flag)
    {
        if (data_game[line][column] === 0)
        {
            data_game[line][column] = PLAYER_2.symbol.symbolId;
            const id_div = `${line}${column}`
            const td = getById(id_div);
            const o_div = td.querySelector(PLAYER_2.symbol.symbolIcon);
            o_div.style.display = 'block';
            flag = false;
        }
        // To avoid infinite interactions in the event of a tie
        if (checkTie())
            flag = false;
        line = getRandom();
        column = getRandom();
    }
    setTimeout(() => { 
        if (checkEndGame())
        {
            removeEventListeners();
            return;
        }
     }, 200);
}

function resetGame() {
    const all_mark_x = Array.from(document.getElementsByClassName('mark_x'));
    const all_mark_o = Array.from(document.getElementsByClassName('mark_o'));
    all_mark_x.forEach((mark_x) => {
        mark_x.style.display = "none";
    });    
    all_mark_o.forEach((mark_o) => {
        mark_o.style.display = "none";
    });     
    removeHighlight();
    resetDataGame(); 
    addEventListeners();
    const randomPlayerStart = getRandom() % 3;
    if (randomPlayerStart === PLAYER_2)
        machineMark(); 
}

function checkEndGame() {
    let checkedWin = checkWin(PLAYER_1.symbol.symbolId); 

    // const endGameEvent = new CustomEvent('endGameEvent', {
    //     detail: {
    //         mensagem: 'A match ended'
    //     }
    // });

    // let checked = {
    //     gameEnded: false,
    //     win: '', 
    //     loser: '',
    //     tie: false, 
    //     players: [],
    // };
    
    if (checkedWin.won) {
        highlight(checkedWin.index);
        PLACAR.player1++;
        updatePlacar();
        saveDataPlayerWin(PLAYER_1, PLAYER_2);
        setTimeout(() => {
            Swal.fire(`A pessoa jogadora ${PLAYER_1.name} ganhou 😎`);
        }, 200);
        return true;
    }

    checkedWin = checkWin(PLAYER_2.symbol.symbolId); 
    if (checkedWin.won) {
        highlight(checkedWin.index);
        PLACAR.player2++;
        updatePlacar();
        saveDataPlayerWin(PLAYER_2, PLAYER_1);
        setTimeout(() => {
            if (MACHINE == 1)
                Swal.fire("Você perdeu 😒");
            else 
                Swal.fire(`A pessoa jogadora ${PLAYER_2.name} ganhou 😎`);
        }, 200);
        return true;
    }
        
    if (checkTie()) {
        PLACAR.tie++;
        updatePlacar();
        saveDataTie(PLAYER_2, PLAYER_1);
        alert("Deu empate 🤣");
        return true;
    } 
    return false;
}

function getIndexPlayerData(playerName, gameData) {
    const index = gameData.findIndex((p) => {
        return p.name === playerName;
    });
    return index;
}

function saveDataPlayerWin(playerWin, playerLoser) {
    const storedGameData = localStorage.getItem(KEY_DATA_GAME);
    const gameData = JSON.parse(storedGameData);

    indexWin = getIndexPlayerData(playerWin.name, gameData);
    indexLoser = getIndexPlayerData(playerLoser.name, gameData);
    console.log(indexLoser, playerLoser);
    if (indexWin !== (-1)) {
        gameData[indexWin].wins++;
        gameData[indexWin].points = (gameData[indexWin].wins * 3) + (gameData[indexWin].ties * 2);
    }
    if (indexLoser !== (-1)) {
        gameData[indexLoser].losses++;
    }
    localStorage.setItem(KEY_DATA_GAME, JSON.stringify(gameData));
}

function saveDataTie(p1, p2) {
    const storedGameData = localStorage.getItem(KEY_DATA_GAME);
    const gameData = JSON.parse(storedGameData);

    player1 = getIndexPlayerData(p1.name, gameData);
    player2 = getIndexPlayerData(p2.name, gameData);
    if (player1 !== (-1)) {
        gameData[player1].ties++;
        gameData[player1].points = (gameData[player1].wins * 3) + (gameData[player1].ties * 2);
    }
    if (player2 !== (-1)) {
        player2.ties++;
        gameData[player2].points = (gameData[player2].wins * 3) + (gameData[player2].ties * 2);
    }
    console.log(gameData);
    localStorage.setItem(KEY_DATA_GAME, JSON.stringify(gameData));

}

function highlight(index) {
    const q0 = index[0].join('');
    const q1 = index[1].join('');
    const q2 = index[2].join('');

    getById(q0).classList.add('highlight');
    getById(q1).classList.add('highlight');
    getById(q2).classList.add('highlight');
}

function removeHighlight() {
    for (let td of tds) {
        if (td.classList.contains('highlight'))
            td.classList.remove('highlight');
    }
}

function showInputPlayer2() {
    const divInputPlayer2 = getById('input-player2');
    const btnAddPLayer = getById('option-two-players');
    const divInputPlayer2ClassList = divInputPlayer2.classList;
    if (divInputPlayer2ClassList.contains('infos-group-hidden')) {
        divInputPlayer2.classList.remove('infos-group-hidden');
        btnAddPLayer.innerText = 'Remover Pessoa Jogadora';
        TWO_PLAYERS = true;
    }
    else {
        divInputPlayer2.classList.add('infos-group-hidden');
        btnAddPLayer.innerText = 'Adicionar Pessoa Jogadora'
        TWO_PLAYERS = false;
    }
}
        
function updatePlacar() {
    getById('placar-player1-points').innerText = PLACAR.player1;
    getById('placar-player2-points').innerText = PLACAR.player2;
    getById('placar-tie').innerText = PLACAR.tie;
}

// HELPERS 

function checkNamePlayers(players) {
    if (players.player1 === '') {
        getById('player1').parentElement.querySelector('.player-name-empty').style.display = 'block';
        return false;
    }
    if (TWO_PLAYERS === true && players.player2 === '') {
        getById('player2').parentElement.querySelector('.player-name-empty').style.display = 'block';
        return false;
    }
    return true;
}

function checkWin(p) {
    let checkedWin = {
        won: false,
        index: []
    };

    for (let i = 0; i < 3; i++) {
        if (data_game[i][3 - 1] === p && 
            data_game[i][3 - 2] === p &&
            data_game[i][3 - 3] === p) {
                checkedWin = {
                    won: true, 
                    index: [[i, 3-1], [i, 3-2], [i, 3-3]]
                };
            }
    }
    for (let i = 0; i < 3; i++) {
        if (data_game[0][i] === p && 
            data_game[1][i] === p &&
            data_game[2][i] === p) {
                checkedWin = {
                    won: true, 
                    index: [[0, i], [1, i], [2, i]]
                };
            }
    }

    if (data_game[0][0] === p &&
        data_game[1][1] === p &&
        data_game[2][2] === p) {
            checkedWin  = {
                won: true, 
                index: [[0, 0], [1, 1], [2, 2]]
            };
        }

    if (data_game[0][2] === p &&
        data_game[1][1] === p &&
        data_game[2][0] === p) {
            checkedWin  = {
                won: true, 
                index: [[0, 2], [1, 1], [2, 0]]
            };
        }
    return checkedWin;
}

function checkTie() {
    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++)
        {
            if (data_game[i][k] === 0)
                return false;
        }
    }
    return true;
}

function getRandom() {
    return Math.floor(Math.random() * 3);
}

function playerMarkCallback() {
    playerMark(td);
}

function handleClick() {
    playerMark(this);
}

function addEventListeners() {
    tds_arr.forEach((td) => {
        td.addEventListener('click', handleClick);
    });
}

function removeEventListeners() {
    tds_arr.forEach((td) => {
        td.removeEventListener('click', handleClick);
    });
}   

function resetNamePlayes() {
    const inputs = document.querySelectorAll(".modal-body .infos-input");
    for (const input of inputs) {
        input.value = '';
    }
}

function getInfoPlayers() {
    const inputs = document.querySelectorAll(".modal-body .infos-input");
    const symbol = document.querySelector('input[name="symbol"]:checked').value;
   
    const values = {};
    for (const input of inputs) {
      values[input.name] = input.value;
    }
    values.player1Symbol = symbol;
    values.player2Symbol = values.player1Symbol === 'x' ? 'o' : 'x';
    return values;
}

function resetDataGame() {
    data_game.forEach((line) => {
        for (let i in line)
            line[i] = 0;
    });
    resetNamePlayes();
}

function resetPlacar() {
    PLACAR.player1 = 0;
    PLACAR.player2 = 0;
    PLACAR.tie = 0;
}

// WRAPPERS 

function getById(strId) {
    return document.getElementById(strId);
}