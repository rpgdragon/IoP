import serial, time
import MySQLdb

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = '51q7d00DRAGARIES'
DB_NAME = 'IOPSHIRT'

def run_query(query=''):
    try:
        datos = [DB_HOST,DB_USER,DB_PASS,DB_NAME]
        conn = MySQLdb.connect(*datos)
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
        return b'S'
    except Exception:
        return b'N'
    return
    

micro = serial.Serial('/dev/rfcomm0',9600,timeout=2)
time.sleep(2)
while(1):
    if(micro.isOpen()):
        cadena = micro.readline()
        cortada = cadena.decode('utf-8')
        cortada = cortada.lstrip("[")
        cortada = cortada.rstrip("]/r/n")
        cortada = cortada[:-2]
        #Los datos vienen separados por 2 puntos y comas
        separadas = cortada.split(";;")
        #Comprobamos si han llegado los datos de la siguiente forma
        #Fecha, Tipo, Dato, Mensaje
        if(len(separadas)!=4):
            micro.write(b'N');
            continue;
        # A continuacion comprobamos que alguno de los segundos campos es del tipo valido
        if(separadas[1]!='REG' and separadas[1]!='BAT' and separadas[1]!='ECG' and separadas[1]!='EDA' and separadas[1]!='TEMP'):
            micro.write(b'N');
            continue;
        
        query = "INSERT INTO sensores (horacreacion, numeroserie, mensaje, fecha, tipo, valor) VALUES (NOW(),'%s'" % separadas[2]
        query += ",'%s'" % separadas[4]
        query += ",'%s'" % separadas[0]
        query += ",'%s'" % separadas[1]
        query += ",'%s')" % separadas[3]
        micro.write(run_query(query))

