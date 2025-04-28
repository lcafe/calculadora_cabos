const { quedaDeTensaoMotor } = require("../lib/quedaDeTensaoMotor");
const { testeQuedaDeTensaoMotor } = require("../lib/testeQuedaDeTensaoMotor");

function testQuedaDeTensaoMotor() {
  const Ip = 120;     // Corrente de partida do motor (A)
  const L = 40;       // Comprimento do circuito (m)
  const R = 1.15;     // Resistência do condutor (mΩ/m) - cobre 16 mm²
  const Ncp = 1;      // Número de cabos em paralelo por fase
  const Vff = 380;    // Tensão fase-fase (V)

  const deltaVm = quedaDeTensaoMotor(Ip, L, R, Ncp, Vff);
  console.log("ΔVm (motor):", deltaVm.toFixed(3), "% -", testeQuedaDeTensaoMotor(deltaVm));

  // Teste de erro (queda negativa)
  const deltaVmErro = -1.5;
  console.log("ΔVm (erro):", deltaVmErro, "% -", testeQuedaDeTensaoMotor(deltaVmErro));

  // Teste de reprovado (queda acima de 4%)
  const deltaVmReprovado = 4.5;
  console.log("ΔVm (reprovado):", deltaVmReprovado, "% -", testeQuedaDeTensaoMotor(deltaVmReprovado));
}

testQuedaDeTensaoMotor();