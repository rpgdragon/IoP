<?php
class Informacion{
 
    private $conexion;
    private $tabla = "informacion";
    private $tablacamiseta = "camiseta";
    private $tablaproducto = "producto";
 
	private $ecg;
    private $eda;
	private $temperatura;
	private $fecha;
    private $numeroserie;
    private $bateria;
 
    public function __construct(){
    }
	
	function setConexion($conexion){
		$this->conexion = $conexion;
	}
	
	function getConexion(){
		return $this->conexion;
	}
	
	function setEcg($ecg){
		$this->ecg = $ecg;
	}
	
	function getEcg(){
		return $this->ecg;
	}

	function setEda($eda){
		$this->eda = $eda;
	}
	
	function getEda(){
		return $this->eda;
	}
	
	function setTemperatura($temperatura){
		$this->temperatura= $temperatura;
	}
	
	function getTemperatura(){
		return $this->temperatura;
    }
    
	function getBateria(){
		return $this->bateria;
	}
	
	function setBateria($bateria){
		$this->bateria = $bateria;
	}

	function setNumeroserie($numeroserie){
		$this->numeroserie = $numeroserie;
	}

	function getNumeroserie(){
		return $this->numeroserie;
    }
    
	function setFecha($fecha){
		$this->fecha = $fecha;
	}

	function getFecha(){
		return $this->fecha;
	}

	/**
	 * Metodo que inserta un valor de informacion
	 */
	function registrar_informacion(){
        if($this->comprobar_existe_producto()){
		    $query = "INSERT INTO ".$this->tabla . " SET ecg=:ecg, eda=:eda, temperatura=:temperatura, bateria=:bateria,numeroserie=:numeroserie,fecha=NOW()";
            $queryst = $this->conexion->prepare($query);
            $queryst->bindParam(":ecg", $this->ecg);
            $queryst->bindParam(":eda", $this->eda);
            $queryst->bindParam(":temperatura", $this->temperatura);
            $queryst->bindParam(":bateria", $this->bateria);
            $queryst->bindParam(":numeroserie", $this->numeroserie);
            try{
                if($queryst->execute()){
                    return true;
                
                }
                else{
                    print("No se ha podido insertar el registro");
                    return false;
                }
            }catch(PDOException $e) { 
                print("Se ha producido una excepción ".$e->getMessage());
                return false; 
            }
        }
        else{
            return false;
        }
    }
    
    /**
	 * Metodo que inserta un valor de informacion
	 */
	function registrar_informacion_confecha(){
        if($this->comprobar_existe_producto()){
		    $query = "INSERT INTO ".$this->tabla . " SET ecg=:ecg, eda=:eda, temperatura=:temperatura, bateria=:bateria,numeroserie=:numeroserie,fecha=:fecha";
            $queryst = $this->conexion->prepare($query);
            $queryst->bindParam(":ecg", $this->ecg);
            $queryst->bindParam(":eda", $this->eda);
            $queryst->bindParam(":temperatura", $this->temperatura);
            $queryst->bindParam(":bateria", $this->bateria);
            $queryst->bindParam(":numeroserie", $this->numeroserie);
            $queryst->bindParam(":fecha", $this->fecha);
            try{
                if($queryst->execute()){
                    return true;
                
                }
                else{
                    return false;
                }
            }catch(PDOException $e) { 
                return false; 
            }
        }
        else{
            return false;
        }
	}

	function actualizar_bateria_camiseta(){
        if($this->comprobar_existe_producto()){
            $query = "UPDATE ".$this->tablacamiseta . " SET bateria=:bateria WHERE numeroserie=:numeroserie";
            $queryst = $this->conexion->prepare($query);
            $queryst->bindParam(":bateria", $this->bateria);
            $queryst->bindParam(":numeroserie", $this->numeroserie);
            try{
                if($queryst->execute()){
                    return true;
                
                }
                else{
                    return false;
                }
            }catch(PDOException $e) { 
                return false; 
            }
        }
    }

    function comprobar_existe_producto(){
        $query = "SELECT producto.* FROM " .$this->tablaproducto . "  
                  WHERE producto.numeroserie=:numeroserie";
        $queryst = $this->conexion->prepare($query);
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

    function obtener_datos_last_minute(){
        $query= "SELECT informacion.* FROM ".$this->tabla." WHERE fecha >= NOW() - INTERVAL 2 MINUTE  AND numeroserie=:numeroserie ORDER BY fecha desc LIMIT 0,1";
        $queryst = $this->conexion->prepare($query);
        $queryst->bindParam(":numeroserie", $this->numeroserie);
        $queryst->execute();
        $results = $queryst->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        return $json;
    }

    function obtener_ultimas_temperaturas(){
        $query= "SELECT informacion.temperatura FROM ".$this->tabla." WHERE fecha >= NOW() - INTERVAL 10 MINUTE  AND numeroserie=:numeroserie ORDER BY fecha asc LIMIT 0,10";
        $queryst = $this->conexion->prepare($query);
        $queryst->bindParam(":numeroserie", $this->numeroserie);
        $queryst->execute();
        $results = $queryst->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        return $json;
    }

    function obtener_fecha_historico($fechade,$fechahasta){
        $query= "SELECT informacion.* FROM ".$this->tabla." WHERE fecha between :fechade and :fechahasta  AND numeroserie=:numeroserie ORDER BY fecha asc";
        $queryst = $this->conexion->prepare($query);
        $queryst->bindParam(":fechade", $fechade);
        $queryst->bindParam(":fechahasta", $fechahasta);
        $queryst->bindParam(":numeroserie", $this->numeroserie);
        $queryst->execute();
        $results = $queryst->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        return $json;
    }

}