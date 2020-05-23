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
import { NuevacamisetaPage } from '@pages/nuevacamiseta/nuevacamiseta';
import { NuevacamisetaxcamisetaPage } from '@pages/nuevacamisetaxcamiseta/nuevacamisetaxcamiseta';
import { NuevacamisetaxpacientePage } from '@pages/nuevacamisetaxpaciente/nuevacamisetaxpaciente';
import { EditarcamisetaxcamisetaPage } from '@pages/editarcamisetaxcamiseta/editarcamisetaxcamiseta';
import { EditarcamisetaxpacientePage } from '@pages/editarcamisetaxpaciente/editarcamisetaxpaciente';
import { EditarcamisetaxedaPage } from '@pages/editarcamisetaxeda/editarcamisetaxeda';
import { EditarcamisetaxecgPage } from '@pages/editarcamisetaxecg/editarcamisetaxecg';
import { EditarcamisetaxtemperaturaPage } from '@pages/editarcamisetaxtemperatura/editarcamisetaxtemperatura';
import { EditarcamisetaxcaidaPage } from '@pages/editarcamisetaxcaida/editarcamisetaxcaida';
import { TemperaturaPage } from '@pages/temperatura/temperatura';
import { ConfiguracionPage } from '@pages/configuracion/configuracion';
import { InfoPage } from '@pages/info/info';
import { EditarcamisetaPage } from '@pages/editarcamiseta/editarcamiseta';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { RestConfiguracionProvider } from '../providers/rest-configuracion/rest-configuracion';
import { RestConstantesProvider } from '../providers/rest-constantes/rest-constantes';
import { FCM } from '@ionic-native/fcm/ngx';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { GeolocalizacionProvider } from '../providers/geolocalizacion/geolocalizacion';
import { CallNumber } from '@ionic-native/call-number/ngx';


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
    { path: 'constantes', component:ConstantesPage},
    { path: 'nuevacamiseta', component:NuevacamisetaPage},
    { path: 'editarcamiseta', component:EditarcamisetaPage},
    { path: 'configuracion', component:ConfiguracionPage},
    { path: 'info', component:InfoPage}
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
        TemperaturaPage,
        InfoPage,
        EditarcamisetaPage,
        EditarcamisetaxcamisetaPage,
        EditarcamisetaxpacientePage,
        EditarcamisetaxecgPage,
        EditarcamisetaxedaPage,
        EditarcamisetaxtemperaturaPage,
        EditarcamisetaxcaidaPage,
        ConfiguracionPage,
        NuevacamisetaPage,
        NuevacamisetaxcamisetaPage,
        NuevacamisetaxpacientePage
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
        TemperaturaPage,
        InfoPage,
        EditarcamisetaPage,
        EditarcamisetaxcamisetaPage,
        EditarcamisetaxpacientePage,
        EditarcamisetaxecgPage,
        EditarcamisetaxedaPage,
        EditarcamisetaxtemperaturaPage,
        EditarcamisetaxcaidaPage,
        ConfiguracionPage,
        NuevacamisetaPage,
        NuevacamisetaxpacientePage,
        NuevacamisetaxcamisetaPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'top',
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
            monthShortNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
            dayNames:['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
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
        ScreenOrientation,
        FCM,
    RestProvider,
    HttpClientModule,
    RestCamisetaProvider,
    RestConfiguracionProvider,
    RestConstantesProvider,
    FirebaseCrashlytics,
    GooglePlus,
    GeolocalizacionProvider,
    CallNumber
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
