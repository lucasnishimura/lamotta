module.exports = function(app){
    //Rotas
    app.get('/produtos',function(req,res){
        //a funcao send cospe o dado na tela 
        //res.send('<h1>produto</h1>')    
        res.render("produtos/lista");   
        })
        
        app.get('/',function(req,res){
            //a funcao send cospe o dado na tela
            //res.send('home')
        })
}