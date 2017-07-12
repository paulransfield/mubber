const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    request(app) //using supertest library
      .post('/api/drivers')
      .send({ email: 'test@test.com' }) //sending along data to test required email schema
      .end(() => {
        done();
      });
  });
});
