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
  dataMedia: Array<any>;
  frame: number;
  x: number;
  panAtX: number;
  continuarAnimacion: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.constantes = this.navParams.get('constantes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EcgPage');
    console.log(this.constantes);
    this.data = [];
    this.dataMedia=[];
    this.canvas = document.getElementById("canvasecg");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.platform.width();
    this.canvas.height = this.platform.width();

    //TESTING, esto es a modo de prueba mientras se termina el backend
    for (var i = 0; i < 50000; i++) {
      this.data.push(Math.sin(i / 10) * 70 + (this.canvas.height/2));
    }

    //metemos un primer valor de pulsaciones medias a modo de Test
    this.dataMedia.push(Math.floor(Math.random() * 51) + 60 );
    this.frame=0;
    
    console.log(this.data);
    this.x = 0;
    this.panAtX = 250;
    this.continuarAnimacion = true;
    this.animate();
  }

  animate() {
    if(this.frame > 100){
      this.frame = 0;
      this.dataMedia.push(Math.floor(Math.random() * 51) + 60 );
      //calculamos la media con lo que hay
      const average = lista => lista.reduce((prev, curr) => prev + curr) / lista.length;
      this.constantes.setPulsacionesmedias(Math.floor(average(this.dataMedia)));
    }
    else{
      this.frame = this.frame + 1;
    }
    this.ctx.fillStyle="#FF0000";
    if (this.x > this.data.length - 1) {
        return;
    }

    if (this.continuarAnimacion) {
      requestAnimationFrame(this.animate.bind(this));
    }

    if (this.x++ < this.panAtX) {
        this.ctx.fillRect(this.x, this.data[this.x], 1, 1);

    } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var xx = 0; xx < this.panAtX; xx++) {
            var y = this.data[this.x - this.panAtX + xx];
            this.ctx.fillRect(xx, y, 1, 1)
        }
    }
}


  activarDesactivar(){
    this.constantes.deHabilitado = this.constantes.actual;
    this.constantes.hastaHabilitado = this.constantes.actual;
  }

}
