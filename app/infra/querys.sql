/*
*************************
Marcar querys j� executas
*************************
*/

-- CREATE DATABASE `lamotta_com_br_teste` /*!40100 DEFAULT CHARACTER SET latin1 */;

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


-- CREATE TABLE `lamotta_com_br`.`vendas` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `cliente_id` INT NULL,
--   `data` DATETIME NULL,
--   `compra_id` INT NULL,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB;


-- CREATE TABLE `usuario` (
--   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
--   `nome` varchar(255) DEFAULT NULL,
--   `email` varchar(255) DEFAULT NULL,
--   `senha` varchar(255) DEFAULT NULL,
--   `tipo` varchar(150) DEFAULT '',
--   `permissoes` varchar(255) DEFAULT NULL,
--   `status` int(1) NOT NULL DEFAULT '1' COMMENT '1 = ativo, 2 = inativo',
--   `excluido` int(1) DEFAULT '0' COMMENT '0 = não, 1 = sim',
--   `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   `conta_id` int(10) DEFAULT NULL,
--   `ip` varchar(100) DEFAULT NULL,
--   `usuario_id` int(10) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
-- SELECT * FROM lamotta_com_br.usuario;

-- ALTER TABLE `lamotta_com_br`.`vendas` 
-- DROP COLUMN `compra_id`;

-- ALTER TABLE `lamotta_com_br`.`vendas` 
-- ADD COLUMN `valor` FLOAT(4,2) NULL AFTER `data`;

-- INSERT INTO `lamotta_com_br`.`vendas` (`cliente_id`, `data`, `valor`) VALUES ('1', '2018-09-12', '30.00');
-- INSERT INTO `lamotta_com_br`.`vendas` (`cliente_id`, `data`, `valor`) VALUES ('2', '2019-10-10', '60.50');
-- INSERT INTO `lamotta_com_br`.`vendas` (`cliente_id`, `data`, `valor`) VALUES ('3', '2018-02-22', '10.10');
-- INSERT INTO `lamotta_com_br`.`vendas` (`cliente_id`, `data`, `valor`) VALUES ('1', '2018-08-12', '12.00');


-- CREATE TABLE `lamotta_com_br`.`venda_produto` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `venda_id` INT NULL,
--   `produto_id` VARCHAR(45) NULL,
--   PRIMARY KEY (`id`));

-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('1', '1');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('1', '2');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('1', '3');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('1', '4');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('2', '3');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('2', '4');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('3', '3');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('3', '3');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('4', '2');
-- INSERT INTO `lamotta_com_br`.`venda_produto` (`venda_id`, `produto_id`) VALUES ('4', '2');

-- ALTER TABLE `lamotta_com_br`.`venda_produto` 
-- ADD COLUMN `quantidade` INT NULL AFTER `produto_id`;


-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='1' WHERE `id`='1';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='2' WHERE `id`='2';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='2' WHERE `id`='3';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='3' WHERE `id`='4';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='1' WHERE `id`='5';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='1' WHERE `id`='6';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='1' WHERE `id`='7';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='1' WHERE `id`='8';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='2' WHERE `id`='9';
-- UPDATE `lamotta_com_br`.`venda_produto` SET `quantidade`='1' WHERE `id`='10';

-- CREATE TABLE `lamotta_com_br`.`ingredientes` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `nome` VARCHAR(45) NULL,
--   `quantidade` INT NULL,
--   `preco` FLOAT(10,2) NULL,
--   PRIMARY KEY (`id`));

--   CREATE TABLE `lamotta_com_br`.`estoque` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `nome` VARCHAR(45) NULL,
--   `quantidade` INT NULL,
--   PRIMARY KEY (`id`));

--   CREATE TABLE `lamotta_com_br`.`produto_estoque` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `produto_id` INT NULL,
--   `estoque_id` INT NULL,
--   `quantidade` INT NULL,
--   PRIMARY KEY (`id`));


ALTER TABLE `lamotta_com_br`.`produtos` 
ADD COLUMN `imagem` VARCHAR(45) NULL AFTER `descricao`;

ALTER TABLE `lamotta_com_br`.`vendas` 
ADD COLUMN `status` VARCHAR(45) NULL AFTER `valor`;

ALTER TABLE `lamotta_com_br`.`vendas` 
ADD COLUMN `restante` FLOAT NULL AFTER `status`;
