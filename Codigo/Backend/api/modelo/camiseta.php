<?php
class Camiseta{
 
    private $conexion;
    private $tabla = "camiseta";
	private $tablaxusuario = "camisetaxusuario";
	private $tablaproducto = "producto";
 
	private $id;
    private $nombre;
	private $parentesco;
	private $numeroserie;
	private $codseg;
	private $src;
	private $ecgminimo;
	private $ecgmaximo;
	private $edaminimo;
	private $edamaximo;
	private $temperaturaminimo;
	private $temperaturamaximo;
	private $notificacionesecg;
	private $notificacioneseda;
	private $notificacionestemperatura;
	private $notificacionescaida;
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
	
	function getParentesco(){
		return $this->parentesco;
	}
	
	function setBateria($bateria){
		$this->bateria= $bateria;
	}
	
	function getBateria(){
		return $this->bateria;
    }
    
    function setHoradatos($horadatos){
		$this->horadatos = $horadatos;
	}
	
	function getHoradatos(){
		return $this->horadatos;
	}
	
	function setNumeroserie($numeroserie){
		$this->numeroserie = $numeroserie;
	}

	function getNumeroserie(){
		return $this->numeroserie;
    }
	
	function getCodseg(){
		return $this->codseg;
	}
	
	function setCodseg($codseg){
		$this->codseg = $codseg;
	}

	function getId(){
		return $this->id;
	}
	
	function setId($id){
		$this->id = $id;
	}

	function getSrc(){
		return $this->src;
	}
	
	function setSrc($src){
		$this->src = $src;
	}

	function getEcgminimo(){
		return $this->ecgminimo;
	}
	
	function setEcgminimo($ecgminimo){
		$this->ecgminimo = $ecgminimo;
	}

	function getEcgmaximo(){
		return $this->ecgmaximo;
	}
	
	function setEcgmaximo($ecgmaximo){
		$this->ecgmaximo = $ecgmaximo;
	}

	function getEdaminimo(){
		return $this->edaminimo;
	}
	
	function setEdaminimo($edaminimo){
		$this->edaminimo = $edaminimo;
	}

	function getEdamaximo(){
		return $this->edamaximo;
	}
	
	function setEdamaximo($edamaximo){
		$this->edamaximo = $edamaximo;
	}

	function getTemperaturaminimo(){
		return $this->temperaturaminimo;
	}
	
	function setTemperaturaminimo($temperaturaminimo){
		$this->temperaturaminimo = $temperaturaminimo;
	}

	function getTemperaturamaximo(){
		return $this->temperaturamaximo;
	}
	
	function setTemperaturamaximo($temperaturamaximo){
		$this->temperaturamaximo = $temperaturamaximo;
	}

	function setNotificacionesecg($notificacionesecg){
		$this->notificacionesecg = $notificacionesecg;
	}
	
	function getNotificacionesecg(){
		return $this->notificacionesecg;
	}

	function setNotificacioneseda($notificacioneseda){
		$this->notificacioneseda = $notificacioneseda;
	}
	
	function getNotificacioneseda(){
		return $this->notificacioneseda;
	}

	function setNotificacionestemperatura($notificacionestemperatura){
		$this->notificacionestemperatura = $notificacionestemperatura;
	}

	function getNotificacionestemperatura(){
		return $this->notificacionestemperatura;
	}

	function setNotificacionesbateria($notificacionesbateria){
		$this->notificacionesbateria = $notificacionesbateria;
	}
	
	function getNotificacionesbateria(){
		return $this->notificacionesbateria;
	}

	function setNotificacionescaida($notificacionescaida){
		$this->notificacionescaida = $notificacionescaida;
	}

	function getNotificacionescaida(){
		return $this->notificacionescaida;
	}

    function listar_camisetas($usuario){
        // query to insert record
        $query = "SELECT camiseta.* FROM " . $this->tablaxusuario . " camisetaxusuario 
                  INNER JOIN ". $this->tabla . " camiseta on camiseta.id = camisetaxusuario.idcamiseta 
                  WHERE camisetaxusuario.idusuario=:idusuario";
		$queryst = $this->conexion->prepare($query);
		$usuario=htmlspecialchars(strip_tags($usuario));
        $queryst->bindParam(":idusuario", $usuario);
        $queryst->execute();
        $results = $queryst->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        return $json;
	}
	

