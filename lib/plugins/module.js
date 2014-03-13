var util = require('../util.js');

exports.init = function (cb) {
  var app = this,
      config = this.config,
      module = util.module(app);

  if (!module) {
    cb(new Error('No module specified'));
  } else {
    app.module = module;
    cb();
  }
};
