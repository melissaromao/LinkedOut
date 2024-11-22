const express = require('express');
const router = express.Router();
const freelaController = require('../controllers/freelaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cadastrar/:idEmpresa', authMiddleware, freelaController.cadastrar);
router.get('/listar', authMiddleware, freelaController.listarFreelas);
router.get('/listar/:idEmpresa', authMiddleware, freelaController.listarFreela);
router.post('/editar', authMiddleware, freelaController.editar);
router.post('/excluir/:idFreela', authMiddleware, freelaController.excluir);

module.exports = router;