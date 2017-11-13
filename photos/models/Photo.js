var mongoose = require('mongoose');
var colors = require('colors/safe');

//mongoose.connect('mongodb://test:test@ds237445.mlab.com:37445/photo-app');

// Set up connection to mongodb on localhost and use photo_app as  database
var db = mongoose.connect('mongodb://127.0.0.1/photo_app',
  function(err) {
    err ?
      console.log(colors.red.inverse("\n\n" +
        "----------------------------------------\n" +
        "   Error Connecting to mongodb database.\n" +
        "   Verify that the mongod is running.\n" +
        "----------------------------------------\n")) :
      console.log(colors.green("\nConnected to local mongoDB."));

  }
);

var schema = new mongoose.Schema({
  name: String,
  path: String,
  timestamp: Date
});

module.exports = mongoose.model('Photo', schema);
