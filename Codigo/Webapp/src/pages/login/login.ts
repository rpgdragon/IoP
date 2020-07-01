import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { CamisetaPage } from '@pages/camiseta/camiseta';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestProvider} from '../../providers/rest-login/rest-login';
import { MyApp } from '@app/app.component';
import { Storage } from '@ionic/storage';
import { OlvidoPage } from '@pages/olvido/olvido';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	
  public version: any;
  formularioLogin: FormGroup;
  passwordTipo: string = 'password';
	passwordClass: string = 'fas fa-eye-slash fa-lg fa-fw';

  constructor(private menu: MenuController,
  public navCtrl: NavController, 
  public platform: Platform,
  public formBuilder: FormBuilder,
  private rest: RestProvider,
  private fcm: FCM,
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

  navegarOlvido(){
    this.navCtrl.push(OlvidoPage);
  }

  login(){
    this.rest.login(this.formularioLogin.value.email,this.formularioLogin.value.password).then(data => {
      MyApp.setNombreusuario(this.formularioLogin.value.email.toLowerCase());
      this.storage.set('nombreusuario', this.formularioLogin.value.email.toLowerCase());
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
      if (error.status === 403) {
        alert('El usuario y/o contraseña no son correctos');
      } else {
        alert("No se ha podido iniciar sesión");
      }
    })
  }

  private crearFormularioLogin(){
    return this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl ('', Validators.required)
    });
  }

  mostrarPassword() {
		this.passwordTipo = this.passwordTipo === 'text' ? 'password' : 'text';
		this.passwordClass = this.passwordClass === 'fas fa-eye-slash fa-lg fa-fw' ? 'fas fa-eye fa-lg fa-fw' : 'fas fa-eye-slash fa-lg fa-fw';
	}

}


