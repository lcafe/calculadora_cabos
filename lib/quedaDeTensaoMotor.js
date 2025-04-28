/**
 * Calcula a queda de tensão percentual (ΔVm) para cargas motóricas trifásicas.
 *
 * Fórmula:
 *   ΔVm = {[√3 * Ip * L * (R * 0.3)] / (Ncp * Vff * 1000)} * 100
 *
 * Onde:
 *   - Ip: Corrente de partida do motor (A)
 *   - L: Comprimento do circuito (m)
 *   - R: Resistência do condutor (mΩ/m)
 *   - Ncp: Número de cabos em paralelo por fase
 *   - Vff: Tensão fase-fase (V)
 *   - 1000: Conversão de mΩ para Ω
 *   - 100: Resultado em porcentagem
 *
 * @param {number} Ip - Corrente de partida do motor (A)
 * @param {number} L - Comprimento do circuito (m)
 * @param {number} R - Resistência do condutor (mΩ/m)
 * @param {number} Ncp - Número de cabos em paralelo por fase
 * @param {number} Vff - Tensão fase-fase (V)
 * @returns {number} Queda de tensão percentual (ΔVm)
 */
function quedaDeTensaoMotor(Ip, L, R, Ncp, Vff) {
    if ([Ip, L, R, Ncp, Vff].some(v => typeof v !== "number" || v < 0)) {
      throw new Error("Todos os parâmetros devem ser números não negativos.");
    }
    if (Ncp === 0 || Vff === 0) {
      throw new Error("Ncp e Vff não podem ser zero.");
    }
  
    const numerador = Math.sqrt(3) * Ip * L * (R * 0.3);
    const denominador = Ncp * Vff * 1000; // 1000 para converter mΩ para Ω
    const resultado = (numerador / denominador) * 100; // *100 para porcentagem
  
    return resultado;
  }
  
  module.exports = { quedaDeTensaoMotor };
  