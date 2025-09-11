import Cadastro from "../View/cadastro/index.js";

export default class ControllerCadastro{
    async PageCadastro(db){
       const usuario =  await Cadastro();
       if(usuario){
            db.adicionarUsuario(usuario);
            console.log(usuario);
            console.log("Usuario cadastrado com sucesso!");
       }else{
            console.log("Error ao cadastrar o usuario, por favor tentar novamente mais tarde!");
       }
    }
}