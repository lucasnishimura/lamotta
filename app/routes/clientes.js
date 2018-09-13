module.exports = function(app){
    app.get('/clientes',function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);
        
        clientesBanco.lista(function(erros,resultados){
            res.render("clientes/lista",{lista:resultados});   
        })

        connection.end();
    })    
}