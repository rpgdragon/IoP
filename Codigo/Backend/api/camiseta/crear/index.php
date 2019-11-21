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




$camiseta = new Camiseta();
$inputJSON = file_get_contents('php://input');

if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	generar_respuesta(false, "La solicitud de actualizacion de camiseta le faltan datos. No hay Input",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	generar_respuesta(false, "La solicitud de actualizacion de camiseta le faltan datos. El input no es un JSON",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario==''){
    generar_respuesta(false, "La solicitud de actualizacion le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

if(!isset($input->nombre) || $input->nombre==null  || $input->nombre==''){
    generar_respuesta(false, "La solicitud de actualizacion le falta el nombre",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	$camiseta->setNombre($input->nombre);
}

if(!isset($input->parentesco) || $input->parentesco==null  || $input->parentesco==''){
    generar_respuesta(false, "La solicitud de actualizacion le falta el parentesco",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	$camiseta->setParentesco($input->parentesco);
}

if(!isset($input->numeroserie) || $input->numeroserie==null  || $input->numeroserie==''){
    generar_respuesta(false, "La solicitud de actualizacion le falta el numeroserie",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	$camiseta->setNumeroserie($input->numeroserie);
}

if(!isset($input->codseg) || $input->codseg==null  || $input->codseg==''){
    generar_respuesta(false, "La solicitud de actualizacion le falta el código de seguridad",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	$camiseta->setCodseg($input->codseg);
}

if(!isset($input->icono) || $input->icono==null  || $input->icono==''){
    generar_respuesta(false, "La solicitud de actualizacion le falta el icono",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	//al icono hay que agregarle la direccion por delante
	$url = obtenerDominioServidor();
	$url = $url.URL_PATH_ASSETS."/images/".$input->icono.".png";
	$camiseta->setSrc($url);
}

if(!isset($input->ecgminimo) || $input->ecgminimo==null  || $input->ecgminimo=='' || $input->ecgminimo=="-1"){
    $camiseta->setEcgminimo(null);
}
else{
	$camiseta->setEcgminimo($input->ecgminimo);
}

if(!isset($input->ecgmaximo) || $input->ecgmaximo==null  || $input->ecgmaximo=='' || $input->ecgmaximo=="-1"){
    $camiseta->setEcgmaximo(null);
}
else{
	$camiseta->setEcgmaximo($input->ecgmaximo);
}

if(!isset($input->edaminimo) || $input->edaminimo==null  || $input->edaminimo=='' || $input->edaminimo=="-1"){
    $camiseta->setEdaminimo(null);
}
else{
	$camiseta->setEdaminimo($input->edaminimo);
}

if(!isset($input->edamaximo) || $input->edamaximo==null  || $input->edamaximo=='' || $input->edamaximo=="-1"){
    $camiseta->setEdamaximo(null);
}
else{
	$camiseta->setEdamaximo($input->edamaximo);
}

if(!isset($input->temperaturaminimo) || $input->temperaturaminimo==null  || $input->temperaturaminimo=='' || $input->temperaturaminimo=="-1"){
    $camiseta->setTemperaturaminimo(null);
}
else{
	$camiseta->setTemperaturaminimo($input->temperaturaminimo);
}

if(!isset($input->temperaturamaximo) || $input->temperaturamaximo==null  || $input->temperaturamaximo=='' || $input->temperaturamaximo=="-1"){
    $camiseta->setTemperaturamaximo(null);
}
else{
	$camiseta->setTemperaturamaximo($input->temperaturamaximo);
}

if(!isset($input->notificacionesecg) || $input->notificacionesecg==null  || $input->notificacionesecg==''){
	$camiseta->setNotificacionesecg(null);
	
}
else{
	if($input->notificacionesecg=="true"){
		$camiseta->setNotificacionesecg(true);
	}
	else{
		$camiseta->setNotificacionesecg(false);
	}
}

if(!isset($input->notificacioneseda) || $input->notificacioneseda==null || $input->notificacioneseda==''){
	$camiseta->setNotificacioneseda(null);
}
else{
	if($input->notificacioneseda=="true"){
		$camiseta->setNotificacioneseda(true);
	}
	else{
		$camiseta->setNotificacioneseda(false);
	}
    
}

if(!isset($input->notificacionestemperatura) || $input->notificacionestemperatura==null || $input->notificacionestemperatura==''){
	$camiseta->setNotificacionestemperatura(true);
}
else{
	if($input->notificacionestemperatura=="true"){
		$camiseta->setNotificacionestemperatura(true);
	}
	else{
		$camiseta->setNotificacionestemperatura(false);
	}
    
}


if(!isset($input->notificacionescaida) || $input->notificacionescaida==null || $input->notificacionescaida==''){
	$camiseta->setNotificacionescaida(true);
}
else{
	if($input->notificacionescaida=="true"){
		$camiseta->setNotificacionescaida(true);
	}
	else{
		$camiseta->setNotificacionescaida(false);
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


$camiseta->setConexion($db);
$i = 0;
try{
	if($camiseta->validar_numero_serie_codigo_seguridad()){
		if($camiseta->comprobar_usuario_ya_registrada($input->usuario)){
			generar_respuesta(false, "Ya esta asociada la camiseta a este usuario",CODIGO_CONFLICTO,ESTATUS_CONFLICTO);
			exit();
		}
		else{
			//ok, es correcto, el serial existe y hay codigo seg asociado
			$insertado = $camiseta->registrar_camiseta($input->usuario);
			if($insertado){
				generar_respuesta(true, "Creado",CODIGO_CAMISETA_CREADO,ESTATUS_CREATED);
				exit();
			}
			else{
				generar_respuesta(false, "Error interno servidor",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
				exit();
			}
		}
	}
	else{
		//el numero de serie no existe o el cod seguridad no es valido
		generar_respuesta(false, "El numero de serie no existe o no es valido",CODIGO_NO_CUENTA,ESTATUS_NO_ENCONTRADO);
		exit();
	}
}
catch(Exception $e){
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
