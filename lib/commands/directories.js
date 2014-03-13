var util    = require('../util'),
    log     = require('../logger'),
    path    = require('path'),
    srunner = require('srunner'),
    runner  = srunner.create({ log: log });

module.exports = function (cb) {
  var app    = this,
      config = this.config,
      module = util.module(app);

  if (!module) {
    return cb(new Error('No module specified'));
  }

  runner.init({ quiet: true });

  config.get('folders').forEach(function (dir) {
    runner.ensureDirExists({ dir: path.join(module.path, dir) });
  });

  runner.run(function (err) {
    cb(err, { module: module.relpath });
  });
};
