var auth = function(req, res, next) {
    if (req.session && req.session.user === "amy" && req.session.admin)
      return next();
    else
      return res.sendStatus(401);
};

module.exports = function(app){
    app.get('/',auth,function(req,res){
        res.render("home/index",{lista:{}});   
    })
}