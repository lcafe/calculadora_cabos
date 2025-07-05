'use strict';

const express = require('express');
const router = express.Router();
const { criterioSobrecarga } = require('../../lib/criterioSobrecarga');

// Rota POST para avaliar o critério de sobrecarga
router.post('/criterio-sobrecarga', (req, res) => {
  const { Ib, Ins, Iz, I2, condCemHoras } = req.body;

  if (
    typeof Ib !== 'number' ||
    typeof Ins !== 'number' ||
    typeof Iz !== 'number' ||
    typeof I2 !== 'number' ||
    typeof condCemHoras !== 'boolean'
  ) {
    return res.status(400).json({
      erro: 'Parâmetros inválidos. Envie Ib, Ins, Iz, I2 (números) e condCemHoras (booleano).'
    });
  }

  try {
    const resultado = criterioSobrecarga(Ib, Ins, Iz, I2, condCemHoras);
    return res.json({
      resultado
    });
  } catch (err) {
    return res.status(400).json({
      erro: err.message
    });
  }
});

module.exports = router;