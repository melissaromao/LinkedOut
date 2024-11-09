const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = {
    cadastrar: async (req, res) => {
        const { email, senha, nome } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email inválido'});
        }
        
        try {
            const usuarioExistente = await Usuario.findOne({ where: { email } });
            if (usuarioExistente) {
                return res.status(400).json({ message: 'Email já cadastrado' });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = await Usuario.create({
                nome,
                email,
                senha: senhaCriptografada
            });

            return res.status(201).json({ message: 'Sucesso ao cadastrar usuário', usuario });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }
    },

    listar: async (req, res) => {
        const { idUsuario } = req;

        try {
            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            return res.status(200).json({ message: 'Usuário encontrado', usuario });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    },

    editar: async (req, res) => {
        const { idUsuario } = req;
        const { email, senha, nome } = req.body;

        try {
            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            usuario.email = email || usuario.email;
            usuario.nome = nome || usuario.nome;

            if (senha) {
                usuario.senha = await bcrypt.hash(senha, 10);
            }

            await usuario.save();

            return res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao editar usuário' });
        }
    },

    excluir: async (req, res) => {
        const { idUsuario } = req;

        try {
            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await usuario.destroy();

            return res.status(200).json({ message: 'Usuário excluído com sucesso' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao excluir usuário' });
        }
    }
};