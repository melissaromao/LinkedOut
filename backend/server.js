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
const freelancerRoute = require('./routes/freelancerRoute');
const categoriaRoute = require('./routes/categoriaRoute');
const freelaRoute = require('./routes/freelaRoute')
const candidaturaRoute = require('./routes/candidaturaRoute');
const authMiddleware = require('./middlewares/authMiddleware');
const empresaController = require('./controllers/empresaController');
const freelancerController = require('./controllers/freelancerController');
const userController = require('./controllers/userController');
const categoriaController = require('./controllers/categoriaController');
const freelaController = require('./controllers/freelaController');
const candidaturaController = require('./controllers/candidaturaController');
const Categoria = require('./models/Categoria');
const Freela = require('./models/Freela'); 
const Freelancer = require('./models/Freelancer'); 
const Candidatura = require('./models/Candidatura');

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/empresa', empresaRoute);
app.use('/api/freelancer', freelancerRoute);
app.use('/api/categoria', categoriaRoute);
app.use('/api/freela', freelaRoute);
app.use('/api/candidatura', candidaturaRoute);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.render('index', { layout: false });
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro', { layout: false });
});

app.get('/home', authMiddleware, userController.listar);

app.get('/empresa', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.render('empresa', { categorias });
  } catch (error) {
    console.error(error);
    res.render('empresa', { error: 'Erro ao carregar categorias' });
  }
});

app.get('/empresa/:idEmpresa', authMiddleware, empresaController.listar);

app.get('/freelancer', (req, res) => {
  res.render('freelancer');
});

app.get('/freelancer/:idFreelancer', authMiddleware, freelancerController.listar);

app.get('/categoria', (req, res) => {
  res.render('categoria');
});

app.get('/categorias', categoriaController.findAll);

app.get('/freelaEditar/:idFreela', authMiddleware, freelaController.listar);

app.get('/empresa/:idEmpresa/freela', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    const idEmpresa = req.params.idEmpresa; 
    res.render('freela', { idEmpresa: idEmpresa, categorias: categorias });
  } catch (error) {
    console.log(error); 
    res.render('empresa', { error: 'Erro ao carregar categorias' });
  }
});

app.get('/freelas', authMiddleware, freelaController.listarFreelas);

app.get('/candidatura/:idFreela', async (req, res) => {
  const idFreela = req.params.idFreela;
  
  try {
      const freela = await Freela.findByPk(idFreela);
      if (!freela) {
          return res.status(404).send('Freela não encontrado');
      }

      const freelancers = await Freelancer.findAll(); 
      res.render('candidatura', { freela, freelancers }); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar freela');
  }
});

app.post('/candidatura/:idFreela', async (req, res) => {
  const { idFreelancer } = req.body; 
  const idFreela = req.params.idFreela; 

  try {
      const freela = await Freela.findByPk(idFreela);
      if (!freela) {
          return res.status(404).send('Freela não encontrado');
      }

      const freelancer = await Freelancer.findByPk(idFreelancer);
      if (!freelancer) {
          return res.status(404).send('Freelancer não encontrado');
      }

      const candidatura = await Candidatura.create({
          idFreela: freela.idFreela,
          idFreelancer: freelancer.idFreelancer,
      });

      if (candidatura) {
        res.redirect('/home')
      } else {
          res.status(500).send('Erro ao criar candidatura');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao processar candidatura');
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync({ force: false });
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