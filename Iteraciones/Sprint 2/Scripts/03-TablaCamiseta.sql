CREATE TABLE 'camiseta' (
  'id' int(11) NOT NULL,
  'nombre' varchar(50) NOT NULL,
  'parentesco' varchar(50) NOT NULL,
  'bateria' int(11) NOT NULL,
  'horadatos' datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE 'camiseta'
  ADD PRIMARY KEY ('id');

ALTER TABLE 'camiseta'
  MODIFY 'id' int(11) NOT NULL AUTO_INCREMENT;
  
ALTER TABLE `camiseta` ADD `src` TEXT NOT NULL AFTER `horadatos`;

