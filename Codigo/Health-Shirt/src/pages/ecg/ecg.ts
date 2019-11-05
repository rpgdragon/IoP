import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConstantesPage } from '@pages/constantes/constantes';

/**
 * Generated class for the EcgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ecg',
  templateUrl: 'ecg.html',
})
export class EcgPage {

  private constantes:ConstantesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.constantes = this.navParams.get('constantes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EcgPage');
    console.log(this.constantes);
  }

  activarDesactivar(){
    this.constantes.deHabilitado = this.constantes.actual;
    this.constantes.hastaHabilitado = this.constantes.actual;
  }

}
