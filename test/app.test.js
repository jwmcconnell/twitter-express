const { getTweet } = require('./dataHelpers');
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

describe('POST tweet route', () => {
  it('creates a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ tweet: { handle: 'bob', text: 'I am test tweet' } })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: expect.any(String),
          text: expect.any(String),
          __v: 0
        });
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

describe('GET tweets route', () => {
  it('returns all tweets', () => {
    return request(app)
      .get('/api/v1/tweets')
      .then(res => {
        const tweets = JSON.parse(res.text);
        expect(tweets).toEqual(expect.any(Array));
        expect(tweets[0]).toEqual({
          _id: expect.any(String),
          handle: expect.any(String),
          text: expect.any(String),
          __v: 0
        });
        expect(res.status).toEqual(200);
      });
  });
});

describe('GET tweet by id route', () => {
  it('returns the requested tweet', async() => {
    const { _id, handle, text } = await getTweet();
    return request(app)
      .get(`/api/v1/tweets/${_id}`)
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.body).toBeTruthy();
        expect(res.body.handle).toEqual(handle);
        expect(res.body.text).toEqual(text);
      });
  });
});

describe('DELETE tweet by id route', () => {
  it('deletes and returns the requested tweet', async() => {
    const { _id, handle, text } = await getTweet();
    return request(app)
      .delete(`/api/v1/tweets/${_id}`)
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.body._id).toEqual(_id);
        expect(res.body.handle).toEqual(handle);
        expect(res.body.text).toEqual(text);
      });
  });
});
