
CREATE TABLE IF NOT EXISTS `usuarios` (
  `usuario` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `esFacebook` smallint(6) DEFAULT '0',
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
