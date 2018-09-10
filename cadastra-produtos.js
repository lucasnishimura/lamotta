var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers:{
        'Accept' : 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes,function(res){
    res.on('data',function(body){
    });
});

var produto = {
    nome: 'Produto aleatório',
    preco: '2.00',
    descricao: 'Esse produto é muito bom'
};

//só dispara a requisição aqui
client.end(JSON.stringify(produto));