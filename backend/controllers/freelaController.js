const Usuario = require('../models/Usuario');
const Empresa = require('../models/Empresa');
const Freela = require('../models/Freela');

module.exports = {
    cadastrar: async (req, res) => {
        const { idEmpresa } = req.params;
        const { nome, descricao, valor, dataValidade } = req.body;

        try {
            const empresa = await Empresa.findOne({ where: { idEmpresa } });

            if (!empresa) {
                return res.render('home', { warning: 'Empresa não encontrada' });
            }

            const freela = await Freela.create({
                nome,
                descricao,
                valor,
                idEmpresa,
                dataValidade,
                statusFreela: 'ABERTO',
            });

            const freelas = await Freela.findAll({ where: { idEmpresa } });
            return res.render('empresaHome', { success: 'Freela cadastrado com sucesso!', freelas, empresa });
        } catch (error) {
            console.error('Erro ao cadastrar freela:', error);
            return res.render('home', { error: 'Erro ao cadastrar freela' });
        }
    },

    listarFreelas: async (req, res) => {
        try {
            const limit = 10;
    
            const page = parseInt(req.query.page) || 1;
    
            const offset = (page - 1) * limit;
    
            const freelas = await Freela.findAll({
                include: [
                    {
                        model: Empresa,
                        attributes: ['nome']
                    }
                ],
                limit: limit,
                offset: offset
            });
    
            const totalFreelas = await Freela.count();
    
            const totalPages = Math.ceil(totalFreelas / limit);
    
            if (!freelas || freelas.length === 0) {
                return res.render('freelas', { warning: 'Nenhum freela encontrado' });
            }
    
            return res.render('freelas', {
                freelas,
                currentPage: page,
                totalPages: totalPages,
                totalFreelas: totalFreelas,
                warning: freelas.length === 0 ? 'Nenhum freela encontrado' : undefined
            });
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
                return res.render('home', { warning: 'Empresa não encontrada ou você não tem permissão para acessá-la' });
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
        const { idFreela, nome, descricao, valor, dataValidade, statusFreela } = req.body;

        try {
            const freela = await Freela.findByPk(idFreela);

            if (!freela) {
                return res.render('home', { warning: 'Freela não encontrado' });
            }

            const empresa = await Empresa.findOne({ where: { idEmpresa: freela.idEmpresa, idUsuario } });

            if (!empresa) {
                return res.render('home', { warning: 'Você não tem permissão para editar este freela' });
            }

            freela.nome = nome || freela.nome;
            freela.descricao = descricao || freela.descricao;
            freela.valor = valor || freela.valor;
            freela.dataValidade = dataValidade || freela.dataValidade;
            freela.statusFreela = statusFreela || freela.statusFreela;

            await freela.save();

            const freelas = await Freela.findAll({ where: { idEmpresa: empresa.idEmpresa } });
            return res.render('empresaHome', { success: 'Freela editado com sucesso', empresa, freelas });
        } catch (error) {
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
                return res.render('home', { warning: 'Você não tem permissão para excluir este freela' });
            }

            await freela.destroy();

            const freelas = await Freela.findAll({ where: { idEmpresa: empresa.idEmpresa } });
            return res.render('empresaHome', { success: 'Freela excluído com sucesso', empresa, freelas });
        } catch (error) {
            console.log(error);
            return res.render('home', { error: 'Erro ao excluir freela' });
        }
    }
};