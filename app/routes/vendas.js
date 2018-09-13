module.exports = function(app){
    app.get('/vendas',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("vendas/vendas");   
    })
}