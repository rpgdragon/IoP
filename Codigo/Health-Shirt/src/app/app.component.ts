import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform, MenuController } from 'ionic-angular';
import { InitPage } from '@pages/init/init';
import { QueesPage } from '@pages/quees/quees';
import { Router } from '@angular/router';
import {App} from 'ionic-angular';
import { CamisetaPage } from '@pages/camiseta/camiseta';
import { LoginPage } from '@pages/login/login';
import { Storage } from '@ionic/storage';

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage: any = InitPage;
	
    private static nombreusuario = '';
  
    constructor(
		public app: App,
        public splashScreen: SplashScreen,
        public platform: Platform,
        private router: Router,  
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
		console.log(name);
        this.router.navigate([name]);
        switch(name){
            case 'init':
                this.rootPage = InitPage;
                break;
			case 'quees':
				this.rootPage = QueesPage;
				break;
			case 'camiseta':
				this.rootPage = CamisetaPage;
				break;
			case 'login':
				this.rootPage = LoginPage;
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
