// routes/AuthRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Importando o modelo User
const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = new User({ email, senha: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar usuário', error: err.message });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Aqui você pode gerar um token JWT se desejar
        res.status(200).json({ message: 'Login bem-sucedido', user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
    }
});

module.exports = router; // Exportando as rotas
