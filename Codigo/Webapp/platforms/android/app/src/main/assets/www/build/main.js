webpackJsonp([0],{

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version_ngx__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_quees_quees__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_camiseta_camiseta__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_rest_rest__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook_ngx__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_app_component__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_registro_registro__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_registrofacebook_registrofacebook__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_fcm_ngx__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_google_plus_ngx__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_linkedin_ngx__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var InitPage = /** @class */ (function () {
    function InitPage(menu, appVersion, navCtrl, platform, facebook, rest, storage, fcm, google, linkedin) {
        this.menu = menu;
        this.appVersion = appVersion;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.facebook = facebook;
        this.rest = rest;
        this.storage = storage;
        this.fcm = fcm;
        this.google = google;
        this.linkedin = linkedin;
        this.version = this.appVersion.getVersionNumber();
    }
    InitPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
    };
    InitPage.prototype.navegarQueEs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_quees_quees__["a" /* QueesPage */]);
    };
    InitPage.prototype.navegarLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
    };
    InitPage.prototype.navegarRegistro = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__pages_registro_registro__["a" /* RegistroPage */]);
    };
    InitPage.prototype.loginFacebook = function () {
        var _this = this;
        this.facebook.logout().then(function () { return _this.hacerLogin(true); }).catch(function () { return _this.hacerLogin(false); });
    };
    InitPage.prototype.loginGoogle = function () {
        var _this = this;
        this.google.login({})
            .then(function (res) {
            if (res.email != undefined && res.email != null && res.email != '') {
                //ok tenemos un login en google
                _this.llamarLoginServidorGoogle(res.accessToken, res, res.userId);
            }
        })
            .catch(function (err) {
            //no realizamos ninguna operacion
        });
    };
    InitPage.prototype.loginLinkedin = function () {
        var scopes = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
        this.linkedin.login(scopes, false).then(function () { return console.log("Hola"); }).catch(function (e) { return console.log("Hola2"); });
    };
    InitPage.prototype.hacerLogin = function (logout) {
        var _this = this;
        if (logout == true) {
            console.log("Eliminado logins previos");
        }
        this.facebook.login(['email'])
            .then(function (res) { return _this.obtenerDatos(res); })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    InitPage.prototype.obtenerDatos = function (res) {
        var _this = this;
        var token = res.authResponse.accessToken;
        var userID = res.authResponse.userID;
        this.facebook.api(userID + "/?fields=email", ["email"])
            .then(function (datos) { return _this.llamarLoginServidorFacebook(token, datos, userID); })
            .catch(function (e) { return console.log('Error intentando obtener email ', e); });
    };
    InitPage.prototype.llamarLoginServidorFacebook = function (token, datos, userID) {
        var _this = this;
        this.rest.loginFacebook(datos.email, token).then(function (data) {
            if (data['codigorespuesta'] === "603") {
                //hay que poner la pagina del password del Facebook
                __WEBPACK_IMPORTED_MODULE_10__app_app_component__["a" /* MyApp */].setNombreusuario(datos.email.toLowerCase());
                _this.storage.set("tokenfacebook", token);
                _this.storage.set("usuariofacebook", userID);
                _this.storage.set("esFacebook", "1");
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__pages_registrofacebook_registrofacebook__["a" /* RegistroFacebookPage */], { red: "facebook" });
            }
            else {
                //ok, login correcto cambiamos
                __WEBPACK_IMPORTED_MODULE_10__app_app_component__["a" /* MyApp */].setNombreusuario(datos.email.toLowerCase());
                _this.storage.set("tokenfacebook", token);
                _this.storage.set("esFacebook", "1");
                _this.storage.set("usuariofacebook", userID);
                _this.storage.set('nombreusuario', datos.email.toLowerCase());
                _this.fcm.getToken().then(function (token) {
                    //vamos a guardar el token tanto en el storage como en el backend
                    _this.storage.set("tokennotificacion", token);
                    _this.rest.registrarToken(__WEBPACK_IMPORTED_MODULE_10__app_app_component__["a" /* MyApp */].getNombreusuario(), token);
                });
                _this.fcm.onTokenRefresh().subscribe(function (token) {
                    _this.storage.set("tokennotificacion", token);
                    _this.rest.registrarToken(__WEBPACK_IMPORTED_MODULE_10__app_app_component__["a" /* MyApp */].getNombreusuario(), token);
                });
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_camiseta_camiseta__["a" /* CamisetaPage */]);
            }
        }, function (error) {
            if (error.status === 403) {
                alert('Token de Facebook no válido');
            }
            else {
                console.log(error);
                alert("Se ha producido un error en la autentificación con Facebook");
            }
        });
    };
    InitPage.prototype.llamarLoginServidorGoogle = function (token, datos, userID) {
        var _this = this;
        this.rest.loginGoogle(datos.email, token).then(function (data) {
            if (data['codigorespuesta'] === "603") {
                //hay que poner la pagina del password del Facebook
                __WEBPACK_IMPORTED_MODULE_10__app_app_component__["a" /* MyApp */].setNombreusuario(datos.email.toLowerCase());
                _this.storage.set("tokenfacebook", token);
                _this.storage.set("usuariogoogle", userID);
                _this.storage.set("esGoogle", "1");
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__pages_registrofacebook_registrofacebook__["a" /* RegistroFacebookPage */], { red: "google" });
            }
            else {
                //ok, login correcto cambiamos
                __WEBPACK_IMPORTED_MODULE_10__app_app_component__["a" /* MyApp */].setNombreusuario(datos.email.toLowerCase());
                _this.storage.set("tokenfacebook", token);
                _this.storage.set("esGoogle", "1");
                _this.storage.set("usuariogoogle", userID);
                _this.storage.set('nombreusuario', datos.email.toLowerCase());
                _this.fcm.getToken().then(function (token) {
                    //vamos a guardar el token tanto en el storage como en el backend
                    _this.storage.set("tokennotificacion", token);
                    _this.rest.registrarToken(__WEBPACK_IMPORTED_MODULE_10__app_app_component__["a" /* MyApp */].getNombreusuario(), token);
                });
                _this.fcm.onTokenRefresh().subscribe(function (token) {
                    _this.storage.set("tokennotificacion", token);
                    _this.rest.registrarToken(__WEBPACK_IMPORTED_MODULE_10__app_app_component__["a" /* MyApp */].getNombreusuario(), token);
                });
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_camiseta_camiseta__["a" /* CamisetaPage */]);
            }
        }, function (error) {
            if (error.status === 403) {
                alert('Token de Google no válido');
            }
            else {
                console.log(error);
                alert("Se ha producido un error en la autentificación con Google");
            }
        });
    };
    InitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-init',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\init\init.html"*/'<ion-content forceOverscroll="true">\n\n<div class="item">\n\n	<div id="titulo">\n\n	<h1>IoP-Shirt</h1><img alt="logo"/></div>\n\n\n\n	<button ion-button class="submit-btn right button-white-black" type="submit" (click)="navegarRegistro()">\n\n	¿Nueva cuenta?\n\n	</button>\n\n	<br/>\n\n	<button ion-button class="submit-btn right" type="submit" (click)="navegarLogin()">\n\n	Iniciar sesión con tu cuenta\n\n	</button>\n\n	<br/>\n\n	<div class="botonesredessociales">\n\n		<a (click)="loginFacebook()"><img id="facebook" alt="facebook" width="64px" height="64px"/></a>\n\n		<a (click)="loginFacebook()"><img id="twitter" alt="twitter" width="64px" height="64px"/></a>\n\n		<a (click)="loginGoogle()"><img id="google" alt="google" width="64px" height="64px"/></a>\n\n		<a (click)="loginLinkedin()"><img id="instagram" alt="instagram" width="64px" height="64px"/></a>\n\n	</div>\n\n	\n\n	<br/>\n\n</div>	\n\n\n\n</ion-content>\n\n<ion-footer no-border>\n\n	<div id="preguntaApp" class="preguntaapp"><a (click)="navegarQueEs()">¿Qué es IoP-Shirt?</a></div>\n\n	<div id="versionCode" class="versionCode">Versión {{version.__zone_symbol__value}}</div>\n\n</ion-footer>\n\n	'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\init\init.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["e" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version_ngx__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook_ngx__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_7__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_fcm_ngx__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_google_plus_ngx__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_linkedin_ngx__["a" /* LinkedIn */]])
    ], InitPage);
    return InitPage;
}());

//# sourceMappingURL=init.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version_ngx__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser_ngx__ = __webpack_require__(368);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var QueesPage = /** @class */ (function () {
    function QueesPage(menu, appVersion, navCtrl, platform, iab) {
        this.menu = menu;
        this.appVersion = appVersion;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.iab = iab;
        this.version = this.appVersion.getVersionNumber();
    }
    QueesPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
    };
    QueesPage.prototype.navegarMain = function () {
        this.navCtrl.pop();
    };
    QueesPage.prototype.navegarCompra = function () {
        console.log(this.iab);
        //Pendiente de modificar, ¿Deberia recuperarse de base de datos por si cambiara?
        this.iab.create('http://www.iopshirt.es/productos/camiseta-inteligente-iop-shirt/', '_system');
    };
    QueesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-quees',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\quees\quees.html"*/'<ion-content forceOverscroll="true">\n\n<div class="item">\n\n	<div id="titulo">\n\n	<h1>IoP-Shirt</h1><img alt="logo"/></div>\n\n\n\n	<p class="justificado">IoP-Shirt es una aplicación móvil orientada a la monitorización de las constantes vitales de la gente de la 3ª edad. Esta aplicación requiere adquirir al menos una \n\n	camiseta inteligente de la misma marca. La persona que requiera ser monitorizada deberá llevar puesta la camiseta de acuerdo a como se indica en el manual de usuario del\n\n	producto. Una vez este la camiseta preparada, deberá crear una cuenta y asociar la camiseta introduciendo los datos de la misma.Desde una misma cuenta se puede visualizar\n\n	una camiseta pero una misma camiseta no puede ser visualizada desde varias cuentas.</p>\n\n	\n\n	<button ion-button class="submit-btn right button-white-black" type="submit" (click)="navegarCompra()">\n\n	¿Quieres comprar una camiseta?\n\n	</button>\n\n</div>	\n\n\n\n</ion-content>\n\n<ion-footer no-border>\n\n	<div id="atras"><ion-icon class="flecha" name="arrow-back" (click)="navegarMain()"></ion-icon></div>\n\n	<div id="versionCode" class="versionCode">Versión {{version.__zone_symbol__value}}</div>\n\n</ion-footer>\n\n	'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\quees\quees.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["e" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version_ngx__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */]])
    ], QueesPage);
    return QueesPage;
}());

