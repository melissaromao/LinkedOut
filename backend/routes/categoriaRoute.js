const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.post('/categoriaCreate', categoriaController.create);       // Criar categoria
router.get('/categoriaFindAll', categoriaController.findAll);        // Listar categorias
router.get('/categoriaFindOne/:id', categoriaController.findOne);    // Buscar categoria por ID
router.put('/categoriaUpdate/:id', categoriaController.update);     // Atualizar categoria
router.delete('/categoriaDelete/:id', categoriaController.delete);  // Excluir categoria

module.exports = router;
