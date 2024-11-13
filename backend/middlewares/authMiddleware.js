const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.render('index', {warning: 'Token não fornecido'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.idUsuario = decoded.idUsuario;
        next();
    } catch (error) {
        return res.render('index', {error: 'Token inválido'});
    }
};