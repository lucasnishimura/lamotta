function ProdutosBanco(connection){
	this.connection = connection; 
}

ProdutosBanco.prototype.lista =  function(callback){
	this.connection.query('select * from produtos',callback);
}	

ProdutosBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into produtos set ?',produto,callback);
}	

module.exports = function(){
	return ProdutosBanco;
}