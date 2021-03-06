module.exports = function(app){
    app.get('/ingredientes',auth,function(req,res){
       
        var connection = app.infra.dbConnection();
        var ingredientesBanco = new app.infra.ingredientesBanco(connection);

        var dados_filtro = {
            id: req.query.id != undefined ? decodeURI(req.query.id) : '',
            nome: req.query.nome != undefined ? decodeURI(req.query.nome) : '',
            preco: req.query.preco != undefined ? decodeURI(req.query.preco) : '',
            quantidade: req.query.quantidade != undefined ? decodeURI(req.query.quantidade) : ''
       }

        ingredientesBanco.lista(dados_filtro,function(err,results,next){
            if(err){
                console.log(err)
                console.log('Erro no banco de dados');
                return next(err);
            }
            res.format({
                html: function(){
                    res.render("ingredientes/lista",{lista:results,filtros:dados_filtro});   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })

    app.get('/ingredientes/ver/:id?',auth,function(req,res){
       
        var connection = app.infra.dbConnection();
        var ingredientesBanco = new app.infra.ingredientesBanco(connection);

        ingredientesBanco.ver(req.params,function(err,results,next){
            if(err){
                console.log('Erro no banco de dados');
                return next(err);
            }
            res.format({
                html: function(){
                    res.render("ingredientes/ver",{errosValidacao:{},ingredienteInfo:results[0]});   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })
           

    app.get('/ingredientes/inserir',auth,function(req,res){
        res.render("ingredientes/inserir",{errosValidacao:{},ingredienteInfo:{}});   
    })

    app.post('/ingredientes',auth,function(req,res){
        var connection = app.infra.dbConnection();
        var ingredientesBanco = new app.infra.ingredientesBanco(connection);
        
        //dados do post
        var dados_form = req.body;
        req.assert('nome','Nome é obrigatório').notEmpty();
        req.assert('preco','Preco vazio').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        
        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('ingredientes/inserir',{errosValidacao : erros, produtoInfo : dados_form});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            })
            return false;
        }

        ingredientesBanco.salva(dados_form,function(err,results){
            res.redirect('/ingredientes');
        })        
    })

    app.post('/ingredientes/ver',auth,function(req,res){
        var connection = app.infra.dbConnection();
        var ingredientesBanco = new app.infra.ingredientesBanco(connection);
        
        //dados do post
        var dados_form = req.body;
        req.assert('nome','Nome é obrigatório').notEmpty();
        req.assert('preco','Preco vazio').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('/ingredientes/ver',{errosValidacao : erros, ingredientesInfo : dados_form});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            })
            return false;
        }

        ingredientesBanco.altera(dados_form,function(err,results){
            res.redirect('/ingredientes');
        })        
    })
}