const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const fs = require("fs");
const path = require("path");
const { correnteNominalDisjuntor } = require("../../lib/correnteNominalDisjuntor");

module.exports = async function calcularCorrenteDisjuntor() {
  // 1. Perguntar os parâmetros
  const respostas = await inquirer.prompt([
    { name: "Ib", message: "Corrente de projeto (Ib) em A:", validate: v => !isNaN(v) && v > 0 },
    { name: "k4", message: "Fator de sobrecarga adotado (k4, ≥ 1):", validate: v => !isNaN(v) && v >= 1 }
  ]);

  // 2. Resumo dos inputs
  console.log(chalk.blue("\nResumo dos dados informados:"));
  console.log(`- Corrente de projeto (Ib): ${respostas.Ib} A`);
  console.log(`- Fator de sobrecarga adotado (k4): ${respostas.k4}`);
  const { confirmar } = await inquirer.prompt([
    { type: "confirm", name: "confirmar", message: "Deseja prosseguir com o cálculo?", default: true }
  ]);
  if (!confirmar) return;

  // 3. Executar cálculo
  const I2 = correnteNominalDisjuntor(Number(respostas.Ib), Number(respostas.k4));
  console.log(chalk.greenBright(`\nCorrente nominal mínima do disjuntor: ${I2.toFixed(2)} A\n`));

  // 4. Salvar resultado (opcional)
  const { salvar } = await inquirer.prompt([
    { type: "confirm", name: "salvar", message: "Deseja salvar este resultado em um arquivo texto?", default: false }
  ]);
  if (salvar) {
    const nomePadrao = `corrente_disjuntor_${Date.now()}.txt`;
    const { nomeArquivo } = await inquirer.prompt([
      { name: "nomeArquivo", message: `Nome do arquivo:`, default: nomePadrao }
    ]);
    const conteudo = [
      "Cálculo de Corrente Nominal Mínima do Disjuntor",
      `Data/Hora: ${new Date().toLocaleString()}`,
      `Corrente de projeto (Ib): ${respostas.Ib} A`,
      `Fator de sobrecarga adotado (k4): ${respostas.k4}`,
      `Corrente nominal mínima do disjuntor: ${I2.toFixed(2)} A`
    ].join("\n");
    fs.writeFileSync(path.join(process.cwd(), nomeArquivo), conteudo);
    console.log(chalk.green(`\nResultado salvo em ${nomeArquivo}\n`));
  }
};
