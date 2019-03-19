var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

/* Show errors */
var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Can't find the page, does it exist?";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "There was a problem with the server.";
  } else {
    title = status + ", something somewhere went wrong";
    content = "Something besides 404 and 500 error occurred.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

/* Add blog */
module.exports.blogAdd = function(req, res) {
  res.render('blogAdd', { title: 'Add Blog'});
};

/* Add blog post */
module.exports.blogAddPost = function(req, res) {
  var requestOptions, path, postdata;
  path = '/api/blogs/';

  postdata = {
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText
  };

  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };

  request(
    requestOptions,
    function(err, response, body) {
      if (response.statusCode === 201) {
        res.redirect('/blogsList');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};  

/* Show blog */
module.exports.blogShow = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs" + req.params.id;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderShowPage(req, res, body);
    }
  );
};

/* Render show blog page */
var renderShowPage = function(req, res, responseBody) {
  res.render('blogShow', {
    title : 'Blog Info',
    pageHeader : {
      title : 'Blog Info'
    },
    blogs : responseBody
  });
};

/* List blogs */
module.exports.blogsList = function(req, res) {
  var requestOptions, path;
  path = '/api/blogs';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderListPage(req, res, body);
    }
  );
};

/* Render the blog list page */
var renderListPage = function(req, res, responseBody) {
  res.render('blogsList', {
    title : 'Blog List',
    pageHeader : {
      title : 'Blog List'
    },
    blogs : responseBody
  });
};

/* Blog edit */
module.exports.blogEdit = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.id;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderEditPage(req, res, body);
    }
  );
};

/* Blog edit post */
module.exports.blogEditPost = function (req, res) {
  var requestOptions, path, postdata;
  var id = req.params.id;
  path = '/api/blogs/' + id;
  postdata = {
    blogTitle : req.body.blogTitle,
    blogText : req.body.blogText
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "PUT",
    json : postdata
  };
  request(
    requestOptions,
    function(err, response, body) {
      if (response.statusCode === 201) {
        res.redirect('/blogList');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Render the blog edit page */
var renderEditPage = function(req, res, responseBody) {
  res.render('blogEdit', {
    title : 'Blog Edit',
    pageHeader : {
      title : 'Blog Edit'
    },
    blog : responseBody
  });
};

/* Blog delete */
module.exports.blogDelete = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.id;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderDeletePage(req, res, body);
    }
  );
};

/* Blog delete post */
module.exports.blogDeletePost = function (req, res) {
  var requestOptions, path, postdata;
  var id = req.params.id;
  path = '/api/blogs/' + id;
  requestOptions = {
    url : apiOptions.server + path,
    method : "DELETE",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      if (response.statusCode === 204) {
        res.redirect('/blogList');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
}

/* Render the blog delete page */
var renderDeletePage = function (req, res, responseBody) {
  res.render('blogDelete', {
    title : 'Blog Delete',
    pageHeader : {
      title : 'Blog Delete'
    },
    blog : responseBody
  });
};
