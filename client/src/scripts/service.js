// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: smartprofiling-example-app
// US Government Users Restricted Rights - Use, duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.

/**
 * Profilers service
 *
 * @param  {[type]} $http [description]
 * @return {[type]}       [description]
 */
module.exports = function ProfilerService($http, $q) {
  return {
    trigger: function(timeout) {
      return $http.post(
        '/api/TriggerRequests/trigger', {
          timeout: timeout,
          count: 1
        }
      );
    }
  };
};
