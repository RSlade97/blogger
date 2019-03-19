var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

/* Get Home page. */
module.exports.home = function(req, res) {
  res.render('home', { title: 'Robert Slade Blog Site' });
};
