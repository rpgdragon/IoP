
#!/bin/sh

# launcher.sh

#este script debe ejecutarse como  nohup sh launcher.sh &
# aparte de este script debe modificarse el crontab  con el comando 
# sudo crontab -e
# y anadir la siguiente linea
# @reboot nohup /home/pi/iopshirt/launcher.sh 

echo "Se ha iniciado el sistema" >&2

#Esta primera instruccion fuerza que nos conectemos al bluetooth
sudo rfcomm release 0 98:D3:31:F9:40:A9 

sleep 5

sudo rfcomm connect 0 98:D3:31:F9:40:A9 &

sleep 5

#Arrancamos el envio de datos a la nube
cd /

cd home/pi/iopshirt/web

sudo node index.js & 


#Arrancamos la aplicación Python que solicita los datos
cd /

cd home/pi/iopshirt/python

echo "Se inicia la aplicacion Receptora IopShirt" >&2

until 1; do

    echo "'iopshirt.py' ha terminado con error $?. Reiniciando..." >&2

    sleep 1

done
