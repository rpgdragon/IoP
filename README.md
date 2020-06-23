# Aplicación Móvil IoP-Shirt

Antes de utilizar el presente producto debe hacerse con una camiseta inteligente diseñada especificamente para este proyecto..

Antes de realizar cualquier compilación, es necesario que el entorno tenga instaladas las siguientes herramientas
- Node (con npm, actualmente, 10.16.0)
- NPM 6.9.0
- Agregar gradle versión 5.5.* al path del sistema.
- En caso de que ocurra un error relacionado con memoria en la ejecución de gradle, agregar la variable _JAVA_OPTIONS al sistema con el valor -Xmx512M -Xms512M
- Hacer un npm install en la raiz del proyecto de Webapp

- Si da un error de Duplicate Classes hay que añadir en el gradle.properties las siguientes propiedades.

android.enableJetifier=true
android.useAndroidX=true

Todos los procesos indicados aquí son para ser probados en un dispositivo con sistema operativo Android. Las instrucciones para instalarlos en IOS estarán proximamente.

## Android

### Compilar
Para compilar la aplicación y generar una APK para probar la aplicación debe en un entorno se debe utilizar el comando npm

npm run build-android-@entorno@

Donde @entorno@ puede ser los siguientes valores:

- dev:		 Entorno de desarrollo, pruebas en el móvil
- prod:		 Entorno en producción, se firma la APK como release como si fuera la aplicación a descargarse en Google Play. Esta APK no sirve para subirla a Google Play

Si no se indica nada y se indica solamente:

npm run build-android

Se generará la versión para el entorno de dev.

### Compilar y ejecutar
Para compilar la versión y ejecutarla en un dispositivo móvil debe utilizar el comando nmp

npm run build-run-android-@entorno@

Donde @entorno@ puede ser los siguientes valores:

- dev:		 Entorno de desarrollo, pruebas en el móvil
- prod:		 Entorno en producción, se firma la APK como release como si fuera la aplicación a descargarse en Google Play. Esta APK no sirve para subirla a Google Play

Si no se indica nada y se indica solamente:

npm run build-run-android

Se compilará y ejecutará la versión para el entorno de dev.

### Ejecutar

Para simplemente ejecutar la aplicación recientemente compilada se debe utilizar el comando npm

npm run run-android-@entorno@

Donde @entorno@ puede ser los siguientes valores:

- dev:		 Entorno de desarrollo, pruebas en el móvil
- prod:		 Entorno en producción, se firma la APK como release como si fuera la aplicación a descargarse en Google Play. Esta APK no sirve para subirla a Google Play

Si no se indica nada y se indica solamente:

npm run run-android

Se ejecutará la versión para el entorno de dev.

### Generar versión
Para generar la versión que irá al Google Play se debe utuilizar el comando npm

npm run create-android-version

En el mismo se le pedirá que introduzca la contraseña del almacen de claves para firmar la aplicación. Una vez introducido se firmará y se optimizará la APK que podrá ser subida a Google Play.

##IOS
Proximamente
