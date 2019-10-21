import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular/index';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'page-template',
  templateUrl: 'template.html'
})
export class TemplatePage {
	
	public version: any;

  constructor(private menu: MenuController,
  public appVersion: AppVersion) {
	   this.version = this.appVersion.getVersionNumber();
  }
  
  ionViewDidLoad(): void {	 
	  this.menu.swipeEnable(false);
  }

}
