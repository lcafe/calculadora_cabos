'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Caminho absoluto para a pasta de rotas
const routesPath = __dirname;

// Lê todos os arquivos .js da pasta, exceto o próprio index.js
fs.readdirSync(routesPath)
  .filter(
    (file) =>
      file.endsWith('.js') &&
      file !== 'index.js'
  )
  .forEach((file) => {
    const route = require(path.join(routesPath, file));
    router.use('/', route);
  });

module.exports = router;