import uniqid from 'uniqid';

class Filmes{
    constructor(titulo, diretor){
        this.id = uniqid();
        this.titulo = titulo;
        this.diretor = diretor;
        this.emprestado = false;
    }

    emprestar(){
        this.emprestado = true;
    }

    devolver(){
        this.emprestado = false;
    }
}