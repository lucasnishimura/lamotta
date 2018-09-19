function VendasBanco(connection){
	this.connection = connection; 
}

VendasBanco.prototype.lista =  function(filtros,callback){

	Filtroid  = '';
	Filtronome = '';
	Filtrovalor = '';
	Filtrodata = '';

	if(filtros.id != ""){
		var Filtroid = " and a.id = "+filtros.id;
	}
	
	if(filtros.nome != ""){
		var Filtronome = " and c.nome like '%"+filtros.nome+"%'";
	}
	
	if(filtros.valor != ""){
		var Filtrovalor = " and valor = '"+filtros.valor+"'";
	}

	if(filtros.data != ""){
		var Filtrodata = " and data >= '"+filtros.data+"'";
	}

    this.connection.query('select c.nome,a.id,valor,data from vendas as a inner join clientes as c on a.cliente_id = c.id where a.id > 0'+Filtronome+Filtroid+Filtrovalor+Filtrodata+' order by data asc',callback);
}	

VendasBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into clientes set ?',produto,callback);
}	

VendasBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select * from clientes where id = '+produto.id,callback);
}	

VendasBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update clientes set nome="'+produto.nome+'", empresa="'+produto.empresa+'", cliente="'+produto.cliente+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return VendasBanco;
}