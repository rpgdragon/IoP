import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { QueesPage } from '@pages/quees/quees';
import { LoginPage } from '@pages/login/login';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

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
  public facebook: Facebook) {
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
	console.log(token);
	console.log(datos.email);
  }

}
