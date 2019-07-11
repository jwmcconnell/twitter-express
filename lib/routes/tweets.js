let express = require('express');
let router = express.Router();

const { tweets, info } = require('../tweets.json');

router.get('/', (req, res) => {
  res.send(tweets);
});

router.post('/', (req, res) => {
  info.count++;

  const newTweet = {
    handle: req.body.tweet.handle,
    text: req.body.tweet.text,
    _id: info.count
  };

  tweets.push(newTweet);

  return res.status(200).json(newTweet);
});

module.exports = router;
