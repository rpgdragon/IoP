import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "http://www.jmcastellano.eu/healthshirt/api/";
const CAMISETA_URL = "camiseta/";
const VERSION = "v1/";

const TIMEOUT_MAXIMO = 10000;

/*
  Generated class for the RestCamisetaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestCamisetaProvider {

  constructor(public http: HttpClient) {
  }

  public listar(email:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }
      this.http.get(MAIN_URL + VERSION + CAMISETA_URL + "lista/?usuario=" + email,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					reject(error);
				});
    });
  }
  
  public registrarCamiseta(usuario:string, nombre:string, parentesco:string, numeroserie:string,
    codseg:string, icono:string, ecgminimo: number, ecgmaximo: number, edaminimo:number, edamaximo: number,
    temperaturaminimo: number, temperaturamaximo: number, notificacionesecg: boolean, notificacioneseda: boolean,
    notificacionestemperatura: boolean, notificacionescaida:boolean){
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

    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }
      
			let cuerpo = {
        "usuario": usuario,
        "nombre": nombre,
        "parentesco": parentesco,
        "numeroserie": numeroserie,
        "codseg": codseg,
        "icono": icono,
        "ecgminimo": ecgminimo,
        "ecgmaximo": ecgmaximo,
        "edaminimo": edaminimo,
        "edamaximo": edamaximo,
        "temperaturaminimo": temperaturaminimo,
        "temperaturamaximo": temperaturamaximo,
        "notificacionesecg": "" + notificacionesecg,
        "notificacioneseda": "" + notificacioneseda,
        "notificacionestemperatura": "" + notificacionestemperatura,
        "notificacionescaida": "" + notificacionescaida
      } 

      console.log(cuerpo);
      this.http.post(MAIN_URL + VERSION + CAMISETA_URL + "crear/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					reject(error);
				});
    });
  }

}
