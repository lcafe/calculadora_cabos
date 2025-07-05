/**
 * Calcula a corrente de projeto conforme o número de fases.
 *
 * @param {number} fases - Número de fases (1, 2 ou 3)
 * @param {number} P - Potência ativa total do circuito (W)
 * @param {number} V - Tensão (Vfn para 1 fase, Vff para 2 ou 3 fases)
 * @param {number} FP - Fator de potência
 * @param {number} rendimento - Rendimento do circuito (n)
 * @param {string} tipoCarga - Tipo de carga (motorica ou nao-motorica)
 * @returns {number} Corrente de projeto (A)
 */
function correnteProjeto(fases, P, V, FP, rendimento, tipoCarga) {
    if ([P, V, FP, rendimento].some(v => typeof v !== "number" || v < 0)) {
      throw new Error("Todos os parâmetros devem ser números não negativos.");
    }
    if (typeof fases !== "number" || fases < 1 || fases > 3) {
      throw new Error("Número de fases inválido. Use: 1 (monofásico), 2 (bifásico) ou 3 (trifásico).");
    }
    if (typeof tipoCarga !== "string" || !["motorica", "nao-motorica"].includes(tipoCarga)) {
      throw new Error("Tipo de carga inválido. Use: motorica ou nao-motorica.");
    }

    if (typeof ncp !== "number" || ncp < 1) {
      throw new Error("ncp deve ser um número maior que zero.");
    }

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

    function correnteMotorica(P, Vff, FP, rendimento) {
      if (Vff * FP === 0) throw new Error("Vff e FP não podem ser zero.");
      if (rendimento === 0) throw new Error("Rendimento não pode ser zero.");
      return P / (Math.sqrt(3) * Vff * FP * rendimento);
    }

  
    switch (fases) {
      case 1:
        return correnteMonofasico(P, V, FP);
      case 2:
        return correnteBifasico(P, V, FP);
      case 3:
        if(tipoCarga === "motorica") { 
          return correnteMotorica(P, V, FP, rendimento);	
        } else {
        return correnteTrifasico(P, V, FP);
      }
      default:
        throw new Error(
          "Número de fases inválido. Use: 1 (monofásico), 2 (bifásico) ou 3 (trifásico)."
        );
    }
  }
  
  module.exports = { correnteProjeto };
  