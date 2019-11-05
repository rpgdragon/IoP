import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ENV } from '@env';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Routes, RouterModule } from '@angular/router';
import { InitPage } from '@pages/init/init';
import { QueesPage } from '@pages/quees/quees';
import { LoginPage } from '@pages/login/login';
import { CamisetaPage } from '@pages/camiseta/camiseta';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { TemplatePage } from '@pages/template/template';
import { OlvidoPage } from '@pages/olvido/olvido';
import { RegistroPage } from '@pages/registro/registro';
import { RegistroFacebookPage } from '@pages/registrofacebook/registrofacebook';
import { RestCamisetaProvider } from '../providers/rest-camiseta/rest-camiseta';
import { ConstantesPage } from '@pages/constantes/constantes';
import { EcgPage } from '@pages/ecg/ecg';
import { EdaPage } from '@pages/eda/eda';
import { TemperaturaPage } from '@pages/temperatura/temperatura';


//import { HomePage } from '@pages/all'
// NOTE: pages from other modules must be imported as well
// and added to the 'entryComponents' array
console.log('App mode:', ENV.mode)
console.log('App property:', ENV.property)

const routes: Routes = [
    { path: '**', redirectTo: '', pathMatch: 'full' },
    { path: 'init', component: InitPage },
    { path: 'quees', component: QueesPage },
    { path: 'login', component: LoginPage },
    { path: 'camiseta', component: CamisetaPage },
    { path: 'olvido', component: OlvidoPage },
    { path: 'registro', component:RegistroPage },
    { path: 'registrofacebook', component:RegistroFacebookPage},
    { path: 'constantes', component:ConstantesPage}
];

@NgModule({
    bootstrap: [IonicApp],
    declarations: [
        MyApp,
        InitPage,
        QueesPage,
        LoginPage,
        CamisetaPage,
        TemplatePage,
        OlvidoPage,
        RegistroPage,
        RegistroFacebookPage,
        ConstantesPage,
        EcgPage,
        EdaPage,
        TemperaturaPage
    ],
    entryComponents: [
        MyApp,
        InitPage,
        QueesPage,
        LoginPage,
        CamisetaPage,
        TemplatePage,
        OlvidoPage,
        RegistroPage,
        RegistroFacebookPage,
        ConstantesPage,
        EcgPage,
        EdaPage,
        TemperaturaPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'top'
        }),
        RouterModule.forRoot(routes),
        IonicStorageModule.forRoot()
    ],
    exports: [RouterModule],
    providers: [
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
		AppVersion,
        Keyboard,
        AndroidPermissions,
        InAppBrowser,
        Facebook,
    RestProvider,
    HttpClientModule,
    RestCamisetaProvider
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
