const express = require('express');
const sequelize = require('./config/database');
require('./models/relacoes');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bem-vindo ao LinkedOut!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync({force: false});
  })
  .then(() => {
    console.log('SUCESSO!\nTABELAS SINCRONIZADAS')
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });