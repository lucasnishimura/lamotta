//acesso ao drive de 
var mysql = require('mysql');

function createDBConnection(){
    //conecta no banco de dados acionando o m�todo createconnection, e como parametro s�o os dados de conex�o 
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'estudo'
    });
}

// wrapper, � uma fun��o que embrulhaoutra fun��o, pois assim a conex�o s� vai ser invocada quando chamar o objeto, e n�o ser� feito o tempo todo
module.exports = function(){
    return createDBConnection;
}