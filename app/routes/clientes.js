module.exports = function(app){

    app.get('/clientes',function(req,res){
        res.render("clientes/lista");
    })

    app.get('/clientes_listar',auth,function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);

        var dados_filtro = {
            id: req.query.id != undefined ? decodeURI(req.query.id) : '',
            nome: req.query.nome != undefined ? decodeURI(req.query.nome) : '',
            cliente: req.query.cliente != undefined ? decodeURI(req.query.cliente) : '',
            empresa: req.query.empresa != undefined ? decodeURI(req.query.empresa) : ''
       }
        
        clientesBanco.lista(dados_filtro,function(erros,resultados){
            if(erros){
                //next executa a próxima função da cadeia de funções
                console.log('Erro no banco de dados');
                return;
            }
            res.format({
                html: function(){
                    //precisamos passar no segundo parametro um array com os resultados
                    res.render("clientes/lista",{lista:resultados,filtros:dados_filtro});   
                },
                json: function(){
                    res.json(results);
                }
            })
        })

        connection.end();
    }) 
    
    app.get('/clientes/inserir',auth,function(req,res){
        res.render("clientes/inserir",{errosValidacao:{},clienteInfo:{}});   
    })

    app.get('/clientes/ver/:id?',auth,function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);
        
        var parceiros = ['aline','bruno','irdeu','lucas'];
        dados_cliente = req.params;

        clientesBanco.ver(dados_cliente,function(erros,resultados){
            if(erros){
                //next executa a próxima função da cadeia de funções
                console.log('Erro no banco de dados');
                return;
            }
            
            res.format({
                html: function(){
                    res.render("clientes/ver",{errosValidacao:{},clienteInfo:resultados[0],parceiros:parceiros});   
                },
                json: function(){
                    res.json(results);
                }
            })
        })

        connection.end();
    })

    app.post('/clientes/ver',auth,function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);
        
        req.assert('nome','Nome é obrigatório').notEmpty();       
        req.assert('cliente','Parceiro é obrigatório').notEmpty();       
        var erros = req.validationErrors();
        
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('clientes/inserir',{errosValidacao : erros, produtoInfo : dados_form});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            })
            return false;
        }

        var dados_form = req.body;

        clientesBanco.altera(dados_form,function(err,results){
            if(err){
                console.log(err)
            }
            res.redirect('/clientes');
        })        
    })

    app.post('/clientes',auth,function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);
        
        //dados do post
        var dados_form = req.body;
        req.assert('nome','Nome é obrigatório').notEmpty();       
        
        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('clientes/inserir',{errosValidacao : erros, produtoInfo : dados_form});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            })
            return false;
        }

        clientesBanco.salva(dados_form,function(err,results){
            res.redirect('/clientes');
        })        
    })

}