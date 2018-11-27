module.exports = function(app){
    app.get('/validate',auth,function(req,res){
        res.status(200).send({ auth: true});
    })
}
