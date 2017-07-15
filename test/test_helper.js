const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/muber_test', {useMongoClient: true});
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  const drivers = mongoose.connection.collections.drivers;
  drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates':'2dsphere' })) //persist coordinates from being dropped
    .then(() => done())
    .catch(() => done()); //for when database doesn't exist
});
