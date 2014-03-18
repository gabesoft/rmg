var log     = require('../logger'),
    util    = require('../util')
    srunner = require('srunner'),
    runner  = srunner.create({ log: log, ignoreResults: true, quiet: true }),
    path    = require('path');

function createDustKey (text) {
  text = text || '';
  text = text.replace(/^client\/templates\//, '');
  text = text.replace(/\.js$/, '');
  return 'client/templates/' + text + '.js';
}

module.exports = function () {
  var app  = this,
      cb   = util.lastArg(arguments),
      name = util.fileName(app.argv.name || 'main', 'dust'),
      src  = path.join(app.root, 'templates/templ.dust'),
      dst  = path.join(app.module.path, app.config.get('paths').templates, name.path),
      key  = null;

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: {} });

  if (app.argv['add-to-config'] || app.argv['key']) {
    if (app.argv['key']) {
      key = createDustKey(app.argv['key']);
    } else {
      key = app.argv['add-to-config'] === true
        ? createDustKey(app.module.name)
        : createDustKey(app.argv['add-to-config']);
    }

    runner.modifyJsonFile({
      file : path.join(process.cwd(), app.config.get('build-config')),
      fn   : function (data) {
        var dust  = data.dust || [],
            found = dust.filter(function (o) { return !!o[key]; })[0],
            obj   = found || {};

        obj[key] = obj[key] || [];
        obj[key].push(path.join('templates', app.module.relpath, name.path));

        if (!found) {
          dust.push(obj)
        }
      }
    });
  }

  runner.run(cb);
};
