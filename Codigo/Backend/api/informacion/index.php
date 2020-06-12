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
include_once '../modelo/producto.php';
include_once '../modelo/camiseta.php';
include_once '../modelo/informacion.php';
include_once '../utilidades/notificaciones.php';

if(!isset($_GET['ns']) || $_GET['ns']==NULL || $_GET['ns']==""){
    http_response_code(CODIGO_FALTAN_PARAMETROS);
    exit();
}

if(!isset($_GET['tipo']) || $_GET['tipo']==NULL || $_GET['tipo']==""){
    http_response_code(CODIGO_FALTAN_PARAMETROS);
    exit();
}

if(!isset($_GET['valor']) || $_GET['valor']==NULL || $_GET['valor']==""){
    http_response_code(CODIGO_FALTAN_PARAMETROS);
    exit();
}

if(!isset($_GET['valor2']) || $_GET['valor2']==NULL || $_GET['valor2']==""){
    http_response_code(CODIGO_FALTAN_PARAMETROS);
    exit();
}

if(!isset($_GET['check']) || $_GET['check']==NULL || $_GET['check']==""){
    http_response_code(CODIGO_FALTAN_PARAMETROS);
    exit();
}

if($_GET['tipo']=="registrar"){
$clases = $_GET['valor2'];
if(strlen($clases)!=4 || !is_numeric($clases[0]) || !is_numeric($clases[1]) || !is_numeric($clases[2]) || !is_numeric($clases[3])){
    http_response_code(CODIGO_FALTAN_PARAMETROS);
    exit();
}
}

$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
    //enviamos un email informando del error al correo personal
    mail("jmcastellano@jmcastellano.eu","Error en generación de datos","Se ha producido un error en el generado de datos. El error es ".$e->getMessage());
	exit();
}

//si llega aqui es que estan todos los parametros bien definidos

$_GET['ns'] = base64_decode($_GET['ns']);

if($_GET['tipo']=="registrar"){
    //es el proceso de registrar la camiseta
    //el proceso de la camiseta se hace a dos partes
    //comprobar si existe la camiseta, sino existe se inserta
    //si existe, se actualiza el codigoseguridad
    $p = new Producto();
    $p->setConexion($db);
    $p->setNumeroserie($_GET['ns']);
    $p->setCodseg(base64_encode($_GET['valor']));
    //ahora hay que desglosar los campos esECG esEDA, etc
    //el primero indica el ECG
    //el segunda indica el EDA
    //el tercero indica la temperatura
    //el cuarto es la caida
    //la primera camiseta tendra el 0011
    //la segunda camiseta tendra el 1100
    $p->setEsECG($clases[0]);
    $p->setEsEDA($clases[1]);
    $p->setEsTemperatura($clases[2]);
    $p->setEsCaida($clases[3]);
    if($p->encontrar_producto()){
        //entonces tenemos que actualizar
        if($p->actualizar_producto()){
            http_response_code(CODIGO_OK);
            exit();
        }
        else{
            http_response_code(CODIGO_ERROR);
            exit(); 
        }
    }
    else{
        //hay que insertarlo
        if($p->registrar_producto()){
            http_response_code(CODIGO_OK);
            exit();
        }
        else{
            http_response_code(CODIGO_ERROR);
            exit();
        }
    }
}

    //la fecha esta definida
    //YYYY-MM-DD HH:MM:SS
$fecha = $_GET['valor2'];

if($_GET['tipo']=="bateria"){
    //convertimos el valor a un %
    $v = $_GET['valor'] / 10.23;
    //redondeamos al entero mas cercano
    $v = round($v);
    $_GET['valor'] = $v;
    
}

$c = new Camiseta();
$c->setConexion($db);
$c->setNumeroserie($_GET['ns']);
$datos_umbrales = $c->obtener_umbrales_por_usuario($_GET['ns']);
if($_GET['tipo']=="bateria" && $_GET['check']==0){
    //la bateria se actualiza en cualquier caso
    $c->setBateria($_GET['valor']);
    $c->actualizar_bateria_camiseta();

    //por ultimo si esta por debajo del 20% lanzar un aviso
    //si llega aqui es que existe, solo debemo enviarlo si el usuario tiene activa las notificaciones
   
    foreach($datos_umbrales as $valorumbral){
        if($valorumbral['notificacionestodas']==1){
            //el usuario ha indicado que no quiere notificaciones, por tanto las apagamos todas
            continue;
        }

        if($valorumbral['notificacionesbateria']==0 && $_GET['valor'] < 20){
                //tenemos que enviar una notificacion informando de que el dispositivo tiene bateria baja
                enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'bateria',null,$_GET['valor']);
        }
    }
}

