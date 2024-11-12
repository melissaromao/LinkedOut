const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

// Criar categoria
router.post('/categorias', categoriaController.create);

// Listar todas as categorias
router.get('/categorias', categoriaController.findAll);

// Buscar categoria por ID
router.get('/categorias/:id', categoriaController.findOne);

// Atualizar categoria
router.put('/categorias/:id', categoriaController.update);

// Excluir categoria
router.delete('/categorias/:id', categoriaController.delete);

module.exports = router;
