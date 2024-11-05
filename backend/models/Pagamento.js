const Sequelize = require('sequelize');
const database = require('../config/database');
const Freelancer = require('./Freelancer');
const Freela = require('./Freela');

const Pagamento = database.define('pagamento', {
    idPagamento: {
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

    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    dataPagamento: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

}, {
    timestamps: false,
});

Pagamento.belongsTo(Freelancer, {foreignKey: 'idFreelancer'});
Pagamento.belongsTo(Freela, {foreignKey: 'idFreela'});

module.exports = Pagamento;