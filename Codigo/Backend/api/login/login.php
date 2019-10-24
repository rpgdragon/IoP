<?php
 
// obtenemos el pool de conexiones
include_once '../config/database.php';
// obtenemos donde esta la clase Usuario
include_once '../modelo/usuario.php';
// codigos de respuesta
include_once '../modelo/codigos.php';
//utilidades del sistema
include_once '../utilidades/utils.php';
 
 
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

$respuesta = null;
if(!isset($_POST['usuario']) || $_POST['usuario']==null || $_POST['usuario']=='' || !isset($_POST['password']) || $_POST['password']==null || $_POST['password']==''){
	generar_respuesta(false, "La solicitud de creación de login le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}	
 
$usuario->setUsuario($_POST['usuario']);
//ciframos la contraseña
$usuario->setPassword(base64_encode($_POST['password']));

//vamos a ver si podemos hacer login
try{
	$queryst = $usuario->login();
}
catch(Exception $e){
	generar_respuesta(true, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
if($queryst->rowCount() > 0){
	generar_respuesta(true, "Logado correctamente",CODIGO_OK,ESTATUS_OK);
}
else{
	generar_respuesta(false, "El usuario y/o contraseña no son válidos",CODIGO_ERROR_LOGIN,ESTATUS_FORBIDDEN);
}
?>