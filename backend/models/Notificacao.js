const Sequelize = require('sequelize');
const database = require('../config/database');
const Usuario = require('./Usuario');

const Notificacao = database.define('notificacao', {
    idNotificacao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    },

    mensagem: {
        type: Sequelize.STRING,
        allowNull: false
    },

    dataEnvio: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },

    statusNotificacao: {
        type: Sequelize.ENUM,
        values: ['NÃO LIDA', 'LIDA'],
        defaultValue: 'NÃO LIDA',
        allowNull: false
    }

}, {
    timestamps: false,
});

module.exports = Notificacao;