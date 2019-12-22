<?php
// obtenemos el pool de conexiones
include_once '../config/database.php';
// obtenemos donde esta la clase Informacion
include_once '../modelo/informacion.php';
// obtenemos donde esta la clase Informacion
include_once '../modelo/camiseta.php';
//utilidades del sistema
include_once '../utilidades/utils.php';


$npm = 60;

function obtener_valor_plano(){
    $valor = rand(195,205);
    return $valor;
}

function pico300(){
    $valor = rand(290,310);
    return $valor;
}

function pico400(){
    $valor = rand(390,410);
    return $valor;
}

function pico250(){
    $valor = rand(240,260);
    return $valor;
}

function picoMaximo(){
    $valor = rand(630,650);
    return $valor;    
}

function picoMinimo(){
    $valor = rand(0,20);
    return $valor;    
}

/**
 * Función que genera las pulsaciones basadas en un ECG sano
 * Estas se ha obtenido a partir de mediciones con un ECG 8266 a 3.3V
 */
function generar_pulsaciones(){
    $pulsaciones = [];
    global $npm;
    //vamos a hacer 3 posibles modelos
    //una a 60 pulsaciones (7 posibilidad)
    //otra a 90 pulsaciones (2 posibilidades)
    //y otra a 120 pulsaciones (1 posibilidades)
    $obtenido = rand(1,10);
    if($obtenido==1){
        //120 pulsaciones
        $npm = 120;
        for($i = 0; $i < 60; $i = $i+1){
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico300());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,picoMaximo());
            array_push($pulsaciones,picoMinimo());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico400());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico250());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico300());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,picoMaximo());
            array_push($pulsaciones,picoMinimo());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico400());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico250());
        }
    }
    if($obtenido==2 || $obtenido==3){
        //90 pulsaciones
        $npm = 90;
        for($i = 0; $i < 30; $i = $i+1){
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico300());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,picoMaximo());
            array_push($pulsaciones,picoMinimo());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico400());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico250());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico300());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,picoMaximo());
            array_push($pulsaciones,picoMinimo());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico400());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico250());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico300());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,picoMaximo());
            array_push($pulsaciones,picoMinimo());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico400());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico250());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
        }
        
    }
    if($obtenido>2){
        //Este son 60 pulsaciones
        $npm = 60;
        for($i = 0; $i < 60; $i = $i+1){
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico300());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,picoMaximo());
            array_push($pulsaciones,picoMinimo());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico400());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,pico250());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
            array_push($pulsaciones,obtener_valor_plano());
        }
    }
    return $pulsaciones;
}


function enviar_notificacion($token, $nombrecamiseta, $idcamiseta, $numeroserie, $tipo, $umbral, $dato){
    $data = null;
    $parametros = null;
    if($tipo=='bateria'){
        $data = array(
            'title' => 'Aviso de bateria baja - '.$nombrecamiseta,
            'body' => 'La camiseta '.$nombrecamiseta.' le queda '.$dato.'% de bateria',
            'click_action' => 'FCM_PLUGIN_ACTIVITY'
        );
        $parametros = array(
            'tipo' => 'bateria',
            'idcamiseta' => $idcamiseta,
            'numeroserie' => $numeroserie,
            'nombre' => $nombrecamiseta
        );
    }

    if($tipo=='caida'){
        $data = array(
            'title' => 'Aviso de caida - '.$nombrecamiseta,
            'body' => 'El usuario con la camiseta '.$nombrecamiseta.' se ha caido',
            'click_action' => 'FCM_PLUGIN_ACTIVITY'
        );

        $parametros = array(
            'tipo' => 'caida',
            'idcamiseta' => $idcamiseta,
            'numeroserie' => $numeroserie,
            'nombre' => $nombrecamiseta
        );
    }
    
    if($tipo=='temperatura'){
        $data = array(
            'title' => 'Aviso de temperatura '.$umbral. ' superado - '.$nombrecamiseta,
            'body' => 'Se ha alcanzado '.$dato.'º',
            'click_action' => 'FCM_PLUGIN_ACTIVITY'
        );

        $parametros = array(
            'tipo' => 'temperatura',
            'idcamiseta' => $idcamiseta,
            'numeroserie' => $numeroserie,
            'nombre' => $nombrecamiseta
        );
    }
    
    if($tipo=='eda'){
        $data = array(
            'title' => 'Aviso de eda '.$umbral. ' superado - '.$nombrecamiseta,
            'body' => 'Se ha alcanzado '.$dato.' ',
            'click_action' => 'FCM_PLUGIN_ACTIVITY'
        );

        $parametros = array(
            'tipo' => 'eda',
            'idcamiseta' => $idcamiseta,
            'numeroserie' => $numeroserie,
            'nombre' => $nombrecamiseta
        );
    }

    if($tipo=='ecg'){
        $data = array(
            'title' => 'Aviso de npm '.$umbral. ' superado - '.$nombrecamiseta,
            'body' => 'Se ha alcanzado '.$dato.' npm',
            'click_action' => 'FCM_PLUGIN_ACTIVITY'
        );

        $parametros = array(
            'tipo' => 'ecg',
            'idcamiseta' => $idcamiseta,
            'numeroserie' => $numeroserie,
            'nombre' => $nombrecamiseta
        );
    }   

    sendPushNotifications($token,$data,$parametros);
}

