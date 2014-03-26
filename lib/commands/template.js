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
  var app    = this,
      cb     = util.lastArg(arguments),
      name   = util.fileName(app.argv.name || 'main', 'dust'),
      src    = path.join(app.root, 'templates/templ.dust'),
      dst    = path.join(app.module.path, app.config.get('paths').templates, name.path),
      data   = null,
      rawkey = null,
      key    = null;

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: {} });

  if (app.argv['add-to-config'] || app.argv['key']) {
    rawkey = app.argv.key || app.argv['add-to-config'];

    if (rawkey === true) {
      rawkey = app.config.get('template-key') || rawkey
    }

    if (rawkey === true) {
      rawkey = app.module.name;
    }

    key = createDustKey(rawkey);

    runner.modifyJsonFile({
      file : path.join(process.cwd(), app.config.get('build-config')),
      fn   : function (data) {
        var dust  = data.dust || [],
            found = dust.filter(function (o) { return !!o[key]; })[0],
            data   = found || {};

        data[key] = data[key] || [];
        data[key].push(path.join('templates', app.module.relpath, name.path));

        if (!found) {
          dust.push(data)
        }
      }
    });
  }

  if (rawkey) {
    data = { 'template-key': rawkey };
  }

  runner.run(function () {
    cb(null, data);
  });
};
