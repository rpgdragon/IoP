#include <ADXL335.h>
#include <SPI.h>
#include <SD.h>
#include <virtuabotixRTC.h>
#include <OneWire.h>                
#include <DallasTemperature.h>

#define PIN_X  A0
#define PIN_Y  A1
#define PIN_Z  A2
#define PIN_BUZZER  3
#define PIN_BATERIA  A3
#define PIN_EDA A4
#define PIN_ECG A5
#define PIN_LOMI 8
#define PIN_LOMA 9
#define PIN_CS_SD  4
#define PIN_TEMPERATURA 2
#define aref  3.3
#define alfa  0.6
#define MAXIMO  5
#define MAXIMO_ERRORES  10
#define PIN1_RTC  5
#define PIN2_RTC  7
#define PIN3_RTC  6
#define UMBRAL 1.0
String numeroserie;
String codigoseguridad;
String fecha;
String sen;


uint8_t error = 0;
long tiempo = 0;
int mensaje = 0;
uint8_t datos = 0;

bool sensores[4];
bool activacion[4];
bool enviarIO;
bool minuto;
bool btactivo;
bool comprobacionBT;
bool mili;

float laccel[4];
float xAnt = -99.99;
float zAnt = -99.99;
float yAnt = -99.99;

int ECGArr[20];
int EDAArr[20];
int ECGAnt = -99;
int EDAAnt = -99;

virtuabotixRTC myRTC(PIN1_RTC, PIN2_RTC, PIN3_RTC);
 
void setup(void)
{
   //myRTC.setDS1302Time(00, 36, 23, 3, 17, 6, 2020); // SS, MM, HH, DW, DD, MM, YYYY
   Serial.begin(9600);
   pinMode(PIN_BUZZER, OUTPUT);
   pinMode(PIN_BATERIA, INPUT);
   pinMode(PIN_LOMI, INPUT);
   pinMode(PIN_LOMA, INPUT); 
   while (!Serial) {
    ;
   }
   error = inicializarSD();
   myRTC.updateTime();
   fecha = String(myRTC.year) + "-" + String(myRTC.month) + "-" + String(myRTC.dayofmonth) + " " + String(myRTC.hours) + ":" + String(myRTC.minutes) + ":" + myRTC.seconds;
   if(error==0){
    //enviamos mensaje para comprobar si el BT esta vivo
    Serial.println("[S]");
    //esperamos máximo 1seg la contestacion
    delay(2000);
    if(Serial.available() > 0){
      char caracter = Serial.read();
      if(caracter=='S'){
        btactivo=true;
      }
      else{
        btactivo=false;
      }
    }
    Serial.println("[S]");
    prepararEnvioBT("REG",sen);
   }
   activacion[0] = false;
   activacion[1] = false;
   activacion[2] = false;
   activacion[3] = false;
   enviarIO = false;
   minuto = false;
   comprobacionBT = false;
   mili = false;
}

 uint8_t inicializarSD(){
    uint8_t indice = 0;
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
      if (!SD.exists("pos.txt")){
        f = SD.open("pos.txt", FILE_WRITE);
        f.println("0");
        f.close();
      }
      f = SD.open("ns.txt", FILE_READ);
      inputChar = f.read();
      while(inputChar!=-1 && inputChar!='eof' && inputChar!='\r' && inputChar!='\n'){
        numeroserie = numeroserie + inputChar;
         inputChar = f.read();
      }
      f.close();
      if(numeroserie== NULL or numeroserie==""){
        return 3;
      }
      f = SD.open("cs.txt", FILE_READ);
      inputChar = f.read();
      while(inputChar!=-1 && inputChar!='eof' && inputChar!='\r' && inputChar!='\n'){
        codigoseguridad = codigoseguridad + inputChar;
         inputChar = f.read();
      }
      f.close();
      if(codigoseguridad== NULL or codigoseguridad==""){
        return 4;
      }
      codigoseguridad.trim();
      f = SD.open("config.txt", FILE_READ);
      inputChar = f.read();
      indice = 0;
      sen = "";
      while(indice < 4 && inputChar!=-1 && inputChar!='eof' && inputChar!='\r' && inputChar!='\n' ){
        if(inputChar=='1'){
          sensores[indice]=true;
        }
        else{
          sensores[indice]=false;
        }
        sen = sen + inputChar;
        indice = indice + 1;
        inputChar = f.read();
      }
      f.close();
      if(indice<4){
        return 5;
      }
      return 0;
    }
    else{
      return 2;
    } 
}

void tramitarTemperatura(){
  OneWire ourWire(PIN_TEMPERATURA);                //Se establece el pin 2  como bus OneWire
  DallasTemperature sensors(&ourWire); //Se declara una variable u objeto para nuestro sensor
  sensors.begin();
  sensors.requestTemperatures();  
  prepararEnvioBT("TEMP",String(sensors.getTempCByIndex(0)));
}

void tramitarECG(){
  int ecgval;
  if((digitalRead(PIN_LOMI) == 1)||(digitalRead(PIN_LOMA) == 1)){
    error = 6;
    return;
  }
  else{
    ecgval = analogRead(PIN_ECG);
    if(ECGAnt==-99){
      ECGAnt = ecgval;
    }
    else{
      ECGAnt  = (alfa*ecgval) + (1-alfa)*ECGAnt;
    }
    int i = 19;
    while(i>0){
      ECGArr[i] = ECGArr[i-1];
      i = i - 1;     
    }
   ECGArr[0] = ECGAnt;
  }
}

void tramitarEDA(){
  int gsrvalue=analogRead(PIN_EDA);
  if(EDAAnt==-99){
    EDAAnt=gsrvalue;
  }
  else{
    EDAAnt  = (alfa*gsrvalue) + (1-alfa)*EDAAnt;
  }
  int i = 19;
  while(i>0){
    EDAArr[i] = EDAArr[i-1];
    i = i - 1;     
  }
  EDAArr[0] = EDAAnt;
}

