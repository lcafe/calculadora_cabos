'use strict';

const express = require('express');
const router = express.Router();
const { quedaDeTensaoMotor } = require('../../lib/quedaDeTensaoMotor');
const { testeQuedaDeTensaoMotor } = require('../../lib/testeQuedaDeTensaoMotor');

// Rota POST para calcular e testar a queda de tensão motórica trifásica
router.post('/queda-tensao-motorica', (req, res) => {
  const { Ip, L, R, Vff } = req.body;

  if (
    typeof Ip !== 'number' ||
    typeof L !== 'number' ||
    typeof R !== 'number' ||
    typeof Vff !== 'number'
  ) {
    return res.status(400).json({
      erro: 'Parâmetros inválidos. Envie Ip, L, R e Vff como números.'
    });
  }

  try {
    const deltaVm = quedaDeTensaoMotor(Ip, L, R, Vff);
    const status = testeQuedaDeTensaoMotor(deltaVm);

    return res.json({
      queda_tensao_motorica_percentual: deltaVm,
      status
    });
  } catch (err) {
    return res.status(400).json({
      erro: err.message
    });
  }
});

module.exports = router;