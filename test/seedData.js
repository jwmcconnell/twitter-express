const Tweet = require('../lib/models/Tweet');

function seedData() {
  return Promise.all([...Array(1)].map(() => {
    const handle = 'Jack';
    const text = 'This is a test tweet';
    return Tweet.create({ handle, text });
  }));
}

module.exports = seedData;
