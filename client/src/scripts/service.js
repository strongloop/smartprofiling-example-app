/**
 * Profilers service
 *
 * @param  {[type]} $http [description]
 * @return {[type]}       [description]
 */
module.exports = function ProfilerService($http) {
  return {
    trigger: function(timeout, count) {
      return $http.post(
        '/api/TriggerRequests/trigger',
        {
          timeout: timeout,
          count: count
        });
    }
  };
};
