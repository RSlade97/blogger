var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema ({
  commentText: {
    type: String,
    required: true
  },
  posted: {
    type: Date,
    "default": Date.now,
    required: true
  },
  author: {
    type: String,
    unique: true,
    required: true
  },
  score: {
    type: Integer,
    "default": 0,
    required: true
  }
});
