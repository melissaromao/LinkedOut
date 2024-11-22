const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cadastro', userController.cadastrar);
router.post('/perfil', authMiddleware, userController.listar);
router.post('/editar', authMiddleware, userController.editar);
router.post('/excluir', authMiddleware, userController.excluir);

module.exports = router;