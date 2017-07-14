const Driver = require('../models/driver');

module.exports = {
  // each key value pair represents a request handler
  greeting(req, res) {
    res.send({ hi : "there" });
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  }
};
