<?php

// obtenemos el pool de conexiones
include_once '../config/database.php';

if(!isset($_GET['token']) || $_GET['token']==null || $_GET['token']==''){
    http_response_code(400);
    exit();
}
//si llega aqui es que hay token (pero no tiene por que ser valido)

//comprobamos si el token es valido
$database = new Database();

try{
	$db = $database->getConexion();
}
catch(Exception $e){
    http_response_code(500);
	exit();
}

$query = "SELECT idusuario FROM usuarioxtoken WHERE token='".$_GET['token']."' ";
$queryst = $db->prepare($query);
if(!$queryst->execute()){
    http_response_code(400);
    exit();
}

//si llega aqui entonces la peticion es valida

?>

<html>
<head>
<meta charset="UTF-8">
    <title>Recuperación de camiseta HealthShirt</title>
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css" >
    <link rel="stylesheet" href="../assets/css/bootstrap-theme.min.css" >
    <script src="../assets/js/bootstrap.min.js" ></script>
</head>
<body>
    <div style="width:100%; text-align:center">
        <img src="../assets/images/icon.png" width="30%" alt="Logo HealtShirt" />
        <h1>HealthShirt</h1>
        <p>Para recuperar la cuenta debe resetear la contraseña, por favor introduce la nueva contraseña debajo</p>
        <form action="nuevacontrasena.php" method="post">
            <div style="display:inline-block; width:40%; margin-top:1em"><div style="width:30%;text-align:left;display:inline-block">Contraseña:</div><div style="width:60%;text-align:left;display:inline-block"><input type="password" id="password123" name="password123"></div></div><br />
            <div style="display:inline-block; width:40%; margin-top:1em"><div style="width:30%;text-align:left;display:inline-block">Repetir Contraseña:</div><div style="width:60%;text-align:left;display:inline-block"><input type="password" id="rpassword123" name="rpassword123"></div><br />
            <input type="hidden" name="token" id="token" value="<?php echo $_GET['token']; ?>" />
            <input style="width:40%; margin-top:1em" type="submit" value="Cambiar clave">
        </form>
    </div>
</body>

