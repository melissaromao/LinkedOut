const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.render('index', { warning: 'Usuário não encontrado' });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.render('index', { warning: 'Senha incorreta' });
            }

            const token = jwt.sign(
                { idUsuario: usuario.idUsuario },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('token', token, { httpOnly: true });
            return res.redirect('/home');
        } catch (error) {
            console.log(error);
            return res.render('index', { error: 'Erro no Login' });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('token');
            return res.redirect('/');

        } catch (error) {
            return res.render('home', { error: 'Erro ao sair' });
        }
    }
}