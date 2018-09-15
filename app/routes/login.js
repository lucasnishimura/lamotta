module.exports = function(app){
  app.get('/login',function(req,res){
    //a funcao send cospe o dado na tela
    res.render("coreui/login",{mensagem: null});   
  })

  app.post('/login',function(req,res){
    var connection = app.infra.dbConnection();
    var loginBanco = new app.infra.loginBanco(connection);

    //dados do post
    var dados_form = req.body;
    
    req.assert('nome','Nome é obrigatório').notEmpty();
    req.assert('senha','A senha é obrigatória').notEmpty();
    
    var erros = req.validationErrors();
    
    if(erros){
        res.format({
            html: function(){
                res.status(400).render('coreui/login',{errosValidacao : erros, loginInfo : dados_form});
            },
            json: function(){
                res.status(400).json(erros);
            }
        })
        return false;
      }
      
      loginBanco.lista(dados_form,function(err,results){
        if(!err){
          if(results.length > 0){
            res.redirect('/');
          }else{
            // caso não ache o usuário cai na primeira condição
            res.render('coreui/login',{mensagem: 'ERRO'});
          }
        }else{
          res.format({
              html: function(){
                  res.status(400).render('coreui/login',{errosValidacao : err});
                  console.log(err)
              },
              json: function(){
                  res.status(400).json(erros);
              }
          })
          return false;
        }
        
    })  
  })
}