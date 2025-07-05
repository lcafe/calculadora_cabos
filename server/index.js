'use strict';

const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/', routes);

const PORT = 3000;

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
  });
}

module.exports = app;