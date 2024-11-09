const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(400).json({ message: 'Senha incorreta' });
            }

            const token = jwt.sign(
                { idUsuario: usuario.idUsuario },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Login bem-sucedido!', nome: usuario.nome, token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Login mal-sucedido' });
        }
    }
}