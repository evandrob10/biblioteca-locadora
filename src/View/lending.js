import Quest from "../Service/Input.js";
export async function PageLending({ products, typeBook }) {

    function listBooks() {
        products.forEach(element => !element.lending ? console.log(`ID: ${element.id} \n Nome: ${element.name} \n Autor: ${element.autor} \n ${`=`.repeat(20)}`) : console.log(`ID: ${element.id} \n Nome: ${element.name} \n Autor: ${element.autor} \n Emprestado: SIM \n Usuario Locatário: \n ID: ${element.user.id} \n Nome: ${element.user.nome}`));
    }

    async function selectProduct() {
        let confirm = true;
        do {
            const productType = typeBook ? "livro" : "filme";

            const response = await Quest({
                message: `Digite o ID do ${productType}:\n(Digite SAIR para cancelar):`,
                error: `Você precisa digitar o id do ${productType}`
            })

            if (response.toLowerCase() === "sair") {
                return;
            };

            const productSelected = products.find(element => `${element.id}` === response);

            if (productSelected) {
                console.log(`ID: ${productSelected.id} \n Nome: ${productSelected.name} \n Autor: ${productSelected.autor}`)
                const response = await Quest({
                    message: `Esse é o ${productType} desejado? \n 1 - SIM \n 2 - NÃO \n 3 - SAIR`,
                    error: `Você precisa confirmar`
                })
                if (response.toLowerCase() === "sair") {
                    return;
                };
                if (response === "1") return productSelected;
            }
            else console.log(`id invalido!`);
        } while (confirm);
    }

    async function initPage() {
        let book = "";
        do {
            console.log(`${typeBook ? "LIVROS DISPONIVEIS" : "FILMES DISPONIVEIS"}`)
            listBooks();
            book = selectProduct();
        } while (!book);
        return book;
    }

    return await initPage();
}
