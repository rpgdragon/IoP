import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestCamisetaProvider} from '../../providers/rest-camiseta/rest-camiseta';
import { GeolocalizacionProvider} from '../../providers/geolocalizacion/geolocalizacion';
import { NuevacamisetaPage} from '@pages/nuevacamiseta/nuevacamiseta';
import { MyApp } from '@app/app.component';
import { LoadingController} from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

/**
 * Generated class for the NuevacamisetaxpacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 const DEFAULT_LATITUD = 36.731368;
 const DEFAULT_LONGITUD = -4.565551;

@Component({
  selector: 'page-nuevacamisetaxpaciente',
  templateUrl: 'nuevacamisetaxpaciente.html',
})
export class NuevacamisetaxpacientePage {
  private nuevacamiseta:NuevacamisetaPage;
  private map: GoogleMap;
  private marker: Marker;

  constructor(public navCtrl: NavController, public navParams: NavParams,private rest: RestCamisetaProvider,private georest: GeolocalizacionProvider,
    public loadingController: LoadingController) {
    this.nuevacamiseta = this.navParams.get('formulario');
    this.nuevacamiseta.setLatitud(DEFAULT_LATITUD);
    this.nuevacamiseta.setLongitud(DEFAULT_LONGITUD);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevacamisetaxpacientePage');
    this.loadMap();
  }

  loadMap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAi6Z9rjV6H8PTJSCwwrxJqYZTuQ7P-5Qw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAi6Z9rjV6H8PTJSCwwrxJqYZTuQ7P-5Qw'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.nuevacamiseta.getLatitud(),
           lng:  this.nuevacamiseta.getLongitud()
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

    if(this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle!='' &&
        this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle!=undefined ){
    this.marker = this.map.addMarkerSync({
      title: this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle + ' ' + this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numero + ', ' + this.nuevacamiseta.getFormularioRegistrarCamiseta().value.localidad + '(' + this.nuevacamiseta.getFormularioRegistrarCamiseta().value.provincia + ')',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.nuevacamiseta.getLatitud(),
        lng:  this.nuevacamiseta.getLongitud()
      }
    });
  }
  }

  registrarCamiseta(){
    this.rest.registrarCamiseta(MyApp.getNombreusuario(), this.nuevacamiseta.getFormularioRegistrarCamiseta().value.nombre,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numeroserie,
    this.nuevacamiseta.getFormularioRegistrarCamiseta().value.codseg,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.icono,
    this.nuevacamiseta.getFormularioRegistrarCamiseta().value.fechanacimiento,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.sexo,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.telefono,
    this.nuevacamiseta.getFormularioRegistrarCamiseta().value.telefonocontacto,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.notas,
    this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numero,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.localidad,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.provincia,
    this.nuevacamiseta.getLatitud(), this.nuevacamiseta.getLongitud()).then(data => {
        alert("Camiseta creada exitosamente");
        this.nuevacamiseta.volverAtras();
    }, error => {
      console.log(error);
      if (error.status === 404) {
        alert("La camiseta no existe o no coincide el código de seguridad");
      }
      else{
        if(error.status === 409){
          alert("Esta camisa ya ha sido registrada");
        }
        else{
          alert("No se ha podido registrar la camiseta");
        }
        
      }
     
    })
  }

  async calcularPosicion(){
    var mensaje = '';
    if(this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle==null || this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle=='' || this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle==undefined){
      mensaje = mensaje + "Debe definir la calle. ";
    }
    if(this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numero==null || this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numero=='' || this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numero==undefined){
      mensaje = mensaje + "Debe definir el numero. ";
    }
    if(this.nuevacamiseta.getFormularioRegistrarCamiseta().value.localidad==null || this.nuevacamiseta.getFormularioRegistrarCamiseta().value.localidad=='' || this.nuevacamiseta.getFormularioRegistrarCamiseta().value.localidad==undefined){
      mensaje = mensaje + "Debe definir la localidad. ";
    }
    if(this.nuevacamiseta.getFormularioRegistrarCamiseta().value.provincia==null || this.nuevacamiseta.getFormularioRegistrarCamiseta().value.provincia=='' || this.nuevacamiseta.getFormularioRegistrarCamiseta().value.provincia==undefined){
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
      this.georest.geolocalizar(this.nuevacamiseta.getFormularioRegistrarCamiseta().value.calle,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.numero,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.localidad,this.nuevacamiseta.getFormularioRegistrarCamiseta().value.provincia).then((data:any) => {
        var coordenadas = JSON.parse(data.mensaje);
        this.nuevacamiseta.setLatitud(coordenadas['lat']);
        this.nuevacamiseta.setLongitud(coordenadas['lng']);
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
