import uniqid from 'uniqid';

class Usuario{
    constructor(nome){
        this.id = uniqid();
        this.nome = nome;
    }
}