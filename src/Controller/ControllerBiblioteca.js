//VIEWS
import PageHome from "../View/home.js";
import PageRefund from "../View/refund.js";
import { PageLending } from "../View/lending.js";
//SERVICES
import Quest from "../Service/Input.js";

export default class ControllerBiblioteca {
    constructor(products, users) {
        this.page_selected = "";
        this.products = products;
        this.users = users;
    }

    refund(id) {
        let confirm = true;
        do {
            const product = this.products.getAll().find(livro => livro.id == id);
            if (product) {
                delete product.user;
                product.lending = false;
                this.products.update(id, product)
                console.log(`Livro ${product.name} devolvido com sucesso!`);
                confirm = false;
            } else {
                console.log("O ID informado, não é valido!");
            }
        } while (confirm);

    }

    vQuantityPerStudent(idStudents) {
        const products = this.products.getAll();
        const productsLedding = products.filter(product => product.lending ? element.user.id == idStudents.id : "");
        return productsLedding.length < 3;
    }

    async findStudent() {
        let user = "";

        do {
            const id = await Quest({
                message: `Digite o nome ID do aluno:`,
                error: `Você precisa informar o aluno.`
            })

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

    async Views(Book) {
        do {
            const text = Book ? "LIVRO" : "FILME";
            this.pageSelected = await PageHome({ text: text });
            switch (this.pageSelected) {
                case "1":
                    const student = await this.findStudent();
                    const productsLedding = this.vQuantityPerStudent(student); /// verifica quantidade de aluno e retorna se está habilitado a pegarmais livros

                    if (!productsLedding) {
                        console.log("O aluno atingiu a quantidade maxima emprestimo de livro!")
                        return true;
                    }

                    const product = student ? await PageLending({ products: this.products.getAll() }) : this.Views();

                    if (product) {
                        product.user = student;
                        product.emprestimo = true;
                        this.products.update(product.id, product);
                        console.log(`O livro ${product.name} emprestado com sucesso!`)
                    }

                    break;
                case "2":
                    const productAll = this.products.getAll();
                    const response = await PageRefund(productAll, "livro");
                    if (response) this.refund(response.id);
                    break;
            }
        } while (this.pageSelected !== "3");
        return true;
    }

}