//# sourceMappingURL=quees.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_camiseta_camiseta__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_component__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_olvido_olvido__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_fcm_ngx__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginPage = /** @class */ (function () {
    function LoginPage(menu, navCtrl, platform, formBuilder, rest, fcm, storage) {
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.rest = rest;
        this.fcm = fcm;
        this.storage = storage;
        this.passwordTipo = 'password';
        this.passwordClass = 'fas fa-eye-slash fa-lg fa-fw';
        this.formularioLogin = this.crearFormularioLogin();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
    };
    LoginPage.prototype.navegarMain = function () {
        //quitamos la pagina de la pila
        this.navCtrl.pop();
    };
    LoginPage.prototype.navegarOlvido = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_olvido_olvido__["a" /* OlvidoPage */]);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.rest.login(this.formularioLogin.value.email, this.formularioLogin.value.password).then(function (data) {
            __WEBPACK_IMPORTED_MODULE_6__app_app_component__["a" /* MyApp */].setNombreusuario(_this.formularioLogin.value.email.toLowerCase());
            _this.storage.set('nombreusuario', _this.formularioLogin.value.email.toLowerCase());
            _this.fcm.getToken().then(function (token) {
                //vamos a guardar el token tanto en el storage como en el backend
                _this.storage.set("tokennotificacion", token);
                _this.rest.registrarToken(__WEBPACK_IMPORTED_MODULE_6__app_app_component__["a" /* MyApp */].getNombreusuario(), token);
            });
            _this.fcm.onTokenRefresh().subscribe(function (token) {
                _this.storage.set("tokennotificacion", token);
                _this.rest.registrarToken(__WEBPACK_IMPORTED_MODULE_6__app_app_component__["a" /* MyApp */].getNombreusuario(), token);
            });
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_camiseta_camiseta__["a" /* CamisetaPage */]);
        }, function (error) {
            if (error.status === 403) {
                alert('El usuario y/o contraseña no son correctos');
            }
            else {
                alert("No se ha podido iniciar sesión");
            }
        });
    };
    LoginPage.prototype.crearFormularioLogin = function () {
        return this.formBuilder.group({
            email: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required)
        });
    };
    LoginPage.prototype.mostrarPassword = function () {
        this.passwordTipo = this.passwordTipo === 'text' ? 'password' : 'text';
        this.passwordClass = this.passwordClass === 'fas fa-eye-slash fa-lg fa-fw' ? 'fas fa-eye fa-lg fa-fw' : 'fas fa-eye-slash fa-lg fa-fw';
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\login\login.html"*/'<ion-content forceOverscroll="true">\n\n		<div class="item">\n\n			<div id="titulo">\n\n			<h1>IoP-Shirt</h1><img alt="logo"/></div>\n\n			<h2>Login</h2>\n\n			<form [formGroup]="formularioLogin" (ngSubmit)="login()">\n\n				<ion-label stacked>Email:</ion-label>\n\n				<ion-input formControlName="email" type="text" placeholder="Email" clearOnEdit="false"></ion-input>\n\n				<ion-label stacked>Password:</ion-label>\n\n				<div class="inputConIcono">\n\n					<ion-input formControlName="password" [type]="passwordTipo" placeholder="Password" clearOnEdit="false"></ion-input>\n\n					<i [class]="passwordClass" aria-hidden="true" (click)="mostrarPassword()"></i>\n\n				</div>\n\n				<a (click)="navegarOlvido()"><ion-label stacked>¿Has olvidado la contraseña?</ion-label></a>\n\n				<button ion-button class="submit-btn right buttonLogin" type="submit" [disabled]="!formularioLogin.valid">\n\n					Login\n\n				</button>\n\n				<button ion-button class="submit-btn right button-white-black buttonLogin" type="button" (click)="navegarMain()">\n\n					Atrás\n\n				</button>\n\n			</form>\n\n		</div>	\n\n		\n\n		</ion-content>\n\n			'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["e" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_fcm_ngx__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstantesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_ecg_ecg__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_eda_eda__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_temperatura_temperatura__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation_ngx__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_rest_constantes_rest_constantes__ = __webpack_require__(372);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ConstantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConstantesPage = /** @class */ (function () {
    function ConstantesPage(navCtrl, navParams, screenOrientation, rest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.screenOrientation = screenOrientation;
        this.rest = rest;
        //recoge el objeto pasado por parametro
        this.camiseta = this.navParams.get('camiseta');
        this.paginasolicitada = this.navParams.get('pagina');
        this.ecg = __WEBPACK_IMPORTED_MODULE_2__pages_ecg_ecg__["a" /* EcgPage */];
        this.eda = __WEBPACK_IMPORTED_MODULE_3__pages_eda_eda__["a" /* EdaPage */];
        this.temperatura = __WEBPACK_IMPORTED_MODULE_4__pages_temperatura_temperatura__["a" /* TemperaturaPage */];
        this.constantes = this;
        this.deHabilitado = true;
        this.hastaHabilitado = true;
        this.actual = true;
        this.timerId = null;
        this.valorecgcambiado = false;
        this.valoredacambiado = false;
        this.valortemperaturacambiado = false;
    }
    ConstantesPage.prototype.ionViewDidLoad = function () {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    };
    ConstantesPage.prototype.ionViewWillEnter = function () {
        this.obtenerDatosRecientes();
        //cargamos la pagina que es
        if (this.paginasolicitada == 'temperatura') {
            this.tabs.select(2);
        }
        if (this.paginasolicitada == 'eda') {
            this.tabs.select(1);
        }
    };
    ConstantesPage.prototype.obtenerDatosRecientes = function () {
        var _this = this;
        //ok la primera cosa que tenemos que hacer es comprobar si esta activo el campo de actual
        if (this.actual == true) {
            //ok podemos seguir ya que se piden los datos del último minuto
            this.rest.obtenerConstantesUltimoMinuto(this.camiseta["numeroserie"]).then(function (data) {
                var constantesarray = JSON.parse(data.mensaje);
                var elemento = constantesarray[0];
                var ecgc = elemento["ecg"];
                var edac = elemento["eda"];
                var temperaturac = elemento["temperatura"];
                //ahora tenemos que convertir los datos a elementos comprensibles por el mismo
                _this.datosecg = ecgc.split(",");
                _this.datoseda = edac.split(",");
                _this.datostemperatura = temperaturac.split(",");
                //vamos a calcular las medias
                //la media de la temperatura es tan simple como sumar sus valores y dividirlos por el número del tamaño
                var mediat = 0;
                var minencontrado = 100;
                var maxencontrado = -100;
                for (var i = 0; i < _this.datostemperatura.length; i++) {
                    _this.datostemperatura[i] = parseFloat(_this.datostemperatura[i]);
                    mediat += _this.datostemperatura[i];
                    if (minencontrado > _this.datostemperatura[i]) {
                        minencontrado = _this.datostemperatura[i];
                    }
                    if (maxencontrado < _this.datostemperatura[i]) {
                        maxencontrado = _this.datostemperatura[i];
                    }
                }
                _this.temperaturamax = maxencontrado;
                _this.temperaturamin = minencontrado;
                if (_this.temperaturamin == 100 || _this.temperaturamax == -100) {
                    _this.temperaturamax = '';
                    _this.temperaturamin = '';
                }
                _this.temperaturamedias = Math.round((mediat / _this.datostemperatura.length) * 100) / 100;
                //lo mismo con el eda
                mediat = 0;
                minencontrado = 600;
                maxencontrado = -100;
                for (i = 0; i < _this.datoseda.length; i++) {
                    _this.datoseda[i] = parseInt(_this.datoseda[i]);
                    mediat += _this.datoseda[i];
                    if (minencontrado > _this.datoseda[i]) {
                        minencontrado = _this.datoseda[i];
                    }
                    if (maxencontrado < _this.datoseda[i]) {
                        maxencontrado = _this.datoseda[i];
                    }
                }
                _this.edamax = maxencontrado;
                _this.edamin = minencontrado;
                if (_this.edamin == 600 || _this.edamax == -100) {
                    _this.edamax = '';
                    _this.edamin = '';
                }
                _this.edamedias = Math.round((mediat / _this.datoseda.length) * 100) / 100;
                //por último el ecg. No obstante este es un poco más complicado de medir, por que aqui tenemos que medir
                //los pulsos segun los valores y no los valores en si
                mediat = 0;
                _this.pulsacionesmedias = 0;
                minencontrado = 200;
                maxencontrado = -200;
                var valorpulsaciones = 0;
                for (i = 0; i < _this.datosecg.length; i++) {
                    //cada 1200 valores es un minuto
                    _this.datosecg[i] = parseInt(_this.datosecg[i]);
                    if (_this.datosecg[i] >= 550) {
                        _this.pulsacionesmedias++;
                        valorpulsaciones++;
                    }
                    if ((i + 1) % 1200 == 0) {
                        if (minencontrado > valorpulsaciones) {
                            minencontrado = valorpulsaciones;
                        }
                        if (maxencontrado < valorpulsaciones) {
                            maxencontrado = valorpulsaciones;
                        }
                        valorpulsaciones = 0;
                    }
                }
                _this.pulsacionesmax = maxencontrado;
                _this.pulsacionesmin = minencontrado;
                if (_this.pulsacionesmin == 200 || _this.pulsacionesmax == -100) {
                    _this.pulsacionesmax = '';
                    _this.pulsacionesmin = '';
                }
                //ademas aqui tendrá que haber una accion para que se reinicien las animaciones y las graficas
                //se utilizará un flag
                _this.valorecgcambiado = true;
                _this.valoredacambiado = true;
                _this.valortemperaturacambiado = true;
            }, function (error) {
                //si hay un error simplemente lo imprimimos por la consola
                console.log("Esto es un error" + error);
            });
        }
        var that = this;
        this.timerId = setTimeout(function () { that.obtenerDatosRecientes(); }, 60000);
    };
    ConstantesPage.prototype.ionViewWillLeave = function () {
        console.log("Abandonando la pagina de constantes y desactivando llamada a constantes");
        clearTimeout(this.timerId);
    };
    /**
     * Método para ir de nuevo a la ventana de seleccion de la camiseta
     */
    ConstantesPage.prototype.irAtras = function () {
        this.navCtrl.pop();
    };
    /**
     * Getters y Setters de los atributos privados
     */
    ConstantesPage.prototype.getPulsacionesmedias = function () {
        return this.pulsacionesmedias;
    };
    ConstantesPage.prototype.setPulsacionesmedias = function (pulsacionesmedias) {
        this.pulsacionesmedias = pulsacionesmedias;
    };
    ConstantesPage.prototype.getPulsacionesmin = function () {
        return this.pulsacionesmin;
    };
    ConstantesPage.prototype.setPulsacionesmin = function (pulsacionesmin) {
        this.pulsacionesmin = pulsacionesmin;
    };
    ConstantesPage.prototype.getPulsacionesmax = function () {
        return this.pulsacionesmax;
    };
    ConstantesPage.prototype.setPulsacionesmax = function (pulsacionesmax) {
        this.pulsacionesmax = pulsacionesmax;
    };
    ConstantesPage.prototype.getEdamedias = function () {
        return this.edamedias;
    };
    ConstantesPage.prototype.setEdamedias = function (edamedias) {
        this.edamedias = edamedias;
    };
    ConstantesPage.prototype.getEdamin = function () {
        return this.edamin;
    };
    ConstantesPage.prototype.setEdamin = function (edamin) {
        this.edamin = edamin;
    };
    ConstantesPage.prototype.getEdamax = function () {
        return this.edamax;
    };
    ConstantesPage.prototype.setEdamax = function (edamax) {
        this.edamax = edamax;
    };
    ConstantesPage.prototype.getTemperaturamedias = function () {
        return this.temperaturamedias;
    };
    ConstantesPage.prototype.setTemperaturamedias = function (temperaturamedias) {
        this.temperaturamedias = temperaturamedias;
    };
    ConstantesPage.prototype.getTemperaturamin = function () {
        return this.temperaturamin;
    };
    ConstantesPage.prototype.setTemperaturamin = function (temperaturamin) {
        this.temperaturamin = temperaturamin;
    };
    ConstantesPage.prototype.getTemperaturamax = function () {
        return this.temperaturamax;
    };
    ConstantesPage.prototype.setTemperaturamax = function (temperaturamax) {
        this.temperaturamax = temperaturamax;
    };
    ConstantesPage.prototype.getDatosecg = function () {
        return this.datosecg;
    };
    ConstantesPage.prototype.setDatosecg = function (datosecg) {
        this.datosecg = datosecg;
    };
    ConstantesPage.prototype.getDatoseda = function () {
        return this.datoseda;
    };
    ConstantesPage.prototype.setDatoseda = function (datoseda) {
        this.datosecg = datoseda;
    };
    ConstantesPage.prototype.getDatostemperatura = function () {
        return this.datostemperatura;
    };
    ConstantesPage.prototype.setDatostemperatura = function (datostemperatura) {
        this.datostemperatura = datostemperatura;
    };
    ConstantesPage.prototype.getValorecgcambiado = function () {
        return this.valorecgcambiado;
    };
    ConstantesPage.prototype.setValorecgcambiado = function (valorecgcambiado) {
        this.valorecgcambiado = valorecgcambiado;
    };
    ConstantesPage.prototype.getValoredacambiado = function () {
        return this.valoredacambiado;
    };
    ConstantesPage.prototype.setValoredacambiado = function (valoredacambiado) {
        this.valoredacambiado = valoredacambiado;
    };
    ConstantesPage.prototype.getValortemperaturacambiado = function () {
        return this.valortemperaturacambiado;
    };
    ConstantesPage.prototype.setValortemperaturacambiado = function (valortemperaturacambiado) {
        this.valortemperaturacambiado = valortemperaturacambiado;
    };
    ConstantesPage.prototype.getEcgP = function () {
        return this.ecgP;
    };
    ConstantesPage.prototype.setEcgP = function (ecgP) {
        this.ecgP = ecgP;
    };
    ConstantesPage.prototype.getEdaP = function () {
        return this.edaP;
    };
    ConstantesPage.prototype.setEdaP = function (edaP) {
        this.edaP = edaP;
    };
    ConstantesPage.prototype.getTemperaturaP = function () {
        return this.temperaturaP;
    };
    ConstantesPage.prototype.setTemperaturaP = function (temperaturaP) {
        this.temperaturaP = temperaturaP;
    };
    ConstantesPage.prototype.obtenerDatosHistoricos = function () {
        var _this = this;
        if (this.fechaHasta != null && this.fechaHasta != undefined && this.fechaDe != null && this.fechaDe != undefined) {
            //ok si los dos estan llenos, llamamos al servicio restful
            if (this.fechaDe > this.fechaHasta) {
                alert("La fecha desde debe ser inferior o igual a la fecha hasta");
                return;
            }
            this.rest.obtenerConstantesHistorico(this.camiseta["numeroserie"], this.fechaDe, this.fechaHasta).then(function (data) {
                var constantesarray = JSON.parse(data.mensaje);
                var elemento = constantesarray[0];
                var ecgc = elemento["ecg"];
                var edac = elemento["eda"];
                var temperaturac = elemento["temperatura"];
                //ahora tenemos que convertir los datos a elementos comprensibles por el mismo
                _this.datosecg = ecgc.split(",");
                _this.datoseda = edac.split(",");
                _this.datostemperatura = temperaturac.split(",");
                //vamos a calcular las medias
                //la media de la temperatura es tan simple como sumar sus valores y dividirlos por el número del tamaño
                //vamos a calcular las medias
                //la media de la temperatura es tan simple como sumar sus valores y dividirlos por el número del tamaño
                var mediat = 0;
                var minencontrado = 100;
                var maxencontrado = -100;
                for (var i = 0; i < _this.datostemperatura.length; i++) {
                    _this.datostemperatura[i] = parseFloat(_this.datostemperatura[i]);
                    mediat += _this.datostemperatura[i];
                    if (minencontrado > _this.datostemperatura[i]) {
                        minencontrado = _this.datostemperatura[i];
                    }
                    if (maxencontrado < _this.datostemperatura[i]) {
                        maxencontrado = _this.datostemperatura[i];
                    }
                }
                _this.temperaturamax = maxencontrado;
                _this.temperaturamin = minencontrado;
                if (_this.temperaturamin == 100 || _this.temperaturamax == -100) {
                    _this.temperaturamax = '';
                    _this.temperaturamin = '';
                }
                _this.temperaturamedias = Math.round((mediat / _this.datostemperatura.length) * 100) / 100;
                //lo mismo con el eda
                mediat = 0;
                minencontrado = 600;
                maxencontrado = -100;
                for (i = 0; i < _this.datoseda.length; i++) {
                    _this.datoseda[i] = parseInt(_this.datoseda[i]);
                    mediat += _this.datoseda[i];
                    if (minencontrado > _this.datoseda[i]) {
                        minencontrado = _this.datoseda[i];
                    }
                    if (maxencontrado < _this.datoseda[i]) {
                        maxencontrado = _this.datoseda[i];
                    }
                }
                _this.edamax = maxencontrado;
                _this.edamin = minencontrado;
                if (_this.edamin == 600 || _this.edamax == -100) {
                    _this.edamax = '';
                    _this.edamin = '';
                }
                _this.edamedias = Math.round((mediat / _this.datoseda.length) * 100) / 100;
                //por último el ecg. No obstante este es un poco más complicado de medir, por que aqui tenemos que medir
                //los pulsos segun los valores y no los valores en si
                mediat = 0;
                _this.pulsacionesmedias = 0;
                minencontrado = 200;
                maxencontrado = -200;
                var valorpulsaciones = 0;
                for (i = 0; i < _this.datosecg.length; i++) {
                    //cada 1200 valores es un minuto
                    _this.datosecg[i] = parseInt(_this.datosecg[i]);
                    if (_this.datosecg[i] >= 550) {
                        _this.pulsacionesmedias++;
                        valorpulsaciones++;
                    }
                    if ((i + 1) % 1200 == 0) {
                        console.log(i);
                        console.log(valorpulsaciones);
                        if (minencontrado > valorpulsaciones) {
                            minencontrado = valorpulsaciones;
                        }
                        if (maxencontrado < valorpulsaciones) {
                            console.log("Cambiado");
                            maxencontrado = valorpulsaciones;
                        }
                        valorpulsaciones = 0;
                    }
                }
                _this.pulsacionesmax = maxencontrado;
                _this.pulsacionesmin = minencontrado;
                if (_this.pulsacionesmin == 200 || _this.pulsacionesmax == -100) {
                    _this.pulsacionesmax = '';
                    _this.pulsacionesmin = '';
                }
                //y ahora a partir de la diferencia de minutos se divide
                var diffMs = (Date.parse(_this.fechaHasta.toLocaleString()) - Date.parse(_this.fechaDe.toLocaleString()));
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                console.log(diffMins);
                _this.pulsacionesmedias = Math.round(_this.pulsacionesmedias / diffMins);
                //ademas aqui tendrá que haber una accion para que se reinicien las animaciones y las graficas
                //se utilizará un flag
                _this.valorecgcambiado = true;
                _this.valoredacambiado = true;
                _this.valortemperaturacambiado = true;
                //tambien pediremos activar el caso
                if (_this.ecgP != null && _this.ecgP != undefined) {
                    _this.ecgP.encenderContinuarAnimacion();
                }
                if (_this.edaP != null && _this.edaP != undefined) {
                    _this.edaP.encenderContinuarAnimacion();
                }
                if (_this.temperaturaP != null && _this.temperaturaP != undefined) {
                    _this.temperaturaP.encenderContinuarAnimacion();
                }
            }, function (error) {
                //si hay un error simplemente lo imprimimos por la consola
                console.log("Esto es un error" + error);
            });
        }
    };
    ConstantesPage.prototype.apagarTimeout = function () {
        if (this.timerId != null && this.timerId != undefined) {
            clearTimeout(this.timerId);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])("paymentTabs"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Tabs */])
    ], ConstantesPage.prototype, "tabs", void 0);
    ConstantesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-constantes',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\constantes\constantes.html"*/'<!--\n\n  Generated template for the ConstantesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n	<ion-toolbar color="primary">\n\n    	<ion-buttons left>\n\n        	<button ion-button icon-only (click)="irAtras()">\n\n            <ion-icon class="iconotoolbar" name="arrow-back" ></ion-icon>\n\n          </button>\n\n    </ion-buttons>\n\n		<ion-title>{{camiseta.nombre}}</ion-title>\n\n  </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n	<ion-tabs #paymentTabs>\n\n		<ion-tab tabIcon="heart" tabTitle="ECG" [root]="ecg" [rootParams]="constantes"></ion-tab>\n\n		<ion-tab tabIcon="water" tabTitle="EDA" [root]="eda" [rootParams]="constantes"></ion-tab>\n\n		<ion-tab tabIcon="thermometer" tabTitle="Temperatura" [root]="temperatura" [rootParams]="constantes"></ion-tab>\n\n  </ion-tabs>\n\n</ion-content>'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\constantes\constantes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation_ngx__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_6__providers_rest_constantes_rest_constantes__["a" /* RestConstantesProvider */]])
    ], ConstantesPage);
    return ConstantesPage;
}());

