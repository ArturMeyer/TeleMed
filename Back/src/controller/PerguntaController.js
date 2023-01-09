const { response } = require('express');
const PerguntaModel = require('../model/PerguntaModel');
const UserModel = require('../model/UserModel');

class PerguntaController {

    async cadastro(req, res) {
        console.log(req.body)
        const Pergunta = new PerguntaModel(req.body);
        await Pergunta
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json(error);
            })
    }

    async dados(req, res) {
        await PerguntaModel.findById(req.params.id).then(response => {
            return res.status(200).json(response);
        })
            .catch(error => {
                console.log(error);
                return res.status(500).json(error);
            })
    }

    async responder(req, res) {
        try {
            const Pergunta = await PerguntaModel.findById(req.body.id);
            Pergunta.resposta = req.body.resposta;
            Pergunta.userResposta = req.body.userResposta;
            Pergunta.dataResposta = req.body.dataResposta;
            Pergunta.fator = 0;

            await Pergunta.save();

            const User = await UserModel.findById(req.body.userResposta);
            User.respostas.push(Pergunta)

            await User.save()

            return res.status(200).json({ Pergunta, User });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    async all(req, res) {
        try {
            const Perguntas = await PerguntaModel.find().sort({ fator: -1 });
            return res.status(200).json(Perguntas);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    async userPerguntas(req, res) {
        try {
            const Perguntas = await PerguntaModel.find({ user: req.params.id }).sort({ fator: -1 });
            return res.status(200).json(Perguntas);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    async getRespostas(req, res) {
        try {
            const Perguntas = await PerguntaModel.find({ userResposta: req.body.id }).sort({ fator: -1 });
            return res.status(200).json(Perguntas);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = new PerguntaController();