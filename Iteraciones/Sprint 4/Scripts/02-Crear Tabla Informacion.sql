CREATE TABLE `dbs200017`.`informacion` ( `ecg` INT NOT NULL , `eda` INT NOT NULL , `temperatura` FLOAT NOT NULL , `X` FLOAT NOT NULL , `Y` FLOAT NOT NULL , `Z` FLOAT NOT NULL , `fecha` DATETIME NOT NULL , `numeroserie` INT NOT NULL , PRIMARY KEY (`fecha`, `numeroserie`)) ENGINE = InnoDB PARTITION BY HASH (MONTH(fecha)) PARTITIONS 12;

ALTER TABLE `informacion` CHANGE `numeroserie` `numeroserie` VARCHAR(16) NOT NULL;