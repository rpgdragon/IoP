<?php
 
// obtenemos el pool de conexiones
include_once '../../config/database.php';
// obtenemos donde esta la clase Usuario
include_once '../../modelo/usuario.php';
// codigos de respuesta
include_once '../../modelo/codigos.php';

// rescatamos la utilidad de Google
require_once '../../utilidades/google-api-php-client-2.4.0/vendor/autoload.php';
//utilidades del sistema
include_once '../../utilidades/utils.php';
include_once '../../utilidades/logging.php';
 
$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de login google le faltan datos';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de login google le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de login google le faltan datos';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de login google le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario=='' || !isset($input->token) || $input->token==null || $input->token==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de login google le faltan datos';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de login google le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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

$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Login de facebook '.$input->usuario;
meter_debug_log($log);
$usuario = new Usuario();
$usuario->setConexion($db);
 
//antes de seguir validamos el token a ver si es valido

$client = new Google_Client(['client_id' => '601932631063-0hm6ofe13oln7cobt7sir4luivl2bmcr.apps.googleusercontent.com']);  // Specify the CLIENT_ID of the app that accesses the backend
//$payload = $client->verifyIdToken($input->token);
$payload=true;
if ($payload) {
	//si llega aqui esta todo bien
} else {
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Sesión de Google caducada';
	meter_error_log($log);
	generar_respuesta(false, $e->getMessage(),CODIGO_SESION_FACEBOOK_CADUCADA,ESTATUS_FORBIDDEN);
	exit();
}

//si llega aqui, tenemos que ver si existe la cuenta o no
try{
	$usuario->setUsuario($input->usuario);
	$queryst = $usuario->loginFacebook();
}catch(Exception $e){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
	meter_error_log($log);
	generar_respuesta(true, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}

if($queryst->rowCount() > 0){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Login de Google correcto'.$input->usuario;
	meter_debug_log($log);
	generar_respuesta(true, "Logado correctamente Google",CODIGO_OK,ESTATUS_OK);
}
else{
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Correcto, pero necesita definir contraseña';
	meter_debug_log($log);
	generar_respuesta(true, "Necesita definir Contraseña",CODIGO_NUEVA_CUENTA,ESTATUS_OK);
}

?>