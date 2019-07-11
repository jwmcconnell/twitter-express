const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tweets = require('./routes/tweets');

app.use(bodyParser.json());

app.use(express.static('./public'));

app.use('/tweets', tweets);

module.exports = app;
