//CONTROLLERS
import ControllerCadastro from "./Controller/ControllerCadastro.js";
import ControllerBiblioteca from "./Controller/ControllerBiblioteca.js";
//SERVICE
import Quest from "../src/Service/Input.js";
//DB
import Users from "../db/users.js";
import Livros from "../db/livros.js";
import Filmes from "../db/filmes.js";

export class Routes {
    constructor() {
        this.db = {
            users: new Users(),
            livros: new Livros(),
            filmes: new Filmes()
        }
        this.initRoutes();
    }
    //Routas:
    async routes(modul_selected) {
        switch (modul_selected) {
            case "1":
                const controllerB = new ControllerBiblioteca(this.db.livros, this.db.users, this.initRoutes);
                const books = await controllerB.Product(true);
                if (books) this.initRoutes(); // Verifica obteve retorno da view
                else return true
                break;
            case "2":
                const controllerM = new ControllerBiblioteca(this.db.filmes, this.db.users, this.initRoutes);
                const movies = await controllerM.Product();
                if (movies) this.initRoutes(); // Verifica obteve retorno da view
                break;
            case "3":
                const selected = await Quest({
                    message: 'ESCOLHA MODULO ACESSAR: \n 1 - CADASTRAR ALUNO \n 2 - CADASTRAR PRODUTO',
                    error: 'Você esqueceu de selecionar o modulo'
                });

                if (selected == "1") {
                    const controllerC = new ControllerCadastro(this.db.users, this.initRoutes);
                    await controllerC.Register(this.db.users);
                } else if (selected == "2") {
                    const controllerCP = new ControllerBiblioteca();
                    await controllerCP.registerProduct({ livros: this.db.livros, filmes: this.db.filmes });
                } else {
                    console.log("opção invalida!");
                }

                this.initRoutes()
                break;
            case "4":
                console.log("Você saiu do sistema!");
                return true;
            default:
                console.log("Opção invalida!");
                this.initRoutes();
        }
    }
    //Inicia as rotas:
    async initRoutes() {
        console.clear();
        let exit = false;
        do {
            const modul_selected = await Quest({
                message: 'ESCOLHA MODULO ACESSAR: \n 1 - BIBLIOTECA \n 2 - LOCADORA \n 3 - CADASTRO \n 4 - SAIR',
                error: 'Você esqueceu de selecionar o modulo'
            });
            exit = this.routes(modul_selected);
        } while (!exit);
        
    }
}