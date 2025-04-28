const { criterioSobrecarga } = require("../lib/criterioSobrecarga");

function testCriterioSobrecarga() {
  // Exemplo aprovado
  const Ib = 32;
  const Ins = 40;
  const Iz = 50;
  const I2 = 36;
  console.log("Aprovado:", criterioSobrecarga(Ib, Ins, Iz, I2)); // Esperado: Aprovado

  // Exemplo reprovado (Ins > Iz)
  console.log("Reprovado (Ins > Iz):", criterioSobrecarga(Ib, 55, 50, I2)); // Esperado: Reprovado

  // Exemplo reprovado (I2 > Iz)
  console.log("Reprovado (I2 > Iz):", criterioSobrecarga(Ib, Ins, Iz, 60)); // Esperado: Reprovado

  // Exemplo reprovado (Ib > Ins)
  console.log("Reprovado (Ib > Ins):", criterioSobrecarga(45, 40, 50, 36)); // Esperado: Reprovado
}

testCriterioSobrecarga();
