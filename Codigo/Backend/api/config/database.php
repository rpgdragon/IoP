<?php
class Database{
 
    // especificamos las credenciales
	//para el producto final que se lanzará se cambiaran
    private $host = "db5000205048.hosting-data.io";
    private $db_name = "dbs200017";
    private $usuario = "dbu176063";
    private $password = "AQUI IRÁ LA CONTRASEÑA";
    public $conexion = null;
 
    // get the database connection
    public function getConexion(){
 
		if($this->conexion==null){
			try{
				$this->conexion = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->usuario, $this->password);
				$this->conexion->exec("set names utf8");
			}catch(PDOException $exception){
				throw new Exception($exception->getMessage());
			}
		}
		//devolvemos la conexion
        return $this->conexion;
    }
}
?>