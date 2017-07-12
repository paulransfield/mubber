const express = require('express');

const app = express();

//express webserver request route handlers

app.get('/api', (req, res) => {
  res.send( { hi: "there" });
});

module.exports = app;
