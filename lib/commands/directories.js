var log     = require('../logger'),
    path    = require('path'),
    util    = require('../util')
    srunner = require('srunner'),
    runner  = srunner.create({ log: log, quiet: true, ignoreResults: true });

module.exports = function () {
  var app    = this,
      cb     = util.lastArg(arguments),
      config = this.config,
      module = app.module,
      paths  = config.get('paths');

  runner.init();

  Object.keys(paths).forEach(function (name) {
    runner.ensureDirExists({ dir: path.join(module.path, paths[name]) });
  });

  runner.run(cb);
};
