import readline from 'node:readline';
import {stdin as input, stdout as output} from 'node:process';

const rl = readline.createInterface({ input, output });

function alert(message, error){
    if(!message) console.log(error);
}

function question(quest) {
    return new Promise((resolve) => {
        rl.question((quest + "\n"), (response) => {
            resolve(response);
        });
    });
};


export default async function Quest({message, error}){
    
    let response = "";
    do{
        response = await question(message);
        alert(response, error);
    }while(!response);
    return response;
}
