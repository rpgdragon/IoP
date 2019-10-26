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
  private storage: Storage) {
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

  loginFacebook(){
    this.facebook.login(['email'])
    .then((res: FacebookLoginResponse) => this.obtenerDatos(res))
    .catch(e => console.log('Error logging into Facebook', e));
  }

  obtenerDatos(res: FacebookLoginResponse) {
   var token = res.authResponse.accessToken;
   var userID = res.authResponse.userID;
   this.facebook.api(userID + "/?fields=email",["user_birthday"])
	.then((datos) => this.llamarLoginServidorFacebook(token,datos))
	.catch(e => console.log('Error intentando obtener email ',e));
  }
 
  llamarLoginServidorFacebook(token:any, datos:any){
    this.rest.loginFacebook(datos.email,token).then(data=>{
      if(data['codigorespuesta']==="603"){
        //hay que poner la pagina del password del Facebook
        console.log("Ha devuelto 603");
      }
      else{
        //ok, login correcto cambiamos
        MyApp.setNombreusuario(datos.email.toLowerCase());
        this.storage.set('nombreusuario', datos.email.toLowerCase());
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
