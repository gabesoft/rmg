var util         = require('../util'),
    log          = require('../logger'),
    trans        = require('trans'),
    skipCommands = [ 'help', 'usage', 'config', 'cl', 'v', 'ver', 'version'],
    skip         = trans(skipCommands).object().value();

exports.init = function (cb) {
  var cmd    = this.argv._[0],
      app    = this,
      config = this.config,
      module = util.module(app);

  if (!cmd || skip[cmd]) {
    cb();
  } else if (!module) {
    cb(new Error('No module specified'));
  } else {
    app.module = module;
    cb();
  }
};
