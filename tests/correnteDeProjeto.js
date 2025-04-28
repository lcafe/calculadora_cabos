const { correnteProjeto } = require("../lib/correnteDeProjeto");

function testCorrenteProjeto() {
  try {
    // Monofásico: P, Vfn, FP
    const mono = correnteProjeto(1, 1000, 220, 0.92);
    console.log("Monofásico:", mono);

    // Bifásico: P, Vff, FP
    const bi = correnteProjeto(2, 1000, 220, 0.92);
    console.log("Bifásico:", bi);

    // Trifásico: P, Vff, FP
    const tri = correnteProjeto(3, 1000, 380, 0.92);
    console.log("Trifásico:", tri);

    // Teste de erro: número de fases inválido
    try {
      correnteProjeto(4, 1000, 220, 0.92);
      console.log("Erro: não lançou exceção para número de fases inválido!");
    } catch (e) {
      console.log("Exceção esperada para número de fases inválido:", e.message);
    }

    // Teste de erro: divisor zero
    try {
      correnteProjeto(1, 1000, 0, 0.92);
      console.log("Erro: não lançou exceção para divisor zero!");
    } catch (e) {
      console.log("Exceção esperada para divisor zero:", e.message);
    }
  } catch (e) {
    console.error("Erro inesperado:", e.message);
  }
}

testCorrenteProjeto();

