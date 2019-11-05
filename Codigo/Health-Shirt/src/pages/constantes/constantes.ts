import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EcgPage} from '@pages/ecg/ecg';
import {EdaPage} from '@pages/eda/eda';
import {TemperaturaPage} from '@pages/temperatura/temperatura';

/**
 * Generated class for the ConstantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-constantes',
  templateUrl: 'constantes.html',
})
export class ConstantesPage {

  public camiseta: Object;
  public ecg: any;
  public eda: any;
  public temperatura: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //recoge el objeto pasado por parametro
    this.camiseta = this.navParams.get('camiseta');
    this.ecg = EcgPage;
    this.eda = EdaPage;
    this.temperatura = TemperaturaPage;
  }

  ionViewDidLoad() {
  }

  irAtras(){
    //limpiamos un elemento la pila
    this.navCtrl.pop();
  }

}
