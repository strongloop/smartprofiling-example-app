module.exports = function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'profiler-trigger.html',
    controller: function($scope, ProfilerService) {
      $scope.error = null;
      $scope.timeout = 100;
      $scope.count = 1;

      $scope.triggerProfiler = function(timeout, count) {
        ProfilerService.trigger(timeout, count)
          .error(function(response) {
            $scope.error = response.msg;
          })
          .then(function(response) {
            $scope.result = response.msg;
          });
      };
    }
  };
};
