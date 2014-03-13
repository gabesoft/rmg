define([
  'global/app',
  'backbone',
  'backbone.marionette'
], function (root, Backbone, Marionette) {
  root.apps.main.module('{{module}}.views', function (views) {
    views.{{name}} = Marionette.{{type}}.extend({
      template: 'TODO: specify a template here'
    });
  });
});
