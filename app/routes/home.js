module.exports = function(app){
    app.get('/',function(req,res){

        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);

        console.log('Usuário: '+req.user);
        clientesBanco.total(function(erros,resultados){ 
            res.render("home/index",{lista:resultados[0]});   
        });
        
        connection.end();
    })
}