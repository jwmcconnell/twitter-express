const request = require('supertest');
const app = require('../lib/app');

const expectedTweets = require('../lib/tweets.json');

describe('Twitter clone static page', () => {
  it('returns a home page', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Twitter</h1>'));
      });
  });
});

describe('Twitter routes', () => {
  it('returns all tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => {
        const tweets = JSON.parse(res.text);
        expect(tweets).toEqual(expectedTweets);
        expect(tweets).toEqual(expect.any(Array));
      });
  });
});
