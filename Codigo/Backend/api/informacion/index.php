<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../config/database.php';
//utilidades del sistema
include_once '../utilidades/utils.php';
// codigos de respuesta
include_once '../modelo/codigos.php';
include_once '../modelo/informacion.php';

if(!isset($_GET['numeroserie']) || $_GET['numeroserie']==null || $_GET['numeroserie']==''){
    generar_respuesta(false, "La solicitud del listado le faltan parametros",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

$pidenactual = true;

if(isset($_GET['desde']) && $_GET['desde']!=null && $_GET['desde']!=''){
    $pidenactual = false;
}

if(isset($_GET['hasta']) && $_GET['hasta']!=null && $_GET['hasta']!=''){
    $pidenactual = false;
}

$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}

$informacion = new Informacion();
$informacion->setConexion($db);
$informacion->setNumeroserie($_GET['numeroserie']);
$resultados = null;
if($pidenactual==true){
    $resultados = $informacion->obtener_datos_last_minute();
    $ultimas10temperaturas = $informacion->obtener_ultimas_temperaturas();
    if($resultados!=null && $resultados!="" && $resultados!="[]"){
        $resul = json_decode($resultados);
        $temps = json_decode($ultimas10temperaturas);
        $temperaturafinales = "";
        for($i = 0; $i < count($temps); $i = $i+1){
            if($i==count($temps)-1){
                $temperaturafinales=$temperaturafinales.$temps[$i]->temperatura;
            }
            else{
                $temperaturafinales=$temperaturafinales.$temps[$i]->temperatura.',';
            }
        }
        $resul[0]->temperatura = $temperaturafinales;
        $resultados = json_encode($resul);
    }
}
else{
    //A cambiar, se deben obtener los datos del tiempo solicitado
    $resultados = $informacion->obtener_datos_last_minute();
} 

generar_respuesta(true, $resultados,CODIGO_OK,ESTATUS_OK);