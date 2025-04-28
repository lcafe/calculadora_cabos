const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const dayjs = require("dayjs");
const figlet = require("figlet");

// Importa os módulos de cálculo
const calcularCorrenteProjeto = require("./calculos/correnteProjeto");
const calcularCorrenteCorrigida = require("./calculos/correnteCorrigida");
const calcularQuedaTensao = require("./calculos/quedaTensao");
const calcularQuedaTensaoMotor = require("./calculos/quedaTensaoMotor");
const calcularCorrenteDisjuntor = require("./calculos/correnteDisjuntor");
const calcularSobrecarga = require("./calculos/sobrecarga");
const calcularCurtoCircuito = require("./calculos/curtoCircuito");

// Cabeçalho com ASCII art e data/hora
function printHeader() {
  console.clear();
  console.log(
    chalk.cyan(
      figlet.textSync("CALCULADORA DE CABOS", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  const now = dayjs();
  console.log(
    chalk.gray(
      `Iniciado em: ${now.format("DD/MM/YYYY HH:mm:ss")}\n`
    )
  );
}

// Menu principal
async function mainMenu() {
  printHeader();
  const { acao } = await inquirer.prompt([
    {
      type: "list",
      name: "acao",
      message: chalk.blueBright("O que deseja calcular?"),
      choices: [
        { name: "Corrente de projeto", value: "correnteProjeto" },
        { name: "Corrente corrigida", value: "correnteCorrigida" },
        { name: "Queda de tensão", value: "quedaTensao" },
        { name: "Queda de tensão motor (partida)", value: "quedaTensaoMotor" },
        { name: "Corrente nominal mínima do disjuntor", value: "correnteDisjuntor" },
        { name: "Critério de sobrecarga", value: "sobrecarga" },
        { name: "Critério de curto-circuito", value: "curtoCircuito" },
        new inquirer.Separator(),
        { name: chalk.red("Sair"), value: "sair" },
        new inquirer.Separator(),
      ],
    },
  ]);

  switch (acao) {
    case "correnteProjeto":
      await calcularCorrenteProjeto();
      break;
    case "correnteCorrigida":
      await calcularCorrenteCorrigida();
      break;
    case "quedaTensao":
      await calcularQuedaTensao();
      break;
    case "quedaTensaoMotor":
      await calcularQuedaTensaoMotor();
      break;
    case "correnteDisjuntor":
      await calcularCorrenteDisjuntor();
      break;
    case "sobrecarga":
      await calcularSobrecarga();
      break;
    case "curtoCircuito":
      await calcularCurtoCircuito();
      break;
    case "sair":
      console.log(chalk.green("\nObrigado por usar a Calculadora de Cabos! Até logo.\n"));
      process.exit(0);
  }

  // Voltar ao menu principal
  const { voltar } = await inquirer.prompt([
    {
      type: "confirm",
      name: "voltar",
      message: chalk.gray("Deseja voltar ao menu principal?"),
      default: true,
    },
  ]);
  if (voltar) await mainMenu();
  else {
    console.log(chalk.green("\nObrigado por usar a Calculadora de Cabos! Até logo.\n"));
    process.exit(0);
  }
}

// Início do programa
(async () => {
  printHeader();
  await mainMenu();
})();
