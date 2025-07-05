/**
 * Testa o valor da queda de tensão percentual (ΔVc) conforme o critério.
 *
 * @param {number} deltaVc - Queda de tensão percentual calculada
 * @param {number} deltaVcSetPoint - Valor do deltaVc de referência
 * @returns {string} "Erro", "Aprovado" ou "Reprovado"
 */
function testeQuedaDeTensao(deltaVc, deltaVcSetPoint) {
    if (typeof deltaVc !== "number") {
      throw new Error("deltaVc deve ser um número.");
    }
    if (deltaVc < 0) {
      return "Erro";
    } else if (deltaVc <= deltaVcSetPoint) {
      return "Aprovado";
    } else {
      return "Reprovado";
    }
  }
  
  module.exports = { testeQuedaDeTensao };
