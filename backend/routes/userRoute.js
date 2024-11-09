const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cadastro', userController.cadastrar);
router.get('/perfil', authMiddleware, userController.listar);
router.put('/editar', authMiddleware, userController.editar);
router.delete('/excluir', authMiddleware, userController.excluir);

module.exports = router;