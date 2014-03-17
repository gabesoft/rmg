var util = require('../util'),
    log  = require('../logger');

exports.init = function (cb) {
  var cmd    = this.argv._[0],
      skip   = { help: true, usage: true, config: true, cl: true },
      app    = this,
      config = this.config,
      module = util.module(app);

  if (!cmd || skip[cmd]) {
    return cb();
  } else if (!module) {
    cb(new Error('No module specified'));
  } else {
    app.module = module;
    cb();
  }
};
