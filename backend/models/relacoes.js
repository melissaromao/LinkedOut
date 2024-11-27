const Usuario = require('./Usuario');
const Freelancer = require('./Freelancer');
const Empresa = require('./Empresa');
const Categoria = require('./Categoria');
const Freela = require('./Freela');
const Candidatura = require('./Candidatura');
const Notificacao = require('./Notificacao');
const Pagamento = require('./Pagamento');

Usuario.hasOne(Freelancer, {foreignKey: 'idUsuario'});
Usuario.hasMany(Empresa, {foreignKey: 'idUsuario'});

Freelancer.belongsTo(Usuario, {foreignKey: 'idUsuario'});
Freelancer.hasMany(Candidatura, {foreignKey: 'idFreelancer'});
Freelancer.hasMany(Pagamento, {foreignKey: 'idFreelancer'});

Empresa.belongsTo(Usuario, {foreignKey: 'idUsuario'});
Empresa.hasMany(Freela, {foreignKey: 'idEmpresa'});
Empresa.belongsTo(Categoria, { foreignKey: 'idCategoria' });

Pagamento.belongsTo(Freelancer, {foreignKey: 'idFreelancer'});
Pagamento.belongsTo(Freela, {foreignKey: 'idFreela'});

Freela.belongsTo(Empresa, {foreignKey: 'idEmpresa', as: 'Empresa'});
Freela.hasMany(Candidatura, {foreignKey: 'idFreela'});
Freela.hasMany(Pagamento, {foreignKey: 'idFreela'});
Freela.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'Categoria'});

Categoria.hasMany(Freela, { foreignKey: 'idCategoria' });
Categoria.hasMany(Empresa, { foreignKey: 'idCategoria' });

Candidatura.belongsTo(Freelancer, {foreignKey: 'idFreelancer'});
Candidatura.belongsTo(Freela, {foreignKey: 'idFreela'});

module.exports = {
    Usuario,
    Freelancer,
    Empresa,
    Categoria,
    Freela,
    Candidatura,
    Notificacao,
    Pagamento,
};