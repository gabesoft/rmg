var log          = require('../logger'),
    str          = require('underscore.string'),
    trans        = require('trans'),
    skipCommands = [ 'help', 'usage', 'config', 'cl', 'v', 'ver', 'version'],
    skip         = trans(skipCommands).object().value();

function getModule (app) {
  var config   = app.config,
      root     = process.cwd(),
      existing = config.get('module-data') || {},
      relpath  = app.argv.module || existing.relpath,
      objname  = app.argv['module-name'] || app.argv['mn'];

  if (relpath) {
    relpath = relpath.replace(/.mod$/, '');
  }

  if (relpath !== existing.relpath) {
      existing.objname = null;
  }

  if (!objname) {
    objname = existing.objname || path.basename(relpath);
  }

  if (relpath) {
    return {
      save    : app.argv.module || app.argv['module-name'] || app.argv['mn'],
      name    : path.basename(relpath),
      objname : str.camelize(objname),
      relpath : relpath,
      path    : path.join(root, 'modules', relpath + '.mod'),
    }
  } else {
    return null;
  }
};


exports.init = function (cb) {
  var cmd    = this.argv._[0],
      app    = this,
      config = this.config,
      module = getModule(app);

  if (!cmd || skip[cmd]) {
    cb();
  } else if (!module) {
    cb(new Error('No module specified'));
  } else {
    app.module = module;
    cb();
  }
};
