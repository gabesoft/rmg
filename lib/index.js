var flatiron = require('flatiron'),
    colors   = require('colors'),
    eyes     = require('eyes'),
    log      = require('./logger'),
    app      = flatiron.app,
    path     = require('path');

module.exports = app;

app.name = 'rmg';
app.root = __dirname;
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
    '- creates all directories for a rind module',
    '',

    app.name.yellow + ' routes'.yellow + '                [' + 'alias: '.grey + app.name.grey + ' rt'.grey + ']',
    '- generates the server routes file',
    '- params: --route <route-path>' + '      file name without extension'.grey,
    '-         --add-to-config' + '           add the routes to app.config'.grey,
    '',

    app.name.yellow + ' template'.yellow + '              [' + 'alias: '.grey + app.name.grey + ' tp'.grey + ']',
    '- generates a dust template file in the templates folder'.grey,
    '- params: --name <file-name>' + '        file name without extension'.grey,
    '-         --add-to-config [key]' + '     add the file to the build config under the given key'.grey,
    '',

    app.name.yellow + ' style'.yellow + '                 [' + 'alias: '.grey + app.name.grey + ' st'.grey + ']',
    '- generates a less file in the styles folder',
    '- params: --name <file-name>' + '        optional file name without extension (defaults to main)'.grey,
    '-         --class <class-name>' + '      optional top level class name (defaults to module name)'.grey,
    '-         --add-to-global' + '           import the file into the global styles'.grey,
    '',

    app.name.yellow + ' model'.yellow + '                 [' + 'alias: '.grey + app.name.grey + ' md'.grey + ']',
    '- generates a marionette model file in the models folder',
    '- params: --name <model-name>' + '       backbone model name'.grey,
    '-         --module-name <name>' + '      optional marionette module name'.grey,
    '',

    app.name.yellow + ' view'.yellow + '                  [' + 'alias: '.grey + app.name.grey + ' vw'.grey + ']',
    '- generates a marionette view file in the views folder',
    '- params: --name <view-name>' + '        marionette view name'.grey,
    '-         --type <view-type>' + '        optional marionette view type (defaults to ItemView)'.grey,
    '-         --module-name <name>' + '      optional marionette module name'.grey,
    '',

    app.name.yellow + ' controller'.yellow + '            [' + 'alias: '.grey + app.name.grey + ' ct'.grey + ']',
    '- generates a controller file in the controllers folder',
    '- params: --name <controller-name>' + '  marionette controller name'.grey,
    '-         --module-name <name>' + '      optional marionette module name'.grey,
    '',

    app.name.yellow + ' init'.yellow + '                  [' + 'alias: '.grey + app.name.grey + ' in'.grey + ']',
    '- generates an init file in the client folder',
    '- params: --module-name <name>' + '      optional marionette module name'.grey,
    '',

    app.name.yellow + ' config list'.yellow + '           [' + 'alias: '.grey + app.name.grey + ' cl'.grey + ']',
    app.name.yellow + ' config set <key> <value>'.yellow,
    app.name.yellow + ' config get <key>'.yellow,
    app.name.yellow + ' config delete <key>'.yellow,
    '',

    'Notes:'.cyan.underline,
    '',
    '- the module should be specified relative to the modules',
    '  folder (i.e. objects/home/blog)',
    '- client side object names should be specified all lowercase with dashes',
    '  for example the command ' + 'rmg view header-bar'.yellow + ' will generate a file named',
    '  client/views/header-bar.js containing a view called HeaderBar',
    '',
  ]
});

app.use(require('./plugins/debug'));
app.use(require('./plugins/module'));
app.use(require('./commands'));
app.use(require('flatiron-cli-config'), { store: 'file' });

app.start(function (err, cfg) {
  if (err && err !== true && err !== false) {
    log.error(err.stack || err);
  } else {
    cfg = cfg || {};

    if (app.argv.module) {
      cfg.module = app.module.relpath;
    }

    Object.keys(cfg).forEach(function (name) {
      app.config.set(name, cfg[name]);
      app.config.save();
      log.data('config updated ' + name.yellow + ' = ' + String(cfg[name]).magenta);
    });
  }
});
