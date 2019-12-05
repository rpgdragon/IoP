import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EcgPage} from '@pages/ecg/ecg';
import {EdaPage} from '@pages/eda/eda';
import {TemperaturaPage} from '@pages/temperatura/temperatura';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { RestConstantesProvider} from '../../providers/rest-constantes/rest-constantes';

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

  private ecgP : EcgPage;
  private edaP : EdaPage;
  private temperaturaP : TemperaturaPage;

  public fechaDe: Date;
  public fechaHasta: Date;
  public constantes: any;
  public actual:any;

  public deHabilitado: boolean;
  public hastaHabilitado: boolean;

  private pulsacionesmedias: any;
  private edamedias: any;
  private temperaturamedias: any;

  private datosecg: any;
  private datoseda: any;
  private datostemperatura: any;
  private timerId: any;
  private valorecgcambiado: boolean;
  private valoredacambiado: boolean;
  private valortemperaturacambiado: boolean;



  constructor(public navCtrl: NavController, public navParams: NavParams,private screenOrientation: ScreenOrientation,
    private rest: RestConstantesProvider) {
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
    this.valorecgcambiado = false;
    this.valoredacambiado = false;
    this.valortemperaturacambiado = false;
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
      //ok podemos seguir ya que se piden los datos del último minuto
      this.rest.obtenerConstantesUltimoMinuto(this.camiseta["numeroserie"]).then( (data:any) => {
        var constantesarray = JSON.parse(data.mensaje);
        var elemento = constantesarray[0];
        var ecgc = elemento["ecg"];
        var edac = elemento["eda"];
        var temperaturac = elemento["temperatura"];
        //ahora tenemos que convertir los datos a elementos comprensibles por el mismo
        this.datosecg = ecgc.split(",");
        this.datoseda = edac.split(",");
        this.datostemperatura = temperaturac.split(","); 

        //vamos a calcular las medias
        //la media de la temperatura es tan simple como sumar sus valores y dividirlos por el número del tamaño
        var mediat = 0;
        for(var i=0; i< this.datostemperatura.length; i++){
          this.datostemperatura[i] = parseFloat(this.datostemperatura[i]);
          mediat+=this.datostemperatura[i];
        }
        this.temperaturamedias = Math.round( (mediat/this.datostemperatura.length) * 100) / 100

        //lo mismo con el eda
        mediat = 0;
        for(i=0; i< this.datoseda.length; i++){
          this.datoseda[i] = parseInt(this.datoseda[i]);
          mediat+=this.datoseda[i];
        }
        this.edamedias = Math.round( (mediat/this.datoseda.length) * 100) / 100

        //por último el ecg. No obstante este es un poco más complicado de medir, por que aqui tenemos que medir
        //los pulsos segun los valores y no los valores en si

        mediat = 0;
        this.pulsacionesmedias = 0;
        for(i=0; i< this.datosecg.length; i++){
          this.datosecg[i] = parseInt(this.datosecg[i]);
          if(this.datosecg[i]>=550){
            this.pulsacionesmedias++;
          }
          else{
            mediat=0;
          }
        }
        //ademas aqui tendrá que haber una accion para que se reinicien las animaciones y las graficas
        //se utilizará un flag
        this.valorecgcambiado = true;
        this.valoredacambiado = true;
        this.valortemperaturacambiado = true;
      }, error=>{
        //si hay un error simplemente lo imprimimos por la consola
        console.log("Esto es un error" + error);
      })
    }
    var that = this;
    this.timerId = setTimeout(function(){ that.obtenerDatosRecientes(); },60000);
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

  public getDatosecg(){
    return this.datosecg;
  }

  public setDatosecg(datosecg:any){
    this.datosecg = datosecg;
  }

  public getDatoseda(){
    return this.datoseda;
  }

  public setDatoseda(datoseda:any){
    this.datosecg = datoseda;
  }

  public getDatostemperatura(){
    return this.datostemperatura;
  }

  public setDatostemperatura(datostemperatura:any){
    this.datostemperatura = datostemperatura;
  }

  public getValorecgcambiado(){
    return this.valorecgcambiado;
  }

  public setValorecgcambiado(valorecgcambiado:any){
    this.valorecgcambiado = valorecgcambiado;
  }

  public getValoredacambiado(){
    return this.valoredacambiado;
  }

  public setValoredacambiado(valoredacambiado:any){
    this.valoredacambiado = valoredacambiado;
  }

  public getValortemperaturacambiado(){
    return this.valortemperaturacambiado;
  }

  public setValortemperaturacambiado(valortemperaturacambiado:any){
    this.valortemperaturacambiado = valortemperaturacambiado;
  }

  public getEcgP(){
    return this.ecgP;
  }

  public setEcgP(ecgP:EcgPage){
    this.ecgP = ecgP;
  }

  public getEdaP(){
    return this.edaP;
  }

  public setEdaP(edaP:EdaPage){
    this.edaP = edaP;
  }

  public getTemperaturaP(){
    return this.temperaturaP;
  }

  public setTemperaturaP(temperaturaP:TemperaturaPage){
    this.temperaturaP = temperaturaP;
  }

  public obtenerDatosHistoricos(){
    if(this.fechaHasta!=null && this.fechaHasta!=undefined && this.fechaDe!=null && this.fechaDe!=undefined){
      //ok si los dos estan llenos, llamamos al servicio restful
      if(this.fechaDe > this.fechaHasta){
        alert("La fecha desde debe ser inferior o igual a la fecha hasta");
        return;
      }
      this.rest.obtenerConstantesHistorico(this.camiseta["numeroserie"],this.fechaDe,this.fechaHasta).then( (data:any) => {
        var constantesarray = JSON.parse(data.mensaje);
        var elemento = constantesarray[0];
        var ecgc = elemento["ecg"];
        var edac = elemento["eda"];
        var temperaturac = elemento["temperatura"];
        //ahora tenemos que convertir los datos a elementos comprensibles por el mismo
        this.datosecg = ecgc.split(",");
        this.datoseda = edac.split(",");
        this.datostemperatura = temperaturac.split(","); 

        //vamos a calcular las medias
        //la media de la temperatura es tan simple como sumar sus valores y dividirlos por el número del tamaño
        var mediat = 0;
        for(var i=0; i< this.datostemperatura.length; i++){
          this.datostemperatura[i] = parseFloat(this.datostemperatura[i]);
          mediat+=this.datostemperatura[i];
        }
        this.temperaturamedias = Math.round( (mediat/this.datostemperatura.length) * 100) / 100

        //lo mismo con el eda
        mediat = 0;
        for(i=0; i< this.datoseda.length; i++){
          this.datoseda[i] = parseInt(this.datoseda[i]);
          mediat+=this.datoseda[i];
        }
        this.edamedias = Math.round( (mediat/this.datoseda.length) * 100) / 100

        //por último el ecg. No obstante este es un poco más complicado de medir, por que aqui tenemos que medir
        //los pulsos segun los valores y no los valores en si

        mediat = 0;
        this.pulsacionesmedias = 0;
        for(i=0; i< this.datosecg.length; i++){
          this.datosecg[i] = parseInt(this.datosecg[i]);
          if(this.datosecg[i]>=550){
            this.pulsacionesmedias++;
          }
          else{
            mediat=0;
          }
        }

        //y ahora a partir de la diferencia de minutos se divide
        
        var diffMs = (Date.parse(this.fechaHasta.toLocaleString()) - Date.parse(this.fechaDe.toLocaleString()));
        let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        this.pulsacionesmedias = this.pulsacionesmedias / diffMins;

        //ademas aqui tendrá que haber una accion para que se reinicien las animaciones y las graficas
        //se utilizará un flag
        this.valorecgcambiado = true;
        this.valoredacambiado = true;
        this.valortemperaturacambiado = true;
        //tambien pediremos activar el caso
        if(this.ecgP!=null && this.ecgP!=undefined){
          this.ecgP.encenderContinuarAnimacion();
        }
        if(this.edaP!=null && this.edaP!=undefined){
          this.edaP.encenderContinuarAnimacion();
        }
        if(this.temperaturaP!=null && this.temperaturaP!=undefined){
          this.temperaturaP.encenderContinuarAnimacion();
        }       
      }, error=>{
        //si hay un error simplemente lo imprimimos por la consola
        console.log("Esto es un error" + error);
      })
    }
  }

  public apagarTimeout(){
    if(this.timerId!=null && this.timerId!=undefined){
      clearTimeout(this.timerId);
    }
  }

}
