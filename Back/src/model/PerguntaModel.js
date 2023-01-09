const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const PerguntaSchema = new Schema({
    data:{type: Date, required: true},
    titulo:{type: String, required: true},
    resumo:{type: String, required: true},
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    urgencia: {type: String, enum: ['emergencia', 'muitoUrgente', 'urgente', 'poucoUrgente', 'naoUrgente'], required: true},
    especialidade:{type: String, enum: ['Pediatria', 'Ginecologia', 'Clínica Médica', "Cardiologia", "Neurologia",
    "Psiquiatria", "Endocrinologia", "Ortopedia", "Dermatologia", "Oftalmologia", "Anestesiologista", "Pediatra"], required: true},
    resposta:{type: String},
    userResposta:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    dataResposta:{type: Date},
    fator:{type: Number}
});

module.exports = mongoose.model('Pergunta', PerguntaSchema);