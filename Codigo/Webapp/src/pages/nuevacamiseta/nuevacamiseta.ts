import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { InfoPage } from '@pages/info/info';
import {NuevacamisetaxcamisetaPage} from '@pages/nuevacamisetaxcamiseta/nuevacamisetaxcamiseta';
import {NuevacamisetaxpacientePage} from '@pages/nuevacamisetaxpaciente/nuevacamisetaxpaciente';

/**
 * Generated class for the NuevacamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nuevacamiseta',
  templateUrl: 'nuevacamiseta.html',
})
export class NuevacamisetaPage {
  @ViewChild("nuevaCamisetaTabs") tabs: Tabs;
  public formulario: any;
  formularioCrearCamiseta: FormGroup;
  private camisetaP : NuevacamisetaxcamisetaPage;
  private pacienteP : NuevacamisetaxpacientePage;
  public camiseta: any;
  public paciente: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.formularioCrearCamiseta = this.crearFormularioRegistrarCamiseta();
    this.formulario = this;
    this.camiseta = NuevacamisetaxcamisetaPage;
    this.paciente = NuevacamisetaxpacientePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevacamisetaPage');
  }

  private crearFormularioRegistrarCamiseta(){
    return this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      numeroserie: new FormControl ('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      codseg: new FormControl ('', Validators.required),
      icono: new FormControl ('', Validators.required),
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

  public getFormularioRegistrarCamiseta(){
    return this.formularioCrearCamiseta;
  }

  irInfo(){
    this.navCtrl.push(InfoPage);
  }

    /**
   * Método para ir de nuevo a la ventana de seleccion de la camiseta
   */
  irAtras(){
    this.navCtrl.pop();
  }

  public getCamisetaP(){
    return this.camisetaP;
  }

  public setCamisetaP(camisetaP:NuevacamisetaxcamisetaPage){
    this.camisetaP = camisetaP;
  }

  public getPacienteP(){
    return this.pacienteP;
  }

  public setPacienteP(pacienteP:NuevacamisetaxpacientePage){
    this.pacienteP = pacienteP;
  }

  

}
