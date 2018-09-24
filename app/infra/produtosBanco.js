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

ProdutosBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select * from produtos where id="'+produto.id+'"',callback);
}

ProdutosBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update produtos set nome="'+produto.nome+'", preco="'+produto.preco+'", descricao="'+produto.descricao+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return ProdutosBanco;
}