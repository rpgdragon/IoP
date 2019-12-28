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
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de registro de cuenta le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de creación de usuario le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de registro de cuenta le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de creación de usuario le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario=='' || !isset($input->password) || $input->password==null || $input->password==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de registro de cuenta le faltan parametros';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de creación de usuario le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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

$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Registro cuenta '.$input->usuario;
meter_debug_log($log);
$usuario = new Usuario();
$usuario->setConexion($db);

if(!isset($input->esFacebook) || $input->esFacebook==null || $input->esFacebook==''){
	$input->esFacebook = 0;
}

$usuario->setUsuario($input->usuario);
//ciframos la contraseña
$usuario->setPassword(base64_encode($input->password));
$usuario->setEsFacebook($input->esFacebook);

if($usuario->comprobarSiExisteUsuario()){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- El usuario ya existe';
	meter_error_log($log);
	generar_respuesta(false, "El usuario ya existe",CODIGO_USUARIO_EXISTE,ESTATUS_CONFLICTO);
	exit();
}


if($usuario->registrar_usuario()){
	//seguimos, antes de devolver la respuesta hay que enviar un correo indicando que te has registrado
	$enviado = false;
	$intentos = 3;
	$tokengenerado = generar_token(128);
	$textocorreo = str_replace("%AQUIVATOKEN%",$tokengenerado,CUERPO_CORREO_REGISTRO);
	//usuarioxtoken
	do{
		$enviado = mail($input->usuario,ASUNTO_CORREO_REGISTRO,$textocorreo,CABECERA_CORREO);
		$intentos = $intentos - 1;
	} while($enviado==false && $intentos > 0);
	if($enviado){
		$usuario->deleteToken();
		$usuario->insertarToken($tokengenerado,0);
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Registrado correctamente '.$input->usuario;
		meter_debug_log($log);
		generar_respuesta(true,"Registrado correctamente",CODIGO_OK,ESTATUS_OK);
	}
	else{
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- No se ha podido enviar el email';
		meter_error_log($log);
		generar_respuesta(true, "No se ha podido enviar el email",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	}
}
else{
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- No se ha podido generar el usuario';
	meter_error_log($log);
	generar_respuesta(false, "No se ha podido generar el usuario",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
}
?>