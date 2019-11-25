import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '@pages/info/info';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';
import { MyApp } from '@app/app.component';

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

  formularioEditarCamiseta: FormGroup;
  imagenes: Array<string> = ['grandmother', 'man', 'grandfather', 'old-man', 'couple', 'grandmother2', 'old-woman', 'old-man2', 'grandmother3', 'couple2'];
  imagen: string = 'grandmother';
  notificacionesecg: boolean;
  notificacioneseda: boolean;
  notificacionestemperatura: boolean;
  notificacionescaida: boolean;
  camiseta: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private rest: RestCamisetaProvider) {
    this.camiseta = this.navParams.get('camiseta');
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
    console.log(this.camiseta["notificacionescaida"]);
    //vamos a obtener la ultima parte de la url y quitar el .png del final
    var lastpartsrc = this.camiseta["src"].split("/").pop();
    this.imagen = lastpartsrc.split(".")[0];
    console.log(this.imagen);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarcamisetaPage');
  }

  ionViewWillEnter(){
    //hay que colocar los datos iniciales de la camiseta

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
      parentesco: new FormControl ('', Validators.required),
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

  editarCamiseta(){
    if(!this.validarCamposMinimoMaximo()){
      return;
    }
    this.rest.editarCamiseta(MyApp.getNombreusuario(), this.camiseta["id"], this.formularioEditarCamiseta.value.nombre,
    this.formularioEditarCamiseta.value.parentesco,this.formularioEditarCamiseta.value.icono,
    this.formularioEditarCamiseta.value.ecgminimo,this.formularioEditarCamiseta.value.ecgmaximo,
    this.formularioEditarCamiseta.value.edaminimo,this.formularioEditarCamiseta.value.edamaximo,
    this.formularioEditarCamiseta.value.temperaturaminimo,this.formularioEditarCamiseta.value.temperaturamaximo,
    this.formularioEditarCamiseta.value.notificacionesecg,this.formularioEditarCamiseta.value.notificacioneseda,
    this.formularioEditarCamiseta.value.notificacionestemperatura,this.formularioEditarCamiseta.value.notificacionescaida).then(data => {
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

  validarCamposMinimoMaximo(){
    var ecgminimorelleno = false;
    var ecgmaximorelleno = false;
    var edaminimorelleno = false;
    var edamaximorelleno = false;
    var temperaturaminimorelleno = false;
    var temperaturamaximorelleno = false;
    if(this.formularioEditarCamiseta.value.ecgminimo!='' && this.formularioEditarCamiseta.value.ecgminimo!=null && this.formularioEditarCamiseta.value.ecgminimo!=undefined){
      if(isNaN(this.formularioEditarCamiseta.value.ecgminimo)){
        alert("El campo ECG minimo debe rellenarse con un número");
        return false;
      }
      ecgminimorelleno = true;
    }

    if(this.formularioEditarCamiseta.value.ecgmaximo!='' && this.formularioEditarCamiseta.value.ecgmaximo!=null && this.formularioEditarCamiseta.value.ecgmaximo!=undefined){
      if(isNaN(this.formularioEditarCamiseta.value.ecgmaximo)){
        alert("El campo ECG máximo debe rellenarse con un número");
        return false;
      }
      ecgmaximorelleno = true;
    }

    if(this.formularioEditarCamiseta.value.edaminimo!='' && this.formularioEditarCamiseta.value.edaminimo!=null && this.formularioEditarCamiseta.value.edaminimo!=undefined){
      if(isNaN(this.formularioEditarCamiseta.value.edaminimo)){
        alert("El campo EDA minimo debe rellenarse con un número");
        return false;
      }
      edaminimorelleno = true;
    }

    if(this.formularioEditarCamiseta.value.edamaximo!='' && this.formularioEditarCamiseta.value.edamaximo!=null && this.formularioEditarCamiseta.value.edamaximo!=undefined){
      if(isNaN(this.formularioEditarCamiseta.value.ecgmaximo)){
        alert("El campo EDA máximo debe rellenarse con un número");
        return false;
      }
      edamaximorelleno = true;
    }

    if(this.formularioEditarCamiseta.value.temperaturaminimo!='' && this.formularioEditarCamiseta.value.temperaturaminimo!=null && this.formularioEditarCamiseta.value.temperaturaminimo!=undefined){
      if(isNaN(this.formularioEditarCamiseta.value.temperaturaminimo)){
        alert("El campo Temperatura minimo debe rellenarse con un número");
        return false;
      }
      temperaturaminimorelleno = true;
    }

    if(this.formularioEditarCamiseta.value.temperaturamaximo!='' && this.formularioEditarCamiseta.value.temperaturamaximo!=null && this.formularioEditarCamiseta.value.temperaturamaximo!=undefined){
      if(isNaN(this.formularioEditarCamiseta.value.temperaturamaximo)){
        alert("El campo Temperatura máximo debe rellenarse con un número");
        return false;
      }
      temperaturamaximorelleno = true;
    }

    if(ecgminimorelleno && ecgmaximorelleno){
      var v1 = Number(this.formularioEditarCamiseta.value.ecgminimo);
      var v2 = Number(this.formularioEditarCamiseta.value.ecgmaximo);
      if(v1 > v2){
        alert("El umbral minimo de ECG no puede ser superior al umbral máximo");
        return false;
      }
    }

    if(edaminimorelleno && edamaximorelleno){
      var v3 = Number(this.formularioEditarCamiseta.value.edaminimo);
      var v4 = Number(this.formularioEditarCamiseta.value.edamaximo);
      if(v3 > v4){
        alert("El umbral minimo de EDA no puede ser superior al umbral máximo");
        return false;
      }
    }

    if(temperaturaminimorelleno && temperaturamaximorelleno){
      var v5 = Number(this.formularioEditarCamiseta.value.temperaturaminimo);
      var v6 = Number(this.formularioEditarCamiseta.value.temperaturamaximo);
      if(v5 > v6){
        alert("El umbral minimo de Temperatura no puede ser superior al umbral máximo");
        return false;
      }
    }
    return true;
  }

}
