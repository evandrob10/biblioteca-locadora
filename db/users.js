export default class Users{
    constructor(){
        this.users = [];
    }

    set(user){
        this.users.push(user);
    }

    getUser(id){
        return this.users.find(element => element.id === id);
    }
}