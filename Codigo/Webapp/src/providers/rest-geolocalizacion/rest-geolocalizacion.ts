import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';

/*
  Generated class for the GeolocalizacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const AUTHORIZACION = "healthshirt20192020";
const MAIN_URL = "http://www.iopshirt.es/api/";
const GEO_URL = "geolocalizacion/";
const VERSION = "v3/";

const TIMEOUT_MAXIMO = 10000;

@Injectable()
export class GeolocalizacionProvider {
  private crashlytics;
  constructor(public http: HttpClient, private firebaseCrashlytics: FirebaseCrashlytics) {
    console.log('Hello GeolocalizacionProvider Provider');
    this.crashlytics = this.firebaseCrashlytics.initialise();
  }

  public geolocalizar(calle:string,numero:string,localidad:string,provincia:string){
    return new Promise((resolve,reject) => {
      let httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + AUTHORIZACION
				})
			}
			let cuerpo = {
				"calle": calle,
        "numero": numero,
        "localidad": localidad,
        "provincia": provincia
      } 
      this.http.post(MAIN_URL + VERSION + GEO_URL,cuerpo,httpOptions)
      .timeout(TIMEOUT_MAXIMO)
				.subscribe(data => {
					resolve(data);
				}, error => {
					this.crashlytics.logException("No se ha podido recuperar los datos de geolocalización " + calle + numero + localidad + provincia +  error.error + " " + error.status);
					reject(error);
				});
    });
  }

}
