import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';



const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "http://www.iopshirt.es/api/";
const CAMISETA_URL = "camiseta/";
const VERSION = "v3/";

const TIMEOUT_MAXIMO = 10000;

/*
  Generated class for the RestCamisetaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestCamisetaProvider {

  private crashlytics;

  constructor(public http: HttpClient, private firebaseCrashlytics: FirebaseCrashlytics) {
    this.crashlytics = this.firebaseCrashlytics.initialise();
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
          this.crashlytics.logException("No se ha podido borrar la camiseta de " + usuario + " con id " + id + " " + error.error + " " + error.status);
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
          this.crashlytics.logException("No se han podido recuperar las camisetas de " + email + " " + error.error + " " + error.status);
          reject(error);
				});
    });
  }
  
  public registrarCamiseta(usuario:string, nombre:string, numeroserie:string,
    codseg:string, icono:string,fechanacimiento: Date, sexo: string, telefono: number,
    telefonocontacto: string, notas: string, calle:string,numero:string,localidad:string,provincia:string,
    latitud: number, longitud:number){
     //rellenamos los valores no obligatorios que han venido sin nada con un valor -1
     //para indicar en el json que ese valor no esta relleno
     //la idea es forzar que esten todos los campos para poder depurar mejor
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
        "numeroserie": numeroserie,
        "codseg": codseg,
        "icono": icono,
        "fechanacimiento": fechanacimiento,
        "sexo": sexo,
        "telefono": "" + telefono,
        "telefonocontacto": "" + telefonocontacto,
        "notas": "" + notas,
        "calle": "" + calle,
        "numero": "" + numero,
        "localidad": "" + localidad,
        "provincia": "" + provincia,
        "latitud": "" + latitud,
        "longitud": "" + longitud
      } 

      console.log(cuerpo);

      this.http.post(MAIN_URL + VERSION + CAMISETA_URL + "crear/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
          this.crashlytics.logException("No se han podido crear la camiseta para " + usuario + " " + error.error['mensaje'] + " " + error.status);
          reject(error);
				});
    });
  }


  public editarCamiseta(usuario:string, id:number, nombre:string, icono:string, ecgminimo: number, ecgmaximo: number, edaminimo:number, edamaximo: number,
    temperaturaminimo: number, temperaturamaximo: number, notificacionesecg: boolean, notificacioneseda: boolean,
    notificacionestemperatura: boolean, notificacionescaida:boolean,fechanacimiento: Date, sexo: string, telefono: number,
    telefonocontacto: string, notas: string, calle:string,numero:string,localidad:string,provincia:string,
    latitud: number, longitud:number ){
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

    if(longitud==undefined || longitud==null){
      longitud=-1;
    }
    if(latitud==undefined || latitud==null){
      latitud=-1;
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
        "notificacionescaida": "" + notificacionescaida,
        "fechanacimiento": fechanacimiento,
        "sexo": sexo,
        "telefono": "" + telefono,
        "telefonocontacto": "" + telefonocontacto,
        "notas": "" + notas,
        "calle": "" + calle,
        "numero": "" + numero,
        "localidad": "" + localidad,
        "provincia": "" + provincia,
        "latitud": "" + latitud,
        "longitud": "" + longitud
      } 

      console.log(cuerpo);

      this.http.post(MAIN_URL + VERSION + CAMISETA_URL + "editar/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
          this.crashlytics.logException("No se han podido editar la camiseta de " + usuario + " con id " + id + " " + error.error + " " + error.status);
					reject(error);
				});
    });
  }

}


