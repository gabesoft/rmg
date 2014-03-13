define([
  'global/app'
], function (root) {
  root.apps.main.module('{{module}}.controllers', function (controllers) {
    controllers.on('start', function () {
      // TODO: init code
    });

    controllers.{{name}} = {
      // TODO: controller methods
    };
  });
});
