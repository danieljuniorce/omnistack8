const express = require('express');
const mongoose = require('mongoose');

const server = express();

const routes = require('./routes');

mongoose.connect('mongodb+srv://danieljuniorce:86318162@baja-tnmqj.mongodb.net/tindev?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(express.json());

server.use(routes);

server.listen(3000);