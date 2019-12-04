import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "https://www.jmcastellano.eu/healthshirt/api/";
const INFORMACION_URL = "informacion/";
const VERSION = "v1/";

const TIMEOUT_MAXIMO = 10000;

/*
  Generated class for the RestCamisetaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestConstantesProvider {

  constructor(public http: HttpClient) {
  }

  public obtenerConstantesUltimoMinuto(numeroserie:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }
      this.http.get(MAIN_URL + VERSION + INFORMACION_URL + "?numeroserie=" + numeroserie,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					reject(error);
				});
    });
  }

}
