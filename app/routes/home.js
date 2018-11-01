module.exports = function(app){
    app.get('/',auth,function(req,res){
        res.render("home/index",{lista:{}});   
    })
}