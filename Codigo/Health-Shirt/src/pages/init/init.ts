import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular/index';

@Component({
  selector: 'page-init',
  templateUrl: 'init.html'
})
export class InitPage {

  constructor(private menu: MenuController) {}
  
  ionViewDidLoad(): void {
	  this.menu.swipeEnable(false);
  }

}
