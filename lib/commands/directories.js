var log     = require('../logger'),
    path    = require('path'),
    srunner = require('srunner'),
    runner  = srunner.create({ log: log, quiet: true, ignoreResults: true });

module.exports = function (cb) {
  var app    = this,
      config = this.config,
      module = app.module,
      paths  = config.get('paths');

  runner.init();

  Object.keys(paths).forEach(function (name) {
    runner.ensureDirExists({ dir: path.join(module.path, paths[name]) });
  });

  runner.run(cb);
};
