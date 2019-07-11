const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

app.use(express.static('./public'));

app.use('/tweets', tweets);

module.exports = app;
