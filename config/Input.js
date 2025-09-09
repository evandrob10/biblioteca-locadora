import readline from 'node:readline';
import {stdin as input, stdout as output} from 'node:process';

const rl = readline.createInterface({ input, output });

function alert(text){
    if(!text) console.log("Você esqueceu de informar seu nome!");
}

function question(quest) {
    return new Promise((resolve) => {
        rl.question((quest + "\n"), (response) => {
            resolve(response);
        });
    });
};


export default async function quest(text){
    let response = "";
    do{
        response = await question(text);
        alert(response);
    }while(!response);
    return response;
}
