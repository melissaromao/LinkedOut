const Sequelize = require('sequelize');
const database = require('../config/database');
const Freela = require('./Freela');
const Freelancer = require('./Freelancer');

const Candidatura = database.define('candidatura', {
    idCandidatura: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    idFreela: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Freela,
            key: 'idFreela'
        }
    },
    
    idFreelancer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Freelancer,
            key: 'idFreelancer'
        }
    },

    dataCandidatura: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

    statusCandidatura: {
        type: Sequelize.ENUM,
        values: ['PENDENTE', 'ACEITA', 'RECUSADA'],
        defaultValue: 'PENDENTE',
        allowNull: false
    },

    dataAceitacao: {
        type: Sequelize.DATE
    }
    
}, {
    timestamps: false,
});

Candidatura.belongsTo(Freelancer, {foreignKey: 'idFreelancer'});
Candidatura.belongsTo(Freela, {foreignKey: 'idFreela'});

module.exports = Candidatura;