//# sourceMappingURL=constantes.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrearcamisetaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_info_info__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_camiseta_rest_camiseta__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_component__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CrearcamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CrearcamisetaPage = /** @class */ (function () {
    function CrearcamisetaPage(navCtrl, navParams, formBuilder, rest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.rest = rest;
        this.imagenes = ['grandmother', 'man', 'grandfather', 'old-man', 'couple', 'grandmother2', 'old-woman', 'old-man2', 'grandmother3', 'couple2'];
        this.imagen = 'grandmother';
        this.formularioCrearCamiseta = this.crearFormularioRegistrarCamiseta();
        this.notificacionestemperatura = false;
        this.notificacioneseda = false;
        this.notificacionesecg = false;
        this.notificacionescaida = false;
        this.escondeme = false;
    }
    CrearcamisetaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CrearcamisetaPage');
    };
    /**
     * Método para ir de nuevo a la ventana de seleccion de la camiseta
     */
    CrearcamisetaPage.prototype.irAtras = function () {
        this.navCtrl.pop();
    };
    /**
     * Metodo para ir a la pagina de Info
     */
    CrearcamisetaPage.prototype.irInfo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_info_info__["a" /* InfoPage */]);
    };
    CrearcamisetaPage.prototype.crearFormularioRegistrarCamiseta = function () {
        return this.formBuilder.group({
            nombre: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
            parentesco: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
            numeroserie: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(16), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].maxLength(16)]),
            codseg: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
            icono: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
            ecgminimo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            ecgmaximo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            edaminimo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            edamaximo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            temperaturaminimo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            temperaturamaximo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notificacionesecg: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notificacioneseda: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notificacionestemperatura: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notificacionescaida: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            fechanacimiento: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            sexo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            telefono: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            telefonocontacto: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notas: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            direccion: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', [])
        });
    };
    CrearcamisetaPage.prototype.prepararImagenesIcono = function () {
        var _this = this;
        setTimeout(function () {
            var buttonElements = document.querySelectorAll('div.alert-radio-group button');
            console.log(buttonElements);
            if (!buttonElements.length) {
                _this.prepararImagenesIcono();
            }
            else {
                for (var index = 0; index < buttonElements.length; index++) {
                    var buttonElement = buttonElements[index];
                    console.log(buttonElement);
                    var optionLabelElement = buttonElement.querySelector('.alert-radio-label');
                    var image = optionLabelElement.innerHTML.trim();
                    console.log(image);
                    buttonElement.classList.add('imageselect', 'image_' + image);
                    if (image == _this.imagen) {
                        buttonElement.classList.add('imageselected');
                    }
                }
            }
        }, 100);
    };
    CrearcamisetaPage.prototype.ponerImagen = function (imagen) {
        var buttonElements = document.querySelectorAll('div.alert-radio-group button.imageselect');
        console.log(buttonElements);
        for (var index = 0; index < buttonElements.length; index++) {
            var buttonElement = buttonElements[index];
            buttonElement.classList.remove('imageselected');
            if (buttonElement.classList.contains('image_' + imagen)) {
                buttonElement.classList.add('imageselected');
            }
        }
    };
    CrearcamisetaPage.prototype.selectIcono = function (imagen) {
        this.imagen = imagen;
    };
    CrearcamisetaPage.prototype.registrarCamiseta = function () {
        var _this = this;
        if (!this.validarCamposMinimoMaximo()) {
            return;
        }
        this.rest.registrarCamiseta(__WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MyApp */].getNombreusuario(), this.formularioCrearCamiseta.value.nombre, this.formularioCrearCamiseta.value.parentesco, this.formularioCrearCamiseta.value.numeroserie, this.formularioCrearCamiseta.value.codseg, this.formularioCrearCamiseta.value.icono, this.formularioCrearCamiseta.value.ecgminimo, this.formularioCrearCamiseta.value.ecgmaximo, this.formularioCrearCamiseta.value.edaminimo, this.formularioCrearCamiseta.value.edamaximo, this.formularioCrearCamiseta.value.temperaturaminimo, this.formularioCrearCamiseta.value.temperaturamaximo, this.formularioCrearCamiseta.value.notificacionesecg, this.formularioCrearCamiseta.value.notificacioneseda, this.formularioCrearCamiseta.value.notificacionestemperatura, this.formularioCrearCamiseta.value.notificacionescaida, this.formularioCrearCamiseta.value.fechanacimiento, this.formularioCrearCamiseta.value.sexo, this.formularioCrearCamiseta.value.telefono, this.formularioCrearCamiseta.value.telefonocontacto, this.formularioCrearCamiseta.value.notas, this.formularioCrearCamiseta.value.direccion).then(function (data) {
            alert("Camiseta creada exitosamente");
            _this.navCtrl.pop();
        }, function (error) {
            console.log(error);
            if (error.status === 404) {
                alert("La camiseta no existe o no coincide el código de seguridad");
            }
            else {
                if (error.status === 409) {
                    alert("Esta camisa ya ha sido registrada");
                }
                else {
                    alert("No se ha podido registrar la camiseta");
                }
            }
        });
    };
    CrearcamisetaPage.prototype.validarCamposMinimoMaximo = function () {
        var ecgminimorelleno = false;
        var ecgmaximorelleno = false;
        var edaminimorelleno = false;
        var edamaximorelleno = false;
        var temperaturaminimorelleno = false;
        var temperaturamaximorelleno = false;
        if (this.formularioCrearCamiseta.value.ecgminimo != '' && this.formularioCrearCamiseta.value.ecgminimo != null && this.formularioCrearCamiseta.value.ecgminimo != undefined) {
            if (isNaN(this.formularioCrearCamiseta.value.ecgminimo)) {
                alert("El campo ECG minimo debe rellenarse con un número");
                return false;
            }
            ecgminimorelleno = true;
        }
        if (this.formularioCrearCamiseta.value.ecgmaximo != '' && this.formularioCrearCamiseta.value.ecgmaximo != null && this.formularioCrearCamiseta.value.ecgmaximo != undefined) {
            if (isNaN(this.formularioCrearCamiseta.value.ecgmaximo)) {
                alert("El campo ECG máximo debe rellenarse con un número");
                return false;
            }
            ecgmaximorelleno = true;
        }
        if (this.formularioCrearCamiseta.value.edaminimo != '' && this.formularioCrearCamiseta.value.edaminimo != null && this.formularioCrearCamiseta.value.edaminimo != undefined) {
            if (isNaN(this.formularioCrearCamiseta.value.edaminimo)) {
                alert("El campo EDA minimo debe rellenarse con un número");
                return false;
            }
            edaminimorelleno = true;
        }
        if (this.formularioCrearCamiseta.value.edamaximo != '' && this.formularioCrearCamiseta.value.edamaximo != null && this.formularioCrearCamiseta.value.edamaximo != undefined) {
            if (isNaN(this.formularioCrearCamiseta.value.ecgmaximo)) {
                alert("El campo EDA máximo debe rellenarse con un número");
                return false;
            }
            edamaximorelleno = true;
        }
        if (this.formularioCrearCamiseta.value.temperaturaminimo != '' && this.formularioCrearCamiseta.value.temperaturaminimo != null && this.formularioCrearCamiseta.value.temperaturaminimo != undefined) {
            if (isNaN(this.formularioCrearCamiseta.value.temperaturaminimo)) {
                alert("El campo Temperatura minimo debe rellenarse con un número");
                return false;
            }
            temperaturaminimorelleno = true;
        }
        if (this.formularioCrearCamiseta.value.temperaturamaximo != '' && this.formularioCrearCamiseta.value.temperaturamaximo != null && this.formularioCrearCamiseta.value.temperaturamaximo != undefined) {
            if (isNaN(this.formularioCrearCamiseta.value.temperaturamaximo)) {
                alert("El campo Temperatura máximo debe rellenarse con un número");
                return false;
            }
            temperaturamaximorelleno = true;
        }
        if (ecgminimorelleno && ecgmaximorelleno) {
            var v1 = Number(this.formularioCrearCamiseta.value.ecgminimo);
            var v2 = Number(this.formularioCrearCamiseta.value.ecgmaximo);
            if (v1 > v2) {
                alert("El umbral minimo de ECG no puede ser superior al umbral máximo");
                return false;
            }
        }
        if (edaminimorelleno && edamaximorelleno) {
            var v3 = Number(this.formularioCrearCamiseta.value.edaminimo);
            var v4 = Number(this.formularioCrearCamiseta.value.edamaximo);
            if (v3 > v4) {
                alert("El umbral minimo de EDA no puede ser superior al umbral máximo");
                return false;
            }
        }
        if (temperaturaminimorelleno && temperaturamaximorelleno) {
            var v5 = Number(this.formularioCrearCamiseta.value.temperaturaminimo);
            var v6 = Number(this.formularioCrearCamiseta.value.temperaturamaximo);
            if (v5 > v6) {
                alert("El umbral minimo de Temperatura no puede ser superior al umbral máximo");
                return false;
            }
        }
        return true;
    };
    CrearcamisetaPage.prototype.mostrarAvanzados = function () {
        this.escondeme = true;
    };
    CrearcamisetaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-crearcamiseta',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\crearcamiseta\crearcamiseta.html"*/'<!--\n\n  Generated template for the CrearcamisetaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n	<ion-toolbar color="primary">\n\n    <ion-buttons left>\n\n        <button ion-button icon-only (click)="irAtras()">\n\n          <ion-icon class="iconotoolbar" name="arrow-back" ></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title>Registrar Camiseta</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="irInfo()">\n\n        <ion-icon class="iconotoolbar" name="information-circle" ></ion-icon>\n\n      </button>\n\n  </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content forceOverscroll="true">\n\n  <form [formGroup]="formularioCrearCamiseta" (ngSubmit)="registrarCamiseta()">\n\n      <ion-label stacked>Icono *:</ion-label>\n\n      <ion-item class="imageselect image_{{imagen}}">\n\n        <ion-select (click)="prepararImagenesIcono()" formControlName="icono" cancelText="Cancelar" (ionChange)="ponerImagen(this.imagen)" [(ngModel)]="imagen">\n\n          <ion-option  *ngFor="let optionimagen of imagenes" [value]="optionimagen" (ionSelect)="selectIcono(optionimagen)">{{optionimagen}}</ion-option>\n\n        </ion-select>   \n\n      </ion-item>\n\n      <ion-label stacked>Nombre *:</ion-label>\n\n      <ion-input formControlName="nombre" type="text" placeholder="Nombre" clearOnEdit="false"></ion-input>\n\n      <ion-label stacked>Parentesco *:</ion-label>\n\n      <ion-input formControlName="parentesco" type="text" placeholder="Parentesco" clearOnEdit="false"></ion-input>\n\n      <ion-label stacked>Fecha de nacimiento :</ion-label>\n\n      <ion-datetime formControlName="fechanacimiento" style="text-align:left" displayFormat="YYYY-MM-DD" cancelText="Cancelar" doneText="Validar" clearOnEdit="false"></ion-datetime>\n\n      <ion-label stacked>Sexo :</ion-label>\n\n      <ion-select class="ion-select-sexo" formControlName="sexo" cancelText="Cancelar">\n\n        <ion-option  value="H">Hombre</ion-option>\n\n        <ion-option  value="M">Mujer</ion-option>\n\n      </ion-select>\n\n      <ion-label stacked>Num.Serie *:</ion-label>\n\n      <ion-input formControlName="numeroserie" type="number" placeholder="Numero de serie" clearOnEdit="false"></ion-input>\n\n      <ion-label stacked>Cód.Seg *:</ion-label>\n\n      <ion-input formControlName="codseg" placeholder="Código de seguridad" clearOnEdit="false"></ion-input>\n\n      <ion-label stacked>ECG:</ion-label>\n\n      <div class="display-inline espaciado noalreves"><ion-input formControlName="ecgminimo" type="number" placeholder="minimo" clearOnEdit="false"></ion-input><ion-input formControlName="ecgmaximo" type="number" placeholder="máximo" clearOnEdit="false"></ion-input></div>\n\n      <div class="justificado display-inline espaciado alreves"><ion-label>¿Apagar Notificaciones ECG?</ion-label><ion-checkbox slot="start" formControlName="notificacionesecg" color="primary" [(ngModel)]="notificacionesecg"></ion-checkbox></div> \n\n      <ion-label stacked>EDA:</ion-label>\n\n      <div class="display-inline espaciado noalreves"><ion-input formControlName="edaminimo" type="number" placeholder="minimo" clearOnEdit="false"></ion-input><ion-input formControlName="edamaximo" type="number" placeholder="máximo" clearOnEdit="false"></ion-input></div>\n\n      <div class="justificado display-inline espaciado alreves"><ion-label>¿Apagar Notificaciones EDA?</ion-label><ion-checkbox slot="start" formControlName="notificacioneseda" color="primary" [(ngModel)]="notificacioneseda"></ion-checkbox></div> \n\n      <ion-label stacked>Temperatura:</ion-label>\n\n      <div class="display-inline espaciado noalreves"><ion-input formControlName="temperaturaminimo" type="number" placeholder="minimo" clearOnEdit="false"></ion-input><ion-input formControlName="temperaturamaximo" type="number" placeholder="máximo" clearOnEdit="false"></ion-input></div>\n\n      <div class="justificado display-inline espaciado alreves"><ion-label>¿Apagar Notificaciones Temperatura?</ion-label><ion-checkbox slot="start" formControlName="notificacionestemperatura" color="primary" [(ngModel)]="notificacionestemperatura"></ion-checkbox></div>  \n\n      <ion-label stacked>Caidas:</ion-label>\n\n      <div class="justificado display-inline espaciado alreves"><ion-label>¿Notificar caidas?</ion-label><ion-checkbox git aslot="start" formControlName="notificacionescaida" color="primary" [(ngModel)]="notificacionescaida" ></ion-checkbox></div>\n\n      <div class="justificado display-inline espaciado"><button ion-button id="botonescondidas" type="button" class="buttonForm" (click) ="mostrarAvanzados()" [hidden]="escondeme">Datos Contacto</button></div>\n\n      <div *ngIf="escondeme">\n\n        <ion-label stacked>Telefono:</ion-label>\n\n        <ion-input formControlName="telefono" type="number" placeholder="Telefono" clearOnEdit="false"></ion-input>\n\n        <ion-label stacked>Telefono Contacto:</ion-label>\n\n        <ion-input formControlName="telefonocontacto" type="number" placeholder="Telefono" clearOnEdit="false"></ion-input>\n\n        <ion-label stacked>Dirección:</ion-label>\n\n        <ion-textarea formControlName="direccion" placeholder="Direccion" clearOnEdit="false"></ion-textarea>\n\n        <ion-label stacked>Notas:</ion-label>\n\n        <ion-textarea formControlName="notas" placeholder="Notas" clearOnEdit="false"></ion-textarea>\n\n      </div> \n\n      <div class="justificado display-inline espaciado"><button ion-button class="submit-btn right buttonForm" type="submit" [disabled]="!formularioCrearCamiseta.valid">Registrar Camiseta</button></div>  \n\n    </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\crearcamiseta\crearcamiseta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_rest_camiseta_rest_camiseta__["a" /* RestCamisetaProvider */]])
    ], CrearcamisetaPage);
    return CrearcamisetaPage;
}());

