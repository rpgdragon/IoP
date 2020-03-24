import { Component,ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NavController, Platform, MenuController } from 'ionic-angular';
import { InitPage } from '@pages/init/init';
import { QueesPage } from '@pages/quees/quees';
import {App} from 'ionic-angular';
import { CamisetaPage } from '@pages/camiseta/camiseta';
import { LoginPage } from '@pages/login/login';
import { Storage } from '@ionic/storage';
import { OlvidoPage } from '@pages/olvido/olvido';
import { RegistroPage } from '@pages/registro/registro';
import { RegistroFacebookPage } from '@pages/registrofacebook/registrofacebook';
import { ConfiguracionPage } from '@pages/configuracion/configuracion';
import { InfoPage } from '@pages/info/info';
import { CrearcamisetaPage } from '@pages/crearcamiseta/crearcamiseta';
import { EditarcamisetaPage } from '@pages/editarcamiseta/editarcamiseta';
import { FCM } from '@ionic-native/fcm/ngx';
import { RestProvider } from '../providers/rest/rest';
import { ConstantesPage } from '@pages/constantes/constantes';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage: any = InitPage;
	@ViewChild('myNav') nav: NavController;
	private static nombreusuario = '';
  
    constructor(
		public app: App,
        public splashScreen: SplashScreen,
        public platform: Platform, 
		private menu: MenuController,
		private storage: Storage,
		private fcm: FCM,
		private rest: RestProvider,
		public facebook: Facebook,
		public google: GooglePlus
    ) {
		this.platform.ready().then(() => {
			//creamos una acccion asociada 
			this.fcm.onNotification().subscribe(data => {
				setTimeout(() => this.redirigirNotificacion(data), 500);
				//comprobamos si esta logado o no
			  });

			this.storage.get('nombreusuario').then((val) => {
				if(val==null || val=='undefined' || val==''){
					this.redirigirInit();
				}
				else{
					MyApp.nombreusuario = val;
					this.fcm.getToken().then(token => {
						//vamos a guardar el token tanto en el storage como en el backend
						this.storage.set("tokennotificacion",token);
						this.rest.registrarToken(MyApp.nombreusuario,token)
					  });
					this.fcm.onTokenRefresh().subscribe(token => {
						this.storage.set("tokennotificacion",token);
						this.rest.registrarToken(MyApp.nombreusuario,token)
					  });
					this.redirigirCamiseta();
				}
			});
			
        });
	}
	
	redirigirNotificacion(data){
		this.storage.get('nombreusuario').then((val) => {
			if(data['tipo']=="bateria"){
				//la bateria se redirige siempre a la vista de camisetas
				this.redirigirCamiseta();
			}

			if(data['tipo']=="caida"){
				this.redirigirConstantes(data['idcamiseta'],data['nombre'],data['numeroserie'],null,data.wasTapped);
			}

			if(data['tipo']=="temperatura"){
				this.redirigirConstantes(data['idcamiseta'],data['nombre'],data['numeroserie'],"temperatura",data.wasTapped);
			}
			if(data['tipo']=="ecg"){
				this.redirigirConstantes(data['idcamiseta'],data['nombre'],data['numeroserie'],"ecg",data.wasTapped);
			}
			if(data['tipo']=="eda"){
				this.redirigirConstantes(data['idcamiseta'],data['nombre'],data['numeroserie'],"eda",data.wasTapped);
			}
		});
	}
	
    go(name){
        switch(name){
            case 'init':
				this.rootPage = InitPage;
				this.nav.setRoot(InitPage);
				this.storage.set("nombreusuario",null);
				this.storage.set("tokenfacebook",null);
				this.storage.set("usuariofacebook",null);
				this.storage.set("esFacebook",null);
				this.storage.set("usuariogoogle",null);
				this.storage.set("esGoogle",null);
				this.facebook.logout().then(()=> console.log("Eliminado login Facebook"));
				this.google.logout().then(()=> console.log("Eliminado login Google"));
                break;
			case 'quees':
				this.rootPage = QueesPage;
				this.nav.setRoot(QueesPage);
				break;
			case 'camiseta':
				this.rootPage = CamisetaPage;
				this.nav.setRoot(CamisetaPage);
				break;
			case 'login':
				this.rootPage = LoginPage;
				this.nav.setRoot(LoginPage);
				break;
			case 'olvido':
				this.rootPage = OlvidoPage;
				this.nav.setRoot(OlvidoPage);
				break;
			case 'registro':
				this.rootPage = RegistroPage;
				this.nav.setRoot(RegistroPage);
				break;
			case 'registrofacebook':
				this.rootPage = RegistroFacebookPage;
				this.nav.setRoot(RegistroFacebookPage);
				break;
			case 'configuracion':
				this.rootPage = CamisetaPage;
				this.nav.push(ConfiguracionPage);
				break;
			case 'info':
				this.rootPage = InfoPage;
				this.nav.setRoot(InfoPage);
				break;
			case 'crearcamiseta':
				this.rootPage = CrearcamisetaPage;
				this.nav.setRoot(CrearcamisetaPage);
				break;
			case 'editarcamiseta':
				this.rootPage = EditarcamisetaPage;
				this.nav.setRoot(EditarcamisetaPage);
				break;
        }
        this.menu.close();        
	}
		
	private redirigirInit(){
		console.log("Redirigiendo a Init");
		this.splashScreen.hide();
		this.rootPage = InitPage;
	}

	private redirigirCamiseta(){
		console.log("Redirigiendo a Camiseta");
		this.splashScreen.hide();
		this.rootPage = CamisetaPage;
	}

	private redirigirConstantes(idcamiseta, nombre, numeroserie, pagina,modo){
		console.log("Redirigiendo a Constantes");
		//creamos un objeto camiseta
		var camiseta = {};
		camiseta["id"] = idcamiseta;
		camiseta["numeroserie"] = numeroserie;
		camiseta['nombre'] = nombre;
		if(this.nav.getActive().name=='ConstantesPage'){
			//si esta en la pagina de constantes no hay que hacer nada
			return;
		}
		if(modo){
			this.nav.setRoot(ConstantesPage, { camiseta: camiseta, pagina: pagina  });
		}
		else{
			this.nav.push(ConstantesPage, { camiseta: camiseta, pagina: pagina  })
		}
	}
	
    logout(){
		this.storage.set("nombreusuario",null);
		this.storage.set("tokenfacebook",null);
		this.storage.set("esFacebook","0");
		this.storage.set("usuariogoogle",null);
        this.storage.set("esGoogle",null);
		this.storage.set("usuariofacebook",null);
		this.facebook.logout().then(()=> console.log("Eliminado login Facebook"));
		this.google.logout().then(()=> console.log("Eliminado login Google"));
		this.platform.exitApp();
		
    }
	
	public get staticnombreusuario() {
		return MyApp.nombreusuario;
	}
	
	public static getNombreusuario() {
		return MyApp.nombreusuario;
	}

	public static setNombreusuario(nombreusuario) {
		MyApp.nombreusuario = nombreusuario;
	}

}
