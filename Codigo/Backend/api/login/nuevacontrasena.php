<?php

// obtenemos el pool de conexiones
include_once '../config/database.php';

// obtenemos donde esta la clase Usuario
include_once '../modelo/usuario.php';

if(!isset($_POST['token']) || $_POST['token']==null || $_POST['token']==''){
    http_response_code(400);
    echo "Y el token?";
    exit();
}

if(!isset($_POST['password123']) || $_POST['password123']==null || $_POST['password123']==''){
    http_response_code(400);
    echo "No hay password definido";
    exit();
}

if($_POST['password123']!=$_POST['rpassword123']){
    http_response_code(400);
    echo "Las contraseñas deben de coincidir";
    exit();
}

//si llega aqui es que hay token (pero no tiene por que ser valido)

//comprobamos si el token es valido
$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
    http_response_code(500);
	exit();
}

$query = "SELECT idusuario FROM usuarioxtoken WHERE token='".$_GET['token']."' ";
$queryst = $db->prepare($query);
if(!$queryst->execute()){
    http_response_code(400);
    exit();
}

//si llega aqui entonces la peticion es valida y debemos cambiar las contraseñas
$usuario = new Usuario();
$usuario->setConexion($db);
 
//ciframos la contraseña
$usuario->setPassword(base64_encode($_POST['password123']));
$usuario->cambiarPassword($_POST['token']);
$usuario->deleteTokenFromToken($_POST['token']);
http_response_code(200);
echo "Se ha cambiado exitosamente la contraseña";

?>