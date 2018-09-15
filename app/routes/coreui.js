module.exports = function(app){
    app.get('/coreui/colors',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("coreui/colors");   
    })
    app.get('/coreui/charts',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("coreui/charts");   
    })
    app.get('/coreui/login',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("coreui/login");   
    })
    app.get('/coreui/register',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("coreui/register");   
    })
    app.get('/coreui/typography',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("coreui/typography");   
    })
    app.get('/coreui/widgets',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("coreui/widgets");   
    })
    app.get('/coreui/widgets',function(req,res){
        //a funcao send cospe o dado na tela
        res.render("coreui/widgets");   
    })
}