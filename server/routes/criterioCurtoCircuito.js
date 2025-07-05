'use strict';

const express = require('express');
const router = express.Router();
const {
  energiaCurtoCircuito,
  capacidadeCabo,
  criterioCurtoCircuito,
} = require('../../lib/curtoCircuito');

// Rota POST para avaliar o critério de curto-circuito
router.post('/criterio-curto-circuito', (req, res) => {
  const { I, t, K, S } = req.body;

  if (
    typeof I !== 'number' ||
    typeof t !== 'number' ||
    typeof K !== 'number' ||
    typeof S !== 'number'
  ) {
    return res.status(400).json({
      erro: 'Parâmetros inválidos. Envie I, t, K e S como números.'
    });
  }

  try {
    const energia = energiaCurtoCircuito(I, t);
    const capacidade = capacidadeCabo(K, S);
    const resultado = criterioCurtoCircuito(I, t, K, S);

    return res.json({
      energia_curto_circuito: energia,
      capacidade_cabo: capacidade,
      resultado
    });
  } catch (err) {
    return res.status(400).json({
      erro: err.message
    });
  }
});

module.exports = router;