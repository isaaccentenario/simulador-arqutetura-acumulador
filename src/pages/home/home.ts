import { Component, ElementRef } from '@angular/core';

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
	
	public constructor() { 

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

