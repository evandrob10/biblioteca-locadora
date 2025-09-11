export default class DB{
    constructor(){
        this.users = [];
    }

    adicionarUsuario(user){
        this.users.push(user);
    }

    pegarUsuario(id){
        return this.users.find(element => element.id === id);
    }
}