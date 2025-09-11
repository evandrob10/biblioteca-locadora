import PageHome from "../View/biblioteca/index.js";
import { PageEmprestimo } from "../View/biblioteca/emprestimo.js";
import Quest from "../../config/Input.js";

export default class ControllerBiblioteca {
    constructor() {
        this.livros = [
            {
                id: 1,
                name: "Pai Rico, Pai Pobre",
                autor: "Kiyosaki Robert T",
                emprestimo: false
            },
            {
                id: 2,
                name: "Mentes Extraordinárias",
                autor: "Dell'Isola, Alberto",
                emprestimo: false
            },
            {
                id: 4,
                name: "Joao e Maria",
                autor: "Roberto Carlos",
                emprestimo: false
            },
            {
                id: 5,
                name: "Natal em familia",
                autor: "Ninguem",
                emprestimo: false
            }
        ];
        this.page_selected = "";
    }

    vQuantidadePorAluno(idAluno) {
        const livros = this.livros.filter(element => element.user ? element.user.id == idAluno.id : "");
        return livros.length < 3;
    }

    async solicitarAluno(db) {
        let aluno = "";

        do {
            const id = await Quest({
                message: `Digite o nome ID do aluno:`,
                error: `Você precisa informar o aluno.`
            })

            aluno = db.users.find(element => element.id == id);

            const response = await Quest({
                message: `Usuario é ${aluno.nome} \n 1 - SIM \n 2 - NÃO`,
                error: `Você precisa confirmar o nome do usuario`
            })

            if (response !== "1") aluno = "";

        } while (!aluno)

        return aluno;
    }

    async Views(db) {
        do {
            this.page_selected = await PageHome();
            switch (this.page_selected) {
                case "1":
                    const aluno = await this.solicitarAluno(db);
                    const livrosEmprestados = this.vQuantidadePorAluno(aluno); /// verifica quantidade de aluno e retorna se está habilitado a pegarmais livros

                    if (!livrosEmprestados) {
                        console.log("O aluno atingiu a quantidade maxima emprestimo de livro!")
                        return true;
                    }

                    const livro = aluno ? await PageEmprestimo({ livros: this.livros }) : this.Views(db);

                    this.livros = this.livros.map(element => {
                        if (element.id === livro.id) {
                            element.emprestimo = true;
                            element.user = aluno;
                        }
                        return element;
                    })
                    if (livro) {
                        console.log(`O livro ${livro.name} emprestado com sucesso!`)
                    }

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