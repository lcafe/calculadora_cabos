/**
 * Avalia o critério de sobrecarga conforme as condições:
 *  - Condição A: Ib <= Ins <= Iz
 *  - Condição B: I2 <= Iz
 * 
 * Retorna "Aprovado" se ambas forem verdadeiras, senão "Reprovado".
 *
 * @param {number} Ib  - Corrente de projeto (A)
 * @param {number} Ins - Corrente nominal do disjuntor (A)
 * @param {number} Iz  - Corrente máxima do cabo (A)
 * @param {number} I2  - Corrente de projeto corrigida pelo fator de sobrecarga (A)
 * @returns {string} "Aprovado" ou "Reprovado"
 */
function criterioSobrecarga(Ib, Ins, Iz, I2) {
    if ([Ib, Ins, Iz, I2].some(v => typeof v !== "number" || v < 0)) {
      throw new Error("Todos os parâmetros devem ser números maiores ou iguais a zero.");
    }
  
    const condA = Ib <= Ins && Ins <= Iz;
    const condB = I2 <= Iz;
  
    return (condA && condB) ? "Aprovado" : "Reprovado";
  }
  
  module.exports = { criterioSobrecarga };
  