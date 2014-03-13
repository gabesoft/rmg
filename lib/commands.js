module.exports.init = function (cb) {
  var app = this;

  app.commands.directories = require('./commands/directories.js');
  app.commands.routes      = require('./commands/routes.js');
  app.commands.template    = require('./commands/template.js');
  app.commands.style       = require('./commands/style.js');
  app.commands.model       = require('./commands/model.js');
  app.commands.view        = require('./commands/view.js');
  app.commands.controller  = require('./commands/controller.js');
  app.commands.init        = require('./commands/init.js');

  app.alias('cl', { resource: 'config', command: 'list' });
  app.alias('dr', 'directories');
  app.alias('rt', 'routes');
  app.alias('tp', 'template');
  app.alias('st', 'style');
  app.alias('md', 'model');
  app.alias('vw', 'view');
  app.alias('ct', 'controller');
  app.alias('in', 'init');

  cb();
};
