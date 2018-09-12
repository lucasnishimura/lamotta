//A pasta teste é usado com o módulo mocha, que verifica funcionalidades do nosso sistema
//Testaremos dentro da nossa produtos controller: 
// - NOssa lista de JSON
// - Se nosso cadastro aceita json
// - Se nosso cadastro aceita urlencoded

var http = require('http');
var assert = require('assert');

//Descrve o cenário que estamos testando, no caso produtoscontroller
describe('#ProdutosController',function(){
    //dado o cenário, o que ue quero verificar?
    it('#listagem json',function(done){
        var configuracoes = {
            hostname: 'localhost',
            port: 3000,
            path: '/produtos',
            headers:{
                'Accept' : 'application/json'
            }
        };
        http.get(configuracoes,function(res){
            assert.equal(res.statusCode,200); //modulo que simula um if
            assert.equal(res.headers['content-type'],'application/json; charset=utf-8'); //modulo que simula um if
            
            done();
        });
    });
});
