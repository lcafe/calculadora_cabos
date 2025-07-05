# Calculadora de Cabos

Essa calculadora é uma ferramenta CLI e API REST que faz parte de um projeto maior que estou trabalhando. Ela será liberada de forma livre sob a licença [GPL-3.0](https://github.com/lcafe/calculadora_cabos/tree/main?tab=GPL-3.0-1-ov-file#readme).

## Funcionalidades

- **Cálculo de corrente de projeto** (mono, bi, trifásico, carga motórica)
- **Cálculo de corrente corrigida** (fatores de correção)
- **Cálculo de queda de tensão** (circuitos gerais e motores)
- **Cálculo de corrente nominal mínima do disjuntor**
- **Critério de sobrecarga** (Ib ≤ Ins ≤ Iz e I2 ≤ Iz)
- **Critério de curto-circuito** (I²t ≤ K²S²)

---

## 📡 Como usar via API REST

A calculadora também pode ser utilizada via API HTTP.  
Veja abaixo os principais endpoints, exemplos de requisição e resposta:

### 1. Corrente Corrigida

- **Endpoint:** `POST /corrente-corrigida`
- **Body (JSON):**
  ```json
  {
    "Ib": 100,
    "k1": 0.9,
    "k2": 0.95,
    "k3": 0.8,
    "ncp": 2,
    "tipoCarga": "motorica", // ou "nao-motorica"
    "fatorDeServico": 1.15   // obrigatório apenas se tipoCarga for "motorica"
  }
  ```
  > **Observações:**
  > - `fatorDeServico` é obrigatório apenas para cargas motoras (`"motorica"`).
  > - Para cargas não-motoras, pode omitir ou enviar qualquer valor para `fatorDeServico`.

- **Resposta (JSON):**
  ```json
  {
    "corrente_corrigida": 79.710
  }
  ```

---

### 2. Corrente de Projeto

- **Endpoint:** `POST /corrente-projeto`
- **Body (JSON):**
  ```json
  {
    "fases": 3,
    "P": 10000,
    "V": 220,
    "FP": 0.92,
    "rendimento": 0.93,
    "tipoCarga": "motorica" // ou "nao-motorica"
  }
  ```
- **Resposta (JSON):**
  ```json
  {
    "corrente_projeto": 28.544
  }
  ```

---

### 3. Critério de Sobrecarga

- **Endpoint:** `POST /criterio-sobrecarga`
- **Body (JSON):**
  ```json
  {
    "Ib": 30,
    "Ins": 32,
    "Iz": 35,
    "I2": 34,
    "condCemHoras": true
  }
  ```
- **Resposta (JSON):**
  ```json
  {
    "resultado": "Aprovado"
  }
  ```

---

### 4. Critério de Curto-Circuito

- **Endpoint:** `POST /criterio-curto-circuito`
- **Body (JSON):**
  ```json
  {
    "I": 5000,
    "t": 0.2,
    "K": 115,
    "S": 25
  }
  ```
- **Resposta (JSON):**
  ```json
  {
    "energia_curto_circuito": 5000000,
    "capacidade_cabo": 8265625,
    "resultado": "Aprovado"
  }
  ```

---

### 5. Queda de Tensão

- **Endpoint:** `POST /queda-tensao`
- **Body (JSON):**
  ```json
  {
    "fases": 3,
    "Ib": 100,
    "L": 50,
    "R": 0.4,
    "X": 0.08,
    "FP": 0.92,
    "Ncp": 2,
    "V": 380,
    "deltaVcSetPoint": 4
  }
  ```
- **Resposta (JSON):**
  ```json
  {
    "queda_tensao_percentual": 2.7,
    "status": "Aprovado"
  }
  ```

---

### 6. Queda de Tensão Motórica

- **Endpoint:** `POST /queda-tensao-motorica`
- **Body (JSON):**
  ```json
  {
    "Ip": 300,
    "L": 40,
    "R": 0.35,
    "Ncp": 2,
    "Vff": 380
  }
  ```
- **Resposta (JSON):**
  ```json
  {
    "queda_tensao_motorica_percentual": 1.522,
    "status": "Aprovado"
  }
  ```

---

#### Observações Gerais

- Todos os endpoints aceitam e retornam JSON.
- Em caso de erro de validação, a resposta será:
  ```json
  {
    "erro": "Mensagem de erro descritiva"
  }
  ```
- Para expandir a API, siga o padrão de rotas e documentação acima.

---

## 📋 Quadro-Resumo das Fórmulas e Variáveis

| **Funcionalidade**                | **Fórmula**                                                                                      | **Descrição**                                      |
|------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------|
| **Corrente de Projeto**           | Ib = P / (Vfn × FP)                       | Corrente de projeto monofásica         |
| **Corrente de Projeto**           | Ib = P / (Vff × FP)                       | Corrente de projeto bifásica      |
| **Corrente de Projeto**           |  Ib = P / (√3 × Vff × FP)                      | Corrente de projeto trifásica         |
| **Corrente de Projeto**           |  Ib = P / (√3 × Vff × FP  × η)                      | Corrente de projeto motórica |
| **Corrente Corrigida**            | Ib' = Ib / (k1 × k2 × k3 × Ncp) | Corrente corrigida pelos fatores de correção       |
| **Corrente Corrigida (motor)**            | Ib' = (Ib × fatorDeServico) / (k1 × k2 × k3 × Ncp) | Corrente corrigida pelos fatores de correção       |
| **Queda de Tensão**               | ΔVc = [2 × Ib × L × (R × FP + X × √(1 - FP²))] / (1000 × Ncp × Vfn) × 100 | Queda de tensão em % (monofásico)               |
| **Queda de Tensão**               | ΔVc = [2 × Ib × L × (R × FP + X × √(1 - FP²))] / (1000 × Ncp × Vff) × 100 | Queda de tensão em % (bifásico)                |
| **Queda de Tensão**        | ΔVc = [√3 × Ib × L × (R × FP + X × √(1 - FP²))] / (1000 × Ncp × Vff) × 100 | Queda de tensão em % (trifásico)                |
| **Queda de Tensão Motor (Partida)**| ΔVm = [√3 × Ip × L × (R × 0.3)] / (Ncp × Vff × 1000) × 100                                      | Queda de tensão na partida de motores (%)          |
| **Corrente Nominal Disjuntor**    | I2 = Ins*1,30                                                           | Corrente mínima do disjuntor                       |
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
| η            | Rendimento do motor                                  |
| Ncp          | Número de cabos em paralelo por fase                 |
| k1           | Fator de correção de temperatura                     |
| k2           | Fator de correção de resistividade do solo           |
| k3           | Fator de correção de agrupamento de circuitos        |
| I2           | Corrente de projeto corrigida pelo fator de sobrecarga (A) |
| Ins          | Corrente nominal do disjuntor (A)                    |
| Iz           | Corrente máxima do cabo (A)                          |
| ΔVc          | Queda de tensão do circuito em %                     |
| ΔVm          | Queda de tensão do circuito de carga motórica em %   |
| I            | Corrente de curto-circuito no barramento (A)         |
| t            | Tempo de eliminação de defeito (s)                   |
| K            | Fator K do cabo escolhido                            |
| S            | Seção do cabo (mm²)                                  |

---

## Baixando as bibliotecas de cálculo

Clone o projeto

```bash
git clone https://github.com/lcafe/calculadora_cabos.git
```

Entre no diretório do projeto

```bash
cd calculadora_cabos
```

---

## Como usar a ferramenta CLI

Instale as dependências

```bash
npm install
```

Execute a ferramenta CLI

```bash
npm run cli
```

Ao executar a ferramenta, você verá esta tela. É possível navegar com as setas direcionais do teclado e selecionar com a tecla Enter.

**Menu Principal**
![image](https://github.com/user-attachments/assets/7fa61b56-c682-43a2-bf73-2355479e7485)

**Sair**
![image](https://github.com/user-attachments/assets/00bc32b4-27dd-4619-be00-3f381852e6be)

**Executando um tipo de cálculo**
![image](https://github.com/user-attachments/assets/abab1157-c718-4e0f-95ef-997716c9e62c)

---

## Como usar os cálculos no seu projeto

Importe a função desejada:

```javascript
const { correnteProjeto } = require('./{caminho}/lib/correnteDeProjeto');
```

Sendo **{caminho}** o diretório origem de onde seu programa está acessando.

Chame a função com os parâmetros necessários:

```javascript
const correnteDeProjetoCalculada = correnteProjeto(3, 10000, 380, 0.92, 0.93, "motorica");
console.log('Corrente de projeto:', correnteDeProjetoCalculada, 'A');
```

---

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