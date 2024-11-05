const Sequelize = require('sequelize');
const database = require('../config/database');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');

const Empresa = database.define('empresa', {
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    },

    idEmpresa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    cnpj: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    sobreNos: {
        type: Sequelize.STRING,
        allowNull: false
    },

    idCategoria: {
        type: Sequelize.INTEGER,
        references: {
            model: Categoria,
            key: 'idCategoria'
        }
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

module.exports = Empresa;