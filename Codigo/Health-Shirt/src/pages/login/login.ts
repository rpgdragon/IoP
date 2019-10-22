import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { InitPage } from '@pages/init/init';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public formBuilder: FormBuilder) {
    this.formularioLogin = this.crearFormularioLogin();
  }
  
  ionViewDidLoad(): void {	 
	  this.menu.swipeEnable(false);
  }
  
  navegarMain(){
	  this.navCtrl.setRoot(InitPage);
  }

  login(){
    console.log("Se ha invocado el login");
  }

  private crearFormularioLogin(){
    return this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