bool tramitarCaida(){
  ADXL335 accel(PIN_X, PIN_Y, PIN_Z, aref);
  float x;
  float y;
  float z;
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

  if(activacion[3]){ 
    activacion[3] = false;
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
  bool caida = false;
  bool io = true;
  if(error > 0){
    while(indice < error){
      tone(PIN_BUZZER, 500); // Send 1KHz sound signal...
      delay(500);        // ...for 1 sec
      noTone(PIN_BUZZER);     // Stop sound...
      delay(500);
      indice = indice + 1;
    }
    while(indice < MAXIMO_ERRORES){
      indice = indice + 1;
      delay(1000);
    }
  }
  else{
    if(sensores[3]){
      caida = tramitarCaida();
    }
    if(sensores[1]){
      tramitarEDA();
    }
    if(sensores[0]){
      tramitarECG();
    }

    if(sensores[3] && caida){
      prepararEnvioBT("CAIDA","1");
      io = false;
    }

    if(sensores[1] && activacion[1]){
       prepararEnvioBT("EDA","");
       io = false;
       activacion[1] = false;
     }
     if(sensores[0] && activacion[0]){
       prepararEnvioBT("ECG","");
       io = false;
       activacion[0] = false;
     }

    if(mensaje>=25000){
      mensaje = 1;
    }
    
    if(minuto){
      //hora de hacer el envio, primero actualizamos el timer
      myRTC.updateTime();
      io= false;
      if(sensores[2]){
       tramitarTemperatura();
      }
      prepararEnvioBT("BAT",String(analogRead(PIN_BATERIA)));
      tiempo = 0;
      myRTC.updateTime();
      fecha = String(myRTC.year) + "-" + String(myRTC.month) + "-" + String(myRTC.dayofmonth) + " " + String(myRTC.hours) + ":" + String(myRTC.minutes) + ":" + myRTC.seconds;
      minuto = false;
    }
    //solo si no se ha enviado algo y han pasado 5s procedemos a procesar una entrada antigua
    if(io && enviarIO && btactivo){
      procesarUnaEntrada();
      enviarIO = false;
    }
    incrementarTiempo();
    if(comprobacionBT){
      //comprobamos primero si hay para leer de antes
      if(Serial.available() > 0){
        char caracter = Serial.read();
        if(caracter=='S'){
          btactivo=true;
        }
        else{
          btactivo=false;
        }
      }
      else{
        btactivo=false;
      }
      Serial.println("[S]");
      comprobacionBT = false;
    }
    mili = !mili;
    if(mili){
      delay(9);
    }
    else{
      delay(8);
    }
  }
}

void procesarUnaEntrada(){
  //primero tenemos que leer un parametros
  unsigned long posicion = 0;
  File f = SD.open("pos.txt", FILE_READ);
  String cadena = f.readStringUntil('\n');
  char *poschar = const_cast<char*>(cadena.c_str());
  posicion = atol(poschar);
  f.close();
  f = SD.open("log.txt", FILE_READ);
  //nos situamos en el lugar indicado en posicion
  f.seek(posicion);
  //leemos la cadena
  cadena = f.readStringUntil('\n');
  if(cadena==NULL || cadena=="\r\n"){
    f.close();
    return;
  }
  //quitamos el \r que haya
  cadena.replace("\r","");
  posicion = f.position();
  f.close();
  int poscoma = cadena.lastIndexOf(";");
  String mensaje = cadena.substring(poscoma+1);
  envioBT(cadena);
  SD.remove("pos.txt");
  f = SD.open("pos.txt", FILE_WRITE);
  f.println(posicion);
  f.flush();
  f.close();
}

void envioBT(String cadena){
  if(btactivo){
    Serial.println(cadena);    
  }
  else{
     File f = SD.open("log.txt", FILE_WRITE);
     f.println(cadena);
     f.flush();
     f.close();   
  }
}

void incrementarTiempo(){
  tiempo = tiempo + 10;

  if(tiempo%250==0){
    activacion[3] = true;    
  }
  
  if(tiempo%1000==0){
    activacion[0] = true;
    activacion[1] = true;
  }

  if(tiempo%2000==0){
    comprobacionBT = true;
  }

  if(tiempo%5000==0){
    enviarIO = true;
  }

  if(tiempo%60000 == 0){
    minuto = true;
    activacion[2] = true;
  }
}

void prepararEnvioBT(String tipo, String dato){
  String cadena;
  mensaje = mensaje + 1;
  uint8_t indice = 1;
  if(tipo=="REG"){
    cadena = fecha;
    cadena += ";;";
    cadena += tipo;
    cadena += ";;";
    cadena += numeroserie;
    cadena += ";;";
    cadena += codigoseguridad;
    cadena += ";;";
    cadena += sen;
    cadena += ";;";
    cadena += mensaje;
  }
  if(tipo=="ECG"){
    dato = String(ECGArr[0]);
    while(indice < 20){
      dato+= ",";
      dato+= String(ECGArr[indice]);
      indice = indice + 1;
    }
  }

  if(tipo=="EDA"){
    dato = String(EDAArr[0]);
    while(indice < 20){
      dato+= ",";
      dato+= String(EDAArr[indice]);
      indice = indice + 1;
    }
  }

  if(tipo!="REG"){
    cadena = fecha;
    cadena +=  ";;";
    cadena += tipo;
    cadena += ";;";
    cadena += numeroserie;
    cadena += ";;";
    cadena += dato;
    cadena += ";;";
    cadena +=  mensaje;
  }
  envioBT(cadena);
}
