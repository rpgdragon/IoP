import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { ConstantesPage } from '@pages/constantes/constantes';
import { MyApp } from '@app/app.component';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CrearcamisetaPage } from '@pages/crearcamiseta/crearcamiseta';
import { EditarcamisetaPage } from '@pages/editarcamiseta/editarcamiseta';


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
  }

  /**
   * Cada vez que entre dentro de esta vista deberia refrescar los datos del listado de las camisetas
   */
  ionViewWillEnter(){
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

    editarCamiseta(camiseta){
      this.navCtrl.push(EditarcamisetaPage, { camiseta });
    }

    borrarCamiseta(camiseta){
      console.log("Se ha borrado la Camiseta: " + camiseta);
    }

    crearCamiseta(){
      this.navCtrl.push(CrearcamisetaPage);
    }

}
