var fs   = require('fs'),
    util = require('../util'),
    path = require('path');

exports.init = function (cb) {
  var app  = this,
      dst  = path.join(process.env.HOME, 'rmg.config.json'),
      src  = path.join(__dirname, '..', '..', 'config.json'),
      data = require(src);

  app.config.file(dst);
  app.config.remove('literal');

  Object.keys(data).forEach(function (key) {
    app.config.set(key, data[key]);
  });

  app.config.save();
  cb();
};