if($_GET['tipo']=="temperatura"){
    //procedemos a comprobar si tenemos que enviar notificaciones de temperatura
    foreach($datos_umbrales as $valorumbral){
        if($valorumbral['notificacionestodas']==1){
            //el usuario ha indicado que no quiere notificaciones, por tanto las apagamos todas
            continue;
        }

        if($valorumbral['notificacionestemperatura']==0 && $valorumbral['cnotificacionestemperatura']==0){
            //tenemos que comprobar si se ha rebasado el minimo o maximo de temperatura
            if($valorumbral['ctemperaturaminimo']!=null && $valorumbral['ctemperaturaminimo']!='' && $valorumbral['ctemperaturaminimo'] > $_GET['valor']){
                enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'temperatura','minimo',$_GET['valor']);
            }
    
            //y ahora el maximo
            if($valorumbral['ctemperaturamaximo']!=null && $valorumbral['ctemperaturamaximo']!='' && $valorumbral['ctemperaturamaximo'] < $_GET['valor']){
                enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'temperatura','maximo',$_GET['valor']);
            }
        }
    }
}

if($_GET['tipo']=="ecg"){
    //TODO hacer el calculo de los npm cuando este terminada la camiseta
    $npm = 60;
    //procedemos a comprobar si tenemos que enviar notificaciones de temperatura
    foreach($datos_umbrales as $valorumbral){
        if($valorumbral['notificacionestodas']==1){
            //el usuario ha indicado que no quiere notificaciones, por tanto las apagamos todas
            continue;
        }

        if($valorumbral['notificacionesecg']==0 && $valorumbral['cnotificacionesecg']==0){
            //tenemos que comprobar
            //tenemos que comprobar si se ha rebasado el minimo o maximo de los npms
            if($valorumbral['cecgminimo']!=null && $valorumbral['cecgminimo']!='' && $valorumbral['cecgminimo'] > $npm){
                enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'ecg','minimo',$npm);
            }
    
            //y ahora el maximo
            if($valorumbral['cecgmaximo']!=null && $valorumbral['cecgmaximo']!=''  && $valorumbral['cecgmaximo'] < $npm){
                enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'ecg','maximo',$npm);
            }
        }
    }
}

if($_GET['tipo']=="eda"){
    $eda_generadas = explode(",",$_GET['valor']);
    //procedemos a comprobar si tenemos que enviar notificaciones de temperatura
    foreach($datos_umbrales as $valorumbral){
        if($valorumbral['notificacionestodas']==1){
            //el usuario ha indicado que no quiere notificaciones, por tanto las apagamos todas
            continue;
        }

        if($valorumbral['notificacioneseda']==0 && $valorumbral['cnotificacioneseda']==0){
            //tenemos que comprobar
            //aqui ha habido varios valores, se tienen que analizar todos los datos
            $encontradominimo = false;
            $encontradomaximo = false;
            $valorminimo = -1;
            $valormaximo = -1;
    
            foreach($eda_generadas as $eda_valor){
                if($valorumbral['cedaminimo']!=null && $valorumbral['cedaminimo']!='' && $valorumbral['cedaminimo'] > $eda_valor){
                    $encontradominimo = true;
                    $valorminimo = $eda_valor;
                }
        
                //y ahora el maximo
                if($valorumbral['cedamaximo']!=null && $valorumbral['cedamaximo']!='' && $valorumbral['cedamaximo'] < $eda_valor){
                    $encontradomaximo = true;
                    $valormaximo = $eda_valor;
                }
            }
    
            if($encontradominimo){
                enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'eda','minimo',$valorminimo);
            }
    
            if($encontradomaximo){
                enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'eda','maximo',$valormaximo);
            }
        }
    }
}

//si llega aqui, los 3 tienen un tratamiento en comun. Debemos buscar primero
//si han pasado mas de 120 segundos desde la ultima actualizacion
$i = new Informacion();
$i->setConexion($db);
$i->setNumeroserie($_GET['ns']);
$i->setFecha($fecha);
$valor = $i->obtener_datos_exact_not_json();
if($valor==null || count($valor)==0){
    if($i->insertar_por_campo_fecha($_GET['tipo'],$_GET['valor'])){
        http_response_code(CODIGO_OK);
        exit();        
    }
    else{
        http_response_code(CODIGO_ERROR);
        exit(); 
    }
}
else{
    //debemos actualizarlo
    if($i->actualizar_campo($_GET['tipo'], $_GET['valor'])){
        http_response_code(CODIGO_OK);
        exit();
    }
    else{
        http_response_code(CODIGO_ERROR);
        exit();
    }
}