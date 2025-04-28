/**
 * Testa o valor da queda de tensão percentual (ΔVc) conforme o critério.
 *
 * @param {number} deltaVc - Queda de tensão percentual calculada
 * @returns {string} "Erro", "Aprovado" ou "Reprovado"
 */
function testeQuedaDeTensao(deltaVc) {
    if (typeof deltaVc !== "number") {
      throw new Error("deltaVc deve ser um número.");
    }
    if (deltaVc < 0) {
      return "Erro";
    } else if (deltaVc <= 3) {
      return "Aprovado";
    } else {
      return "Reprovado";
    }
  }
  
  module.exports = { testeQuedaDeTensao };
