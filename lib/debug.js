exports.init = function (cb) {
  var argv = this.argv;
  if (argv.d || argv.debug)
    process.env.NODE_ENV = 'debug';
  return cb();
};
