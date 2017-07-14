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

  it('PUT to /api/drivers/id edits an existing driver', (done) => {
    //step 1 create a driver - test changing driving from false to true
    const driver = new Driver({ email: 't1@t.com', driving: false });
    //step 2 save and edit the new driver 'driving flag'
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`) //es6 syntax equivalent to ('/api/drivers/' + driver_id)
        .send({ driving: true })
        .end(() => {
          // step 3 test to find driver in mongo where flag for driver_id is now true
          Driver.findOne({ email: 't1@t.com' })
            .then(driver => {
              assert(driver.driving === true);
              done();
            });
        });
    });
  });
});
