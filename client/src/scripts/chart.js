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
      var svg = d3.select(elem[0])
        .append('svg');

      var yScale = d3.scale.linear();
      var xScale = d3.scale.linear();
      var yAxis = d3.svg.axis();
      var line, path, yScaleGroup;

      function setupChart() {
        var height = elem.prop('offsetHeight');
        var width = elem.prop('offsetWidth');

        svg.attr('height', height)
          .attr('width', width);

        yScale.range([height, 0]);

        xScale.range([0, width])
          .domain([0, 99]);

        yAxis.scale(yScale)
          .orient('right');

        yScaleGroup = svg.append('g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + (width - 50) + ', 0)')
          .call(yAxis);

        line = d3.svg.line()
          .x(function(d, i) { return xScale(i); })
          .y(function(d) { return yScale(d.result); });

        path = svg.append('path')
          .datum([])
          .attr('class', 'line')
          .attr('d', line);
      }

      window.addEventListener('resize', function(event) {
        setupChart();
      });

      $scope.$watch('data', function(newVal) {
        if (!yScaleGroup) {
          setupChart();
        }
        
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
