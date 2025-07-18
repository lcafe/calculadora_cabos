const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const fs = require("fs");
const path = require("path");
const { criterioSobrecarga } = require("../../lib/criterioSobrecarga");

module.exports = async function calcularSobrecarga() {
  const respostas = await inquirer.prompt([
    { name: "Ib", message: "Corrente de projeto (Ib) em A:", validate: v => !isNaN(v) && v > 0 },
    { name: "Ins", message: "Corrente nominal do disjuntor (Ins) em A:", validate: v => !isNaN(v) && v > 0 },
    { name: "Iz", message: "Corrente máxima do cabo (Iz) em A:", validate: v => !isNaN(v) && v > 0 },
    { name: "condCemHoras", message: "É garantido que a temperatura limite de sobrecarga nos condutores não virá a ser mantida por um tempo superior a 100 horas durante 12 meses consecutivos ou 500 horas durante sua vida útil?", type: "confirm", default: true }
  ]);

  console.log(chalk.blue("\nResumo dos dados informados:"));
  console.log(`- Corrente de projeto (Ib): ${respostas.Ib} A`);
  console.log(`- Corrente nominal do disjuntor (Ins): ${respostas.Ins} A`);
  console.log(`- Corrente máxima do cabo (Iz): ${respostas.Iz} A`);
  console.log(`- Garantido que a temperatura limite de sobrecarga nos condutores não virá a ser mantida por um tempo superior a 100 horas durante 12 meses consecutivos ou 500 horas durante sua vida útil: ${respostas.condCemHoras}`);
  const { confirmar } = await inquirer.prompt([
    { type: "confirm", name: "confirmar", message: "Deseja prosseguir com o cálculo?", default: true }
  ]);
  if (!confirmar) return;

  const status = criterioSobrecarga(
    Number(respostas.Ib),
    Number(respostas.Ins),
    Number(respostas.Iz),
    respostas.condCemHoras
  );

  console.log(chalk.greenBright(`\nStatus do critério de sobrecarga: ${status}\n`));

  const { salvar } = await inquirer.prompt([
    { type: "confirm", name: "salvar", message: "Deseja salvar este resultado em um arquivo texto?", default: false }
  ]);
  if (salvar) {
    const nomePadrao = `sobrecarga_${Date.now()}.txt`;
    const { nomeArquivo } = await inquirer.prompt([
      { name: "nomeArquivo", message: `Nome do arquivo:`, default: nomePadrao }
    ]);
    const conteudo = [
      "Cálculo do Critério de Sobrecarga",
      `Data/Hora: ${new Date().toLocaleString()}`,
      `Corrente de projeto (Ib): ${respostas.Ib} A`,
      `Corrente nominal do disjuntor (Ins): ${respostas.Ins} A`,
      `Corrente máxima do cabo (Iz): ${respostas.Iz} A`,
      `Garantido que a temperatura limite de sobrecarga nos condutores não virá a ser mantida por um tempo superior a 100 horas durante 12 meses consecutivos ou 500 horas durante sua vida útil: ${respostas.condCemHoras}`,
      `Status do critério de sobrecarga: ${status}`
    ].join("\n");
    fs.writeFileSync(path.join(process.cwd(), nomeArquivo), conteudo);
    console.log(chalk.green(`\nResultado salvo em ${nomeArquivo}\n`));
  }
};
