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


?>