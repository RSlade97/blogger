var request = require('request');
var apiOptions = {
  server : "http://54.172.245.253"
};
/* Get Home page. */
module.exports.home = function(req, res) {
  res.render('home', { title: 'Robert Slade Blog Site' });
};
