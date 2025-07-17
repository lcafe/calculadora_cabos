/**
 * Calcula a queda de tensão percentual (ΔVc) conforme o critério do sistema.
 *
 * @param {number} Ib - Corrente de projeto (A)
 * @param {number} L - Comprimento do circuito (m)
 * @param {number} R - Rcc a 20 graus
 * @param {number} V - Tensão
 * @param {string} materialDoCondutor - material do condutor do cabo
 * @param {string} materialIsolacao - material da isolação do cabo
 * @returns {number} Queda de tensão percentual (ΔVc)
 */
function quedaDeTensaoCC(Ib, L, R, V, materialDoCondutor, materialIsolacao) {
    if ([Ib, L, R, V].some(v => typeof v !== "number" || v < 0)) {
      throw new Error("Todos os parâmetros devem ser números não negativos.");
    }
    if (V === 0) {
      throw new Error("V não pode ser zero.");
    }

    if(typeof materialIsolacao !== "string" || !["pvc", "epr", "xlpe", "lshf/a"].includes(materialIsolacao.toLowerCase())){
        throw new Error("Os valores do material de isolação deve ser: pvc, epr, xlpe ou lshf/a");
    }

    if(typeof materialDoCondutor !== "string" || !["cobre", "aluminio"].includes(materialDoCondutor.toLowerCase())){
        throw new Error("Os valores do material do condutor deve ser: cobre ou aluminio");
    }

    let coeficienteDeTemperatura, temperaturaMaximaDeOperacaoIsolacao;

    if(materialDoCondutor.toLowerCase().includes("cobre")){
        coeficienteDeTemperatura = 0.00393;
    } else {
        coeficienteDeTemperatura = 0.00403;
    }

    if(materialIsolacao.toLowerCase().includes("pvc") || materialIsolacao.toLowerCase().includes("lshf/a")){
        temperaturaMaximaDeOperacaoIsolacao = 70;
    } else {
        temperaturaMaximaDeOperacaoIsolacao = 90;
    }

    let resistencia = R*(1+coeficienteDeTemperatura*(temperaturaMaximaDeOperacaoIsolacao-20));

    let quedaDeTensao = ((2*resistencia*Ib*L)/V)/1000;

    let quedaDeTensaoPercentual = quedaDeTensao*100;

    return quedaDeTensaoPercentual

  }
  
  module.exports = { quedaDeTensaoCC };
  