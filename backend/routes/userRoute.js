const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cadastro', userController.cadastro);
router.get('/usuario', authMiddleware, userController.getUserById);
router.put('/editar', authMiddleware, userController.editar);
router.delete('/excluir', authMiddleware, userController.excluir);

module.exports = router;