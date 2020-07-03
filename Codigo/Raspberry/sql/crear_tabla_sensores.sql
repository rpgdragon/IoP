DROP DATABASE IF EXISTS IOPSHIRT;
CREATE DATABASE IOPSHIRT;

USE IOPSHIRT;

DROP TABLE IF EXISTS sensores;

CREATE TABLE sensores(
  id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  horacreacion datetime NOT NULL,
  numeroserie varchar(30) NOT NULL,
  mensaje text NOT NULL,
  fecha varchar(25) not null,
  tipo varchar(5) not null,
  valor text not null,
  sensores varchar(4) null,
  viejo smallint not null);


