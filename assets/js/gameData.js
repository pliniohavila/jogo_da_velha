
const KEY_DATA_GAME = 'tic-tac-toe';

// SAVE START GAME DATA
function saveStartDataPlayer(player, gameData) {
    const index = gameData.findIndex((p) => {
        return p.name === player.name;
    });
    if (index !== (-1)) {
        gameData[index] = {...gameData[index], lastTimePlayed: new Date().toISOString()};
        return;
    }
    const playerData = initialPlayerData(player);
    gameData.push(playerData);
}

function saveInitialGame(player1, player2) {
    const storedGameData = localStorage.getItem(KEY_DATA_GAME);
    // Case other access after first
    if (storedGameData) {
        const gameData = JSON.parse(storedGameData);
        saveStartDataPlayer(player1, gameData);
        saveStartDataPlayer(player2, gameData);
        localStorage.setItem(KEY_DATA_GAME, JSON.stringify(gameData));
        return;
    }
    // First game access
    const player1Data = initialPlayerData(player1);
    const player2Data = initialPlayerData(player2);
    const gameData = [player1Data, player2Data];
    localStorage.setItem(KEY_DATA_GAME, JSON.stringify(gameData));
}


function initialPlayerData(player) {
    const playerData = {
        name: player.name,
        wind: 0,
        losses: 0,
        ties: 0,
        lastTimePlayed: new Date().toISOString()
    }
    return playerData;
}

// SAVE GAME RESULTS