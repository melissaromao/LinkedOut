const Usuario = require('../models/Usuario');
const Empresa = require('../models/Empresa');
const Freela = require('../models/Freela');
const Categoria = require('../models/Categoria');

module.exports = {

    cadastrar: async (req, res) => {
        const { idEmpresa } = req.params;
        const { idUsuario } = req;
        const { nome, descricao, valor, dataValidade, idCategoria } = req.body;

        try {
            const usuario = await Usuario.findByPk(idUsuario);
            if (!usuario) {
                return res.render('empresa', { warning: 'Usuário não encontrado' });
            }

            const empresa = await Empresa.findOne({ where: { idEmpresa, idUsuario } });
            if (!empresa) {
                return res.render('home', { warning: 'Empresa não encontrada ou você não tem permissão para acessar esta empresa' });
            }

            const categoria = await Categoria.findByPk(idCategoria);
            if (!categoria) {
                return res.render('home', { warning: 'Categoria inválida' });
            }

            const freela = await Freela.create({
                nome,
                descricao,
                valor,
                idEmpresa,
                idCategoria,
                dataValidade,
                statusFreela: 'ABERTO',
            });

            const freelas = await Freela.findAll({
                where: { idEmpresa },
                include: [{
                    model: Categoria,
                    as: 'Categoria'
                }]
            });

            const categorias = await Categoria.findAll({
                include: [
                    {
                        model: Empresa,
                        required: false
                    },
                    {
                        model: Freela,
                        required: false
                    }
                ]
            });

            return res.render('empresaHome', { success: 'Freela cadastrado com sucesso!', freelas, empresa, categorias });
        } catch (error) {
            console.error('Erro ao cadastrar freela:', error);

            const categorias = await Categoria.findAll({ where: { idEmpresa } });
            const freelas = await Freela.findAll({ where: { idEmpresa } });

            return res.render('empresaHome', { error: 'Erro ao cadastrar freela', freelas, categorias });
        }
    },

    listar: async (req, res) => {
        const { idUsuario } = req;
        const { idFreela } = req.params;

        try {
            const freela = await Freela.findByPk(idFreela);
            if (!freela) {
                return res.render('home', { warning: 'Freela não encontrado' });
            }

            const empresa = await Empresa.findOne({ where: { idEmpresa: freela.idEmpresa, idUsuario } });
            if (!empresa) {
                return res.render('home', { warning: 'Você não tem permissão para editar este freela' });
            }

            const categoria = await Categoria.findByPk(freela.idCategoria);
            const categorias = await Categoria.findAll();

            return res.render('freelaEditar', { freela, empresa, categoria, categorias });
        } catch (error) {
            console.log(error);
            return res.render('home', { error: 'Erro ao carregar dados para edição' });
        }
    },

    listarFreelas: async (req, res) => {
        try {
            const limit = 10;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const idCategoria = req.query.idCategoria;
    
            const queryOptions = {
                include: [
                    {
                        model: Empresa,
                        as: 'Empresa',
                        attributes: ['nome']
                    },
                    {
                        model: Categoria,
                        as: 'Categoria',
                        attributes: ['nome']
                    }
                ],
                limit: limit,
                offset: offset
            };
    
            if (idCategoria) {
                queryOptions.where = { idCategoria: idCategoria };
            }
    
            const freelas = await Freela.findAll(queryOptions);
    
            const totalFreelas = await Freela.count({
                where: idCategoria ? { idCategoria: idCategoria } : {}
            });
    
            const totalPages = Math.ceil(totalFreelas / limit);
    
            const categorias = await Categoria.findAll();
    
            return res.render('freelas', {
                freelas: freelas || [],
                currentPage: page,
                totalPages: totalPages,
                totalFreelas: totalFreelas,
                categorias: categorias,
                idCategoria: idCategoria 
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

            const freelas = await Freela.findAll({
                where: { idEmpresa },
                include: [{
                    model: Categoria,
                    attributes: ['nome']
                }]
            });
            const categorias = await Categoria.findAll({
                include: [
                    {
                        model: Empresa,
                        required: false
                    },
                    {
                        model: Freela,
                        required: false
                    }
                ]
            });

            if (!freelas || freelas.length === 0) {
                return res.render('empresaHome', { warning: 'Não há freelas associados a esta empresa.', categorias, freelas, empresa });
            }

            return res.render('empresaHome', { freelas, empresa, categorias });
        } catch (error) {
            console.log(error);
            return res.render('home', { error: `Erro ao listar freelas da empresa: ${error.message}` });
        }
    },

    editar: async (req, res) => {
        const { idUsuario } = req;
        const { idFreela } = req.params;
        const { idEmpresa, nome, descricao, valor, dataValidade, statusFreela, idCategoria } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { idUsuario } });
            console.log('Usuário encontrado:', usuario);

            const empresa = await Empresa.findOne({ where: { idEmpresa, idUsuario } });
            console.log('Empresa encontrada:', empresa);

            if (!empresa) {
                return res.render('home', { warning: 'Empresa não encontrada', usuario });
            }

            const freela = await Freela.findByPk(idFreela, {
                include: [{ model: Categoria, as: 'Categoria' }]
            });

            if (!freela) {
                return res.render('empresaHome', { warning: 'Freela não encontrado', usuario, empresa });
            }

            freela.nome = nome || freela.nome;
            freela.descricao = descricao || freela.descricao;
            freela.valor = valor || freela.valor;
            freela.dataValidade = dataValidade || freela.dataValidade;
            freela.statusFreela = statusFreela || freela.statusFreela;
            freela.idCategoria = idCategoria || freela.idCategoria;

            await freela.save();

            const freelas = await Freela.findAll({
                where: { idEmpresa },
                include: [{ model: Categoria, as: 'Categoria' }]
            });

            const categoria = await Categoria.findByPk(freela.idCategoria);
            const categorias = await Categoria.findAll();

            return res.render('empresaHome', {
                success: 'Freela editado com sucesso',
                usuario,
                empresa,
                freela,
                freelas: freelas || [],
                categoria: categoria || null,
                categorias
            });
        } catch (error) {
            console.error(error);
            return res.render('empresaHome', { error: 'Erro ao buscar Freela para edição' });
        }
    },

    excluir: async (req, res) => {
        const { idUsuario } = req;
        const { idFreela } = req.params;
    
        try {
            if (!idUsuario) {
                return res.render('home', { warning: 'Usuário não autenticado.' });
            }
    
            const freela = await Freela.findByPk(idFreela, {
                include: [{ model: Empresa, as: 'Empresa', required: true }]
            });
    
            if (!freela) {
                return res.render('home', { warning: 'Freela não encontrado...' });
            }
    
            await freela.destroy();
    
            const freelas = await Freela.findAll({ where: { idEmpresa: freela.idEmpresa } });
    
            const empresa = await Empresa.findByPk(freela.idEmpresa);
            const categorias = await Categoria.findAll();
    
            return res.render('empresaHome', {
                success: 'Freela excluído com sucesso!',
                freelas,
                empresa,
                categorias
            });
        } catch (error) {
            console.error(error);
            return res.render('home', { warning: 'Erro ao excluir freela.' });
        }
    }    
};    