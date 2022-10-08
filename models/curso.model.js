const mongoose = require('mongoose')

const Curso = mongoose.model('Curso', {
    nome: String,
    duracao: String,
    modalidade: String,
    nivel: String,
    cargaHoraria: String,
})

module.exports = Curso