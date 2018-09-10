// Como eu dei o required no arquivo express.js, n√£o se faz necess√°rio de chamar o arquivo de conex√£o dentro do pr√≥pria controller
// var dbConnection = require('../infra/dbConnection');

module.exports = function(app){
    //Rotas
    app.get('/',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("home/home");   
    })

    app.get('/produtos',function(req,res){
        //a funcao send cospe o dado na tela 
        //res.send('<h1>produto</h1>')    

        //vari√°vel de config de conex√£o que puxa do arquivo de conex√£o. O uso desta maneira se faz necess√°rio quando damos o required na pr√≥pria controller. como estamos chamando do express n√£o precisamos mais fazer desta maneira
        // var connection = dbConnection();        
        
        //Como n√£o estamos mais chamando a fun√ß√£o de dentro da pr√≥pria controller, preciso indicar o caminho do arquivo de conex√£o
        var connection = app.infra.dbConnection();
        
        // Arquivo reservado para guardar querys
        var produtosBanco = new app.infra.produtosBanco(connection);

        produtosBanco.lista(function(err,results){
            // Para n„o se criar duas funÁıes com cÛdigos repetidos, È usado essa funÁ„o format para verificar no header qual o tipo de resposta ele quer que retorne, por padr„o o navegador retorna HTML. no entanto, caso queira usar como api, È necess·rio colocar application/json no header da chamada
            res.format({
                html: function(){
                    //precisamos passar no segundo parametro um array com os resultados
                    res.render("produtos/lista",{lista:results});   
                },
                json: function(){
                    res.json(results);
                }
            })
        });
        connection.end();
    })        

    // app.get('/produtos',listaProdutos) //posso criar uma var·vel e colocar essa funÁ„o dentro dessa vari·vel, caso eu for usar em mais de um lugar
        

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