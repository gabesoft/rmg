var log   = require('../logger'),
    JSON5 = require('json5');

module.exports = function (state, options, cb) {
  var file = options.file,
      fn   = options.fn;

  fs.readFile(file, function (err, data) {
    if (err) { return cb(err); }

    var json = JSON5.parse(data.toString('utf8'));

    fn(json);

    fs.writeFile(file, JSON5.stringify(json, null, '  '), function (err) {
      if (err) { return cb(err); }

      log.info('modified file ' + file.yellow)
      cb();
    });
  });
};
