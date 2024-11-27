const express = require('express');
const router = express.Router();
const candidaturaController = require('../controllers/candidaturaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/candidatar/:idFreela', authMiddleware, candidaturaController.candidatar);
router.get('/freelancer/:idFreelancer', authMiddleware, candidaturaController.listarCandidaturas);
router.post('/:idCandidatura/cancelar', authMiddleware, candidaturaController.cancelarCandidatura);

module.exports = router;