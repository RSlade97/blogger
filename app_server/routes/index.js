var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Set up routes to pages. */
router.get('/', ctrlHome.home);
router.get('/bloglist', ctrlBlog.blogList);
router.get('/blogadd', ctrlBlog.blogAdd);
router.get('/blogedit', ctrlBlog.blogEdit);
router.get('/blogdelete', ctrlBlog.blogDelete);

module.exports = router;
