const express = require('express');
const router = express.Router();
const Freela = require('../models/FreelaModels');

// Cadastrar um novo freela
router.post('/', async (req, res) => {
    const { nome, CNPJ, tipo, descricao, valor, local, dataCriacao, dataValidade, statusFreela } = req.body;

    try {
        const newFreela = new Freela({
            nome,
            CNPJ,
            tipo,
            descricao,
            valor,
            local,
            dataCriacao,
            dataValidade,
            statusFreela
        });

        const freela = await newFreela.save();
        res.status(201).json(freela);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Listar todos os freela
router.get('/', async (req, res) => {
    try {
        const freela = await Freela.find();
        res.status(200).json(freela);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obter detalhes de um freela
router.get('/:id', async (req, res) => {
    try {
        const freela = await Freela.findById(req.params.id);
        if (!freela) return res.status(404).json({ message: 'Freela não encontrado' });
        res.status(200).json(freela);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
