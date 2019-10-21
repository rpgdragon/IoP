<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../../config/database.php';
//utilidades del sistema
include_once '../../utilidades/utils.php';
include_once '../../utilidades/logging.php';
// codigos de respuesta
include_once '../../modelo/codigos.php';
include_once '../../modelo/camiseta.php';




$camiseta = new Camiseta();
$inputJSON = file_get_contents('php://input');

if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de borrado de camiseta no tiene los parametros requeridos';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de borrado de camiseta le faltan datos. No hay Input",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de borrado de camiseta no tiene los parametros requeridos';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de borrado de camiseta le faltan datos. El input no es un JSON",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de borrado de camiseta no tiene los parametros requeridos';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud de borrado le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

if(!isset($input->id) || $input->id==null  || $input->id==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de borrado de camiseta no tiene los parametros requeridos';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud de borrado le falta el id",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	$camiseta->setId($input->id);
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

$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Borrado camisetas datos '.$input->usuario;
meter_debug_log($log);
$camiseta->setConexion($db);
$i = 0;
try{
	if($camiseta->es_camiseta_usuario($input->usuario)){
		if($camiseta->delete_camiseta()){
			$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Camiseta borrada exitosamente';
			meter_debug_log($log);
			generar_respuesta(true, "Borrado",CODIGO_OK_CREADO,ESTATUS_OK);
			exit();
		}
		else{
			//ha habido algun problema en el borrado
			$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- No se ha podido borrar la camiseta';
			meter_error_log($log);
			generar_respuesta(false, "Error interno servidor",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
			exit();
		}
	}
	else{
		//el numero de serie no existe o el cod seguridad no es valido
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Esta camiseta no pertenece al usuario';
		meter_error_log($log);
		generar_respuesta(false, "Esta camiseta no pertenece al usuario",CODIGO_ERROR_LOGIN,ESTATUS_FORBIDDEN);
		exit();
	}
}
catch(Exception $e){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
	meter_error_log($log);
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