//# sourceMappingURL=crearcamiseta.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditarcamisetaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_info_info__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_camiseta_rest_camiseta__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_component__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the EditarcamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditarcamisetaPage = /** @class */ (function () {
    function EditarcamisetaPage(navCtrl, navParams, formBuilder, rest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.rest = rest;
        this.imagenes = ['grandmother', 'man', 'grandfather', 'old-man', 'couple', 'grandmother2', 'old-woman', 'old-man2', 'grandmother3', 'couple2'];
        this.imagen = 'grandmother';
        this.camiseta = this.navParams.get('camiseta');
        this.formularioEditarCamiseta = this.crearFormularioEditarCamiseta();
        if (this.camiseta["notificacionestemperatura"] == true || this.camiseta["notificacionestemperatura"] == "true" || this.camiseta["notificacionestemperatura"] == 1 || this.camiseta["notificacionestemperatura"] == "1") {
            this.notificacionestemperatura = true;
        }
        else {
            this.notificacionestemperatura = false;
        }
        if (this.camiseta["notificacioneseda"] == true || this.camiseta["notificacioneseda"] == "true" || this.camiseta["notificacioneseda"] == 1 || this.camiseta["notificacioneseda"] == "1") {
            this.notificacioneseda = true;
        }
        else {
            this.notificacioneseda = false;
        }
        if (this.camiseta["notificacionesecg"] == true || this.camiseta["notificacionesecg"] == "true" || this.camiseta["notificacionesecg"] == 1 || this.camiseta["notificacionesecg"] == "1") {
            this.notificacionesecg = true;
        }
        else {
            this.notificacionesecg = false;
        }
        if (this.camiseta["notificacionescaida"] == true || this.camiseta["notificacionescaida"] == "true" || this.camiseta["notificacionescaida"] == 1 || this.camiseta["notificacionescaida"] == "1") {
            this.notificacionescaida = true;
        }
        else {
            this.notificacionescaida = false;
        }
        console.log(this.camiseta["notificacionescaida"]);
        //vamos a obtener la ultima parte de la url y quitar el .png del final
        var lastpartsrc = this.camiseta["src"].split("/").pop();
        this.imagen = lastpartsrc.split(".")[0];
        console.log(this.imagen);
        this.escondeme = false;
    }
    EditarcamisetaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditarcamisetaPage');
    };
    EditarcamisetaPage.prototype.ionViewWillEnter = function () {
        //hay que colocar los datos iniciales de la camiseta
    };
    EditarcamisetaPage.prototype.prepararImagenesIcono = function () {
        var _this = this;
        setTimeout(function () {
            var buttonElements = document.querySelectorAll('div.alert-radio-group button');
            console.log(buttonElements);
            if (!buttonElements.length) {
                _this.prepararImagenesIcono();
            }
            else {
                for (var index = 0; index < buttonElements.length; index++) {
                    var buttonElement = buttonElements[index];
                    console.log(buttonElement);
                    var optionLabelElement = buttonElement.querySelector('.alert-radio-label');
                    var image = optionLabelElement.innerHTML.trim();
                    console.log(image);
                    buttonElement.classList.add('imageselect', 'image_' + image);
                    if (image == _this.imagen) {
                        buttonElement.classList.add('imageselected');
                    }
                }
            }
        }, 100);
    };
    EditarcamisetaPage.prototype.ponerImagen = function (imagen) {
        var buttonElements = document.querySelectorAll('div.alert-radio-group button.imageselect');
        console.log(buttonElements);
        for (var index = 0; index < buttonElements.length; index++) {
            var buttonElement = buttonElements[index];
            buttonElement.classList.remove('imageselected');
            if (buttonElement.classList.contains('image_' + imagen)) {
                buttonElement.classList.add('imageselected');
            }
        }
    };
    EditarcamisetaPage.prototype.selectIcono = function (imagen) {
        this.imagen = imagen;
    };
    /**
      * Método para ir de nuevo a la ventana de seleccion de la camiseta
      */
    EditarcamisetaPage.prototype.irAtras = function () {
        this.navCtrl.pop();
    };
    /**
     * Metodo para ir a la pagina de Info
     */
    EditarcamisetaPage.prototype.irInfo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_info_info__["a" /* InfoPage */]);
    };
    EditarcamisetaPage.prototype.crearFormularioEditarCamiseta = function () {
        return this.formBuilder.group({
            nombre: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
            parentesco: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
            icono: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
            ecgminimo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            ecgmaximo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            edaminimo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            edamaximo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            temperaturaminimo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            temperaturamaximo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notificacionesecg: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notificacioneseda: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notificacionestemperatura: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notificacionescaida: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            fechanacimiento: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            sexo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            telefono: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            telefonocontacto: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            notas: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', []),
            direccion: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', [])
        });
    };
    EditarcamisetaPage.prototype.editarCamiseta = function () {
        var _this = this;
        if (!this.validarCamposMinimoMaximo()) {
            return;
        }
        this.rest.editarCamiseta(__WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MyApp */].getNombreusuario(), this.camiseta["id"], this.formularioEditarCamiseta.value.nombre, this.formularioEditarCamiseta.value.parentesco, this.formularioEditarCamiseta.value.icono, this.formularioEditarCamiseta.value.ecgminimo, this.formularioEditarCamiseta.value.ecgmaximo, this.formularioEditarCamiseta.value.edaminimo, this.formularioEditarCamiseta.value.edamaximo, this.formularioEditarCamiseta.value.temperaturaminimo, this.formularioEditarCamiseta.value.temperaturamaximo, this.formularioEditarCamiseta.value.notificacionesecg, this.formularioEditarCamiseta.value.notificacioneseda, this.formularioEditarCamiseta.value.notificacionestemperatura, this.formularioEditarCamiseta.value.notificacionescaida, this.formularioEditarCamiseta.value.fechanacimiento, this.formularioEditarCamiseta.value.sexo, this.formularioEditarCamiseta.value.telefono, this.formularioEditarCamiseta.value.telefonocontacto, this.formularioEditarCamiseta.value.notas, this.formularioEditarCamiseta.value.direccion).then(function (data) {
            alert("Camiseta editada exitosamente");
            _this.navCtrl.pop();
        }, function (error) {
            console.log(error);
            if (error.status === 404) {
                alert("La camiseta no existe");
            }
            else {
                if (error.status === 403) {
                    alert("No se tiene permiso para editar esta camiseta");
                }
                else {
                    alert("No se ha podido editar la camiseta");
                }
            }
        });
    };
    EditarcamisetaPage.prototype.validarCamposMinimoMaximo = function () {
        var ecgminimorelleno = false;
        var ecgmaximorelleno = false;
        var edaminimorelleno = false;
        var edamaximorelleno = false;
        var temperaturaminimorelleno = false;
        var temperaturamaximorelleno = false;
        if (this.formularioEditarCamiseta.value.ecgminimo != '' && this.formularioEditarCamiseta.value.ecgminimo != null && this.formularioEditarCamiseta.value.ecgminimo != undefined) {
            if (isNaN(this.formularioEditarCamiseta.value.ecgminimo)) {
                alert("El campo ECG minimo debe rellenarse con un número");
                return false;
            }
            ecgminimorelleno = true;
        }
        if (this.formularioEditarCamiseta.value.ecgmaximo != '' && this.formularioEditarCamiseta.value.ecgmaximo != null && this.formularioEditarCamiseta.value.ecgmaximo != undefined) {
            if (isNaN(this.formularioEditarCamiseta.value.ecgmaximo)) {
                alert("El campo ECG máximo debe rellenarse con un número");
                return false;
            }
            ecgmaximorelleno = true;
        }
        if (this.formularioEditarCamiseta.value.edaminimo != '' && this.formularioEditarCamiseta.value.edaminimo != null && this.formularioEditarCamiseta.value.edaminimo != undefined) {
            if (isNaN(this.formularioEditarCamiseta.value.edaminimo)) {
                alert("El campo EDA minimo debe rellenarse con un número");
                return false;
            }
            edaminimorelleno = true;
        }
        if (this.formularioEditarCamiseta.value.edamaximo != '' && this.formularioEditarCamiseta.value.edamaximo != null && this.formularioEditarCamiseta.value.edamaximo != undefined) {
            if (isNaN(this.formularioEditarCamiseta.value.ecgmaximo)) {
                alert("El campo EDA máximo debe rellenarse con un número");
                return false;
            }
            edamaximorelleno = true;
        }
        if (this.formularioEditarCamiseta.value.temperaturaminimo != '' && this.formularioEditarCamiseta.value.temperaturaminimo != null && this.formularioEditarCamiseta.value.temperaturaminimo != undefined) {
            if (isNaN(this.formularioEditarCamiseta.value.temperaturaminimo)) {
                alert("El campo Temperatura minimo debe rellenarse con un número");
                return false;
            }
            temperaturaminimorelleno = true;
        }
        if (this.formularioEditarCamiseta.value.temperaturamaximo != '' && this.formularioEditarCamiseta.value.temperaturamaximo != null && this.formularioEditarCamiseta.value.temperaturamaximo != undefined) {
            if (isNaN(this.formularioEditarCamiseta.value.temperaturamaximo)) {
                alert("El campo Temperatura máximo debe rellenarse con un número");
                return false;
            }
            temperaturamaximorelleno = true;
        }
        if (ecgminimorelleno && ecgmaximorelleno) {
            var v1 = Number(this.formularioEditarCamiseta.value.ecgminimo);
            var v2 = Number(this.formularioEditarCamiseta.value.ecgmaximo);
            if (v1 > v2) {
                alert("El umbral minimo de ECG no puede ser superior al umbral máximo");
                return false;
            }
        }
        if (edaminimorelleno && edamaximorelleno) {
            var v3 = Number(this.formularioEditarCamiseta.value.edaminimo);
            var v4 = Number(this.formularioEditarCamiseta.value.edamaximo);
            if (v3 > v4) {
                alert("El umbral minimo de EDA no puede ser superior al umbral máximo");
                return false;
            }
        }
        if (temperaturaminimorelleno && temperaturamaximorelleno) {
            var v5 = Number(this.formularioEditarCamiseta.value.temperaturaminimo);
            var v6 = Number(this.formularioEditarCamiseta.value.temperaturamaximo);
            if (v5 > v6) {
                alert("El umbral minimo de Temperatura no puede ser superior al umbral máximo");
                return false;
            }
        }
        return true;
    };
    EditarcamisetaPage.prototype.mostrarAvanzados = function () {
        this.escondeme = true;
    };
    EditarcamisetaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-editarcamiseta',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\editarcamiseta\editarcamiseta.html"*/'<!--\n\n  Generated template for the EditarcamisetaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n	<ion-toolbar color="primary">\n\n    <ion-buttons left>\n\n        <button ion-button icon-only (click)="irAtras()">\n\n          <ion-icon class="iconotoolbar" name="arrow-back" ></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title>Editar Camiseta</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="irInfo()">\n\n        <ion-icon class="iconotoolbar" name="information-circle" ></ion-icon>\n\n      </button>\n\n  </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content forceOverscroll="true">\n\n  <form [formGroup]="formularioEditarCamiseta" (ngSubmit)="editarCamiseta()">\n\n      <ion-label stacked>Icono *:</ion-label>\n\n      <ion-item class="imageselect image_{{imagen}}">\n\n        <ion-select (click)="prepararImagenesIcono()" formControlName="icono" cancelText="Cancelar" (ionChange)="ponerImagen(this.imagen)" [(ngModel)]="imagen">\n\n          <ion-option  *ngFor="let optionimagen of imagenes" [value]="optionimagen" (ionSelect)="selectIcono(optionimagen)">{{optionimagen}}</ion-option>\n\n        </ion-select>   \n\n      </ion-item>\n\n      <ion-label stacked>Nombre *:</ion-label>\n\n      <ion-input formControlName="nombre" type="text" placeholder="Nombre" [(ngModel)]="camiseta.nombre" clearOnEdit="false"></ion-input>\n\n      <ion-label stacked>Parentesco *:</ion-label>\n\n      <ion-input formControlName="parentesco" type="text" placeholder="Parentesco" [(ngModel)]="camiseta.parentesco" clearOnEdit="false"></ion-input>\n\n      <ion-label stacked>Fecha de nacimiento :</ion-label>\n\n      <ion-datetime formControlName="fechanacimiento" style="text-align:left" [(ngModel)]="camiseta.fechanacimiento" displayFormat="YYYY-MM-DD" cancelText="Cancelar" doneText="Validar" clearOnEdit="false"></ion-datetime>\n\n      <ion-label stacked>Sexo :</ion-label>\n\n      <ion-select class="ion-select-sexo" formControlName="sexo" [(ngModel)]="camiseta.sexo" cancelText="Cancelar">\n\n        <ion-option  value="H">Hombre</ion-option>\n\n        <ion-option  value="M">Mujer</ion-option>\n\n      </ion-select>\n\n      <ion-label stacked>ECG:</ion-label>\n\n      <div class="display-inline espaciado noalreves"><ion-input formControlName="ecgminimo" type="number" placeholder="minimo" [(ngModel)]="camiseta.ecgminimo" clearOnEdit="false"></ion-input><ion-input formControlName="ecgmaximo" type="number" placeholder="máximo" [(ngModel)]="camiseta.ecgmaximo" clearOnEdit="false"></ion-input></div>\n\n      <div class="justificado display-inline espaciado alreves"><ion-label>¿Apagar Notificaciones ECG?</ion-label><ion-checkbox slot="start" formControlName="notificacionesecg" color="primary" [(ngModel)]="notificacionesecg"></ion-checkbox></div> \n\n      <ion-label stacked>EDA:</ion-label>\n\n      <div class="display-inline espaciado noalreves"><ion-input formControlName="edaminimo" type="number" placeholder="minimo" [(ngModel)]="camiseta.edaminimo" clearOnEdit="false"></ion-input><ion-input formControlName="edamaximo" type="number" placeholder="máximo" [(ngModel)]="camiseta.edamaximo" clearOnEdit="false"></ion-input></div>\n\n      <div class="justificado display-inline espaciado alreves"><ion-label>¿Apagar Notificaciones EDA?</ion-label><ion-checkbox slot="start" formControlName="notificacioneseda" color="primary" [(ngModel)]="notificacioneseda"></ion-checkbox></div> \n\n      <ion-label stacked>Temperatura:</ion-label>\n\n      <div class="display-inline espaciado noalreves"><ion-input formControlName="temperaturaminimo" type="number" placeholder="minimo" [(ngModel)]="camiseta.temperaturaminimo" clearOnEdit="false"></ion-input><ion-input formControlName="temperaturamaximo" type="number" placeholder="máximo" [(ngModel)]="camiseta.temperaturamaximo" clearOnEdit="false"></ion-input></div>\n\n      <div class="justificado display-inline espaciado alreves"><ion-label>¿Apagar Notificaciones Temperatura?</ion-label><ion-checkbox slot="start" formControlName="notificacionestemperatura" color="primary" [(ngModel)]="notificacionestemperatura"></ion-checkbox></div>  \n\n      <ion-label stacked>Caidas:</ion-label>\n\n      <div class="justificado display-inline espaciado alreves"><ion-label>¿Notificar caidas?</ion-label><ion-checkbox git aslot="start" formControlName="notificacionescaida" color="primary" [(ngModel)]="notificacionescaida" ></ion-checkbox></div>\n\n      <div class="justificado display-inline espaciado"><button ion-button id="botonescondidas" type="button" class="buttonForm" (click) ="mostrarAvanzados()" [hidden]="escondeme">Datos Contacto</button></div>\n\n      <div *ngIf="escondeme">\n\n        <ion-label stacked>Telefono:</ion-label>\n\n        <ion-input formControlName="telefono" [(ngModel)]="camiseta.telefono" type="number" placeholder="Telefono" clearOnEdit="false"></ion-input>\n\n        <ion-label stacked>Telefono Contacto:</ion-label>\n\n        <ion-input formControlName="telefonocontacto" [(ngModel)]="camiseta.telefonocontacto" type="number" placeholder="Telefono" clearOnEdit="false"></ion-input>\n\n        <ion-label stacked>Dirección:</ion-label>\n\n        <ion-textarea formControlName="direccion" [(ngModel)]="camiseta.direccion" placeholder="Direccion" clearOnEdit="false"></ion-textarea>\n\n        <ion-label stacked>Notas:</ion-label>\n\n        <ion-textarea formControlName="notas" [(ngModel)]="camiseta.notas" placeholder="Notas" clearOnEdit="false"></ion-textarea>\n\n      </div> \n\n      <div class="justificado display-inline espaciado"><button ion-button class="submit-btn right buttonForm" type="submit" [disabled]="!formularioEditarCamiseta.valid">Guardar Cambios</button></div>  \n\n    </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\editarcamiseta\editarcamiseta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_rest_camiseta_rest_camiseta__["a" /* RestCamisetaProvider */]])
    ], EditarcamisetaPage);
    return EditarcamisetaPage;
}());

//# sourceMappingURL=editarcamiseta.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OlvidoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OlvidoPage = /** @class */ (function () {
    function OlvidoPage(menu, navCtrl, platform, formBuilder, rest) {
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.rest = rest;
        this.formulario = this.crearFormularioLogin();
    }
    OlvidoPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
    };
    OlvidoPage.prototype.navegarAtras = function () {
        this.navCtrl.pop();
    };
    OlvidoPage.prototype.recuperarCuenta = function () {
        var _this = this;
        this.rest.recuperarCuenta(this.formulario.value.email).then(function (data) {
            alert("Mira tu correo y sigue las instrucciones");
            _this.navCtrl.pop();
        }, function (error) {
            if (error.status === 404) {
                alert("El email introducido no pertenece a ninguna cuenta");
            }
            else {
                alert("No se ha podido enviar el email para recuperar la contraseña");
            }
        });
    };
    OlvidoPage.prototype.crearFormularioLogin = function () {
        return this.formBuilder.group({
            email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
    };
    OlvidoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-olvido',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\olvido\olvido.html"*/'<ion-content forceOverscroll="true">\n\n<div class="item">\n\n	<div id="titulo">\n\n	<h1>IoP-Shirt</h1><img alt="logo"/></div>\n\n	<div class="textocabecera">\n\n		<p class="justificado">¿Has olvidado tu contraseña?</p>\n\n		<p class="justificado">Introduce tu email</p>\n\n	</div>\n\n	<form [formGroup]="formulario" (ngSubmit)="recuperarCuenta()">\n\n		<ion-label stacked>Email:</ion-label>\n\n		<ion-input formControlName="email" type="text" placeholder="Email"></ion-input>\n\n	<button ion-button class="submit-btn right buttonForm" type="submit" [disabled]="!formulario.valid">\n\n	Recuperar cuenta\n\n	</button>\n\n	</form>\n\n</div>	\n\n\n\n</ion-content>\n\n<ion-footer no-border>\n\n	<div id="atras"><ion-icon class="flecha" name="arrow-back" (click)="navegarAtras()"></ion-icon></div>\n\n</ion-footer>\n\n	'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\olvido\olvido.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["e" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */]])
    ], OlvidoPage);
    return OlvidoPage;
}());

