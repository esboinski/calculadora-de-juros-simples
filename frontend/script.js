function calcularJuros(event) {
    event.preventDefault();

    // Coletar valores do formulário
    let valor = parseFloat(document.getElementById('valor').value.replace(",", "."));
    let dataInicialStr = document.getElementById('dataInicial').value;
    let dataChequeStr = document.getElementById('dataCheque').value;
    let taxaJuros = parseFloat(document.getElementById('taxaJuros').value.replace(",", "."));

    // Verificar se os valores são válidos
    if (isNaN(valor) || isNaN(taxaJuros)) {
        alert('Por favor, insira valores válidos!');
        return;
    }

    // Converter as strings de data para o formato correto (YYYY/MM/DD)
    let dataInicial = new Date(dataInicialStr + 'T00:00:00');
    let dataCheque = new Date(dataChequeStr + 'T00:00:00');

    // Verificar se as datas foram inseridas corretamente
    if (isNaN(dataInicial.getTime()) || isNaN(dataCheque.getTime())) {
        alert('Por favor, insira as datas corretamente!');
        return;
    }

    // Ajustar as datas para garantir que são apenas datas (sem horas, minutos ou segundos)
    dataInicial.setHours(0, 0, 0, 0);
    dataCheque.setHours(0, 0, 0, 0);

    // Garantir que a data inicial seja antes da data do cheque
    let diffTime = dataCheque - dataInicial;
    if (diffTime <= 0) {
        alert('A data inicial não pode ser posterior ou igual à data do cheque!');
        return;
    }

    // Calcular o número de dias entre as duas datas
    let diasCorridos = Math.floor(diffTime / (1000 * 3600 * 24));

    // Calcular o juro por dia
    let juroPorDia = (valor / 30) * (taxaJuros / 100);

    // Calcular os juros finais
    let jurosFinais = juroPorDia * diasCorridos;

    // Calcular o valor total
    let total = valor + jurosFinais;

    // Exibir o resultado na tabela
    document.getElementById('valorInicial').textContent = valor.toFixed(2);
    document.getElementById('taxaJurosResultado').textContent = taxaJuros.toFixed(2);
    document.getElementById('dataInicialResultado').textContent = dataInicial.toLocaleDateString('pt-BR');
    document.getElementById('dataChequeResultado').textContent = dataCheque.toLocaleDateString('pt-BR');
    document.getElementById('diasCorridos').textContent = diasCorridos;
    document.getElementById('juroPorDia').textContent = juroPorDia.toFixed(2); // Novo campo para juro por dia
    document.getElementById('jurosFinais').textContent = jurosFinais.toFixed(2); // Novo campo para juros finais
    document.getElementById('valorTotal').textContent = total.toFixed(2);

    // Mostrar a seção de resultados com animação de expansão
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('hidden'); // Remove a classe hidden
    setTimeout(() => {
        resultadoDiv.classList.add('show'); // Adiciona a classe show para a animação
    }, 10);
}