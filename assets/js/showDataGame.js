function exibirDados(dataGame) {
    console.log("dataGame");
    const lista = document.getElementById('data-game');
    lista.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    dataGame.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Nome: ${item.name}, Último Jogo: ${item.lastTimePlayed}`;
        lista.appendChild(li);
    });
}

const gameStoragedData = JSON.parse(localStorage.getItem(KEY_DATA_GAME));
exibirDados(gameStoragedData);