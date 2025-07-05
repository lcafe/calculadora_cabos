# Guia de Consumo da API – Calculadora de Cabos

Este documento descreve os endpoints disponíveis, exemplos de requisição e resposta para cada cálculo da API.

Claro, Lucas!  
Segue o **markdown atualizado** da API, refletindo os novos parâmetros obrigatórios para ambos os endpoints:

## 1. Corrente Corrigida

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

## 2. Corrente de Projeto

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

## 3. Critério de Sobrecarga

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

## 4. Critério de Curto-Circuito

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

## 5. Queda de Tensão

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

## 6. Queda de Tensão Motórica

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

## Observações Gerais

- Todos os endpoints aceitam e retornam JSON.
- Em caso de erro de validação, a resposta será:
  ```json
  {
    "erro": "Mensagem de erro descritiva"
  }
  ```
- Para expandir a API, siga o padrão de rotas e documentação acima.