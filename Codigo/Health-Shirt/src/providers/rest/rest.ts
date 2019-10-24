import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private main_url = "http://www.jmcastellano.eu/healthshirt/api/";

  private login_url= "login/";

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  public login(email:string,password:string){
    const httpOptions = {
    headers: new HttpHeaders({
    'Accept': 'application/json'})
    };
    let cuerpo = new FormData();
    cuerpo.append('usuario', email);
    cuerpo.append('password', password);
    this.http.post(this.main_url + this.login_url + "login.php",cuerpo,httpOptions)
    .subscribe( data=> { console.log(data); return true;}, error => {console.log(error); return false;});

  }

}
