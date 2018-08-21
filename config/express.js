//module eh a variavel que referencia o objeto em si, exports que a funcao que vc quer que retorne, 
module.exports = function(){
    //imorta a biblioteca express
    var express = require('express');
    var app = express();

    //define uma string chamada 'view engine' e o nome da engine instalada 'EJS' (embeed javascript)
    app.set('view engine','ejs');
    
    //diz aonde ficam as views, caso não especifique, ele procura as views na pasta views que deve se encontrar na raiz do projeto
    app.set('views','./app/views');

    return app;
}
