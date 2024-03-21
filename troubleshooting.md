

Na tentativa de implementar o uso de variáveis 

Adicionei o seguinte código

$config['composer_autoload'] = FCPATH. 'vendor'. DIRECTORY_SEPARATOR . 'autoload.php';

 ao arquivo 

application/config/autoload.php 

O que provocou o redirecionamento de todas as chamadas a qualquer controller para o default controller. 


#-------


