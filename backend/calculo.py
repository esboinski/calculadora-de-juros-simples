from datetime import datetime
from tabulate import tabulate

def calcular_juros(data_inicial, data_cheque, valor, taxa_juros):
    data_inicial = datetime.strptime(data_inicial, "%d/%m/%Y")
    data_cheque = datetime.strptime(data_cheque, "%d/%m/%Y")
    
    dias = (data_cheque - data_inicial).days
    juros_dia = (valor * (taxa_juros / 100)) / 30  # Juros diário
    juros_finais = juros_dia * dias
    
    return dias, juros_dia, juros_finais

def gerar_tabela(dados, taxa_juros):
    tabela = []
    total_cheques = 0
    total_juros = 0
    
    for item in dados:
        data_inicial, data_cheque, valor = item
        dias, juros_dia, juros_finais = calcular_juros(data_inicial, data_cheque, valor, taxa_juros)
        tabela.append([data_inicial, data_cheque, f"R$ {valor:,.2f}", dias, f"R$ {juros_dia:.2f}", f"R$ {juros_finais:.2f}"])
        total_cheques += valor
        total_juros += juros_finais
    
    tabela.append(["TOTAL", "", f"R$ {total_cheques:,.2f}", "", "", f"R$ {total_juros:.2f}"])
    return tabela

dados = []
n = int(input("Quantos cheques deseja adicionar?\n"))
taxa_juros = float(input("Digite a taxa de juros (em %): "))

for _ in range(n):
    data_inicial = input("Digite a data inicial (DD/MM/AAAA): ")
    data_cheque = input("Digite a data do cheque (DD/MM/AAAA): ")
    valor = float(input("Digite o valor do cheque: "))
    dados.append((data_inicial, data_cheque, valor))

tabela = gerar_tabela(dados, taxa_juros)
print(tabulate(tabela, headers=["DATA INICIAL", "DATA DO CHEQUE", "VALOR CHEQUE", "DIAS", f"JURO/DIA {taxa_juros}%", "JUROS FINAIS"], tablefmt="grid"))

input("\nPressione Enter para sair...")
