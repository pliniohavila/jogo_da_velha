function exibirDados(dataGame) {
    const ranking = document.getElementById('data-game');
    ranking.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    dataGame.forEach((dataPlayer, index) => {
        const row = document.createElement('tr');
        row.classList.add('tr-ranking');
        row.appendChild(makeRowColumn(index * 1));

        const {name, wins, losses, ties, points, lastTimePlayed} = checkDataPlayerObject(dataPlayer);
        row.appendChild(makeRowColumn(name));
        const dateLastTime = makeRowColumn(formatDate(lastTimePlayed));
        dateLastTime.setAttribute('datetime', lastTimePlayed);
        row.appendChild(dateLastTime);
        row.appendChild(makeRowColumn(points));
        row.appendChild(makeRowColumn(wins));
        row.appendChild(makeRowColumn(ties));
        row.appendChild(makeRowColumn(losses));

        ranking.appendChild(row);
    });
}

function checkDataPlayerObject(obj) {
    const expectedProperties = {
        name: '',
        wind: 0,
        losses: 0,
        ties: 0,
        points: 0,
        lastTimePlayed: ''
    };

    for (const prop in expectedProperties) {
        if (!obj.hasOwnProperty(prop))
            obj[prop] = expectedProperties[prop];
    }
    return obj;
}

function makeRowColumn(dataColumn) {
    const rowColumn = document.createElement('td');
    rowColumn.textContent = dataColumn;
    return rowColumn;
}

function formatDate(dateISO) {
    const date = new Date(dateISO);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    };

    const fmt = new Intl.DateTimeFormat('pt-BR', options);
    let dateWithoutComma = fmt.format(date).replace(', ', ' às ');
    let dateFmt = `Dia ${dateWithoutComma} horas`;
    return dateFmt;
}

const gameStoragedData = JSON.parse(localStorage.getItem(KEY_DATA_GAME));
exibirDados(gameStoragedData);