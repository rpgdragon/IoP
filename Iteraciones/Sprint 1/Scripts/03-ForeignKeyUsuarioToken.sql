ALTER TABLE `usuarioxtoken` ADD FOREIGN KEY (`idusuario`) REFERENCES `usuarios`(`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;