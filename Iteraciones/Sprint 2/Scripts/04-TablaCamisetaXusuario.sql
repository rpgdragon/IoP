CREATE TABLE 'dbs200017'.'camisetaxusuario' ( 'idcamiseta' INT NOT NULL , 'idusuario' varchar(200) NOT NULL ) ENGINE = InnoDB;

ALTER TABLE 'camisetaxusuario' ADD FOREIGN KEY ('idcamiseta') REFERENCES 'camiseta'('id') ON DELETE RESTRICT ON UPDATE RESTRICT; 
ALTER TABLE 'camisetaxusuario' ADD FOREIGN KEY ('idusuario') REFERENCES 'usuarios'('usuario') ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE 'camisetaxusuario' ADD UNIQUE('idcamiseta');



