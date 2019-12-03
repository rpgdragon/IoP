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

  private pulsacionesmedias: any;
  private edamedias: any;
  private temperaturamedias: any;

  private timerId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private screenOrientation: ScreenOrientation) {
    //recoge el objeto pasado por parametro
    this.camiseta = this.navParams.get('camiseta');
    this.ecg = EcgPage;
    this.eda = EdaPage;
    this.temperatura = TemperaturaPage;
    this.constantes = this;
    this.deHabilitado = true;
    this.hastaHabilitado = true;
    this.actual = true;
    this.timerId = null;
  }

  ionViewDidLoad() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    
  }

  ionViewWillEnter(){
    this.obtenerDatosRecientes();
  }

  obtenerDatosRecientes(){
    //ok la primera cosa que tenemos que hacer es comprobar si esta activo el campo de actual
    if(this.actual==true){
      //ok podemos seguir
    }

    this.timerId = setTimeout("this.obtenerDatosRecientes()",60000);
  }

  ionViewWillLeave(){
    console.log("Abandonando la pagina de constantes y desactivando llamada a constantes");
    clearTimeout(this.timerId);
  }

  /**
   * Método para ir de nuevo a la ventana de seleccion de la camiseta
   */
  irAtras(){
    this.navCtrl.pop();
  }

  /**
   * Getters y Setters de los atributos privados
   */
  public getPulsacionesmedias(){
    return this.pulsacionesmedias;
  }

  public setPulsacionesmedias(pulsacionesmedias:any){
    this.pulsacionesmedias = pulsacionesmedias;
  }

  public getEdamedias(){
    return this.edamedias;
  }

  public setEdamedias(edamedias:any){
    this.edamedias = edamedias;
  }

  public getTemperaturamedias(){
    return this.temperaturamedias;
  }

  public setTemperaturamedias(temperaturamedias:any){
    this.temperaturamedias = temperaturamedias;
  }

}
