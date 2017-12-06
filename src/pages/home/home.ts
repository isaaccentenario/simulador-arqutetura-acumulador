import { Component, ElementRef } from '@angular/core';
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
	
	private comandos_permitidos:any = [
		'ZER','ADD','STO','MUL','DIV','SUB','AND','OR'
	];

	public constructor(public toast:ToastController) { 

		for( let i = 0; i < this.config["registradores"]; i++ ) {
			this.registradores[i] = new Registrador();
			this.registradores[i].setIndice(i);
		}

		for( let i = 0; i < this.config["memoria"]; i++ ) {
			this.memoria[i] = new Memoria();
			this.memoria[i].setIndice(i);
		}
	}

	public executar()
	{
		if( this.instrucao.length < 4 ) {
			this.toast.create({
				'message': 'Impossível executar uma instrução vazia, né truta!',
				'duration': 3000
			})

			return false;
		}

		var linhas = this.instrucao.split('\n');

		let l = 1;
		for( let linha of linhas ) {
			if (linha.replace(/\s/g, "").length <= 0 ) {
				continue;
			}
			let match = linha.match(new RegExp('^(' + this.comandos_permitidos.join('|') + ') '));

			if( match == null ) {
				this.toast.create({
					'message' : 'A linha ' + l + ' ('+linha+') contém comandos desconhecidos',
					'duration' : 3000
				}).present();

				return false;
			}

			match = linha.match(new RegExp('(PC|IR|ACC|R[0-'+this.config["registradores"]+']|M[0-'+this.config["memoria"]+'])$'));
			
			if( null == match ) {
				this.toast.create({
					'message' : 'A linha ' + l + ' ('+linha+') contém um elemento de índice inválido (R ou M)',
					'duration' : 3000
				}).present();

				return false;
			}

			l++;
		}
	}

	public zera_acumulador()
	{

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

