import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ENV } from '@env';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Routes, RouterModule } from '@angular/router';
import { InitPage } from '@pages/init/init';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


//import { HomePage } from '@pages/all'
// NOTE: pages from other modules must be imported as well
// and added to the 'entryComponents' array
console.log('App mode:', ENV.mode)
console.log('App property:', ENV.property)

const routes: Routes = [
    { path: '**', redirectTo: '', pathMatch: 'full' },
    { path: 'init', component: InitPage },
];

@NgModule({
    bootstrap: [IonicApp],
    declarations: [
        MyApp,
        InitPage
    ],
    entryComponents: [
        MyApp,
        InitPage
    ],
    imports: [
        BrowserModule,
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
        AndroidPermissions
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
