let express = require('express');
let router = express.Router();

const { tweets, info } = require('../tweets.json');

router.get('/', (req, res) => {
  res.send(tweets);
});

router.post('/', (req, res) => {
  const { handle, text } = req.body.tweet;
  if(!handle) return res.status(400).json('Please provide a handle with your tweet.');
  if(!text) return res.status(400).json('Please provide some text for your tweet.');

  info.count++;

  const newTweet = {
    handle: handle,
    text: text,
    _id: info.count
  };

  tweets.push(newTweet);

  return res.status(200).json(newTweet);
});

module.exports = router;
