import PageRegister from "../View/register.js";

export default class ControllerCadastro {
     async Register(db) {
          const usuario = await PageRegister();
          if (usuario) {
               db.create(usuario);
               console.log(usuario);
               console.log("Usuario cadastrado com sucesso!");
          }
     }
}