const Sequelize = require('sequelize');
const database = require('../config/database');
const Freelancer = require('./Freelancer');
const Empresa = require('./Empresa');

const Usuario = database.define('usuario', {
    idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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

Usuario.hasOne(Freelancer, {foreignKey: 'idUsuario'});
Usuario.hasOne(Empresa, {foreignKey: 'idUsuario'});

module.exports = Usuario;