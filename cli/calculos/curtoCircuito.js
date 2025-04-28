const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const fs = require("fs");
const path = require("path");
const { criterioCurtoCircuito, energiaCurtoCircuito, capacidadeCabo} = require("../../lib/curtoCircuito");

module.exports = async function calcularCurtoCircuito() {
  // 1. Perguntar os parâmetros
  const respostas = await inquirer.prompt([
    { name: "I", message: "Corrente de curto-circuito no barramento (I) em A:", validate: v => !isNaN(v) && v >= 0 },
    { name: "t", message: "Tempo de eliminação de defeito (t) em s:", validate: v => !isNaN(v) && v >= 0 },
    { name: "K", message: "Fator K do cabo escolhido:", validate: v => !isNaN(v) && v > 0 },
    { name: "S", message: "Seção do cabo (S) em mm²:", validate: v => !isNaN(v) && v > 0 }
  ]);

  // 2. Resumo dos inputs
  console.log(chalk.blue("\nResumo dos dados informados:"));
  console.log(`- Corrente de curto-circuito (I): ${respostas.I} A`);
  console.log(`- Tempo de eliminação de defeito (t): ${respostas.t} s`);
  console.log(`- Fator K do cabo (K): ${respostas.K}`);
  console.log(`- Seção do cabo (S): ${respostas.S} mm²`);
  const { confirmar } = await inquirer.prompt([
    { type: "confirm", name: "confirmar", message: "Deseja prosseguir com o cálculo?", default: true }
  ]);
  if (!confirmar) return;

  const I = Number(respostas.I);
  const t = Number(respostas.t);
  const K = Number(respostas.K);
  const S = Number(respostas.S);

  // 3. Executar cálculo
  const status = criterioCurtoCircuito(I, t, K, S);
  const energiaCurto = energiaCurtoCircuito(I, t).toLocaleString();
  const capacidadeEnergiaCabo = capacidadeCabo(K, S).toLocaleString();

  console.log(chalk.greenBright(`\nStatus do critério de curto-circuito: ${status}`));
  console.log(chalk.blue(`I² × t = ${energiaCurto} A².s`));
  console.log(chalk.blue(`K² × S² = ${capacidadeEnergiaCabo} A².s\n`));


  // 4. Salvar resultado (opcional)
  const { salvar } = await inquirer.prompt([
    { type: "confirm", name: "salvar", message: "Deseja salvar este resultado em um arquivo texto?", default: false }
  ]);
  if (salvar) {
    const nomePadrao = `curto_circuito_${Date.now()}.txt`;
    const { nomeArquivo } = await inquirer.prompt([
      { name: "nomeArquivo", message: `Nome do arquivo:`, default: nomePadrao }
    ]);
    const conteudo = [
      "Cálculo do Critério de Curto-circuito",
      `Data/Hora: ${new Date().toLocaleString()}`,
      `Corrente de curto-circuito (I): ${respostas.I} A`,
      `Tempo de eliminação de defeito (t): ${respostas.t} s`,
      `Fator K do cabo (K): ${respostas.K}`,
      `Seção do cabo (S): ${respostas.S} mm²`,
      `I² × t = ${energiaCurto} A².s`,
      `K² × S² = ${capacidadeEnergiaCabo} A².s`,
      `Status do critério de curto-circuito: ${status}`
    ].join("\n");
    fs.writeFileSync(path.join(process.cwd(), nomeArquivo), conteudo);
    console.log(chalk.green(`\nResultado salvo em ${nomeArquivo}\n`));
  }
};
