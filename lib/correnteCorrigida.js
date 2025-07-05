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
 * @param {number} ncp - Número de cabos em paralelo por fase (1 ou 2)
 * @param {string} tipoCarga - Tipo de carga (motorica ou nao-motorica)
 * @param {number} fatorDeServico - Fator de serviço do motor
 * @returns {number} Corrente corrigida (A)
 *
 * Observação:
 *   Todos os fatores devem ser maiores que zero.
 */
function correnteCorrigida(Ib, k1, k2, k3, ncp, tipoCarga, fatorDeServico = 1) {
    if ([k1, k2, k3].some(f => typeof f !== "number" || f <= 0)) {
      throw new Error("Todos os fatores de correção (k1, k2, k3) devem ser maiores que zero.");
    }

    if (typeof Ib !== "number" || Ib < 0) {
      throw new Error("Ib deve ser um número maior ou igual a zero.");
    }

    if (typeof ncp !== "number" || ncp < 1) {
      throw new Error("ncp deve ser um número maior que zero.");
    }

    if (typeof tipoCarga !== "string" || !["motorica", "nao-motorica"].includes(tipoCarga)) {
      throw new Error("Tipo de carga inválido. Use: motorica ou nao-motorica.");
    }

    if (typeof fatorDeServico !== "number" || fatorDeServico < 1 || fatorDeServico > 2) {
      throw new Error("fatorDeServico deve ser um número entre 1 e 2.");
    }

    if (tipoCarga === "motorica") {
      return (Ib *  fatorDeServico) / (k1 * k2 * k3 * ncp);
    } else {
    return Ib / (k1 * k2 * k3 * ncp);
    }
  }
  
  module.exports = { correnteCorrigida };
  