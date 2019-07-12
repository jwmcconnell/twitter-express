const Tweet = require('../models/Tweet');
let express = require('express');
let Router = express.Router();

module.exports = Router
  .get('/', (req, res) => {
    Tweet
      .find({})
      .lean()
      .then(tweets => res.send(tweets))
      .catch(err => res.send(err));
  })
  .post('/', (req, res) => {
    const { handle, text } = req.body;
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
    const { id } = req.params;

    Tweet
      .findById(id)
      .lean()
      .then(tweet => res.send(tweet))
      .catch(err => res.status(400).json(err));
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .then(tweet => res.send(tweet))
      .catch(err => res.status(400).json(err));
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const { handle, text } = req.body;

    if(!handle) return res.status(400).json('Please provide a handle with your tweet.');
    if(!text) return res.status(400).json('Please provide some text for your tweet.');

    Tweet
      .findOneAndUpdate(
        { _id: id },
        { handle, text },
        {
          new: true,
          useFindAndModify: false
        }
      )
      .then(tweet => res.send(tweet))
      .catch(err => res.send(err));
  });