//# sourceMappingURL=olvido.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_camiseta_camiseta__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_component__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RegistroPage = /** @class */ (function () {
    function RegistroPage(menu, navCtrl, platform, formBuilder, rest, storage) {
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.rest = rest;
        this.storage = storage;
        this.PATTERN_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[A-Za-z\\d\\W]{6,}$";
        this.PATTERN_EMAIL = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
        this.passwordTipo = 'password';
        this.passwordClass = 'fas fa-eye-slash fa-lg fa-fw';
        this.passwordTipoConfirmacion = 'password';
        this.passwordClassConfirmacion = 'fas fa-eye-slash fa-lg fa-fw';
        this.formularioLogin = this.crearFormularioLogin();
    }
    RegistroPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
    };
    RegistroPage.prototype.navegarMain = function () {
        //quitamos la pagina de la pila
        this.navCtrl.pop();
    };
    RegistroPage.prototype.registro = function () {
        var _this = this;
        this.rest.registrar(this.formularioLogin.value.email, this.formularioLogin.value.password, "0").then(function (data) {
            __WEBPACK_IMPORTED_MODULE_7__app_app_component__["a" /* MyApp */].setNombreusuario(_this.formularioLogin.value.email.toLowerCase());
            _this.storage.set('nombreusuario', _this.formularioLogin.value.email.toLowerCase());
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_camiseta_camiseta__["a" /* CamisetaPage */]);
        }, function (error) {
            if (error.status === 409) {
                alert('Ya hay una cuenta con el email facilitado');
            }
            else {
                alert("No se ha podido registrar la cuenta");
            }
        });
    };
    //, Validators.pattern(this.PATTERN_PASSWORD)
    RegistroPage.prototype.crearFormularioLogin = function () {
        return this.formBuilder.group({
            email: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].pattern(this.PATTERN_EMAIL)
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].pattern(this.PATTERN_PASSWORD)])),
            confirmarpassword: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required, this.coincidepassword('password')]))
        });
    };
    /**
     * Metodo que comprueba si el valor de los 2 passwords coincide
     */
    RegistroPage.prototype.coincidepassword = function (passwordname) {
        var _this = this;
        return function (control) {
            var input = control.value;
            var isValid = control.root.value[passwordname] == input;
            console.log(_this.formularioLogin);
            if (!isValid) {
                return { 'equalTo': { isValid: isValid } };
            }
            else
                return null;
        };
    };
    RegistroPage.prototype.mostrarPassword = function () {
        this.passwordTipo = this.passwordTipo === 'text' ? 'password' : 'text';
        this.passwordClass = this.passwordClass === 'fas fa-eye-slash fa-lg fa-fw' ? 'fas fa-eye fa-lg fa-fw' : 'fas fa-eye-slash fa-lg fa-fw';
    };
    RegistroPage.prototype.mostrarPasswordConfirmacion = function () {
        this.passwordTipoConfirmacion = this.passwordTipoConfirmacion === 'text' ? 'password' : 'text';
        this.passwordClassConfirmacion = this.passwordClassConfirmacion === 'fas fa-eye-slash fa-lg fa-fw' ? 'fas fa-eye fa-lg fa-fw' : 'fas fa-eye-slash fa-lg fa-fw';
    };
    RegistroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-registro',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\registro\registro.html"*/'<ion-content forceOverscroll="true">\n\n		<div class="item">\n\n			<div id="titulo">\n\n			<h1>IoP-Shirt</h1><img alt="logo"/></div>\n\n			<h2>Registrar Cuenta</h2>\n\n			<div class="justificado">Para registrar tu cuenta debes indica una dirección de correo electrónico. El password debe contener al menos 6 caracteres, debe contener una minúscula, debe contener una mayúscula, un digito y un caracter especial</div>\n\n			<form [formGroup]="formularioLogin" (ngSubmit)="registro()">\n\n				<ion-label stacked>Email:</ion-label>\n\n				<ion-input formControlName="email" type="text" placeholder="Email" clearOnEdit="false"></ion-input>\n\n				<ion-label stacked>Password:</ion-label>\n\n				<div class="inputConIcono">\n\n					<ion-input formControlName="password" [type]="passwordTipo" placeholder="Password" clearOnEdit="false"></ion-input>\n\n					<i [class]="passwordClass" aria-hidden="true" (click)="mostrarPassword()"></i>\n\n				</div>\n\n				<ion-label stacked>Confirmar Password:</ion-label>\n\n				<div class="inputConIcono">\n\n					<ion-input formControlName="confirmarpassword" [type]="passwordTipoConfirmacion" placeholder="Confirmar Password" clearOnEdit="false"></ion-input>\n\n					<i [class]="passwordClassConfirmacion" aria-hidden="true" (click)="mostrarPasswordConfirmacion()"></i>\n\n				</div>	\n\n				<button ion-button class="submit-btn right buttonLogin" type="submit" [disabled]="!formularioLogin.valid">\n\n					Registrar Cuenta\n\n				</button>\n\n				<button ion-button class="submit-btn right button-white-black buttonLogin" type="button" (click)="navegarMain()">\n\n					Atrás\n\n				</button>\n\n			</form>\n\n		</div>	\n\n		\n\n		</ion-content>\n\n			'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\registro\registro.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["e" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroFacebookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_camiseta_camiseta__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_component__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm_ngx__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RegistroFacebookPage = /** @class */ (function () {
    function RegistroFacebookPage(menu, navCtrl, platform, formBuilder, rest, storage, fcm, navParams) {
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.rest = rest;
        this.storage = storage;
        this.fcm = fcm;
        this.navParams = navParams;
        this.PATTERN_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[A-Za-z\\d\\W]{6,}$";
        this.PATTERN_EMAIL = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
        this.passwordTipo = 'password';
        this.passwordClass = 'fas fa-eye-slash fa-lg fa-fw';
        this.passwordTipoConfirmacion = 'password';
        this.passwordClassConfirmacion = 'fas fa-eye-slash fa-lg fa-fw';
        this.formularioLogin = this.crearFormularioLogin();
        this.redsocial = this.navParams.get('red');
    }
    RegistroFacebookPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
    };
    RegistroFacebookPage.prototype.navegarMain = function () {
        //quitamos la pagina de la pila
        this.storage.set("tokenfacebook", null);
        this.storage.set("usuariofacebook", null);
        this.storage.set("esFacebook", "0");
        this.navCtrl.pop();
    };
    RegistroFacebookPage.prototype.registro = function () {
        var _this = this;
        var redelegida = "1";
        if (this.redsocial == "facebook") {
            redelegida = "1";
        }
        if (this.redsocial == "google") {
            redelegida = "2";
        }
        this.rest.registrar(__WEBPACK_IMPORTED_MODULE_7__app_app_component__["a" /* MyApp */].getNombreusuario(), this.formularioLogin.value.password, redelegida).then(function (data) {
            _this.storage.set('nombreusuario', __WEBPACK_IMPORTED_MODULE_7__app_app_component__["a" /* MyApp */].getNombreusuario().toLowerCase());
            _this.fcm.getToken().then(function (token) {
                //vamos a guardar el token tanto en el storage como en el backend
                _this.storage.set("tokennotificacion", token);
                _this.rest.registrarToken(__WEBPACK_IMPORTED_MODULE_7__app_app_component__["a" /* MyApp */].getNombreusuario(), token);
            });
            _this.fcm.onTokenRefresh().subscribe(function (token) {
                _this.storage.set("tokennotificacion", token);
                _this.rest.registrarToken(__WEBPACK_IMPORTED_MODULE_7__app_app_component__["a" /* MyApp */].getNombreusuario(), token);
            });
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_camiseta_camiseta__["a" /* CamisetaPage */]);
        }, function (error) {
            if (error.status === 409) {
                alert('Ya hay una cuenta con el email facilitado');
            }
            else {
                alert("No se ha podido registrar la cuenta");
            }
        });
    };
    //, Validators.pattern(this.PATTERN_PASSWORD)
    RegistroFacebookPage.prototype.crearFormularioLogin = function () {
        return this.formBuilder.group({
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].pattern(this.PATTERN_PASSWORD)])),
            confirmarpassword: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required, this.coincidepassword('password')]))
        });
    };
    /**
     * Metodo que comprueba si el valor de los 2 passwords coincide
     */
    RegistroFacebookPage.prototype.coincidepassword = function (passwordname) {
        var _this = this;
        return function (control) {
            var input = control.value;
            var isValid = control.root.value[passwordname] == input;
            console.log(_this.formularioLogin);
            if (!isValid) {
                return { 'equalTo': { isValid: isValid } };
            }
            else
                return null;
        };
    };
    RegistroFacebookPage.prototype.mostrarPassword = function () {
        this.passwordTipo = this.passwordTipo === 'text' ? 'password' : 'text';
        this.passwordClass = this.passwordClass === 'fas fa-eye-slash fa-lg fa-fw' ? 'fas fa-eye fa-lg fa-fw' : 'fas fa-eye-slash fa-lg fa-fw';
    };
    RegistroFacebookPage.prototype.mostrarPasswordConfirmacion = function () {
        this.passwordTipoConfirmacion = this.passwordTipoConfirmacion === 'text' ? 'password' : 'text';
        this.passwordClassConfirmacion = this.passwordClassConfirmacion === 'fas fa-eye-slash fa-lg fa-fw' ? 'fas fa-eye fa-lg fa-fw' : 'fas fa-eye-slash fa-lg fa-fw';
    };
    RegistroFacebookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-registrofacebook',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\registrofacebook\registrofacebook.html"*/'<ion-content forceOverscroll="true">\n\n		<div class="item">\n\n			<div class="justificado">Para terminar de asociar tu cuenta a tu Facebook debes crear una contraseña. El password debe contener al menos 6 caracteres, debe contener una minúscula, debe contener una mayúscula, un digito y un caracter especial</div>\n\n			<form [formGroup]="formularioLogin" (ngSubmit)="registro()">\n\n					<ion-label stacked>Password:</ion-label>\n\n					<div class="inputConIcono">\n\n						<ion-input formControlName="password" [type]="passwordTipo" placeholder="Password" clearOnEdit="false"></ion-input>\n\n						<i [class]="passwordClass" aria-hidden="true" (click)="mostrarPassword()"></i>\n\n					</div>\n\n					<ion-label stacked>Confirmar Password:</ion-label>\n\n					<div class="inputConIcono">\n\n						<ion-input formControlName="confirmarpassword" [type]="passwordTipoConfirmacion" placeholder="Confirmar Password" clearOnEdit="false"></ion-input>\n\n						<i [class]="passwordClassConfirmacion" aria-hidden="true" (click)="mostrarPasswordConfirmacion()"></i>\n\n					</div><button ion-button class="submit-btn right buttonLogin" type="submit" [disabled]="!formularioLogin.valid">\n\n					Registrar Cuenta\n\n				</button>\n\n				<button ion-button class="submit-btn right button-white-black buttonLogin" type="button" (click)="navegarMain()">\n\n					Atrás\n\n				</button>\n\n			</form>\n\n		</div>	\n\n		\n\n		</ion-content>\n\n			'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\registrofacebook\registrofacebook.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["e" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm_ngx__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], RegistroFacebookPage);
    return RegistroFacebookPage;
}());

//# sourceMappingURL=registrofacebook.js.map

/***/ }),

/***/ 188:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 188;

/***/ }),

/***/ 231:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 231;

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen_ngx__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_init_init__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_quees_quees__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_camiseta_camiseta__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_olvido_olvido__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_registro_registro__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_registrofacebook_registrofacebook__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_configuracion_configuracion__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_info_info__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_crearcamiseta_crearcamiseta__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_editarcamiseta_editarcamiseta__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_fcm_ngx__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_rest_rest__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_constantes_constantes__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_facebook_ngx__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var MyApp = /** @class */ (function () {
    function MyApp(app, splashScreen, platform, menu, storage, fcm, rest, facebook) {
        var _this = this;
        this.app = app;
        this.splashScreen = splashScreen;
        this.platform = platform;
        this.menu = menu;
        this.storage = storage;
        this.fcm = fcm;
        this.rest = rest;
        this.facebook = facebook;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_init_init__["a" /* InitPage */];
        this.platform.ready().then(function () {
            //creamos una acccion asociada 
            _this.fcm.onNotification().subscribe(function (data) {
                setTimeout(function () { return _this.redirigirNotificacion(data); }, 500);
                //comprobamos si esta logado o no
            });
            _this.storage.get('nombreusuario').then(function (val) {
                if (val == null || val == 'undefined' || val == '') {
                    _this.redirigirInit();
                }
                else {
                    MyApp_1.nombreusuario = val;
                    _this.fcm.getToken().then(function (token) {
                        //vamos a guardar el token tanto en el storage como en el backend
                        _this.storage.set("tokennotificacion", token);
                        _this.rest.registrarToken(MyApp_1.nombreusuario, token);
                    });
                    _this.fcm.onTokenRefresh().subscribe(function (token) {
                        _this.storage.set("tokennotificacion", token);
                        _this.rest.registrarToken(MyApp_1.nombreusuario, token);
                    });
                    _this.redirigirCamiseta();
                }
            });
        });
    }
    MyApp_1 = MyApp;
    MyApp.prototype.redirigirNotificacion = function (data) {
        var _this = this;
        this.storage.get('nombreusuario').then(function (val) {
            if (data['tipo'] == "bateria") {
                //la bateria se redirige siempre a la vista de camisetas
                _this.redirigirCamiseta();
            }
            if (data['tipo'] == "caida") {
                _this.redirigirConstantes(data['idcamiseta'], data['nombre'], data['numeroserie'], null, data.wasTapped);
            }
            if (data['tipo'] == "temperatura") {
                _this.redirigirConstantes(data['idcamiseta'], data['nombre'], data['numeroserie'], "temperatura", data.wasTapped);
            }
            if (data['tipo'] == "ecg") {
                _this.redirigirConstantes(data['idcamiseta'], data['nombre'], data['numeroserie'], "ecg", data.wasTapped);
            }
            if (data['tipo'] == "eda") {
                _this.redirigirConstantes(data['idcamiseta'], data['nombre'], data['numeroserie'], "eda", data.wasTapped);
            }
        });
    };
    MyApp.prototype.go = function (name) {
        switch (name) {
            case 'init':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_init_init__["a" /* InitPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_init_init__["a" /* InitPage */]);
                this.storage.set("nombreusuario", null);
                this.storage.set("tokenfacebook", null);
                this.storage.set("usuariofacebook", null);
                this.storage.set("esFacebook", "0");
                this.facebook.logout().then(function () { return console.log("Eliminado login Facebook"); });
                break;
            case 'quees':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_quees_quees__["a" /* QueesPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_quees_quees__["a" /* QueesPage */]);
                break;
            case 'camiseta':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_camiseta_camiseta__["a" /* CamisetaPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_camiseta_camiseta__["a" /* CamisetaPage */]);
                break;
            case 'login':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
                break;
            case 'olvido':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_olvido_olvido__["a" /* OlvidoPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_olvido_olvido__["a" /* OlvidoPage */]);
                break;
            case 'registro':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_registro_registro__["a" /* RegistroPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_registro_registro__["a" /* RegistroPage */]);
                break;
            case 'registrofacebook':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_registrofacebook_registrofacebook__["a" /* RegistroFacebookPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_registrofacebook_registrofacebook__["a" /* RegistroFacebookPage */]);
                break;
            case 'configuracion':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_camiseta_camiseta__["a" /* CamisetaPage */];
                this.nav.push(__WEBPACK_IMPORTED_MODULE_11__pages_configuracion_configuracion__["a" /* ConfiguracionPage */]);
                break;
            case 'info':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_12__pages_info_info__["a" /* InfoPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_info_info__["a" /* InfoPage */]);
                break;
            case 'crearcamiseta':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_13__pages_crearcamiseta_crearcamiseta__["a" /* CrearcamisetaPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_crearcamiseta_crearcamiseta__["a" /* CrearcamisetaPage */]);
                break;
            case 'editarcamiseta':
                this.rootPage = __WEBPACK_IMPORTED_MODULE_14__pages_editarcamiseta_editarcamiseta__["a" /* EditarcamisetaPage */];
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_14__pages_editarcamiseta_editarcamiseta__["a" /* EditarcamisetaPage */]);
                break;
        }
        this.menu.close();
    };
    MyApp.prototype.redirigirInit = function () {
        console.log("Redirigiendo a Init");
        this.splashScreen.hide();
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_init_init__["a" /* InitPage */];
    };
    MyApp.prototype.redirigirCamiseta = function () {
        console.log("Redirigiendo a Camiseta");
        this.splashScreen.hide();
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_camiseta_camiseta__["a" /* CamisetaPage */];
    };
    MyApp.prototype.redirigirConstantes = function (idcamiseta, nombre, numeroserie, pagina, modo) {
        console.log("Redirigiendo a Constantes");
        //creamos un objeto camiseta
        var camiseta = {};
        camiseta["id"] = idcamiseta;
        camiseta["numeroserie"] = numeroserie;
        camiseta['nombre'] = nombre;
        if (this.nav.getActive().name == 'ConstantesPage') {
            //si esta en la pagina de constantes no hay que hacer nada
            return;
        }
        if (modo) {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_17__pages_constantes_constantes__["a" /* ConstantesPage */], { camiseta: camiseta, pagina: pagina });
        }
        else {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_17__pages_constantes_constantes__["a" /* ConstantesPage */], { camiseta: camiseta, pagina: pagina });
        }
    };
    MyApp.prototype.logout = function () {
        this.storage.set("nombreusuario", null);
        this.storage.set("tokenfacebook", null);
        this.storage.set("esFacebook", "0");
        this.storage.set("usuariofacebook", null);
        this.facebook.logout().then(function () { return console.log("Eliminado login Facebook"); });
        this.platform.exitApp();
    };
    Object.defineProperty(MyApp.prototype, "staticnombreusuario", {
        get: function () {
            return MyApp_1.nombreusuario;
        },
        enumerable: true,
        configurable: true
    });
    MyApp.getNombreusuario = function () {
        return MyApp_1.nombreusuario;
    };
    MyApp.setNombreusuario = function (nombreusuario) {
        MyApp_1.nombreusuario = nombreusuario;
    };
    var MyApp_1;
    MyApp.nombreusuario = '';
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('myNav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = MyApp_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\app\app.html"*/'<ion-menu [content]="content">\n\n	<ion-header>\n\n		<ion-toolbar color="primary">\n\n			<ion-title class="margenabajo">\n\n				{{ staticnombreusuario }} \n\n				<ion-icon (click)="go(\'init\')" class="derecha" name="exit"></ion-icon>\n\n			</ion-title>\n\n		</ion-toolbar>\n\n	</ion-header>\n\n\n\n	<ion-content class="menu">\n\n		<ion-list class="listado-menu">\n\n			<ion-item (click)="go(\'camiseta\')" class="item-menu">\n\n				<ion-icon name="shirt" class="icon_menu" item-left></ion-icon>\n\n				<ion-label>Camisetas</ion-label>\n\n			</ion-item>\n\n			<ion-item (click)="go(\'configuracion\')" class="item-menu segundomenu">\n\n				<ion-icon name="settings" class="icon_menu" item-left></ion-icon>\n\n				<ion-label>Configuración</ion-label>\n\n			</ion-item>\n\n		</ion-list>\n\n	</ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav #myNav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen_ngx__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_fcm_ngx__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_16__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_facebook_ngx__["a" /* Facebook */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EcgPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the EcgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EcgPage = /** @class */ (function () {
    function EcgPage(navCtrl, navParams, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.fps = 20;
        this.customOptionsDe = {
            buttons: [{
                    text: 'Clear',
                    handler: function () { return _this.constantes.fechaDe = null; }
                }]
        };
        this.customOptionsHasta = {
            buttons: [{
                    text: 'Clear',
                    handler: function () { return _this.constantes.fechaHasta = null; }
                }]
        };
        this.constantes = this.navParams.get('constantes');
    }
    EcgPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EcgPage');
        this.constantes.setEcgP(this);
        this.data = [];
        this.canvas = document.getElementById("canvasecg");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.platform.width();
        this.canvas.height = this.platform.width();
        this.ctx.translate(0, this.canvas.height);
        this.ctx.scale(10, -0.5);
        this.frame = 0;
        this.x = 0;
        this.panAtX = 25;
        this.continuarAnimacion = true;
        this.fpsIntervalo = 1000 / this.fps;
        this.then = Date.now();
        this.animate();
    };
    EcgPage.prototype.ionViewWillUnload = function () {
        this.apagarContinuarAnimacion();
    };
    EcgPage.prototype.animate = function () {
        //lo primero es comprobar si hay nuevos datos
        if (this.constantes.getValorecgcambiado() == true) {
            this.data = this.constantes.getDatosecg();
            this.constantes.setValorecgcambiado(false);
            this.x = 0;
            this.then = Date.now();
        }
        if (this.continuarAnimacion) {
            requestAnimationFrame(this.animate.bind(this));
        }
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.lineWidth = 1;
        if (this.x > this.data.length - 1) {
            return;
        }
        var now = Date.now();
        var transcurrido = now - this.then;
        if (transcurrido > this.fpsIntervalo) {
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
            this.ctx.beginPath();
            if (this.x++ < this.panAtX) {
                for (var xx = 0; xx <= this.x; xx++) {
                    if (xx == 0) {
                        this.ctx.moveTo(xx, this.data[xx]);
                    }
                    else {
                        this.ctx.lineTo(xx, this.data[xx]);
                    }
                }
                this.ctx.stroke();
            }
            else {
                for (var xx2 = 0; xx2 < this.panAtX; xx2++) {
                    var y = this.data[this.x - this.panAtX + xx2];
                    if (xx2 == 0) {
                        this.ctx.moveTo(xx2, y);
                    }
                    else {
                        this.ctx.lineTo(xx2, y);
                    }
                }
                this.ctx.stroke();
            }
            this.then = now - (transcurrido % this.fpsIntervalo);
        }
    };
    EcgPage.prototype.activarDesactivar = function () {
        this.constantes.deHabilitado = this.constantes.actual;
        this.constantes.hastaHabilitado = this.constantes.actual;
        if (this.constantes.actual == true) {
            this.continuarAnimacion = true;
            this.constantes.obtenerDatosRecientes();
            this.animate();
        }
        else {
            this.apagarContinuarAnimacion();
            this.constantes.apagarTimeout();
        }
    };
    EcgPage.prototype.apagarContinuarAnimacion = function () {
        this.continuarAnimacion = false;
    };
    EcgPage.prototype.encenderContinuarAnimacion = function () {
        this.continuarAnimacion = true;
        this.animate();
    };
    EcgPage.prototype.obtenerConstantesFecha = function () {
        if (this.constantes.fechaDe != null && this.constantes.fechaDe != undefined && this.constantes.fechaDe != null && this.constantes.fechaHasta != undefined) {
            this.constantes.obtenerDatosHistoricos();
        }
    };
    EcgPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-ecg',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\ecg\ecg.html"*/'<!--\n\n  Generated template for the EcgPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-content>\n\n    <div class="cajaCalendario">\n\n        <ion-item>\n\n            <ion-label>De:</ion-label>\n\n            <ion-datetime id="fechade" disabled="{{constantes.deHabilitado}}" (ionChange)="obtenerConstantesFecha()"  displayFormat="YYYY-MM-DD HH:mm" min="2019"  cancelText="Cancelar" doneText="Validar" [(ngModel)]="constantes.fechaDe" [pickerOptions]="customOptionsDe"></ion-datetime>\n\n        </ion-item>\n\n       <ion-item>\n\n            <ion-label>Hasta:</ion-label>\n\n            <ion-datetime id="fechahasta" disabled="{{constantes.hastaHabilitado}}" (ionChange)="obtenerConstantesFecha()"  displayFormat="YYYY-MM-DD HH:mm" min="2019" cancelText="Cancelar" doneText="Validar" [(ngModel)]="constantes.fechaHasta" [pickerOptions]="customOptionsHasta"></ion-datetime>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label slot="start">¿Tiempo real?</ion-label>\n\n            <ion-checkbox item-right color="primary"  [(ngModel)]="constantes.actual" (click)="activarDesactivar();"></ion-checkbox>\n\n        </ion-item>\n\n    </div>\n\n    <canvas id="canvasecg"></canvas>\n\n</ion-content>\n\n\n\n<ion-footer class="footerConstantes" no-border>\n\n<b>NPM</b>\n\n<div style="display:flex; justify-content: space-between;">\n\n<div>MIN: {{constantes.getPulsacionesmin()}}</div>\n\n<div>MED: {{constantes.getPulsacionesmedias()}}</div>\n\n<div>MAX: {{constantes.getPulsacionesmax()}}</div>\n\n</div>\n\n\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\ecg\ecg.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
    ], EcgPage);
    return EcgPage;
}());

