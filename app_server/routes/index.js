var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Set up routes to pages. */
router.get('/', ctrlHome.home);
router.get('/blogsList', ctrlBlog.blogsList);

router.get('/blogAdd', ctrlBlog.blogAdd);
router.post('/blogAdd', ctrlBlog.blogAddPost);

router.get('/blogEdit', ctrlBlog.blogEdit);
router.put('/blogEdit', ctrlBlog.blogEditPost);

router.get('/blogDelete', ctrlBlog.blogDelete);
router.delete('/blogDelete', ctrlBlog.blogDeletePost);

module.exports = router;
