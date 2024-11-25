const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.post('/cadastrar', categoriaController.create);  
router.get('/listar', categoriaController.findAll);    
router.get('/:idCategoria', categoriaController.findOne);
router.post('/editar/:idCategoria', categoriaController.update);   
router.post('/deletar/:idCategoria', categoriaController.delete);

module.exports = router;
