import Quest from "../config/Input.js";
import ControllerBiblioteca from "./Controller/ControllerBiblioteca.js";
import ControllerCadastro from "./Controller/ControllerCadastro.js";
import DB from "./db/users.js";

export class Routes {
    constructor() {
        this.db = new DB();
        this.initRoutes();
    }
    //Routas:
    async routes(modul_selected) {
        switch (modul_selected) {
            case "1":
                const controllerB = new ControllerBiblioteca();
                const response = await controllerB.Views(this.db);
                if (response) this.initRoutes(); // Verifica obteve retorno da view
                else return true
                break;
            case "2":

                break;
            case "3":
                const controllerC = new ControllerCadastro();
                await controllerC.PageCadastro(this.db);
                this.initRoutes()
                break;
            case "4":
                console.log("Você saiu do sistema!");
                return true;
            default:
                console.log("Opção invalida!");
        }
    }
    //Inicia as rotas:
    async initRoutes() {
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