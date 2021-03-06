<?php

session_start();

// obtenemos el pool de conexiones
include_once '../../config/database.php';

// obtenemos donde esta la clase Usuario
include_once '../../modelo/usuario.php';

//constantes
include_once '../../modelo/codigos.php';

include_once '../../utilidades/logging.php';

if(!isset($_POST['token']) || $_POST['token']==null || $_POST['token']==''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de nueva contrasena no tiene los parametros requeridos';
	meter_error_log($log);
    http_response_code(400);
    echo "Petición invalida, faltan parametros";
    exit();
}

if(!isset($_POST['password123']) || $_POST['password123']==null || $_POST['password123']==''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de nueva contrasena no tiene los parametros requeridos';
	meter_error_log($log);
    $_SESSION['mensaje']="Debe rellenar el password y confirmarla";
    header("Location:recuperarcuenta.php?token=".$_POST['token']);
    exit();
}

if($_POST['password123']!=$_POST['rpassword123']){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Las contrasenas no coinciden';
	meter_error_log($log);
    $_SESSION['mensaje']="Ambas contraseñas deben coincidir";
    header("Location:recuperarcuenta.php?token=".$_POST['token']);
    exit();
}

//comprobamos si se cumplen los requisitos
$mensaje = "";

//tener al menos 6 caracteres
if(strlen($_POST['password123'] < 6)){
    $mensaje.=" El password debe tener al menos 6 carácteres.";
}

//tener al menos 1 mayuscula
if (strtolower($_POST['password123']) == $_POST['password123']){
    $mensaje.=" Debe contener al menos una mayuscula.";
}

//tener al menos 1 minuscula
if (strtoupper($_POST['password123']) == $_POST['password123']){
    $mensaje.=" Debe contener al menos una minuscula.";
}

//tener al menos 1 numero
if(!preg_match(AL_MENOS_UN_NUMERO,$_POST['password123'])){
    $mensaje.=" Debe contener al menos un número. ";
}

//contiene un caracter especial
if(!preg_match(AL_MENOS_UN_ESPECIAL, $_POST['password123'])){
    $mensaje.=" Debe contener al menos un caracter especial.";
}

if($mensaje!=''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$mensaje;
	meter_error_log($log);
    $_SESSION['mensaje']=$mensaje;
    header("Location:recuperarcuenta.php?token=".$_POST['token']);
    exit();
}

//si llega aqui es que hay token y los datos del formulario son validos (pero no tiene por que ser valido)

//comprobamos si el token es valido
$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
	meter_error_log($log);
    http_response_code(500);
	exit();
}


$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Modificando contraseña '.$_POST['token'];
meter_debug_log($log);
$query = "SELECT idusuario FROM usuarioxtoken WHERE token='".$_POST['token']."' and confirmado=1 ";
$queryst = $db->prepare($query);
$queryst->execute();
if($queryst->rowCount() <= 0){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- No existe el token';
	meter_error_log($log);
	http_response_code(400);
	echo "No hay token";
    exit();
}

//si llega aqui entonces la peticion es valida y debemos cambiar las contraseñas
$usuario = new Usuario();
$usuario->setConexion($db);
 
//ciframos la contraseña
$usuario->setPassword(base64_encode($_POST['password123']));
$usuario->cambiarPassword($_POST['token']);
$usuario->deleteTokenFromToken($_POST['token'],1);
$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Contraseña cambiada '.$_POST['token'];
meter_debug_log($log);
http_response_code(200);
echo "Se ha cambiado exitosamente la contraseña";

?>