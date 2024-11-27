const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Empresa = require('../models/Empresa');
const Freelancer = require('../models/Freelancer');

module.exports = {
    cadastrar: async (req, res) => {
        const { email, senha, nome } = req.body;

        if (!validator.isEmail(email)) {
            return res.render('cadastro', { warning: 'Email inválido' });
        }

        try {
            const usuarioExistente = await Usuario.findOne({ where: { email } });
            if (usuarioExistente) {
                return res.render('cadastro', { warning: 'Email já cadastrado' });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = await Usuario.create({
                nome,
                email,
                senha: senhaCriptografada
            });

            return res.render('index', { success: 'Sucesso ao cadastrar usuário' });
        } catch (error) {
            console.error(error);
            return res.render('cadastro', { error: 'Erro ao cadastrar usuário' });
        }
    },

    listar: async (req, res) => {
        const { idUsuario } = req;
        let usuario = null;
        let empresas = [];
        let freelancers = [];

        try {
            usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                return res.render('index', { warning: 'Usuário não encontrado' });
            }

            empresas = await Empresa.findAll({ where: { idUsuario } });
            freelancers = await Freelancer.findAll({ where: { idUsuario } });

            return res.render('home', { usuario, empresas, freelancers });
        } catch (error) {
            console.error(error);
            return res.render('home', { error: 'Erro ao buscar usuário', usuario, empresas, freelancers });
        }
    },

    editar: async (req, res) => {
        const { idUsuario } = req;
        const { email, senha, nome } = req.body;
        let usuario = null;
        let empresas = [];
        let freelancers = [];

        if (!validator.isEmail(email)) {
            return res.render('empresaHome', { warning: 'Email inválido', usuario, empresas });
        }

        try {
            usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                return res.render('index', { warning: 'Usuário não encontrado' });
            }

            const usuarioExistente = await Usuario.findOne({ where: { email } });
            if (usuarioExistente && usuarioExistente.idUsuario !== idUsuario) {
                return res.render('empresaHome', { warning: 'Email já cadastrado', usuario, empresas });
            }

            usuario.email = email || usuario.email;
            usuario.nome = nome || usuario.nome;

            if (senha) {
                usuario.senha = await bcrypt.hash(senha, 10);
            }

            await usuario.save();

            empresas = await Empresa.findAll({ where: { idUsuario } });
            freelancers = await Freelancer.findAll({ where: { idUsuario } });

            return res.render('home', { success: 'Usuário atualizado com sucesso', usuario, empresas, freelancers });
        } catch (error) {
            console.error(error);
            return res.render('home', { error: 'Erro ao editar usuário', usuario, empresas, freelancers });
        }
    },

    excluir: async (req, res) => {
        const { idUsuario } = req;
        let usuario = null;

        try {
            usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                return res.render('home', { warning: 'Usuário não encontrado', empresas: [], freelancers: [] });
            }

            await usuario.destroy();

            res.clearCookie('token');
            return res.render('index', { success: 'Usuário excluído com sucesso' });
        } catch (error) {
            console.error(error);
            return res.render('home', { error: 'Erro ao excluir usuário', empresas: [], freelancers: [] });
        }
    }
};