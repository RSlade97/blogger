/* Get Blog pages. */
module.exports.blogadd = function(req, res) {
  res.render('blogadd', { title: 'Add Blog' });
};

module.exports.bloglist = function(req, res) {
  res.render('bloglist', { title: 'List Blogs',
                           blogs: [{
                                      blogTitle: 'Welcome',
                                      blogText: 'Sample Text',
                                      createdOn: '24 February 2019'
                                  }, {
                                      blogTitle: 'To',
                                      blogText: 'More Sample Text',
                                      createdOn: '24 February 2219',
                                  }, {
                                      blogTitle: 'My Blog!',
                                      blogText: 'Even More Sample Text',
                                      createdOn: '24 February 2319'
                                  }] 
                         });
};

module.exports.blogedit = function (req, res) {
  res.render('blogedit', { title: 'Edit Blog',
	                   message: 'Under construction' });
};

module.exports.blogdelete = function (req, res) {
  res.render('blogdelete', { title: 'Delete Blog',
                             message: 'Under construction' });
};
