const Sequelize = require('sequelize');
const database = require('../config/database');

const Categoria = database.define('categoria', {
    idCategoria: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.STRING,
    },

}, {
    timestamps: false,
});

module.exports = Categoria;