<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../config/database.php';
//utilidades del sistema
include_once '../utilidades/utils.php';
include_once '../utilidades/logging.php';
// codigos de respuesta
include_once '../modelo/codigos.php';
include_once '../modelo/configuracion.php';

if($_SERVER['REQUEST_METHOD']=="GET"){
	if(!isset($_GET['usuario']) || $_GET['usuario']==null || $_GET['usuario']==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene el parametro usuario en la URL';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud los parametros de configuracion le faltan parametros",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}

	$database = new Database();

	try{
		$db = $database->getConexion();
	}
	catch(Exception $e){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
		meter_error_log2($log);
		generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
		exit();
	}

	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Recuperando configuración de '.$_GET['usuario'];
	meter_debug_log2($log);
	$configuracion = new Configuracion();
	$configuracion->setConexion($db);

	$resultados = $configuracion->listar_configuracion($_GET['usuario']);
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Configuración de '.$_GET['usuario'].' '.$resultados;
	meter_debug_log2($log);
	generar_respuesta(true, $resultados,CODIGO_OK,ESTATUS_OK);
	exit();
}

if($_SERVER['REQUEST_METHOD']=="PUT"){
	$configuracion = new Configuracion();
	$inputJSON = file_get_contents('php://input');
	
	if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion de configuracion le faltan datos. No hay Input",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	$input= json_decode( $inputJSON );
	if(!isset($input) || $input==null || $input==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion de configuracion le faltan datos. El input no es un JSON",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	} 
	
	if(!isset($_GET['usuario']) || $_GET['usuario']==null || $_GET['usuario']==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	
	if(!isset($input->notificacionestodas) || $input->notificacionestodas==null  || $input->notificacionestodas==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el dato de notificaciones todas",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		if($input->notificacionestodas=="true"){
			$configuracion->setNotificacionestodas(true);
		}
		else{
			$configuracion->setNotificacionestodas(false);
		}
		
	}
	
	if(!isset($input->notificacionesecg) || $input->notificacionesecg==null  || $input->notificacionesecg==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el dato de notificaciones ecg",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		if($input->notificacionesecg=="true"){
			$configuracion->setNotificacionesecg(true);
		}
		else{
			$configuracion->setNotificacionesecg(false);
		}
		
	}
	
	if(!isset($input->notificacioneseda) || $input->notificacioneseda==null || $input->notificacioneseda==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el dato de notificaciones eda",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		if($input->notificacioneseda=="true"){
			$configuracion->setNotificacioneseda(true);
		}
		else{
			$configuracion->setNotificacioneseda(false);
		}
		
	}
	
	if(!isset($input->notificacionestemperatura) || $input->notificacionestemperatura==null || $input->notificacionestemperatura==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el dato de notificaciones temperatura",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		if($input->notificacionestemperatura=="true"){
			$configuracion->setNotificacionestemperatura(true);
		}
		else{
			$configuracion->setNotificacionestemperatura(false);
		}
		
	}
	
	if(!isset($input->notificacionesbateria) || $input->notificacionesbateria==null || $input->notificacionesbateria==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el dato de notificaciones bateria",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		if($input->notificacionesbateria=="true"){
			$configuracion->setNotificacionesbateria(true);
		}
		else{
			$configuracion->setNotificacionesbateria(false);
		}
		
	}
	
	if(!isset($input->notificacionescaida) || $input->notificacionescaida==null || $input->notificacionescaida==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el dato de notificaciones caida",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		if($input->notificacionescaida=="true"){
			$configuracion->setNotificacionescaida(true);
		}
		else{
			$configuracion->setNotificacionescaida(false);
		}
		
	}
	
	$database = new Database();
	
	try{
		$db = $database->getConexion();
	}
	catch(Exception $e){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
		meter_error_log2($log);
		generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
		exit();
	}
	
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Editar Configuracion '.$_GET['usuario'];
	meter_debug_log2($log);
	$configuracion->setConexion($db);
	$i = 0;
	try{
		if($configuracion->ver_si_existe($_GET['usuario'])){
			//si existe, entonces tenemos que llamar a actualizar
			if($configuracion->actualizar_configuracion($_GET['usuario'])){
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Configuracion Actualizada ';
				meter_debug_log2($log);
				generar_respuesta(true, "Actualizado",CODIGO_OK,ESTATUS_OK);
			}
			else{
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Error al actualizar la camiseta';
				meter_error_log2($log);
				generar_respuesta(false, "No se ha podido actualizar el registro de configuracion",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
				exit();		
			}
		}
		else{
			//tenemos qe llamar a crear
			//si existe, entonces tenemos que llamar a actualizar
			if($configuracion->crear_configuracion($_GET['usuario'])){
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Configuracion Actualizada ';
				meter_debug_log2($log);
				generar_respuesta(true, "Creado",CODIGO_OK,ESTATUS_OK);	
			}
			else{
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- No se ha podido actualizar la configuración';
				meter_error_log2($log);
				generar_respuesta(false, "No se ha podido crear el registro de configuracion",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
				exit();		
			}
		}
	}
	catch(Exception $e){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
		meter_error_log2($log);
		generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
		exit();
	}
	exit();
}
generar_respuesta(false, "Metodo no disponible",CODIGO_CONFLICTO,ESTATUS_CONFLICTO);