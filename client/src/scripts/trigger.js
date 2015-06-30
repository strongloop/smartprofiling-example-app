module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      onUpdate: '&'
    },
    templateUrl: 'profiler-trigger.html',
    controller: function($scope, $timeout, ProfilerService) {
      $scope.error = null;
      $scope.timeout = 100;
      $scope.requestCount = 0;
      $scope.responseCount = 0;
      $scope.active = false;
      $scope.tests = [];

      $scope.stopTest = function() {
        $scope.active = false;
      };

      $scope.startTest = function() {
        $scope.tests = [];

        for (var i = 0; i < 100; ++i) {
          $scope.tests.push({
            index: i,
            result: 0
          });
        }

        $scope.active = true;
      };

      $scope.$watch('active', function(active) {
        var timeout = $scope.timeout;

        if (active) {
          $scope.requestCount = 0;
          $scope.responseCount = 0;
        }

        var tick = function() {
          var startTime = 0;

          startTime = performance.now();
          ProfilerService.trigger($scope.timeout)
            .error(function(response) {
              $scope.error = response.msg;
              $scope.stopTest();
            })
            .then(function(response) {
              $scope.tests.shift();
              $scope.tests.push({
                index: $scope.tests.length,
                result: response.data.msg.workAmount
              });

              if ($scope.active) {
                $timeout(tick, 0);
              }

              $scope.onUpdate({
                data: $scope.tests
              });
            });
        };

        if (active) {
          tick();
        }
      });
    }
  };
};
