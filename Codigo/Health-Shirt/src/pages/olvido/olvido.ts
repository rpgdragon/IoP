import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestProvider} from '../../providers/rest/rest';

@Component({
  selector: 'page-olvido',
  templateUrl: 'olvido.html'
})
export class OlvidoPage {
	
  public version: any;
  formulario: FormGroup;

  constructor(private menu: MenuController,
    public navCtrl: NavController, 
  public platform: Platform,
  public formBuilder: FormBuilder,
  public rest: RestProvider) {
    this.formulario = this.crearFormularioLogin();
  }
  
  ionViewDidLoad(): void {	 
	  this.menu.swipeEnable(false);
  }
  
  navegarAtras(){
	  this.navCtrl.pop();
  }

  recuperarCuenta(){
    this.rest.recuperarCuenta(this.formulario.value.email).then(data => {
      alert("Mira tu correo y sigue las instrucciones");
      this.navCtrl.pop();
    },error=>{
      if(error.status===404){
        alert("El email introducido no pertenece a ninguna cuenta");
      }
      else{
        alert("No se ha podido enviar el email para recuperar la contraseña")
      }
      
    });
  }

  private crearFormularioLogin(){
    return this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }
  
}
