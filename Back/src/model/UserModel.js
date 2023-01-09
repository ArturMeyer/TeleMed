const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    CPF:{type: String, required: true},
    senha:{type: String, required: true},
    nome:{type: String, required: true},
    email:{type: String, required: true},
    tipo: {type: String, enum: ['estagiario', 'medicoUBS', 'especialista'], required: true},
    especialidade: {type: String, enum: ['Pediatria', 'Ginecologia', 'Clínica Médica', "Cardiologia", "Neurologia",
    "Psiquiatria", "Endocrinologia", "Ortopedia", "Dermatologia", "Oftalmologia", "Anestesiologista", "Pediatra"]},
    respostas:[{type: mongoose.Schema.Types.ObjectId, ref:'Pergunta'}],
    token:{type: String}
});

module.exports = mongoose.model('User', UserSchema);