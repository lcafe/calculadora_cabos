const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const fs = require("fs");
const path = require("path");
const { correnteCorrigida } = require("../../lib/correnteCorrigida");

module.exports = async function calcularCorrenteCorrigida() {
  const respostas = await inquirer.prompt([
    { name: "Ib", message: "Corrente de projeto (Ib) em A:", validate: v => !isNaN(v) && v > 0 },
    { name: "k1", message: "Fator de correção de temperatura (k1):", validate: v => !isNaN(v) && v > 0 },
    { name: "k2", message: "Fator de correção de resistividade do solo (k2):", validate: v => !isNaN(v) && v > 0 },
    { name: "k3", message: "Fator de correção de agrupamento (k3):", validate: v => !isNaN(v) && v > 0 },
    { name: "ncp", message: "Números de cabos paralelos por fase (Ncp):", validate: v => !isNaN(v) && v > 0 },
    { name: "tipoDeCarga", message: "A carga é motórica (1) ou não motórica (2)?", validate: v => [1,2].includes(Number(v)), filter: v => Number(v) },
    { name: "fatorDeServico", message: "Qual o fator de serviço do motor?", validate: v => !isNaN(v) && v >= 1 && v <= 2, when: answers => answers.tipoDeCarga === 1, filter: v => Number(v) }
  ]);

  //Passar a variável tipo de carga para string
  respostas.tipoDeCarga = respostas.tipoDeCarga === 1 ? "motorica" : "nao-motorica";

  console.log(chalk.blue("\nResumo dos dados informados:"));
  console.log(`- Corrente de projeto (Ib): ${respostas.Ib} A`);
  console.log(`- Fator de correção de temperatura (k1): ${respostas.k1}`);
  console.log(`- Fator de correção de resistividade do solo (k2): ${respostas.k2}`);
  console.log(`- Fator de correção de agrupamento (k3): ${respostas.k3}`);
  console.log(` - Numero de cabos em paralelo por fase: ${respostas.ncp}`);
  console.log(` - Tipo de carga: ${respostas.tipoDeCarga}`);
  if(respostas.fatorDeServico !== undefined){ 
    console.log(` - Fator de serviço: ${respostas.fatorDeServico}`);
  }
  const { confirmar } = await inquirer.prompt([
    { type: "confirm", name: "confirmar", message: "Deseja prosseguir com o cálculo?", default: true }
  ]);
  if (!confirmar) return;

  const IbCorrigida = correnteCorrigida(
    Number(respostas.Ib),
    Number(respostas.k1),
    Number(respostas.k2),
    Number(respostas.k3),
    Number(respostas.ncp),
    respostas.tipoDeCarga,
    Number(respostas.fatorDeServico)
  );
  console.log(chalk.greenBright(`\nCorrente corrigida: ${IbCorrigida.toFixed(2)} A\n`));

  const { salvar } = await inquirer.prompt([
    { type: "confirm", name: "salvar", message: "Deseja salvar este resultado em um arquivo texto?", default: false }
  ]);
  if (salvar) {
    const nomePadrao = `corrente_corrigida_${Date.now()}.txt`;
    const { nomeArquivo } = await inquirer.prompt([
      { name: "nomeArquivo", message: `Nome do arquivo:`, default: nomePadrao }
    ]);
    const conteudo = [
      "Cálculo de Corrente Corrigida",
      `Data/Hora: ${new Date().toLocaleString()}`,
      `Corrente de projeto (Ib): ${respostas.Ib} A`,
      `Fator de correção de temperatura (k1): ${respostas.k1}`,
      `Fator de correção de resistividade do solo (k2): ${respostas.k2}`,
      `Fator de correção de agrupamento (k3): ${respostas.k3}`,
      `Número de cabos paralelos por fase (Ncp): ${respostas.ncp}`,
      `Tipo de carga: ${respostas.tipoDeCarga}`,
      `Fator de serviço: ${respostas.fatorDeServico}`,
      `Corrente corrigida: ${IbCorrigida.toFixed(2)} A`
    ].join("\n");
    fs.writeFileSync(path.join(process.cwd(), nomeArquivo), conteudo);
    console.log(chalk.green(`\nResultado salvo em ${nomeArquivo}\n`));
  }
};
