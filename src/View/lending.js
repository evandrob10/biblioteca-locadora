import Quest from "../Service/Input.js";
export async function PageLending({products}) {

    function listBooks() {
        products.forEach(element => !element.emprestimo ? console.log(`ID: ${element.id} \n Nome: ${element.name} \n Autor: ${element.autor} \n ${`=`.repeat(20)}`) : console.log(`ID: ${element.id} \n Nome: ${element.name} \n Autor: ${element.autor} \n Emprestado: SIM \n Usuario Locatário: \n ID: ${element.user.id} \n Nome: ${element.user.nome}`));
    }

    async function selectBook() {
        let confirmar = true;
        do {
            const response = await Quest({
                message: `Digite o ID do livro:`,
                error: `Você precisa digitar o id do livro`
            })

            const bookSelected = products.find(element => `${element.id}` === response);

            if (bookSelected) {
                console.log(`ID: ${bookSelected.id} \n Nome: ${bookSelected.name} \n Autor: ${bookSelected.autor}`)
                const response = await Quest({
                    message: `Esse é o livro desejado? \n 1 - SIM \n 2 - NÃO`,
                    error: `Você precisa confirmar`
                })
                if(response === "1") return bookSelected;
            }
            else console.log(`id invalido!`);
        } while (confirmar);
    }

    async function initPage() {
        let book = "";
        do {
            console.log('LIVROS DISPONIVEIS:')
            listBooks();
            book = selectBook();
        } while (!book);
        return book;
    }

    return await initPage();
}