function sendPushNotifications($to='',$data=array(),$parametros=array()){
    $apiKey='AIzaSyA5uZeW8stU3gROP2RThymWqJW0xqUkQRk';
    $fields = array ('to' => $to, 'notification' => $data, 'data' => $parametros);
    $headers = array('Authorization: key='.$apiKey, 'Content-Type: application/json');

    $url = 'https://fcm.googleapis.com/fcm/send';

    $ch = curl_init();

    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_POST,true);
    curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($fields));
    $result = curl_exec($ch);
    curl_close($ch);
    return json_decode($result,true);
}

/**
 * Esta función genera el EDA, el mismo varia no debería variar a lo largo del tiempo por lo que se
 * tendrá una posibilidad de saltar a lo alto o a lo bajo
 */
function generar_eda(){
    $eda = [];
    for($i = 0; $i < 240; $i = $i+1){
        //existe un 1% de posibilidades que se desplome a un valor entre 90 y 100 y un 1% de posibilidades que se dispare a un valor
        //entre 300 y 310, sino el valor común suele ser entre 200 y 210
        $numero = rand(0,100);
        if($numero==0){
            array_push($eda,rand(70,110));
        }
        else if($numero==1){
            array_push($eda,rand(290,350));
        } else{
            array_push($eda,rand(190,210));
        }
        
    }
    return $eda;
}

//Este script se va a ejecutar 1 vez por minuto.
//el mismo va a insertar en ecg 20 datos por segundo, por lo que habra 1200 elementos. Los mismos
//iran dentro de corchestes simulando una array
//el eda sólo se tomará 4 veces por segundo
//la temperatura solamente se tomará una por minuto y se basará en la anterior aumentando o disminuyendo en una decima
//su valor.
//la bateria decrementara en 1% por minuto (es exagerado pero se va a probar asi)
//si llega a 0% pasara de nuevo al 100%

//primero inicializamos la base de datos
$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
    //enviamos un email informando del error al correo personal
    mail("jmcastellano@jmcastellano.eu","Error en generación de datos","Se ha producido un error en el generado de datos. El error es ".$e->getMessage());
	exit();
}

$informacion = new Informacion();
$informacion->setConexion($db);

//ahora obtenemos los datos del último minuto para la camiseta "1111111111111111"
$informacion->setNumeroserie("1111111111111111");
$json_results = $informacion->obtener_datos_last_minute();
//este json devuelto contiene la última información, si no esta relleno tendremos que inicializar la bateria y la temperatura
if($json_results==null || $json_results=="" || $json_results=="[]"){
    //inicializamos bateria y temperatura
    $informacion->setBateria(100);
    $informacion->setTemperatura(36.5);
}
else{
    //si esta relleno tenemos que entonces obtener el valor que habia y hacer una serie de cambios
    //tenemos que extraer la bateria y la temperatura
    $jsondeco = json_decode($json_results);
    $informacion->setBateria(($jsondeco[0]->bateria)-1);
    if($informacion->getBateria()<=0){
        $informacion->setBateria(100);
    }
    $informacion->setTemperatura($jsondeco[0]->temperatura);
}

