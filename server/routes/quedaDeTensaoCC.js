'use strict';

const express = require('express');
const router = express.Router();
const { quedaDeTensaoCC } = require('../../lib/quedaTensaoCC');
const { testeQuedaDeTensao } = require('../../lib/testeQuedaDeTensao');

router.post('/queda-tensao-CC', (req, res) => {
  const {
    Ib,
    L,
    R,
    V,
    deltaVcSetPoint,
    materialDoCondutor,
    materialIsolacao
  } = req.body;

  if (
    typeof Ib !== 'number' ||
    typeof L !== 'number' ||
    typeof R !== 'number' ||
    typeof V !== 'number' ||
    typeof deltaVcSetPoint !== 'number' ||
    typeof materialDoCondutor !== 'string' ||
    typeof materialIsolacao !== 'string'
  ) {
    return res.status(400).json({
      erro: 'Parâmetros inválidos. Envie Ib, L, V e deltaVcSetPoint como números.'
    });
  }

  try {
    const deltaVc = quedaDeTensaoCC(Ib, L, R, V, materialDoCondutor, materialIsolacao);
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