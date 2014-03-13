define([
  'global/app',
  'backbone.marionette'
], function (root) {
  root.apps.main.module('{{name}}', function ({{name}}, app) {
    this.startWithParent = false;

    {{name}}.on('start', function () {
      app.addRegions({
        // TODO: add regions here
      });
    });
  });
});
