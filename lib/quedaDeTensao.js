/**
 * Calcula a queda de tensão percentual (ΔVc) conforme o critério do sistema.
 *
 * @param {number} fases - Número de fases (1, 2 ou 3)
 * @param {number} Ib - Corrente de projeto (A)
 * @param {number} L - Comprimento do circuito (m)
 * @param {number} R - Resistência do condutor (mΩ/m)
 * @param {number} X - Reatância do condutor (mΩ/m)
 * @param {number} FP - Fator de potência
 * @param {number} Ncp - Número de cabos em paralelo por fase
 * @param {number} V - Tensão (Vfn para 1 fase, Vff para 2 ou 3 fases)
 * @returns {number} Queda de tensão percentual (ΔVc)
 */
function quedaDeTensao(fases, Ib, L, R, X, FP, Ncp, V) {
    if ([Ib, L, R, X, FP, Ncp, V].some(v => typeof v !== "number" || v < 0)) {
      throw new Error("Todos os parâmetros devem ser números não negativos.");
    }
    if (Ncp === 0 || V === 0) {
      throw new Error("Ncp e V não podem ser zero.");
    }
    if (FP < 0 || FP > 1) {
      throw new Error("Fator de potência (FP) deve estar entre 0 e 1.");
    }
  
    const termo = R * FP + (X * Math.sqrt(1 - FP * FP));
    let numerador, denominador;
  
    switch (fases) {
      case 1: // Monofásico
      case 2: // Bifásico
        numerador = 2 * Ib * L * termo;
        denominador = 1000 * Ncp * V;
        break;
      case 3: // Trifásico
        numerador = Math.sqrt(3) * Ib * L * termo;
        denominador = 1000 * Ncp * V;
        break;
      default:
        throw new Error("Número de fases inválido. Use: 1, 2 ou 3.");
    }
  
    return (numerador / denominador) * 100;
  }
  
  module.exports = { quedaDeTensao };
  