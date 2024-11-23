const Sequelize = require('sequelize');
const sequelize = new Sequelize('linkedout', 'postgres', 'dani158575', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5433
});
sequelize.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err);
    });

module.exports = sequelize;
