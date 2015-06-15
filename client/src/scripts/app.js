var angular = require('angular-browserify');
var app = angular.module('smartProfilerDemo', []);

app.service('ProfilerService', require('./service'));
app.directive('slProfilerTrigger', require('./directives'));
