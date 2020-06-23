import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { ConstantesPage } from '@pages/constantes/constantes';
import { MyApp } from '@app/app.component';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


/**
 * Generated class for the CamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-camiseta',
  templateUrl: 'camiseta.html',
})
export class CamisetaPage {
  public listaCamisetas: any[];
  camisetaEncontrada = false;

  constructor(private menu: MenuController,public navCtrl: NavController, public navParams: NavParams,
            private rest: RestCamisetaProvider,private screenOrientation: ScreenOrientation) {
 
  }


  ionViewWillLoad() {
    this.menu.swipeEnable(true);
    this.screenOrientation.unlock();
    this.rest.listar(MyApp.getNombreusuario()).then((data:any) => {
      this.listaCamisetas = JSON.parse(data.mensaje);
      if(this.listaCamisetas!=[]){
        this.camisetaEncontrada = true;
      }
      else{
        this.camisetaEncontrada = false;
      }
    }, error=>{
      //si hay un error simplemente lo imprimimos por la consola
      console.log(error);
    })
  }

      /**
     * Abre la pantalla de las camisetas
     * @param camiseta Datos de la camiseta que hay que abrir
     */
    abrirCamiseta(camiseta) {
        this.navCtrl.push(ConstantesPage, { camiseta });
    }

}
