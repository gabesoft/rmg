var log = require('../logger'),
    jju = require('jju');

module.exports = function (state, options, cb) {
  var file   = options.file,
      update = options.fn;

  fs.readFile(file, function (err, buf) {
    if (err) { return cb(err); }

    var data = buf.toString('utf8'),
        json = jju.parse(data);

    update(json);

    data = jju.update(data, json);
    fs.writeFile(file, data, function (err) {
      if (err) { return cb(err); }

      log.info('file ' + file.yellow + ' modified')
      cb();
    });
  });
};
