var log = require('../logger');

module.exports = function (cb) {
  log.info(require('../../package.json').version);
};
