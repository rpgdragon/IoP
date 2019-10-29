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


?>