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
    [line_s, column_s] = td.id.split('');
    const line = parseInt(line_s);
    const column = parseInt(column_s);
    if (data_game[line][column] === 0)
    {
        data_game[line][column] = 1;
        const x_div = td.getElementsByClassName('mark_x')[0];
        console.log(x_div);
        // x_div.style.display = 'block';
    }
    checkEndGame()
    // call machine player
}

function resetDataGame() {
    data_game.forEach((line) => {
        for (let i in line)
            line[i] = 0;
    });
}

function resetGame() {
    const all_mark_x = Array.from(document.getElementsByClassName('mark_x'));
    all_mark_x.forEach((mark_x) => {
        mark_x.style.display = "none";
    });       
    resetDataGame(); 
}

function checkWin(p) {
    for (let i = 0; i < 3; i++) {
        // line check
        if (data_game[i][3-1] === p && 
            data_game[i][3-2] === p &&
            data_game[i][3-3] === p) 
            return true;
        // column check
        if (data_game[i][3-1] === p && 
            data_game[i][3-2] === p &&
            data_game[i][3-3] === p) 
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
    data_game.forEach((line) => {
        for (let i in line) {
            if (line[i] === 0)
                return false;
        }
    });
    return true;
}

function checkEndGame() {
    if (checkWin(PLAYER))
        return alert('Você ganhou 😎');
    if (checkWin(MACHINE))
        return alert('Você perdeu 😒');
    if (!checkTie())
        return alert("Deu empate 🤣"); 
    return;
}