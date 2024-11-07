const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require('./routes/AuthRoutes'); // Importando as rotas de autenticação

const app = express();
app.use(express.json()); // Para processar requisições JSON

// Conectar ao MongoDB usando Mongoose
const uri = "mongodb+srv://daniellecristianini:<Dani158575>@cluster0.78cr1.mongodb.net/LinkedOut?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => {
        console.log("Conectado ao MongoDB com sucesso!");
    })
    .catch(err => {
        console.error("Erro ao conectar ao MongoDB:", err);
    });

// Usar rotas de autenticação
app.use('/LinkedOut/auth', AuthRoutes); // Usando /LinkedOut/auth como base para as rotas de Auth

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