	/**
	 * Metodo que registra la camiseta
	 */
	function registrar_camiseta($usuario){
		$query = "INSERT INTO ".$this->tabla . " SET nombre=:nombre, parentesco=:parentesco, numeroserie=:numeroserie, src=:src,ecgminimo=:ecgminimo,
		ecgmaximo=:ecgmaximo,edaminimo=:edaminimo,edamaximo=:edamaximo,temperaturaminimo=:temperaturaminimo, temperaturamaximo=:temperaturamaximo,
		notificacionesecg=:notificacionesecg,notificacioneseda=:notificacioneseda,notificacionestemperatura=:notificacionestemperatura,notificacionescaida=:notificacionescaida ";
		$query2="INSERT INTO ". $this->tablaxusuario. " SET idcamiseta=:idcamiseta, idusuario=:idusuario";
		$queryst = $this->conexion->prepare($query);
		$queryst2 = $this->conexion->prepare($query2);
		$this->conexion->beginTransaction(); 
		$this->nombre=htmlspecialchars(strip_tags($this->nombre));
		$this->parentesco=htmlspecialchars(strip_tags($this->parentesco));
		$this->src=htmlspecialchars(strip_tags($this->src));
		$this->numeroserie=htmlspecialchars(strip_tags($this->numeroserie));
		$queryst->bindParam(":nombre", $this->nombre);
		$queryst->bindParam(":parentesco", $this->parentesco);
		$queryst->bindParam(":src", $this->src);
		$queryst->bindParam(":numeroserie", $this->numeroserie);
		$queryst->bindParam(":ecgminimo", $this->ecgminimo);
		$queryst->bindParam(":ecgmaximo", $this->ecgmaximo);
		$queryst->bindParam(":edaminimo", $this->edaminimo);
		$queryst->bindParam(":edamaximo", $this->edamaximo);
		$queryst->bindParam(":temperaturaminimo", $this->temperaturaminimo);
		$queryst->bindParam(":temperaturamaximo", $this->temperaturamaximo);
		$queryst->bindParam(":notificacionesecg", $this->notificacionesecg);
		$queryst->bindParam(":notificacioneseda", $this->notificacioneseda);
		$queryst->bindParam(":notificacionestemperatura", $this->notificacionestemperatura);
		$queryst->bindParam(":notificacionescaida", $this->notificacionescaida);
		try{
			if($queryst->execute()){
				//si devuelve true, tenemos que obtener el id generado para asignarlo en la tabla usuarioxcamiseta
				$usuario=htmlspecialchars(strip_tags($usuario));
				$queryst2->bindParam(":idcamiseta", $this->conexion->lastInsertId());
				$queryst2->bindParam(":idusuario", $usuario);
				if($queryst2->execute()){
					$this->conexion->commit(); 
					return true;
				}
				else{
					$this->conexion->rollback(); 
					return false;
				}
			}
			else{
				$this->conexion->rollback(); 
				return false;
			}
		}catch(PDOException $e) { 
			$this->conexion->rollback();
			return false; 
		}
	}

	/**
	 * Metodo que actualiza la camiseta
	 */
	function actualizar_camiseta(){
		$query = "UPDATE ".$this->tabla . " SET nombre=:nombre, parentesco=:parentesco,src=:src,ecgminimo=:ecgminimo,
		ecgmaximo=:ecgmaximo,edaminimo=:edaminimo,edamaximo=:edamaximo,temperaturaminimo=:temperaturaminimo, temperaturamaximo=:temperaturamaximo,
		notificacionesecg=:notificacionesecg,notificacioneseda=:notificacioneseda,notificacionestemperatura=:notificacionestemperatura,notificacionescaida=:notificacionescaida WHERE id=:id ";
		$queryst = $this->conexion->prepare($query);
		$this->nombre=htmlspecialchars(strip_tags($this->nombre));
		$this->parentesco=htmlspecialchars(strip_tags($this->parentesco));
		$this->src=htmlspecialchars(strip_tags($this->src));
		$this->ecgminimo=htmlspecialchars(strip_tags($this->ecgminimo));
		$this->ecgmaximo=htmlspecialchars(strip_tags($this->ecgmaximo));
		$this->edaminimo=htmlspecialchars(strip_tags($this->edaminimo));
		$this->edamaximo=htmlspecialchars(strip_tags($this->edamaximo));
		$this->temperaturaminimo=htmlspecialchars(strip_tags($this->temperaturaminimo));
		$this->temperaturamaximo=htmlspecialchars(strip_tags($this->temperaturamaximo));
		$this->notificacionesecg=htmlspecialchars(strip_tags($this->notificacionesecg));
		$this->notificacioneseda=htmlspecialchars(strip_tags($this->notificacioneseda));
		$this->notificacionestemperatura=htmlspecialchars(strip_tags($this->notificacionestemperatura));
		$this->notificacionescaida=htmlspecialchars(strip_tags($this->notificacionescaida));
		$this->id=htmlspecialchars(strip_tags($this->id));
		$queryst->bindParam(":nombre", $this->nombre);
		$queryst->bindParam(":parentesco", $this->parentesco);
		$queryst->bindParam(":src", $this->src);
		$queryst->bindParam(":ecgminimo", $this->ecgminimo);
		$queryst->bindParam(":ecgmaximo", $this->ecgmaximo);
		$queryst->bindParam(":edaminimo", $this->edaminimo);
		$queryst->bindParam(":edamaximo", $this->edamaximo);
		$queryst->bindParam(":temperaturaminimo", $this->temperaturaminimo);
		$queryst->bindParam(":temperaturamaximo", $this->temperaturamaximo);
		$queryst->bindParam(":notificacionesecg", $this->notificacionesecg);
		$queryst->bindParam(":notificacioneseda", $this->notificacioneseda);
		$queryst->bindParam(":notificacionestemperatura", $this->notificacionestemperatura);
		$queryst->bindParam(":notificacionescaida", $this->notificacionescaida);
		$queryst->bindParam(":id", $this->id);
        if($queryst->execute()){
			return true;
		}
		else{
			return false;
		}
	}

