define([
  'global/app',
  'backbone'
], function (root, Backbone) {
  root.apps.main.module('{{module}}.models', function (models) {
    models.{{name}} = Backbone.Model.extend({});
  });
});
