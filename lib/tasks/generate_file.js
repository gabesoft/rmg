var log        = require('../logger'),
    util       = require('../util')
    fs         = require('fs'),
    handlebars = require('handlebars'),
    path       = require('path');

module.exports = function (state, options, cb) {
  var src = options.template,
      dst = options.target;

  fs.readFile(src, function (err, data) {
    if (err) { return cb(err); }

    var templ  = handlebars.compile(data.toString('utf8')),
        output = templ(options.templateData);

    util.fileExists(dst, function (exists) {
      if (exists) {
        log.warn('file ' + dst.blue + ' already exists');
        cb();
      } else {
        fs.writeFile(dst, output, util.logFileGen(log, dst, cb));
      }
    });
  });
};
