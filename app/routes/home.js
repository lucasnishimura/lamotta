module.exports = function(app){
    app.get('/',function(req,res){       
        var dados_tipo = "1";
        window.localStorage.setItem('dados_tipo', JSON.stringify(dados_tipo))
        res.render("home/index",{lista:{}});   
    })
}