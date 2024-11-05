const Sequelize = require('sequelize');
const database = require('../config/database');
const Usuario = require('./Usuario');

const Freelancer = database.define('freelancer', {
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    },

    idFreelancer: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    tituloProfissional: {
        type: Sequelize.STRING
    },

    sobreMim: {
        type: Sequelize.STRING,
        allowNull: false
    },

    dataNasc: {
        type: Sequelize.DATE,
        allowNull: false
    },

    foto: {
        type: Sequelize.STRING
    },

    latitude: {
        type: Sequelize.FLOAT
    },

    longitude: {
        type: Sequelize.FLOAT
    }
    
}, {
    timestamps: false,
});

module.exports = Freelancer;