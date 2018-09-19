module.exports = function(app){
    app.get('/vendas',function(req,res){

        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);

        var dados_filtro = {
            id: req.query.id != undefined ? decodeURI(req.query.id) : '',
            nome: req.query.nome != undefined ? decodeURI(req.query.nome) : '',
            data: req.query.data != undefined ? decodeURI(req.query.data) : '',
            valor: req.query.valor != undefined ? decodeURI(req.query.valor) : ''
       }
       
       vendasBanco.lista(dados_filtro,function(erros,resultados){

           if(dados_filtro.data != ''){
            var data_completa = dados_filtro.data.split('-')
            dados_filtro.data = data_completa[2]+'/'+data_completa[1]+'/'+data_completa[0];
           }
            if(erros){
                console.log('Erro no banco de dados');
                return;
            }
            res.format({
                html: function(){
                    res.render("vendas/lista",{lista:resultados,filtros:dados_filtro});   
                },
                json: function(){
                    res.json(results);
                }
            })
        })
    })
}