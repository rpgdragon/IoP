<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../config/database.php';
// obtenemos donde esta la clase Usuario
include_once '../modelo/usuario.php';
// codigos de respuesta
include_once '../modelo/codigos.php';
//utilidades del sistema
include_once '../utilidades/utils.php';
//constantes del correo
include_once '../utilidades/correoconstantes.php';
 
$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	generar_respuesta(false, "La solicitud de creación de login le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	generar_respuesta(false, "La solicitud de creación de login le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario=='' ){
	generar_respuesta(false, "La solicitud de olvido de datos le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
 
$usuario = new Usuario();
$usuario->setConexion($db);
 
$usuario->setUsuario($input->usuario);

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
		if(enviado){
			$usuario->deleteToken();
			$usuario->insertarToken($tokengenerado);
			generar_respuesta(true,"Mensaje enviado",CODIGO_OK,ESTATUS_OK);
		}
		else{
			generar_respuesta(true, "No se ha podido enviar el email",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
		}
	}
	else{
		//no existe, no es valido
		generar_respuesta(false,"No se ha encontrado al usuario",CODIGO_NO_CUENTA,ESTATUS_NO_ENCONTRADO);
	}
}
catch(Exception $e){
	generar_respuesta(true, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
?>