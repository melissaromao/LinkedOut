const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.post('/categorias', categoriaController.create);       // Criar categoria
router.get('/categorias', categoriaController.findAll);        // Listar categorias
router.get('/categorias/:id', categoriaController.findOne);    // Buscar categoria por ID
router.put('/categorias/:id', categoriaController.update);     // Atualizar categoria
router.delete('/categorias/:id', categoriaController.delete);  // Excluir categoria

module.exports = router;
