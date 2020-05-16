ALTER TABLE `camiseta` ADD `calle` VARCHAR(100) NULL AFTER `direccion`, ADD `numero` VARCHAR(10) NULL AFTER `calle`, ADD `localidad` VARCHAR(100) NULL AFTER `numero`, ADD `provincia` VARCHAR(100) NULL AFTER `localidad`; 
ALTER TABLE `camiseta` DROP COLUMN `parentesco`;
ALTER TABLE `camiseta` DROP COLUMN `direccion`;
ALTER TABLE `camiseta` ADD `latitud` DOUBLE NULL AFTER `provincia`, ADD `longitud` DOUBLE NULL AFTER `latitud`; 