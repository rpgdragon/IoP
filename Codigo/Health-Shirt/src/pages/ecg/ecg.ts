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



  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.constantes = this.navParams.get('constantes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EcgPage');
    this.data = [];
    this.canvas = document.getElementById("canvasecg");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.platform.width();
    this.canvas.height = this.platform.width();

    this.frame=0;
    
    this.x = 0;
    this.panAtX = 250;
    this.continuarAnimacion = true;
    this.fpsIntervalo = 1000 / this.fps;
    this.then = Date.now();
    this.animate();
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

    this.ctx.fillStyle="#FF0000";
    if (this.x > this.data.length - 1) {
        console.log("Me da que no hay datos");
        return;
    }


    var now = Date.now();
    var transcurrido = now - this.then;
    if (transcurrido > this.fpsIntervalo) {
      console.log("Toca pinta");
      if (this.x++ < this.panAtX) {
          this.ctx.fillRect(this.x, this.data[this.x], 1, 1);

      } else {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          for (var xx = 0; xx < this.panAtX; xx++) {
              var y = this.data[this.x - this.panAtX + xx];
              this.ctx.fillRect(xx, y, 1, 1)
          }
      }
      this.then = now - (transcurrido % this.fpsIntervalo);
    }
    else{
      console.log("Ahora no toca pintar");
    }
   
}


  activarDesactivar(){
    this.constantes.deHabilitado = this.constantes.actual;
    this.constantes.hastaHabilitado = this.constantes.actual;
  }

}
