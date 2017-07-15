const Driver = require('../models/driver');

module.exports = {
  // each key value pair represents a request handler
  greeting(req, res) {
    res.send({ hi : "there" });
  },

  index(req, res, next) {
    //refer mongoose docs on geoNear and GeoJSON
    const lng = req.query.lng;
    const lat = req.query.lat;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId}, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(() => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id:  driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
