const express = require('express');
const sequelize = require('./config/database');  // Conexão com o banco de dados
const categoriaRoutes = require('./routes/categoriaRoutes');  // Importando as rotas de categoria
require('./models/relacoes');  // Carregar as relações (associações do Sequelize)

const app = express();
const port = 3000;

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

// Usando as rotas de categoria
app.use('/api', categoriaRoutes);

// Teste de conexão com o banco de dados e inicialização do servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    // Sincronizar as tabelas com o banco de dados
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('SUCESSO!\nTABELAS SINCRONIZADAS');
    // Iniciar o servidor após a conexão e a sincronização do banco de dados
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });
