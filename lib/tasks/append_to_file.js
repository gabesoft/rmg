var log  = require('../logger');

module.exports = function (state, options, cb) {
  var file  = options.file,
      lines = options.lines,
      nl    = '\n';

  fs.appendFile(file, nl + lines.join(nl), function (err) {
    if (err) { return cb(err); }

    log.info('modified file ' + file.yellow)
    cb();
  });
};
