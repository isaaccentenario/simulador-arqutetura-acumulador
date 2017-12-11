import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	public config = {
		"registradores" : 8,
		"memoria" : 20
	};

	public registradores:Registrador[] = [];
	public memoria:Memoria[] = [];
	public acumulador:Registrador = new Registrador();
	public pc:Registrador = new Registrador();
	public ir:Registrador = new Registrador();
	public instrucao:string;
	
	private comandos_permitidos:any = {
		'ZER': this.zer,
		'ADD': this.add,
		'STO': this.sto,
		'MUL':this.mul,
		'DIV': this.div,
		'SUB': this.sub,
		'AND': this.and,
		'OR': this.or
	};

	private legendas:any = {
		'ZER': 'Zera um registrador',
		'ADD': 'Adiciona um valor de um registrador ao acumulador',
		'STO': 'Armazena o valor do acumulador em um registrador',
		'MUL': 'Multiplica um valor a partir de um registrador',
		'DIV': 'Divide um valor',
		'SUB': 'Subtrai um valor',
		'AND': 'Faz a operação AND a partir de um registrador',
		'OR' : 'Faz a operação OR a partir de um registrador'
	};

	public execucao:any = [];

	public interval;
	public passo = 0;
	public tempo_animacao = 1500;
	public executando:boolean = false;

	public player: any;
	public linha_atual:any = '';

	public constructor(public toast:ToastController) { 

		for( let i = 0; i < this.config["registradores"]; i++ ) {
			this.registradores[i] = new Registrador();
			this.registradores[i].setIndice(i);
		}

		for( let i = 0; i < this.config["memoria"]; i++ ) {
			this.memoria[i] = new Memoria();
			this.memoria[i].setIndice(i);
		}

		this.player = {
			'play' : () => {
				if(this.parsear()) {
					this.executando = true;
					this.animacao();
				}
			}, 'pause' : () => {
				if(this.parsear()) {
					this.executando = false;
					clearInterval(this.interval);
				}
			}, 'next' : () => {
				clearInterval(this.interval);
				if(this.parsear() ) this.execPasso();
				this.executando = false;
			}, 'prev' : () => {
				clearInterval(this.interval);
				if(this.parsear()) {
					this.passo-=2;
					this.execPasso();
					this.executando = false;
				}
			}, 'stop' : () => {
				clearInterval(this.interval);
				this.linha_atual = '';
				this.passo = 0;
				this.executando = false;
				this.execucao = [];
			}
		}
	}

	parsear()
	{
		if( !this.instrucao || this.instrucao.length < 4 ) {
			this.toast.create({
				'message': 'Impossível executar uma instrução vazia, né truta!',
				'duration': 3000
			}).present();

			return false;
		}

		var linhas = this.instrucao.split('\n');

		let l = 1;
		this.execucao = [];
		for( let linha of linhas ) {
			if (linha.replace(/\s/g, "").length <= 0 ) {
				continue;
			}

			let cmd = linha.match(
					new RegExp('^(' + this.objectKeys(this.comandos_permitidos).join('|') + ') ')
				);

			if( cmd == null ) {
				this.toast.create({
					'message' : 'A linha ' + l + ' ('+linha+') contém comandos desconhecidos',
					'duration' : 3000
				}).present();

				return false;
			}

			let elem = linha.match(new RegExp('(PC|IR|ACC|\\d{1,2}|R[0-'+(this.config["registradores"]-1)+']|M[0-'+(this.config["memoria"]-1)+'])$'));
			
			if( null == elem ) {
				this.toast.create({
					'message' : 'A linha ' + l + ' ('+linha+') contém um elemento de índice inválido (R ou M)',
					'duration' : 3000
				}).present();

				return false;
			}

			this.execucao.push({
				'funcao' : cmd[0].toLowerCase().trim(),
				'elem' : elem[0]
			});
			l++;
		}

		return true;
	}

	execPasso() {
		let len = Object.keys(this.execucao).length;
		if (this.passo >= len) {
			this.passo = 0;
		}
		if (this.passo < 0) this.passo = len - 1;

		let item = this.execucao[this.passo];

		if( undefined == item ) return false;
		this[item['funcao']](item['elem']);
		this.passo++;

		this.linha_atual = item['funcao'].toUpperCase() + ' ' + item['elem'];
	}

	animacao()
	{
		if (this.passo >= this.execucao.length) {
			clearInterval(this.interval);
			return false;
		}
		this.executando = true;
		this.interval = setInterval( () => { 
			this.execPasso() 
		}, this.tempo_animacao );
	}

	objectKeys(obj) {
		return Object.keys(obj);
	}

	instructToUpper()
	{
		if( null != this.instrucao && undefined != this.instrucao )  {
			this.instrucao = this.instrucao.toUpperCase();
		}
	}

	getElemento(elemento) {
		if (elemento.match(/(R|M)\d{1,2}/) != null ) {
			return parseInt(elemento.substr(1));
		}
		return -1;
	}

	ehMemoria( r ) {
    return /M\d{1,2}/.test( r );
	}
	ehRegistrador( r ) {
    return /R\d{1,2}/.test( r );
	}




	zer(r) {
		if( undefined == r ) {
			for(let i = 0; i < this.config["registradores"]; i++ ) {
				this.registradores[i].setValor(0);
			}
			for (let i = 0; i < this.config["memoria"]; i++) {
				this.memoria[i].setValor(0);
			}
			this.acumulador.setValor(0);
			this.pc.setValor(0);
			this.ir.setValor(0);
		} else {
			if( r == 'ACC' ) {

			} else if( r == 'PC' ) {

			} else if( r == 'IR' ) {

			} else {
				
			}
		}
	}

	add(r) {
		if( this.getElemento(r) == -1 ) {
			this.acumulador.setValor( this.acumulador.getValor() + parseInt(r));
		} else {
			let e = this.getElemento(r);
			this.acumulador.setValor( 
				this.acumulador.getValor() + 
				this.registradores[e].getValor() 
			);
		}
	}

	sto(r) {
		if( this.getElemento(r) == -1 ) {
			this.acumulador.setValor( this.acumulador.getValor() + parseInt(r));
		} else {
			let e = this.getElemento(r);
			this.acumulador.setValor( 
				this.acumulador.getValor() + 
				this.registradores[e].getValor() 
			);
		}
	


	}

	mul(r) {
		if( this.getElemento(r) == -1 ) {
			this.acumulador.setValor( this.acumulador.getValor() * parseInt(r));
		} else {
			let e = this.getElemento(r);
			this.acumulador.setValor( 
				this.acumulador.getValor() *
				this.registradores[e].getValor() 
			);
		}

	}

	div(r) {
		if( this.getElemento(r) == -1 ) {
			this.acumulador.setValor( this.acumulador.getValor() / parseInt(r));
		} else {
			let e = this.getElemento(r);
			this.acumulador.setValor( 
				this.acumulador.getValor() /
				this.registradores[e].getValor() 
			);
		}

	}

	sub(r) {
		if( this.getElemento(r) == -1 ) {
			this.acumulador.setValor( this.acumulador.getValor() - parseInt(r));
		} else {
			let e = this.getElemento(r);
			this.acumulador.setValor( 
				this.acumulador.getValor() -
				this.registradores[e].getValor() 
			);
		}
	}

	and(r) {
		if( this.getElemento(r) == -1 ) {
			this.acumulador.setValor( this.acumulador.getValor() & parseInt(r));
		} else {
			let e = this.getElemento(r);
			this.acumulador.setValor( 
				this.acumulador.getValor() &
				this.registradores[e].getValor() 
			);
		}	
	}

	or(r) {
		if( this.getElemento(r) == -1 ) {
			this.acumulador.setValor( this.acumulador.getValor() | parseInt(r));
		} else {
			let e = this.getElemento(r);
			this.acumulador.setValor( 
				this.acumulador.getValor() |
				this.registradores[e].getValor() 
			);
		}
	}

}

class Registrador {
	public valor;
	public indice;

	setIndice(i) {
		this.indice = i;
	}

	getIndice()
	{
		return this.indice;
	}

	setValor(valor)
	{
		this.valor = valor;
	}

	getValor()
	{
		if( this.valor == null || this.valor == undefined ) return 0;

		return parseFloat(this.valor);
	}
}

class Memoria {
	public valor;
	public indice;
	
	setIndice(i) {
		this.indice = i;
	}

	getIndice()
	{
		return this.indice;
	}

	setValor(valor)
	{
		this.valor = valor;
	}

	getValor()
	{
		return this.valor;
	}
}