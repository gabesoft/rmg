var log     = require('../logger'),
    util    = require('../util')
    srunner = require('srunner'),
    runner  = srunner.create({ log: log, ignoreResults: true, quiet: true }),
    path    = require('path');


module.exports = function () {
  var app    = this,
      cb     = util.lastArg(arguments),
      name   = util.fileName('routes', 'js'),
      src    = path.join(app.root, 'templates/routes.js'),
      dst    = path.join(app.module.path, app.config.get('paths').lib, name.path),
      opts   = { route : app.argv.route || 'set/url/here' };

  runner
    .init({ scripts: path.join(app.root, 'tasks') })
    .ensureDirExists(path.dirname(dst))
    .generateFile({ template: src, target: dst, templateData: opts });

  if (app.argv['add-to-config']) {
    runner.modifyJsonFile({
      file : path.join(process.cwd(), app.config.get('app-config')),
      fn   : function (data) { data[0].routes.push(app.module.relpath); }
    });
  }

  runner.run(cb);
};
