import serial, time
import MySQLdb
from datetime import datetime

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = '51q7d00DRAGARIES'
DB_NAME = 'IOPSHIRT'

def run_query(query='', mensaje=0):
    try:
        datos = [DB_HOST,DB_USER,DB_PASS,DB_NAME]
        conn = MySQLdb.connect(*datos)
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
        return bytes('S' + mensaje,'ascii') 
    except Exception:
        return bytes('N' + mensaje,'ascii') 
    return

def run_select(query=''):
    try:
        datos = [DB_HOST,DB_USER,DB_PASS,DB_NAME]
        conn = MySQLdb.connect(*datos)
        cursor = conn.cursor()
        cursor.execute(query)
        myresult = cursor.fetchall()
        return myresult
    except Exception:
        return None
    
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
        if(len(separadas)< 5 or (separadas[1]=='REG' and len(separadas) < 6 )):
            micro.write(b'N');
            continue;
        # A continuacion comprobamos que alguno de los segundos campos es del tipo valido
        if(separadas[1]!='REG' and separadas[1]!='BAT' and separadas[1]!='ECG' and separadas[1]!='EDA' and separadas[1]!='TEMP' and separadas[1]!='CAIDA'):
            micro.write(bytes('N' + separadas[4],'ascii'));
            continue;
        if(separadas[1]=='ECG' or separadas[1]=='EDA'):
            #vamos a lanzar una consulta para ver si a la fecha y para ese numeroserie exise valor, si es asi seria hacerle un updTE
            query2 = "SELECT * FROM sensores WHERE numeroserie="
            query2 += "'%s'" % separadas[2]
            query2 += " and tipo="
            query2 += "'%s'" % separadas[1]
            query2 += " and fecha="
            query2 += "'%s'" % separadas[0]
            resultados = run_select(query2)
            if(resultados!=None and len(resultados)>0):
                #ya habia un valor, tenemos que actualizarlo
                fila = resultados[0]
                query3 = "UPDATE sensores SET valor="
                valorfinal = fila[6] + "," + separadas[3]
                mensajefinal = fila[3] + "," + separadas[4]
                query3 += "'%s'" % valorfinal
                query3 += " , mensaje="
                query3 += "'%s'" % mensajefinal
                query3 += " WHERE id="
                query3 += "'%s'" % fila[0]
                micro.write(run_query(query3,separadas[4]))
                continue
        #si llega aqui es que el dato es nuevo, comprobamos si el dato es viejo o no.
        #se considera viejo si han pasado más de 3 minutos desde que se obtuvo
        actual = datetime.today()
        #hora tenemos que convertir el texto en separadas[0] en la fecha correspondiente
        fecharegistro = datetime.strptime(separadas[0], '%Y-%m-%d %H:%M:%S')
        difference = (actual- fecharegistro)
        segundos = difference.total_seconds()
        viejo = 0
        if(segundos > 180):
            viejo = 1;    
        
        if(separadas[1]=="REG"):
            query = "INSERT INTO sensores (horacreacion, numeroserie, mensaje, fecha, tipo, valor,viejo,sensores) VALUES (NOW(),'%s'" % separadas[2]
            query += ",'%s'" % separadas[5]
            query += ",'%s'" % separadas[0]
            query += ",'%s'" % separadas[1]
            query += ",'%s'" % separadas[3]
            query += ",'%s'" % viejo
            query += ",'%s')" % separadas[4]
            micro.write(run_query(query,separadas[5]))
        
        else:    
            query = "INSERT INTO sensores (horacreacion, numeroserie, mensaje, fecha, tipo, valor,viejo) VALUES (NOW(),'%s'" % separadas[2]
            query += ",'%s'" % separadas[4]
            query += ",'%s'" % separadas[0]
            query += ",'%s'" % separadas[1]
            query += ",'%s'" % separadas[3]
            query += ",'%s')" % viejo
            micro.write(run_query(query,separadas[4]))
        

