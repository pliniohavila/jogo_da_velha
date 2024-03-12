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

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbols[symbol];
    }
}

let PLAYER_1;
let PLAYER_2;
let ACTUAL_PLAYER;
let MACHINE = 1;

const tds = document.getElementsByTagName('td');
const tds_arr = Array.from(tds);

function add_event_listener() {
    tds_arr.forEach((td) => {
        td.addEventListener('click', () => {
            playerMark(td);
        });
    });
}

function startGame() {
    // const modal = document.getElementById("options");
    // modal.style.display = 'none';
    add_event_listener();

    PLAYER_1 = new Player('Santiago', 'x');
    PLAYER_2 = new Player('Peralta', 'o');

    getById('placar-player1-name').innerText = PLAYER_1.name;
    getById('placar-player2-name').innerText = PLAYER_2.name;
    
    updatePlacar();

    ACTUAL_PLAYER = PLAYER_1
}

startGame()

function blockMouse(event) {
    event.preventDefault();
  }

function playerMark(td) {
    const [line_s, column_s] = td.id.split('');
    const line = parseInt(line_s);
    const column = parseInt(column_s);
    if (data_game[line][column] === 0)
    {
        data_game[line][column] = ACTUAL_PLAYER.symbol.symbolId;
        const x_div = td.querySelector(ACTUAL_PLAYER.symbol.symbolIcon);
        x_div.style.display = 'block';
    }
    setTimeout(() => { 
        if (checkEndGame())
            return;
        if (MACHINE === 1)
            machineMark();
        else 
            ACTUAL_PLAYER = ACTUAL_PLAYER === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    }, 300);
}

function getRandom() {
    return Math.floor(Math.random() * 3);
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
            return;
     }, 300);
}

function resetDataGame() {
    data_game.forEach((line) => {
        for (let i in line)
            line[i] = 0;
    });
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
    remove_highlight();
    resetDataGame(); 
    const randomPlayerStart = getRandom() % 3;
    if (randomPlayerStart === PLAYER_2)
        machineMark(); 
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
                    index: [[0, i], [1, i], [2, 2]]
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

function checkEndGame() {
    let checkedWin = checkWin(PLAYER_1.symbol.symbolId); 

    if (checkedWin.won) {
        highlight(checkedWin.index);
        PLACAR.player1++;
        updatePlacar();
        setTimeout(() => {
            alert(`A pessoa jogadora ${PLAYER_1.name} ganhou 😎`);
        }, 200);
        return true;
    }

    checkedWin = checkWin(PLAYER_2.symbol.symbolId); 
    if (checkedWin.won) {
        highlight(checkedWin.index);
        PLACAR.player2++;
        updatePlacar();
        setTimeout(() => {
            alert(`A pessoa jogadora ${PLAYER_2.name} ganhou 😎`);
        }, 200);
        return true;
    }
        
    if (checkTie()) {
        PLACAR.tie++;
        updatePlacar();
        alert("Deu empate 🤣");
        return true;
    } 
    return false;
}

function highlight(index) {
    console.log(index);
    const q0 = index[0].join('');
    const q1 = index[1].join('');
    const q2 = index[2].join('');

    getById(q0).classList.add('highlight');
    getById(q1).classList.add('highlight');
    getById(q2).classList.add('highlight');
}

function remove_highlight() {
    for (let td of tds) {
        if (td.classList.contains('highlight'))
            td.classList.remove('highlight');
    }
}

function showInputPlayer2() {
    const divInputPlayer2 = getById('input-player2');
    const divInputPlayer2ClassList = divInputPlayer2.classList;
    if (divInputPlayer2ClassList.contains('infos-group-hidden'))
        divInputPlayer2.classList.remove('infos-group-hidden');
    else 
        divInputPlayer2.classList.add('infos-group-hidden');
}

function updatePlacar() {
    getById('placar-player1-points').innerText = PLACAR.player1;
    getById('placar-player2-points').innerText = PLACAR.player2;
    getById('placar-tie').innerText = PLACAR.tie;
}


function getById(strId) {
    return document.getElementById(strId);
}
