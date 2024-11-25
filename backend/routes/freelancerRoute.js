const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cadastrar', authMiddleware, freelancerController.cadastrar);
router.get('/:idFreelancer', authMiddleware, freelancerController.listar);
router.post('/editar', authMiddleware, freelancerController.editar);
router.post('/:idFreelancer/excluir', authMiddleware, freelancerController.excluir);

module.exports = router;