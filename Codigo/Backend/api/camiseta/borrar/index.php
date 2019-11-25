<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../../config/database.php';
//utilidades del sistema
include_once '../../utilidades/utils.php';
// codigos de respuesta
include_once '../../modelo/codigos.php';
include_once '../../modelo/camiseta.php';




$camiseta = new Camiseta();
$inputJSON = file_get_contents('php://input');

if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	generar_respuesta(false, "La solicitud de borrado de camiseta le faltan datos. No hay Input",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	generar_respuesta(false, "La solicitud de borrado de camiseta le faltan datos. El input no es un JSON",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario==''){
    generar_respuesta(false, "La solicitud de borrado le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

if(!isset($input->id) || $input->id==null  || $input->id==''){
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
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}


$camiseta->setConexion($db);
$i = 0;
try{
	if($camiseta->es_camiseta_usuario($input->usuario)){
		if($camiseta->delete_camiseta()){
			generar_respuesta(true, "Borrado",CODIGO_OK_CREADO,ESTATUS_OK);
			exit();
		}
		else{
			//ha habido algun problema en el borrado
			generar_respuesta(false, "Error interno servidor",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
			exit();
		}
	}
	else{
		//el numero de serie no existe o el cod seguridad no es valido
		generar_respuesta(false, "Esta camiseta no pertenece al usuario",CODIGO_ERROR_LOGIN,ESTATUS_FORBIDDEN);
		exit();
	}
}
catch(Exception $e){
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
