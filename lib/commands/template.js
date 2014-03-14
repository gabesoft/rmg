var log     = require('../logger'),
    util    = require('../util')
    srunner = require('srunner'),
    runner  = srunner.create({ log: log, ignoreResults: true, quiet: true }),
    path    = require('path');


module.exports = function () {
  var app    = this,
      cb     = util.lastArg(arguments),
      name   = util.fileName(app.argv.name || 'main', 'dust'),
      cls    = (app.argv.class || app.module.name).replace(/^\./, ''),
      src    = path.join(app.root, 'templates/templ.dust'),
      dst    = path.join(app.module.path, app.config.get('paths').templates, name.path),
      global = app.config.get('global-module'),
      key    = null,
      opts   = {};

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: opts });

  if (app.argv['add-to-config']) {
    key = app.argv['add-to-config'] === true
      ? path.join('client/templates', app.module.name + '.js')
      : app.argv['add-to-config'];

    runner.modifyJsonFile({
      file: path.join(process.cwd(), app.config.get('build-config')),
      fn: function (data) {
        var dust = data.dust,
            obj = {};

        obj[key] = [ path.join('templates', app.module.relpath, name.path) ];

        // TODO: find the entry with key or create a new one
        dust.push(obj)
      }
    })

    runner.appendToFile({
      file  : path.join(process.cwd(), global, 'styles', 'styles.less'),
      lines : [ "@import '" + path.join(app.module.relpath, name.path) + "';" ]
    });
  }

  runner.run(cb);
};
