import uniqid from 'uniqid';

export class Usuario{
    constructor(nome){
        this.id = uniqid();
        this.nome = nome;
    }
}