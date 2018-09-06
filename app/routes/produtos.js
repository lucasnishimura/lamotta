// Como eu dei o required no arquivo express.js, não se faz necessário de chamar o arquivo de conexão dentro do própria controller
// var dbConnection = require('../infra/dbConnection');

module.exports = function(app){
    //Rotas
    app.get('/',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("home/home");   
    })

    var listaProdutos = function(req,res){
        //a funcao send cospe o dado na tela 
        //res.send('<h1>produto</h1>')    

        //variável de config de conexão que puxa do arquivo de conexão. O uso desta maneira se faz necessário quando damos o required na própria controller. como estamos chamando do express não precisamos mais fazer desta maneira
        // var connection = dbConnection();        
        
        //Como não estamos mais chamando a função de dentro da própria controller, preciso indicar o caminho do arquivo de conexão
        var connection = app.infra.dbConnection();
        
        // Arquivo reservado para guardar querys
        var produtosBanco = new app.infra.produtosBanco(connection);

        produtosBanco.lista(function(err,results){
            //precisamos passar no segundo parametro um array com os resultados
            res.render("produtos/lista",{lista:results});   
        });
        connection.end();
    }
    
    app.get('/produtos',listaProdutos)
        

    app.get('/produtos/inserir',function(req,res){
        res.render("produtos/inserir");   
    })

    app.post('/produtos',function(req,res){
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);
        
        //dados do post
        var dados_form = req.body;
        produtosBanco.salva(dados_form,function(err,results){
            res.redirect('/produtos');
        })        
    })

    app.get('/clientes',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("clientes/clientes");   
    })
    
    app.get('/vendas',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("vendas/vendas");   
    })
    }