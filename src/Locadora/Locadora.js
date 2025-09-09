import quest from "../../config";

class Biblioteca {
    constructor() {
        this.filmes = [];
    }

    //Pergunta ao usuario
    perguntarUsuario(filmes){
        filmes.forEach((livro, index) => {
            quest(`Selecione o livro: \n ID: ${livro.id}, Nome: ${livro.nome}`));
    }

    pegarItem(id, nome){
        if(id){
           const filme = [this.filmes.find(filme => filme.id = id)];
        }else{
           const  filmes = this.filmes.filter(filme => filme.nome.includes(nome));
        }
    }


    adicionarLivro(livro) {
        this.filmes.push(livro);
    }

    listarlivros() {
        if (this.livros.length) {
            for (const filme of filmes) {
                if (filme.emprestado) {
                    console.log(`ID: ${filme.id} \n Nome: ${filme.titulo} \n Autor: ${filme.autor} \n Emprestado: SIM \n Usuario Locatário: \n ID: ${filme.user.id} \n Nome: ${filme.user.name}`);
                } else {
                    console.log(`ID: ${filme.id} \n Nome: ${filme.titulo} \n Autor: ${filme.autor} \n Emprestado: NÃO`);
                }
            }
        } else {
            console.log("Não há livros cadastrados!");
        }
    }
}