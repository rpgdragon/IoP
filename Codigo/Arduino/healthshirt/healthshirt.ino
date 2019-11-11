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




/**
 * Explicación del ejercicio
 * Este ejercicio esta preparado para utilizar MINIRTOS en un Arduino Mega con 3 sensores y 2 actuadores
 * Los sensores son el LDR, EL DHT22 y el MPU 6050
 * Los actuadores son el Servo SG90 y el Ventilador 
 */

/*
 * Primero vamos a poner todas las variables globales para liberar la pila
 */
SemaphoreHandle_t ss;
SemaphoreHandle_t sa;
const int GSR=A1;
int threshold=0;
int gsrValue;



/*
 * En la función setup inicializaremos todos los sensores, valores y las tareas
 */
void setup(){
  Serial.begin(9600);
  ss = xSemaphoreCreateBinary();
  sa = xSemaphoreCreateBinary();
  xTaskCreate(LeerSerie, "LeerSerie", 150, NULL, 0, NULL);
  xTaskCreate(LeerSensores, "LeerSensores", 475, NULL, 2, NULL);
  //como usamos MINIRTOS debemos utilizar la siguiente función
  vTaskStartScheduler();
}


/*
 * Tarea para leer el puerto serie, puede leer dos cadenas
 * [S] pide una lectura de Sensores
 * [A,X,Y] donde X e Y son numeros de 0 al 9 
 */
static void LeerSerie(void* pvParameters){
  while(1){
    if(xSemaphoreGive(ss)==pdTRUE){
      xSemaphoreTake(ss, portMAX_DELAY);
      vTaskDelay(150/portTICK_PERIOD_MS);
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
      Serial.print("sensorValue=");
      Serial.println(gsrValue);
      xSemaphoreGive(ss);
    }
    vTaskDelay(150/portTICK_PERIOD_MS);
  }
}


void loop(){

}
