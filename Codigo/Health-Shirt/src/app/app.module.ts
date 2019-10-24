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
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';


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
];

@NgModule({
    bootstrap: [IonicApp],
    declarations: [
        MyApp,
        InitPage,
        QueesPage,
        LoginPage
    ],
    entryComponents: [
        MyApp,
        InitPage,
        QueesPage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'top'
        }),
        RouterModule.forRoot(routes)
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
    HttpClientModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
