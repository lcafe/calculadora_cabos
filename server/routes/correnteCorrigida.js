'use strict';

const express = require('express');
const router = express.Router();
const { correnteCorrigida } = require('../../lib/correnteCorrigida');

router.post('/corrente-corrigida', (req, res) => {
  const { Ib, k1, k2, k3, ncp, tipoCarga, fatorDeServico } = req.body;

  if (
    typeof Ib !== 'number' ||
    typeof k1 !== 'number' ||
    typeof k2 !== 'number' ||
    typeof k3 !== 'number' ||
    typeof ncp !== 'number' ||
    typeof tipoCarga !== 'string' ||
    (tipoCarga === 'motorica' && (typeof fatorDeServico !== 'number' || fatorDeServico <= 0))
  ) {
    return res.status(400).json({
      erro: 'Parâmetros inválidos. Envie Ib, k1, k2, k3, ncp (números), tipoCarga (string) e fatorDeServico (número, obrigatório para motorica).'
    });
  }

  try {
    const resultado = correnteCorrigida(Ib, k1, k2, k3, ncp, tipoCarga, fatorDeServico);
    return res.json({
      corrente_corrigida: resultado
    });
  } catch (err) {
    return res.status(400).json({
      erro: err.message
    });
  }
});

module.exports = router;