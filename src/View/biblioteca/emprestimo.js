import Quest from "../../../config/Input.js";
export async function PageEmprestimo({livros}) {

    function listarLivros() {
        livros.forEach(element => !element.emprestimo ? console.log(`ID: ${element.id} \n Nome: ${element.name} \n Autor: ${element.autor} \n ${`=`.repeat(20)}`) : console.log(`ID: ${element.id} \n Nome: ${element.name} \n Autor: ${element.autor} \n Emprestado: SIM \n Usuario Locatário: \n ID: ${element.user.id} \n Nome: ${element.user.nome}`));
    }

    async function selecionarLivro() {
        let confirmar = true;
        do {
            const response = await Quest({
                message: `Digite o ID do livro:`,
                error: `Você precisa digitar o id do livro`
            })

            const livro_selected = livros.find(element => `${element.id}` === response);

            if (livro_selected) {
                console.log(`ID: ${livro_selected.id} \n Nome: ${livro_selected.name} \n Autor: ${livro_selected.autor}`)
                const response = await Quest({
                    message: `Esse é o livro desejado? \n 1 - SIM \n 2 - NÃO`,
                    error: `Você precisa confirmar`
                })
                if(response === "1") return livro_selected;
            }
            else console.log(`id invalido!`);
        } while (confirmar);
    }

    async function initPage() {
        let livro = "";
        do {
            console.log('LIVROS DISPONIVEIS:')
            listarLivros();
            livro = selecionarLivro();
        } while (!livro);
        return livro;
    }

    return await initPage();
}
