var log     = require('../logger'),
    srunner = require('srunner'),
    runner  = srunner.create({ log: log, ignoreResults: true, quiet: true }),
    str     = require('underscore.string'),
    path    = require('path');


module.exports = function (cb) {
  var app  = this,
      name = str.underscored(app.argv.name.replace(/\.js$/, '')),
      src  = path.join(app.root, 'templates/model.js'),
      dst  = path.join(app.module.path, app.config.get('paths').models, name + '.js'),
      opts = {
        module : str.camelize(app.argv['module-name'] || app.module.name),
        model  : str.camelize('-' + name)
      };

  if (name.length === 0) {
    return cb(new Error('No model name specified'));
  }

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: opts })
    .run(cb);
};
