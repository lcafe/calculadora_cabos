'use strict';

const express = require('express');
const router = express.Router();
const { correnteProjeto } = require('../../lib/correnteDeProjeto');

// Rota POST para calcular a corrente de projeto
router.post('/corrente-projeto', (req, res) => {
  const { fases, P, V, FP, rendimento, tipoCarga } = req.body;

  // Validação dos parâmetros
  if (
    typeof fases !== 'number' ||
    typeof P !== 'number' ||
    typeof V !== 'number' ||
    typeof FP !== 'number' ||
    typeof rendimento !== 'number' ||
    typeof tipoCarga !== 'string'
  ) {
    return res.status(400).json({
      erro: 'Parâmetros inválidos. Envie fases, P, V, FP, rendimento (número) e tipoCarga (string).'
    });
  }

  try {
    const resultado = correnteProjeto(fases, P, V, FP, rendimento, tipoCarga);
    return res.json({
      corrente_projeto: resultado
    });
  } catch (err) {
    return res.status(400).json({
      erro: err.message
    });
  }
});

module.exports = router;