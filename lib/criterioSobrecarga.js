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
 * @param {number} condCemHoras - Se 1, é utilizado I2 <= Iz. Se 0, é utilizado I2 <= Iz * 1,45
 * @returns {string} "Aprovado" ou "Reprovado"
 */
function criterioSobrecarga(Ib, Ins, Iz, condCemHoras) {
    if ([Ib, Ins, Iz].some(v => typeof v !== "number" || v < 0)) {
      throw new Error("Todos os parâmetros devem ser números maiores ou iguais a zero.");
    }

    console.log('criterioSobrecarga condCemHoras:', condCemHoras, 'typeof:', typeof condCemHoras);

    if (isNaN(condCemHoras) || (condCemHoras !== 0 && condCemHoras !== 1)) {
      throw new Error("condCemHoras deve ser 0 ou 1.");
    }

    // Segundo a NBR 5410 Comentada, o I2 de disjuntores é In*1,30
    const I2 = 1.30 * Ins;

    if (condCemHoras) {
      const condA = Ib <= Ins && Ins <= Iz;
      const condB = I2 <= Iz;
      return (condA && condB) ? "Aprovado" : "Reprovado";
    }

    const condA = Ib <= Ins && Ins <= Iz;
    const condB = I2 <= Iz * 1.45;

    return (condA && condB) ? "Aprovado" : "Reprovado";
  }
  
  module.exports = { criterioSobrecarga };
  
