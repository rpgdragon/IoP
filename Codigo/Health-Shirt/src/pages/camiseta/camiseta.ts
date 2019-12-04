import { Component } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
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
  private refresher: Refresher;

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
    this.recargarLista();
    
  }

  recargarLista(){
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
      //invocamos al proceso de borrar la camiseta
      this.rest.borrar(MyApp.getNombreusuario(), camiseta.id).then((data:any) => {
        //si ha ido todo bien recargamos la lista
        this.recargarLista();
      }, error=>{
        //si hay un error simplemente lo imprimimos por la consola
        alert("No se ha podido borrar la camiseta. Vuelva a intentarlo más tarde.");
        console.log(error);
      })
    }

    crearCamiseta(){
      this.navCtrl.push(CrearcamisetaPage);
    }

    /**
	 * Función que recibe el evento de refrescar la pantalla
	 * @param event 
	 */
	refrescar(event: Refresher) {
		this.refresher = event;
		this.rest.listar(MyApp.getNombreusuario()).then((data:any) => {
      this.listaCamisetas = JSON.parse(data.mensaje);
      if(this.listaCamisetas!=[]){
        this.camisetaEncontrada = true;
      }
      else{
        this.camisetaEncontrada = false;
      }
      if (this.refresher !== undefined && this.refresher != null) {
        this.refresher.complete();
      }
    }, error=>{
      //si hay un error simplemente lo imprimimos por la consola
      console.log(error);
      if (this.refresher !== undefined && this.refresher != null) {
        this.refresher.complete();
      }
    })
  }
}
