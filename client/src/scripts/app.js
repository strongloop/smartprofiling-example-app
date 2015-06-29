var angular = require('angular-browserify');

angular.$$csp = function() {
  return false;
};

var app = angular.module('smartProfilerDemo', []);

app.service('ProfilerService', require('./service'));
app.controller('ProfilerDemoController', require('./controller'));
app.directive('slProfilerTrigger', require('./trigger'));
app.directive('slProfilerChart', require('./chart'));
