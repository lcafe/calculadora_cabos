const {
    energiaCurtoCircuito,
    capacidadeCabo,
    criterioCurtoCircuito,
  } = require("../lib/curtoCircuito");
  
  function testCurtoCircuito() {
    // Exemplo: Cabo de cobre 35 mm², isolação PVC, K = 115 (típico)
    // Corrente de curto-circuito: 6000 A
    // Tempo de eliminação: 0.2 s
  
    const I = 6000;    // Corrente de curto-circuito (A)
    const t = 0.2;     // Tempo de eliminação (s)
    const K = 115;     // Fator K (cobre, PVC)
    const S = 35;      // Seção do cabo (mm²)
  
    const valorCurto = energiaCurtoCircuito(I, t);
    const valorCabo = capacidadeCabo(K, S);
    const status = criterioCurtoCircuito(I, t, K, S);
  
    console.log(`I² * t = ${valorCurto.toLocaleString()} A².s`);
    console.log(`K² * S² = ${valorCabo.toLocaleString()} (A².s)`);
    console.log(`Status: ${status}`);
    console.log();
  
    // Teste reprovado: seção pequena
    const S_pequeno = 10;
    const statusPequeno = criterioCurtoCircuito(I, t, K, S_pequeno);
    console.log(`Seção pequena (S = ${S_pequeno} mm²): Status: ${statusPequeno}`);
  
    // Teste aprovado: corrente menor
    const I_menor = 3000;
    const statusMenor = criterioCurtoCircuito(I_menor, t, K, S);
    console.log(`Corrente menor (I = ${I_menor} A): Status: ${statusMenor}`);
  }
  
  testCurtoCircuito();
  