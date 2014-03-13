var util    = require('../util'),
    log     = require('../logger'),
    path    = require('path'),
    srunner = require('srunner'),
    runner  = srunner.create({ log: log });

module.exports = function () {
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

  //.ensureDirExists({ dir: path.join(module.path, 'client', 'controllers') })
  //.ensureDirExists({ dir: path.join(module.path, 'client', 'models') })
  //.ensureDirExists({ dir: path.join(module.path, 'client', 'views') })
  //.ensureDirExists({ dir: path.join(module.path, 'lib') })
  //.ensureDirExists({ dir: path.join(module.path, 'styles') })
  //.ensureDirExists({ dir: path.join(module.path, 'templates') })
  //.ensureDirExists({ dir: path.join(module.path, 'assets/img') })
  runner.run();
};
