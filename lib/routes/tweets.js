let express = require('express');
let router = express.Router();

const tweets = require('../tweets.json');

router.get('/', (req, res) => {
  res.send(tweets);
});

module.exports = router;
