function ProdutosBanco(connection){
	this.connection = connection; 
}

ProdutosBanco.prototype.lista =  function(filtros,callback){
	Filtroid  = '';
	Filtronome = '';
	Filtropreco = '';
// console.log(filtros)
	if(filtros.id != ""){
		var Filtroid = " and id = "+filtros.id;
	}
	
	if(filtros.nome != ""){
		var Filtronome = " and nome like '%"+filtros.nome+"%'";
	}
	
	if(filtros.preco != ""){
		var Filtropreco = " and preco = '"+filtros.preco+"'";
	}
	
	this.connection.query('select * from produtos where id > 0'+Filtronome+Filtroid+Filtropreco+' order by id desc',callback);
}	

ProdutosBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into produtos set ?',produto,callback);
}	

ProdutosBanco.prototype.estoqueProduto =  function(produto,callback){
	for (index = 0; index < produto.total; index++) {
		this.connection.query('insert into produto_estoque (produto_id,estoque_id,quantidade) VALUES ('+produto.produto_id+','+produto.ingredientes[index].ingrediente+','+produto.ingredientes[index].quantidade+')',callback);
	}
	
}

ProdutosBanco.prototype.apagaProduto = function(produto,callback){
	this.connection.query('delete from produto_estoque where produto_id = '+produto,callback)
}

ProdutosBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select * from produtos where id="'+produto.id+'"',callback);
}

ProdutosBanco.prototype.todos =  function(callback){
	this.connection.query('select * from produtos',callback);
}

ProdutosBanco.prototype.verEstoqueProduto =  function(produto,callback){
	this.connection.query('select nome,a.quantidade,e.id from produto_estoque as a INNER JOIN estoque as e ON a.estoque_id = e.id where produto_id = "'+produto.id+'"',callback);
}

ProdutosBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update produtos set nome="'+produto.nome+'", preco="'+produto.preco+'", descricao="'+produto.descricao+'", imagem="'+produto.imagem+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return ProdutosBanco;
}