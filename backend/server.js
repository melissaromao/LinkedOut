const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const cors = require('cors');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors());

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const categoriaRoute = require('./routes/categoriaRoute');

const empresaRoute = require('./routes/empresaRoute');
const authMiddleware = require('./middlewares/authMiddleware');
const empresaController = require('./controllers/empresaController');
const userController = require('./controllers/userController');
const categoriaController = require('./controllers/categoriaController');


app.use('/api/empresa', empresaRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/categoria', categoriaRoute);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.send('Bem-vindo ao LinkedOut!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    // Sincronizar as tabelas com o banco de dados
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('SUCESSO!\nTABELAS SINCRONIZADAS');
    // Iniciar o servidor após a conexão e a sincronização do banco de dados

    app.get('/categoria/categoriaFindAll', async (req, res) => {
      try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
      }
    });

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });
