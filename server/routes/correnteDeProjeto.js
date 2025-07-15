'use strict';

const express = require('express');
const router = express.Router();
const { correnteProjeto } = require('../../lib/correnteDeProjeto');

// Rota POST para calcular a corrente de projeto
router.post('/corrente-projeto', (req, res) => {
  // LOG do corpo recebido
  console.log('[corrente-projeto] REQ BODY:', JSON.stringify(req.body));

  const { fases, P, V, FP, rendimento, tipoCarga, instalacaoIndustrial, fatorDeDemanda } = req.body;

  // Validação dos parâmetros
  if (
    typeof fases !== 'number' ||
    typeof P !== 'number' ||
    typeof V !== 'number' ||
    typeof FP !== 'number' ||
    typeof rendimento !== 'number' ||
    typeof tipoCarga !== 'string' ||
    typeof instalacaoIndustrial !== 'boolean' ||
    typeof fatorDeDemanda !== 'number'
  ) {
    console.error('[corrente-projeto] ERRO: Parâmetros inválidos', req.body);
    return res.status(400).json({
      erro: 'Parâmetros inválidos. Envie fases, P, V, FP, rendimento (número), tipoCarga (string), instalacaoIndustrial (boolean) e fatorDeDemanda (número).'
    });
  }

  try {
    const resultado = correnteProjeto(fases, P, V, FP, rendimento, tipoCarga, instalacaoIndustrial, fatorDeDemanda);
    console.log('[corrente-projeto] RESPOSTA:', resultado);
    return res.json({
      corrente_projeto: resultado
    });
  } catch (err) {
    console.error('[corrente-projeto] EXCEPTION:', err);
    return res.status(400).json({
      erro: err.message
    });
  }
});

module.exports = router;