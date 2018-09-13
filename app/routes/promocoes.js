module.exports = function(app){
    app.get("/promocoes/form",function(req,res){
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);
        produtosBanco.lista(function(erros,resultados){
            res.render('promocoes/form',{lista:resultados});
        });
        connection.end();
    })

    app.post("/promocoes",function(req,res){
        var promocao = req.body;

        //dispara os eventos quando ele fica pronto, usado para o , o app get pega a variável io do arquivo app.js
        app.get('io').emit('novaPromocao',promocao);

        res.redirect('promocoes/form');
    })    
}

