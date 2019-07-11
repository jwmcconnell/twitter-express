const request = require('supertest');
const app = require('../lib/app');

const expectedTweets = require('../lib/tweets.json').tweets;

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

  it('creates a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ tweet: { handle: 'bob', text: 'I am test tweet' } })
      .then(res => {
        expect(res.body).toEqual({ handle: 'bob', text: 'I am test tweet', _id: 1 });
        expect(res.body).toEqual(expect.any(Object));
      });
  });
});
