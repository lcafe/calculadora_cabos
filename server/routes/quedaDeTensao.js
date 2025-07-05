'use strict';

const express = require('express');
const router = express.Router();
const { quedaDeTensao } = require('../../lib/quedaDeTensao');
const { testeQuedaDeTensao } = require('../../lib/testeQuedaDeTensao');

router.post('/queda-tensao', (req, res) => {
  const {
    fases,
    Ib,
    L,
    R,
    X,
    FP,
    Ncp,
    V,
    deltaVcSetPoint
  } = req.body;

  if (
    typeof fases !== 'number' ||
    typeof Ib !== 'number' ||
    typeof L !== 'number' ||
    typeof R !== 'number' ||
    typeof X !== 'number' ||
    typeof FP !== 'number' ||
    typeof Ncp !== 'number' ||
    typeof V !== 'number' ||
    typeof deltaVcSetPoint !== 'number'
  ) {
    return res.status(400).json({
      erro: 'Parâmetros inválidos. Envie fases, Ib, L, R, X, FP, Ncp, V e deltaVcSetPoint como números.'
    });
  }

  try {
    const deltaVc = quedaDeTensao(fases, Ib, L, R, X, FP, Ncp, V);
    const status = testeQuedaDeTensao(deltaVc, deltaVcSetPoint);

    return res.json({
      queda_tensao_percentual: deltaVc,
      status
    });
  } catch (err) {
    return res.status(400).json({
      erro: err.message
    });
  }
});

module.exports = router;