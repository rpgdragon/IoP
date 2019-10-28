<?php

define("ASUNTO_CORREO", "Solicitud de recuperación de contraseña de HealthShirt");
define("CABECERA_CORREO","MIME-Version: 1.0" . "\r\n" . "Content-type:text/html;charset=UTF-8" . "\r\n");
define("CUERPO_CORREO","<html><head><title>Solicitud de recuperación de contraseña de HealthShirt</title></head><body><p>Recientemente alguien ha solicitado recuperar la contraseña de tu cuenta.</p><p>Sí tu no has realizado esta petición, no necesitas hacer nada más. En cambio si has sido tu quien ha realizado la petición, deberás hacer clic en el siguiente <a href='http://www.jmcastellano.eu/healthshirt/api/v1/frontend/olvido.php?token=%AQUIVATOKEN%' target='_blank'>enlace</a>. El hipervinculo enviado caducará en las próximas 24 horas.</p><p>Un saludo,</p><p>El equipo de HealthShirt</p></body> </html>");


?>