//# sourceMappingURL=ecg.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EdaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the EdaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EdaPage = /** @class */ (function () {
    function EdaPage(navCtrl, navParams, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.fps = 20;
        this.customOptionsDe = {
            buttons: [{
                    text: 'Clear',
                    handler: function () { return _this.constantes.fechaDe = null; }
                }]
        };
        this.customOptionsHasta = {
            buttons: [{
                    text: 'Clear',
                    handler: function () { return _this.constantes.fechaHasta = null; }
                }]
        };
        this.constantes = this.navParams.get('constantes');
    }
    EdaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EdaPage');
        this.constantes.setEdaP(this);
        this.data = [];
        this.canvas = document.getElementById("canvaseda");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.platform.width();
        this.canvas.height = this.platform.width();
        this.ctx.translate(0, this.canvas.height - 100);
        this.ctx.scale(10, -0.5);
        this.frame = 0;
        this.x = 0;
        this.panAtX = 25;
        this.continuarAnimacion = true;
        this.fpsIntervalo = 1000 / this.fps;
        this.then = Date.now();
        this.animate();
    };
    EdaPage.prototype.ionViewWillUnload = function () {
        this.apagarContinuarAnimacion();
    };
    EdaPage.prototype.animate = function () {
        //lo primero es comprobar si hay nuevos datos
        if (this.constantes.getValoredacambiado() == true) {
            this.data = this.constantes.getDatoseda();
            this.constantes.setValoredacambiado(false);
            this.x = 0;
            this.then = Date.now();
        }
        if (this.continuarAnimacion) {
            requestAnimationFrame(this.animate.bind(this));
        }
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.lineWidth = 1;
        if (this.x > this.data.length - 1) {
            return;
        }
        var now = Date.now();
        var transcurrido = now - this.then;
        if (transcurrido > this.fpsIntervalo) {
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
            this.ctx.beginPath();
            if (this.x++ < this.panAtX) {
                for (var xx = 0; xx <= this.x; xx++) {
                    if (xx == 0) {
                        this.ctx.moveTo(xx, this.data[xx]);
                    }
                    else {
                        this.ctx.lineTo(xx, this.data[xx]);
                    }
                }
                this.ctx.stroke();
            }
            else {
                for (var xx2 = 0; xx2 < this.panAtX; xx2++) {
                    var y = this.data[this.x - this.panAtX + xx2];
                    if (xx == 0) {
                        this.ctx.moveTo(xx2, y);
                    }
                    else {
                        this.ctx.lineTo(xx2, y);
                    }
                }
                this.ctx.stroke();
            }
            this.then = now - (transcurrido % this.fpsIntervalo);
        }
    };
    EdaPage.prototype.activarDesactivar = function () {
        this.constantes.deHabilitado = this.constantes.actual;
        this.constantes.hastaHabilitado = this.constantes.actual;
        if (this.constantes.actual == true) {
            this.continuarAnimacion = true;
            this.constantes.obtenerDatosRecientes();
            this.animate();
        }
        else {
            this.apagarContinuarAnimacion();
            this.constantes.apagarTimeout();
        }
    };
    EdaPage.prototype.apagarContinuarAnimacion = function () {
        this.continuarAnimacion = false;
    };
    EdaPage.prototype.obtenerConstantesFecha = function () {
        if (this.constantes.fechaDe != null && this.constantes.fechaDe != undefined && this.constantes.fechaDe != null && this.constantes.fechaHasta != undefined) {
            this.constantes.obtenerDatosHistoricos();
        }
    };
    EdaPage.prototype.encenderContinuarAnimacion = function () {
        this.continuarAnimacion = true;
        this.animate();
    };
    EdaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-eda',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\eda\eda.html"*/'<!--\n\n  Generated template for the EdaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content>\n\n  <div class="cajaCalendario">\n\n      <ion-item>\n\n          <ion-label>De:</ion-label>\n\n          <ion-datetime id="fechade" disabled="{{constantes.deHabilitado}}" (ionChange)="obtenerConstantesFecha()"  displayFormat="YYYY-MM-DD HH:mm" min="2019"  cancelText="Cancelar" doneText="Validar" [(ngModel)]="constantes.fechaDe" [pickerOptions]="customOptionsDe"></ion-datetime>\n\n      </ion-item>\n\n     <ion-item>\n\n          <ion-label>Hasta:</ion-label>\n\n          <ion-datetime id="fechahasta" disabled="{{constantes.hastaHabilitado}}" (ionChange)="obtenerConstantesFecha()"  displayFormat="YYYY-MM-DD HH:mm" min="2019" cancelText="Cancelar" doneText="Validar" [(ngModel)]="constantes.fechaHasta" [pickerOptions]="customOptionsHasta"></ion-datetime>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label slot="start">¿Tiempo real?</ion-label>\n\n          <ion-checkbox item-right color="primary"  [(ngModel)]="constantes.actual" (click)="activarDesactivar();"></ion-checkbox>\n\n      </ion-item>\n\n  </div>\n\n  <canvas id="canvaseda"></canvas>\n\n</ion-content>\n\n\n\n<ion-footer class="footerConstantes" no-border>\n\n    <b>EDA</b>\n\n    <div style="display:flex; justify-content: space-between;">\n\n    <div>MIN: {{constantes.getEdamin()}}</div>\n\n    <div>MED: {{constantes.getEdamedias()}}</div>\n\n    <div>MAX: {{constantes.getEdamax()}}</div>\n\n    </div>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\eda\eda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
    ], EdaPage);
    return EdaPage;
}());

//# sourceMappingURL=eda.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemperaturaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TemperaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TemperaturaPage = /** @class */ (function () {
    function TemperaturaPage(navCtrl, navParams, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.columnSize = 30;
        this.margin = 10;
        this.Val_max = 42;
        this.Val_min = 32;
        this.customOptionsDe = {
            buttons: [{
                    text: 'Clear',
                    handler: function () { return _this.constantes.fechaDe = null; }
                }]
        };
        this.customOptionsHasta = {
            buttons: [{
                    text: 'Clear',
                    handler: function () { return _this.constantes.fechaHasta = null; }
                }]
        };
        this.constantes = this.navParams.get('constantes');
    }
    TemperaturaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TemperaturaPage');
        this.constantes.setTemperaturaP(this);
        this.data = [];
        this.xAxis = [];
        this.canvas = document.getElementById("canvastem");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.platform.width();
        this.canvas.height = this.platform.width();
        this.prepararGrafica();
    };
    TemperaturaPage.prototype.activarDesactivar = function () {
        this.constantes.deHabilitado = this.constantes.actual;
        this.constantes.hastaHabilitado = this.constantes.actual;
        if (this.constantes.actual == true) {
            this.constantes.obtenerDatosRecientes();
            this.prepararGrafica();
        }
        else {
            this.constantes.apagarTimeout();
        }
    };
    TemperaturaPage.prototype.ionViewWillUnload = function () {
        clearTimeout(this.timerId);
    };
    TemperaturaPage.prototype.prepararGrafica = function () {
        //son los registros actuales
        if (this.constantes.getValortemperaturacambiado() == true) {
            this.data = this.constantes.getDatostemperatura();
            this.constantes.setValortemperaturacambiado(false);
            this.xAxis = [];
            if (this.constantes.actual == true) {
                //Deben pintarse 3 valores (10min, 5min, actual)
                var actual = new Date();
                var milisecondsactual = actual.valueOf();
                var inicial = new Date(milisecondsactual - this.data.length * 60000);
                this.xAxis.push(inicial.toLocaleString());
                inicial = new Date(milisecondsactual - (this.data.length - 5 + 1) * 60000);
                this.xAxis.push(inicial.toLocaleString());
                inicial = new Date(milisecondsactual - (this.data.length - 10 + 1) * 60000);
                this.xAxis.push(inicial.toLocaleString());
            }
            else {
                //tiene que ser entre dos fechas, la primera y la ultima son las elegidas por la persona y 
                //la del medio la mitad de las dos
                var ini = Date.parse(this.constantes.fechaDe.toLocaleString());
                var fin = Date.parse(this.constantes.fechaHasta.toLocaleString());
                //le restamos una hora
                ini = ini - (1000 * 3600);
                fin = fin - (1000 * 3600);
                var msseconds = Math.floor((fin - ini) / 2);
                var medio = fin - msseconds;
                var d1 = new Date(ini);
                var d2 = new Date(medio);
                var d3 = new Date(fin);
                this.xAxis.push(d1.toLocaleString());
                this.xAxis.push(d2.toLocaleString());
                this.xAxis.push(d3.toLocaleString());
            }
            this.rowSize = 2.5;
            this.stepSize = 2;
            this.dibujarGrafica();
        }
        var that = this;
        this.timerId = setTimeout(function () { that.prepararGrafica(); }, 5000);
    };
    TemperaturaPage.prototype.dibujarGrafica = function () {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#0099ff";
        this.ctx.font = "20 pt Verdana";
        var yScale = (this.canvas.height - this.columnSize - this.margin) / (this.Val_max - this.Val_min);
        var xScale = (this.canvas.width - this.rowSize) / this.data.length;
        this.ctx.strokeStyle = "#488aff"; // color of grid lines
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillText(this.xAxis[0], 0, this.columnSize - this.margin);
        this.ctx.fillText(this.xAxis[1], this.canvas.width / 3, this.columnSize - this.margin);
        this.ctx.fillText(this.xAxis[2], 2 * this.canvas.width / 3, this.columnSize - this.margin);
        var count = 0;
        for (var scale = this.Val_max; scale >= this.Val_min; scale = scale - this.stepSize) {
            var y = this.columnSize + (yScale * count * this.stepSize);
            this.ctx.fillText(scale, this.margin, y + this.margin);
            this.ctx.moveTo(this.rowSize, y);
            this.ctx.lineTo(this.canvas.width, y);
            count++;
        }
        this.ctx.stroke();
        this.ctx.translate(this.rowSize, this.canvas.height + this.Val_min * yScale);
        this.ctx.scale(1, -1 * yScale);
        // Color of each dataplot items
        this.ctx.strokeStyle = "#FF0066";
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.data[0]);
        for (var i = 1; i < this.data.length; i++) {
            this.ctx.lineTo(i * xScale, this.data[i]);
        }
        this.ctx.restore();
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.stroke();
    };
    TemperaturaPage.prototype.obtenerConstantesFecha = function () {
        if (this.constantes.fechaDe != null && this.constantes.fechaDe != undefined && this.constantes.fechaDe != null && this.constantes.fechaHasta != undefined) {
            this.constantes.obtenerDatosHistoricos();
        }
    };
    TemperaturaPage.prototype.encenderContinuarAnimacion = function () {
        this.prepararGrafica();
    };
    TemperaturaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-temperatura',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\temperatura\temperatura.html"*/'<!--\n\n  Generated template for the TemperaturaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content>\n\n  <div class="cajaCalendario">\n\n      <ion-item>\n\n          <ion-label>De:</ion-label>\n\n          <ion-datetime id="fechade" disabled="{{constantes.deHabilitado}}" (ionChange)="obtenerConstantesFecha()"  displayFormat="YYYY-MM-DD HH:mm" min="2019"  cancelText="Cancelar" doneText="Validar" [(ngModel)]="constantes.fechaDe" [pickerOptions]="customOptionsDe"></ion-datetime>\n\n      </ion-item>\n\n     <ion-item>\n\n          <ion-label>Hasta:</ion-label>\n\n          <ion-datetime id="fechahasta" disabled="{{constantes.hastaHabilitado}}" (ionChange)="obtenerConstantesFecha()"  displayFormat="YYYY-MM-DD HH:mm" min="2019" cancelText="Cancelar" doneText="Validar" [(ngModel)]="constantes.fechaHasta" [pickerOptions]="customOptionsHasta"></ion-datetime>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label slot="start">¿Tiempo real?</ion-label>\n\n          <ion-checkbox item-right color="primary"  [(ngModel)]="constantes.actual" (click)="activarDesactivar();"></ion-checkbox>\n\n      </ion-item>\n\n  </div>\n\n  <canvas id="canvastem"></canvas>\n\n</ion-content>\n\n\n\n<ion-footer class="footerConstantes" no-border>\n\n    <b>Temperatura</b>\n\n    <div style="display:flex; justify-content: space-between;">\n\n    <div>MIN: {{constantes.getTemperaturamin()}}</div>\n\n    <div>MED: {{constantes.getTemperaturamedias()}}</div>\n\n    <div>MAX: {{constantes.getTemperaturamax()}}</div>\n\n    </div>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\temperatura\temperatura.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
    ], TemperaturaPage);
    return TemperaturaPage;
}());

//# sourceMappingURL=temperatura.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestConstantesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_crashlytics_ngx__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AUTHORIZACION = "healthshirt20192020";
var MAIN_URL = "https://www.jmcastellano.eu/healthshirt/api/";
var INFORMACION_URL = "informacion/";
var VERSION = "v2/";
var TIMEOUT_MAXIMO = 10000;
/*
  Generated class for the RestCamisetaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestConstantesProvider = /** @class */ (function () {
    function RestConstantesProvider(http, firebaseCrashlytics) {
        this.http = http;
        this.firebaseCrashlytics = firebaseCrashlytics;
        this.crashlytics = this.firebaseCrashlytics.initialise();
    }
    RestConstantesProvider.prototype.obtenerConstantesUltimoMinuto = function (numeroserie) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            _this.http.get(MAIN_URL + VERSION + INFORMACION_URL + "actual/?numeroserie=" + numeroserie, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se han podido obtener las constantes vitales actuales de la camiseta " + numeroserie + " " + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestConstantesProvider.prototype.obtenerConstantesHistorico = function (numeroserie, fechaDe, fechaHasta) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "numeroserie": numeroserie,
                "fechade": fechaDe,
                "fechahasta": fechaHasta
            };
            _this.http.post(MAIN_URL + VERSION + INFORMACION_URL + "historico/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se han podido obtener las constantes vitales historicas de la camiseta " + numeroserie + " del " + fechaDe + " hasta " + fechaHasta + " "
                    + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestConstantesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_crashlytics_ngx__["a" /* FirebaseCrashlytics */]])
    ], RestConstantesProvider);
    return RestConstantesProvider;
}());

