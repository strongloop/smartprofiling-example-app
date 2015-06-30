var d3 = require('d3-browserify');

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    template: '<div class="chart-area"></div>',
    replace: true,
    link: function($scope, elem) {
      var height = elem.prop('offsetHeight');
      var width = elem.prop('offsetWidth');
      var yScale = d3.scale.linear()
        .range([height, 0])
        .domain([0, 500]);

      var xScale = d3.scale.linear()
        .range([0, width])
        .domain([0, 99]);

      var svg = d3.select(elem[0])
        .append('svg')
          .attr('height', height)
          .attr('width', width);

      var line = d3.svg.line()
        .x(function(d, i) { return xScale(i); })
        .y(function(d) { return yScale(d.result); });

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
