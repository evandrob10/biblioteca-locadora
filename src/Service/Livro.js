import uniqid from 'uniqid';

export class Livro{
    constructor(titulo, autor){
        this.id = uniqid();
        this.titulo = titulo;
        this.autor = autor;
        this.emprestado = false;
    }

    emprestar(){
        this.emprestado = true;
    }

    devolver(){
        this.emprestado = false;
    }
}