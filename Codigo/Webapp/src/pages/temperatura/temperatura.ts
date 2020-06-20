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
  private columnSize = 30;
  private margin = 10;
  private Val_max = 42;
  private Val_min = 32;
  private rowSize: number;
  private stepSize: number;
  private timerId: any;
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

  private constantes:ConstantesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.constantes = this.navParams.get('constantes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemperaturaPage');
    this.constantes.setTemperaturaP(this);
    this.data=[];
    this.xAxis=[];
    this.canvas = document.getElementById("canvastem");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.platform.width();
    this.canvas.height = this.platform.width();
    this.prepararGrafica();
  }

  activarDesactivar(){
    this.constantes.deHabilitado = this.constantes.actual;
    this.constantes.hastaHabilitado = this.constantes.actual;
    if(this.constantes.actual==true){
      this.constantes.obtenerDatosRecientes();
      this.prepararGrafica();
    }
    else{
      this.constantes.apagarTimeout();
    }
  }

  ionViewWillUnload(){
    clearTimeout(this.timerId);
  }

  prepararGrafica(){
    //son los registros actuales
    if(this.constantes.getValortemperaturacambiado()==true){
      this.data = this.constantes.getDatostemperatura();
      this.constantes.setValortemperaturacambiado(false);
      
      this.xAxis = [];
      if(this.constantes.actual==true){
        //Deben pintarse 3 valores (10min, 5min, actual)
        var actual = new Date();
        var milisecondsactual = actual.valueOf();
        var inicial = new Date(milisecondsactual - this.data.length * 60000);
        this.xAxis.push(inicial.toLocaleString());
        inicial = new Date(milisecondsactual - (this.data.length - 5 + 1)*60000);
        this.xAxis.push(inicial.toLocaleString());
        inicial = new Date(milisecondsactual - (this.data.length - 10 + 1)*60000);
        this.xAxis.push(inicial.toLocaleString());
      }
      else{
        //tiene que ser entre dos fechas, la primera y la ultima son las elegidas por la persona y 
        //la del medio la mitad de las dos
        var ini:number = Date.parse(this.constantes.fechaDe.toLocaleString());
        var fin:number = Date.parse(this.constantes.fechaHasta.toLocaleString());
        //le restamos una hora
        ini=ini - (1000*3600);
        fin=fin - (1000*3600);
        var msseconds = Math.floor((fin - ini)/2);
        var medio:number = fin - msseconds;
        var d1 = new Date(ini);
        var d2 = new Date(medio);
        var d3 = new Date(fin);
        this.xAxis.push(d1.toLocaleString());
        this.xAxis.push(d2.toLocaleString());
        this.xAxis.push(d3.toLocaleString());
      }
      this.rowSize=2.5;
      this.stepSize = 2;
      this.dibujarGrafica();
    }
      var that = this;
      this.timerId = setTimeout(function(){ that.prepararGrafica(); },5000);
    
 
  }

  dibujarGrafica() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#0099ff";
    this.ctx.font = "20 pt Verdana";
    this.Val_min = Math.floor(this.constantes.getTemperaturamin() - 3);
    this.Val_max = Math.floor(this.constantes.getTemperaturamax() + 3);
    var yScale = (this.canvas.height - this.columnSize - this.margin) / (this.Val_max - this.Val_min);
    var xScale = (this.canvas.width - this.rowSize) / this.data.length;
    
    this.ctx.strokeStyle="#488aff"; // color of grid lines
    this.ctx.save();
	  this.ctx.beginPath();

    this.ctx.fillText(this.xAxis[0], 0,this.columnSize - this.margin);
    this.ctx.fillText(this.xAxis[1], this.canvas.width/3,this.columnSize - this.margin);
    this.ctx.fillText(this.xAxis[2], 2*this.canvas.width/3,this.columnSize - this.margin);

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
    for (var i=1;i<this.data.length;i++) {
      this.ctx.lineTo(i * xScale, this.data[i]);
    }
    this.ctx.restore();
    this.ctx.strokeStyle="#FF0000";
    this.ctx.stroke();
  }

  obtenerConstantesFecha(){
    if(this.constantes.fechaDe!=null && this.constantes.fechaDe!=undefined && this.constantes.fechaDe!=null && this.constantes.fechaHasta!=undefined){
      this.constantes.obtenerDatosHistoricos();
    }
  }

  public encenderContinuarAnimacion(){
    this.prepararGrafica();
  }
}
