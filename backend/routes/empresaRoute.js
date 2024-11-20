const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cadastrar', authMiddleware, empresaController.cadastrar);
router.get('/:idEmpresa', authMiddleware, empresaController.listar);
router.post('/editar', authMiddleware, empresaController.editar);
router.post('/:idEmpresa/excluir', authMiddleware, empresaController.excluir);

module.exports = router;