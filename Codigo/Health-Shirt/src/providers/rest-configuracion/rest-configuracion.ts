import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestConfiguracionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "http://www.jmcastellano.eu/healthshirt/api/";
const CONFIGURACION_URL = "configuracion/";
const VERSION = "v1/";

const TIMEOUT_MAXIMO = 10000;

@Injectable()
export class RestConfiguracionProvider {

  constructor(public http: HttpClient) {

  }

  public guardarConfiguracion(usuario:string, notificacionestodas:boolean,
    notificacionesecg:boolean, notificacioneseda:boolean, notificacionestemperatura:boolean,
    notificacionescaida:boolean, notificacionesbateria:boolean){
    if(notificacionestodas==undefined || notificacionestodas==null){
      notificacionestodas = false;
    }
    if(notificacionesecg==undefined || notificacionesecg==null){
      notificacionesecg = false;
    }
    if(notificacioneseda==undefined || notificacioneseda==null){
      notificacioneseda = false;
    }
    if(notificacionestemperatura==undefined || notificacionestemperatura==null){
      notificacionestemperatura = false;
    }
    if(notificacionescaida==undefined || notificacionescaida==null){
      notificacionescaida = false;
    }
    if(notificacionesbateria==undefined || notificacionesbateria==null){
      notificacionesbateria = false;
    }

    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }
      
			let cuerpo = {
				"usuario": usuario,
        "notificacionestodas": "" + notificacionestodas,
        "notificacionesecg": "" + notificacionesecg,
        "notificacioneseda": "" + notificacioneseda,
        "notificacionestemperatura": "" + notificacionestemperatura,
        "notificacionescaida": "" + notificacionescaida,
        "notificacionesbateria": "" +notificacionesbateria
      } 

      console.log(cuerpo);
      this.http.post(MAIN_URL + VERSION + CONFIGURACION_URL + "update/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					reject(error);
				});
    });
  }

  public listar(usuario:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }
      this.http.get(MAIN_URL + VERSION + CONFIGURACION_URL + "lista/?usuario=" + usuario,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					reject(error);
				});
    });
  }

}
