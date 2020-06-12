<?php

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
    $apiKey='AAAAjCX7DBc:APA91bGRly0PQ9u3jPU2Nfqkbu5jiLWKyhIGEw83X-tdapIV9xe2OYEk4jDyKx2mt5OnozbramPSjumbCIEh8jEt_83D0MSpPdIdPJ0pHtsC4I6_M3oJqGx_yEHN8Engy6VLJI0Tr84g';
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


?>