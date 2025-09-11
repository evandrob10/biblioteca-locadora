import Quest from "../../../config/Input.js";
const PageHome = async () => {
    return await Quest({
        message: `ESCOLHA UMA DAS OPÇÕES: \n 1 - EMPRESTAR LIVRO \n 2 - DEVOLVER LIVRO \n 3 - SAIR`,
        error: `Você esqueceu de selecionar a opção!`
    })
}

export default PageHome;