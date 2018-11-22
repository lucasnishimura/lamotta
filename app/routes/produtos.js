// Como eu dei o required no arquivo express.js, não se faz necessário de chamar o arquivo de conexão dentro do própria controller
// var dbConnection = require('../infra/dbConnection');

var multer  = require('multer')

// var upload = multer({ dest: 'app/public/uploads/' })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'app/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
var upload = multer({ storage: storage })

module.exports = function(app){
    //Rotas
    
    app.get('/produtos',auth,function(req,res){
        
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);
        var estoqueBanco = new app.infra.estoqueBanco(connection);

       //dados enviados via get
        var dados_filtro = {
            id: req.query.id != undefined ? decodeURI(req.query.id) : '',
            nome: req.query.nome != undefined ? decodeURI(req.query.nome) : '',
            preco: req.query.preco != undefined ? decodeURI(req.query.preco) : ''
       }

       estoqueResults = {}
       estoqueBanco.todos(function(err,results){
           estoqueResults = results;
       })

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
                    res.render("produtos/lista",{lista:results,filtros:dados_filtro,errosValidacao:{},produtoInfo:estoqueResults});   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })

    app.get('/produtos/ver/:id?',auth,function(req,res){
       
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);
        var estoqueBanco = new app.infra.estoqueBanco(connection);

        estoqueResults = {}
        nomestoqueBanco.todos(function(err,results){
            estoqueResults = results;
        })

        ingredientes = {}
        produtosBanco.verEstoqueProduto(req.params,function(err,resultsestoque){
            ingredientes = resultsestoque;
        })

        produtosBanco.ver(req.params,function(err,results,next){
            if(err){
                console.log('Erro no banco de dados');
                return next(err);
            }
            res.format({
                html: function(){
                    res.render("produtos/ver",{
                        errosValidacao:{},
                        produtoInfo:results[0],
                        estoqueResults:estoqueResults,
                        ingredientesInfo:ingredientes
                    });   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })
    
    // app.get('/produtos',listaProdutos) //posso criar uma var�vel e colocar essa fun��o dentro dessa vari�vel, caso eu for usar em mais de um lugar
        
    app.post('/produtos',upload.single('avatar'),function(req,res){
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);

        var nome_imagem = req.file.originalname;
        var caminho_imagem = req.file.destination;

        //dados do post
        var dados_form = {
            'nome' : req.body.nome,
            'preco' : req.body.preco,
            'descricao' : req.body.descricao,
            'imagem' : caminho_imagem+'/'+nome_imagem
        };

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
        var ingredientes = req.body.ingredientes;

        produtosBanco.salva(dados_form,function(err,results){
            var dados_insert = {
                'produto_id' : results.insertId,
                'ingredientes' : req.body.ingredientes,
                'total' : ingredientes.length
            }
            
            produtosBanco.estoqueProduto(dados_insert,function(err,resultsestoque){
                if(err){
                    console.log('Erro ao adicionar elementos')
                }
            })
        })        
        res.redirect(301,'/produtos');
    })

    app.post('/produtos/ver',upload.single('avatar'),function(req,res){
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);
        
        var nome_imagem = req.file.originalname;
        var caminho_imagem = req.file.destination;

        //dados do post
        var dados_form = {
            'id' : req.body.id,
            'nome' : req.body.nome,
            'preco' : req.body.preco,
            'descricao' : req.body.descricao,
            'imagem' : '/'+caminho_imagem+'/'+nome_imagem
        };
        
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
            if(err){
                console.log('Erro ao adicionar produtos',err)
            }
        })        
        
        produtosBanco.apagaProduto(req.body.id,function(err){
            if(err){
                console.log('erro ao apagar produtos',err)
            }
        })

        var ingredientes = req.body.ingredientes;
        var dados_insert = {
            'produto_id' : req.body.id,
            'ingredientes' : req.body.ingredientes,
            'total' : ingredientes.length
        }
        produtosBanco.estoqueProduto(dados_insert,function(err,resultsestoque){
            if(err){
                console.log('Erro ao adicionar elementos')
            }
        })
        res.redirect('/produtos');
    })

}