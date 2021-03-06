var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.blogsList = function (req, res) {
  console.log('Getting blog list');
  Blog
  .find()
  .exec(function(err, results) {
    if (!results) {
      sendJSONresponse(res, 404, {
        "message" : "No blogs found"
      });
      return;
    } else if (err) {
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    console.log(results);
    sendJSONresponse(res, 200, buildBlogsList(req, res, results));
  });
};

var buildBlogsList = function(req, res, results) {
  var blogs = [];
  results.forEach(function(obj) {
    blogs.push({
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      createdOn: obj.createdOn,
      email: obj.email,
      name: obj.name,
      comment: obj.comment,
      _id: obj._id
    });
  });
  return blogs;
};

module.exports.blogShow = function (req, res) {
  console.log('Finding blog details', req.params);
  if (req.params && req.params.id) {
    Blog
    .findById(req.params.id)
    .exec(function(err, blog) {
      if(!blog) {
        sendJSONresponse(res, 404, {
          "message" : "blogid not found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(blog);
      sendJSONresponse(res, 200, blog);
    });
  } else {
    console.log('No id specified');
    sendJSONresponse(res, 404, {
      "message" : "No id in request"
    });
  }
};

module.exports.blogAdd = function (req, res) {
  console.log(req.body);
  Blog
  .create({
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText,
    createdOn: req.body.createdOn,
    email: req.body.email,
    name: req.body.name
  }, function(err, blog) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(blog);
      sendJSONresponse(res, 201, blog);
    }
  }
);
};

module.exports.blogEdit = function (req, res) {
  console.log("Editing a blog entry with id of " + req.params.id);
  console.log(req.body);
  Blog
  .findOneAndUpdate(
    { _id: req.params.id },
    { $set: {"blogTitle": req.body.blogTitle, "blogText": req.body.blogText, "comment": req.body.comment}},
    function(err, response) {
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, response);
      }
    }
  );
};

module.exports.blogDelete = function (req, res) {
  console.log("Deleting blog entry with id of " + req.params.id);
  console.log(req.body);
  Blog
  .findByIdAndRemove(req.params.id)
  .exec (
    function(err, response) {
      if (err) {
        sendJSONresponse(res, 404, err);
      } else {
        sendJSONresponse(res, 204, null);
      }
    }
  );
};
