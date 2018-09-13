module.exports = function(app){
    app.get('/',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("home/home");   
    })
}