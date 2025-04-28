const { correnteNominalDisjuntor } = require("../lib/correnteNominalDisjuntor");

function testCorrenteNominalDisjuntor() {
  // Exemplo: Ib = 32A, k4 = 1.25 (25% de sobrecarga)
  const Ib = 32;
  const k4 = 1.25;
  const I2 = correnteNominalDisjuntor(Ib, k4);
  console.log("I2 (corrente nominal mínima do disjuntor):", I2, "A");

  // Teste de erro: k4 inválido (< 1)
  try {
    correnteNominalDisjuntor(Ib, 0.9);
    console.log("Erro: não lançou exceção para k4 < 1!");
  } catch (e) {
    console.log("Exceção esperada para k4 < 1:", e.message);
  }

  // Teste de erro: Ib negativo
  try {
    correnteNominalDisjuntor(-10, k4);
    console.log("Erro: não lançou exceção para Ib negativo!");
  } catch (e) {
    console.log("Exceção esperada para Ib negativo:", e.message);
  }
}

testCorrenteNominalDisjuntor();
