// Como eu dei o required no arquivo express.js, não se faz necessário de chamar o arquivo de conexão dentro do própria controller
// var dbConnection = require('../infra/dbConnection');

module.exports = function(app){
    //Rotas
    app.get('/produtos',function(req,res){
        //a funcao send cospe o dado na tela 
        //res.send('<h1>produto</h1>')    

        //variável de config de conexão que puxa do arquivo de conexão. O uso desta maneira se faz necessário quando damos o required na própria controller. como estamos chamando do express não precisamos mais fazer desta maneira
        // var connection = dbConnection();        
        
        //Como não estamos mais chamando a função de dentro da própria controller, preciso indicar o caminho do arquivo de conexão
        var connection = app.infra.dbConnection();
        
        // Arquivo reservado para guardar querys
        var produtosBanco = app.infra.produtosBanco(connection);

        produtosBanco.lista(function(err,results){
            //precisamos passar no segundo parametro um array com os resultados
            res.render("produtos/lista",{lista:results});   
        });
        connection.end();
    })
        
    app.get('/',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("home/home");   
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