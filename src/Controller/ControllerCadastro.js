import PageRegister from "../View/register.js";

export default class ControllerCadastro{
    async Register(db){
       const usuario =  await PageRegister();
       if(usuario){
            db.set(usuario);
            console.log(usuario);
            console.log("Usuario cadastrado com sucesso!");
       }else{
            console.log("Error ao cadastrar o usuario, por favor tentar novamente mais tarde!");
       }
    }
}