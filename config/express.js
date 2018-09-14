//imorta a biblioteca express
var express = require('express');

//imorta a biblioteca do expressload (carrega as rotas automaticamente)
var load = require('express-load');

//carega o body parse que trata o recebimento via post
var bodyParser = require('body-parser');

//carega o body parse que trata o recebimento via post
var expressValidator = require('express-validator');

//module eh a variavel que referencia o objeto em si, exports que a funcao que vc quer que retorne, 
module.exports = function(){

    var app = express();
    
    //faz a inserção de recursos estáticos, static é um middleware do express
    app.use(express.static('./app/public'));
    app.use(express.static('./'));
    
    //define uma string chamada 'view engine' e o nome da engine instalada 'EJS' (embeed javascript)
    app.set('view engine','ejs');
    
    //diz aonde ficam as views, caso nÃ£o especifique, ele procura as views na pasta views que deve se encontrar na raiz do projeto
    app.set('views','./app/views');
    
    //recebe funções que serão aplicadas no requeest na ordem que definimos abaixo
    app.use(bodyParser.urlencoded({extended: true})); 
    //Caso nÃ£o encontre um formulário enviado via form, procura um enviado via json
    app.use(bodyParser.json());
    
    app.use(expressValidator());
    
    
    //load('routes').into(app); com isso queremos dizer que "routes deve ser carregado dentro da app", podemos encadear outras informaï¿½ï¿½es junto
    load('routes',{cwd: 'app'}) //para não procurar no sistema inteiro o 'cwd' indica dentro de qual pasta ele deve procurar
    .then('infra') //significa que depois de carregar as rotas "Então" carregue tudo dentro de infra
    .into(app);
    

    // se não existir a página chama essa
    app.use(function(req,res,next){
        res.status(404).render('erros/404');
        next();
    })

    app.use(function(error,req,res,next){
        if(process.eventNames.NODE_ENV == 'production'){
            res.status(500).render('erros/500');
            return;
        }
        next(error);
    })

    return app;
}
