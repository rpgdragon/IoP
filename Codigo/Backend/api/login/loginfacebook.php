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
 
$inputJSON = file_get_contents('php://input');
if(!isset($inputJSON) || $inputJSON==null || $inputJSON==''){
	generar_respuesta(false, "La solicitud de login facebook le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}
$input= json_decode( $inputJSON );
if(!isset($input) || $input==null || $input==''){
	generar_respuesta(false, "La solicitud de login facebook le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
} 

if(!isset($input->usuario) || $input->usuario==null || $input->usuario=='' || !isset($input->token) || $input->token==null || $input->token==''){
	generar_respuesta(false, "La solicitud de login facebook le faltan datos",CODIGO_FALTAN_PARAMETROS,ESTATUS_BAD_REQUEST);
	exit();
}

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
 
//antes de seguir validamos el token a ver si es valido
$fb = new Facebook\Facebook([
  'app_id' => '2851936288159153',
  'app_secret' => '613609457b3451b555ed1e089eab12c5',
  'default_graph_version' => 'v2.12',
 ]);
 
 $fb->setDefaultAccessToken($input->token);
 
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
//si llega aqui, tenemos que ver si existe la cuenta o no
try{
	$usuario->setUsuario($input->usuario);
	$queryst = $usuario->loginFacebook();
}catch(Exception $e){
	generar_respuesta(true, $e->getMessage(),CODIGO_ERROR,ESTATUS_INTERNAL_SERVER_ERROR);
	exit();
}

if($queryst->rowCount() > 0){
	generar_respuesta(true, "Logado correctamente Facebook",CODIGO_OK,ESTATUS_OK);
}
else{
	generar_respuesta(true, "Necesita definir Contraseña",CODIGO_NUEVA_CUENTA,ESTATUS_OK);
}

?>