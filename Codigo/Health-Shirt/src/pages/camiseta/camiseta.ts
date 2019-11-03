import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { ConstantesPage } from '@pages/constantes/constantes';
import { MyApp } from '@app/app.component';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';


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
            private rest: RestCamisetaProvider) {
 
  }


  ionViewWillLoad() {
    this.menu.swipeEnable(true);
    this.rest.listar(MyApp.getNombreusuario()).then(data => {
      console.log(data);
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