	/**
	 * Metodo que borra la camiseta
	 */
	function delete_camiseta(){
		//como el borrado es restrictivo hay que hacer 2 deletes
		$query = "DELETE FROM ". $this->tablaxusuario. " WHERE idcamiseta=:id";
		$query2 = "DELETE FROM ". $this->tabla. " WHERE id=:id";
		$queryst = $this->conexion->prepare($query);
		$queryst2 = $this->conexion->prepare($query2);
		$this->conexion->beginTransaction(); 
		$this->id=htmlspecialchars(strip_tags($this->id));
		$queryst->bindParam(":id", $this->id);
		$queryst2->bindParam(":id", $this->id);
		try{
			if($queryst->execute()){
				if($queryst2->execute()){
					$this->conexion->commit(); 
					return true;
				}
				else{
					$this->conexion->rollback(); 
					return false;
				}
			}
			else{
				$this->conexion->rollback(); 
				return false;
			}
		}catch(PDOException $e) { 
			$this->conexion->rollback();
			return false; 
		}
		
	}

	/**
	 * Este metodo comprueba que la camiseta que se esta intentando registrar exista en la tabla producto
	 * y que su codigo de seguridad coincida
	 */
	function validar_numero_serie_codigo_seguridad(){
		$query = "SELECT * FROM ".$this->tablaproducto." WHERE numeroserie=:numeroserie AND codseg=:codseg ";
		$queryst = $this->conexion->prepare($query);
		$this->numeroserie=htmlspecialchars(strip_tags($this->numeroserie));
		$this->codseg=base64_encode($this->codseg);
		$queryst->bindParam(":numeroserie", $this->numeroserie);
		$queryst->bindParam(":codseg", $this->codseg);
		try{
			$queryst->execute();
			if($queryst->rowCount() > 0){
				//existe y es correcto el codseg
				return true;
			}
			else{
				//no existe o el codseg no es correcto
				return false;
			}
		}catch(PDOException $e) { 
			return false; 
		}
	}

	function comprobar_usuario_ya_registrada($usuario){
		$query = "SELECT * FROM ".$this->tabla." camiseta INNER JOIN ".$this->tablaxusuario ." camisetaxusuario on camisetaxusuario.idcamiseta=camiseta.id WHERE camiseta.numeroserie=:numeroserie and camisetaxusuario.idusuario=:idusuario ";
		$queryst = $this->conexion->prepare($query);
		$usuario=htmlspecialchars(strip_tags($usuario));
		$this->numeroserie=htmlspecialchars(strip_tags($this->numeroserie));
		$queryst->bindParam(":numeroserie", $this->numeroserie);
		$queryst->bindParam(":idusuario", $usuario);
		try{
			$queryst->execute();
			if($queryst->rowCount() > 0){
				//existe una camiseta
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

	function es_camiseta_usuario($usuario){
		$query = "SELECT * FROM ". $this->tablaxusuario. " WHERE idcamiseta=:id and idusuario=:idusuario";
		$queryst = $this->conexion->prepare($query);
		$usuario=htmlspecialchars(strip_tags($usuario));
		$this->id=htmlspecialchars(strip_tags($this->id));
		$queryst->bindParam(":id", $this->id);
		$queryst->bindParam(":idusuario", $usuario);
		try{
			$queryst->execute();
			if($queryst->rowCount() > 0){
				//existe una camiseta
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

	function existe_camiseta(){
        // query to insert record
        $query = "SELECT camiseta.* FROM " . $this->tabla . "  
                  WHERE camiseta.id=:id";
		$queryst = $this->conexion->prepare($query);
		$this->id=htmlspecialchars(strip_tags($this->id));
        $queryst->bindParam(":id", $this->id);
        try{
			$queryst->execute();
			if($queryst->rowCount() > 0){
				//existe una camiseta
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
}