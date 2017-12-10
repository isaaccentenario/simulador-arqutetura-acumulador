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
		'ADD': 'Adiciona um valor de um registrador',
		'STO': 'Armazena o valor do acumulador no registrador,Armazena o valor do acumulador no registrador,Armazena o valor do acumulador no registrador',
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

			let elem = linha.match(new RegExp('(PC|IR|ACC|R[0-'+this.config["registradores"]+']|M[0-'+this.config["memoria"]+'])$'));
			
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
		if( elemento.match(/[R,M]\d{1,2}/) ) {
			return parseInt(elemento.substring(1));
		}
		return elemento.toLowerCase();
	}

	zer(r) {
		console.log(r);
	}

	add(r) {
		console.log(this.getElemento(r));
	}

	sto(r) {
		console.log(r);
	}

	mul(r) {
		console.log(r);
	}

	div(r) {
		console.log(r);
	}

	sub(r) {
		console.log(r);
	}

	and(r) {
		console.log(r);
	}

	or(r) {
		console.log(r);
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
		return this.valor;
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