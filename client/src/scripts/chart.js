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

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('right');

      var xScale = d3.scale.linear()
        .range([0, width])
        .domain([0, 99]);

      var svg = d3.select(elem[0])
        .append('svg')
          .attr('height', height)
          .attr('width', width);

      var yScaleGroup = svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (width - 50) + ', 0)')
        .call(yAxis);

      var line = d3.svg.line()
        .x(function(d, i) { return xScale(i); })
        .y(function(d) { return yScale(d.result); });

      var path = svg.append('path')
        .datum([])
        .attr('class', 'line')
        .attr('d', line);

      $scope.$watch('data', function(newVal) {
        yScale.domain(d3.extent(newVal, function(d) {
          return d.result;
        })).nice();

        yScaleGroup.call(yAxis.scale(yScale));

        if (newVal) {
          path.datum(newVal, function(d) { return d.index; })
            .attr('d', line);
        }
      }, true);
    }
  };
};
