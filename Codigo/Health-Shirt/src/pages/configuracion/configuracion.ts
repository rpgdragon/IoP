import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RestConfiguracionProvider } from '../../providers/rest-configuracion/rest-configuracion';
import { MyApp } from '@app/app.component';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  formularioConfiguracion: FormGroup;
  notificacionestodas: boolean;
  notificacionesecg: boolean;
  notificacioneseda: boolean;
  notificacionestemperatura: boolean;
  notificacionesbateria: boolean;
  notificacionescaida: boolean;
  disablecheckbox: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public formBuilder: FormBuilder, public rest: RestConfiguracionProvider) {
    this.formularioConfiguracion = this.crearFormularioConfiguracion();
    this.notificacionestodas = false;
    this.notificacionestemperatura = false;
    this.notificacioneseda = false;
    this.notificacionesecg = false;
    this.notificacionescaida = false;
    this.notificacionesbateria = false;
    this.disablecheckbox = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }

  ionViewWillEnter(){
    this.rest.listar(MyApp.getNombreusuario()).then(data=>{
      console.log(data);
      if(data==undefined || data==null || data['mensaje']==undefined || data['mensaje']==null
      || data['mensaje']=="[]"){
        console.log("Respuesta vacia");
        this.notificacionestodas = false;
        this.notificacionestemperatura = false;
        this.notificacioneseda = false;
        this.notificacionesecg = false;
        this.notificacionescaida = false;
        this.notificacionesbateria = false;
        this.disablecheckbox = false;
      }
      else{
        let elemento = JSON.parse(data['mensaje'])[0];
        if(elemento.notificacionestodas=="1"){
          this.notificacionestodas = true;
          this.disablecheckbox = true;
        }
        else{
          this.notificacionestodas = false;
          this.disablecheckbox = false;
        }

        if(elemento.notificacionesecg=="1"){
          this.notificacionesecg = true;
        }
        else{
          this.notificacionesecg = false;
          this.disablecheckbox = false;
        }
        if(elemento.notificacioneseda=="1"){
          this.notificacioneseda = true;
        }
        else{
          this.notificacioneseda = false;
        }
        if(elemento.notificacionestemperatura=="1"){
          this.notificacionestemperatura = true;
        }
        else{
          this.notificacionestemperatura = false;
        }
        if(elemento.notificacionescaida=="1"){
          this.notificacionescaida = true;
        }
        else{
          this.notificacionescaida = false;
        }
        if(elemento.notificacionesbateria=="1"){
          this.notificacionesbateria = true;
        }
        else{
          this.notificacionesbateria = false;
        }
      }
    },error => {
      console.log(error);
      alert("No se ha podido recuperar la configuración del usuario");
    })
  }

    /**
   * Método para ir de nuevo a la ventana de seleccion de la camiseta
   */
  irAtras(){
    this.navCtrl.pop();
  }

  private crearFormularioConfiguracion(){
    return this.formBuilder.group({
      notificacionesecg: new FormControl('', []),
      notificacioneseda: new FormControl ('', []),
      notificacionestemperatura: new FormControl ('', []),
      notificacionestodas: new FormControl ('', []),
      notificacionescaida: new FormControl ('', []),
      notificacionesbateria: new FormControl ('', [])
    });
  }

  guardarConfiguracion(){
    this.rest.guardarConfiguracion(MyApp.getNombreusuario(), this.formularioConfiguracion.value.notificacionestodas,
    this.formularioConfiguracion.value.notificacionesecg,this.formularioConfiguracion.value.notificacioneseda,
    this.formularioConfiguracion.value.notificacionestemperatura,this.formularioConfiguracion.value.notificacionescaida,
    this.formularioConfiguracion.value.notificacionesbateria).then(data => {
        alert("Configuración guardada");
    }, error => {
      console.log(error);
        alert('Los datos de configuración no han podido ser guardados');
     
    })
  }

  apagarCasillas(){
    if(this.notificacionestodas==true){
      this.notificacionestemperatura = false;
      this.notificacioneseda = false;
      this.notificacionesecg = false;
      this.notificacionescaida = false;
      this.disablecheckbox = true;
    }
    else{
      this.notificacionestemperatura = false;
      this.notificacioneseda = false;
      this.notificacionesecg = false;
      this.notificacionescaida = false;
      this.disablecheckbox = false;      
    }
  }

}
