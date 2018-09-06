//acesso ao drive de 
var mysql = require('mysql');

function createDBConnection(){
    //conecta no banco de dados acionando o método createconnection, e como parametro são os dados de conexão 
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        // password: '', //usa em casa
        password: '', //usa no trampo
        // database: 'lamotta_com_br' //usa em casa
        database: 'estudo' //usa no trampo
    });

    return connection;
}

// wrapper, é uma função que embrulhaoutra função, pois assim a conexão só vai ser invocada quando chamar o objeto, e não será feito o tempo todo
module.exports = function(){
    return createDBConnection;
}