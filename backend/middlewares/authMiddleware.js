const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.render('index', { warning: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.idUsuario = decoded.idUsuario;

        const usuario = await Usuario.findByPk(decoded.idUsuario);
        if (!usuario) {
            return res.render('index', { error: 'Usuário não encontrado'});
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.render('index', { error: 'Token inválido' });
    }
};