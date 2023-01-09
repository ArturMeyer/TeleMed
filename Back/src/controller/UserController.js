const { response } = require('express');
const PerguntaModel = require('../model/PerguntaModel');
const UserModel = require('../model/UserModel');

const bcrypt = require('bcrypt');

class PerguntaController {

    async cadastro(req, res) {
        console.log(req.body)
        const User = new UserModel(req.body);
        await User
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
        await UserModel.findById(req.params.id).then(response => {
            return res.status(200).json(response);
        })
            .catch(error => {
                console.log(error);
                return res.status(500).json(error);
            })
    }

    async login(req, res) {
        await UserModel.findOne(req.body).then(response => {
            console.log(response);
            return res.status(200).json(response);
        })
            .catch(error => {
                console.log(error);
                return res.status(500).json(error);
            })
    }
}

module.exports = new PerguntaController();