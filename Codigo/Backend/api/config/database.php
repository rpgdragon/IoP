<?php
class Database{
 
    // especificamos las credenciales
	//para el producto final que se lanzará se cambiaran
    private $host = "dbs200017.cwvh9skac7dl.us-east-2.rds.amazonaws.com";
    private $db_name = "iopshirt";
    private $usuario = "root";
    private $password = "NOPONEMOSELPASSWORD";
    public $conexion = null;
 
    // get the database connection
    public function getConexion(){
		if($this->conexion==null){
			try{
				$this->conexion = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->usuario, $this->password);
				$this->conexion->exec("set names utf8");
			}catch(PDOException $exception){
                echo "Excepción";
				throw new Exception($exception->getMessage());
			}
		}
		//devolvemos la conexion
        return $this->conexion;
    }
}
?>