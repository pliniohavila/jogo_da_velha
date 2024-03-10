const data_game = [
    [0, 0 , 0],
    [0, 0 , 0],
    [0, 0 , 0],
];

const PLAYER    = 1;
const MACHINE   = 2;

const tds = document.getElementsByTagName('td');
const tds_arr = Array.from(tds);

tds_arr.forEach((td) => {
    td.addEventListener('click', () => {
        playerMark(td);
    });
});

function playerMark(td) {
    const [line_s, column_s] = td.id.split('');
    const line = parseInt(line_s);
    const column = parseInt(column_s);
    if (data_game[line][column] === 0)
    {
        data_game[line][column] = PLAYER;
        const x_div = td.querySelector('.mark_x');
        x_div.style.display = 'block';
    }
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
            data_game[line][column] = MACHINE;
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
    resetDataGame(); 
    const randomPlayerStart = getRandom() % 3;
    if (randomPlayerStart === MACHINE)
        machineMark(); 
}

function checkWin(p) {
    for (let i = 0; i < 3; i++) {
        if (data_game[i][3 - 1] === p && 
            data_game[i][3 - 2] === p &&
            data_game[i][3 - 3] === p) 
            return true;
    }
    for (let i = 0; i < 3; i++) {
        if (data_game[0][i] === p && 
            data_game[1][i] === p &&
            data_game[2][i] === p) 
            return true;
    }

    if (data_game[0][0] === p &&
        data_game[1][1] === p &&
        data_game[2][2] === p)
        return true;

    if (data_game[0][2] === p &&
        data_game[1][1] === p &&
        data_game[2][0] === p)
        return true;

    return false;
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
    if (checkWin(PLAYER)) {
        alert('Você ganhou 😎');
        return true;
    }
    if (checkWin(MACHINE)) {
        alert('Você perdeu 😒');
        return true;
    }
        
    if (checkTie()) {
        alert("Deu empate 🤣");
        return true;
    } 
    return false;
}