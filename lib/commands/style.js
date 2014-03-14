var log      = require('../logger'),
    util     = require('../util')
    srunner  = require('srunner'),
    runner   = srunner.create({ log: log, ignoreResults: true, quiet: true }),
    camelize = require('underscore.string').camelize,
    path     = require('path');


module.exports = function () {
  var app  = this,
      cb   = util.lastArg(arguments),
      name = util.fileName(app.argv.name || 'main', 'less'),
      cls  = (app.argv.class || app.module.name).replace(/^\./, ''),
      src  = path.join(app.root, 'templates/style.less'),
      dst  = path.join(app.module.path, app.config.get('paths').styles, name.path),
      opts = { class : cls };

  if (name.base.length === 0) {
    return cb(new Error('No file name specified'));
  }

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: opts });

  if (app.argv['add-to-global']) {
    runner.appendToFile({
      file  : path.join(process.cwd(), app.config.get('global-module'), 'styles', 'styles.less'),
      lines : [ "@import '" + path.join(app.module.relpath, name.path) + "';" ]
    });
  }

  runner.run(cb);
};
