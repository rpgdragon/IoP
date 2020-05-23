import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { InfoPage } from '@pages/info/info';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';
import { MyApp } from '@app/app.component';
import {EditarcamisetaxcamisetaPage} from '@pages/editarcamisetaxcamiseta/editarcamisetaxcamiseta';
import {EditarcamisetaxpacientePage} from '@pages/editarcamisetaxpaciente/editarcamisetaxpaciente';
import { EditarcamisetaxedaPage } from '@pages/editarcamisetaxeda/editarcamisetaxeda';
import { EditarcamisetaxecgPage } from '@pages/editarcamisetaxecg/editarcamisetaxecg';
import { EditarcamisetaxtemperaturaPage } from '@pages/editarcamisetaxtemperatura/editarcamisetaxtemperatura';
import { EditarcamisetaxcaidaPage } from '@pages/editarcamisetaxcaida/editarcamisetaxcaida';


/**
 * Generated class for the EditarcamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editarcamiseta',
  templateUrl: 'editarcamiseta.html',
})
export class EditarcamisetaPage {
  @ViewChild("editarCamisetaTabs") tabs: Tabs;
  formularioEditarCamiseta: FormGroup;
  imagenes: Array<string> = ['grandmother', 'man', 'grandfather', 'old-man', 'couple', 'grandmother2', 'old-woman', 'old-man2', 'grandmother3', 'couple2'];
  imagen: string = 'grandmother';
  notificacionesecg: boolean;
  notificacioneseda: boolean;
  notificacionestemperatura: boolean;
  notificacionescaida: boolean;
  camiseta: Object;
  private lat: number;
  private lng: number;
  private camisetaP : EditarcamisetaxcamisetaPage;
  private pacienteP : EditarcamisetaxpacientePage;
  private ecgP : EditarcamisetaxecgPage;
  private edaP : EditarcamisetaxedaPage;
  private temperaturaP : EditarcamisetaxtemperaturaPage;
  private caidaP : EditarcamisetaxcaidaPage;
  public camisetapagina: any;
  public pacientepagina: any;
  public ecgpagina: any;
  public edapagina: any;
  public temperaturapagina: any;
  public caidapagina: any;
  public formulario: any;
  public isECG:boolean;
  public isEDA:boolean;
  public isTemperatura:boolean;
  public isCaida:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private rest: RestCamisetaProvider) {
    this.camiseta = this.navParams.get('camiseta');
    this.formulario = this;
    this.camisetapagina = EditarcamisetaxcamisetaPage;
    this.pacientepagina = EditarcamisetaxpacientePage;
    this.ecgpagina = EditarcamisetaxecgPage;
    this.edapagina = EditarcamisetaxedaPage;
    this.temperaturapagina = EditarcamisetaxtemperaturaPage;
    this.caidapagina = EditarcamisetaxcaidaPage;
    this.formularioEditarCamiseta = this.crearFormularioEditarCamiseta();
    if(this.camiseta["notificacionestemperatura"]==true || this.camiseta["notificacionestemperatura"]=="true" || this.camiseta["notificacionestemperatura"]==1 || this.camiseta["notificacionestemperatura"]=="1"){
      this.notificacionestemperatura = true;
    }
    else{
      this.notificacionestemperatura = false;
    }
    if(this.camiseta["notificacioneseda"]==true || this.camiseta["notificacioneseda"]=="true" || this.camiseta["notificacioneseda"]==1 || this.camiseta["notificacioneseda"]=="1"){
      this.notificacioneseda = true;
    }
    else{
      this.notificacioneseda = false;
    }
    if(this.camiseta["notificacionesecg"]==true || this.camiseta["notificacionesecg"]=="true" || this.camiseta["notificacionesecg"]==1 || this.camiseta["notificacionesecg"]=="1"){
      this.notificacionesecg = true;
    }
    else{
      this.notificacionesecg = false;
    }
    if(this.camiseta["notificacionescaida"]==true || this.camiseta["notificacionescaida"]=="true" || this.camiseta["notificacionescaida"]==1 || this.camiseta["notificacionescaida"]=="1"){
      this.notificacionescaida = true;
    }
    else{
      this.notificacionescaida = false;
    }
    if(this.camiseta["latitud"]==null || this.camiseta["latitud"]=="" || this.camiseta["latitud"]==undefined){
      this.lat = undefined;
    }
    else{
      this.lat = this.camiseta["latitud"];
    }
    if(this.camiseta["longitud"]==null || this.camiseta["longitud"]=="" || this.camiseta["longitud"]==undefined){
      this.lng = undefined;
    }
    else{
      this.lng = this.camiseta["longitud"];
    }
    console.log(this.camiseta["notificacionescaida"]);
    if(this.camiseta["esECG"]=="1"){
      this.isECG = false;
    }
    else{
      this.isECG = true;
    }
    if(this.camiseta["esEDA"]=="1"){
      this.isEDA = false;
    }
    else{
      this.isEDA = true;
    }
    if(this.camiseta["esTemperatura"]=="1"){
      this.isTemperatura= false;
    }
    else{
      this.isTemperatura = true;
    }
    if(this.camiseta["esCaida"]=="1"){
      this.isCaida = false;
    }
    else{
      this.isCaida = true;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarcamisetaPage');
  }

 /**
   * Método para ir de nuevo a la ventana de seleccion de la camiseta
   */
  irAtras(){
    this.navCtrl.pop();
  }

  /**
   * Metodo para ir a la pagina de Info
   */
  irInfo(){
    this.navCtrl.push(InfoPage);
  }

  private crearFormularioEditarCamiseta(){
    return this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      icono: new FormControl ('', Validators.required),
      numeroserie: new FormControl ({disabled: true}, Validators.required),
      ecgminimo: new FormControl ('', []),
      ecgmaximo: new FormControl ('', []),
      edaminimo: new FormControl ('', []),
      edamaximo: new FormControl ('', []),
      temperaturaminimo: new FormControl ('', []),
      temperaturamaximo: new FormControl ('', []),
      notificacionesecg: new FormControl ('', []),
      notificacioneseda: new FormControl ('', []),
      notificacionestemperatura: new FormControl ('', []),
      notificacionescaida: new FormControl ('', []),
      fechanacimiento: new FormControl('',[]),
      sexo: new FormControl('',[]),
      telefono: new FormControl('',[]),
      telefonocontacto: new FormControl('',[]),
      notas: new FormControl('',[]),
      calle: new FormControl('',[]),
      numero: new FormControl('',[]),
      localidad: new FormControl('',[]),
      provincia: new FormControl('',[])
    });
  }

  getFormularioEditarCamiseta(){
    return this.formularioEditarCamiseta;
  }
  

  getCamiseta(){
    return this.camiseta;
  }

  public getLatitud(){
    return this.lat;
  }

  public setLatitud(latitud){
    this.lat = latitud;
  }

  public getLongitud(){
    return this.lng;
  }

  public setLongitud(longitud){
    this.lng = longitud;
  }

  public getCamisetaP(){
    return this.camisetaP;
  }

  public setCamisetaP(camisetaP:EditarcamisetaxcamisetaPage){
    this.camisetaP = camisetaP;
  }

  public getPacienteP(){
    return this.pacienteP;
  }

  public setPacienteP(pacienteP:EditarcamisetaxpacientePage){
    this.pacienteP = pacienteP;
  }

  public getEcgP(){
    return this.ecgP;
  }

  public setEcgP(ecgP:EditarcamisetaxecgPage){
    this.ecgP = ecgP;
  }

  public getEdaP(){
    return this.edaP;
  }

  public setEdaP(edaP:EditarcamisetaxedaPage){
    this.edaP = edaP;
  }

  public getTemperaturaP(){
    return this.temperaturaP;
  }

  public setTemperaturaP(temperaturaP:EditarcamisetaxtemperaturaPage){
    this.temperaturaP = temperaturaP;
  }

  public getCaidaP(){
    return this.caidaP;
  }

  public setCaidaP(caidaP:EditarcamisetaxcaidaPage){
    this.caidaP = caidaP;
  }

  public editarCamiseta(){
    if(!this.validarCamposMinimoMaximo()){
      return;
    }
    this.rest.editarCamiseta(MyApp.getNombreusuario(), this.camiseta["id"], this.getFormularioEditarCamiseta().value.nombre
    ,this.getFormularioEditarCamiseta().value.icono,this.getFormularioEditarCamiseta().value.ecgminimo,this.getFormularioEditarCamiseta().value.ecgmaximo,
    this.getFormularioEditarCamiseta().value.edaminimo,this.getFormularioEditarCamiseta().value.edamaximo,
    this.getFormularioEditarCamiseta().value.temperaturaminimo,this.getFormularioEditarCamiseta().value.temperaturamaximo,
    this.getFormularioEditarCamiseta().value.notificacionesecg,this.getFormularioEditarCamiseta().value.notificacioneseda,
    this.getFormularioEditarCamiseta().value.notificacionestemperatura,this.getFormularioEditarCamiseta().value.notificacionescaida,
    this.getFormularioEditarCamiseta().value.fechanacimiento,this.getFormularioEditarCamiseta().value.sexo,this.getFormularioEditarCamiseta().value.telefono,
    this.getFormularioEditarCamiseta().value.telefonocontacto,this.getFormularioEditarCamiseta().value.notas,
    this.getFormularioEditarCamiseta().value.calle,this.getFormularioEditarCamiseta().value.numero,this.getFormularioEditarCamiseta().value.localidad,
    this.getFormularioEditarCamiseta().value.provincia,this.getLatitud(), this.getLongitud()).then(data => {
        alert("Camiseta editada exitosamente");
        this.navCtrl.pop();
    }, error => {
      console.log(error);
      if (error.status === 404) {
        alert("La camiseta no existe");
      }
      else{
        if(error.status === 403){
          alert("No se tiene permiso para editar esta camiseta");
        }
        else{
          alert("No se ha podido editar la camiseta");
        }
        
      }
     
    })
  }
  
  public validarCamposMinimoMaximo(){
    var ecgminimorelleno = false;
    var ecgmaximorelleno = false;
    var edaminimorelleno = false;
    var edamaximorelleno = false;
    var temperaturaminimorelleno = false;
    var temperaturamaximorelleno = false;
    if(this.getFormularioEditarCamiseta().value.ecgminimo!='' && this.getFormularioEditarCamiseta().value.ecgminimo!=null && this.getFormularioEditarCamiseta().value.ecgminimo!=undefined){
      if(isNaN(this.getFormularioEditarCamiseta().value.ecgminimo)){
        alert("El campo ECG minimo debe rellenarse con un número");
        return false;
      }
      ecgminimorelleno = true;
    }

    if(this.getFormularioEditarCamiseta().value.ecgmaximo!='' && this.getFormularioEditarCamiseta().value.ecgmaximo!=null && this.getFormularioEditarCamiseta().value.ecgmaximo!=undefined){
      if(isNaN(this.getFormularioEditarCamiseta().value.ecgmaximo)){
        alert("El campo ECG máximo debe rellenarse con un número");
        return false;
      }
      ecgmaximorelleno = true;
    }

    if(this.getFormularioEditarCamiseta().value.edaminimo!='' && this.getFormularioEditarCamiseta().value.edaminimo!=null && this.getFormularioEditarCamiseta().value.edaminimo!=undefined){
      if(isNaN(this.getFormularioEditarCamiseta().value.edaminimo)){
        alert("El campo EDA minimo debe rellenarse con un número");
        return false;
      }
      edaminimorelleno = true;
    }

    if(this.getFormularioEditarCamiseta().value.edamaximo!='' && this.getFormularioEditarCamiseta().value.edamaximo!=null && this.getFormularioEditarCamiseta().value.edamaximo!=undefined){
      if(isNaN(this.getFormularioEditarCamiseta().value.ecgmaximo)){
        alert("El campo EDA máximo debe rellenarse con un número");
        return false;
      }
      edamaximorelleno = true;
    }

    if(this.getFormularioEditarCamiseta().value.temperaturaminimo!='' && this.getFormularioEditarCamiseta().value.temperaturaminimo!=null && this.getFormularioEditarCamiseta().value.temperaturaminimo!=undefined){
      if(isNaN(this.getFormularioEditarCamiseta().value.temperaturaminimo)){
        alert("El campo Temperatura minimo debe rellenarse con un número");
        return false;
      }
      temperaturaminimorelleno = true;
    }

    if(this.getFormularioEditarCamiseta().value.temperaturamaximo!='' && this.getFormularioEditarCamiseta().value.temperaturamaximo!=null && this.getFormularioEditarCamiseta().value.temperaturamaximo!=undefined){
      if(isNaN(this.getFormularioEditarCamiseta().value.temperaturamaximo)){
        alert("El campo Temperatura máximo debe rellenarse con un número");
        return false;
      }
      temperaturamaximorelleno = true;
    }

    if(ecgminimorelleno && ecgmaximorelleno){
      var v1 = Number(this.getFormularioEditarCamiseta().value.ecgminimo);
      var v2 = Number(this.getFormularioEditarCamiseta().value.ecgmaximo);
      if(v1 > v2){
        alert("El umbral minimo de ECG no puede ser superior al umbral máximo");
        return false;
      }
    }

    if(edaminimorelleno && edamaximorelleno){
      var v3 = Number(this.getFormularioEditarCamiseta().value.edaminimo);
      var v4 = Number(this.getFormularioEditarCamiseta().value.edamaximo);
      if(v3 > v4){
        alert("El umbral minimo de EDA no puede ser superior al umbral máximo");
        return false;
      }
    }

    if(temperaturaminimorelleno && temperaturamaximorelleno){
      var v5 = Number(this.getFormularioEditarCamiseta().value.temperaturaminimo);
      var v6 = Number(this.getFormularioEditarCamiseta().value.temperaturamaximo);
      if(v5 > v6){
        alert("El umbral minimo de Temperatura no puede ser superior al umbral máximo");
        return false;
      }
    }
    return true;
  }

}
