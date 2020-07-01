import { Component } from '@angular/core';
import { NavController, Platform, NavParams} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { CamisetaPage } from '@pages/camiseta/camiseta';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { RestProvider} from '../../providers/rest-login/rest-login';
import { Storage } from '@ionic/storage';
import { MyApp } from '@app/app.component';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'page-registrofacebook',
  templateUrl: 'registrofacebook.html'
})
export class RegistroFacebookPage {
	
  public version: any;
  formularioLogin: FormGroup;
  readonly PATTERN_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[A-Za-z\\d\\W]{6,}$";
  readonly PATTERN_EMAIL = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  public redsocial: string;

  passwordTipo: string = 'password';
  passwordClass: string = 'fas fa-eye-slash fa-lg fa-fw';
  passwordTipoConfirmacion: string = 'password';
	passwordClassConfirmacion: string = 'fas fa-eye-slash fa-lg fa-fw';

  constructor(private menu: MenuController,
  public navCtrl: NavController, 
  public platform: Platform,
  public formBuilder: FormBuilder,
  private rest: RestProvider,
  private storage: Storage,
  private fcm: FCM,
  public navParams: NavParams) {
    this.formularioLogin = this.crearFormularioLogin();
    this.redsocial = this.navParams.get('red');
  }
  
  ionViewDidLoad(): void {	 
	  this.menu.swipeEnable(false);
  }
  
  navegarMain(){
    //quitamos la pagina de la pila
    this.storage.set("tokenfacebook",null);
    this.storage.set("usuariofacebook",null);
    this.storage.set("esFacebook","0");
    this.navCtrl.pop();
  }

  registro(){
    var redelegida = "1";
    if(this.redsocial=="facebook"){
      redelegida="1";  
    }
    if(this.redsocial=="google"){
      redelegida="2";
    }
    this.rest.registrar(MyApp.getNombreusuario(),this.formularioLogin.value.password,redelegida).then(data => {
      this.storage.set('nombreusuario', MyApp.getNombreusuario().toLowerCase());
      this.fcm.getToken().then(token => {
        //vamos a guardar el token tanto en el storage como en el backend
        this.storage.set("tokennotificacion",token);
        this.rest.registrarToken(MyApp.getNombreusuario(),token)
        });
      this.fcm.onTokenRefresh().subscribe(token => {
        this.storage.set("tokennotificacion",token);
        this.rest.registrarToken(MyApp.getNombreusuario(),token)
        });
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

  mostrarPassword() {
		this.passwordTipo = this.passwordTipo === 'text' ? 'password' : 'text';
		this.passwordClass = this.passwordClass === 'fas fa-eye-slash fa-lg fa-fw' ? 'fas fa-eye fa-lg fa-fw' : 'fas fa-eye-slash fa-lg fa-fw';
  }
  
  mostrarPasswordConfirmacion() {
		this.passwordTipoConfirmacion = this.passwordTipoConfirmacion === 'text' ? 'password' : 'text';
		this.passwordClassConfirmacion = this.passwordClassConfirmacion === 'fas fa-eye-slash fa-lg fa-fw' ? 'fas fa-eye fa-lg fa-fw' : 'fas fa-eye-slash fa-lg fa-fw';
	}

}
