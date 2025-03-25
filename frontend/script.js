function animateCount(element, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = range / (duration / 10);
    let stepTime = 10;
    
    function update() {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
        } else {
            setTimeout(update, stepTime);
        }
        element.textContent = `R$ ${current.toFixed(2)}`;
    }
    update();
}

function atualizarTotais() {
    let totalCheques = 0;
    let totalJuros = 0;

    // Seleciona todas as linhas da tabela (exceto o cabeçalho)
    const linhas = document.querySelectorAll("#tabelaCheques tr");

    // Começar a contagem das linhas corretamente
    linhas.forEach((linha) => {
        const colunas = linha.getElementsByTagName("td");

        // Verifica se a linha tem colunas suficientes para evitar erros
        if (colunas.length > 0) {
            const valorCheque = parseFloat(colunas[0].textContent.replace("R$ ", "").replace(",", "."));
            const valorTotal = parseFloat(colunas[6].textContent.replace("R$ ", "").replace(",", "."));

            // Somar os valores normalmente
            totalCheques += isNaN(valorCheque) ? 0 : valorCheque;
            totalJuros += isNaN(valorTotal) ? 0 : valorTotal;
        }
    });

    let totalChequesEl = document.getElementById("totalCheques");
    let totalJurosEl = document.getElementById("totalJuros");

    // Adiciona a classe de atualização para efeito visual
    totalChequesEl.classList.add("updated");
    totalJurosEl.classList.add("updated");

    // Anima a contagem dos valores
    animateCount(totalChequesEl, parseFloat(totalChequesEl.textContent.replace("R$ ", "")) || 0, totalCheques, 500);
    animateCount(totalJurosEl, parseFloat(totalJurosEl.textContent.replace("R$ ", "")) || 0, totalJuros, 500);

    // Remove a classe após a animação (tempo suficiente para o efeito visual)
    setTimeout(() => {
        totalChequesEl.classList.remove("updated");
        totalJurosEl.classList.remove("updated");
    }, 600); // O tempo é o mesmo da animação CSS
}

// Função para adicionar um cheque à tabela
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

    // Atualizar totais sempre que um novo cheque for adicionado
    atualizarTotais();
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

        // Resetar os totais
        document.getElementById("totalCheques").textContent = "R$ 0.00";
        document.getElementById("totalJuros").textContent = "R$ 0.00";
    }, 500); // Tempo de animação de fade-out (em milissegundos)
}
