<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../../config/database.php';
//utilidades del sistema
include_once '../../utilidades/utils.php';
include_once '../../utilidades/logging.php';
// codigos de respuesta
include_once '../../modelo/codigos.php';
include_once '../../modelo/configuracion.php';

if(!isset($_GET['usuario']) || $_GET['usuario']==null || $_GET['usuario']==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene el parametro usuario en la URL';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud los parametros de configuracion le faltan parametros",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
	meter_error_log($log);
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}

$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Recuperando configuración de '.$_GET['usuario'];
meter_debug_log($log);
$configuracion = new Configuracion();
$configuracion->setConexion($db);

$resultados = $configuracion->listar_configuracion($_GET['usuario']);
$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Configuración de '.$_GET['usuario'].' '.$resultados;
meter_debug_log($log);
generar_respuesta(true, $resultados,CODIGO_OK,ESTATUS_OK);