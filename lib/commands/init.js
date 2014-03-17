var log     = require('../logger'),
    util    = require('../util'),
    srunner = require('srunner'),
    runner  = srunner.create({ log: log, ignoreResults: true, quiet: true }),
    path    = require('path');

module.exports = function (cb) {
  var app  = this,
      src  = path.join(app.root, 'templates/init.js'),
      dst  = path.join(app.module.path, app.config.get('paths').lib, 'init.js'),
      opts = { module: util.moduleName(app) };

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: opts })
    .run(cb);
};
