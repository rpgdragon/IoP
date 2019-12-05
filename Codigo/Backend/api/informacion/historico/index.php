<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../../config/database.php';
//utilidades del sistema
include_once '../../utilidades/utils.php';
// codigos de respuesta
include_once '../../modelo/codigos.php';
include_once '../../modelo/informacion.php';

$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	generar_respuesta(false, "La solicitud de busqueda datos historico le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	generar_respuesta(false, "La solicitud de busqueda datos historico le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->numeroserie) || $input->numeroserie==null || $input->numeroserie==''){
    generar_respuesta(false, "La solicitud del listado le faltan parametros numeroserie",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

$pidenactual = true;

if(!isset($input->fechade) || $input->fechade==null || $input->fechade==''){
    generar_respuesta(false, "La solicitud del listado le faltan parametros fechade ",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

if(!isset($input->fechahasta) || $input->fechahasta==null || $input->fechahasta==''){
    generar_respuesta(false, "La solicitud del listado le faltan parametros fechahasta",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
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
generar_respuesta(true, $resultados,CODIGO_OK,ESTATUS_OK);