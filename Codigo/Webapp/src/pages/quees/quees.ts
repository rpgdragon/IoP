import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'page-quees',
  templateUrl: 'quees.html'
})
export class QueesPage {
	
	public version: any;

  constructor(private menu: MenuController,
  public appVersion: AppVersion,
    public navCtrl: NavController, 
  public platform: Platform,
  private iab: InAppBrowser) {
	   this.version = this.appVersion.getVersionNumber();
  }
  
  ionViewDidLoad(): void {	 
	  this.menu.swipeEnable(false);
  }
  
  navegarMain(){
	  this.navCtrl.pop();
  }
  
  navegarCompra(){
	  console.log(this.iab);
	  //Pendiente de modificar, ¿Deberia recuperarse de base de datos por si cambiara?
	  this.iab.create('http://www.iopshirt.es/productos/camiseta-inteligente-iop-shirt/','_system');
  }

}
