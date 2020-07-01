<?php
//añadimos la cabecera del CORS
 header("Access-Control-Allow-Origin: *");

 include_once '../utilidades/logging.php';
 include_once '../modelo/codigos.php';
 include_once '../utilidades/utils.php';

 $inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de geolocalizacion le faltan datos';
	meter_error_log2($log);
	generar_respuesta(false, "La petición de geolocalizacion le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de geolocalizacion le faltan datos';
	meter_error_log2($log);
	generar_respuesta(false, "La petición de geolocalización le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

//comprobamos si estan todos los datos individuales

if(!isset($input->calle) || $input->calle==null || $input->calle=='' || !isset($input->numero) || $input->numero==null || $input->numero==''
|| !isset($input->localidad) || $input->localidad==null || $input->localidad=='' || !isset($input->provincia) || $input->provincia==null || $input->provincia==''){
	$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La solicitud de geolocalizacion le faltan datos';
	meter_error_log2($log);
	generar_respuesta(false, "La solicitud de creación de login le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

$ch = curl_init();
//ok tenemos todos los datos, tenemos que montar la invocacion
$input->calle = str_replace(" ", "%20", $input->calle);
$input->numero = str_replace(" ", "%20", $input->numero);
$input->localidad = str_replace(" ", "%20", $input->localidad);
$input->provincia = str_replace(" ", "%20", $input->provincia);
$direccion=URL_GOOGLE_MAPS_GEOLOCALIZACION.''.API_KEY_GOOGLE."&address=".$input->calle."%20".$input->numero."%20".$input->localidad."%20".$input->provincia;

curl_setopt($ch, CURLOPT_URL, $direccion);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$data = curl_exec($ch);
curl_close($ch);

//tenemos que ver si la respuesta es correcta y si tenemos coordenadas
//aqui viene un ejemplo de contestacion
/*"results" : [
    {
    "access_points" : [],
    "address_components" : [
    {
    "long_name" : "5",
    "short_name" : "5",
    "types" : [ "street_number" ]
    },
    {
    "long_name" : "Calle Verdi",
    "short_name" : "Calle Verdi",
    "types" : [ "route" ]
    },
    {
    "long_name" : "Maqueda",
    "short_name" : "Maqueda",
    "types" : [ "locality", "political" ]
    },
    {
    "long_name" : "Málaga",
    "short_name" : "Málaga",
    "types" : [ "administrative_area_level_2", "political" ]
    },
    {
    "long_name" : "Andalucía",
    "short_name" : "AL",
    "types" : [ "administrative_area_level_1", "political" ]
    },
    {
    "long_name" : "Spain",
    "short_name" : "ES",
    "types" : [ "country", "political" ]
    },
    {
    "long_name" : "29591",
    "short_name" : "29591",
    "types" : [ "postal_code" ]
    }
    ],
    "formatted_address" : "Calle Verdi, 5, 29591 Maqueda, Málaga, Spain",
    "geometry" : {
    "location" : {
    "lat" : 36.7311311,
    "lng" : -4.5655401
    },
    "location_type" : "ROOFTOP",
    "viewport" : {
    "northeast" : {
    "lat" : 36.7324800802915,
    "lng" : -4.564191119708497
    },
    "southwest" : {
    "lat" : 36.7297821197085,
    "lng" : -4.566889080291502
    }
    }
    },
    "place_id" : "ChIJ72oGjdbvcg0RGKk2f0gnReU",
    "plus_code" : {
    "compound_code" : "PCJM+FQ Maqueda, Spain",
    "global_code" : "8C8QPCJM+FQ"
    },
    "types" : [ "street_address" ]
    }
    ],
    "status" : "OK"
    }*/
$jsontraducido = json_decode($data,true);
if($jsontraducido==NULL){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada a la API de Google ha fallado';
	meter_error_log2($log);
	generar_respuesta(false, "La solicitud a Google ha dado un error",CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
if($jsontraducido==[] || count($jsontraducido["results"])==0){
    $log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- La llamada a la API de Google no ha encontrado datos';
	meter_error_log2($log);
	generar_respuesta(false, "La solicitud a Google no ha encontrado datos",CODIGO_NO_CUENTA,ESTATUS_NO_ENCONTRADO);
	exit();    
}
$valor_encontrado= $jsontraducido["results"][0]["geometry"]["location"];
$resultados = json_encode($valor_encontrado);
$log  = "URLPeticion: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").'- Peticion de Google: '.$resultados;
meter_debug_log2($log);
generar_respuesta(true, $resultados,CODIGO_OK,ESTATUS_OK);