import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';



const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "http://www.iopshirt.es/api/";
const INFORMACION_URL = "informacion/";
const VERSION = "v3/";

const TIMEOUT_MAXIMO = 10000;

/*
  Generated class for the RestCamisetaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestConstantesProvider {

  private crashlytics;

  constructor(public http: HttpClient, private firebaseCrashlytics: FirebaseCrashlytics) {
    this.crashlytics = this.firebaseCrashlytics.initialise();
  }

  public obtenerConstantesUltimoMinuto(numeroserie:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }
      this.http.get(MAIN_URL + VERSION + INFORMACION_URL + "actual/" + numeroserie + "/",httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
          this.crashlytics.logException("No se han podido obtener las constantes vitales actuales de la camiseta " + numeroserie + " " + error.error + " " + error.status);
					reject(error);
				});
    });
  }

  public obtenerConstantesHistorico(numeroserie:string, fechaDe: Date, fechaHasta: Date){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
      }

      this.http.get(MAIN_URL + VERSION + INFORMACION_URL + "historico/" + numeroserie + "/" + fechaDe + "/" + fechaHasta + "/",httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
          this.crashlytics.logException("No se han podido obtener las constantes vitales historicas de la camiseta " + numeroserie + " del " + fechaDe + " hasta " + fechaHasta + " "
            + error.error + " " + error.status);
					reject(error);
				});
    });
  }

}
