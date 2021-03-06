// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: smartprofiling-example-app
// US Government Users Restricted Rights - Use, duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.

var angular = require('angular-browserify');

angular.$$csp = function() {
  return false;
};

var app = angular.module('smartProfilerDemo', []);

app.service('ProfilerService', require('./service'));
app.controller('ProfilerDemoController', require('./controller'));
app.directive('slProfilerTrigger', require('./trigger'));
app.directive('slProfilerChart', require('./chart'));