//vamos en las tablas camisetas asociadas a ese numero de serie los campos de hora y bateria
$camiseta = new Camiseta();
$camiseta->setConexion($db);
$camiseta->setBateria($informacion->getBateria());
$camiseta->setNumeroserie($informacion->getNumeroserie());
$camiseta->actualizar_bateria_camiseta();

$pulsaciones_generadas = generar_pulsaciones();
$eda_generadas = generar_eda();

$informacion->setEcg(implode(",",$pulsaciones_generadas));
$informacion->setEda(implode(",",$eda_generadas));

//la temperatura del paciente de ahora se genera de esta manera
//si la temperatura esta entre 34 y 38 la misma puede crecer o decrecer una decima respecto
//al minuto anterior o quedarse igual
//30% decrementar
//30% incrementar
//40% mantenerse

$numero = rand(1,10);
$temperatura = $informacion->getTemperatura();
if($numero <= 3){
    if($temperatura > 34){
        $temperatura = $temperatura - 0.1;
    }
}
else{
    if($numero >= 8){ 
        //incrementar
        if($temperatura < 38){
            $temperatura = $temperatura + 0.1;
        }
    }
}
//si no ha entrado en ninguna de las condiciones permanece invariable

$informacion->setTemperatura($temperatura);

//procedemos a actualizar el registro, ni siquiera validamos si se ha insertado bien o no

$valor_devuelto = $informacion->registrar_informacion();

//ahora por ultimo comprobamos si supera alguno de los umbrales establecidos

$datos_umbrales = $camiseta->obtener_umbrales_por_usuario("1111111111111111");
foreach($datos_umbrales as $valorumbral){
    //lo primero que tenemos que hacer es comprobar si las notificaciones se encuentran apagadas o no
    
    if($valorumbral['notificacionestodas']==1){
        //el usuario ha indicado que no quiere notificaciones, por tanto las apagamos todas
        continue;
    }

    //ahora englobaremos notificaciones por cada una de las constantes
    //ECG
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
    //EDA
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

    //Temperatura
    if($valorumbral['notificacionestemperatura']==0 && $valorumbral['cnotificacionestemperatura']==0){
        //tenemos que comprobar si se ha rebasado el minimo o maximo de temperatura
        if($valorumbral['ctemperaturaminimo']!=null && $valorumbral['ctemperaturaminimo']!='' && $valorumbral['ctemperaturaminimo'] > $informacion->getTemperatura()){
            enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'temperatura','minimo',$informacion->getTemperatura());
        }

        //y ahora el maximo
        if($valorumbral['ctemperaturamaximo']!=null && $valorumbral['ctemperaturamaximo']!='' && $valorumbral['ctemperaturamaximo'] < $informacion->getTemperatura()){
            enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'temperatura','maximo',$informacion->getTemperatura());
        }
    }

    //Y ahora procedemos a ver si enviamos una notificacion de caida
    if($valorumbral['notificacionescaida']==0){
       //tenemos que ver si generamos una notificacion de caida, solo ocurrira una de cada
       //diez veces
       $valor = rand(0,10);
       if($valor==0){
           //tenemos que enviar notificacion
           enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'caida',null,null);
       }
    }    

    //Y por ultimo procedemos a ver si hay que enviar una notificacion e bateria
    if($valorumbral['notificacionesbateria']==0){
        if($informacion->getBateria()==null || $informacion->getBateria() < 20){
            //tenemos que enviar una notificacion informando de que el dispositivo tiene bateria baja
            enviar_notificacion($valorumbral['token'],$valorumbral['nombre'],$valorumbral['id'],$valorumbral['numeroserie'],'bateria',null,$informacion->getBateria());
        }
    }

}
