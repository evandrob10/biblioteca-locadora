import readline from 'node:readline';
import {stdin as input, stdout as output} from 'node:process';

const rl = readline.createInterface({ input, output });

function alert(message, error,){
    if(!message) console.log(error);
}

function question(quest) {
    return new Promise((resolve) => {
        rl.question((quest + "\n"), (response) => {
            resolve(response);
        });
    });
};


export default async function Quest({message, error, exit}){
    let response = "";
    do{
        response = await question(message);
        alert(response, error);
        if(response === "0") exit();
    }while(!response);
    return response;
}