//# sourceMappingURL=rest-constantes.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfiguracionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_configuracion_rest_configuracion__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_component__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConfiguracionPage = /** @class */ (function () {
    function ConfiguracionPage(navCtrl, navParams, formBuilder, rest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.rest = rest;
        this.formularioConfiguracion = this.crearFormularioConfiguracion();
        this.notificacionestodas = false;
        this.notificacionestemperatura = false;
        this.notificacioneseda = false;
        this.notificacionesecg = false;
        this.notificacionescaida = false;
        this.notificacionesbateria = false;
        this.disablecheckbox = false;
    }
    ConfiguracionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfiguracionPage');
    };
    ConfiguracionPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.rest.listar(__WEBPACK_IMPORTED_MODULE_4__app_app_component__["a" /* MyApp */].getNombreusuario()).then(function (data) {
            console.log(data);
            if (data == undefined || data == null || data['mensaje'] == undefined || data['mensaje'] == null
                || data['mensaje'] == "[]") {
                console.log("Respuesta vacia");
                _this.notificacionestodas = false;
                _this.notificacionestemperatura = false;
                _this.notificacioneseda = false;
                _this.notificacionesecg = false;
                _this.notificacionescaida = false;
                _this.notificacionesbateria = false;
                _this.disablecheckbox = false;
            }
            else {
                var elemento = JSON.parse(data['mensaje'])[0];
                if (elemento.notificacionestodas == "1") {
                    _this.notificacionestodas = true;
                    _this.disablecheckbox = true;
                }
                else {
                    _this.notificacionestodas = false;
                    _this.disablecheckbox = false;
                }
                if (elemento.notificacionesecg == "1") {
                    _this.notificacionesecg = true;
                }
                else {
                    _this.notificacionesecg = false;
                    _this.disablecheckbox = false;
                }
                if (elemento.notificacioneseda == "1") {
                    _this.notificacioneseda = true;
                }
                else {
                    _this.notificacioneseda = false;
                }
                if (elemento.notificacionestemperatura == "1") {
                    _this.notificacionestemperatura = true;
                }
                else {
                    _this.notificacionestemperatura = false;
                }
                if (elemento.notificacionescaida == "1") {
                    _this.notificacionescaida = true;
                }
                else {
                    _this.notificacionescaida = false;
                }
                if (elemento.notificacionesbateria == "1") {
                    _this.notificacionesbateria = true;
                }
                else {
                    _this.notificacionesbateria = false;
                }
            }
        }, function (error) {
            console.log(error);
            alert("No se ha podido recuperar la configuración del usuario");
        });
    };
    /**
   * Método para ir de nuevo a la ventana de seleccion de la camiseta
   */
    ConfiguracionPage.prototype.irAtras = function () {
        this.navCtrl.pop();
    };
    ConfiguracionPage.prototype.crearFormularioConfiguracion = function () {
        return this.formBuilder.group({
            notificacionesecg: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', []),
            notificacioneseda: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', []),
            notificacionestemperatura: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', []),
            notificacionestodas: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', []),
            notificacionescaida: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', []),
            notificacionesbateria: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', [])
        });
    };
    ConfiguracionPage.prototype.guardarConfiguracion = function () {
        this.rest.guardarConfiguracion(__WEBPACK_IMPORTED_MODULE_4__app_app_component__["a" /* MyApp */].getNombreusuario(), this.formularioConfiguracion.value.notificacionestodas, this.formularioConfiguracion.value.notificacionesecg, this.formularioConfiguracion.value.notificacioneseda, this.formularioConfiguracion.value.notificacionestemperatura, this.formularioConfiguracion.value.notificacionescaida, this.formularioConfiguracion.value.notificacionesbateria).then(function (data) {
            alert("Configuración guardada");
        }, function (error) {
            console.log(error);
            alert('Los datos de configuración no han podido ser guardados');
        });
    };
    ConfiguracionPage.prototype.apagarCasillas = function () {
        if (this.notificacionestodas == true) {
            this.notificacionestemperatura = false;
            this.notificacioneseda = false;
            this.notificacionesecg = false;
            this.notificacionescaida = false;
            this.disablecheckbox = true;
        }
        else {
            this.notificacionestemperatura = false;
            this.notificacioneseda = false;
            this.notificacionesecg = false;
            this.notificacionescaida = false;
            this.disablecheckbox = false;
        }
    };
    ConfiguracionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-configuracion',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\configuracion\configuracion.html"*/'<!--\n\n  Generated template for the ConfiguracionPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n	<ion-toolbar color="primary">\n\n    <ion-buttons left>\n\n        <button ion-button icon-only (click)="irAtras()">\n\n          <ion-icon class="iconotoolbar" name="arrow-back" ></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title>Configuración</ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content forceOverscroll="true">\n\n  <form [formGroup]="formularioConfiguracion" (ngSubmit)="guardarConfiguracion()">\n\n    <div class="titulo-configuracion"><h1>Notificaciones</h1></div>\n\n    <div class="justificado display-inline espaciado"><ion-label>¿Apagar todas las notificaciones?</ion-label><ion-checkbox slot="start" formControlName="notificacionestodas" color="primary" [(ngModel)]="notificacionestodas" (click)="apagarCasillas()"></ion-checkbox></div>\n\n    <div class="justificado display-inline espaciado"><ion-label>¿Apagar notificaciones ECG?</ion-label><ion-checkbox slot="start" formControlName="notificacionesecg" color="primary" [(ngModel)]="notificacionesecg" disabled={{disablecheckbox}}></ion-checkbox></div>\n\n    <div class="justificado display-inline espaciado"><ion-label>¿Apagar notificaciones EDA?</ion-label><ion-checkbox formControlName="notificacioneseda" color="primary" [(ngModel)]="notificacioneseda" disabled={{disablecheckbox}}></ion-checkbox></div>\n\n    <div class="justificado display-inline espaciado"><ion-label>¿Apagar notificaciones Temperatura?</ion-label><ion-checkbox formControlName="notificacionestemperatura" color="primary" [(ngModel)]="notificacionestemperatura" disabled={{disablecheckbox}}></ion-checkbox></div>\n\n    <div class="justificado display-inline espaciado"><ion-label>¿Apagar notificaciones caidas?</ion-label><ion-checkbox formControlName="notificacionescaida" color="primary" [(ngModel)]="notificacionescaida" disabled={{disablecheckbox}}></ion-checkbox></div>\n\n    <div class="titulo-configuracion"><h1>Bateria</h1></div>\n\n    <div class="justificado display-inline"><ion-label>¿Apagar notificaciones bateria?</ion-label><ion-checkbox formControlName="notificacionesbateria" color="primary" [(ngModel)]="notificacionesbateria"></ion-checkbox></div>\n\n    <div class="justificado display-inline"><button ion-button class="submit-btn right buttonForm" type="submit">Guardar Cambios</button></div>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\configuracion\configuracion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_configuracion_rest_configuracion__["a" /* RestConfiguracionProvider */]])
    ], ConfiguracionPage);
    return ConfiguracionPage;
}());

//# sourceMappingURL=configuracion.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestConfiguracionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_crashlytics_ngx__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the RestConfiguracionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AUTHORIZACION = "healthshirt20192020";
var MAIN_URL = "https://www.jmcastellano.eu/healthshirt/api/";
var CONFIGURACION_URL = "configuracion/";
var VERSION = "v2/";
var TIMEOUT_MAXIMO = 10000;
var RestConfiguracionProvider = /** @class */ (function () {
    function RestConfiguracionProvider(http, firebaseCrashlytics) {
        this.http = http;
        this.firebaseCrashlytics = firebaseCrashlytics;
        this.crashlytics = this.firebaseCrashlytics.initialise();
    }
    RestConfiguracionProvider.prototype.guardarConfiguracion = function (usuario, notificacionestodas, notificacionesecg, notificacioneseda, notificacionestemperatura, notificacionescaida, notificacionesbateria) {
        var _this = this;
        if (notificacionestodas == undefined || notificacionestodas == null) {
            notificacionestodas = false;
        }
        if (notificacionesecg == undefined || notificacionesecg == null) {
            notificacionesecg = false;
        }
        if (notificacioneseda == undefined || notificacioneseda == null) {
            notificacioneseda = false;
        }
        if (notificacionestemperatura == undefined || notificacionestemperatura == null) {
            notificacionestemperatura = false;
        }
        if (notificacionescaida == undefined || notificacionescaida == null) {
            notificacionescaida = false;
        }
        if (notificacionesbateria == undefined || notificacionesbateria == null) {
            notificacionesbateria = false;
        }
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": usuario,
                "notificacionestodas": "" + notificacionestodas,
                "notificacionesecg": "" + notificacionesecg,
                "notificacioneseda": "" + notificacioneseda,
                "notificacionestemperatura": "" + notificacionestemperatura,
                "notificacionescaida": "" + notificacionescaida,
                "notificacionesbateria": "" + notificacionesbateria
            };
            console.log(cuerpo);
            _this.http.post(MAIN_URL + VERSION + CONFIGURACION_URL + "editar/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha guardar la configuracion del usuario " + usuario + " " + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestConfiguracionProvider.prototype.listar = function (usuario) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            _this.http.get(MAIN_URL + VERSION + CONFIGURACION_URL + "lista/?usuario=" + usuario, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha podido recuperar la configuración del usuario " + usuario + " " + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestConfiguracionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_crashlytics_ngx__["a" /* FirebaseCrashlytics */]])
    ], RestConfiguracionProvider);
    return RestConfiguracionProvider;
}());

//# sourceMappingURL=rest-configuracion.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(383);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__env__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen_ngx__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_init_init__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_quees_quees__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_camiseta_camiseta__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version_ngx__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_keyboard_ngx__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_android_permissions_ngx__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_in_app_browser_ngx__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_facebook_ngx__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_rest_rest__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_common_http__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_template_template__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_olvido_olvido__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_registro_registro__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_registrofacebook_registrofacebook__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_rest_camiseta_rest_camiseta__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_constantes_constantes__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_ecg_ecg__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_eda_eda__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_temperatura_temperatura__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_configuracion_configuracion__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_info_info__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_crearcamiseta_crearcamiseta__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_editarcamiseta_editarcamiseta__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_screen_orientation_ngx__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_rest_configuracion_rest_configuracion__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_rest_constantes_rest_constantes__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_fcm_ngx__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_firebase_crashlytics_ngx__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_google_plus_ngx__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_linkedin_ngx__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







































//import { HomePage } from '@pages/all'
// NOTE: pages from other modules must be imported as well
// and added to the 'entryComponents' array
console.log('App mode:', __WEBPACK_IMPORTED_MODULE_4__env__["a" /* ENV */].mode);
console.log('App property:', __WEBPACK_IMPORTED_MODULE_4__env__["a" /* ENV */].property);
var routes = [
    { path: '**', redirectTo: '', pathMatch: 'full' },
    { path: 'init', component: __WEBPACK_IMPORTED_MODULE_7__pages_init_init__["a" /* InitPage */] },
    { path: 'quees', component: __WEBPACK_IMPORTED_MODULE_8__pages_quees_quees__["a" /* QueesPage */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */] },
    { path: 'camiseta', component: __WEBPACK_IMPORTED_MODULE_10__pages_camiseta_camiseta__["a" /* CamisetaPage */] },
    { path: 'olvido', component: __WEBPACK_IMPORTED_MODULE_20__pages_olvido_olvido__["a" /* OlvidoPage */] },
    { path: 'registro', component: __WEBPACK_IMPORTED_MODULE_21__pages_registro_registro__["a" /* RegistroPage */] },
    { path: 'registrofacebook', component: __WEBPACK_IMPORTED_MODULE_22__pages_registrofacebook_registrofacebook__["a" /* RegistroFacebookPage */] },
    { path: 'constantes', component: __WEBPACK_IMPORTED_MODULE_24__pages_constantes_constantes__["a" /* ConstantesPage */] },
    { path: 'crearcamiseta', component: __WEBPACK_IMPORTED_MODULE_30__pages_crearcamiseta_crearcamiseta__["a" /* CrearcamisetaPage */] },
    { path: 'editarcamiseta', component: __WEBPACK_IMPORTED_MODULE_31__pages_editarcamiseta_editarcamiseta__["a" /* EditarcamisetaPage */] },
    { path: 'configuracion', component: __WEBPACK_IMPORTED_MODULE_28__pages_configuracion_configuracion__["a" /* ConfiguracionPage */] },
    { path: 'info', component: __WEBPACK_IMPORTED_MODULE_29__pages_info_info__["a" /* InfoPage */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_init_init__["a" /* InitPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_quees_quees__["a" /* QueesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_camiseta_camiseta__["a" /* CamisetaPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_template_template__["a" /* TemplatePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_olvido_olvido__["a" /* OlvidoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_registrofacebook_registrofacebook__["a" /* RegistroFacebookPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_constantes_constantes__["a" /* ConstantesPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_ecg_ecg__["a" /* EcgPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_eda_eda__["a" /* EdaPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_temperatura_temperatura__["a" /* TemperaturaPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_info_info__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_crearcamiseta_crearcamiseta__["a" /* CrearcamisetaPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_editarcamiseta_editarcamiseta__["a" /* EditarcamisetaPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_configuracion_configuracion__["a" /* ConfiguracionPage */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_init_init__["a" /* InitPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_quees_quees__["a" /* QueesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_camiseta_camiseta__["a" /* CamisetaPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_template_template__["a" /* TemplatePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_olvido_olvido__["a" /* OlvidoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_registrofacebook_registrofacebook__["a" /* RegistroFacebookPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_constantes_constantes__["a" /* ConstantesPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_ecg_ecg__["a" /* EcgPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_eda_eda__["a" /* EdaPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_temperatura_temperatura__["a" /* TemperaturaPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_info_info__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_crearcamiseta_crearcamiseta__["a" /* CrearcamisetaPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_editarcamiseta_editarcamiseta__["a" /* EditarcamisetaPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_configuracion_configuracion__["a" /* ConfiguracionPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    tabsPlacement: 'top',
                    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                    monthShortNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* RouterModule */].forRoot(routes),
                __WEBPACK_IMPORTED_MODULE_18__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* RouterModule */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen_ngx__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["w" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version_ngx__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_keyboard_ngx__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_android_permissions_ngx__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_facebook_ngx__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_screen_orientation_ngx__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_fcm_ngx__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_16__providers_rest_rest__["a" /* RestProvider */],
                __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_23__providers_rest_camiseta_rest_camiseta__["a" /* RestCamisetaProvider */],
                __WEBPACK_IMPORTED_MODULE_33__providers_rest_configuracion_rest_configuracion__["a" /* RestConfiguracionProvider */],
                __WEBPACK_IMPORTED_MODULE_34__providers_rest_constantes_rest_constantes__["a" /* RestConstantesProvider */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_firebase_crashlytics_ngx__["a" /* FirebaseCrashlytics */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_google_plus_ngx__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_linkedin_ngx__["a" /* LinkedIn */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* CUSTOM_ELEMENTS_SCHEMA */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_crashlytics_ngx__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AUTHORIZACION = "healthshirt20192020";
var MAIN_URL = "http://www.iopshirt.es/api/";
var LOGIN_URL = "login/";
var VERSION = "v3/";
var TIMEOUT_MAXIMO = 10000;
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestProvider = /** @class */ (function () {
    function RestProvider(http, firebaseCrashlytics) {
        this.http = http;
        this.firebaseCrashlytics = firebaseCrashlytics;
        this.crashlytics = this.firebaseCrashlytics.initialise();
    }
    RestProvider.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": email,
                "password": password,
                "esFacebook": "0"
            };
            _this.http.post(MAIN_URL + VERSION + LOGIN_URL + "login/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha podido logar el usuario " + email + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestProvider.prototype.registrar = function (email, password, esFacebook) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": email,
                "password": password,
                "esFacebook": esFacebook
            };
            _this.http.post(MAIN_URL + VERSION + LOGIN_URL + "registrar/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha podido registrar el usuario con email  " + email + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestProvider.prototype.registrarToken = function (email, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": email,
                "token": token
            };
            _this.http.post(MAIN_URL + VERSION + LOGIN_URL + "registrartoken/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha podido registrar el token de notificaciones para el usuario " + email + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestProvider.prototype.loginFacebook = function (email, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": email,
                "token": token
            };
            _this.http.post(MAIN_URL + VERSION + LOGIN_URL + "loginfacebook/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha podido logar el usuario en Facebook " + email + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestProvider.prototype.loginGoogle = function (email, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": email,
                "token": token
            };
            console.log(cuerpo);
            _this.http.post(MAIN_URL + VERSION + LOGIN_URL + "logingoogle/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha podido logar el usuario en Google " + email + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestProvider.prototype.recuperarCuenta = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": email,
            };
            _this.http.post(MAIN_URL + VERSION + LOGIN_URL + "olvido/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha podido recuperar la cuenta del usuario " + email + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_crashlytics_ngx__["a" /* FirebaseCrashlytics */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CamisetaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_constantes_constantes__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_component__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_camiseta_rest_camiseta__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation_ngx__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_crearcamiseta_crearcamiseta__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_editarcamiseta_editarcamiseta__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_init_init__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_facebook_ngx__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Generated class for the CamisetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CamisetaPage = /** @class */ (function () {
    function CamisetaPage(menu, navCtrl, navParams, rest, screenOrientation, storage, facebook) {
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rest = rest;
        this.screenOrientation = screenOrientation;
        this.storage = storage;
        this.facebook = facebook;
        this.camisetaEncontrada = false;
    }
    CamisetaPage.prototype.ionViewWillLoad = function () {
        this.menu.swipeEnable(true);
    };
    /**
     * Cada vez que entre dentro de esta vista deberia refrescar los datos del listado de las camisetas
     */
    CamisetaPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.screenOrientation.unlock();
        this.recargarLista();
        //recuperamos si hay un token de Facebook
        Promise.all([this.storage.get("tokenfacebook"), this.storage.get("usuariofacebook")]).then(function (values) {
            if (values == null || values[0] == null || values[1] == null || values[0] == 'undefined' || values[1] == 'undefined'
                || values[0] == '' || values[1] == '') {
                return;
            }
            else {
                //comprobamos si el token sigue siendo valido
                _this.facebook.getLoginStatus().then(function (res) {
                    var tiempo = +res.authResponse.expiresIn;
                    console.log(values[0]);
                    console.log(values[1]);
                    console.log(res);
                    if (res.status != 'connected' || res.authResponse.accessToken != values[0] || tiempo <= 0 || res.authResponse.userID != values[1]) {
                        alert("Sesion en Facebook terminada. Debe volver a conectarse a la aplicación");
                        _this.storage.set("nombreusuario", null);
                        _this.storage.set("tokenfacebook", null);
                        _this.storage.set("esFacebook", "0");
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_init_init__["a" /* InitPage */]);
                    }
                })
                    .catch(function (e) {
                    console.log('Error al revisar conexion Facebook', e);
                    alert("Sesion en Facebook terminada. Debe volver a conectarse a la aplicación");
                    _this.storage.set("nombreusuario", null);
                    _this.storage.set("tokenfacebook", null);
                    _this.storage.set("esFacebook", "0");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_init_init__["a" /* InitPage */]);
                });
            }
        });
    };
    CamisetaPage.prototype.recargarLista = function () {
        var _this = this;
        this.rest.listar(__WEBPACK_IMPORTED_MODULE_4__app_app_component__["a" /* MyApp */].getNombreusuario()).then(function (data) {
            _this.listaCamisetas = JSON.parse(data.mensaje);
            if (_this.listaCamisetas != []) {
                _this.camisetaEncontrada = true;
            }
            else {
                _this.camisetaEncontrada = false;
            }
        }, function (error) {
            //si hay un error simplemente lo imprimimos por la consola
            console.log(error);
        });
    };
    /**
   * Abre la pantalla de las camisetas
   * @param camiseta Datos de la camiseta que hay que abrir
   */
    CamisetaPage.prototype.abrirCamiseta = function (camiseta) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_constantes_constantes__["a" /* ConstantesPage */], { camiseta: camiseta });
    };
    CamisetaPage.prototype.editarCamiseta = function (camiseta) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_editarcamiseta_editarcamiseta__["a" /* EditarcamisetaPage */], { camiseta: camiseta });
    };
    CamisetaPage.prototype.borrarCamiseta = function (camiseta) {
        var _this = this;
        //invocamos al proceso de borrar la camiseta
        this.rest.borrar(__WEBPACK_IMPORTED_MODULE_4__app_app_component__["a" /* MyApp */].getNombreusuario(), camiseta.id).then(function (data) {
            //si ha ido todo bien recargamos la lista
            _this.recargarLista();
        }, function (error) {
            //si hay un error simplemente lo imprimimos por la consola
            alert("No se ha podido borrar la camiseta. Vuelva a intentarlo más tarde.");
            console.log(error);
        });
    };
    CamisetaPage.prototype.crearCamiseta = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_crearcamiseta_crearcamiseta__["a" /* CrearcamisetaPage */]);
    };
    /**
     * Función que recibe el evento de refrescar la pantalla
     * @param event
     */
    CamisetaPage.prototype.refrescar = function (event) {
        var _this = this;
        this.refresher = event;
        this.rest.listar(__WEBPACK_IMPORTED_MODULE_4__app_app_component__["a" /* MyApp */].getNombreusuario()).then(function (data) {
            _this.listaCamisetas = JSON.parse(data.mensaje);
            if (_this.listaCamisetas != []) {
                _this.camisetaEncontrada = true;
            }
            else {
                _this.camisetaEncontrada = false;
            }
            if (_this.refresher !== undefined && _this.refresher != null) {
                _this.refresher.complete();
            }
        }, function (error) {
            //si hay un error simplemente lo imprimimos por la consola
            console.log(error);
            if (_this.refresher !== undefined && _this.refresher != null) {
                _this.refresher.complete();
            }
        });
    };
    CamisetaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-camiseta',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\camiseta\camiseta.html"*/'<ion-header>\n\n    <ion-navbar color="primary">\n\n      <ion-buttons left>\n\n        <button ion-button menuToggle icon-only>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      <ion-title>Camisetas</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content>\n\n    	<ion-refresher slot="fixed" (ionRefresh)="refrescar($event)">\n\n          <ion-refresher-content\n\n            pullingText="Desliza para actualizar">\n\n          </ion-refresher-content>\n\n        </ion-refresher>\n\n    <ion-list class="lista-camisetas" *ngFor="let camiseta of listaCamisetas">\n\n      <ion-item-sliding>\n\n        <ion-item (click)="abrirCamiseta(camiseta)"> \n\n          <div class="flex-camisetas">\n\n            <div class="lista-camisetas-contenido">\n\n              <div class="cajaImagenCamiseta">\n\n                <img [src]="camiseta.src" width="100%" />\n\n              </div>\n\n              <div class="cajaDatosCamiseta">\n\n                <h3>{{camiseta.nombre}}</h3>\n\n                <h4>{{camiseta.parentesco}}</h4>\n\n                <div class="display-inline-landscape">\n\n                  <p>{{" Bateria: " + camiseta.bateria + "%"}}</p>\n\n                  <p>{{" Últimos datos: " + camiseta.horadatos}}</p>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </ion-item> \n\n        <ion-item-options side="end" >\n\n          <ion-item-option class="tamano_boton botonEdicion" (click)="editarCamiseta(camiseta)"><ion-icon class="en_medio" name="create"></ion-icon></ion-item-option>\n\n          <ion-item-option class="tamano_boton botonBorrar" (click)="borrarCamiseta(camiseta)"><ion-icon class="en_medio" name="trash"></ion-icon></ion-item-option>\n\n        </ion-item-options>\n\n      </ion-item-sliding> \n\n    </ion-list>\n\n    <div *ngIf="!camisetaEncontrada" padding>\n\n      <p>Todavía no hay ninguna camiseta</p>\n\n    </div>\n\n  </ion-content>\n\n  <ion-footer no-border>\n\n      <ion-icon class="botonAnadir" name="add-circle" (click)="crearCamiseta()"></ion-icon>\n\n  </ion-footer>\n\n  '/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\camiseta\camiseta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_camiseta_rest_camiseta__["a" /* RestCamisetaProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation_ngx__["a" /* ScreenOrientation */], __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_facebook_ngx__["a" /* Facebook */]])
    ], CamisetaPage);
    return CamisetaPage;
}());

//# sourceMappingURL=camiseta.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ENV; });
var ENV = {
    mode: 'Development',
    property: 'desarrollo',
    app_name: 'Health-Shirt Test'
};
//# sourceMappingURL=environment.dev.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version_ngx__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TemplatePage = /** @class */ (function () {
    function TemplatePage(menu, appVersion) {
        this.menu = menu;
        this.appVersion = appVersion;
        this.version = this.appVersion.getVersionNumber();
    }
    TemplatePage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
    };
    TemplatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-template',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\template\template.html"*/'<ion-content forceOverscroll="true">\n\n<div class="item">\n\n	<div id="titulo">\n\n	<h1>Health Shirt</h1><img alt="logo"/></div>\n\n</div>	\n\n\n\n</ion-content>\n\n	'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\template\template.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__["e" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version_ngx__["a" /* AppVersion */]])
    ], TemplatePage);
    return TemplatePage;
}());

