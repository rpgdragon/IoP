import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { QueesPage } from '@pages/quees/quees';
import { LoginPage } from '@pages/login/login';
import { CamisetaPage } from '@pages/camiseta/camiseta';
import { RestProvider} from '../../providers/rest/rest';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';
import { MyApp } from '@app/app.component';
import { RegistroPage } from '@pages/registro/registro';
import { RegistroFacebookPage } from '@pages/registrofacebook/registrofacebook';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'page-init',
  templateUrl: 'init.html'
})
export class InitPage {
	
	public version: any;

  constructor(private menu: MenuController,
  public appVersion: AppVersion,
  public navCtrl: NavController, 
  public platform: Platform,
  public facebook: Facebook,
  private rest: RestProvider,
  private storage: Storage,
  private fcm: FCM) {
	   this.version = this.appVersion.getVersionNumber();
  }
  
  ionViewDidLoad(): void {	 
	  this.menu.swipeEnable(false);
  }
  
  navegarQueEs(){
	  this.navCtrl.push(QueesPage);
  }

  navegarLogin(){
	  this.navCtrl.push(LoginPage);
  }

  navegarRegistro(){
    this.navCtrl.push(RegistroPage);
  }

  loginFacebook(){
    this.facebook.login(['email'])
    .then((res: FacebookLoginResponse) => this.obtenerDatos(res))
    .catch(e => console.log('Error logging into Facebook', e));
  }

  obtenerDatos(res: FacebookLoginResponse) {
   var token = res.authResponse.accessToken;
   var userID = res.authResponse.userID;
   this.facebook.api(userID + "/?fields=email",["email"])
	.then((datos) => this.llamarLoginServidorFacebook(token,datos))
	.catch(e => console.log('Error intentando obtener email ',e));
  }
 
  llamarLoginServidorFacebook(token:any, datos:any){
    this.rest.loginFacebook(datos.email,token).then(data=>{
      if(data['codigorespuesta']==="603"){
        //hay que poner la pagina del password del Facebook
        MyApp.setNombreusuario(datos.email.toLowerCase());
        this.navCtrl.push(RegistroFacebookPage);
      }
      else{
        //ok, login correcto cambiamos
        MyApp.setNombreusuario(datos.email.toLowerCase());
        this.storage.set('nombreusuario', datos.email.toLowerCase());
        this.fcm.getToken().then(token => {
          //vamos a guardar el token tanto en el storage como en el backend
          this.storage.set("tokennotificacion",token);
          this.rest.registrarToken(MyApp.getNombreusuario(),token)
          });
        this.fcm.onTokenRefresh().subscribe(token => {
          this.storage.set("tokennotificacion",token);
          this.rest.registrarToken(MyApp.getNombreusuario(),token)
          });
        this.navCtrl.setRoot(CamisetaPage);       
      }
    },error=>{
      if(error.status===403){
        alert('Token de Facebook no válido');
      }
      else{
        console.log(error);
        alert("Se ha producido un error en la autentificación con Facebook");
      }
    });
  }

}
