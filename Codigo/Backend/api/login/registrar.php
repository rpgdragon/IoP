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
	generar_respuesta(false, "La solicitud de registro le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}	

if(!isset($_POST['esFacebook']) || $_POST['esFacebook']==null || $_POST['esFacebook']==''){
	$_POST['esFacebook'] = 0;
}

$usuario->setUsuario($_POST['usuario']);
//ciframos la contraseña
$usuario->setPassword(base64_encode($_POST['password']));
$usuario->setEsFacebook($_POST['esFacebook']);


if($usuario->registrar_usuario()){
	generar_respuesta(true, "Registrado correctamente",CODIGO_USUARIO_CREADO,ESTATUS_CREATED);
}
else{
	generar_respuesta(false, "El usuario ya existe",CODIGO_USUARIO_EXISTE,ESTATUS_CONFLICTO);
    
}
?>