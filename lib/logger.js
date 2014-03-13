var colors = require('colors'),
    levels = {
      error : { text: 'error'.red,          pad: '  ' },
      debug : { text: 'debug'.grey.inverse, pad: '  ' },
      info  : { text: 'info'.blue,          pad: '   ' },
      warn  : { text: 'warn'.yellow,        pad: '   ' },
      help  : { text: 'help'.cyan,          pad: '   ' },
      data  : { text: 'data'.grey,          pad: '   ' }
    };

function writeln (level, obj) {
  obj = obj || '';
  console.log(level.text + ':' + level.pad, obj);
}

function write (level, obj) {
  obj = obj || '';
  if (typeof obj === 'string') {
    obj.split('\n').filter(Boolean).forEach(function (l) {
      writeln(level, l);
    });
  } else if (Buffer.isBuffer(obj)) {
    str = obj.toString('utf8').trim();
    write(level, str);
  } else {
    writeln(level, obj);
  }
}

function enabled (name) {
  env = process.env.NODE_ENV;
  return name !== 'debug' || (env === 'debug' || env === 'development');
}

Object.keys(levels).forEach(function (name) {
  module.exports[name] = function (obj) {
    if (enabled(name)) {
      write(levels[name], obj);
    }
  };
});
