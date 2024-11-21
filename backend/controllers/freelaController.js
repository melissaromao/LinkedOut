const Usuario = require('../models/Usuario');
const Freela = require('../models/Freela');
const Empresa = require('../models/Empresa');

module.exports = {
    cadastrar: async (req, res) => {
        const { idUsuario } = req;
        const { idEmpresa, nome, descricao, idCategoria, valor, dataValidade } = req.body;

        try {
            const empresa = await Empresa.findOne({ where: { idEmpresa, idUsuario }});
            if (!empresa) {
                return res.render('empresaHome', { error: 'Empresa não encontrada' });
            }

            const freela = await Freela.create({
                idEmpresa,
                nome,
                descricao,
                idCategoria,
                valor,
                dataValidade
            });

            const freelas = await Freela.findAll({ where: { idEmpresa } });
            return res.render('empresaHome', { success: 'Sucesso ao cadastrar freela', empresa, usuario, freelas });
        } catch (error) {
            console.log(error);
            return res.render('empresaHome', { error: 'Erro ao cadastrar freela' });
        }
    },

    listarFreelas: async (req, res) => {
        try {
            const freelas = await Freela.findAll({
                include: [
                    {
                        model: Empresa,
                        attributes: ['nome']
                    }
                ]
            });

            return res.render('freelas', { freelas });
        } catch (error) {
            console.log(error);
            return res.render('home', { error: 'Erro ao listar freelas' });
        }
    },

    listarFreela: async (req, res) => {
        const { idUsuario } = req;
        const { idEmpresa } = req.params;

        try {
            const empresa = await Empresa.findOne({ where: { idEmpresa, idUsuario } });

            if (!empresa) {
                return res.render('home', { warning: 'Empresa não encontrada' });
            }

            const freelas = await Freela.findAll({ where: { idEmpresa } });
            return res.render('empresaHome', { freelas, empresa });
        } catch (error) {
            console.log(error);
            return res.render('home', { error: 'Erro ao listar freelas da empresa' });
        }
    },

    editar: async (req, res) => {
        const { idUsuario } = req;
        const { idFreela, nome, descricao, idCategoria, valor, dataValidade, statusFreela } = req.body;

        try {
            const freela = await Freela.findByPk(idFreela);

            if (!freela) {
                return res.render('home', { warning: 'Freela não encontrado' });
            }

            const empresa = await Empresa.findOne({ where: { idEmpresa: freela.idEmpresa, idUsuario } });

            if (!empresa) {
                return res.render('home', { warning: 'Empresa do freela não pertence a você' });
            }

            freela.nome = nome || freela.nome;
            freela.descricao = descricao || freela.descricao;
            freela.idCategoria = idCategoria || freela.idCategoria;
            freela.valor = valor || freela.valor;
            freela.dataValidade = dataValidade || freela.dataValidade;
            freela.statusFreela = statusFreela || freela.statusFreela;

            await freela.save();
            return res.render('empresaHome', { success: 'Freela editado com sucesso', empresa, freelas });
        } catch {
            console.log(error);
            return res.render('home', { error: 'Erro ao editar freela' });
        }
    },

    excluir: async (req, res) => {
        const { idUsuario } = req;
        const { idFreela } = req.params;

        try {
            const freela = await Freela.findByPk(idFreela);

            if (!freela) {
                return res.render('home', { warning: 'Freela não encontrado' });
            }

            const empresa = await Empresa.findOne({ where: { idEmpresa: freela.idEmpresa, idUsuario } });

            if (!empresa) {
                return res.render('home', { warning: 'Empresa do freela não pertence a você' });
            }

            await freela.destroy();

            return res.render('empresaHome', { success: 'Freela excluído com sucesso' });
        } catch (error) {
            console.log(error);
            return res.render('home', { error: 'Erro ao excluir freela' });
        }
    }
};