import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '@pages/info/info';

/**
 * Generated class for the EditarcamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editarcamiseta',
  templateUrl: 'editarcamiseta.html',
})
export class EditarcamisetaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarcamisetaPage');
  }

 /**
   * Método para ir de nuevo a la ventana de seleccion de la camiseta
   */
  irAtras(){
    this.navCtrl.pop();
  }

  /**
   * Metodo para ir a la pagina de Info
   */
  irInfo(){
    this.navCtrl.push(InfoPage);
  }

}
