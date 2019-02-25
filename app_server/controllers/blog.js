/* Get Blog pages. */
module.exports.blogadd = function(req, res) {
  res.render('blogadd', { title: 'Add Blog' });
};

module.exports.bloglist = function(req, res) {
  res.render('bloglist', { title: 'List Blogs' });
};
