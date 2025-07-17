/**
 * Calcula a corrente de projeto conforme o número de fases.
 *
 * @param {number} fases - Número de fases (1, 2 ou 3)
 * @param {number} P - Potência ativa total do circuito (W)
 * @param {number} V - Tensão (Vfn para 1 fase, Vff para 2 ou 3 fases)
 * @param {number} FP - Fator de potência
 * @param {number} rendimento - Rendimento do circuito (0 < x <= 1)
 * @param {boolean} instalacaoIndustrial - Indica se a instalação é industrial (true) ou não (false)
 * @param {string} tipoCarga - Tipo de carga (motorica ou nao-motorica)
 * @param {number} fatorDeDemanda - Fator de demanda (0 < x <= 1)
 * @param {number} numeroCabosPorFase - número de cabos por fase.
 * @param {string} tipoCorrente - "corrente-continua" ou "corrente-alternada"
 * @returns {number} Corrente de projeto (A)
 */
function correnteProjeto(fases, P, V, FP, rendimento, tipoCarga, instalacaoIndustrial, fatorDeDemanda, numeroCabosPorFase, tipoCorrente) {
  if ([P, V, FP, rendimento, fatorDeDemanda, numeroCabosPorFase].some(v => typeof v !== "number" || v < 0)) {
    throw new Error("Todos os parâmetros devem ser números não negativos.");
  }

  if (typeof fases !== "number" || fases < 1 || fases > 3) {
    throw new Error("Número de fases inválido. Use: 1 (monofásico), 2 (bifásico) ou 3 (trifásico).");
  }

  if (typeof tipoCarga !== "string" || !["motorica", "nao-motorica"].includes(tipoCarga)) {
    throw new Error("Tipo de carga inválido. Use: motorica ou nao-motorica.");
  }

  if (typeof tipoCorrente !== "string" || !["corrente-continua", "corrente-alternada"].includes(tipoCorrente)) {
    throw new Error("Tipo de corrente inválido. Use: corrente-continua ou corrente-alternada");
  }

  if (typeof fatorDeDemanda !== "number" || fatorDeDemanda <= 0 || fatorDeDemanda > 1) {
    throw new Error("Fator de demanda inválido. Use: 0 < x <= 1.");
  }

  if (typeof rendimento !== "number" || rendimento <= 0.10 || rendimento > 1) {
    throw new Error("Rendimento inválido. Use: 0.10 < x <= 1.");
  }

  if (typeof instalacaoIndustrial !== "boolean") {
    throw new Error("Instalação industrial inválida. Use: true ou false.");
  }

  if (tipoCorrente === "corrente-alternada") {

    if (instalacaoIndustrial) {
      fatorDeDemanda = 1;
    }

    function correnteMonofasico(P, Vfn, FP, fatorDeDemanda, numeroCabosPorFase) {
      if (Vfn * FP === 0) throw new Error("Vfn e FP não podem ser zero.");
      return ((P * fatorDeDemanda) / (Vfn * FP)) / numeroCabosPorFase;
    }

    function correnteBifasico(P, Vff, FP, fatorDeDemanda, numeroCabosPorFase) {
      if (Vff * FP === 0) throw new Error("Vff e FP não podem ser zero.");
      return ((P * fatorDeDemanda) / (Vff * FP)) / numeroCabosPorFase;
    }

    function correnteTrifasico(P, Vff, FP, fatorDeDemanda, numeroCabosPorFase) {
      if (Vff * FP === 0) throw new Error("Vff e FP não podem ser zero.");
      return ((P * fatorDeDemanda) / (Math.sqrt(3) * Vff * FP)) / numeroCabosPorFase;
    }

    function correnteMotorica(P, Vff, FP, rendimento, fatorDeDemanda, numeroCabosPorFase) {
      if (Vff * FP === 0) throw new Error("Vff e FP não podem ser zero.");
      if (rendimento === 0) throw new Error("Rendimento não pode ser zero.");
      return ((P * fatorDeDemanda) / (Math.sqrt(3) * Vff * FP * rendimento)) / numeroCabosPorFase;
    }


    switch (fases) {
      case 1:
        return correnteMonofasico(P, V, FP, fatorDeDemanda, numeroCabosPorFase);
      case 2:
        return correnteBifasico(P, V, FP, fatorDeDemanda, numeroCabosPorFase);
      case 3:
        if (tipoCarga === "motorica") {
          return correnteMotorica(P, V, FP, rendimento, fatorDeDemanda, numeroCabosPorFase);
        } else {
          return correnteTrifasico(P, V, FP, fatorDeDemanda, numeroCabosPorFase);
        }
      default:
        throw new Error(
          "Número de fases inválido. Use: 1 (monofásico), 2 (bifásico) ou 3 (trifásico)."
        );
    }
  } else {
    return ((P / V) / numeroCabosPorFase)
  }
}

module.exports = { correnteProjeto };

