const Sequelize = require('sequelize');
const database = require('../config/database');

const Usuario = database.define('usuario', {
    idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    nome: {
        type: Sequelize.STRING,
    },
    
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
    timestamps: false,
});

module.exports = Usuario;