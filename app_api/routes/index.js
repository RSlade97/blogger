var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var ctrlBlogs = require('../controllers/blogs');
var ctrlAuth = require('../controllers/authentication');

router.get('/blogs', ctrlBlogs.blogsList);
router.get('/blogs/:id', ctrlBlogs.blogShow);
router.post('/blogs', auth, ctrlBlogs.blogAdd);
router.put('/blogs/:id', auth, ctrlBlogs.blogEdit);
router.delete('/blogs/:id', auth, ctrlBlogs.blogDelete);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
module.exports = router;
