var angular = require('angular-browserify');
var app = angular.module('smartProfilerDemo', []);

app.controller('DemoController', require('./controller'));
app.service('DemoService', require('./service'));
