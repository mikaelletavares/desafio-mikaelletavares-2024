class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { MACACO: 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: {} },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { GAZELA: 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: {} },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { LEAO: 1 } }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], tipo: 'carnivoro' },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], tipo: 'carnivoro' },
            CROCODILO: { tamanho: 3, biomas: ['rio'], tipo: 'carnivoro' },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], tipo: 'herbivoro' },
            GAZELA: { tamanho: 2, biomas: ['savana'], tipo: 'herbivoro' },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], tipo: 'herbivoro' }
        };
    }

    analisaRecintos(animal, quantidade) {
        const animalInfo = this.animais[animal.toUpperCase()];
    
        if (!animalInfo) {
            return { erro: "Animal inválido" };
        }
    
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
    
        let recintosViaveis = this.recintos.filter(recinto => {
            const animaisExistentes = recinto.animaisExistentes;
    
            // Verifica se o recinto já possui animais
            const temAnimaisExistentes = Object.keys(animaisExistentes).length > 0;
            const tipoAnimalExistente = temAnimaisExistentes ? this.animais[Object.keys(animaisExistentes)[0]].tipo : null;
    
            // Verifica se o recinto aceita o tipo de animal
            if (temAnimaisExistentes && tipoAnimalExistente !== animalInfo.tipo) {
                return false;
            }
    
            // Calcular o espaço usado pelos animais já presentes no recinto
            let espaçoUsadoExistente = Object.entries(animaisExistentes).reduce((acc, [esp, qty]) => {
                if (this.animais[esp]) {
                    return acc + qty * this.animais[esp].tamanho;
                } else {
                    console.warn(`Espécie ${esp} não encontrada em this.animais`);
                    return acc;
                }
            }, 0);
    
            // Aplica espaço extra APENAS se houver mais de uma espécie no recinto
            const totalEspeciesExistentes = Object.keys(animaisExistentes).length;
            if (totalEspeciesExistentes > 1) {
                espaçoUsadoExistente += 1; // 1 unidade de espaço extra
            }
    
            // Calcula o espaço necessário para os novos animais
            const espaçoNecessario = quantidade * animalInfo.tamanho;
    
            // Calcula o espaço disponível no recinto
            const espaçoDisponível = recinto.tamanhoTotal - espaçoUsadoExistente;
    
            // Verifica se o bioma do recinto é adequado para o animal
            if (!recinto.bioma.split(' e ').some(bioma => animalInfo.biomas.includes(bioma))) {
                return false;
            }
    
            // Regras específicas para o hipopótamo (precisa de savana e rio)
            if (animal.toUpperCase() === 'HIPOPOTAMO' && (!recinto.bioma.includes('savana') || !recinto.bioma.includes('rio'))) {
                return false;
            }
    
            return espaçoDisponível >= espaçoNecessario;
        });
    
        // Ajuste no cálculo do espaço livre final
        recintosViaveis = recintosViaveis.sort((a, b) => a.numero - b.numero).map(recinto => {
            const animaisExistentes = recinto.animaisExistentes;
            let espaçoUsadoExistente = Object.entries(animaisExistentes).reduce((acc, [esp, qty]) => acc + qty * this.animais[esp].tamanho, 0);
            
            // Aplica o espaço extra apenas se houver mais de uma espécie no recinto
            const totalEspeciesExistentes = Object.keys(animaisExistentes).length;
            if (totalEspeciesExistentes > 1) {
                espaçoUsadoExistente += 1; // 1 unidade de espaço extra
            }

            const espaçoTotal = recinto.tamanhoTotal;

            // Corrige o espaço livre levando em conta o total ocupado e subtrai corretamente o espaço dos novos animais
            const espaçoLivre = espaçoTotal - espaçoUsadoExistente - (quantidade * animalInfo.tamanho);

            // Certifica que o espaço livre não seja negativo
            return `Recinto ${recinto.numero} (espaço livre: ${Math.max(espaçoLivre, 0)} total: ${espaçoTotal})`;
        });
    
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
    
        return { erro: false, recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
