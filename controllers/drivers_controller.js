module.exports = {
  // each key value pair represents a request handler
  greeting(req, res) {
    res.send({ hi : "there" });
  },

  create(req, res) {
    console.log(req.body);
    res.send({ hi : "there" });
  }
};
