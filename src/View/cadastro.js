import Quest from "../Service/Input.js";
import { Usuario } from "../Service/Usuario.js";
export default async function Cadastro(users) {
    console.log('Bem vindo ao Cadastro de usuarios!');
    let validarUsuario = true;
    let nomeUsuario = "";
    while (validarUsuario) {
        nomeUsuario = await Quest({
            message: `Digite o nome do usuario:`,
            error: `Você precisa preencher os dados do usuario.`
        })
        const response = await Quest({
            message: `Usuario é ${nomeUsuario} \n 1 - SIM \n 2 - NÃO`,
            error: `Você precisa confirmar o nome do usuario`
        })
        if (response === "1") validarUsuario = false
    }
    return new Usuario(nomeUsuario);
}