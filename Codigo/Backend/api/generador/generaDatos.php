<?php
// obtenemos el pool de conexiones
include_once '../config/database.php';
// obtenemos donde esta la clase Informacion
include_once '../modelo/informacion.php';
//utilidades del sistema
include_once '../utilidades/utils.php';

//Este script se va a ejecutar 1 vez por minuto.
//Va a obtener el minuto actual (sin segundos) y se va a a generar una serie de valores aleatorios
//y se le va a indicar la fecha dentro del último minuto (pero no hay espera continua, se indica la fecha)
// En total se insertaran 120 valores en la ejecución de este programa (uno cada 500ms)

//primero obtenemos exactamente en que fecha 