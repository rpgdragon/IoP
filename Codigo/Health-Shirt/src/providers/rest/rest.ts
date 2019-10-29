import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "http://www.jmcastellano.eu/healthshirt/api/";
const LOGIN_URL = "login/";
const VERSION = "v1/";

const TIMEOUT_MAXIMO = 10000;
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
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
      this.http.post(MAIN_URL + VERSION + LOGIN_URL + "login.php",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
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
      this.http.post(MAIN_URL + VERSION + LOGIN_URL + "loginfacebook.php",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
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
      this.http.post(MAIN_URL + VERSION + LOGIN_URL + "olvido.php",cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					reject(error);
				});
    });
  }

}
