<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");
// obtenemos el pool de conexiones
include_once '../config/database.php';
//utilidades del sistema
include_once '../utilidades/utils.php';
include_once '../utilidades/logging.php';
//utilidades del sistema
include_once '../utilidades/notificaciones.php';
// codigos de respuesta
include_once '../modelo/codigos.php';
include_once '../modelo/producto.php';
include_once '../modelo/camiseta.php';
include_once '../modelo/informacion.php';

if(!isset($_POST['ns']) || $_POST['ns']==NULL || $_POST['ns']==""){
    http_response_code(CODIGO_FALTAN_PARAMETROS);
    exit();
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

//tenemos que comprobar que el producto existe, pero que ademas es de tipo caida
$c = new Camiseta();
$c->setConexion($db);
$p = new Producto();
$p->setConexion($db);
$_POST['ns'] = base64_decode($_POST['ns']);
$c->setNumeroserie($_POST['ns']);
$p->setNumeroserie($_POST['ns']);

if(!$p->encontrar_producto_con_caida()){
    http_response_code(CODIGO_NO_CUENTA);
    exit();
}

//si llega aqui es que existe, solo debemo enviarlo si el usuario tiene activa las notificaciones
$datos_umbrales = $c->obtener_umbrales_por_usuario($_POST['ns']);
foreach($datos_umbrales as $valorumbral){

    if($valorumbral['notificacionestodas']==1){
        //el usuario ha indicado que no quiere notificaciones, por tanto las apagamos todas
        continue;
    }

    //Y ahora procedemos a ver si enviamos una notificacion de caida
    if($valorumbral['notificacionescaida']==0){
        //tenemos que ver si generamos una notificacion de caida, solo ocurrira una de cada
        //diez veces
        enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'caida',null,null);
    } 
}


