var log      = require('../logger'),
    srunner  = require('srunner'),
    runner   = srunner.create({ log: log, ignoreResults: true, quiet: true }),
    path     = require('path'),
    camelize = require('underscore.string').camelize;

module.exports = function (cb) {
  var app  = this,
      src  = path.join(app.root, 'templates/init.js'),
      dst  = path.join(app.module.path, app.config.get('paths').init),
      opts = { name: camelize(app.argv.name || app.module.name) };

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: opts })
    .run(cb);
};
