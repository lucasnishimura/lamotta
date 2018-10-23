module.exports = function(app){
    app.get('/',function(req,res){
        if(localStorage.getItem('logado') != 'sim'){
            res.render('coreui/login',{mensagem: 'ERRO'});
        }else{
            res.render("home/index",{lista:{}});   
        }       
    })
}