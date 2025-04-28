const { correnteCorrigida } = require("../lib/correnteCorrigida");

function testCorrenteCorrigida() {
  try {
    // Exemplo: Ib = 10A, k1 = 1, k2 = 1, k3 = 0.8
    const resultado = correnteCorrigida(10, 1, 1, 0.8);
    console.log("Corrente Corrigida:", resultado); // Esperado: 12.5

    // Teste de erro: fator zero
    try {
      correnteCorrigida(10, 0, 1, 1);
      console.log("Erro: não lançou exceção para fator zero!");
    } catch (e) {
      console.log("Exceção esperada para fator zero:", e.message);
    }

    // Teste de erro: Ib negativo
    try {
      correnteCorrigida(-5, 1, 1, 1);
      console.log("Erro: não lançou exceção para Ib negativo!");
    } catch (e) {
      console.log("Exceção esperada para Ib negativo:", e.message);
    }
  } catch (e) {
    console.error("Erro inesperado:", e.message);
  }
}

testCorrenteCorrigida();