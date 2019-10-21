<?php

function generar_respuesta($estatus, $mensaje, $codigorespuesta, $codigoestatus){
	http_response_code($codigoestatus);
	$respuesta=array(
        "estatus" => $estatus,
        "mensaje" => $mensaje,
		"codigorespuesta" => $codigorespuesta
    );
	print_r(json_encode($respuesta));
	
}

function generar_token($tamano){
	$diccionario = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@.-_';
	$tokengenerado = ''; 
  
    for ($i = 0; $i < $tamano; $i++) { 
        $indice = rand(0, strlen($diccionario) - 1); 
        $tokengenerado .= $diccionario[$indice]; 
    } 
  
    return $tokengenerado;  
}

function obtenerDominioServidor() {
    $url = '';
    if(esHttps()) {
        $url=$url."https://";
    }
    else{
        $url=$url."http://";
    }
    $url= $url.$_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
    $url_partida = preg_split('#(?<!/)/(?!/)#', $url, 2);
    return $url_partida[0] != '' ? $url_partida[0] . '/' : '';
}

function esHttps() {
    return
      (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
      || $_SERVER['SERVER_PORT'] == 443;
  }



?>