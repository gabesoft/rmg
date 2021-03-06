var log      = require('../logger'),
    util     = require('../util')
    srunner  = require('srunner'),
    runner   = srunner.create({ log: log, ignoreResults: true, quiet: true }),
    camelize = require('underscore.string').camelize,
    path     = require('path');


module.exports = function () {
  var app  = this,
      cb   = util.lastArg(arguments),
      name = util.fileName(app.argv.name || 'main', 'js'),
      src  = path.join(app.root, 'templates/controller.js'),
      dst  = path.join(app.module.path, app.config.get('paths').controllers, name.path),
      opts = {
        module : app.module.objname,
        name   : camelize(name.base),
        type   : app.argv.type || 'ItemView'
      };

  if (name.base.length === 0) {
    return cb(new Error('No controller name specified'));
  }

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: opts })
    .run(cb);
};
