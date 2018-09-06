var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos/'
};

http.get(configuracoes,function(res){
    res.on('data',function(body){
        console.log(body);
    });
});