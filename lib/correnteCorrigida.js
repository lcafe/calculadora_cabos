/**
 * Calcula a corrente corrigida (Ib') conforme os fatores de correção.
 *
 * Fórmula:
 *   Ib' = Ib / (k1 * k2 * k3)
 *
 * @param {number} Ib - Corrente de projeto (A)
 * @param {number} k1 - Fator de correção de temperatura (>= 0)
 * @param {number} k2 - Fator de correção da resistividade do solo (>= 0)
 * @param {number} k3 - Fator de correção de agrupamento de circuitos (>= 0)
 * @returns {number} Corrente corrigida (A)
 *
 * Observação:
 *   Todos os fatores devem ser maiores que zero.
 */
function correnteCorrigida(Ib, k1, k2, k3) {
    if ([k1, k2, k3].some(f => typeof f !== "number" || f <= 0)) {
      throw new Error("Todos os fatores de correção (k1, k2, k3) devem ser maiores que zero.");
    }
    if (typeof Ib !== "number" || Ib < 0) {
      throw new Error("Ib deve ser um número maior ou igual a zero.");
    }
    return Ib / (k1 * k2 * k3);
  }
  
  module.exports = { correnteCorrigida };
  