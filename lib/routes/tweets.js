let express = require('express');
let Router = express.Router();

const { tweets, info } = require('../tweets.json');

module.exports = Router
  .get('/', (req, res) => {
    res.send(tweets);
  })
  .post('/', (req, res) => {
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
  })
  .get('/:id', (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const tweet = tweets.find(tweet => tweet._id === id) || {};
    tweet._id
      ? res.status(200).json(tweet)
      : res.status(400).json('No tweet found with this id.');
  })
  .delete('/:id', (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let deletedTweet;

    for(let i = 0; i < tweets.length; i++) {
      if(tweets[i]._id === id) deletedTweet = tweets.splice(i, 1);
      break;
    }

    return res.status(200).json(deletedTweet[0]);
  })
  .put('/:id', (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const { handle, text } = req.body;

    if(!handle) return res.status(400).json('Please provide a handle with your tweet.');
    if(!text) return res.status(400).json('Please provide some text for your tweet.');

    const updatedTweet = { handle, text, _id: id };

    let tweetIndex;

    for(let i = 0; i < tweets.length; i++) {
      if(tweets[i]._id === id) {
        tweets[i] = updatedTweet;
        tweetIndex = i;
        break;
      }
    }

    return res.status(200).json(tweets[tweetIndex]);
  });
