import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConstantesPage } from '@pages/constantes/constantes';
import {Platform} from 'ionic-angular';

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
  private canvas: any;
  private ctx: any;
  data: Array<any>;
  frame: number;
  x: number;
  panAtX: number;
  continuarAnimacion: boolean;
  fpsIntervalo: number;
  fps:number = 20;
  then: any;
  public customOptionsDe: any = {
    buttons: [{
      text: 'Clear',
      handler: () => this.constantes.fechaDe=null
    }]};
  public customOptionsHasta: any = {
      buttons: [{
        text: 'Clear',
        handler: () => this.constantes.fechaHasta=null
      }]};



  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.constantes = this.navParams.get('constantes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EcgPage');
    this.constantes.setEcgP(this);
    this.data = [];
    this.canvas = document.getElementById("canvasecg");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.platform.width();
    this.canvas.height = this.platform.width();
    this.ctx.translate(0, this.canvas.height);
    this.ctx.scale(10,-0.5);
    this.frame=0;
    
    this.x = 0;
    this.panAtX = 25;
    this.continuarAnimacion = true;
    this.fpsIntervalo = 1000 / this.fps;
    this.then = Date.now();
    this.animate();
  }

  ionViewWillUnload(){
    this.apagarContinuarAnimacion();
  }

  animate() {
    //lo primero es comprobar si hay nuevos datos
    if(this.constantes.getValorecgcambiado()==true){
      this.data = this.constantes.getDatosecg();
      this.constantes.setValorecgcambiado(false);
      this.x = 0;
      this.then = Date.now();
    }

    if (this.continuarAnimacion) {
      requestAnimationFrame(this.animate.bind(this));
    }

    this.ctx.strokeStyle="#FF0000";
    this.ctx.lineWidth = 1;
    if (this.x > this.data.length - 1) {
        return;
    }


    var now = Date.now();
    var transcurrido = now - this.then;
    if (transcurrido > this.fpsIntervalo) {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.restore();
      this.ctx.beginPath();
      if (this.x++ < this.panAtX) {
          for (var xx = 0; xx <= this.x; xx++) {
            if(xx==0){
              this.ctx.moveTo(xx,this.data[xx]);
            }
            else{
              this.ctx.lineTo(xx,this.data[xx]);
            }
          }
          this.ctx.stroke();

      } else {
          for (var xx2 = 0; xx2 < this.panAtX; xx2++) {
              var y = this.data[this.x - this.panAtX + xx2];
              if(xx2==0){
                this.ctx.moveTo(xx2,y);
              }
              else{
                this.ctx.lineTo(xx2,y);
              }
          }
          this.ctx.stroke();
      }
      this.then = now - (transcurrido % this.fpsIntervalo);
    }
   
}


  activarDesactivar(){
    this.constantes.deHabilitado = this.constantes.actual;
    this.constantes.hastaHabilitado = this.constantes.actual;
    if(this.constantes.actual==true){
      this.continuarAnimacion = true;
      this.constantes.obtenerDatosRecientes();
      this.animate();
    }
    else{
      this.apagarContinuarAnimacion();
      this.constantes.apagarTimeout();
    }
  }

  apagarContinuarAnimacion(){
    this.continuarAnimacion = false;
  }

  public encenderContinuarAnimacion(){
    this.continuarAnimacion = true;
    this.animate();
  }

  obtenerConstantesFecha(){
    if(this.constantes.fechaDe!=null && this.constantes.fechaDe!=undefined && this.constantes.fechaDe!=null && this.constantes.fechaHasta!=undefined){
      this.constantes.obtenerDatosHistoricos();
    }
  }

}
