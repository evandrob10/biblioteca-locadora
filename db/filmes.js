export default class Filmes {
    constructor() {
        this.filmes = [
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
    }

    pegarTodosFilmes(){
        return this.filmes;
    }
}