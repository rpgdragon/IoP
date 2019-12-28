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
include_once '../../modelo/informacion.php';

$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de constantes historicas no tiene los parametros requeridos';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de busqueda datos historico le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de constantes historicas no tiene los parametros requeridos';
	meter_error_log($log);
	generar_respuesta(false, "La solicitud de busqueda datos historico le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->numeroserie) || $input->numeroserie==null || $input->numeroserie==''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de constantes historicas no tiene los parametros requeridos';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud del listado le faltan parametros numeroserie",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

$pidenactual = true;

if(!isset($input->fechade) || $input->fechade==null || $input->fechade==''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de constantes historicas no tiene los parametros requeridos';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud del listado le faltan parametros fechade ",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

if(!isset($input->fechahasta) || $input->fechahasta==null || $input->fechahasta==''){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada de constantes historicas no tiene los parametros requeridos';
	meter_error_log($log);
    generar_respuesta(false, "La solicitud del listado le faltan parametros fechahasta",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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

$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Petición datos historicos camiseta '.$input->numeroserie;
meter_debug_log($log);
$informacion = new Informacion();
$informacion->setConexion($db);
$informacion->setNumeroserie($input->numeroserie);
$resultados = null;
    $resultados = $informacion->obtener_fecha_historico($input->fechade,$input->fechahasta);
    if($resultados!=null && $resultados!="" && $resultados!="[]"){
        $resul = json_decode($resultados);
        $temperaturafinales = "";
        for($i = 1; $i < count($resul); $i = $i+1){
            $resul[0]->ecg=$resul[0]->ecg.",".$resul[$i]->ecg;
            $resul[0]->eda=$resul[0]->eda.",".$resul[$i]->eda;
            $resul[0]->temperatura=$resul[0]->temperatura.",".$resul[$i]->temperatura;
        }
        //y ahora tenemos que quitar todos los elementos menos el primero
        while(count($resul)>1){
            array_pop($resul);
        }
        $resultados = json_encode($resul);
    }
$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Constantes de '.$input->numeroserie.' '.$resultados;
meter_debug_log($log);
generar_respuesta(true, $resultados,CODIGO_OK,ESTATUS_OK);