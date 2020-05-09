import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '@pages/info/info';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';
import { MyApp } from '@app/app.component';

/**
 * Generated class for the CrearcamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-crearcamiseta',
  templateUrl: 'crearcamiseta.html',
})
export class CrearcamisetaPage {

  formularioCrearCamiseta: FormGroup;
  imagenes: Array<string> = ['grandmother', 'man', 'grandfather', 'old-man', 'couple', 'grandmother2', 'old-woman', 'old-man2', 'grandmother3', 'couple2'];
  imagen: string = 'grandmother';
  notificacionesecg: boolean;
  notificacioneseda: boolean;
  notificacionestemperatura: boolean;
  notificacionescaida: boolean;
  escondeme: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private rest: RestCamisetaProvider) {
    this.formularioCrearCamiseta = this.crearFormularioRegistrarCamiseta();
    this.notificacionestemperatura = false;
    this.notificacioneseda = false;
    this.notificacionesecg = false;
    this.notificacionescaida = false;
    this.escondeme = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearcamisetaPage');
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

  private crearFormularioRegistrarCamiseta(){
    return this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      parentesco: new FormControl ('', Validators.required),
      numeroserie: new FormControl ('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      codseg: new FormControl ('', Validators.required),
      icono: new FormControl ('', Validators.required),
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
      direccion: new FormControl('',[])
    });
  }

  prepararImagenesIcono() {
		setTimeout(() => {
      let buttonElements = document.querySelectorAll('div.alert-radio-group button');
      console.log(buttonElements);
			if (!buttonElements.length) {
				this.prepararImagenesIcono();
			} else {
				for (let index = 0; index < buttonElements.length; index++) {
          let buttonElement = buttonElements[index];
          console.log(buttonElement);
					let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
          let image = optionLabelElement.innerHTML.trim();
          console.log(image);
					buttonElement.classList.add('imageselect', 'image_' + image);
					if (image == this.imagen) {
						buttonElement.classList.add('imageselected');
					}
				}
			}
		}, 100);
  }
  
  ponerImagen(imagen) {
    let buttonElements = document.querySelectorAll('div.alert-radio-group button.imageselect');
    console.log(buttonElements);
		for (let index = 0; index < buttonElements.length; index++) {
			let buttonElement = buttonElements[index];
			buttonElement.classList.remove('imageselected');
			if (buttonElement.classList.contains('image_' + imagen)) {
				buttonElement.classList.add('imageselected');
			}
		}
  }
  
  selectIcono(imagen){
    this.imagen = imagen;
  }

  

  validarCamposMinimoMaximo(){
    var ecgminimorelleno = false;
    var ecgmaximorelleno = false;
    var edaminimorelleno = false;
    var edamaximorelleno = false;
    var temperaturaminimorelleno = false;
    var temperaturamaximorelleno = false;
    if(this.formularioCrearCamiseta.value.ecgminimo!='' && this.formularioCrearCamiseta.value.ecgminimo!=null && this.formularioCrearCamiseta.value.ecgminimo!=undefined){
      if(isNaN(this.formularioCrearCamiseta.value.ecgminimo)){
        alert("El campo ECG minimo debe rellenarse con un número");
        return false;
      }
      ecgminimorelleno = true;
    }

    if(this.formularioCrearCamiseta.value.ecgmaximo!='' && this.formularioCrearCamiseta.value.ecgmaximo!=null && this.formularioCrearCamiseta.value.ecgmaximo!=undefined){
      if(isNaN(this.formularioCrearCamiseta.value.ecgmaximo)){
        alert("El campo ECG máximo debe rellenarse con un número");
        return false;
      }
      ecgmaximorelleno = true;
    }

    if(this.formularioCrearCamiseta.value.edaminimo!='' && this.formularioCrearCamiseta.value.edaminimo!=null && this.formularioCrearCamiseta.value.edaminimo!=undefined){
      if(isNaN(this.formularioCrearCamiseta.value.edaminimo)){
        alert("El campo EDA minimo debe rellenarse con un número");
        return false;
      }
      edaminimorelleno = true;
    }

    if(this.formularioCrearCamiseta.value.edamaximo!='' && this.formularioCrearCamiseta.value.edamaximo!=null && this.formularioCrearCamiseta.value.edamaximo!=undefined){
      if(isNaN(this.formularioCrearCamiseta.value.ecgmaximo)){
        alert("El campo EDA máximo debe rellenarse con un número");
        return false;
      }
      edamaximorelleno = true;
    }

    if(this.formularioCrearCamiseta.value.temperaturaminimo!='' && this.formularioCrearCamiseta.value.temperaturaminimo!=null && this.formularioCrearCamiseta.value.temperaturaminimo!=undefined){
      if(isNaN(this.formularioCrearCamiseta.value.temperaturaminimo)){
        alert("El campo Temperatura minimo debe rellenarse con un número");
        return false;
      }
      temperaturaminimorelleno = true;
    }

    if(this.formularioCrearCamiseta.value.temperaturamaximo!='' && this.formularioCrearCamiseta.value.temperaturamaximo!=null && this.formularioCrearCamiseta.value.temperaturamaximo!=undefined){
      if(isNaN(this.formularioCrearCamiseta.value.temperaturamaximo)){
        alert("El campo Temperatura máximo debe rellenarse con un número");
        return false;
      }
      temperaturamaximorelleno = true;
    }

    if(ecgminimorelleno && ecgmaximorelleno){
      var v1 = Number(this.formularioCrearCamiseta.value.ecgminimo);
      var v2 = Number(this.formularioCrearCamiseta.value.ecgmaximo);
      if(v1 > v2){
        alert("El umbral minimo de ECG no puede ser superior al umbral máximo");
        return false;
      }
    }

    if(edaminimorelleno && edamaximorelleno){
      var v3 = Number(this.formularioCrearCamiseta.value.edaminimo);
      var v4 = Number(this.formularioCrearCamiseta.value.edamaximo);
      if(v3 > v4){
        alert("El umbral minimo de EDA no puede ser superior al umbral máximo");
        return false;
      }
    }

    if(temperaturaminimorelleno && temperaturamaximorelleno){
      var v5 = Number(this.formularioCrearCamiseta.value.temperaturaminimo);
      var v6 = Number(this.formularioCrearCamiseta.value.temperaturamaximo);
      if(v5 > v6){
        alert("El umbral minimo de Temperatura no puede ser superior al umbral máximo");
        return false;
      }
    }
    return true;
  }

  mostrarAvanzados(){
    this.escondeme = true;
  }

}
