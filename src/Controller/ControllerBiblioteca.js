//VIEWS
import PageHome from "../View/pageHome.js";
import PageDevolucao from "../View/devolucao.js";
import { PageEmprestimo } from "../View/emprestimo.js";
//SERVICES
import Quest from "../Service/Input.js";

export default class ControllerBiblioteca {
    constructor(livros, users) {
        this.page_selected = "";
        this.livros = livros;
        this.users = users;
    }

    devolverLivro(id) {
        let confirmar = true;
        do {
            const livro = this.livros.pegarTodosLivros().find(livro => livro.id == id);
            if (livro) {
                delete livro.user;
                livro.emprestimo = false;
                this.livros.atualizarLivros(id, livro)
                console.log(`Livro ${livro.name} devolvido com sucesso!`);
                confirmar = false;
            }else{
                console.log("O ID informado, não é valido!");
            }
        } while (confirmar);

    }

    vQuantidadePorAluno(idAluno) {
        const livros = this.livros.pegarTodosLivros();
        const livrosEmprestados = livros.filter(element => element.user ? element.user.id == idAluno.id : "");
        return livrosEmprestados.length < 3;
    }

    async localizarAluno() {

        let aluno = "";

        do {
            const id = await Quest({
                message: `Digite o nome ID do aluno:`,
                error: `Você precisa informar o aluno.`
            })

            aluno = this.users.pegarUsuario(id);

            if (!aluno) {
                console.log("ID de usuario invalido!");
                continue;
            }

            const response = await Quest({
                message: `Usuario é ${aluno.nome} \n 1 - SIM \n 2 - NÃO`,
                error: `Você precisa confirmar o nome do usuario`
            });

            if (response !== "1") aluno = "";

        } while (!aluno)

        return aluno;
    }

    async Views() {
        do {
            this.page_selected = await PageHome({text: "LIVRO"});
            switch (this.page_selected) {
                case "1":
                    const aluno = await this.localizarAluno();
                    const livrosEmprestados = this.vQuantidadePorAluno(aluno); /// verifica quantidade de aluno e retorna se está habilitado a pegarmais livros

                    if (!livrosEmprestados) {
                        console.log("O aluno atingiu a quantidade maxima emprestimo de livro!")
                        return true;
                    }

                    const livro = aluno ? await PageEmprestimo({ livros: this.livros.pegarTodosLivros() }) : this.Views();

                    if (livro) {
                        livro.user = aluno;
                        livro.emprestimo = true;
                        this.livros.atualizarLivros(livro.id, livro);
                        console.log(`O livro ${livro.name} emprestado com sucesso!`)
                    }

                    break;
                case "2":
                    const livros = this.livros.pegarTodosLivros();
                    const response = await PageDevolucao(livros, "livro");
                    if(response) this.devolverLivro(response.id);
                    break;
            }
        } while (this.page_selected !== "3");
        return true;
    }

    listarlivros() {
        if (this.livros.length) {
            for (const livro of livros) {
                if (livro.emprestado) {
                    console.log(`ID: ${livro.id} \n Nome: ${livro.name} \n Autor: ${livro.autor} \n Emprestado: SIM \n Usuario Locatário: \n ID: ${livro.user.id} \n Nome: ${livro.user.nome}`);
                } else {
                    console.log(`ID: ${livro.id} \n Nome: ${livro.name} \n Autor: ${livro.autor} \n Emprestado: NÃO`);
                }
            }
        } else {
            console.log("Não há livros cadastrados!");
        }
    }
}