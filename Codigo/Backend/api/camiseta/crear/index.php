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
include_once '../../modelo/camiseta.php';




$camiseta = new Camiseta();
$inputJSON = file_get_contents('php://input');

if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de actualizacion de camiseta le faltan datos. No hay Input",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de actualizacion de camiseta le faltan datos. El input no es un JSON",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud de actualizacion le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

if(!isset($input->nombre) || $input->nombre==null  || $input->nombre==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud de actualizacion le falta el nombre",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	$camiseta->setNombre($input->nombre);
}

if(!isset($input->numeroserie) || $input->numeroserie==null  || $input->numeroserie==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud de actualizacion le falta el numeroserie",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	$camiseta->setNumeroserie($input->numeroserie);
}

if(!isset($input->codseg) || $input->codseg==null  || $input->codseg==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud de actualizacion le falta el código de seguridad",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	$camiseta->setCodseg($input->codseg);
}

if(!isset($input->icono) || $input->icono==null  || $input->icono==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud de actualizacion le falta el icono",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
else{
	//al icono hay que agregarle la direccion por delante
	$url = obtenerDominioServidor();
	$url = $url.URL_PATH_ASSETS."/images/".$input->icono.".png";
	$camiseta->setSrc($url);
}

if(!isset($input->sexo) || $input->sexo==null  || $input->sexo==''){
    $camiseta->setSexo(null);
}
else{
	$camiseta->setSexo($input->sexo);
}

if(!isset($input->fechanacimiento) || $input->fechanacimiento==null  || $input->fechanacimiento==''){
    $camiseta->setFechanacimiento(null);
}
else{
	$camiseta->setFechanacimiento($input->fechanacimiento);
}

if(!isset($input->telefono) || $input->telefono==null  || $input->telefono==''){
    $camiseta->setTelefono(null);
}
else{
	$camiseta->setTelefono($input->telefono);
}

if(!isset($input->telefonocontacto) || $input->telefonocontacto==null  || $input->telefonocontacto==''){
    $camiseta->setTelefonocontacto(null);
}
else{
	$camiseta->setTelefonocontacto($input->telefonocontacto);
}

if(!isset($input->notas) || $input->notas==null  || $input->notas==''){
    $camiseta->setNotas(null);
}
else{
	$camiseta->setNotas($input->notas);
}

if(!isset($input->calle) || $input->calle==null  || $input->calle==''){
    $camiseta->setCalle(null);
}
else{
	$camiseta->setCalle($input->calle);
}

if(!isset($input->numero) || $input->numero==null  || $input->numero==''){
    $camiseta->setNumero(null);
}
else{
	$camiseta->setNumero($input->numero);
}

if(!isset($input->localidad) || $input->localidad==null  || $input->localidad==''){
    $camiseta->setLocalidad(null);
}
else{
	$camiseta->setLocalidad($input->localidad);
}

if(!isset($input->provincia) || $input->provincia==null  || $input->provincia==''){
    $camiseta->setProvincia(null);
}
else{
	$camiseta->setProvincia($input->provincia);
}

if(!isset($input->latitud) || $input->latitud==null  || $input->latitud==''){
    $camiseta->setLatitud(null);
}
else{
	$camiseta->setLatitud($input->latitud);
}

if(!isset($input->longitud) || $input->longitud==null  || $input->longitud==''){
    $camiseta->setLongitud(null);
}
else{
	$camiseta->setLongitud($input->longitud);
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

$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Crear camisetas datos para'.$input->usuario;
meter_debug_log($log);
$camiseta->setConexion($db);
$i = 0;
try{
	if($camiseta->validar_numero_serie_codigo_seguridad()){
		if($camiseta->comprobar_usuario_ya_registrada($input->usuario)){
			$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Ya esta asociada la camiseta a este usuario';
			meter_error_log($log);
			generar_respuesta(false, "Ya esta asociada la camiseta a este usuario",CODIGO_CONFLICTO,ESTATUS_CONFLICTO);
			exit();
		}
		else{
			//ok, es correcto, el serial existe y hay codigo seg asociado
			$insertado = $camiseta->registrar_camiseta($input->usuario);
			if($insertado){
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Camiseta Creada ';
				meter_debug_log($log);
				generar_respuesta(true, "Creado",CODIGO_CAMISETA_CREADO,ESTATUS_CREATED);
				exit();
			}
			else{
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Error al crear la camiseta';
				meter_error_log($log);
				generar_respuesta(false, "Error interno servidor",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
				exit();
			}
		}
	}
	else{
		//el numero de serie no existe o el cod seguridad no es valido
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- El número de serie no existe o no es valido';
		meter_error_log($log);
		generar_respuesta(false, "El numero de serie no existe o no es valido",CODIGO_NO_CUENTA,ESTATUS_NO_ENCONTRADO);
		exit();
	}
}
catch(Exception $e){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
	meter_error_log($log);
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
