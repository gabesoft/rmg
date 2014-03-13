var flatiron = require('flatiron'),
    colors   = require('colors'),
    commands = require('./commands'),
    eyes     = require('eyes'),
    log      = require('./logger'),
    app      = flatiron.app,
    path     = require('path');

module.exports = app;

app.name = 'rmg';
app.config.file(path.join(__dirname, '..', 'config.json'));
app.config.remove('literal');

eyes.defaults.sortObjectKeys = true;

app.inspect.inspect = eyes.inspector({
  stream : null,
  styles : {
    all     : null,
    label   : 'underline',
    other   : 'inverted',
    key     : 'grey',
    special : 'grey',
    number  : 'blue',
    bool    : 'magenta',
    regexp  : 'green'
  }
});

app.use(flatiron.plugins.cli, {
  version: true,
  usage: [
    '',
    'R'.blue + 'ind ' + 'M'.blue + 'odule ' + 'G'.blue + 'enerator',
    '',
    'Usage:'.cyan.underline,
    '',
    app.name.yellow + ' command --module [module] <params ...>'.yellow,
    '',
    'Commands:'.cyan.underline,
    '',

    app.name.yellow + ' directories'.yellow + '           [' + 'alias: '.grey + app.name.grey + ' dr'.grey + ']',
    '- creates all directories for a rind module'.grey,
    '',

    app.name.yellow + ' routes'.yellow + '                [' + 'alias: '.grey + app.name.grey + ' rt'.grey + ']',
    '- generates the server routes file'.grey,
    '- params: --add-to-config'.grey,
    '',

    app.name.yellow + ' template'.yellow + '              [' + 'alias: '.grey + app.name.grey + ' tp'.grey + ']',
    '- generates a dust template file in the templates folder'.grey,
    '- params: --name <file-name>'.grey,
    '-         --add-to-config [key]'.grey,
    '',

    app.name.yellow + ' style'.yellow + '                 [' + 'alias: '.grey + app.name.grey + ' st'.grey + ']',
    '- generates a less file in the styles folder'.grey,
    '- params: --name <file-name>'.grey,
    '-         --add-to-global'.grey,
    '',

    app.name.yellow + ' model'.yellow + '                 [' + 'alias: '.grey + app.name.grey + ' md'.grey + ']',
    '- generates a marionette model file in the models folder'.grey,
    '- params: --name <model-name>'.grey,
    '',

    app.name.yellow + ' view'.yellow + '                  [' + 'alias: '.grey + app.name.grey + ' vw'.grey + ']',
    '- generates a marionette view file in the views folder'.grey,
    '- params: --name <view-name>'.grey,
    '',

    app.name.yellow + ' controller'.yellow + '            [' + 'alias: '.grey + app.name.grey + ' ct'.grey + ']',
    '- generates a controller file in the controllers folder'.grey,
    '- params: --name <controller-name>'.grey,
    '',

    app.name.yellow + ' init'.yellow + '                  [' + 'alias: '.grey + app.name.grey + ' in'.grey + ']',
    '- generates an init file in the client folder'.grey,
    '',

    'Notes:'.cyan.underline,
    '',
    '- the module path should be specified relative to the modules folder',
  ]
});

app.use(require('./plugins/debug'));
app.use(require('./plugins/module'));

app.use(commands);
app.use(require('flatiron-cli-config'), { store: 'file' });
app.start(function (err, cfg) {
  if (err && err !== true && err !== false) {
    log.error(err.stack || err);
  } else {
    cfg = cfg || {};
    cfg.module = app.module.relpath;

    Object.keys(cfg).forEach(function (name) {
      app.config.set(name, cfg[name]);
      app.config.save();
      log.data('config updated ' + name.yellow + ' = ' + String(cfg[name]).magenta);
    });
  }
});
