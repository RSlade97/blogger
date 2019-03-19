var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.get('/blogs', ctrlBlogs.blogsList);
router.get('/blogs/:blogid', ctrlBlogs.blogShow);
router.post('/blogs', ctrlBlogs.blogAdd);
router.put('/blogs/:blogid', ctrlBlogs.blogUpdate);
router.delete('/blogs/:blogid', ctrlBlogs.blogDelete);

module.exports = router;
