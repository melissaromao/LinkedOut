const bcrypt = require('bcrypt');

// Exemplo de criação de novo usuário
router.post('/register', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Hash a senha antes de salvar
        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = new User({
            email,
            senha: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar usuário', error: err.message });
    }
});
