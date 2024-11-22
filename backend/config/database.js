const Sequelize = require('sequelize');
const sequelize = new Sequelize('linkedout', 'postgres', 'root', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });

module.exports = sequelize;