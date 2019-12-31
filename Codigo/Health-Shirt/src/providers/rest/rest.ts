import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';


const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "https://www.jmcastellano.eu/healthshirt/api/";
const LOGIN_URL = "login/";
const VERSION = "v2/";

const TIMEOUT_MAXIMO = 10000;
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private crashlytics;

  constructor(public http: HttpClient, private firebaseCrashlytics: FirebaseCrashlytics) {
	this.crashlytics = this.firebaseCrashlytics.initialise();
  }

  public login(email:string,password:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
			}
			let cuerpo = {
				"usuario": email,
        "password": password,
        "esFacebook": "0"
      } 
      this.http.post(MAIN_URL + VERSION + LOGIN_URL + "login/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					this.crashlytics.logException("No se ha podido logar el usuario " + email + error.error + " " + error.status);
					reject(error);
				});
    });
  }

  public registrar(email:string,password:string,esFacebook:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
			}
			let cuerpo = {
				"usuario": email,
        "password": password,
        "esFacebook": esFacebook
      } 
      this.http.post(MAIN_URL + VERSION + LOGIN_URL + "registrar/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					this.crashlytics.logException("No se ha podido registrar el usuario con email  " + email + error.error + " " + error.status);
					reject(error);
				});
    });
  }

  public registrarToken(email:string,token:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
		}
		let cuerpo = {
		"usuario": email,
        "token": token
      	} 
      this.http.post(MAIN_URL + VERSION + LOGIN_URL + "registrartoken/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					this.crashlytics.logException("No se ha podido registrar el token de notificaciones para el usuario " + email + error.error + " " + error.status);
					reject(error);
				});
    });
  }

  public loginFacebook(email:string,token:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
			}
			let cuerpo = {
				"usuario": email,
        "token": token
      }
      this.http.post(MAIN_URL + VERSION + LOGIN_URL + "loginfacebook/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					this.crashlytics.logException("No se ha podido logar el usuario en Facebook " + email + error.error + " " + error.status);
					reject(error);
				});      
    });
  }

  public recuperarCuenta(email:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
			}
			let cuerpo = {
				"usuario": email,
      }
      this.http.post(MAIN_URL + VERSION + LOGIN_URL + "olvido/",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					this.crashlytics.logException("No se ha podido recuperar la cuenta del usuario " + email + error.error + " " + error.status);
					reject(error);
				});
    });
  }

}
