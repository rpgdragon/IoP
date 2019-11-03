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

}
