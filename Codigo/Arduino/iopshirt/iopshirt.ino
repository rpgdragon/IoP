#include "ESP8266.h"
#include <SoftwareSerial.h>
#include <ADXL335.h>
#include <SPI.h>
#include <SD.h>
#include <virtuabotixRTC.h>
#include <OneWire.h>                
#include <DallasTemperature.h>

const int PIN_X = A0;
const int PIN_Y = A1;
const int PIN_Z = A2;
const int PIN_RX_WIFI = 8;
const int PIN_TX_WIFI = 9;
const int PIN_BUZZER = 3;
const int PIN_BATERIA = A3;
const int PIN_CS_SD = 4;
const int PIN_TEMPERATURA = 2;
const float aref = 3.3;
const float alfa = 0.6;
const int HOST_PORT = 80;
const char* HOST_NAME = "www.iopshirt.es";
const char* INIT URL = "GET /api/v3/info/";
const int MAXIMO = 5;
const int MAXIMO_ERRORES = 10;
const int PIN1_RTC = 5;
const int PIN2_RTC = 7;
const int PIN3_RTC = 6;
const float UMBRAL = 1.0;
String numeroserie;
String codigoseguridad;


int error = 0;
int tiempo = 0;
int datos = 0;

float laccel[4];


float xAnt = -99.99;
float zAnt = -99.99;
float yAnt = -99.99;

 
SoftwareSerial softSerial(PIN_RX_WIFI, PIN_TX_WIFI); // RX, TX
ESP8266 wifi(softSerial);
virtuabotixRTC myRTC(PIN1_RTC, PIN2_RTC, PIN3_RTC);
 
void setup(void)
{
   //myRTC.setDS1302Time(00, 38, 11, 4, 11, 6, 2020); // SS, MM, HH, DW, DD, MM, YYYY
   int indice = 0;
   String ssid="";
   String clave="";
   Serial.begin(9600);
   pinMode(PIN_BUZZER, OUTPUT);
   pinMode(PIN_BATERIA, INPUT);
   while (!Serial) {
    ;
   }
   indice = inicializarSD(&ssid, &clave);
   if(indice==0){
    //indice = inicializarWifi(&ssid, &clave);
    error = indice;
   }
   else{
    error=indice;
   }
}

 int inicializarSD(String * ssid, String * clave){
    int indice = 0;
    File f;
    char inputChar;
    while (!SD.begin(PIN_CS_SD) && indice < MAXIMO) {
      indice = indice + 1;
    }

    if (indice < MAXIMO) {
      if (!SD.exists("ns.txt")) {
        return 3;
      }
      if (!SD.exists("cs.txt")) {
        return 4;
      }
      if (!SD.exists("config.txt")) {
        return 5;
      }
      if (!SD.exists("log.txt")){
        f = SD.open("log.txt", FILE_WRITE);
        f.close();
      }
      f = SD.open("ns.txt", FILE_READ);
      do{
        inputChar = f.read();
        if(inputChar!=-1 && inputChar!='eof' && inputChar!='\r' && inputChar!='\n'){
          numeroserie = numeroserie + inputChar;
        }
      }while(inputChar!=-1);
      f.close();
      if(numeroserie== NULL or numeroserie==""){
        return 3;
      }
      f = SD.open("cs.txt", FILE_READ);
      do{
        inputChar = f.read();
        if(inputChar!=-1 && inputChar!='eof' && inputChar!='\r' && inputChar!='\n'){
          codigoseguridad = codigoseguridad + inputChar;
        }
      }while(inputChar!=-1);
      f.close();
      if(codigoseguridad== NULL or codigoseguridad==""){
        return 4;
      }
      f = SD.open("config.txt", FILE_READ);
      boolean salto = false;
      do{
        inputChar = f.read();
        if(inputChar==-1 || inputChar=='eof'){
          break;
        }
        if(inputChar=='\r' || inputChar=='\n'){
          salto = true;
          f.read();
        }
        if(salto){
          clave->concat(inputChar);
        }
        else{
          ssid->concat(inputChar);
        }
      }while(inputChar!=-1);
      f.close();
      if(*clave== NULL or *clave=="" or *ssid==NULL or *ssid==""){
        return 5;
      }
      return 0;
    }
    else{
      return 2;
    } 
 }

 int inicializarWifi(String * ssid, String * clave){
   if (!wifi.setOprToStationSoftAP()) {
      Serial.println("Ha fallado el Station");
      return 6;
   }
   ssid->trim();
   clave->trim();
   if (!wifi.joinAP(*ssid, *clave)) {
    Serial.println("Ha fallado el AP");
    return 6;
   }
 
   if (!wifi.disableMUX()) {
    Serial.println("Ha fallado el MUX");
      return 6;
   }

   //si llega bien aqui, implica que esta conectado, podemos registrarlo
   tramitarEnvio("REG",null,null);
   return 0;
}

