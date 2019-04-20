var mongoose = require ('mongoose');

var blogSchema = new mongoose.Schema ({
  blogTitle: {
    type: String,
    required: true
  },

  blogText: {
    type: String,
    required: true
  },

  createdOn: {
    type: Date,
    "default": Date.now,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  name: {
    type: String,
    unique: true,
    required: true
  }
});

mongoose.model('Blog', blogSchema);
