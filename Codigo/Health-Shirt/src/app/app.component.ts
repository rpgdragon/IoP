import { Component,ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NavController, Platform, MenuController } from 'ionic-angular';
import { InitPage } from '@pages/init/init';
import { QueesPage } from '@pages/quees/quees';
import {App} from 'ionic-angular';
import { CamisetaPage } from '@pages/camiseta/camiseta';
import { LoginPage } from '@pages/login/login';
import { Storage } from '@ionic/storage';

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
		private storage: Storage
    ) {
		this.platform.ready().then(() => {
			this.storage.get('nombreusuario').then((val) => {
				if(val==null || val=='undefined' || val==''){
					this.redirigirInit();
				}
				else{
					MyApp.nombreusuario = val;
					this.redirigirCamiseta();
				}
			});
			
        });
    }
	
    go(name){
        switch(name){
            case 'init':
				this.rootPage = InitPage;
				this.nav.setRoot(InitPage);
				this.storage.set("nombreusuario",null);
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
	
    logout(){
		this.storage.set("nombreusuario",null);
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
