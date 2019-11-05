import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EcgPage} from '@pages/ecg/ecg';
import {EdaPage} from '@pages/eda/eda';
import {TemperaturaPage} from '@pages/temperatura/temperatura';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

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

  public fechaDe: any;
  public fechaHasta: any;
  public horaDe: any;
  public horaHasta: any;
  public constantes: any;
  public actual:any;

  public deHabilitado: boolean;
  public hastaHabilitado: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,private screenOrientation: ScreenOrientation) {
    //recoge el objeto pasado por parametro
    this.camiseta = this.navParams.get('camiseta');
    this.ecg = EcgPage;
    this.eda = EdaPage;
    this.temperatura = TemperaturaPage;
    this.constantes = this;
    this.deHabilitado = false;
    this.hastaHabilitado = false;
    this.actual = false;
  }

  ionViewDidLoad() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  irAtras(){
    //limpiamos un elemento la pila
    this.navCtrl.pop();
  }

}
