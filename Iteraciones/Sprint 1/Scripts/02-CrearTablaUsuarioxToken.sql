CREATE TABLE `dbs200017`.`usuarioxtoken` ( `idusuario` VARCHAR(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `token` VARCHAR(128) NOT NULL , `horacreacion` DATETIME NOT NULL , UNIQUE `idusuario` (`idusuario`)) ENGINE = InnoDB;