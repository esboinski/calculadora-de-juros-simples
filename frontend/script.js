function adicionarCheque(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Coletar os valores dos campos
    let valor = parseFloat(document.getElementById('valor').value.replace(",", "."));
    let dataInicialStr = document.getElementById('dataInicial').value;
    let dataChequeStr = document.getElementById('dataCheque').value;
    let taxaJuros = parseFloat(document.getElementById('taxaJuros').value.replace(",", "."));

    // Verificar se os valores são válidos
    if (isNaN(valor) || isNaN(taxaJuros)) {
        alert('Por favor, insira valores válidos!');
        return;
    }

    // Converter as datas para o formato correto (YYYY-MM-DD)
    let dataInicial = new Date(dataInicialStr);
    let dataCheque = new Date(dataChequeStr);

   // Zera as horas das datas para garantir um cálculo preciso
   dataInicial.setHours(0, 0, 0, 0);
   dataCheque.setHours(0, 0, 0, 0);


    // Calcular o número de dias entre as datas
    let diferencaDias = Math.ceil((dataCheque - dataInicial) / (1000 * 3600 * 24));

    // Calcular os juros
    let juros = valor * (taxaJuros / 100) * (diferencaDias / 30);

    // Calcular o total (valor + juros)
    let total = valor + juros;

    // Preencher a tabela com os dados
    const tabelaCheques = document.getElementById('tabelaCheques');
    const novaLinha = document.createElement('tr');
    
    // Adiciona a classe de animação ao novo cheque
    novaLinha.classList.add('cheque');
    
    novaLinha.innerHTML = `
        <td>R$ ${valor.toFixed(2)}</td>
        <td>${dataInicial.toLocaleDateString()}</td>
        <td>${dataCheque.toLocaleDateString()}</td>
        <td>${taxaJuros.toFixed(2)}%</td>
        <td>${diferencaDias} dias</td>
        <td>R$ ${juros.toFixed(2)}</td>
        <td>R$ ${total.toFixed(2)}</td>
    `;

    tabelaCheques.appendChild(novaLinha);

    // Reaplica a animação (força o reflow para reiniciar a animação)
    setTimeout(() => {
        novaLinha.classList.remove('cheque');
        void novaLinha.offsetWidth;  // Força o reflow
        novaLinha.classList.add('cheque');
    }, 10);

    // Exibir a tabela de resultados
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('hidden'); // Mostra a seção de resultados
    setTimeout(() => {
        resultadoDiv.classList.add('show'); // Anima a exibição dos resultados
    }, 10);
}

// Função para resetar tudo
function resetarTudo() {
    // Adiciona uma animação de fade-out à tabela
    const tabelaCheques = document.getElementById('tabelaCheques');
    
    // Adiciona a classe de animação para fazer o fade-out
    tabelaCheques.classList.add('fade-out');
    
    // Espera o tempo da animação para limpar a tabela
    setTimeout(() => {
        // Limpar o formulário
        document.getElementById('formulario').reset();

        // Limpar a tabela de resultados
        tabelaCheques.innerHTML = '';

        // Remover a classe de animação após limpar
        tabelaCheques.classList.remove('fade-out');

        // Esconder a tabela de resultados
        const resultado = document.getElementById('resultado');
        resultado.classList.add('hidden');
    }, 500); // Tempo de animação de fade-out (em milissegundos)
}