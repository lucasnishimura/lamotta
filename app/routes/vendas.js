module.exports = function(app){
    app.get('/vendas',function(req,res){

        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);
        var clientesBanco = new app.infra.clientesBanco(connection);
        var produtosBanco = new app.infra.produtosBanco(connection);

        var produtos = {}
        produtosBanco.todos(function(erros,results){
            produtos = results;
        })

        var clientes = {}
        clientesBanco.todos(function(erros,results){
            clientes = results
        })

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
                    res.render("vendas/lista",{
                        lista:resultados,
                        filtros:dados_filtro,
                        clientes:clientes,
                        produtos: produtos,
                        errosValidacao:{}
                    });   
                },
                json: function(){
                    res.json(results);
                }
            })
        })
    })

    app.post('/vendas',function(req,res){
        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);

        // console.log(req.body)
        var data = req.body.data.split('/');
        var dados_form = {
            cliente_id: req.body.cliente_id,
            valor: req.body.valor,
            data: data[2]+'-'+data[1]+'-'+data[0]
        }
        var vendas = req.body.vendas;

        vendasBanco.salva(dados_form,function(err,results){
            var dados_insert = {
                'venda_id' : results.insertId,
                'vendas' : req.body.vendas,
                'total' : vendas.length
            }
      
            vendasBanco.salvaVenda(dados_insert,function(err,results){
                if(err){
                    console.log('Erro ao vincular os produtos com a venda');
                }
            })        
        })

        res.redirect('/vendas');
        
    })

    app.get('/vendas/inserir',function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);

        var dados_filtro = {
            id:'',
            nome: '',
            cliente: '',
            empresa: ''
       }
        

        clientesBanco.lista(dados_filtro,function(erros,resultados){
            res.render('vendas/inserir',{errosValidacao:{},produtoInfo:{},clientes:resultados});
        })

    })
}