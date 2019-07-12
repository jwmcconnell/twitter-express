const Tweet = require('../models/Tweet');
let express = require('express');
let Router = express.Router();

const { tweets } = require('../tweets.json');

module.exports = Router
  .get('/', (req, res) => {
    Tweet
      .find({})
      .lean()
      .then(tweets => res.send(tweets))
      .catch(err => res.send(err));
  })
  .post('/', (req, res) => {
    const { handle, text } = req.body.tweet;
    if(!handle) return res.status(400).json('Please provide a handle with your tweet.');
    if(!text) return res.status(400).json('Please provide some text for your tweet.');

    Tweet
      .create({
        handle,
        text
      })
      .then(tweet => {
        res.send(tweet);
      });
  })
  .get('/:id', (req, res) => {
    let { id } = req.params;

    Tweet
      .findById(id)
      .lean()
      .then(tweet => res.send(tweet))
      .catch(err => res.status(400).json(err));
  })
  .delete('/:id', (req, res) => {
    let { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .then(tweet => res.send(tweet))
      .catch(err => res.status(400).json(err));
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
