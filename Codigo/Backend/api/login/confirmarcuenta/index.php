<?php

session_start();

// obtenemos el pool de conexiones
include_once '../../config/database.php';

// obtenemos donde esta la clase Usuario
include_once '../../modelo/usuario.php';

//constantes
include_once '../../modelo/codigos.php';

include_once '../../utilidades/logging.php';

if(!isset($_GET['token']) || $_GET['token']==null || $_GET['token']==''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene el parametro token en la URL';
	meter_error_log($log);
    http_response_code(400);
    echo "Petición invalida, faltan parametros";
    exit();
}

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

$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Confirmando cuenta de token '.$_GET['token'];
meter_debug_log($log);
$query = "SELECT idusuario FROM usuarioxtoken WHERE token='".$_GET['token']."' and confirmado=0 ";
$queryst = $db->prepare($query);
$queryst->execute();
if($queryst->rowCount() <= 0){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- No existe el token';
	meter_error_log($log);
	http_response_code(400);
	echo "No hay token";
    exit();
}

$row = $queryst->fetch(PDO::FETCH_ASSOC);


//si llega aqui entonces la peticion es valida y debemos cambiar las contraseñas
$usuario = new Usuario();
$usuario->setConexion($db);
$usuario->setUsuario($row['idusuario']);

$usuario->update('confirmado=1');
$usuario->deleteTokenFromToken($_GET['token'],0);
$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Cuenta confirmada '.$_GET['token'];
meter_debug_log($log);
http_response_code(200);
echo "La cuenta se ha confirmado";

?>