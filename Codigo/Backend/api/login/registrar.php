<?php
 
// obtenemos el pool de conexiones
include_once '../config/database.php';
// obtenemos donde esta la clase Usuario
include_once '../modelo/usuario.php';
// codigos de respuesta
include_once '../modelo/codigos.php';
//utilidades del sistema
include_once '../utilidades/utils.php';
 
$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	generar_respuesta(false, "La solicitud de creación de usuario le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	generar_respuesta(false, "La solicitud de creación de usuario le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario=='' || !isset($input->password) || $input->password==null || $input->password==''){
	generar_respuesta(false, "La solicitud de creación de usuario le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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

if(!isset($input->esFacebook) || $input->esFacebook==null || $input->esFacebook==''){
	$input->esFacebook = 0;
}

$usuario->setUsuario($input->usuario);
//ciframos la contraseña
$usuario->setPassword(base64_encode($input->password));
$usuario->setEsFacebook($inpput->esFacebook);


if($usuario->registrar_usuario()){
	generar_respuesta(true, "Registrado correctamente",CODIGO_USUARIO_CREADO,ESTATUS_CREATED);
}
else{
	generar_respuesta(false, "El usuario ya existe",CODIGO_USUARIO_EXISTE,ESTATUS_CONFLICTO);
    
}
?>