//SERVICE
import Quest from "../Service/Input.js";

export default async function PageCreateProduct() {
    let productType = "";

    do {
        productType = await Quest({
            message: `ESCOLHA UMA DAS OPÇÕES: \n 1 - CADASTRA LIVRO \n 2 - CADASTRAR FILME \n 3 - SAIR`,
            error: `Você precisa digitar o nome do ${productType}!`
        });

        productType = productType === "1" ?  "livro" :  "filme";

        const verify = await Quest({
            message: `Você quer cadastrar um ${productType}, correto? \n 1 - SIM \n 2 - NÃO \n(Digite SAIR para cancelar)`,
            error: `Você precisa digitar algo!`
        });

        if (verify === "2") continue;
        if (verify.toLocaleLowerCase() === "sair") return {};
        if (verify !== "1") {
            console.log("Opção invalida!");
            continue;
        }

        break;

    } while (!productType)

    console.log(`Cadastro de ${productType}`);

    const product = {};
    let count = 0;

    do {
        const productData = await Quest({
            message: `Digite o ${count === 0 ? "nome" : "nome do autor"} do ${productType}:\n(Digite 3 para cancelar)`,
            error: `Você precisa digitar o nome do ${productType}!`
        });

        if (productData === "3") break;

        const verify = await Quest({
            message: `Está ${productData} correto? \n 1 - SIM \n 2 - NÃO \n(Digite SAIR para cancelar)`,
            error: `Você precisa digitar algo!`
        });

        if (verify === "2") continue;
        if (verify === "SAIR") break;
        if (verify !== "1") {
            console.log("Opção invalida!");
            continue;
        }

        count === 0 ? product.name = productData : product.autor = productData;
        count++;
    } while (count < 2);

    return {
        product,
        productType
    }
}