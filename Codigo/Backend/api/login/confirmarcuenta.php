<?php

session_start();

// obtenemos el pool de conexiones
include_once '../config/database.php';

// obtenemos donde esta la clase Usuario
include_once '../modelo/usuario.php';

//constantes
include_once '../modelo/codigos.php';

if(!isset($_GET['token']) || $_GET['token']==null || $_GET['token']==''){
    http_response_code(400);
    echo "Petición invalida, faltan parametros";
    exit();
}

$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
    http_response_code(500);
	exit();
}

$query = "SELECT idusuario FROM usuarioxtoken WHERE token='".$_GET['token']."' and confirmado=0 ";
$queryst = $db->prepare($query);
$queryst->execute();
if($queryst->rowCount() <= 0){
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
http_response_code(200);
echo "La cuenta se ha confirmado";

?>