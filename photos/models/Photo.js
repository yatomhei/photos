var mongoose = require('mongoose');

//mongoose.connect('mongodb://test:test@ds237445.mlab.com:37445/photo-app');
mongoose.connect('mongodb://127.0.0.1:27017/photo_app');

var schema = new mongoose.Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Photo', schema);
