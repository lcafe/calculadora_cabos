const { quedaDeTensao } = require("../lib/quedaDeTensao");
const { testeQuedaDeTensao } = require("../lib/testeQuedaDeTensao");

function testQuedaDeTensao() {
  const Ib = 32;      // Corrente de projeto (A)
  const L = 30;       // Comprimento do circuito (m)
  const R = 4.61;     // Resistência do condutor (mΩ/m) - cobre 6 mm²
  const X = 0.08;     // Reatância do condutor (mΩ/m)
  const FP = 0.92;    // Fator de potência
  const Ncp = 1;      // Número de cabos em paralelo por fase

  // --- Teste: Monofásico e Bifásico (reprovado) ---
  const deltaVcMono = quedaDeTensao(1, Ib, L, R, X, FP, Ncp, 220);
  console.log("ΔVc (monofásico):", deltaVcMono.toFixed(3), "% -", testeQuedaDeTensao(deltaVcMono));

  const deltaVcBi = quedaDeTensao(2, Ib, L, R, X, FP, Ncp, 220);
  console.log("ΔVc (bifásico):", deltaVcBi.toFixed(3), "% -", testeQuedaDeTensao(deltaVcBi));

  // --- Teste: Trifásico (aprovado) ---
  const deltaVcTri = quedaDeTensao(3, Ib, L, R, X, FP, Ncp, 380);
  console.log("ΔVc (trifásico):", deltaVcTri.toFixed(3), "% -", testeQuedaDeTensao(deltaVcTri));

  // --- Teste: Monofásico (aprovado, usando cabo mais grosso) ---
  // Exemplo: 16 mm², R = 1.15 mΩ/m
  const R_aprovado = 1.15;
  const deltaVcMonoAprov = quedaDeTensao(1, Ib, L, R_aprovado, X, FP, Ncp, 220);
  console.log("ΔVc (monofásico, cabo 16mm²):", deltaVcMonoAprov.toFixed(3), "% -", testeQuedaDeTensao(deltaVcMonoAprov));

  // --- Teste de erro (queda negativa) ---
  const deltaVcErro = -1.5;
  console.log("ΔVc (erro):", deltaVcErro, "% -", testeQuedaDeTensao(deltaVcErro));

  // --- Teste de reprovado (queda acima de 3%) ---
  const deltaVcReprovado = 3.5;
  console.log("ΔVc (reprovado):", deltaVcReprovado, "% -", testeQuedaDeTensao(deltaVcReprovado));
}

testQuedaDeTensao();

