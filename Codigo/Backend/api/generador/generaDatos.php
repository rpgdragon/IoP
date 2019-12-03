<?php
// obtenemos el pool de conexiones
include_once '../config/database.php';
// obtenemos donde esta la clase Informacion
include_once '../modelo/informacion.php';
// obtenemos donde esta la clase Informacion
include_once '../modelo/camiseta.php';
//utilidades del sistema
include_once '../utilidades/utils.php';


/**
 * Función que genera las pulsaciones basadas en un ECG sano
 * Estas se ha obtenido a partir de mediciones con un ECG 8266 a 3.3V
 */
function generar_pulsaciones(){
    $pulsaciones = [];
    for($i = 0; $i < 60; $i = $i+1){
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,300);
        array_push($pulsaciones,200);
        array_push($pulsaciones,650);
        array_push($pulsaciones,0);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,400);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,250);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
        array_push($pulsaciones,200);
    }
    return $pulsaciones;
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
            array_push($eda,rand(90,100));
        }
        else if($numero==1){
            array_push($eda,rand(300,310));
        } else{
            array_push($eda,rand(200,210));
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


