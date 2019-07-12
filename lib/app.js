const express = require('express');
const bodyParser = require('body-parser');

const tweets = require('./routes/tweets');

const app = express();

app.use(bodyParser.json());

app.use(express.static('./public'));

app.use('/api/v1/tweets', tweets);

module.exports = app;
