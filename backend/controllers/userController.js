const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

module.exports = {
    cadastro: async (req, res) => {
        const {email, senha} = req.body;

        try {
            const usuarioExistente = await Usuario.findOne({where: {email}});
            if (usuarioExistente) {
                return res.status(400).json({message: 'Email já cadastrado'});
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const novoUsuario = await Usuario.create({
                email,
                senha: senhaCriptografada,
            });

            return res.status(201).json({
                message: 'Sucesso ao cadastrar usuário :D',
                usuario: {id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email},
            });
        } catch (error) {
            return res.status(500).json({message: 'Erro ao cadastrar usuário :('});
        }
    },
};