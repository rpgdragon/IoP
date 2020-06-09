#include "ESP8266.h"
#include <SoftwareSerial.h>
#include <ADXL335.h>
#include <SPI.h>
#include <SD.h>

const int PIN_X = A0;
const int PIN_Y = A1;
const int PIN_Z = A2;
const int PIN_RX_WIFI = 8;
const int PIN_TX_WIFI = 9;
const int PIN_BUZZER = 3;
const int PIN_CS_SD = 4;
const float aref = 3.3;
const float alfa = 0.6;
const int HOST_PORT = 80;
const char* HOST_NAME = "www.iopshirt.es";
const int MAXIMO = 5;
const int MAXIMO_ERRORES = 10;
String numeroserie;
String codigoseguridad;

int error = 0; 

 
SoftwareSerial softSerial(PIN_RX_WIFI, PIN_TX_WIFI); // RX, TX
ESP8266 wifi(softSerial);
 
void setup(void)
{
   int indice = 0;
   String ssid="";
   String clave="";
   Serial.begin(9600);
   pinMode(PIN_BUZZER, OUTPUT);
   while (!Serial) {
    ;
   }
   indice = inicializarSD(&ssid, &clave);
   if(indice==0){
    indice = inicializarWifi(&ssid, &clave);
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
   return 0;
}
 
void loop(void)
{
  int indice = 0;
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
    
  }
  /*
   uint8_t buffer[800] = { 0 };
 
   if (wifi.createTCP(HOST_NAME, HOST_PORT)) {
      Serial.print("create tcp ok\r\n");
   }
   else {
      Serial.print("create tcp err\r\n");
   }
 
   char *request = "GET /2434bc64 HTTP/1.1\r\nHost: www.pasted.co\r\nConnection: close\r\n\r\n";
   wifi.send((const uint8_t*)request, strlen(request));
 
   uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
   if (len > 0) 
   {
      Serial.print("Received:\r\n");
      for (uint32_t i = 0; i < len; i++) 
      {
         char c = (char)buffer[i];
         if (c == '~')
         {
            for (uint32_t j = i + 1; j < len; j++)
            {
               c = (char)buffer[j];
               if (c == '~') break;
               Serial.print(c);
            }
            break;
         }
      }
      Serial.print("\r\n");
   }
 
   while (1) delay(1000);*/
}
