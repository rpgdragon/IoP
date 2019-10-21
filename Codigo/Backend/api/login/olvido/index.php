<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../../config/database.php';
// obtenemos donde esta la clase Usuario
include_once '../../modelo/usuario.php';
// codigos de respuesta
include_once '../../modelo/codigos.php';
//utilidades del sistema
include_once '../../utilidades/utils.php';
//constantes del correo
include_once '../../utilidades/correoconstantes.php';
include_once '../../utilidades/logging.php';
 
$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de olvido le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de creación de login le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de olvido le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de creación de login le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario=='' ){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de olvido le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de olvido de datos le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
	meter_error_log($log);
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
 
$usuario = new Usuario();
$usuario->setConexion($db);
 
$usuario->setUsuario($input->usuario);
$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Solicitud de Olvido '.$input->usuario;
meter_debug_log($log);
//vamos a ver si podemos hacer login
try{
	if($usuario->comprobarSiExisteUsuario()){
		//si existe, se le debe de enviar un email para que recupere la contraseña
		$enviado = false;
		$intentos = 3;
		$tokengenerado = generar_token(128);
		$textocorreo = str_replace("%AQUIVATOKEN%",$tokengenerado,CUERPO_CORREO);
		//usuarioxtoken
		do{
			$enviado = mail($input->usuario,ASUNTO_CORREO,$textocorreo,CABECERA_CORREO);
			$intentos = $intentos - 1;
		} while($enviado==false && $intentos > 0);
		if($enviado){
			$usuario->deleteToken();
			$usuario->insertarToken($tokengenerado,1);
			$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Solicitud de Olvido Correcta '.$input->usuario;
			meter_debug_log($log);
			generar_respuesta(true,"Mensaje enviado",CODIGO_OK,ESTATUS_OK);
		}
		else{
			$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Error al enviar el email';
			meter_error_log($log);
			generar_respuesta(true, "No se ha podido enviar el email",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
		}
	}
	else{
		//no existe, no es valido
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- No se ha encontrado al usuario';
		meter_error_log($log);
		generar_respuesta(false,"No se ha encontrado al usuario",CODIGO_NO_CUENTA,ESTATUS_NO_ENCONTRADO);
	}
}
catch(Exception $e){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
	meter_error_log($log);
	generar_respuesta(true, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
?>