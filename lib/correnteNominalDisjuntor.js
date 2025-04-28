/**
 * Calcula a corrente nominal mínima do disjuntor (I2).
 *
 * Fórmula:
 *   I2 = Ib * k4
 *
 * @param {number} Ib - Corrente de projeto (A)
 * @param {number} k4 - Fator de sobrecarga adotado (adimensional, >= 1)
 * @returns {number} Corrente nominal mínima do disjuntor (A)
 */
function correnteNominalDisjuntor(Ib, k4) {
    if (typeof Ib !== "number" || Ib < 0) {
      throw new Error("Ib deve ser um número maior ou igual a zero.");
    }
    if (typeof k4 !== "number" || k4 < 1) {
      throw new Error("k4 deve ser um número maior ou igual a 1.");
    }
    return Ib * k4;
  }
  
  module.exports = { correnteNominalDisjuntor };
  