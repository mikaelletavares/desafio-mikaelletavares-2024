import { RecintosZoo } from './recintos-zoo.js';
import readline from 'readline';

// Cria uma interface de leitura para entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para obter a entrada do usuário e processar a análise
const obterEntradaUsuario = () => {
    rl.question('Digite o nome do animal: ', (animalNome) => {
        rl.question('Digite a quantidade: ', (quantidade) => {
            const quantidadeNum = parseInt(quantidade, 10);

            if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
                console.log('Quantidade inválida');
                rl.close();
                return;
            }

            const zoo = new RecintosZoo();
            const resultado = zoo.analisaRecintos(animalNome.toUpperCase(), quantidadeNum);

            if (resultado.erro) {
                console.log(resultado.erro);
            } else {
                console.log('Recintos viáveis:');
                resultado.recintosViaveis.forEach(recinto => console.log(recinto));
            }

            rl.close();
        });
    });
};

// Chama a função para iniciar o processo
obterEntradaUsuario();
