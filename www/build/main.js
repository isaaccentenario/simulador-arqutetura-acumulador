webpackJsonp([0],{

/***/ 109:
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
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
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
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = (function () {
    function HomePage(toast) {
        var _this = this;
        this.toast = toast;
        this.config = {
            "registradores": 8,
            "memoria": 20
        };
        this.registradores = [];
        this.memoria = [];
        this.acumulador = new Registrador();
        this.pc = new Registrador();
        this.ir = new Registrador();
        this.comandos_permitidos = {
            'ZER': this.zer,
            'ADD': this.add,
            'STO': this.sto,
            'MUL': this.mul,
            'DIV': this.div,
            'SUB': this.sub,
            'AND': this.and,
            'OR': this.or,
            'CLR': this.clr
        };
        // comandos que podem não seguir padrão "COM XZ"
        this.comandos_excepcionais = [
            'ZER',
            'CLR'
        ];
        this.legendas = {
            'ZER': 'Zera os elementos, de forma unitária ou completa',
            'ADD': 'Soma um valor de um registrador ao acumulador',
            'STO': 'Armazena o valor do acumulador em um registrador',
            'MUL': 'Multiplica um valor pelo acumulador',
            'DIV': 'Divide um valor pelo acumulador',
            'SUB': 'Subtrai um valor pelo acumulador',
            'AND': 'Faz a operação AND com um valor e o acumulador',
            'OR': 'Faz a operação OR com um valor e o acumulador',
            'CLR': 'Esvazia os elementos, de forma unitária ou completa'
        };
        this.execucao = [];
        this.passo = 0;
        this.tempo_animacao = 1500;
        this.executando = false;
        this.linha_atual = '';
        for (var i = 0; i < this.config["registradores"]; i++) {
            this.registradores[i] = new Registrador();
            this.registradores[i].setIndice(i);
        }
        for (var i = 0; i < this.config["memoria"]; i++) {
            this.memoria[i] = new Memoria();
            this.memoria[i].setIndice(i);
        }
        this.player = {
            'play': function () {
                if (_this.parsear()) {
                    _this.executando = true;
                    _this.animacao();
                }
            }, 'pause': function () {
                if (_this.parsear()) {
                    _this.executando = false;
                    clearInterval(_this.interval);
                }
            }, 'next': function () {
                clearInterval(_this.interval);
                if (_this.parsear())
                    _this.execPasso();
                _this.executando = false;
            }, 'prev': function () {
                clearInterval(_this.interval);
                if (_this.parsear()) {
                    _this.passo -= 2;
                    _this.execPasso();
                    _this.executando = false;
                }
            }, 'stop': function () {
                clearInterval(_this.interval);
                _this.linha_atual = '';
                _this.passo = 0;
                _this.executando = false;
                _this.execucao = [];
            }
        };
    }
    HomePage.prototype.parsear = function () {
        if (!this.instrucao || this.instrucao.length < 3) {
            this.toast.create({
                'message': 'Impossível executar uma instrução vazia, né truta!',
                'duration': 3000
            }).present();
            return false;
        }
        var linhas = this.instrucao.split('\n');
        var l = 1;
        this.execucao = [];
        for (var _i = 0, linhas_1 = linhas; _i < linhas_1.length; _i++) {
            var linha = linhas_1[_i];
            if (linha.replace(/\s/g, "").length <= 0) {
                continue;
            }
            var cmd = linha.match(new RegExp('^(' + this.objectKeys(this.comandos_permitidos).join('|') + ')'));
            if (cmd == null) {
                this.toast.create({
                    'message': 'A linha ' + l + ' (' + linha + ') contém comandos desconhecidos',
                    'duration': 3000
                }).present();
                return false;
            }
            var elem = linha.match(new RegExp('(PC|IR|ACC|\\d{1,4}|R[0-9]{1,2}|M[0-9]{1,2})'));
            var exc = linha.match(new RegExp('(' + this.comandos_excepcionais.join('|') + ')'));
            if (null == elem && !exc) {
                this.toast.create({
                    'message': 'A linha ' + l + ' (' + linha + ') contém um elemento de índice inválido (R ou M)',
                    'duration': 3000
                }).present();
            }
            if (null != elem) {
                if (this.ehMemoria(elem[0])) {
                    if (this.getElemento(elem[0]) >= this.config["memoria"]) {
                        this.toast.create({
                            'message': 'A linha ' + l + ' (' + linha + ') contém um elemento de índice inválido (R ou M)',
                            'duration': 3000
                        }).present();
                        return false;
                    }
                }
                else if (this.ehRegistrador(elem[0])) {
                    if (this.getElemento(elem[0]) >= this.config["registradores"]) {
                        this.toast.create({
                            'message': 'A linha ' + l + ' (' + linha + ') contém um elemento de índice inválido (R ou M)',
                            'duration': 3000
                        }).present();
                        return false;
                    }
                }
                this.execucao.push({
                    'funcao': cmd[0].toLowerCase().trim(),
                    'elem': elem[0]
                });
            }
            else {
                if (null == elem && !exc) {
                    return false;
                }
                this.execucao.push({
                    'funcao': cmd[0].toLowerCase().trim(),
                    'elem': ''
                });
            }
            l++;
        }
        return true;
    };
    HomePage.prototype.execPasso = function () {
        var len = Object.keys(this.execucao).length;
        if (this.passo >= len) {
            this.passo = 0;
        }
        if (this.passo < 0)
            this.passo = len - 1;
        var item = this.execucao[this.passo];
        if (undefined == item)
            return false;
        console.log(item);
        this[item['funcao']](item['elem']);
        this.passo++;
        this.linha_atual = item['funcao'].toUpperCase() + ' ' + item['elem'];
    };
    HomePage.prototype.animacao = function () {
        var _this = this;
        if (this.passo >= this.execucao.length) {
            clearInterval(this.interval);
            return false;
        }
        this.executando = true;
        this.interval = setInterval(function () {
            _this.execPasso();
        }, this.tempo_animacao);
    };
    HomePage.prototype.objectKeys = function (obj) {
        return Object.keys(obj);
    };
    HomePage.prototype.instructToUpper = function () {
        var _this = this;
        setTimeout(function () {
            if (null != _this.instrucao && undefined != _this.instrucao) {
                _this.instrucao = _this.instrucao.toUpperCase();
            }
        }, 20);
    };
    HomePage.prototype.getElemento = function (elemento) {
        if (elemento.match(/(R|M)\d{1,2}$/) != null) {
            return parseInt(elemento.substr(1));
        }
        return -1;
    };
    HomePage.prototype.ehMemoria = function (r) {
        return /M\d{1,2}/.test(r);
    };
    HomePage.prototype.ehRegistrador = function (r) {
        return /R\d{1,2}/.test(r);
    };
    HomePage.prototype.clr = function (r) {
        if (undefined == r || "" == r) {
            for (var i = 0; i < this.config["registradores"]; i++) {
                this.registradores[i].setValor('');
            }
            for (var i = 0; i < this.config["memoria"]; i++) {
                this.memoria[i].setValor('');
            }
            this.acumulador.setValor('');
            this.pc.setValor('');
            this.ir.setValor('');
        }
        else {
            if (r == 'ACC') {
                this.acumulador.setValor('');
            }
            else if (r == 'PC') {
                this.pc.setValor('');
            }
            else if (r == 'IR') {
                this.ir.setValor('');
            }
            else {
                if (this.ehRegistrador(r)) {
                    this.registradores[this.getElemento(r)].setValor('');
                }
                else {
                    this.memoria[this.getElemento(r)].setValor('');
                }
            }
        }
    };
    HomePage.prototype.zer = function (r) {
        if (undefined == r || "" == r) {
            for (var i = 0; i < this.config["registradores"]; i++) {
                this.registradores[i].setValor(0);
            }
            for (var i = 0; i < this.config["memoria"]; i++) {
                this.memoria[i].setValor(0);
            }
            this.acumulador.setValor(0);
            this.pc.setValor(0);
            this.ir.setValor(0);
        }
        else {
            if (r == 'ACC') {
                this.acumulador.setValor(0);
            }
            else if (r == 'PC') {
                this.pc.setValor(0);
            }
            else if (r == 'IR') {
                this.ir.setValor(0);
            }
            else {
                if (this.ehRegistrador(r)) {
                    this.registradores[this.getElemento(r)].setValor(0);
                }
                else {
                    this.memoria[this.getElemento(r)].setValor(0);
                }
            }
        }
    };
    HomePage.prototype.inserirComando = function (r) {
        for (var i = 0; i < this.config["memoria"]; i++) {
            if (!this.memoria[i].getValor) {
                this.memoria[i].setValor(r);
                break;
            }
        }
    };
    HomePage.prototype.inserirDado = function (r) {
        for (var i = 10; i < this.config["memoria"]; i++) {
            if (!this.memoria[i].getValor) {
                this.memoria[i].setValor(r);
                break;
            }
        }
    };
    HomePage.prototype.add = function (r) {
        if (this.getElemento(r) == -1) {
            this.acumulador.setValor(this.acumulador.getValor() + parseInt(r));
        }
        else {
            var e = this.getElemento(r);
            this.acumulador.setValor(this.acumulador.getValor() +
                this.registradores[e].getValor());
        }
        this.ir.setValor("ADD " + r);
    };
    HomePage.prototype.sto = function (r) {
        var e = this.getElemento(r);
        if (this.ehRegistrador(r)) {
            this.registradores[e].setValor(this.acumulador.getValor());
        }
        else {
            this.memoria[e].setValor(this.acumulador.getValor());
        }
        this.ir.setValor("STO " + r);
    };
    HomePage.prototype.mul = function (r) {
        if (this.getElemento(r) == -1) {
            this.acumulador.setValor(this.acumulador.getValor() * parseInt(r));
        }
        else {
            var e = this.getElemento(r);
            this.acumulador.setValor(this.acumulador.getValor() *
                this.registradores[e].getValor());
        }
        this.ir.setValor("MUL " + r);
    };
    HomePage.prototype.div = function (r) {
        if (this.getElemento(r) == -1) {
            this.acumulador.setValor(this.acumulador.getValor() / parseInt(r));
        }
        else {
            var e = this.getElemento(r);
            this.acumulador.setValor(this.acumulador.getValor() /
                this.registradores[e].getValor());
        }
        this.ir.setValor("DIV " + r);
    };
    HomePage.prototype.sub = function (r) {
        if (this.getElemento(r) == -1) {
            this.acumulador.setValor(this.acumulador.getValor() - parseInt(r));
        }
        else {
            var e = this.getElemento(r);
            this.acumulador.setValor(this.acumulador.getValor() -
                this.registradores[e].getValor());
        }
        this.ir.setValor("SUB " + r);
    };
    HomePage.prototype.and = function (r) {
        if (this.getElemento(r) == -1) {
            this.acumulador.setValor(this.acumulador.getValor() & parseInt(r));
        }
        else {
            var e = this.getElemento(r);
            this.acumulador.setValor(this.acumulador.getValor() &
                this.registradores[e].getValor());
        }
        this.ir.setValor("AND " + r);
    };
    HomePage.prototype.or = function (r) {
        if (this.getElemento(r) == -1) {
            this.acumulador.setValor(this.acumulador.getValor() | parseInt(r));
        }
        else {
            var e = this.getElemento(r);
            this.acumulador.setValor(this.acumulador.getValor() |
                this.registradores[e].getValor());
        }
        this.ir.setValor("OR" + r);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/var/www/html/simulador/src/pages/home/home.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n			Simulador de Arquitetura - Acumulador\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	\n	<div class="registrators cont">\n		<h2> Registradores </h2>\n\n		<ion-grid>\n			<ion-row>\n				<ion-col col-1 *ngFor="let r of registradores">\n					<ion-item>\n						<ion-label floating>R{{r.getIndice()}}</ion-label>\n						<ion-input type="number" [(ngModel)]="r.valor" name="valor"></ion-input>\n					</ion-item>\n				</ion-col>\n\n				<ion-col col-1>\n					<ion-item>\n						<ion-label floating>ACC</ion-label>\n						<ion-input type="number" [(ngModel)]="acumulador.valor" name="valor"></ion-input>\n					</ion-item>\n				</ion-col>\n\n				<ion-col col-1>\n					<ion-item>\n						<ion-label floating>PC</ion-label>\n						<ion-input type="text" [(ngModel)]="pc.valor" name="valor"></ion-input>\n					</ion-item>\n				</ion-col>\n\n				<ion-col col-1>\n					<ion-item>\n						<ion-label floating>IR</ion-label>\n						<ion-input type="text" [(ngModel)]="ir.valor" name="valor"></ion-input>\n					</ion-item>\n				</ion-col>\n\n			</ion-row>\n		</ion-grid>\n	</div>\n	<br><br>\n	<div class="memories cont">\n		<h2>Memória</h2>\n		<ion-grid>\n			<ion-row>\n				<ion-col col-1 *ngFor="let m of memoria">\n					<ion-item>\n						<ion-label floating>M{{m.getIndice()}}</ion-label>\n						<ion-input type="text" [(ngModel)]="m.valor" name="valor"></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n	</div>\n	<br>\n	<div class="program">\n		<ion-grid text-left>\n			<ion-row>\n				<ion-col col-6>\n					<ion-item>\n						<ion-label floating>Instruções</ion-label>\n						<ion-textarea rows="10" [(ngModel)]="instrucao" name="instrucao" (keyup)="instructToUpper()"></ion-textarea>\n					</ion-item>\n				</ion-col>\n				<ion-col col-6>\n					<ion-label floating>&nbsp;</ion-label>\n\n					<div class="player">\n						<ion-grid>\n							<ion-row>\n								<ion-col width="25">\n									<button clear ion-button icon-only (click)="player.prev()">\n										<ion-icon name="skip-backward"></ion-icon>\n									</button>\n								</ion-col>\n								<ion-col width="25">\n									<button clear ion-button icon-only (click)="player.play()" *ngIf="!executando">\n										<ion-icon name="play"></ion-icon>\n									</button>\n									<button clear ion-button icon-only (click)="player.pause()" *ngIf="executando">\n										<ion-icon name="pause"></ion-icon>\n									</button>\n								</ion-col>\n								<ion-col width="25">\n									<button clear ion-button icon-only (click)="player.next()">\n										<ion-icon name="skip-forward"></ion-icon>\n									</button>\n								</ion-col>\n								<ion-col width="25">\n									<button clear ion-button icon-only (click)="player.stop()">\n										<ion-icon name="square"></ion-icon>\n									</button>\n								</ion-col>\n							</ion-row>\n						</ion-grid>\n\n						<ion-badge *ngIf="linha_atual">\n							Comando atual: {{linha_atual}}\n						</ion-badge>\n					</div>\n\n					<p class="instructs">\n					<strong>Instruções suportadas: </strong> (passe o mouse)<br>\n						<ion-badge style="margin: 2px" *ngFor="let i of objectKeys(comandos_permitidos)">\n						{{i}} <span class="tooltip">{{legendas[i]}}</span>\n						</ion-badge>\n					</p>\n\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/simulador/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

var Registrador = (function () {
    function Registrador() {
    }
    Registrador.prototype.setIndice = function (i) {
        this.indice = i;
    };
    Registrador.prototype.getIndice = function () {
        return this.indice;
    };
    Registrador.prototype.setValor = function (valor) {
        this.valor = valor;
    };
    Registrador.prototype.getValor = function () {
        if (this.valor == '' || this.valor == undefined)
            return 0;
        return parseFloat(this.valor);
    };
    return Registrador;
}());
var Memoria = (function () {
    function Memoria() {
    }
    Memoria.prototype.setIndice = function (i) {
        this.indice = i;
    };
    Memoria.prototype.getIndice = function () {
        return this.indice;
    };
    Memoria.prototype.setValor = function (valor) {
        this.valor = valor;
    };
    Memoria.prototype.getValor = function () {
        return this.valor;
    };
    return Memoria;
}());
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(219);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_1__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/var/www/html/simulador/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/var/www/html/simulador/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[195]);
//# sourceMappingURL=main.js.map