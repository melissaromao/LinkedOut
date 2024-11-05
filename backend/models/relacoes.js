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

Pagamento.belongsTo(Freelancer, {foreignKey: 'idFreelancer'});
Pagamento.belongsTo(Freela, {foreignKey: 'idFreela'});

Freela.belongsTo(Empresa, {foreignKey: 'idEmpresa'});
Freela.hasMany(Candidatura, {foreignKey: 'idFreela'});
Freela.hasMany(Pagamento, {foreignKey: 'idFreela'});


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