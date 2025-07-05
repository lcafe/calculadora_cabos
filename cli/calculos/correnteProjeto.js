const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const fs = require("fs");
const path = require("path");
const { correnteProjeto } = require("../../lib/correnteDeProjeto");

module.exports = async function calcularCorrenteProjeto() {
  const respostas = await inquirer.prompt([
    { name: "P", message: "Potência ativa total (W):", validate: v => !isNaN(v) && v > 0 },
    { name: "V", message: "Tensão (V):", validate: v => !isNaN(v) && v > 0 },
    { name: "FP", message: "Fator de potência (0 < FP ≤ 1):", validate: v => !isNaN(v) && v > 0 && v <= 1 },
    { name: "fases", message: "Número de fases (1, 2 ou 3):", validate: v => [1,2,3].includes(Number(v)) },
    { name: "tipoDeCarga", message: "A carga é motórica (1) ou não motórica (2)?", validate: v => [1,2].includes(Number(v)), filter: v => Number(v) },
    { name: "rendimento", message: "Qual o rendimento do motor?", validate: v => !isNaN(v) && v > 0 && v <= 1, when: answers => answers.tipoDeCarga === 1, filter: v => Number(v) }
  ]);

  //Passar a variável tipo de carga para string
  respostas.tipoDeCarga = respostas.tipoDeCarga === 1 ? "motorica" : "nao-motorica";

  console.log(chalk.blue("\nResumo dos dados informados:"));
  console.log(`- Potência ativa total (P): ${respostas.P} W`);
  console.log(`- Tensão (V): ${respostas.V} V`);
  console.log(`- Fator de potência (FP): ${respostas.FP}`);
  console.log(`- Número de fases: ${respostas.fases}`);
  if (respostas.rendimento !== undefined) {
    console.log(`- Rendimento do motor: ${respostas.rendimento}`);
  }
  console.log(`- Tipo de carga: ${respostas.tipoDeCarga === 1 ? "Motórica" : "Não motórica"}`);
  
  const { confirmar } = await inquirer.prompt([
    { type: "confirm", name: "confirmar", message: "Deseja prosseguir com o cálculo?", default: true }
  ]);
  if (!confirmar) return;

  const Ib = correnteProjeto(Number(respostas.fases), Number(respostas.P), Number(respostas.V), Number(respostas.FP), Number(respostas.rendimento), respostas.tipoDeCarga);
  console.log(chalk.greenBright(`\nCorrente de projeto: ${Ib.toFixed(2)} A\n`));

  const { salvar } = await inquirer.prompt([
    { type: "confirm", name: "salvar", message: "Deseja salvar este resultado em um arquivo texto?", default: false }
  ]);
  if (salvar) {
    const nomePadrao = `corrente_projeto_${Date.now()}.txt`;
    const { nomeArquivo } = await inquirer.prompt([
      { name: "nomeArquivo", message: `Nome do arquivo:`, default: nomePadrao }
    ]);
    const conteudo = [
      "Cálculo de Corrente de Projeto",
      `Data/Hora: ${new Date().toLocaleString()}`,
      `Potência ativa total (P): ${respostas.P} W`,
      `Tensão (V): ${respostas.V} V`,
      `Fator de potência (FP): ${respostas.FP}`,
      `Número de fases: ${respostas.fases}`,
      `Rendimento do motor: ${respostas.rendimento}`,
      `Tipo de carga: ${respostas.tipoDeCarga}`,
      `Corrente de projeto: ${Ib.toFixed(2)} A`
    ].join("\n");
    fs.writeFileSync(path.join(process.cwd(), nomeArquivo), conteudo);
    console.log(chalk.green(`\nResultado salvo em ${nomeArquivo}\n`));
  }
};
