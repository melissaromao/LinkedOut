const express = require('express');
const router = express.Router();
const Freelancer = require('../models/FreelancerModels');

// Cadastrar um novo freelancer
router.post('/', async (req, res) => {
    const { nome, CPF, dataNasc, tituloProfissional, foto, sobreMim } = req.body;

    try {
        const newFreelancer = new Freelancer({
            nome,
            CPF,
            dataNasc,
            tituloProfissional,
            foto,
            sobreMim,
        });

        const freelancer = await newFreelancer.save();
        res.status(201).json(freelancer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Listar todos os freelancers
router.get('/', async (req, res) => {
    try {
        const freelancers = await Freelancer.find();
        res.status(200).json(freelancers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obter detalhes de um freelancer específico
router.get('/:id', async (req, res) => {
    try {
        const freelancer = await Freelancer.findById(req.params.id);
        if (!freelancer) return res.status(404).json({ message: 'Freelancer não encontrado' });
        res.status(200).json(freelancer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
