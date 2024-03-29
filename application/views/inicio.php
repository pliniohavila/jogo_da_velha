<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Início</title>
    <link rel="stylesheet" type="text/css" href="assets/css/styles.css" /> 
</head>
<body>
    <header>
        <h1>
            Jogo da Velha
        </h1> 
        <a href="<?php echo base_url(); ?>game" target="_blank" rel="noopener noreferrer">
        <button class="btn-play">
            Jogar
        </button> 
        </a>
        
    </header>
     <!-- Posição Nome Pontos Vitórias Empates Derrotas -->
    <main>
        <div class="main-header">
            <h2>Classificação</h2>
        </div>
        <table class="table-ranking">
            <thead class="thead-ranking">
                <tr>
                    <th class="th-ranking">Posição</th>
                    <th class="th-ranking">Nome</th>
                    <th class="th-ranking">Última Partida</th>
                    <th class="th-ranking">Pontos</th>
                    <th class="th-ranking">Vitórias</th>
                    <th class="th-ranking">Empates</th>
                    <th class="th-ranking">Derrotas</th>
                </tr>
            </thead>
            <tbody class="tbody-ranking" id="data-game">
                <?php $index = 1 ?>
                <?php foreach ($ranking as $player): ?>
                    <tr class="tr-ranking">
                        <td><?php echo $index++; ?></td>
                        <td><?php echo $player['name']; ?></td>
                        <td datetime="<?php echo $player['lastTimePlayed']; ?>">
                            <?php 
                                echo $player['lastTimePlayed']; 
                            ?>
                        </td>
                        <td><?php echo $player['points']; ?></td>
                        <td><?php echo $player['wins']; ?></td>
                        <td><?php echo $player['ties']; ?></td>
                        <td><?php echo $player['losses']; ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

    </main>
</body>
<!-- <script src="assets/js/gameData.js"></script>  -->
<script src="assets/js/showDataGame.js"></script>
</html>