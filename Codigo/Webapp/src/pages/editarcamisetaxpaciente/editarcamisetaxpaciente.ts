import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditarcamisetaPage} from '@pages/editarcamiseta/editarcamiseta';
import { GeolocalizacionProvider} from '../../providers/rest-geolocalizacion/rest-geolocalizacion';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { LoadingController} from 'ionic-angular';


/**
 * Generated class for the EditarcamisetaxpacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const DEFAULT_LATITUD = 36.731368;
const DEFAULT_LONGITUD = -4.565551;

@Component({
  selector: 'page-editarcamisetaxpaciente',
  templateUrl: 'editarcamisetaxpaciente.html',
})
export class EditarcamisetaxpacientePage {
  private editarcamiseta:EditarcamisetaPage;
  public camiseta:Object;
  private map: GoogleMap;
  private marker: Marker;

  constructor(public navCtrl: NavController, public navParams: NavParams,private georest: GeolocalizacionProvider,
    public loadingController: LoadingController) {
    this.editarcamiseta = this.navParams.get('formulario');
    this.camiseta = this.editarcamiseta.getCamiseta();
    console.log(this.editarcamiseta.getLatitud());
    console.log(this.editarcamiseta.getLongitud());
    if(this.editarcamiseta.getLatitud()==undefined || this.editarcamiseta.getLatitud()==null){
      this.editarcamiseta.setLatitud(DEFAULT_LATITUD);
    }
    if(this.editarcamiseta.getLongitud()==undefined || this.editarcamiseta.getLongitud()==null){
      this.editarcamiseta.setLongitud(DEFAULT_LONGITUD);
    }    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarcamisetaxpacientePage');
    this.loadMap();
  }

  editarCamiseta(){
    this.editarcamiseta.editarCamiseta();
  }

  loadMap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '',
      'API_KEY_FOR_BROWSER_DEBUG': ''
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.editarcamiseta.getLatitud(),
           lng:  this.editarcamiseta.getLongitud()
         },
         zoom: 18,
         tilt: 30
       }
    };
    if(this.map==null || this.map==undefined){
      this.map = GoogleMaps.create('canvas_map', mapOptions);
    }
    else{
      this.map.setOptions(mapOptions);
      if(this.marker!=null && this.marker!=undefined){
        this.marker.remove();
      }
    }

    if(this.editarcamiseta.getFormularioEditarCamiseta().value.calle!='' &&
        this.editarcamiseta.getFormularioEditarCamiseta().value.calle!=undefined ){
    this.marker = this.map.addMarkerSync({
      title: this.editarcamiseta.getFormularioEditarCamiseta().value.calle + ' ' + this.editarcamiseta.getFormularioEditarCamiseta().value.numero + ', ' + this.editarcamiseta.getFormularioEditarCamiseta().value.localidad + '(' + this.editarcamiseta.getFormularioEditarCamiseta().value.provincia + ')',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.editarcamiseta.getLatitud(),
        lng:  this.editarcamiseta.getLongitud()
      }
    });
  }
  }

  async calcularPosicion(){
    var mensaje = '';
    if(this.editarcamiseta.getFormularioEditarCamiseta().value.calle==null || this.editarcamiseta.getFormularioEditarCamiseta().value.calle=='' || this.editarcamiseta.getFormularioEditarCamiseta().value.calle==undefined){
      mensaje = mensaje + "Debe definir la calle. ";
    }
    if(this.editarcamiseta.getFormularioEditarCamiseta().value.numero==null || this.editarcamiseta.getFormularioEditarCamiseta().value.numero=='' || this.editarcamiseta.getFormularioEditarCamiseta().value.numero==undefined){
      mensaje = mensaje + "Debe definir el numero. ";
    }
    if(this.editarcamiseta.getFormularioEditarCamiseta().value.localidad==null || this.editarcamiseta.getFormularioEditarCamiseta().value.localidad=='' || this.editarcamiseta.getFormularioEditarCamiseta().value.localidad==undefined){
      mensaje = mensaje + "Debe definir la localidad. ";
    }
    if(this.editarcamiseta.getFormularioEditarCamiseta().value.provincia==null || this.editarcamiseta.getFormularioEditarCamiseta().value.provincia=='' || this.editarcamiseta.getFormularioEditarCamiseta().value.provincia==undefined){
      mensaje = mensaje + "Debe definir la provincia. ";
    }

    if(mensaje != ''){
      alert(mensaje);
    }
    else{
      const loading = await this.loadingController.create({
        content: "Espere por favor..."
      });
  
      loading.present();
      this.georest.geolocalizar(this.editarcamiseta.getFormularioEditarCamiseta().value.calle,this.editarcamiseta.getFormularioEditarCamiseta().value.numero,this.editarcamiseta.getFormularioEditarCamiseta().value.localidad,this.editarcamiseta.getFormularioEditarCamiseta().value.provincia).then((data:any) => {
        var coordenadas = JSON.parse(data.mensaje);
        this.editarcamiseta.setLatitud(coordenadas['lat']);
        this.editarcamiseta.setLongitud(coordenadas['lng']);
        this.loadMap();
        loading.dismiss();       
      }, error => {
        if(error.status===400){
          alert("Petición mal creada. Actualice la aplicación");
        }
        if(error.status===500){
          alert("No se ha podido geolocalizar la dirección. Intentelo de nuevo más tarde");
        }
        if(error.status===404){
          alert("La dirección indicada no se ha podido encontrar. Por favor compruebe que los datos introducidos son correctos");
        }
        loading.dismiss();  
      });
    }
  }

}
