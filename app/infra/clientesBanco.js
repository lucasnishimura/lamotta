function ClientesBanco(connection){
	this.connection = connection; 
}

ClientesBanco.prototype.lista =  function(filtros,callback){

	Filtroid  = '';
	Filtronome = '';
	Filtrocliente = '';
	Filtroempresa = '';

	if(filtros.id != ""){
		var Filtroid = " and id = "+filtros.id;
	}
	
	if(filtros.nome != ""){
		var Filtronome = " and nome like '%"+filtros.nome+"%'";
	}
	
	if(filtros.cliente != ""){
		var Filtrocliente = " and cliente like '%"+filtros.cliente+"%'";
	}

	if(filtros.empresa != ""){
		var Filtroempresa = " and empresa like '%"+filtros.empresa+"%'";
	}

	this.connection.query('select * from clientes where id > 0'+Filtronome+Filtroid+Filtrocliente+Filtroempresa+' order by id desc',callback);
}	

ClientesBanco.prototype.total =  async function(callback){
	this.connection.query('select (select count(id) from clientes) as clientes, (select count(id) from produtos) as produtos',callback);
}	

ClientesBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into clientes set ?',produto,callback);
}	

ClientesBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select * from clientes where id = '+produto.id,callback);
}	

ClientesBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update clientes set nome="'+produto.nome+'", empresa="'+produto.empresa+'", cliente="'+produto.cliente+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return ClientesBanco;
}