float tramitarTemperatura(){
  OneWire ourWire(PIN_TEMPERATURA);                //Se establece el pin 2  como bus OneWire
  DallasTemperature sensors(&ourWire); //Se declara una variable u objeto para nuestro sensor
  sensors.begin();
  delay(10);
  sensors.requestTemperatures();  
  return sensors.getTempCByIndex(0);
}

boolean tramitarCaida(){
  ADXL335 accel(PIN_X, PIN_Y, PIN_Z, aref);
  float x;
  float y;
  float z;
  //this is required to update the values
  delay(10);
  accel.update(); 
  x = accel.getX();
  y = accel.getY();
  //if the project is laying flat and top up the z axis reads ~1G
  z = accel.getZ();

  if(xAnt==-99.99){
    xAnt = x;
    yAnt = y;
    zAnt = z;
  }
  else{
    xAnt  = (alfa*x) + (1-alfa)*xAnt;
    yAnt  = (alfa*y) + (1-alfa)*yAnt;
    zAnt  = (alfa*z) + (1-alfa)*zAnt;
  }

  if(tiempo>=0 && tiempo%250==0){ 
    float acelfinal = sqrt(xAnt*xAnt + yAnt*yAnt + zAnt*zAnt);
    //tenemos que actualizar la array de pesos
    int i = 3;
    float maxf = acelfinal;
    float minf = acelfinal;
    while(i>0){
      laccel[i] = laccel[i-1];
      if(laccel[i] > maxf){
        maxf = laccel[i];
      }
      if(laccel[i] < minf){
        minf = laccel[i];
      }
      i = i - 1;     
    }
    laccel[0] = acelfinal;
    if(datos >=4){
      //comprobamos si ha habido caida
      if(maxf - minf > UMBRAL){
        return true;
      }
    }
    else{
      datos = datos + 1;
    }
  }
  return false;
}
 
void loop(void){
  int indice = 0;
  float temperatura;
  int bateria;
  if(error > 0){
    while(indice < error){
      tone(PIN_BUZZER, 500); // Send 1KHz sound signal...
      delay(500);        // ...for 1 sec
      noTone(PIN_BUZZER);     // Stop sound...
      delay(500);
      indice = indice + 1;
    }
    while(indice < MAXIMO_ERRORES){
      delay(1000);
    }
  }
  else{
    tiempo = tiempo + 1;
    if(tramitarCaida()){
      //tramitarEnvio("CAIDA",1,0.0);
    }
    if(tiempo>=1000){
      //hora de hacer el envio, primero actualizamos el timer
      myRTC.updateTime();
      bateria = analogRead(PIN_BATERIA);
      temperatura = tramitarTemperatura();
      boolean envioWifi = false;
      //boolean envioWifi = tramitarEnvio("BAT",bateria,0.0);
     // envioWifi = envioWifi && tramitarEnvio("TEMP",0,temperatura);
      if(!envioWifi){
        //abrimos el fichero Wifi para guardar los datos
        File f = SD.open("log.txt", FILE_WRITE);
        String cadena = String(myRTC.dayofmonth) + "/" + String(myRTC.month) + "/" + String(myRTC.year) + " " + String(myRTC.hours) + ":" + String(myRTC.minutes) + ":" + myRTC.seconds;
        Serial.println(cadena);
        f.print(cadena);
        cadena = " TEMP:" + String(temperatura);
        f.print(cadena);
        cadena = " BAT: " + String(bateria);
        f.println(cadena);
        f.flush();
        f.close();
      }
      tiempo = 0;
    }
  }

}

boolean tramitarEnvio(String tipo, int dato, float dato2){
   if (!wifi.createTCP(HOST_NAME, HOST_PORT)) {
      //no se ba podido generar la conexion TCP
      return -1; 
   }
   uint8_t buffer[800] = { 0 };
   char *request = NULL;
   String cadena = "";
   if(tipo=="REG"){
    cadena = INIT_URL + "registro/" + numeroserie + "/" + codigoseguridad + " HTTP/1.1\r\nHost: " + HOST_NAME + "\r\nConnection: close\r\n\r\n"; 
   }
   if(tipo=="BAT"){
    cadena = INIT_URL + "bateria/" + numeroserie + "/" + String(dato) + " HTTP/1.1\r\nHost: " + HOST_NAME + "\r\nConnection: close\r\n\r\n"; 
   }
   if(tipo=="TEMP"){
    cadena = INIT_URL + "temperatura/" + numeroserie + "/" + String(dato2) + " HTTP/1.1\r\nHost: " + HOST_NAME + "\r\nConnection: close\r\n\r\n"; 
   }
   if(tipo=="CAIDA"){
    cadena = INIT_URL + "caida/" + numeroserie + "/" + String(dato) + " HTTP/1.1\r\nHost: " + HOST_NAME + "\r\nConnection: close\r\n\r\n"; 
   }
   cadena.toCharArray(request, cadena.length());
   wifi.send((const uint8_t*)request, strlen(request));
  
   delay(1000);
   
   uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
   delay(1000);
   delete [] request;
   if (len > 0) {
     return true;
   }
   else{
    return false;
   }
}
