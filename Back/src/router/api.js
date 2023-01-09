const express = require('express');
const router = express.Router();

const PerguntaController = require('../controller/PerguntaController');
const UserController = require('../controller/UserController');

router.post('/Pergunta/cadastrar', PerguntaController.cadastro);
router.get('/Pergunta/get/:id', PerguntaController.dados);
router.post('/Pergunta/responder', PerguntaController.responder);
router.get('/Pergunta/all', PerguntaController.all);
router.get('/Pergunta/userPerguntas/:id', PerguntaController.userPerguntas);
router.post('/Pergunta/respostas', PerguntaController.getRespostas);

router.post('/User/cadastrar', UserController.cadastro);
router.get('/User/get/:id', UserController.dados);
router.post('/User/login', UserController.login);


module.exports = router;