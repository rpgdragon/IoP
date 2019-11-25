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

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private rest: RestCamisetaProvider) {
    this.formularioCrearCamiseta = this.crearFormularioRegistrarCamiseta();
    this.notificacionestemperatura = false;
    this.notificacioneseda = false;
    this.notificacionesecg = false;
    this.notificacionescaida = false;
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
      notificacionescaida: new FormControl ('', [])
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

  registrarCamiseta(){
    this.rest.registrarCamiseta(MyApp.getNombreusuario(), this.formularioCrearCamiseta.value.nombre,
    this.formularioCrearCamiseta.value.parentesco,this.formularioCrearCamiseta.value.numeroserie,
    this.formularioCrearCamiseta.value.codseg,this.formularioCrearCamiseta.value.icono,
    this.formularioCrearCamiseta.value.ecgminimo,this.formularioCrearCamiseta.value.ecgmaximo,
    this.formularioCrearCamiseta.value.edaminimo,this.formularioCrearCamiseta.value.edamaximo,
    this.formularioCrearCamiseta.value.temperaturaminimo,this.formularioCrearCamiseta.value.temperaturamaximo,
    this.formularioCrearCamiseta.value.notificacionesecg,this.formularioCrearCamiseta.value.notificacioneseda,
    this.formularioCrearCamiseta.value.notificacionestemperatura,this.formularioCrearCamiseta.value.notificacionescaida).then(data => {
        alert("Camiseta creada exitosamente");
        this.navCtrl.pop();
    }, error => {
      console.log(error);
      if (error.status === 404) {
        alert("La camiseta no existe o no coincide el código de seguridad");
      }
      else{
        if(error.status === 409){
          alert("Esta camisa ya ha sido registrada");
        }
        else{
          alert("No se ha podido registrar la camiseta");
        }
        
      }
     
    })
  }

}
