function EstoqueBanco(connection){
	this.connection = connection; 
}

EstoqueBanco.prototype.lista =  function(filtros,callback){
	Filtroid  = '';
	Filtronome = '';
	Filtroquantidade = '';

	if(filtros.id != ""){
		var Filtroid = " and id = "+filtros.id;
	}
	
	if(filtros.nome != ""){
		var Filtronome = " and nome like '%"+filtros.nome+"%'";
	}
	
    if(filtros.quantidade != ""){
		var Filtroquantidade = " and quantidade = '"+filtros.quantidade+"'";
	}
	
	this.connection.query('select * from estoque where id > 0'+Filtronome+Filtroid+Filtroquantidade+' order by id desc',callback);
}	

EstoqueBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into estoque set ?',produto,callback);
}	

EstoqueBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select * from estoque where id="'+produto.id+'"',callback);
}

EstoqueBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update estoque set nome="'+produto.nome+'", quantidade="'+produto.quantidade+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return EstoqueBanco;
}