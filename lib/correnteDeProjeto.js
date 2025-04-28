/**
 * Calcula a corrente de projeto conforme o número de fases.
 *
 * @param {number} fases - Número de fases (1, 2 ou 3)
 * @param {number} P - Potência ativa total do circuito (W)
 * @param {number} V - Tensão (Vfn para 1 fase, Vff para 2 ou 3 fases)
 * @param {number} FP - Fator de potência
 * @returns {number} Corrente de projeto (A)
 */
function correnteProjeto(fases, P, V, FP) {
    function correnteMonofasico(P, Vfn, FP) {
      if (Vfn * FP === 0) throw new Error("Vfn e FP não podem ser zero.");
      return P / (Vfn * FP);
    }

    function correnteBifasico(P, Vff, FP) {
      if (Vff * FP === 0) throw new Error("Vff e FP não podem ser zero.");
      return P / (Vff * FP);
    }

    function correnteTrifasico(P, Vff, FP) {
      if (Vff * FP === 0) throw new Error("Vff e FP não podem ser zero.");
      return P / (Math.sqrt(3) * Vff * FP);
    }
  
    switch (fases) {
      case 1:
        return correnteMonofasico(P, V, FP);
      case 2:
        return correnteBifasico(P, V, FP);
      case 3:
        return correnteTrifasico(P, V, FP);
      default:
        throw new Error(
          "Número de fases inválido. Use: 1 (monofásico), 2 (bifásico) ou 3 (trifásico)."
        );
    }
  }
  
  module.exports = { correnteProjeto };
  