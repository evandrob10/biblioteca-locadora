export default class Users{
    constructor(){
        this.users = [];
    }

    create(user){
        this.users.push(user);
    }

    getUser(id){
        return this.users.find(element => element.id === id);
    }
}