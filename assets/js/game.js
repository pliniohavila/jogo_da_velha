const data_game = [
    [0, 0 , 0],
    [0, 0 , 0],
    [0, 0 , 0],
];

const PLAYER_1   = 1;
const PLAYER_2   = 2;

const tds = document.getElementsByTagName('td');
const tds_arr = Array.from(tds);

function add_event_listener() {
    tds_arr.forEach((td) => {
        td.addEventListener('click', () => {
            playerMark(td);
        });
    });
}

function remove_event_listener() {
    document.addEventListener("click", function(e){
        e.preventDefault();
    }, false);
    // console.log('event');
    // tds_arr.forEach((td) => {
    //     td.removeEventListener('click', () => {
    //         playerMark(td);
    //     }, true);
    // });
}

add_event_listener();

function playerMark(td) {
    const [line_s, column_s] = td.id.split('');
    const line = parseInt(line_s);
    const column = parseInt(column_s);
    if (data_game[line][column] === 0)
    {
        data_game[line][column] = PLAYER_1;
        const x_div = td.querySelector('.mark_x');
        x_div.style.display = 'block';
    }
    remove_event_listener();
    setTimeout(() => { 
        if (checkEndGame())
            return;
        machineMark();
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
            data_game[line][column] = PLAYER_2;
            const id_div = `${line}${column}`
            const td = document.getElementById(id_div);
            const o_div = td.querySelector('.mark_o');
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
    let checkedWin = checkWin(PLAYER_1); 

    if (checkedWin.won) {
        highlight(checkedWin.index);
        setTimeout(() => {
            alert('Você ganhou 😎');
        }, 200);
        return true;
    }

    checkedWin = checkWin(PLAYER_2); 
    if (checkedWin.won) {
        highlight(checkedWin.index);
        setTimeout(() => {
            alert('Você perdeu 😒');
        }, 200);
        return true;
    }
        
    if (checkTie()) {
        alert("Deu empate 🤣");
        return true;
    } 
    return false;
}

function highlight(index) {
    const q0 = index[0].join('');
    const q1 = index[1].join('');
    const q2 = index[2].join('');

    document.getElementById(q0).classList.add('highlight');
    document.getElementById(q1).classList.add('highlight');
    document.getElementById(q2).classList.add('highlight');
}

function remove_highlight() {
    for (let td of tds) {
        if (td.classList.contains('highlight'))
            td.classList.remove('highlight');
    }
}