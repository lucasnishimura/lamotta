function ProdutosBanco(connection){
	this.connection = connection; 
}

ProdutosBanco.prototype.lista =  function(filtros,callback){
	Filtroid  = '';
	Filtronome = '';
	Filtropreco = '';
// console.log(filtros)
	if(filtros.id != "" && filtros.id != 'undefined'){
		var Filtroid = " and id = "+filtros.id;
	}
	
	if(filtros.nome != "" && filtros.nome != 'undefined'){
		var Filtronome = " and nome like '%"+filtros.nome+"%'";
	}
	
	if(filtros.preco != "" && filtros.preco != 'undefined'){
		var Filtropreco = " and preco = '"+filtros.preco+"'";
	}
	
	this.connection.query('select * from produtos where id > 0'+Filtronome+Filtroid+Filtropreco+' order by id desc',callback);
}	

ProdutosBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into produtos set ?',produto,callback);
}	

module.exports = function(){
	return ProdutosBanco;
}