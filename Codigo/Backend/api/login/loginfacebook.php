<?php
 
// obtenemos el pool de conexiones
include_once '../config/database.php';
// obtenemos donde esta la clase Usuario
include_once '../modelo/usuario.php';
// codigos de respuesta
include_once '../modelo/codigos.php';

// rescatamos la utilidad de Facebook
require_once '../utilidades/Facebook/autoload.php';
//utilidades del sistema
include_once '../utilidades/utils.php';
 
$database = new Database();
try{
	$db = $database->getConexion();
}
catch(Exception $e){
	generar_respuesta(false, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}
 
$usuario = new Usuario();
$usuario->setConexion($db);

$respuesta = null;
if(!isset($_POST['usuario']) || $_POST['usuario']==null || $_POST['usuario']=='' || !isset($_POST['token']) || $_POST['token']==null || $_POST['token']==''){
	generar_respuesta(false,"La solicitud de login le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}	
 
//antes de seguir validamos el token a ver si es valido
$fb = new Facebook\Facebook([
  'app_id' => '2851936288159153',
  'app_secret' => '613609457b3451b555ed1e089eab12c5',
  'default_graph_version' => 'v2.12',
 ]);
 
 $fb->setDefaultAccessToken($_POST['token']);
 
 try {
		$request = $fb->get('/me');
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	if ($e->getCode() == 190) {
		generar_respuesta(false, $e->getMessage(),CODIGO_SESION_FACEBOOK_CADUCADA,ESTATUS_FORBIDDEN);
		exit();
	}
	exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
	// When validation fails or other local issues
	generar_respuesta(false, $e->getMessage(),CODIGO_SESION_FACEBOOK_ERRONEA,ESTATUS_FORBIDDEN);
	exit;
	}

generar_respuesta(true, "LOGIN CORRECTO FACEBOOK",CODIGO_OK,ESTATUS_OK);

?>