const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const fs = require("fs");
const path = require("path");
const { quedaDeTensao } = require("../../lib/quedaDeTensao");
const { testeQuedaDeTensao } = require("../../lib/testeQuedaDeTensao");

module.exports = async function calcularQuedaTensao() {
  // 1. Perguntar os parâmetros
  const respostas = await inquirer.prompt([
    { name: "fases", message: "Número de fases (1, 2 ou 3):", validate: v => [1,2,3].includes(Number(v)) },
    { name: "Ib", message: "Corrente de projeto (A):", validate: v => !isNaN(v) && v > 0 },
    { name: "L", message: "Comprimento do circuito (m):", validate: v => !isNaN(v) && v > 0 },
    { name: "R", message: "Resistência do condutor (mΩ/m):", validate: v => !isNaN(v) && v > 0 },
    { name: "X", message: "Reatância do condutor (mΩ/m):", validate: v => !isNaN(v) && v >= 0 },
    { name: "FP", message: "Fator de potência (0 < FP ≤ 1):", validate: v => !isNaN(v) && v > 0 && v <= 1 },
    { name: "Ncp", message: "Número de cabos em paralelo por fase:", validate: v => !isNaN(v) && v > 0 },
    { name: "V", message: "Tensão (Vfn para 1 fase, Vff para 2 ou 3 fases):", validate: v => !isNaN(v) && v > 0 }
  ]);

  // 2. Resumo dos inputs
  console.log(chalk.blue("\nResumo dos dados informados:"));
  console.log(`- Número de fases: ${respostas.fases}`);
  console.log(`- Corrente de projeto (Ib): ${respostas.Ib} A`);
  console.log(`- Comprimento do circuito (L): ${respostas.L} m`);
  console.log(`- Resistência do condutor (R): ${respostas.R} mΩ/m`);
  console.log(`- Reatância do condutor (X): ${respostas.X} mΩ/m`);
  console.log(`- Fator de potência (FP): ${respostas.FP}`);
  console.log(`- Número de cabos em paralelo por fase (Ncp): ${respostas.Ncp}`);
  console.log(`- Tensão (V): ${respostas.V} V`);
  const { confirmar } = await inquirer.prompt([
    { type: "confirm", name: "confirmar", message: "Deseja prosseguir com o cálculo?", default: true }
  ]);
  if (!confirmar) return;

  // 3. Executar cálculo
  const deltaVc = quedaDeTensao(
    Number(respostas.fases),
    Number(respostas.Ib),
    Number(respostas.L),
    Number(respostas.R),
    Number(respostas.X),
    Number(respostas.FP),
    Number(respostas.Ncp),
    Number(respostas.V)
  );
  const status = testeQuedaDeTensao(deltaVc);

  console.log(chalk.greenBright(`\nQueda de tensão: ${deltaVc.toFixed(3)} %`));
  console.log(chalk.yellow(`Status: ${status}\n`));

  // 4. Salvar resultado
  const { salvar } = await inquirer.prompt([
    { type: "confirm", name: "salvar", message: "Deseja salvar este resultado em um arquivo texto?", default: false }
  ]);
  if (salvar) {
    const nomePadrao = `queda_tensao_${Date.now()}.txt`;
    const { nomeArquivo } = await inquirer.prompt([
      { name: "nomeArquivo", message: `Nome do arquivo:`, default: nomePadrao }
    ]);
    const conteudo = [
      "Cálculo de Queda de Tensão",
      `Data/Hora: ${new Date().toLocaleString()}`,
      `Número de fases: ${respostas.fases}`,
      `Corrente de projeto (Ib): ${respostas.Ib} A`,
      `Comprimento do circuito (L): ${respostas.L} m`,
      `Resistência do condutor (R): ${respostas.R} mΩ/m`,
      `Reatância do condutor (X): ${respostas.X} mΩ/m`,
      `Fator de potência (FP): ${respostas.FP}`,
      `Número de cabos em paralelo por fase (Ncp): ${respostas.Ncp}`,
      `Tensão (V): ${respostas.V} V`,
      `Queda de tensão: ${deltaVc.toFixed(3)} %`,
      `Status: ${status}`
    ].join("\n");
    fs.writeFileSync(path.join(process.cwd(), nomeArquivo), conteudo);
    console.log(chalk.green(`\nResultado salvo em ${nomeArquivo}\n`));
  }
};
