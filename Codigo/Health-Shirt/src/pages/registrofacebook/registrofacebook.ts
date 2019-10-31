import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { CamisetaPage } from '@pages/camiseta/camiseta';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { RestProvider} from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { MyApp } from '@app/app.component';

@Component({
  selector: 'page-registrofacebook',
  templateUrl: 'registrofacebook.html'
})
export class RegistroFacebookPage {
	
  public version: any;
  formularioLogin: FormGroup;
  readonly PATTERN_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[A-Za-z\\d\\W]{6,}$";
  readonly PATTERN_EMAIL = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"

  constructor(private menu: MenuController,
  public navCtrl: NavController, 
  public platform: Platform,
  public formBuilder: FormBuilder,
  private rest: RestProvider,
  private storage: Storage) {
    this.formularioLogin = this.crearFormularioLogin();
  }
  
  ionViewDidLoad(): void {	 
	  this.menu.swipeEnable(false);
  }
  
  navegarMain(){
    //quitamos la pagina de la pila
	  this.navCtrl.pop();
  }

  registro(){
    this.rest.registrar(MyApp.getNombreusuario(),this.formularioLogin.value.password,"1").then(data => {
      this.storage.set('nombreusuario', MyApp.getNombreusuario().toLowerCase());
      this.navCtrl.setRoot(CamisetaPage);
    }, error => {
      if (error.status === 409) {
        alert('Ya hay una cuenta con el email facilitado');
      } else {
        alert("No se ha podido registrar la cuenta");
      }
    })
  }
//, Validators.pattern(this.PATTERN_PASSWORD)
  private crearFormularioLogin(){
    return this.formBuilder.group({
      password: new FormControl ('', Validators.compose([Validators.required, Validators.pattern(this.PATTERN_PASSWORD)])),
      confirmarpassword: new FormControl ('',Validators.compose([Validators.required,this.coincidepassword('password')]))
    });
  }

  /**
   * Metodo que comprueba si el valor de los 2 passwords coincide
   */
  coincidepassword(passwordname: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      let isValid=control.root.value[passwordname]==input
      console.log(this.formularioLogin);
      if(!isValid){
        return { 'equalTo': {isValid} }
      }
      else
        return null;
      };
  }

}
