#include <FreeRTOS.h>
#include <FreeRTOSBoardDefs.h>
#include <FreeRTOSConfig.h>
#include <list.h>
#include <message_buffer.h>
#include <mpu_wrappers.h>
#include <portable.h>
#include <portmacro.h>
#include <projdefs.h>
#include <queue.h>
#include <semphr.h>
#include <stack_macros.h>
#include <stream_buffer.h>
#include <task.h>
#include <timers.h>



/*https://www.how2electronics.com/ecg-monitoring-with-ad8232-ecg-sensor-arduino/
 * http://wiki.seeedstudio.com/Grove-GSR_Sensor/
 */


/*
 * Primero vamos a poner todas las variables globales para liberar la pila
 */
SemaphoreHandle_t ss;
SemaphoreHandle_t sa;
const int GSR=A0;
const int ECG=A1;
const int LOPLUS=10;
const int LOMINUS=11;
int gsrValue;
float temp;



void setup(){
  Serial.begin(9600);
  ss = xSemaphoreCreateBinary();
  sa = xSemaphoreCreateBinary();
  pinMode(LOPLUS, INPUT); // Setup for leads off detection LO +
  pinMode(LOMINUS, INPUT); // Setup for leads off detection LO -
  xTaskCreate(LeerSerie, "LeerSerie", 150, NULL, 0, NULL);
  xTaskCreate(LeerSensores, "LeerSensores", 475, NULL, 2, NULL);
  //como usamos MINIRTOS debemos utilizar la siguiente función
  vTaskStartScheduler();
}


static void LeerSerie(void* pvParameters){
  while(1){
    if(xSemaphoreGive(ss)==pdTRUE){
      xSemaphoreTake(ss, portMAX_DELAY);
      vTaskDelay(10/portTICK_PERIOD_MS);
    }         
  }       
}

/**
 * Lectura de los sensores, se leeran cuando el semaforo este abierto y dejará un mensaje en la cola para que la tarea
 * 
 * de escribir en el puerto serie pueda hacer el trabajo
 */
static void LeerSensores(void* pvParameters){
  while(1){
    if(xSemaphoreTake(ss, portMAX_DELAY ) == pdTRUE){
      gsrValue=analogRead(GSR);
      //debido a las limitaciones de arduino, esto no funciona, hay que hacerlo en la psarela
      //resistencia_piel=((2*gsrValue + 1024) * 10000) / (512 - gsrValue);
      //Serial.print("gsrValue=");
      //Serial.println(gsrValue);
      //Serial.print("sensorECG=");
      /*if((digitalRead(LOPLUS) == 1)||(digitalRead(LOMINUS) == 1)){
        Serial.println('!');
      }
      else{
        // send the value of analog input 0:
          Serial.println(analogRead(A1));
      }*/
      int inicial = analogRead(A2);
      temp = inicial * 3.3/1024.0;
      temp = temp - 0.33;
      temp = temp / 0.01;
      Serial.println(temp);
      Serial.println(inicial);
      xSemaphoreGive(ss);
    }
    //
    vTaskDelay(10/portTICK_PERIOD_MS);
  }
}


void loop(){

}
