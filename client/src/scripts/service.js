/**
 * Profilers service
 *
 * @param  {[type]} $http [description]
 * @return {[type]}       [description]
 */
module.exports = function ProfilerService($http, $q) {
  return {
    trigger: function(timeout, count) {
      var dfd = $q.defer();
      var requests = [];
      var idx;

      for (idx = 0; idx < count; ++idx) {
        requests.push($http.post(
          '/api/TriggerRequests/trigger',
          {
            timeout: timeout
          }));
      }

      return $q.all(requests);
    }
  };
};
