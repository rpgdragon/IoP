import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConstantesPage } from '@pages/constantes/constantes';
import {Platform} from 'ionic-angular';

/**
 * Generated class for the TemperaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-temperatura',
  templateUrl: 'temperatura.html',
})
export class TemperaturaPage {

  private canvas: any;
  private ctx: any;
  data: Array<any>;
  xAxis: Array<any>;
  private datos = 100;
  private columnSize = 30;
  private margin = 10;
  private Val_max = 42;
  private Val_min = 32;
  private rowSize = 25;
  private stepSize = 2;

  private constantes:ConstantesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.constantes = this.navParams.get('constantes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemperaturaPage');
    console.log(this.constantes);
    this.data=[];
    this.xAxis=[];
    //cogemos la fecha actual y le restamos 100 minutos
    var actual = new Date();
    var milisecondsactual = actual.valueOf();
    var inicial = new Date(milisecondsactual - 100 * 60000);

    //TESTING rellenamos con datos aleatorios, con los últimos 100 detectados
    for (var i = 0; i < 100; i++) {
      this.data.push(Math.floor(Math.random() * 7) + 34 );
      
      this.xAxis.push(inicial.toLocaleString());
      inicial = new Date(milisecondsactual - (100 - i + 1)*60000);
    }
    console.log(this.xAxis);
    this.canvas = document.getElementById("canvastem");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.platform.width();
    this.canvas.height = this.platform.width();
    this.dibujarGrafica();
  }

  activarDesactivar(){
    this.constantes.deHabilitado = this.constantes.actual;
    this.constantes.hastaHabilitado = this.constantes.actual;
  }

  dibujarGrafica() {
    this.ctx.fillStyle = "#0099ff";
    this.ctx.font = "20 pt Verdana";
    var yScale = (this.canvas.height - this.columnSize - this.margin) / (this.Val_max - this.Val_min);
    var xScale = (this.canvas.width - this.rowSize) / this.datos;
    
    this.ctx.strokeStyle="#488aff"; // color of grid lines
	  this.ctx.beginPath();
		// print Parameters on X axis, and grid lines on the graph
	  for (var i=1;i<=this.datos;i=i+35) {
      var x = i * xScale;
		  this.ctx.fillText(this.xAxis[i], x,this.columnSize - this.margin);
	  }
		// print row header and draw horizontal grid lines
	  var count =  0;
	  for (var scale=this.Val_max;scale>=this.Val_min;scale = scale - this.stepSize) {
		  var y = this.columnSize + (yScale * count * this.stepSize); 
		  this.ctx.fillText(scale, this.margin,y + this.margin);
		  this.ctx.moveTo(this.rowSize,y)
		  this.ctx.lineTo(this.canvas.width,y)
		  count++;
	  }
	  this.ctx.stroke();
	
	  this.ctx.translate(this.rowSize,this.canvas.height + this.Val_min * yScale);
	  this.ctx.scale(1,-1 * yScale);
	
		// Color of each dataplot items
		
	  this.ctx.strokeStyle="#FF0066";
	  this.ctx.beginPath();
    this.ctx.moveTo(0, this.data[0]);
    for (i=1;i<this.datos;i++) {
      this.ctx.lineTo(i * xScale, this.data[i]);
    }
    this.ctx.stroke();

    //calculamos la media
    const average = lista => lista.reduce((prev, curr) => prev + curr) / lista.length;
    this.constantes.setTemperaturamedias(Math.round(100 * average(this.data))/ 100);
  }
}
