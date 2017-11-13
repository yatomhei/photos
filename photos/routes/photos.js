var Photo = require('../models/Photo');
var multer = require('multer');
var path = require('path');
//var fs = require('fs');
var join = path.join;

exports.list = function(req, res, next) {
  Photo.find({}, function(err, photos) {
    if (err) return next(err);

    res.render('photos', {
      title: 'Photos',
      photos: photos
    });
  });
};

exports.form = function(req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  });
};

exports.download = function(dir) {
  return function(req, res, next) {
    var id = req.params.id;

    Photo.findById(id, function(err, photo) {
      if (err) return next(err);

      var path = join(dir, photo.path);
      var name = photo.name + '.jpeg';
      res.download(path, name);
    });
  };
};

// multer: handles multipart/form-data:
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/photos/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
}).single('image');

exports.submit = function(req, res, next) {
  upload(req, res, function(err) {

    if (err) {
      return res.end("Error uploading file...");
    }

    // use req.file (not 'files') to access the file object
    // (I think this is because I used multer(...).single() when defining the upload function)
    var img = req.file;
    // use req.body to access the text fields in the form
    var name = req.body.name || img.filename;

    // Photo is the MongoDB instance
    Photo.create({
      name: name,
      path: img.filename,
      timestamp: Date.now()
    }, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });
};

/*
exports.submit = function (dir) {
  return function(req, res, next){
    var img = req.files.image;
    var name = req.body.name || img.name;
    var path = join(dir, img.name);

    fs.rename(img.path, path, function(err){
      if (err) return next(err);

      // Photo is the MongoDB instance
      Photo.create({
        name: name,
        path: img.name
      }, function (err) {
        if (err) return next(err);
        res.redirect('/');
        //return;
      });

    });
  };
};
*/
