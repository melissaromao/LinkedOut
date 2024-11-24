const Usuario = require('../models/Usuario');
const Freelancer = require('../models/Freelancer');

module.exports = {
    cadastrar: async (req, res) => {
        const { idUsuario } = req;
        const { nome, cpf, tituloProfissional, sobreMim, dataNasc, foto, latitude, longitude } = req.body;

        try {
            const usuario = await Usuario.findByPk(idUsuario);
            if (!usuario) {
                return res.render('freelancer', { warning: 'Usuário não encontrado' });
            }

            const freelancerExistente = await Freelancer.findOne({ where: { cpf } });
            if (freelancerExistente) {
                return res.render('freelancer', { warning: 'CPF já cadastrado' });
            }

            const freelancer = await Freelancer.create({
                idUsuario,
                cpf,
                nome,
                tituloProfissional,
                sobreMim,
                dataNasc,
                foto,
                latitude,
                longitude
            });

            const freelancers = await Freelancer.findAll({ where: { idUsuario } });

            return res.render('home', { success: 'Sucesso ao cadastrar freelancer', freelancer, usuario, freelancers });
        } catch (error) {
            console.log(error);
            return res.render('freelancer', { error: 'Erro ao cadastrar freelancer' });
        }
    },

    listar: async (req, res) => {
        const { idUsuario } = req;
        const { idFreelancer } = req.params;
        console.log('ID DO FREELANCER', idFreelancer);

        try {
            const usuario = await Usuario.findOne({ where: { idUsuario } });
            const freelancer = await Freelancer.findOne({ where: { idFreelancer, idUsuario } });

            if (!freelancer) {
                return res.render('home', { warning: 'Freelancer não encontrado', usuario });
            }

            return res.render('freelancerHome', { success: 'Freelancer encontrado', freelancer, usuario });
        } catch (error) {
            console.error(error);
            return res.render('home', { error: 'Erro ao buscar freelancer', usuario });
        }
    },

    editar: async (req, res) => {
        const { idUsuario } = req;
        const { idFreelancer, cpf, nome, tituloProfissional, sobreMim, dataNasc, foto, latitude, longitude } = req.body;
    
        try {
            const freelancer = await Freelancer.findOne({ where: { idFreelancer, idUsuario } });
    
            if (!freelancer) {
                return res.render('home', { warning: 'Freelancer não encontrado' });
            }
    
            if (cpf) {
                const freelancerExistente = await Freelancer.findOne({ where: { cpf } });
                if (freelancerExistente && freelancerExistente.idFreelancer !== freelancer.idFreelancer) {
                    return res.render('home', { warning: 'CPF já cadastrado' });
                }
                freelancer.cpf = cpf;
            }
    
            freelancer.nome = nome || freelancer.nome;
            freelancer.tituloProfissional = tituloProfissional || freelancer.tituloProfissional;
            freelancer.sobreMim = sobreMim || freelancer.sobreMim;
            freelancer.dataNasc = dataNasc || freelancer.dataNasc;
            freelancer.foto = foto || freelancer.foto;
            freelancer.latitude = latitude || freelancer.latitude;
            freelancer.longitude = longitude || freelancer.longitude;
    
            await freelancer.save();
    
            const freelancers = await Freelancer.findAll({ where: { idUsuario } });
            return res.render('home', { success: 'Freelancer editado com sucesso', usuario: req.usuario, freelancers });
    
        } catch (error) {
            console.error('Erro ao editar freelancer:', error);
    
            try {
                const usuario = await Usuario.findByPk(idUsuario);
                return res.render('home', { error: 'Erro ao editar freelancer', usuario });
            } catch (usuarioError) {
                console.error('Erro ao carregar usuário:', usuarioError);
                return res.render('home', { error: 'Erro ao carregar usuário' });
            }
        }
    },

    excluir: async (req, res) => {
        const { idUsuario } = req;
        const { idFreelancer } = req.params;

        try {
            const freelancer = await Freelancer.findByPk(idFreelancer);

            if (!freelancer) {
                return res.render('home', { warning: 'Freelancer não encontrado' });
            }

            await freelancer.destroy();

            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                return res.render('home', { warning: 'Usuário não encontrado' });
            }

            const freelancers = await Freelancer.findAll({ where: { idUsuario } });

            return res.render('home', { success: 'Freelancer excluído com sucesso', usuario, freelancers });
        } catch (error) {
            console.log(error);

            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                return res.render('home', { error: 'Erro ao excluir freelancer e usuário não encontrado' });
            }

            return res.render('home', { error: 'Erro ao excluir freelancer', usuario });
        }
    }
};