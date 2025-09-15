import uniqid from 'uniqid';

export class Filme{
    constructor(titulo, diretor){
        this.id = uniqid();
        this.name = titulo;
        this.autor = diretor;
        this.emprestado = false;
    }

    emprestar(){
        this.emprestado = true;
    }

    devolver(){
        this.emprestado = false;
    }
}