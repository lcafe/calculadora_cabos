const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const fs = require("fs");
const path = require("path");
const { quedaDeTensaoMotor } = require("../../lib/quedaDeTensaoMotor");
const { testeQuedaDeTensaoMotor } = require("../../lib/testeQuedaDeTensaoMotor");

module.exports = async function calcularQuedaTensaoMotor() {
  // 1. Perguntar os parâmetros
  const respostas = await inquirer.prompt([
    { name: "Ip", message: "Corrente de partida do motor (A):", validate: v => !isNaN(v) && v > 0 },
    { name: "L", message: "Comprimento do circuito (m):", validate: v => !isNaN(v) && v > 0 },
    { name: "R", message: "Resistência do condutor (mΩ/m):", validate: v => !isNaN(v) && v > 0 },
    { name: "Ncp", message: "Número de cabos em paralelo por fase:", validate: v => !isNaN(v) && v > 0 },
    { name: "Vff", message: "Tensão fase-fase (V):", validate: v => !isNaN(v) && v > 0 }
  ]);

  // 2. Resumo dos inputs
  console.log(chalk.blue("\nResumo dos dados informados:"));
  console.log(`- Corrente de partida do motor (Ip): ${respostas.Ip} A`);
  console.log(`- Comprimento do circuito (L): ${respostas.L} m`);
  console.log(`- Resistência do condutor (R): ${respostas.R} mΩ/m`);
  console.log(`- Número de cabos em paralelo por fase (Ncp): ${respostas.Ncp}`);
  console.log(`- Tensão fase-fase (Vff): ${respostas.Vff} V`);
  const { confirmar } = await inquirer.prompt([
    { type: "confirm", name: "confirmar", message: "Deseja prosseguir com o cálculo?", default: true }
  ]);
  if (!confirmar) return;

  // 3. Executar cálculo
  const deltaVm = quedaDeTensaoMotor(
    Number(respostas.Ip),
    Number(respostas.L),
    Number(respostas.R),
    Number(respostas.Ncp),
    Number(respostas.Vff)
  );
  const status = testeQuedaDeTensaoMotor(deltaVm);

  console.log(chalk.greenBright(`\nQueda de tensão na partida: ${deltaVm.toFixed(3)} %`));
  console.log(chalk.yellow(`Status: ${status}\n`));

  // 4. Salvar resultado (opcional)
  const { salvar } = await inquirer.prompt([
    { type: "confirm", name: "salvar", message: "Deseja salvar este resultado em um arquivo texto?", default: false }
  ]);
  if (salvar) {
    const nomePadrao = `queda_tensao_motor_${Date.now()}.txt`;
    const { nomeArquivo } = await inquirer.prompt([
      { name: "nomeArquivo", message: `Nome do arquivo:`, default: nomePadrao }
    ]);
    const conteudo = [
      "Cálculo de Queda de Tensão na Partida do Motor",
      `Data/Hora: ${new Date().toLocaleString()}`,
      `Corrente de partida do motor (Ip): ${respostas.Ip} A`,
      `Comprimento do circuito (L): ${respostas.L} m`,
      `Resistência do condutor (R): ${respostas.R} mΩ/m`,
      `Número de cabos em paralelo por fase (Ncp): ${respostas.Ncp}`,
      `Tensão fase-fase (Vff): ${respostas.Vff} V`,
      `Queda de tensão na partida: ${deltaVm.toFixed(3)} %`,
      `Status: ${status}`
    ].join("\n");
    fs.writeFileSync(path.join(process.cwd(), nomeArquivo), conteudo);
    console.log(chalk.green(`\nResultado salvo em ${nomeArquivo}\n`));
  }
};
