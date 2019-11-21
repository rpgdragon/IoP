<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../../config/database.php';
//utilidades del sistema
include_once '../../utilidades/utils.php';
// codigos de respuesta
include_once '../../modelo/codigos.php';
include_once '../../modelo/configuracion.php';


$configuracion = new Configuracion();
$inputJSON = file_get_contents('php://input');

if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	generar_respuesta(false, "La solicitud de actualizacion de configuracion le faltan datos. No hay Input",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	generar_respuesta(false, "La solicitud de actualizacion de configuracion le faltan datos. El input no es un JSON",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario==''){
    generar_respuesta(false, "La solicitud de actualizacion le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

if(!isset($input->notificacionestodas) || $input->notificacionestodas==null  || $input->notificacionestodas==''){
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
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}


$configuracion->setConexion($db);
$i = 0;
try{
	if($configuracion->ver_si_existe($input->usuario)){
		//si existe, entonces tenemos que llamar a actualizar
		if($configuracion->actualizar_configuracion($input->usuario)){
			generar_respuesta(true, "Actualizado",CODIGO_OK,ESTATUS_OK);
		}
		else{
			generar_respuesta(false, "No se ha podido actualizar el registro de configuracion",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
			exit();		
		}
	}
	else{
		//tenemos qe llamar a crear
		//si existe, entonces tenemos que llamar a actualizar
		if($configuracion->crear_configuracion($input->usuario)){
			generar_respuesta(true, "Creado",CODIGO_OK,ESTATUS_OK);	
		}
		else{
			generar_respuesta(false, "No se ha podido crear el registro de configuracion",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
			exit();		
		}
	}
}
catch(Exception $e){
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
