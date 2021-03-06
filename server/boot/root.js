// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: smartprofiling-example-app
// US Government Users Restricted Rights - Use, duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  server.use(router);
};
