function IngredientesBanco(connection){
	this.connection = connection; 
}

IngredientesBanco.prototype.lista =  function(filtros,callback){
	Filtroid  = '';
	Filtronome = '';
	Filtropreco = '';
	Filtroquantidade = '';

	if(filtros.id != ""){
		var Filtroid = " and id = "+filtros.id;
	}
	
	if(filtros.nome != ""){
		var Filtronome = " and nome like '%"+filtros.nome+"%'";
	}
	
	if(filtros.preco != ""){
		var Filtropreco = " and preco = '"+filtros.preco+"'";
	}

    if(filtros.quantidade != ""){
		var Filtroquantidade = " and quantidade = '"+filtros.quantidade+"'";
	}
	
	this.connection.query('select * from ingredientes where id > 0'+Filtronome+Filtroid+Filtropreco+Filtroquantidade+' order by id desc',callback);
}	

IngredientesBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into ingredientes set ?',produto,callback);
}	

IngredientesBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select * from ingredientes where id="'+produto.id+'"',callback);
}

IngredientesBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update ingredientes set nome="'+produto.nome+'", preco="'+produto.preco+'", quantidade="'+produto.quantidade+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return IngredientesBanco;
}