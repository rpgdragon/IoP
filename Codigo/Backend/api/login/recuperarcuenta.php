<?php

session_start();

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
$queryst->execute();
if($queryst->rowCount() <= 0){
	http_response_code(400);
    exit();
}

//si llega aqui entonces la peticion es valida

?>

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="UTF-8">
    <title>Recuperación de camiseta HealthShirt</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body style="padding-top:10%;background: url('../assets/images/fondo.png');">
    <div class="container" style="text-align:center">
        <img src="../assets/images/icon.png" width="30%" alt="Logo HealtShirt" />
        <h1>HealthShirt</h1>
        <p>Para recuperar la cuenta debe resetear la contraseña, por favor introduce la nueva contraseña debajo. La contraseña debe cumplir las siguientes condiciones</p>
        <ul style="text-align:left;">
            <li>Debe contener al menos 6 caracteres</li>
            <li>Debe contener al menos una letra mayuscula</li>
            <li>Debe contener al menos una letra minuscula</li>
            <li>Debe contener al menos un número</li>
            <li>Debe contener al menos un caracter especial</li>
        </ul>
        <?php
        if(isset($_SESSION['mensaje']) && $_SESSION['mensaje']!=null){
            ?>
            <div class="alert alert-danger" role="alert"><?php echo $_SESSION['mensaje']; ?></div>
            <?php
        }
        ?>
        <form action="nuevacontrasena.php" method="post">
			<input type="password" class="form-control" placeholder="Password" aria-label="Password" name="password123" aria-describedby="password123"><br/>
			<input type="password" class="form-control" placeholder="Confirma password" aria-label="Confirmar Password" name="rpassword123" aria-describedby="rpassword123"><br/>
            <input type="hidden" name="token" id="token" value="<?php echo $_GET['token']; ?>" />
            <button class="btn btn-primary" type="submit">Cambiar clave</button>
        </form>
    </div>
    <?php unset($_SESSION['mensaje']);?>
</body>

