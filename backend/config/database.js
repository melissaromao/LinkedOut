const Sequelize = require('sequelize');
const sequelize = new Sequelize('linkedout', 'postgres', 'root', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
});

const Usuario = require('../models/Usuario');
const Freelancer = require('../models/Freelancer');
const Empresa = require('../models/Empresa');
const Categoria = require('../models/Categoria');
const Freela = require('../models/Freela');
const Candidatura = require('../models/Candidatura');
const Notificacao = require('../models/Notificacao');
const Pagamento = require('../models/Pagamento');

(async () => {
    try {
        await sequelize.sync({force: false});
        console.log('Sucesso ao sincronizar tabelas');
    } catch(error) {
        console.log('Erro ao sincronizar tabelas', error);
    }
})();

module.exports = sequelize;