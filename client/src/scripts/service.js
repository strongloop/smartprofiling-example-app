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
