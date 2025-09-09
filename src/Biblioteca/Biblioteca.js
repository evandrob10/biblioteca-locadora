class Biblioteca{
    constructor(){
        this.livros = [];
    }

    adicionarLivro(livro){
        this.livros.push(livro);
    }

    listarlivros(){
        if(this.livros.length){
            for(const livro of livros){
                if(livro.emprestado){
                    console.log(`ID: ${livro.id} \n Nome: ${livro.titulo} \n Autor: ${livro.autor} \n Emprestado: SIM \n Usuario Locatário: \n ID: ${livro.user.id} \n Nome: ${livro.user.name}`);
                }else{
                    console.log(`ID: ${livro.id} \n Nome: ${livro.titulo} \n Autor: ${livro.autor} \n Emprestado: NÃO`);
                }
            }   
        }else{
            console.log("Não há livros cadastrados!");
        }
    }
}