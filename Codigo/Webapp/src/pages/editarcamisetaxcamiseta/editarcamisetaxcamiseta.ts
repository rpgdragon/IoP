import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditarcamisetaPage} from '@pages/editarcamiseta/editarcamiseta';


/**
 * Generated class for the EditarcamisetaxcamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editarcamisetaxcamiseta',
  templateUrl: 'editarcamisetaxcamiseta.html',
})
export class EditarcamisetaxcamisetaPage {

  private editarcamiseta:EditarcamisetaPage;
  public camiseta:Object;
  imagen: string = 'grandmother';
  imagenes: Array<string> = ['grandmother', 'man', 'grandfather', 'old-man', 'couple', 'grandmother2', 'old-woman', 'old-man2', 'grandmother3', 'couple2'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.editarcamiseta = this.navParams.get('formulario');
    this.camiseta = this.editarcamiseta.getCamiseta();
    //vamos a obtener la ultima parte de la url y quitar el .png del final
    var lastpartsrc = this.camiseta["src"].split("/").pop();
    this.imagen = lastpartsrc.split(".")[0];
    console.log(this.imagen);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarcamisetaxcamisetaPage');
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

  editarCamiseta(){
    this.editarcamiseta.editarCamiseta();
  }

  

}
