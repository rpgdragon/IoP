import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "https://www.jmcastellano.eu/healthshirt/api/";
const CAMISETA_URL = "camiseta/";
const VERSION = "v2/";

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

  public borrar(usuario:string, id:number){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }

      let cuerpo = {
        "usuario": usuario,
        "id": "" + id
      } 

      this.http.post(MAIN_URL + VERSION + CAMISETA_URL + "borrar/" ,cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					reject(error);
				});
    });
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
     //rellenamos los valores no obligatorios que han venido sin nada con un valor -1
     //para indicar en el json que ese valor no esta relleno
     //la idea es forzar que esten todos los campos para poder depurar mejor
    if(ecgminimo==undefined || ecgminimo==null){
      ecgminimo=-1;
    } 
    if(ecgmaximo==undefined || ecgmaximo==null){
      ecgmaximo=-1;
    }
    if(edaminimo==undefined || edaminimo==null){
      edaminimo=-1;
    }
    if(edamaximo==undefined || edamaximo==null){
      edamaximo=-1;
    }
    if(temperaturaminimo==undefined || temperaturaminimo==null){
      temperaturaminimo=-1;
    }
    if(temperaturamaximo==undefined || temperaturamaximo==null){
      temperaturamaximo=-1;
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
        "ecgminimo": "" + ecgminimo,
        "ecgmaximo": "" + ecgmaximo,
        "edaminimo": "" + edaminimo,
        "edamaximo": "" + edamaximo,
        "temperaturaminimo": "" + temperaturaminimo,
        "temperaturamaximo": "" + temperaturamaximo,
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


  public editarCamiseta(usuario:string, id:number, nombre:string, parentesco:string, icono:string, ecgminimo: number, ecgmaximo: number, edaminimo:number, edamaximo: number,
    temperaturaminimo: number, temperaturamaximo: number, notificacionesecg: boolean, notificacioneseda: boolean,
    notificacionestemperatura: boolean, notificacionescaida:boolean){
     //rellenamos los valores no obligatorios que han venido sin nada con un valor -1
     //para indicar en el json que ese valor no esta relleno
     //la idea es forzar que esten todos los campos para poder depurar mejor
    if(ecgminimo==undefined || ecgminimo==null){
      ecgminimo=-1;
    } 
    if(ecgmaximo==undefined || ecgmaximo==null){
      ecgmaximo=-1;
    }
    if(edaminimo==undefined || edaminimo==null){
      edaminimo=-1;
    }
    if(edamaximo==undefined || edamaximo==null){
      edamaximo=-1;
    }
    if(temperaturaminimo==undefined || temperaturaminimo==null){
      temperaturaminimo=-1;
    }
    if(temperaturamaximo==undefined || temperaturamaximo==null){
      temperaturamaximo=-1;
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

    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }
      
			let cuerpo = {
        "usuario": usuario,
        "id": "" + id,
        "nombre": nombre,
        "parentesco": parentesco,
        "icono": icono,
        "ecgminimo": "" + ecgminimo,
        "ecgmaximo": "" + ecgmaximo,
        "edaminimo": "" + edaminimo,
        "edamaximo": "" + edamaximo,
        "temperaturaminimo": "" + temperaturaminimo,
        "temperaturamaximo": "" + temperaturamaximo,
        "notificacionesecg": "" + notificacionesecg,
        "notificacioneseda": "" + notificacioneseda,
        "notificacionestemperatura": "" + notificacionestemperatura,
        "notificacionescaida": "" + notificacionescaida
      } 

      console.log(cuerpo);

      this.http.post(MAIN_URL + VERSION + CAMISETA_URL + "editar/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					reject(error);
				});
    });
  }

}


