define([
  'global/app',
  'backbone.marionette'
], function (root) {
  root.apps.main.module('{{module}}.models', function (models) {
    models.{{model}} = Backbone.Model.extend({});
  });
});
