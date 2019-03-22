var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.get('/blogs', ctrlBlogs.blogsList);
router.get('/blogs/:id', ctrlBlogs.blogShow);
router.post('/blogs', ctrlBlogs.blogAdd);
router.put('/blogs/:id', ctrlBlogs.blogEdit);
router.delete('/blogs/:id', ctrlBlogs.blogDelete);

module.exports = router;
