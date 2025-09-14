import Quest from "../Service/Input.js";

export default async function PageDevolucao(itens, text) {
    do {
        const response = await Quest({
            message: `Digite id do livro:`,
            error: `Você precisa digitar o id do ${text}`
        })

        const livro_selected = itens.find(element => `${element.id}` === response);

        if(livro_selected && livro_selected.emprestimo){
            console.log(`ID: ${livro_selected.id} \n Nome: ${livro_selected.name} \n Autor: ${livro_selected.autor}`)
            const response = await Quest({
                message: `Esse é o ${text} que deseja devolver? \n 1 - SIM \n 2 - NÃO \n 3 - SAIR`,
                error: `Você precisa confirmar`
            })
            if (response === "1") return livro_selected;
            if (response === "3") break;
        }else if(!livro_selected.emprestimo) {
            console.log("Este livro não está emprestado!");
            break;
        }
        else console.log(`id invalido!`);
    } while (true);
}