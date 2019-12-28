<?php
 
// obtenemos el pool de conexiones
include_once '../../config/database.php';
// obtenemos donde esta la clase Usuario
include_once '../../modelo/usuario.php';
// codigos de respuesta
include_once '../../modelo/codigos.php';
//utilidades del sistema
include_once '../../utilidades/utils.php';

//correos constantes
include_once '../../utilidades/correoconstantes.php';
include_once '../../utilidades/logging.php';

$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de registro de cuenta token le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud insertar token le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de registro de cuenta token le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud insertar token le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario=='' || !isset($input->token) || $input->token==null || $input->token==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de registro de cuenta token le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud insertar token le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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
$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Registro cuenta token '.$input->usuario;
meter_debug_log($log);
if(!$usuario->comprobarSiExisteUsuario()){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- El usuario no existe';
	meter_error_log($log);
	generar_respuesta(false, "El usuario no existe",CODIGO_USUARIO_EXISTE,ESTATUS_CONFLICTO);
	exit();
}
$token = $input->token;
$usuario->insertar_actualizar_token($token);
$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Registrado correctamente '.$input->usuario;
meter_debug_log($log);
generar_respuesta(true,"Registrado correctamente",CODIGO_OK,ESTATUS_OK);

?>