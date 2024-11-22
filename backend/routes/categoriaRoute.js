const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

// Criar categoria
router.post('/categoriaCreate', categoriaController.create);

// Listar todas as categorias
router.get('/categoriaFindAll', categoriaController.findAll);

// Buscar categoria por ID
router.get('/categoriaFindone/:id', categoriaController.findOne);

// Atualizar categoria
router.put('/categoriaUpdate/:id', categoriaController.update);

// Excluir categoria
router.delete('/categoriaDelete/:id', categoriaController.delete);

module.exports = router;
