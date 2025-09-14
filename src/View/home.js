import Quest from "../Service/Input.js";
const PageHome = async ({text}) => {
    return await Quest({
        message: `ESCOLHA UMA DAS OPÇÕES: \n 1 - EMPRESTAR ${text} \n 2 - DEVOLVER ${text} \n 3 - SAIR`,
        error: `Você esqueceu de selecionar a opção!`
    })
}

export default PageHome;