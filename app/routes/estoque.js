module.exports = function(app){
    app.get('/estoque',function(req,res){
       
        var connection = app.infra.dbConnection();
        var estoqueBanco = new app.infra.estoqueBanco(connection);

        var dados_filtro = {
            id: req.query.id != undefined ? decodeURI(req.query.id) : '',
            nome: req.query.nome != undefined ? decodeURI(req.query.nome) : '',
            quantidade: req.query.quantidade != undefined ? decodeURI(req.query.quantidade) : ''
       }

        estoqueBanco.lista(dados_filtro,function(err,results,next){
            if(err){
                console.log('Erro no banco de dados');
                return next(err);
            }
            res.format({
                html: function(){
                    res.render("estoque/lista",{lista:results,filtros:dados_filtro});   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })

    app.get('/estoque/ver/:id?',function(req,res){
       
        var connection = app.infra.dbConnection();
        var estoqueBanco = new app.infra.estoqueBanco(connection);

        estoqueBanco.ver(req.params,function(err,results,next){
            if(err){
                console.log('Erro no banco de dados');
                return next(err);
            }
            res.format({
                html: function(){
                    res.render("estoque/ver",{errosValidacao:{},estoqueInfo:results[0]});   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })
           

    app.get('/estoque/inserir',function(req,res){
        res.render("estoque/inserir",{errosValidacao:{},estoqueInfo:{}});   
    })

    app.post('/estoque',function(req,res){
        var connection = app.infra.dbConnection();
        var estoqueBanco = new app.infra.estoqueBanco(connection);
        
        //dados do post
        var dados_form = req.body;
        req.assert('nome','Nome é obrigatório').notEmpty();
        req.assert('quantidade','Quantidade é obrigatório').notEmpty();
        
        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('estoque/inserir',{errosValidacao : erros, estoqueInfo : dados_form});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            })
            return false;
        }

        estoqueBanco.salva(dados_form,function(err,results){
            res.redirect('/estoque');
        })        
    })

    app.post('/estoque/ver',function(req,res){
        var connection = app.infra.dbConnection();
        var estoqueBanco = new app.infra.estoqueBanco(connection);
        
        //dados do post
        var dados_form = req.body;
        req.assert('nome','Nome é obrigatório').notEmpty();
        req.assert('quantidade','Quantidade é obrigatório').notEmpty();
        
        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('/estoque/ver',{errosValidacao : erros, estoqueInfo : dados_form});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            })
            return false;
        }

        estoqueBanco.altera(dados_form,function(err,results){
            res.redirect('/estoque');
        })        
    })
}