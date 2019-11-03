<?php
class Camiseta{
 
    private $conexion;
    private $tabla = "camiseta";
    private $tablaxusuario = "camisetaxusuario";
 
    private $nombre;
    private $parentesco;
    private $bateria;
    private $horadatos;
 
    public function __construct(){
    }
	
	function setConexion($conexion){
		$this->conexion = $conexion;
	}
	
	function getConexion(){
		return $this->conexion;
	}
	
	function setNombre($nombre){
		$this->nombre = $nombre;
	}
	
	function getNombre(){
		return $this->nombre;
	}

	function setParentesco($parentesco){
		$this->parentesco = $parentesco;
	}
	
	function getParentesco($parentesco){
		return $this->parentesco;
	}
	
	function setBateria($bateria){
		$this->bateria= $bateria;
	}
	
	function getBateria($bateria){
		return $this->bateria;
    }
    
    function setHoradatos($horadatos){
		$this->horadatos = $horadatos;
	}
	
	function getHoradatos($horadatos){
		return $this->horadatos;
    }
    
    function listar_camisetas($usuario){
        // query to insert record
        $query = "SELECT camiseta.* FROM " . $this->tablaxusuario . " camisetaxusuario 
                  INNER JOIN ". $this->tabla . " camiseta on camiseta.id = camisetaxusuario.idcamiseta 
                  WHERE camisetaxusuario.idusuario=:idusuario";
        $queryst = $this->conexion->prepare($query);
        $queryst->bindParam(":idusuario", $usuario);
        $queryst->execute();
        $results = $queryst->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        return $json;
    }

}