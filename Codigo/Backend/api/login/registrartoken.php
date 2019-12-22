<?php
 
// obtenemos el pool de conexiones
include_once '../config/database.php';
// obtenemos donde esta la clase Usuario
include_once '../modelo/usuario.php';
// codigos de respuesta
include_once '../modelo/codigos.php';
//utilidades del sistema
include_once '../utilidades/utils.php';

//correos constantes
include_once '../utilidades/correoconstantes.php';

$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	generar_respuesta(false, "La solicitud insertar token le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	generar_respuesta(false, "La solicitud insertar token le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario=='' || !isset($input->token) || $input->token==null || $input->token==''){
	generar_respuesta(false, "La solicitud insertar token le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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

if(!$usuario->comprobarSiExisteUsuario()){
	generar_respuesta(false, "El usuario no existe",CODIGO_USUARIO_EXISTE,ESTATUS_CONFLICTO);
	exit();
}
$token = $input->token;
$usuario->insertar_actualizar_token($token);
generar_respuesta(true,"Registrado correctamente",CODIGO_OK,ESTATUS_OK);

?>