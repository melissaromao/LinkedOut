const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    CPF: {
        type: String,
        required: true,
        unique: true,
    },
    dataNasc: {
        type: Date,
        required: true,
    },
    tituloProfissional: {
        type: String,
        required: true,
    },
    foto: {
        type: String, // URL da foto
        default: '',
    },
    sobreMim: {
        type: String,
        default: '',
    },
});

const Freelancer = mongoose.model('Freelancer', FreelancerSchema);
module.exports = Freelancer;
