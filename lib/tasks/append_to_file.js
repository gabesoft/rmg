var log  = require('../logger'),
    util = require('../util'),
    path = require('path');

module.exports = function (state, options, cb) {
  var file  = options.file,
      lines = options.lines,
      nl    = '\n';

  fs.appendFile(file, nl + lines.join(nl), function (err) {
    if (err) { return cb(err); }

    log.info('modified file ' + file.green)
    cb();
  });
};
