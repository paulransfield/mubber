const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', (done) => {
    Driver.count().then(count => { //coount drivers for test comparison
      request(app) //using supertest library
        .post('/api/drivers')
        .send( { email: 'test@test.com' } ) //sending along data to test required email schema
        .end(() => {
          Driver.count().then(newCount => { //compare count after test data sent to mongo
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
});
