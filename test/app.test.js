const request = require('supertest');
const app = require('../lib/app');

const expectedTweets = require('../lib/tweets.json').tweets;

describe('Twitter clone static page', () => {
  it('returns a home page', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Twitter</h1>'));
        expect(res.status).toEqual(200);
      });
  });
});

describe('Twitter routes', () => {
  it('creates a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ tweet: { handle: 'bob', text: 'I am test tweet' } })
      .then(res => {
        expect(res.body).toEqual({ handle: 'bob', text: 'I am test tweet', _id: 1 });
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it('returns all tweets', () => {
    return request(app)
      .get('/api/v1/tweets')
      .then(res => {
        const tweets = JSON.parse(res.text);
        expect(tweets).toEqual(expectedTweets);
        expect(tweets).toEqual(expect.any(Array));
        expect(res.status).toEqual(200);
      });
  });

  it('returns an error for a tweet without a handle', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ tweet: { handle: '', text: 'I am test tweet' } })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('Please provide a handle with your tweet.');
      });
  });

  it('returns an error for a tweet without text', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ tweet: { handle: 'jack', text: '' } })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('Please provide some text for your tweet.');
      });
  });
});

describe('get a tweet by id route', () => {
  beforeEach(() => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ tweet: { handle: 'jack', text: 'This is a test tweet' } });
  });

  it('returns a requested tweet', () => {
    return request(app)
      .get('/api/v1/tweets/2')
      .then(res => {
        expect(res.body).toEqual({ handle: 'jack', text: 'This is a test tweet', _id: 2 });
      });
  });

  it('returns a requested tweet', () => {
    return request(app)
      .get('/api/v1/tweets/100000')
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('No tweet found with this id.');
      });
  });
});

describe('delete a tweet by id route', () => {
  it('deletes a tweet for a given id', () => {
    return request(app)
      .delete('/api/v1/tweets/1')
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expectedTweets);
      });
  });
});
