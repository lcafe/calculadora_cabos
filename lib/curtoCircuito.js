/**
 * Calcula I² * t (energia de curto-circuito).
 */
function energiaCurtoCircuito(I, t) {
    if ([I, t].some(v => typeof v !== "number" || v < 0)) {
      throw new Error("I e t devem ser números maiores ou iguais a zero.");
    }
    return Math.pow(I, 2) * t;
  }
  
  /**
   * Calcula K² * S² (capacidade do cabo).
   */
  function capacidadeCabo(K, S) {
    if ([K, S].some(v => typeof v !== "number" || v < 0)) {
      throw new Error("K e S devem ser números maiores ou iguais a zero.");
    }
    return Math.pow(K, 2) * Math.pow(S, 2);
  }
  
  /**
   * Critério de curto-circuito: compara energia e capacidade.
   */
  function criterioCurtoCircuito(I, t, K, S) {
    const valorCurto = energiaCurtoCircuito(I, t);
    const valorCabo = capacidadeCabo(K, S);
    return valorCurto <= valorCabo ? "Aprovado" : "Reprovado";
  }
  
  module.exports = {
    energiaCurtoCircuito,
    capacidadeCabo,
    criterioCurtoCircuito,
  };
  