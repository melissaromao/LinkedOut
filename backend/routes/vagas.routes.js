const express = require('express');
const router = express.Router();
const VagaController = require('../controllers/vaga.controller');

// Endpoint para filtrar vagas por categoria e palavra-chave
router.get('/filtrar', VagaController.filtrarPorCategoriaEKeyword);

module.exports = router;
