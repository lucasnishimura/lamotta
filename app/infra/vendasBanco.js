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
	this.connection.query('insert into vendas set ?',produto,callback);
}	

VendasBanco.prototype.salvaVenda =  function(produto,callback){
	for (var index = 0; index < produto.total; index++) {
		// const element = array[index];
		this.connection.query('insert into venda_produto (venda_id,produto_id,quantidade) VALUES ('+produto.venda_id+','+produto.vendas[index].produto+','+produto.vendas[index].quantidade+')',callback);
	}
}	

VendasBanco.prototype.ver =  function(produto,callback){
this.connection.query('select a.*,c.nome,date_format(a.data,"%d/%m/%Y") as data from vendas as a inner join clientes as c ON a.cliente_id = c.id where a.id = '+produto.id,callback);
}	

VendasBanco.prototype.verVendaProduto =  function(produto,callback){
	this.connection.query('select a.*,p.preco from venda_produto as a INNER JOIN produtos as p ON p.id = a.produto_id where venda_id = '+produto.id,callback);
}	

VendasBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update clientes set nome="'+produto.nome+'", empresa="'+produto.empresa+'", cliente="'+produto.cliente+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return VendasBanco;
}