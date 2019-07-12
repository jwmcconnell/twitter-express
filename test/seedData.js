const Tweet = require('../lib/models/Tweet');

const seedTweets = [
  {
    handle: 'Jack',
    text: 'This is a test tweet'
  },
  {
    handle: 'Lance',
    text: 'Hello there'
  }
];

function seedData() {
  return Promise.all(seedTweets.map(tweet => {
    const { handle, text } = tweet;
    return Tweet.create({ handle, text });
  }));
}

module.exports = seedData;
