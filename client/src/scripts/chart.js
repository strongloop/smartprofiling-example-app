d3 = require('d3-browserify');

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    template: '<div></div>',
    link: function($scope, elem) {
      var svg = d3.select(elem[0]).append('svg');
      var line = d3.svg.line()
        .x(function(d) { return d.index; })
        .y(function(d) { return d.result; });
      var path = svg.append('path')
        .datum([])
        .attr('class', 'line')
        .attr('d', line);

      $scope.$watch('data', function(newVal) {
        if (newVal) {
          path.datum(newVal, function(d) { return d.index; })
            .attr('d', line);
        }
      }, true);
    }
  };
};
