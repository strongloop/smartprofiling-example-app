// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: smartprofiling-example-app
// US Government Users Restricted Rights - Use, duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.

var angular = require('angular-browserify');
var app = angular.module('smartProfilerDemo', []);

app.controller('DemoController', require('./controller'));
app.service('DemoService', require('./service'));
