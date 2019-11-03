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

if(!isset($_GET['usuario']) || $_GET['usuario']==null || $_GET['usuario']==''){
    generar_respuesta(false, "La solicitud del listado le faltan parametros",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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

$camiseta = new Camiseta();
$camiseta->setConexion($db);

$resultados = $camiseta->listar_camisetas($_GET['usuario']);
generar_respuesta(true, $resultados,CODIGO_OK,ESTATUS_OK);