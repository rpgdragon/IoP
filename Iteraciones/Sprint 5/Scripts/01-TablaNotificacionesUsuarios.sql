CREATE TABLE `dbs200017`.`usuarioxtokennotificacion` ( `idusuario` VARCHAR(200) NOT NULL , `token` VARCHAR(200) NOT NULL , PRIMARY KEY (`idusuario`)) ENGINE = InnoDB;

ALTER TABLE `usuarioxtokennotificacion` ADD FOREIGN KEY (`idusuario`) REFERENCES `usuarios`(`usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;