//# sourceMappingURL=template.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestCamisetaProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_crashlytics_ngx__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AUTHORIZACION = "healthshirt20192020";
var MAIN_URL = "https://www.jmcastellano.eu/healthshirt/api/";
var CAMISETA_URL = "camiseta/";
var VERSION = "v2/";
var TIMEOUT_MAXIMO = 10000;
/*
  Generated class for the RestCamisetaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestCamisetaProvider = /** @class */ (function () {
    function RestCamisetaProvider(http, firebaseCrashlytics) {
        this.http = http;
        this.firebaseCrashlytics = firebaseCrashlytics;
        this.crashlytics = this.firebaseCrashlytics.initialise();
    }
    RestCamisetaProvider.prototype.borrar = function (usuario, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": usuario,
                "id": "" + id
            };
            _this.http.post(MAIN_URL + VERSION + CAMISETA_URL + "borrar/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se ha podido borrar la camiseta de " + usuario + " con id " + id + " " + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestCamisetaProvider.prototype.listar = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            _this.http.get(MAIN_URL + VERSION + CAMISETA_URL + "lista/?usuario=" + email, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se han podido recuperar las camisetas de " + email + " " + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestCamisetaProvider.prototype.registrarCamiseta = function (usuario, nombre, parentesco, numeroserie, codseg, icono, ecgminimo, ecgmaximo, edaminimo, edamaximo, temperaturaminimo, temperaturamaximo, notificacionesecg, notificacioneseda, notificacionestemperatura, notificacionescaida, fechanacimiento, sexo, telefono, telefonocontacto, notas, direccion) {
        var _this = this;
        //rellenamos los valores no obligatorios que han venido sin nada con un valor -1
        //para indicar en el json que ese valor no esta relleno
        //la idea es forzar que esten todos los campos para poder depurar mejor
        if (ecgminimo == undefined || ecgminimo == null) {
            ecgminimo = -1;
        }
        if (ecgmaximo == undefined || ecgmaximo == null) {
            ecgmaximo = -1;
        }
        if (edaminimo == undefined || edaminimo == null) {
            edaminimo = -1;
        }
        if (edamaximo == undefined || edamaximo == null) {
            edamaximo = -1;
        }
        if (temperaturaminimo == undefined || temperaturaminimo == null) {
            temperaturaminimo = -1;
        }
        if (temperaturamaximo == undefined || temperaturamaximo == null) {
            temperaturamaximo = -1;
        }
        if (notificacionesecg == undefined || notificacionesecg == null) {
            notificacionesecg = false;
        }
        if (notificacioneseda == undefined || notificacioneseda == null) {
            notificacioneseda = false;
        }
        if (notificacionestemperatura == undefined || notificacionestemperatura == null) {
            notificacionestemperatura = false;
        }
        if (notificacionescaida == undefined || notificacionescaida == null) {
            notificacionescaida = false;
        }
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": usuario,
                "nombre": nombre,
                "parentesco": parentesco,
                "numeroserie": numeroserie,
                "codseg": codseg,
                "icono": icono,
                "ecgminimo": "" + ecgminimo,
                "ecgmaximo": "" + ecgmaximo,
                "edaminimo": "" + edaminimo,
                "edamaximo": "" + edamaximo,
                "temperaturaminimo": "" + temperaturaminimo,
                "temperaturamaximo": "" + temperaturamaximo,
                "notificacionesecg": "" + notificacionesecg,
                "notificacioneseda": "" + notificacioneseda,
                "notificacionestemperatura": "" + notificacionestemperatura,
                "notificacionescaida": "" + notificacionescaida,
                "fechanacimiento": fechanacimiento,
                "sexo": sexo,
                "telefono": "" + telefono,
                "telefonocontacto": "" + telefonocontacto,
                "notas": "" + notas,
                "direccion": "" + direccion
            };
            console.log(cuerpo);
            _this.http.post(MAIN_URL + VERSION + CAMISETA_URL + "crear/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se han podido crear la camiseta para " + usuario + " " + error.error['mensaje'] + " " + error.status);
                reject(error);
            });
        });
    };
    RestCamisetaProvider.prototype.editarCamiseta = function (usuario, id, nombre, parentesco, icono, ecgminimo, ecgmaximo, edaminimo, edamaximo, temperaturaminimo, temperaturamaximo, notificacionesecg, notificacioneseda, notificacionestemperatura, notificacionescaida, fechanacimiento, sexo, telefono, telefonocontacto, notas, direccion) {
        var _this = this;
        //rellenamos los valores no obligatorios que han venido sin nada con un valor -1
        //para indicar en el json que ese valor no esta relleno
        //la idea es forzar que esten todos los campos para poder depurar mejor
        if (ecgminimo == undefined || ecgminimo == null) {
            ecgminimo = -1;
        }
        if (ecgmaximo == undefined || ecgmaximo == null) {
            ecgmaximo = -1;
        }
        if (edaminimo == undefined || edaminimo == null) {
            edaminimo = -1;
        }
        if (edamaximo == undefined || edamaximo == null) {
            edamaximo = -1;
        }
        if (temperaturaminimo == undefined || temperaturaminimo == null) {
            temperaturaminimo = -1;
        }
        if (temperaturamaximo == undefined || temperaturamaximo == null) {
            temperaturamaximo = -1;
        }
        if (notificacionesecg == undefined || notificacionesecg == null) {
            notificacionesecg = false;
        }
        if (notificacioneseda == undefined || notificacioneseda == null) {
            notificacioneseda = false;
        }
        if (notificacionestemperatura == undefined || notificacionestemperatura == null) {
            notificacionestemperatura = false;
        }
        if (notificacionescaida == undefined || notificacionescaida == null) {
            notificacionescaida = false;
        }
        return new Promise(function (resolve, reject) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AUTHORIZACION
                })
            };
            var cuerpo = {
                "usuario": usuario,
                "id": "" + id,
                "nombre": nombre,
                "parentesco": parentesco,
                "icono": icono,
                "ecgminimo": "" + ecgminimo,
                "ecgmaximo": "" + ecgmaximo,
                "edaminimo": "" + edaminimo,
                "edamaximo": "" + edamaximo,
                "temperaturaminimo": "" + temperaturaminimo,
                "temperaturamaximo": "" + temperaturamaximo,
                "notificacionesecg": "" + notificacionesecg,
                "notificacioneseda": "" + notificacioneseda,
                "notificacionestemperatura": "" + notificacionestemperatura,
                "notificacionescaida": "" + notificacionescaida,
                "fechanacimiento": fechanacimiento,
                "sexo": sexo,
                "telefono": "" + telefono,
                "telefonocontacto": "" + telefonocontacto,
                "notas": "" + notas,
                "direccion": "" + direccion
            };
            console.log(cuerpo);
            _this.http.post(MAIN_URL + VERSION + CAMISETA_URL + "editar/", cuerpo, httpOptions)
                .timeout(TIMEOUT_MAXIMO)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                _this.crashlytics.logException("No se han podido editar la camiseta de " + usuario + " con id " + id + " " + error.error + " " + error.status);
                reject(error);
            });
        });
    };
    RestCamisetaProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_crashlytics_ngx__["a" /* FirebaseCrashlytics */]])
    ], RestCamisetaProvider);
    return RestCamisetaProvider;
}());

//# sourceMappingURL=rest-camiseta.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InfoPage = /** @class */ (function () {
    function InfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    InfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InfoPage');
    };
    /**
     * Método para ir de nuevo a la ventana de seleccion de la camiseta
     */
    InfoPage.prototype.irAtras = function () {
        this.navCtrl.pop();
    };
    InfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'page-info',template:/*ion-inline-start:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\info\info.html"*/'<!--\n\n  Generated template for the InfoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n	<ion-toolbar color="primary">\n\n    <ion-buttons left>\n\n        <button ion-button icon-only (click)="irAtras()">\n\n          <ion-icon class="iconotoolbar" name="arrow-back" ></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title>Información</ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content forceOverscroll="true">\n\n<p class="justificado"><b>Nombre:</b> Especifica el nombre con el que vas a identificar la camiseta. Puede ser el nombre de la persona que lleva puesta, aunque\n\nen caso de que una persona posea diferentes camisetas (por ejemplo una de dia y otra para dormir) se recomienda poner el uso de la misma</p>\n\n<p class="justificado"><b>Parentesco:</b> Especifica el nombre de la persona que va asociada a esta camiseta o su grado de parentesco.</p>\n\n<p class="justificado"><b>Fecha de nacimiento:</b> Especifica la fecha de nacimiento de la persona.</p>\n\n<p class="justificado"><b>Sexo:</b> Especifica el sexo de la persona.</p>\n\n<p class="justificado"><b>Número Serial:</b> Para cerciorar de que usted es el propietario de la camiseta deberá introducir el número de serial de la camiseta. Antes de introducir este\n\nserial deberá seguir los pasos de instalación de la camiseta que se encuentra en el manual de la misma. Hasta que la camiseta no empiece a emitir datos, no se podrá registrar la camiseta desde la aplicación móvil</p>\n\n<p class="justificado"><b>Cód.Confirmación:</b> En la instalación de la camiseta se le solicita, aparte de configurar las credenciales wifi de la camiseta, un código de confirmación del mismo. Debe introducir en este campo el mismo código que introdujo\n\nen los datos de la camiseta.</p>\n\n<p class="justificado"><b>ECG:</b> Hace referencia a las constantes vitales referentes al corazón. En este caso se puede especificar un umbral del número de pulsaciones por minuto. Esta pulsación suele comprender entre las 60 y las 110 pulsaciones por minuto. La casilla de apagado de notificaciones permite\n\nindicar si se desea no recibir más notificaciones cuando se superen dichos umbrales. Si esta marcada la opción, no se enviarán más notificaciones aunque se superen los umbrales.</p>\n\n<p class="justificado una-linea"><ion-input class="primero" value="" type="number" placeholder="Mínimo" readonly ></ion-input><ion-input value="130" type="number" placeholder="Máximo" readonly></ion-input></p>\n\n<p class="justificado">Como se puede ver en el anterior ejemplo, se ha especificado un umbral máximo de 130, por lo que cuando se detecte que las pulsaciones por minuto superen los 130 se notificará al usuario.</p>\n\n<p class="justificado"><b>EDA:</b> Hace referencia a la conductividad y resistencia de la piel, pudiendose medir el sistema nervioso del paciente. Su valor suele oscilar entre 100 y 300. Valores inferiores representan una situación de mucha tranquilidad y valores superiores representan una situación de mucha intranquilidad. La casilla de apagado de notificaciones permite\n\n  indicar si se desea no recibir más notificaciones cuando se superen dichos umbrales. Si esta marcada la opción, no se enviarán más notificaciones aunque se superen los umbrales. </p>\n\n<p class="justificado una-linea"><ion-input class="primero" value="100" type="number" placeholder="Mínimo" readonly ></ion-input><ion-input value="" type="number" placeholder="Máximo" readonly></ion-input></p>\n\n<p class="justificado">Como se puede ver en el anterior ejemplo, se ha especificado un umbral mínimo para el EDA de 100. Cuando el valor descienda por debajo de los 100 se enviará una notificación al usuario.</p>\n\n<p class="justificado"><b>Temperatura:</b> Hace referencia a la temperatura corporal del paciente. Los valores suelen oscilar entre los 35 a 37 grados, siendo valores inferiores un posible caso de hipotermia y valores superiores una posible fiebre. La casilla de apagado de notificaciones permite\n\n  indicar si se desea no recibir más notificaciones cuando se superen dichos umbrales. Si esta marcada la opción, no se enviarán más notificaciones aunque se superen los umbrales.</p>\n\n<p class="justificado una-linea"><ion-input class="primero" value="35" type="text" placeholder="Mínimo" readonly ></ion-input><ion-input value="37.5" type="text" placeholder="Máximo" readonly></ion-input></p>\n\n<p class="justificado">Como se puede ver en el anterior ejemplo, se ha especificado tanto un umbral mínimo como un umbral máximo para la temperatura. Cuando la temperatura sea menor de 35º o mayor de 37.5º se notificará al usuario</p>\n\n<p class="justificado"><b>Caidas:</b> Indican si debe notificarse al usuario cuando la persona que lleva la camiseta ha sufrido una caida. </p>\n\n<p class="justificado"><b>Teléfono:</b> Especifica el número de teléfono de la persona que lleva la camiseta.</p>\n\n<p class="justificado"><b>Teléfono de Contacto:</b> Especifica el número de teléfono de un familiar.</p>\n\n<p class="justificado"><b>Dirección:</b> Especifica la dirección de la persona que tiene la camiseta</p>\n\n<p class="justificado"><b>Notas:</b> Permite especificar notas adicionales sobre esta camiseta.</p>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jmcastellano\Desktop\TFM\IoP\Codigo\Webapp\src\pages\info\info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], InfoPage);
    return InfoPage;
}());

//# sourceMappingURL=info.js.map

/***/ })

},[378]);
//# sourceMappingURL=main.js.map