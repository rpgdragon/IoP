<?php
class Producto{
    private $numeroserie;
    private $codseg;
    private $esECG;
    private $esEDA;
    private $esTemperatura;
    private $esCaida;

    private $conexion;
    private $tabla = "producto";

    public function __construct(){
    }
	
	function setConexion($conexion){
		$this->conexion = $conexion;
	}
	
	function getConexion(){
		return $this->conexion;
    }
    
    function setNumeroserie($numeroserie){
		$this->numeroserie = $numeroserie;
	}
	
	function getNumeroserie(){
		return $this->numeroserie;
    }
    
    function setCodseg($codseg){
		$this->codseg = $codseg;
	}
	
	function getCodseg(){
		return $this->codseg;
    }
    
    function setEsECG($esECG){
		$this->esECG = $esECG;
	}
	
	function getEsECG(){
		return $this->esECG;
    }
    
    function setEsEDA($esEDA){
		$this->esEDA = $esEDA;
	}
	
	function getEsEDA(){
		return $this->esEDA;
    }
    
    function setEsTemperatura($esTemperatura){
		$this->esTemperatura = $esTemperatura;
	}
	
	function getEsTemperatura(){
		return $this->esTemperatura;
    }
    
    function setEsCaida($esCaida){
		$this->esCaida = $esCaida;
	}
	
	function getEsCaida(){
		return $this->esCaida;
    }

    function actualizar_producto(){
        $query = "UPDATE ".$this->tabla . " SET codseg=:codseg, esECG=:esECG, esEDA=:esEDA, esTemperatura=:esTemperatura, esCaida=:esCaida WHERE numeroserie=:numeroserie ";
		$queryst = $this->conexion->prepare($query);
        $queryst->bindParam(":codseg", $this->codseg);
        $queryst->bindParam(":esECG", $this->esECG);
        $queryst->bindParam(":esEDA", $this->esEDA);
        $queryst->bindParam(":esTemperatura", $this->esTemperatura);
        $queryst->bindParam(":esCaida", $this->esCaida);
        $queryst->bindParam(":numeroserie", $this->numeroserie);
		if($queryst->execute()){
			return true;
		}
		else{
			return false;
		}
    }

    function encontrar_producto(){
        // query to insert record
        $query = "SELECT producto.* FROM " . $this->tabla . "  
                  WHERE producto.numeroserie=:numeroserie";
		$queryst = $this->conexion->prepare($query);
		$this->numeroserie=htmlspecialchars(strip_tags($this->numeroserie));
        $queryst->bindParam(":numeroserie", $this->numeroserie);
        try{
			$queryst->execute();
			if($queryst->rowCount() > 0){
				//existe un producto
				return true;
			}
			else{
				//no existe
				return false;
			}
		}catch(PDOException $e) { 
			return false; 
		}
    }

    function encontrar_producto_con_caida(){
        // query to insert record
        $query = "SELECT producto.* FROM " . $this->tabla . "  
                  WHERE producto.numeroserie=:numeroserie and producto.esCaida=1";
		$queryst = $this->conexion->prepare($query);
		$this->numeroserie=htmlspecialchars(strip_tags($this->numeroserie));
        $queryst->bindParam(":numeroserie", $this->numeroserie);
        try{
			$queryst->execute();
			if($queryst->rowCount() > 0){
				//existe un producto
				return true;
			}
			else{
				//no existe
				return false;
			}
		}catch(PDOException $e) { 
			return false; 
		}
    }

    /**
	 * Metodo que registra el producto
	 */
	function registrar_producto(){
		$query = "INSERT INTO ".$this->tabla . " SET numeroserie=:numeroserie, codseg=:codseg,
		esECG=:esECG, esEDA=:esEDA, esTemperatura=:esTemperatura, esCaida=:esCaida ";
		$queryst = $this->conexion->prepare($query);
		$this->conexion->beginTransaction(); 
		$this->numeroserie=htmlspecialchars(strip_tags($this->numeroserie));
		$this->codseg=htmlspecialchars(strip_tags($this->codseg));
		$this->esECG=htmlspecialchars(strip_tags($this->esECG));
		$this->esEDA=htmlspecialchars(strip_tags($this->esEDA));
		$this->esTemperatura=htmlspecialchars(strip_tags($this->esTemperatura));
		$this->esCaida=htmlspecialchars(strip_tags($this->esCaida));
		
		$queryst->bindParam(":numeroserie", $this->numeroserie);
		$queryst->bindParam(":codseg", $this->codseg);
		$queryst->bindParam(":esECG", $this->esECG);
		$queryst->bindParam(":esEDA", $this->esEDA);
		$queryst->bindParam(":esTemperatura", $this->esTemperatura);
		$queryst->bindParam(":esCaida", $this->esCaida);
		try{
			if($queryst->execute()){
				$this->conexion->commit(); 
				return true;
			}
			else{
				$this->conexion->rollback(); 
				return false;
			}
		}catch(PDOException $e) {
			print($e->getMessage());
			$this->conexion->rollback();
			return false; 
		}
	}
}