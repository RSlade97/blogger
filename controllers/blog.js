/* Get Blog pages. */
module.exports.blogadd = function(req, res) {
  res.render('blogadd', { title: 'Blog Add' });
};

module.exports.bloglist = function(req, res) {
  res.render('bloglist', { title: 'Blog List' });
};
