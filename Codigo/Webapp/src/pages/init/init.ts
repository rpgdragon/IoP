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
import { GooglePlus } from '@ionic-native/google-plus/ngx';

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
  private fcm: FCM,
  private google: GooglePlus) {
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
    this.facebook.logout().then(()=> this.hacerLogin(true)).catch(()=> this.hacerLogin(false));
  }

  loginGoogle(){
    this.google.login({})
  .then(res => {
    if(res.email!=undefined && res.email!=null && res.email!=''){
      //ok tenemos un login en google
      this.llamarLoginServidorGoogle(res.accessToken,res,res.userId);
    }
  })
  .catch(err => {
    //no realizamos ninguna operacion
  });
  }

  hacerLogin(logout){
    if(logout==true){
      console.log("Eliminado logins previos");
    }
    this.facebook.login(['email'])
    .then((res: FacebookLoginResponse) => this.obtenerDatos(res))
    .catch(e => console.log('Error logging into Facebook', e));
  }

  obtenerDatos(res: FacebookLoginResponse) {
   var token = res.authResponse.accessToken;
   var userID = res.authResponse.userID;
   this.facebook.api(userID + "/?fields=email",["email"])
	.then((datos) => this.llamarLoginServidorFacebook(token,datos,userID))
	.catch(e => console.log('Error intentando obtener email ',e));
  }
 
  llamarLoginServidorFacebook(token:any, datos:any, userID:any){
    this.rest.loginFacebook(datos.email,token).then(data=>{
      if(data['codigorespuesta']==="603"){
        //hay que poner la pagina del password del Facebook
        MyApp.setNombreusuario(datos.email.toLowerCase());
        this.storage.set("tokenfacebook",token);
        this.storage.set("usuariofacebook",userID);
        this.storage.set("esFacebook","1");
        this.navCtrl.push(RegistroFacebookPage,{red:"facebook"});
      }
      else{
        //ok, login correcto cambiamos
        MyApp.setNombreusuario(datos.email.toLowerCase());
        this.storage.set("tokenfacebook",token);
        this.storage.set("esFacebook","1");
        this.storage.set("usuariofacebook",userID);
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


  llamarLoginServidorGoogle(token:any, datos:any, userID:any){
    this.rest.loginGoogle(datos.email,token).then(data=>{
      if(data['codigorespuesta']==="603"){
        //hay que poner la pagina del password del Facebook
        MyApp.setNombreusuario(datos.email.toLowerCase());
        this.storage.set("tokenfacebook",token);
        this.storage.set("usuariogoogle",userID);
        this.storage.set("esGoogle","1");
        this.navCtrl.push(RegistroFacebookPage,{red:"google"});
      }
      else{
        //ok, login correcto cambiamos
        MyApp.setNombreusuario(datos.email.toLowerCase());
        this.storage.set("tokenfacebook",token);
        this.storage.set("esGoogle","1");
        this.storage.set("usuariogoogle",userID);
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
        alert('Token de Google no válido');
      }
      else{
        console.log(error);
        alert("Se ha producido un error en la autentificación con Google");
      }
    });
  }

}
