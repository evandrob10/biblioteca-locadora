export default class Movies {
    constructor() {
        this.movies = [
            {
                id: 1,
                name: "Pai Rico, Pai Pobre",
                autor: "Kiyosaki Robert T",
                lending: false
            },
            {
                id: 2,
                name: "Mentes Extraordinárias",
                autor: "Dell'Isola, Alberto",
                lending: false
            },
            {
                id: 4,
                name: "Joao e Maria",
                autor: "Roberto Carlos",
                lending: false
            },
            {
                id: 5,
                name: "Natal em familia",
                autor: "Ninguem",
                lending: false
            }
        ];
    }

    update(id, update){
        this.movies = this.movies.map(element => element.id == id ? element = update : element);
    }

    getAll(){
        return this.movies;
    }
}