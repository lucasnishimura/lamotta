// Como eu dei o required no arquivo express.js, não se faz necessário de chamar o arquivo de conexão dentro do própria controller
// var dbConnection = require('../infra/dbConnection');

module.exports = function(app){
    //Rotas
    app.get('/produtos',function(req,res){
       
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);

       //dados enviados via get
        var dados_filtro = {
            id: req.query.id != undefined ? decodeURI(req.query.id) : '',
            nome: req.query.nome != undefined ? decodeURI(req.query.nome) : '',
            preco: req.query.preco != undefined ? decodeURI(req.query.preco) : ''
       }

        produtosBanco.lista(dados_filtro,function(err,results,next){
            if(err){
                console.log(err)
                //next executa a próxima função da cadeia de funções
                console.log('Erro no banco de dados');
                return next(err);
            }
            // Para n�o se criar duas fun��es com c�digos repetidos, � usado essa fun��o format para verificar no header qual o tipo de resposta ele quer que retorne, por padr�o o navegador retorna HTML. no entanto, caso queira usar como api, � necess�rio colocar application/json no header da chamada
            res.format({
                html: function(){
                    //precisamos passar no segundo parametro um array com os resultados
                    res.render("produtos/lista",{lista:results,filtros:dados_filtro});   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })

    app.get('/produtos/ver/:id?',function(req,res){
       
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);

        produtosBanco.ver(req.params,function(err,results,next){
            if(err){
                console.log('Erro no banco de dados');
                return next(err);
            }
            res.format({
                html: function(){
                    res.render("produtos/ver",{errosValidacao:{},produtoInfo:results[0]});   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })
    
    // app.get('/produtos',listaProdutos) //posso criar uma var�vel e colocar essa fun��o dentro dessa vari�vel, caso eu for usar em mais de um lugar
        

    app.get('/produtos/inserir',function(req,res){
        var connection = app.infra.dbConnection();
        var ingredientesBanco = new app.infra.ingredientesBanco(connection);

        
        var dados_filtro = {
            id: '',
            nome: '',
            preco: '',
            quantidade: ''
       }

        ingredientesBanco.lista(dados_filtro,function(err,results,next){
            res.render("produtos/inserir",{errosValidacao:{},produtoInfo:results});   
        })

    })

    app.post('/produtos',function(req,res){
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);
        
        //dados do post
        var dados_form = req.body;
        req.assert('nome','Nome é obrigatório').notEmpty();
        req.assert('preco','Preco vazio').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        
        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('produtos/inserir',{errosValidacao : erros, produtoInfo : dados_form});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            })
            return false;
        }

        produtosBanco.salva(dados_form,function(err,results){
            res.redirect('/produtos');
        })        
    })

    app.post('/produtos/ver',function(req,res){
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);
        
        //dados do post
        var dados_form = req.body;
        req.assert('nome','Nome é obrigatório').notEmpty();
        req.assert('preco','Preco vazio').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('/produtos/ver',{errosValidacao : erros, produtoInfo : dados_form});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            })
            return false;
        }

        produtosBanco.altera(dados_form,function(err,results){
            res.redirect('/produtos');
        })        
    })
}