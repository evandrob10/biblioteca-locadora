//VIEWS
import PageHome from "../View/home.js";
import PageRefund from "../View/refund.js";
import { PageLending } from "../View/lending.js";
import PageCreateProduct from "../View/createProduct.js";
//SERVICES
import Quest from "../Service/Input.js";
import { Filme } from "../Service/Filmes.js";
import { Livro } from "../Service/Livro.js"

export default class ControllerBiblioteca {
    constructor(products, users) {
        this.page_selected = "";
        this.products = products;
        this.users = users;
    }

    refund(id, type) {
        let confirm = true;
        do {
            const product = this.products.getAll().find(product => product.id == id);
            if (product) {
                delete product.user;
                product.lending = false;
                this.products.update(id, product)
                console.log(`${type ? "Livro" : "Filme"} ${product.name} devolvido com sucesso!`);
                confirm = false;
            } else {
                console.log("O ID informado, não é valido!");
            }
        } while (confirm);
    }

    vQuantityPerStudent(idStudents) {
        const products = this.products.getAll();
        const productsLedding = products.filter(product => product.lending ? product.user.id == idStudents.id : "");
        return productsLedding.length < 3;
    }

    async findStudent() {
        let user = "";

        do {
            const id = await Quest({
                message: `Digite o nome ID do aluno:\n (Digite SAIR para cancelar)`,
                error: `Você precisa informar o aluno.`
            })

            if (id.toLowerCase() == "sair") return;

            user = this.users.getUser(id);

            if (!user) {
                console.log("ID de usuario invalido!");
                continue;
            }

            const response = await Quest({
                message: `Usuario é ${user.nome} \n 1 - SIM \n 2 - NÃO`,
                error: `Você precisa confirmar o nome do usuario`
            });

            if (response !== "1") user = "";

        } while (!user)

        return user;
    }

    async Product(typeBook) {
        do {
            const text = typeBook ? "LIVRO" : "FILME";
            this.pageSelected = await PageHome({ text: text });
            switch (this.pageSelected) {
                case "1":
                    const student = await this.findStudent();
                    const productsLedding = this.vQuantityPerStudent(student); /// verifica quantidade de aluno e retorna se está habilitado a pegarmais livros

                    if (!productsLedding) {
                        console.log("O aluno atingiu a quantidade maxima emprestimo!")
                        return true;
                    }

                    const product = student && await PageLending({ products: this.products.getAll(), typeBook });

                    if (product) {
                        product.user = student;
                        product.lending = true;
                        this.products.update(product.id, product);
                        console.log(`O ${text.toLowerCase()} ${product.name} emprestado com sucesso!`)
                    }

                    break;
                case "2":
                    const productAll = this.products.getAll();
                    const response = await PageRefund(productAll, text.toLowerCase());
                    if (response) this.refund(response.id, typeBook);
                    break;
            }
        } while (this.pageSelected !== "3");
        return true;
    }

    createProduct(product){
        return new Filme(product.name, product.autor)
    }

    async registerProduct({ livros, filmes }) {
        const { product, productType } = await PageCreateProduct();
        if (product && productType) {
            if (productType.toLowerCase() === "filme") filmes.create(this.createProduct(product));
            else livros.create(this.createProduct(product));
            console.log("Produto registrado");
        }else console.log("Error ao criar produto!");
    }
}