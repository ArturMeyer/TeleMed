const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const server = express();

server.use(express.static(path.join(__dirname,  '../public')));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

const api = require('./router/api.js');

server.use('/api', api);

server.listen(process.env.PORT, () => {
    console.log('ONLINE');
})