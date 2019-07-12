require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Tweet = require('../lib/models/Tweet');

const connect = require('../lib/utils/connect');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});

const getTweet = () => {
  return Tweet
    .findOne()
    .then(tweet => {
      return JSON.parse(JSON.stringify(tweet));
    });
};

module.exports = {
  getTweet
};
