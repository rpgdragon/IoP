<?php
class Usuario{
 
    private $conexion;
    private $tabla = "usuarios";
 
    private $usuario;
    private $password;
	private $esFacebook;
 
    public function __construct(){
    }
	
	function setConexion($conexion){
		$this->conexion = $conexion;
	}
	
	function getConexion(){
		return $this->conexion;
	}
	
	function setUsuario($usuario){
		$this->usuario = $usuario;
	}
	
	function getUsuario(){
		return $this->usuario;
	}

	function setPassword($password){
		$this->password = $password;
	}
	
	function getPassword($password){
		return $this->password;
	}
	
	function setEsFacebook($esFacebook){
		$this->esFacebook= $esFacebook;
	}
	
	function getEsFacebook($esFacebook){
		return $this->esFacebook;
	}
	
    function registrar_usuario(){
        if($this->comprobarSiExisteUsuario()){
			//ya existe el usuario
            return false;
        }
        // query to insert record
        $query = "INSERT INTO
                    " . $this->tabla . "
                SET
                    usuario=:usuario, password=:password, esFacebook=:esFacebook";
    
        $queryst = $this->conexion->prepare($query);
    
        $this->usuario=htmlspecialchars(strip_tags($this->usuario));
        $this->password=htmlspecialchars(strip_tags($this->password));
        $this->esFacebook=htmlspecialchars(strip_tags($this->esFacebook));
    
        $queryst->bindParam(":usuario", $this->usuario);
        $queryst->bindParam(":password", $this->password);
        $queryst->bindParam(":esFacebook", $this->esFacebook);
    
        // execute query
        if($queryst->execute()){
            return true;
        }
		else{
			return false;
		}  
    }

	
    function loginFacebook(){
        // select all query
        $query = "SELECT
                    'usuario', 'password', 'esFacebook'
                FROM
                    " . $this->tabla . " 
                WHERE
                    usuario=:usuario";

        $queryst = $this->conexion->prepare($query);
		$this->usuario=htmlspecialchars(strip_tags($this->usuario));
		$queryst->bindParam(":usuario", $this->usuario);
        $queryst->execute();
        return $queryst;
    }
	
	function login(){
        // select all query
        $query = "SELECT
                    'usuario', 'password', 'esFacebook'
                FROM
                    " . $this->tabla . " 
                WHERE
                    usuario=:usuario and password=:password";

        $queryst = $this->conexion->prepare($query);
		$this->usuario=htmlspecialchars(strip_tags($this->usuario));
		$this->password=htmlspecialchars(strip_tags($this->password));
		$queryst->bindParam(":usuario", $this->usuario);
		$queryst->bindParam(":password", $this->password);
		try{
			$queryst->execute();
		}
		catch(Exception $e){
			throw new Exception($e->getMessage());
			exit();
		}
        return $queryst;
    }
	
    function comprobarSiExisteUsuario(){
        $queryst = $this->loginFacebook();
        if($queryst->rowCount() > 0){
            return true;
        }
        else{
            return false;
        }
    }
}