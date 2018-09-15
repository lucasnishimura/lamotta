/*
*************************
Marcar querys j� executas
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


-- CREATE TABLE `estudo`.`vendas` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `cliente_id` INT NULL,
--   `data` DATETIME NULL,
--   `compra_id` INT NULL,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB;


CREATE TABLE `usuario` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `tipo` varchar(150) DEFAULT '',
  `permissoes` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '1 = ativo, 2 = inativo',
  `excluido` int(1) DEFAULT '0' COMMENT '0 = não, 1 = sim',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `conta_id` int(10) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `usuario_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
SELECT * FROM lamotta_com_br.usuario;