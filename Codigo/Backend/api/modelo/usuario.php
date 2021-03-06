<?php
class Usuario{
 
    private $conexion;
    private $tabla = "usuarios";
    private $tablatoken = "usuarioxtoken";
 
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

    function deleteToken(){
        $query = "DELETE FROM " . $this->tablatoken . " WHERE idusuario=:usuario";
        $queryst = $this->conexion->prepare($query);
        $this->usuario=htmlspecialchars(strip_tags($this->usuario));
        $queryst->bindParam(":usuario", $this->usuario);
        $queryst->execute();
    }

    function checkTokenExists(){
        // select all query
        $query = "SELECT 1 FROM " . $this->tablatoken . " 
                WHERE
                   idusuario=:usuario and token=:token";

        $queryst = $this->conexion->prepare($query);
		$this->usuario=htmlspecialchars(strip_tags($this->usuario));
        $queryst->bindParam(":usuario", $this->usuario);
        $queryst->bindParam(":token", $token);
        $queryst->execute();
        if($queryst->rowCount() > 0){
            return true;
        }
        else{
            return false;
        }
    }

    function cambiarPassword($token){
        $query = "UPDATE " . $this->tabla . " SET password=:password WHERE usuario=(SELECT idusuario FROM ".$this->tablatoken." WHERE token=:token)";
        $queryst = $this->conexion->prepare($query);
        $this->password=htmlspecialchars(strip_tags($this->password));
        $queryst->bindParam(":password", $this->password);
        $queryst->bindParam(":token", $token);
        $queryst->execute();
    }

    function deleteTokenFromToken($token,$confirmado){
        $query = "DELETE FROM " . $this->tablatoken . " WHERE token=:token and confirmado=:confirmado";
        $queryst = $this->conexion->prepare($query);
        $queryst->bindParam(":token", $token);
        $queryst->bindParam(":confirmado",$confirmado);
        $queryst->execute();        
    }

    function insertarToken($token,$confirmado){
        $query = "INSERT INTO " . $this->tablatoken . " SET idusuario=:usuario, token=:token, confirmado=:confirmado, horacreacion=now()";
        $queryst = $this->conexion->prepare($query);
    
        $this->usuario=htmlspecialchars(strip_tags($this->usuario));
    
        $queryst->bindParam(":usuario", $this->usuario);
        $queryst->bindParam(":token", $token);
        $queryst->bindParam(":confirmado",$confirmado);
    
        // execute query
        if($queryst->execute()){
            return true;
        }
        else{
            return false;
        }
    }

    function update($values){
        $query = "UPDATE ".$this->tabla." SET ".$values." WHERE usuario=:usuario";
        $queryst = $this->conexion->prepare($query);
        $queryst->bindParam(":usuario",$this->usuario);
        $queryst->execute();
    }

    function insertar_actualizar_token($token){
        $query = "INSERT INTO usuarioxtokennotificacion (idusuario, token) VALUES(:usuario,:token1) ON DUPLICATE KEY UPDATE token=:token2";
        $queryst = $this->conexion->prepare($query);
        $queryst->bindParam(":usuario",$this->usuario);
        $queryst->bindParam(":token1",$token);
        $queryst->bindParam(":token2",$token);
        $queryst->execute();
    }
}