/*
*************************
Marcar querys já executas
*************************
*/

-- CREATE DATABASE `estudo_teste` /*!40100 DEFAULT CHARACTER SET latin1 */;

-- CREATE TABLE `produtos` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `nome` varchar(45) DEFAULT NULL,
--   `preco` varchar(45) DEFAULT NULL,
--   `descricao` text,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=big5;

-- CREATE TABLE `clientes` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `nome` varchar(45) DEFAULT NULL,
--   `cliente` varchar(45) DEFAULT NULL,
--   `empresa` varchar(45) default null,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=big5;


CREATE TABLE `estudo`.`vendas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NULL,
  `data` DATETIME NULL,
  `compra_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
