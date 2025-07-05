/**
 * Testa o valor da queda de tensão percentual (ΔVm) para cargas motóricas.
 *
 * @param {number} deltaVm - Queda de tensão percentual calculada
 * @returns {string} "Erro", "Aprovado" ou "Reprovado"
 */
function testeQuedaDeTensaoMotor(deltaVm) {
    if (typeof deltaVm !== "number") {
      throw new Error("deltaVm deve ser um número.");
    }
    if (deltaVm < 0) {
      return "Erro";
    } else if (deltaVm <= 10) {
      return "Aprovado";
    } else {
      return "Reprovado";
    }
  }
  
  module.exports = { testeQuedaDeTensaoMotor };
  