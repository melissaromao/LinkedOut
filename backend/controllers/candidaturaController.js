const Candidatura = require('../models/Candidatura');
const Freela = require('../models/Freela');
const Freelancer = require('../models/Freelancer');
const Usuario = require('../models/Usuario');
const freelaController = require('./freelaController');

module.exports = {

    candidatar: async (req, res) => {
        const idFreelancer = req.body.idFreelancer;  
        const idFreela = req.params.idFreela;
    
        try {
            const freelancers = await Freelancer.findAll();  
    
            const freela = await Freela.findByPk(idFreela);
            if (!freela) {
                return res.render('home', { error: 'Vaga não encontrada' });
            }
    
            const freelancer = await Freelancer.findByPk(idFreelancer);
            if (!freelancer) {
                return res.render('home', { error: 'Freelancer não encontrado' });
            }
    
            const candidatura = await Candidatura.create({
                idFreela: freela.idFreela,
                idFreelancer: freelancer.idFreelancer,
            });
    
            if (!candidatura) {
                return res.render('home', { error: 'Erro ao criar candidatura' });
            }

            const candidaturas = await Candidatura.findAll({
                where: { idFreelancer },
                include: [{ model: Freela }] 
            });
    
            return res.render('freelancerHome', { success: 'Candidatura criada com sucesso!', freelancer, candidaturas });
        } catch (error) {
            console.log(error);
            return res.render('home', { error: 'Erro ao processar candidatura' });
        }
    },
            
    listarCandidaturas: async (req, res) => {
        const { idFreelancer } = req.params;

        try {
            const candidaturas = await Candidatura.findAll({
                where: { idFreelancer },
                include: [{ model: Freela }] 
            });

            return res.status(200).json({ candidaturas });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar candidaturas' });
        }
    },

    cancelarCandidatura: async (req, res) => {
        const { idCandidatura } = req.params;
    
        try {
            const candidatura = await Candidatura.findByPk(idCandidatura);
            if (!candidatura) {
                return res.status(404).json({ error: 'Candidatura não encontrada' });
            }
    
            const { idFreelancer } = candidatura;
    
            await candidatura.destroy();
    
            const freelancer = await Freelancer.findByPk(idFreelancer);
            if (!freelancer) {
                return res.render('home', { error: 'Freelancer não encontrado' });
            }
    
            const candidaturas = await Candidatura.findAll({
                where: { idFreelancer },
                include: [{ model: Freela }],
            });
    
            return res.render('freelancerHome', {
                success: 'Candidatura cancelada com sucesso',
                freelancer,
                candidaturas,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cancelar candidatura' });
        }
    },
    
    atualizarStatus: async (req, res) => {
        const { idCandidatura } = req.params;
        const { statusCandidatura } = req.body;

        if (!['ACEITA', 'RECUSADA'].includes(statusCandidatura)) {
            return res.status(400).json({ error: 'Status inválido' });
        }

        try {
            const candidatura = await Candidatura.findByPk(idCandidatura);
            if (!candidatura) {
                return res.status(404).json({ error: 'Candidatura não encontrada' });
            }

            candidatura.statusCandidatura = statusCandidatura;
            candidatura.dataAceitacao = statusCandidatura === 'ACEITA' ? new Date() : null;
            await candidatura.save();

            return res.status(200).json(candidatura);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar status' });
        }
    }
};
