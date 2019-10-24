import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { InitPage } from '@pages/init/init';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestProvider} from '../../providers/rest/rest';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	
  public version: any;
  formularioLogin: FormGroup;

  constructor(private menu: MenuController,
  public navCtrl: NavController, 
  public platform: Platform,
  public formBuilder: FormBuilder,
  private rest: RestProvider) {
    this.formularioLogin = this.crearFormularioLogin();
  }
  
  ionViewDidLoad(): void {	 
	  this.menu.swipeEnable(false);
  }
  
  navegarMain(){
	  this.navCtrl.setRoot(InitPage);
  }

  login(){
    this.rest.login(this.formularioLogin.value.email,this.formularioLogin.value.password);
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

}
