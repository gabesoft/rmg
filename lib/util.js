var path = require('path');

module.exports.module = function (app) {
  var config  = app.config,
      root    = process.cwd(),
      relpath = app.argv.module || config.get('module'),
      name    = relpath ? relpath.replace(/.mod$/, '') : null;

  if (name) {
    return {
      name    : path.basename(name),
      relpath : name,
      path    : path.join(root, 'modules', name + '.mod'),
    }
  } else {
    return null;
  }
};
