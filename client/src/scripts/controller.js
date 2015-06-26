module.exports = function ProfilerDemoController($scope) {
  $scope.data = [];

  $scope.updateData = function(data) {
    $scope.data = data;
  };
};
