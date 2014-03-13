define([
  'global/app',
  'backbone.marionette'
], function (root) {
  root.apps.main.module('{{module}}', function ({{module}}, app) {
    this.startWithParent = false;

    {{module}}.on('start', function () {
      app.addRegions({
        // TODO: add regions here
      });
    });
  });
});
