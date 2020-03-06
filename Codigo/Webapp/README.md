# Aplicación Móvil Health-Shirt
Antes de realizar cualquier compilación, es necesario que el entorno tenga instaladas las siguientes herramientas
- Node (con npm, actualmente, 10.16.0)
- NPM 6.9.0
- Agregar gradle versión 5.5.* al path del sistema.
- En caso de que ocurra un error relacionado con memoria en la ejecución de gradle, agregar la variable _JAVA_OPTIONS al sistema con el valor -Xmx512M -Xms512M
- Hacer un npm install en la raiz del proyecto de Health-Shirt


# Compilar
Para compilar la aplicación y generar una versión para el entorno se debe utilizar el comando npm

npm run build-run-android-@entorno@

Donde @entorno@ puede ser los siguientes valores:

- dev:		 Entorno de desarrollo, pruebas en el móvil
- prod:		 Entorno en producción, se firma la APK para publicarla en el Google Play

Si no se indica nada y se indica solamente:

npm run build-run-android

Se generará la versión para el entorno de dev
