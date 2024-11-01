const sequelize = require('./config/database');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bem-vindo ao LinkedOut!');
});

//testando conexão com banco de dados
app.get('/check-database', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send('Conectado ao banco de dados com sucesso');
} catch(error) {
    res.status(500).send('Erro ao conectar ao banco de dados' +error.message);
}
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});