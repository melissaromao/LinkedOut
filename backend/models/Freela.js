const Sequelize = require('sequelize');
const database = require('../config/database');
const Empresa = require('./Empresa');
const Categoria = require('./Categoria');
const Candidatura = require('./Candidatura');

const Freela = database.define('freela', {
    idFreela: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    idEmpresa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Empresa,
            key: 'idEmpresa'
        }
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },

    idCategoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'idCategoria'
        }
    },

    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    dataCriacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

    dataValidade: {
        type: Sequelize.DATE
    },

    statusFreela: {
        type: Sequelize.ENUM,
        values: ['ABERTO', 'FINALIZADO'],
        defaultValue: 'ABERTO',
        allowNull: false
    }

}, {
    timestamps: false,
});

Freela.belongsTo(Empresa, {foreignKey: 'idEmpresa'});
Freela.hasMany(Candidatura, {foreignKey: 'idFreela'});
Freela.hasMany(Pagamento, {foreignKey: 'idFreela'});

module.exports = Freela;