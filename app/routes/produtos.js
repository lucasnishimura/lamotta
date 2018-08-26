// Como eu dei o required no arquivo express.js, n�o se faz necess�rio de chamar o arquivo de conex�o dentro do pr�pria controller
// var dbConnection = require('../infra/dbConnection');

module.exports = function(app){
    //Rotas
    app.get('/produtos',function(req,res){
        //a funcao send cospe o dado na tela 
        //res.send('<h1>produto</h1>')    

        //v�ri�vel de config de conex�o que puxa do arquivo de conex�o. O uso desta maneira se faz necess�rio quando damos o required na pr�pria controller. como estamos chamando do express n�o precisamos mais fazer desta maneira
        // var connection = dbConnection();        
        
        //Como n�o estamos mais chamando a fun��o de dentro da pr�pria controller, preciso indicar o caminho do arquivo de conex�o
        var connection = app.infra.dbConnection();
        
        // Arquivo reservado para guardar querys
        var produtosBanco = app.infra.produtosBanco;

        produtosBanco.lista(connection,function(err,results){
            //precisamos passar no segundo parametro um array com os resultados
            res.render("produtos/lista",{lista:results});   
        });
        connection.end();
    })
        
        app.get('/',function(req,res){
            //a funcao send cospe o dado na tela
            //res.send('home')
        })
}