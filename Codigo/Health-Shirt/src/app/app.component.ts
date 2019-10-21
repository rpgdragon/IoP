import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform, MenuController } from 'ionic-angular';
import { InitPage } from '@pages/init/init';
import { Router } from '@angular/router';
import {App} from 'ionic-angular';


declare var cordova:any;

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
		private menu: MenuController
    ) {
		this.platform.ready().then(() => {			
			this.redirigirInit();
        });
    }
	
    go(name){
        this.router.navigate([name]);
        switch(name){
            case 'init':
                this.rootPage = InitPage;
                break;
        }
        this.menu.close();        
	}
		
	private redirigirInit(){
		console.log("Redirigiendo a Init");
		this.splashScreen.hide();
		this.rootPage = InitPage;
	}
	
    salirApp(){
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
