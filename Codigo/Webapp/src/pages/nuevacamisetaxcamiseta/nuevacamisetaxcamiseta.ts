import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';
import { NuevacamisetaPage} from '@pages/nuevacamiseta/nuevacamiseta';
import { MyApp } from '@app/app.component';

/**
 * Generated class for the NuevacamisetaxcamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nuevacamisetaxcamiseta',
  templateUrl: 'nuevacamisetaxcamiseta.html',
})
export class NuevacamisetaxcamisetaPage {

  private nuevacamiseta:NuevacamisetaPage;
  
  imagen: string = 'grandmother';
  imagenes: Array<string> = ['grandmother', 'man', 'grandfather', 'old-man', 'couple', 'grandmother2', 'old-woman', 'old-man2', 'grandmother3', 'couple2'];

  constructor(public navCtrl: NavController, public navParams: NavParams,private rest: RestCamisetaProvider) {
    this.nuevacamiseta = this.navParams.get('formulario');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevacamisetaxcamisetaPage');
  }

  registrarCamiseta(){
    this.rest.registrarCamiseta(MyApp.getNombreusuario(), this.nuevacamiseta.getFormularioRegistrarCamiseta().value.nombre,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numeroserie,
    this.nuevacamiseta.getFormularioRegistrarCamiseta().value.codseg,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.icono,
    this.nuevacamiseta.getFormularioRegistrarCamiseta().value.fechanacimiento,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.sexo,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.telefono,
    this.nuevacamiseta.getFormularioRegistrarCamiseta().value.telefonocontacto,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.notas,
    this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numero,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.localidad,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.provincia,
    this.nuevacamiseta.getLatitud(), this.nuevacamiseta.getLongitud()).then(data => {
        alert("Camiseta creada exitosamente");
        this.nuevacamiseta.volverAtras();
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

  prepararImagenesIcono(numero) {
    if(numero > 50){ return; }
		setTimeout(() => {
      let buttonElements = document.querySelectorAll('div.alert-radio-group button');
			if (!buttonElements.length) {
				this.prepararImagenesIcono(numero+1);
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

}
