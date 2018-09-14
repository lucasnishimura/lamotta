function ClientesBanco(connection){
	this.connection = connection; 
}

ClientesBanco.prototype.lista =  function(callback){
	this.connection.query('select * from clientes',callback);
}	

ClientesBanco.prototype.total =  async function(callback){
	this.connection.query('select (select count(id) from clientes) as clientes, (select count(id) from produtos) as produtos',callback);
}	

ClientesBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into clientes set ?',produto,callback);
}	

module.exports = function(){
	return ClientesBanco;
}