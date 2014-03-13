var log     = require('../logger'),
    path    = require('path'),
    srunner = require('srunner'),
    runner  = srunner.create({ log: log, quiet: true });

module.exports = function (cb) {
  var app    = this,
      config = this.config,
      module = app.module;

  runner.init();

  config.get('folders').forEach(function (dir) {
    runner.ensureDirExists({ dir: path.join(module.path, dir) });
  });

  runner.run(cb);
};
