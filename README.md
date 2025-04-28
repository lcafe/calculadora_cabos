
# Calculadora de Cabos

Essa calculadora é uma ferramenta CLI que faz parte de um projeto maior que estou trabalhando, ela será liberada de forma livre sobre a licença [GPL-3.0](https://github.com/lcafe/calculadora_cabos/tree/main?tab=GPL-3.0-1-ov-file#readme).






## Funcionalidades

- **Cálculo de corrente de projeto** (mono, bi e trifásico)
- **Cálculo de corrente corrigida** (fatores de correção)
- **Cálculo de queda de tensão** (circuitos gerais e motores)
- **Cálculo de corrente nominal mínima do disjuntor**
- **Critério de sobrecarga** (Ib ≤ Ins ≤ Iz e I2 ≤ Iz)
- **Critério de curto-circuito** (I²t ≤ K²S²)


## 📋 Quadro-Resumo das Fórmulas e Variáveis

| **Funcionalidade**                | **Fórmula**                                                                                      | **Descrição**                                      |
|------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------|
| **Corrente de Projeto**           | Ib = P / (Vfn × FP)                       | Corrente de projeto monofásica         |
| **Corrente de Projeto**           | Ib = P / (Vff × FP)                       | Corrente de projeto bifásica      |
| **Corrente de Projeto**           |  Ib = P / (√3 × Vff × FP)                      | Corrente de projeto trifásica         |
| **Corrente Corrigida**            | Ib' = Ib / (k1 × k2 × k3)                                                                        | Corrente corrigida pelos fatores de correção       |
| **Queda de Tensão**               | ΔVc = [2 × Ib × L × (R × FP + X × √(1 - FP²))] / (1000 × Ncp × Vfn) × 100 | Queda de tensão em % (monofásico)               |
| **Queda de Tensão**               | ΔVc = [2 × Ib × L × (R × FP + X × √(1 - FP²))] / (1000 × Ncp × Vff) × 100 | Queda de tensão em % (bifásico)                |
| **Queda de Tensão**        | ΔVc = [√3 × Ib × L × (R × FP + X × √(1 - FP²))] / (1000 × Ncp × Vff) × 100 | Queda de tensão em % (trifásico)                |
| **Queda de Tensão Motor (Partida)**| ΔVm = [√3 × Ip × L × (R × 0.3)] / (Ncp × Vff × 1000) × 100                                      | Queda de tensão na partida de motores (%)          |
| **Corrente Nominal Disjuntor**    | I2 = Ib × k4                                                           | Corrente mínima do disjuntor                       |
| **Sobrecarga - Critério A**                    | Ib ≤ Ins ≤ Iz                              | Critérios de sobrecarga                           
| **Sobrecarga - Critério B**                    |  I2 ≤ Iz                                                                       | Critérios de sobrecarga                            |
| **Curto-circuito**                | I² × t ≤ K² × S²                                                                                 | Critério de curto-circuito                         |

---

### **Descrição das Variáveis**

| **Variável** | **Significado**                                      |
|--------------|------------------------------------------------------|
| Ib           | Corrente de projeto (A)                              |
| Ib'          | Corrente de projeto corrigida (A)                    |
| Ip           | Corrente de partida do motor (A)                     |
| P            | Potência ativa total do circuito (W)                 |
| Vfn          | Tensão fase-neutro (V)                               |
| Vff          | Tensão fase-fase (V)                                 |
| FP           | Fator de potência (0 < FP ≤ 1)                       |
| L            | Comprimento do circuito (m)                          |
| R            | Resistência do condutor (mΩ/m)                       |
| X            | Reatância do condutor (mΩ/m)                         |
| Ncp          | Número de cabos em paralelo por fase                 |
| k1           | Fator de correção de temperatura                     |
| k2           | Fator de correção de resistividade do solo           |
| k3           | Fator de correção de agrupamento de circuitos        |
| k4           | Fator de sobrecarga adotado (≥ 1)                    |
| I2           | Corrente de projeto corrigida pelo fator de sobrecarga (A) |
| Ins          | Corrente nominal do disjuntor (A)                    |
| Iz           | Corrente máxima do cabo (A)                          |
| ΔVc          | Queda de tensão do circuito em %                     |
| ΔVm          | Queda de tensão do circuito de carga motórica em %   |
| I            | Corrente de curto-circuito no barramento (A)         |
| t            | Tempo de eliminação de defeito (s)                   |
| K            | Fator K do cabo escolhido                            |
| S            | Seção do cabo (mm²)                                  |

## Baixando as bibliotecas de cálculo

Clone o projeto

```bash
  git clone https://github.com/lcafe/calculadora_cabos.git
```

Entre no diretório do projeto

```bash
  cd calculadora_cabos
```

Instale as dependências (AINDA NÃO É NECESSÁRIO)

```bash
  npm install
```

## Como usar a ferramenta CLI

**EM CONSTRUÇÃO**

##  Como usar os cálculos no seu projeto

Importe a função desejada:

```javascript
const { correnteProjeto } = require('./{caminho}/lib/correnteDeProjeto');
```

Sendo **{caminho}** o diretório origem de onde seu programa está acessando. 

Chame a função com os parâmetros necessários:

```javascript
const correnteDeProjetoCalculada = correnteProjeto(3, 10000, 380, 0.92); // trifásico
console.log('Corrente de projeto:', correnteDeProjetoCalculada, 'A');
```

## Autor

- Lucas Ferreira - [@lcafe](https://github.com/lcafe)

## 📖 Referências

- [NBR 5410:2004 - Instalações elétricas de baixa tensão](https://www.abntcatalogo.com.br/pnm.aspx?Q=bWl2M29BSEtyWlZnaVBRRUc5c3lMUG55YTloZUxBSWp6N2VWbUY1SUYxQT0=)
- [Guia de Dimensionamento de Cabos - Prysmian](https://br.prysmian.com/sites/default/files/atoms/files/Guia_de_Dimensionamento-Baixa_Tensao_Rev9.pdf)

## 👨‍💻 Contribuição

- Sinta-se à vontade para abrir issues ou pull requests!
- Siga o padrão de documentação JSDoc nos arquivos de cálculo.

## ⚠️ Aviso

> **Estas funções não substituem a análise de um engenheiro eletricista habilitado. Sempre consulte a norma vigente e um profissional responsável.**
