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
include_once '../modelo/camiseta.php';



if($_SERVER['REQUEST_METHOD']=="GET"){
	if(!isset($_GET['usuario']) || $_GET['usuario']==null || $_GET['usuario']==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene el parametro usuario en la URL';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud del listado le faltan parametros",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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

	$camiseta = new Camiseta();
	$camiseta->setConexion($db);
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Recuperando camisetas de '.$_GET['usuario'];
	meter_debug_log2($log);
	$resultados = $camiseta->listar_camisetas($_GET['usuario']);
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Camisetas de '.$_GET['usuario'].' '.$resultados;
	meter_debug_log2($log);
	generar_respuesta(true, $resultados,CODIGO_OK,ESTATUS_OK);
	exit();
}

if($_SERVER['REQUEST_METHOD']=="POST"){
	$camiseta = new Camiseta();
	$inputJSON = file_get_contents('php://input');

	if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion de camiseta le faltan datos. No hay Input",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	$input= json_decode( $inputJSON );
	if(!isset($input) || $input==null || $input==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion de camiseta le faltan datos. El input no es un JSON",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	} 

	if(!isset($_GET['usuario']) || $_GET['usuario']==null || $_GET['usuario']==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}

	if(!isset($input->nombre) || $input->nombre==null  || $input->nombre==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el nombre",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		$camiseta->setNombre($input->nombre);
	}

	if(!isset($input->numeroserie) || $input->numeroserie==null  || $input->numeroserie==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el numeroserie",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		$camiseta->setNumeroserie($input->numeroserie);
	}

	if(!isset($input->codseg) || $input->codseg==null  || $input->codseg==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el código de seguridad",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		$camiseta->setCodseg($input->codseg);
	}

	if(!isset($input->icono) || $input->icono==null  || $input->icono==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para crear la camiseta';
		meter_error_log2($log);
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
		meter_error_log2($log);
		generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
		exit();
	}

	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Crear camisetas datos para'.$_GET['usuario'];
	meter_debug_log2($log);
	$camiseta->setConexion($db);
	$i = 0;
	try{
		if($camiseta->validar_numero_serie_codigo_seguridad()){
			if($camiseta->comprobar_usuario_ya_registrada($_GET['usuario'])){
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Ya esta asociada la camiseta a este usuario';
				meter_error_log2($log);
				generar_respuesta(false, "Ya esta asociada la camiseta a este usuario",CODIGO_CONFLICTO,ESTATUS_CONFLICTO);
				exit();
			}
			else{
				//ok, es correcto, el serial existe y hay codigo seg asociado
				$insertado = $camiseta->registrar_camiseta($_GET['usuario']);
				if($insertado){
					$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Camiseta Creada ';
					meter_debug_log2($log);
					generar_respuesta(true, "Creado",CODIGO_CAMISETA_CREADO,ESTATUS_CREATED);
					exit();
				}
				else{
					$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Error al crear la camiseta';
					meter_error_log2($log);
					generar_respuesta(false, "Error interno servidor",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
					exit();
				}
			}
		}
		else{
			//el numero de serie no existe o el cod seguridad no es valido
			$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- El número de serie no existe o no es valido';
			meter_error_log2($log);
			generar_respuesta(false, "El numero de serie no existe o no es valido",CODIGO_NO_CUENTA,ESTATUS_NO_ENCONTRADO);
			exit();
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

if($_SERVER['REQUEST_METHOD']=="PUT"){
	$camiseta = new Camiseta();
	$inputJSON = file_get_contents('php://input');

	if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion de camiseta le faltan datos. No hay Input",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	$input= json_decode( $inputJSON );
	if(!isset($input) || $input==null || $input==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion de camiseta le faltan datos. El input no es un JSON",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	} 

	if(!isset($_GET['usuario']) || $_GET['usuario']==null || $_GET['usuario']==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}

	if(!isset($_GET['id']) || $_GET['id']==null  || $_GET['id']==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el identificador de la camiseta",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		$camiseta->setId($_GET['id']);
	}

	if(!isset($input->nombre) || $input->nombre==null  || $input->nombre==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de actualizacion le falta el nombre",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		$camiseta->setNombre($input->nombre);
	}

	if(!isset($input->icono) || $input->icono==null  || $input->icono==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada no tiene los parametros para editar la camiseta';
		meter_error_log2($log);
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

	if(!isset($input->provincia) || $input->provincia==null  || $input->provincia==''){
		$camiseta->setProvincia(null);
	}
	else{
		$camiseta->setProvincia($input->provincia);
	}

	if(!isset($input->localidad) || $input->localidad==null  || $input->localidad==''){
		$camiseta->setLocalidad(null);
	}
	else{
		$camiseta->setLocalidad($input->localidad);
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
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
		meter_error_log2($log);
		generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
		exit();
	}

	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Editar camisetas datos '.$_GET['id'];
	meter_debug_log2($log);
	$camiseta->setConexion($db);
	$i = 0;
	try{
		if($camiseta->es_camiseta_usuario($_GET['usuario'])){
			if($camiseta->actualizar_camiseta()){
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Camiseta Actualizada ';
				meter_debug_log2($log);
				generar_respuesta(true, "Actualizado",CODIGO_OK_CREADO,ESTATUS_OK);
				exit();
			}
			else{
				//ha habido algun problema en el borrado
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Error al actualizar la camiseta';
				meter_error_log2($log);
				generar_respuesta(false, "Error interno servidor",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
				exit();
			}
		}
		else{
			//el usuario no esta asociado a la camiseta
			if($camiseta->existe_camiseta()){
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Esta camiseta no pertenece al usuario';
				meter_error_log2($log);
				generar_respuesta(false, "Esta camiseta no pertenece al usuario",CODIGO_ERROR_LOGIN,ESTATUS_FORBIDDEN);
				exit();
			}
			else{
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La camiseta no existe';
				meter_error_log2($log);
				generar_respuesta(false, "Esta camiseta no existe",CODIGO_NO_CUENTA,ESTATUS_NO_ENCONTRADO);
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


if($_SERVER['REQUEST_METHOD']=="DELETE"){
	$camiseta = new Camiseta();

	if(!isset($_GET['usuario']) || $_GET['usuario']==null || $_GET['usuario']==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de borrado de camiseta no tiene los parametros requeridos';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de borrado le falta el usuario",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}

	if(!isset($_GET['id']) || $_GET['id']==null  || $_GET['id']==''){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de borrado de camiseta no tiene los parametros requeridos';
		meter_error_log2($log);
		generar_respuesta(false, "La solicitud de borrado le falta el id",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
		exit();
	}
	else{
		$camiseta->setId($_GET['id']);
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

	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Borrado camisetas datos '.$_GET['usuario'];
	meter_debug_log2($log);
	$camiseta->setConexion($db);
	$i = 0;
	try{
		if($camiseta->es_camiseta_usuario($_GET['usuario'])){
			if($camiseta->delete_camiseta()){
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Camiseta borrada exitosamente';
				meter_debug_log2($log);
				generar_respuesta(true, "Borrado",CODIGO_OK_CREADO,ESTATUS_OK);
				exit();
			}
			else{
				//ha habido algun problema en el borrado
				$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- No se ha podido borrar la camiseta';
				meter_error_log2($log);
				generar_respuesta(false, "Error interno servidor",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
				exit();
			}
		}
		else{
			//el numero de serie no existe o el cod seguridad no es valido
			$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Esta camiseta no pertenece al usuario';
			meter_error_log2($log);
			generar_respuesta(false, "Esta camiseta no pertenece al usuario",CODIGO_ERROR_LOGIN,ESTATUS_FORBIDDEN);
			exit();
		}
	}
	catch(Exception $e){
		$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- '.$e->getMessage();
		meter_error_log2($log);
		generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
		exit();
	}
}

generar_respuesta(false, "Metodo no disponible",CODIGO_CONFLICTO,ESTATUS_CONFLICTO);
