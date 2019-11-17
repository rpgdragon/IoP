<?php
class Configuracion{
 
    private $conexion;
    private $tabla = "configuracion";
 
    private $notificacionestodas;
    private $notificacionesecg;
    private $notificacioneseda;
	private $notificacionestemperatura;
	private $notificacionesbateria;
	private $notificacionescaida;
	 
    public function __construct(){
    }
	
	function setConexion($conexion){
		$this->conexion = $conexion;
	}
	
	function getConexion(){
		return $this->conexion;
	}
	
	function setNotificacionestodas($notificacionestodas){
		$this->notificacionestodas = $notificacionestodas;
	}
	
	function getNotificacionestodas(){
		return $this->notificacionestodas;
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

    function listar_configuracion($usuario){
        // query to insert record
        $query = "SELECT * FROM " . $this->tabla . " WHERE ". $this->tabla .".usuario=:idusuario";
		$queryst = $this->conexion->prepare($query);
		$usuario=htmlspecialchars(strip_tags($usuario));
        $queryst->bindParam(":idusuario", $usuario);
        $queryst->execute();
        $results = $queryst->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        return $json;
	}
	
	function ver_si_existe($usuario){
		$query = "SELECT * FROM " . $this->tabla . " WHERE ". $this->tabla .".usuario=:idusuario";
		$queryst = $this->conexion->prepare($query);
		$usuario=htmlspecialchars(strip_tags($usuario));
        $queryst->bindParam(":idusuario", $usuario);
		$queryst->execute();
		if($queryst->rowCount() > 0){
            return true;
        }
        else{
            return false;
        }
	}

	function crear_configuracion($usuario){
		$query = "INSERT INTO " . $this->tabla . " SET usuario=:usuario, notificacionestodas=:notificacionestodas, notificacionesecg=:notificacionesecg, notificacioneseda=:notificacioneseda, notificacionestemperatura=:notificacionestemperatura, notificacionescaida=:notificacionescaida, notificacionesbateria=:notificacionesbateria";
        $queryst = $this->conexion->prepare($query);
        $usuario=htmlspecialchars(strip_tags($usuario));
    
        $queryst->bindParam(":usuario", $usuario);
		$queryst->bindParam(":notificacionesbateria", $this->notificacionesbateria);
		$queryst->bindParam(":notificacionescaida", $this->notificacionescaida);
		$queryst->bindParam(":notificacionesecg", $this->notificacionesecg);
		$queryst->bindParam(":notificacioneseda", $this->notificacioneseda);
		$queryst->bindParam(":notificacionestemperatura", $this->notificacionestemperatura);
		$queryst->bindParam(":notificacionestodas", $this->notificacionestodas);

		// execute query
		if($queryst->execute()){
			return true;
		}
		else{
			return false;
		}
	}

	function actualizar_configuracion($usuario){
		$query = "UPDATE " . $this->tabla . " SET notificacionestodas=:notificacionestodas, notificacionesecg=:notificacionesecg, notificacioneseda=:notificacioneseda, notificacionestemperatura=:notificacionestemperatura, notificacionescaida=:notificacionescaida, notificacionesbateria=:notificacionesbateria WHERE usuario=:usuario";
        $queryst = $this->conexion->prepare($query);
    
        $usuario=htmlspecialchars(strip_tags($usuario));
    
        $queryst->bindParam(":usuario", $usuario);
		$queryst->bindParam(":notificacionesbateria", $this->notificacionesbateria);
		$queryst->bindParam(":notificacionescaida", $this->notificacionescaida);
		$queryst->bindParam(":notificacionesecg", $this->notificacionesecg);
		$queryst->bindParam(":notificacioneseda", $this->notificacioneseda);
		$queryst->bindParam(":notificacionestemperatura", $this->notificacionestemperatura);
		$queryst->bindParam(":notificacionestodas", $this->notificacionestodas);
    
        // execute query
        if($queryst->execute()){
            return true;
        }
        else{
            return false;
        }
	}

}