const Usuario = require('../models/Usuario');
const Empresa = require('../models/Empresa');
const Freelancer = require('../models/Freelancer');
const Categoria = require('../models/Categoria')

module.exports = {
    cadastrar: async (req, res) => {
        const { idUsuario } = req;
        const { cnpj, nome, sobreNos, idCategoria, latitude, longitude } = req.body;

        try {
            const usuario = await Usuario.findByPk(idUsuario);
            if (!usuario) {
                return res.render('empresa', { warning: 'Usuário não encontrado' });
            }

            const categoria = await Categoria.findByPk(idCategoria);
            if (!categoria) {
                return res.render('empresa', { warning: 'Categoria não encontrada' });
            }
            const empresaExistente = await Empresa.findOne({ where: { cnpj } });
            if (empresaExistente) {
                return res.render('empresa', { warning: 'CNPJ já cadastrado' });
            }

            const empresa = await Empresa.create({
                idUsuario,
                cnpj,
                nome,
                sobreNos,
                idCategoria,
                latitude,
                longitude
            });

            const empresas = await Empresa.findAll({ where: { idUsuario } });
            const freelancers = await Freelancer.findAll({ where: { idUsuario } });

            return res.render('home', { success: 'Sucesso ao cadastrar empresa', empresa, usuario, empresas, freelancers });
        } catch (error) {
            console.log(error);
            return res.render('empresa', { error: 'Erro ao cadastrar empresa' });
        }
    },

    listar: async (req, res) => {
        const { idUsuario } = req;
        const { idEmpresa } = req.params;

        try {
            const usuario = await Usuario.findOne({ where: { idUsuario } });
            const empresa = await Empresa.findOne({ where: { idEmpresa, idUsuario } });

            const empresas = await Empresa.findAll({ where: { idUsuario } });
            const freelancers = await Freelancer.findAll({ where: { idUsuario } });
            const categoria = await Categoria.findByPk(empresa.idCategoria);

            if (!empresa) {
                return res.render('home', { warning: 'Empresa não encontrada', usuario, empresas, freelancers });
            }

            if (!categoria) {
                return res.render('home', { warning: 'Categoria não encontrada' });
            }
            const categorias = await Categoria.findAll();
            return res.render('empresaHome', { success: 'Empresa encontrada', empresa, usuario, categoria, categorias });

        } catch (error) {
            console.error(error);
            return res.render('home', { error: 'Erro ao buscar empresa', usuario });
        }
    },

    editar: async (req, res) => {
        const { idUsuario } = req;
        const { idEmpresa, cnpj, nome, sobreNos, idCategoria, latitude, longitude } = req.body;

        try {
            const empresa = await Empresa.findOne({ where: { idEmpresa, idUsuario } });

            if (!empresa) {
                return res.render('home', { warning: 'Empresa não encontrada', usuario: req.usuario, empresas, freelancers: await Freelancer.findAll({ where: { idUsuario } }) });
            }

            const categoria = await Categoria.findByPk(idCategoria);
            if (!categoria) {
                return res.render('empresa', { warning: 'Categoria não encontrada' });
            }

            if (cnpj) {
                const empresaExistente = await Empresa.findOne({ where: { cnpj } });
                if (empresaExistente && empresaExistente.idEmpresa !== empresa.idEmpresa) {
                    return res.render('empresaHome', { warning: 'CNPJ já cadastrado' });
                }
                empresa.cnpj = cnpj;
            }

            empresa.nome = nome || empresa.nome;
            empresa.sobreNos = sobreNos || empresa.sobreNos;
            empresa.idCategoria = idCategoria || empresa.idCategoria;
            empresa.latitude = latitude || empresa.latitude;
            empresa.longitude = longitude || empresa.longitude;

            await empresa.save();

            const empresas = await Empresa.findAll({ where: { idUsuario } });
            const freelancers = await Freelancer.findAll({ where: { idUsuario } });

            return res.render('home', { success: 'Empresa editada com sucesso', usuario: req.usuario, empresas, freelancers });

        } catch (error) {
            console.error('Erro ao editar empresa:', error);

            try {
                const usuario = await Usuario.findByPk(idUsuario);
                const empresas = await Empresa.findAll({ where: { idUsuario } });
                const freelancers = await Freelancer.findAll({ where: { idUsuario } });
                return res.render('home', { error: 'Erro ao editar empresa', usuario, empresas, freelancers });
            } catch (usuarioError) {
                console.error('Erro ao carregar usuário:', usuarioError);
                return res.render('home', { error: 'Erro ao carregar usuário', usuario: req.usuario, empresas, freelancers });
            }
        }
    },

    excluir: async (req, res) => {
        const { idUsuario } = req;
        const { idEmpresa } = req.params;

        try {
            const empresa = await Empresa.findByPk(idEmpresa);

            if (!empresa) {
                return res.render('home', { warning: 'Empresa não encontrada', usuario: req.usuario, empresas: await Empresa.findAll({ where: { idUsuario } }), freelancers: await Freelancer.findAll({ where: { idUsuario } }) });
            }

            await empresa.destroy();

            const usuario = await Usuario.findByPk(idUsuario);
            const empresas = await Empresa.findAll({ where: { idUsuario } });
            const freelancers = await Freelancer.findAll({ where: { idUsuario } });

            return res.render('home', { success: 'Empresa excluída com sucesso', usuario, empresas, freelancers });

        } catch (error) {
            console.log(error);

            const usuario = await Usuario.findByPk(idUsuario);
            const empresas = await Empresa.findAll({ where: { idUsuario } });
            const freelancers = await Freelancer.findAll({ where: { idUsuario } });

            return res.render('home', { error: 'Erro ao excluir empresa', usuario, empresas, freelancers });
        }
    }
};