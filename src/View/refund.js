import Quest from "../Service/Input.js";

export default async function PageRefund(products, type) {
    do {
        let response = await Quest({
            message: `Digite id do ${type}\n(Digite SAIR para cancelar):`,
            error: `Você precisa digitar o id do ${type}`
        })

        if(response.toLowerCase() === "sair") {
            return;
        };

        const productsSelected = products.find(element => `${element.id}` === response);

        if(productsSelected && productsSelected.lending){
            console.log(`ID: ${productsSelected.id} \n Nome: ${productsSelected.name} \n Autor: ${productsSelected.autor}`)
            const response = await Quest({
                message: `Esse é o ${type} que deseja devolver? \n 1 - SIM \n 2 - NÃO \n 3 - SAIR`,
                error: `Você precisa confirmar`,
            })
            if (response === "1") return productsSelected;
            if (response === "3") break;
        }else if(!productsSelected.lending) {
            console.log(`Este ${type} não está emprestado!`);
            break;
        }
        else console.log(`id invalido!`);
    } while (true);
}