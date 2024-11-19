const express = require('express');
const cors = require('cors');
require('./models/relacoes');
require('dotenv').config();

const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors());

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const empresaRoute = require('./routes/empresaRoute');
const authMiddleware = require('./middlewares/authMiddleware');
const empresaController = require('./controllers/empresaController');
const userController = require('./controllers/userController');

app.use('/api/empresa', empresaRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/empresa/:idEmpresa', authMiddleware, empresaController.listar);

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.get('/home', authMiddleware, userController.listar);

app.get('/empresa', (req, res) => {
  res.render('empresa');
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