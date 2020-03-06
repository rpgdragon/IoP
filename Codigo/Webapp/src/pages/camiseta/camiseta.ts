import { Component } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';
import { ConstantesPage } from '@pages/constantes/constantes';
import { MyApp } from '@app/app.component';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CrearcamisetaPage } from '@pages/crearcamiseta/crearcamiseta';
import { EditarcamisetaPage } from '@pages/editarcamiseta/editarcamiseta';
import { InitPage } from '@pages/init/init';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';


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
            private rest: RestCamisetaProvider,private screenOrientation: ScreenOrientation, private storage: Storage,
            private facebook: Facebook) {
 
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
    //recuperamos si hay un token de Facebook
    Promise.all([this.storage.get("tokenfacebook"), this.storage.get("usuariofacebook")]).then(values => {
      if(values==null  || values[0]==null || values[1]==null || values[0]=='undefined' || values[1]=='undefined'
      || values[0]=='' || values[1]==''){
        return;
      }
      else{
        //comprobamos si el token sigue siendo valido
        this.facebook.getLoginStatus().then((res: FacebookLoginResponse) => {
          var tiempo = +res.authResponse.expiresIn;
          console.log(values[0]);
          console.log(values[1]);
          console.log(res);
          if(res.status!='connected' || res.authResponse.accessToken!=values[0] || tiempo <= 0 || res.authResponse.userID!=values[1]){
            alert("Sesion en Facebook terminada. Debe volver a conectarse a la aplicación");
            this.storage.set("nombreusuario",null);
            this.storage.set("tokenfacebook",null);
            this.storage.set("esFacebook","0");
            this.navCtrl.setRoot(InitPage);
          }
        })
        .catch(e => {console.log('Error al revisar conexion Facebook', e);
        alert("Sesion en Facebook terminada. Debe volver a conectarse a la aplicación");
        				this.storage.set("nombreusuario",null);
				this.storage.set("tokenfacebook",null);
				this.storage.set("esFacebook","0");
        this.navCtrl.setRoot(InitPage);
      });
      }
    }); 
    
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
