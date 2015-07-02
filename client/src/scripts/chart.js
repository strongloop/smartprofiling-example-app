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

      var chart = svg.append('g');

      var yScale = d3.scale.linear();
      var xScale = d3.scale.linear()
          .domain([0, 99]);

      var yAxis = d3.svg.axis()
          .orient('right');

      var line = d3.svg.line();
      var path = chart.append('path')
        .datum([])
        .attr('class', 'line');

      var yScaleGroup = svg.append('g')
          .attr('class', 'y axis');

      function resizeChart() {
        var rawHeight = elem.prop('clientHeight');
        var rawWidth = elem.prop('clientWidth');

        svg.attr('height', rawHeight)
          .attr('width', rawWidth);

        yScale.range([rawHeight, 0]);
        yAxis.scale(yScale);

        yScaleGroup
          .call(yAxis);

        var yScaleBBox = yScaleGroup.node().getBBox();

        yScaleGroup
          .attr('transform', 'translate(' + (rawWidth - yScaleBBox.width) + ', 0)');

        var height = rawHeight;
        var width = rawWidth - yScaleBBox.width;

        chart.attr('height', height)
          .attr('width', width);

        xScale.range([0, width]);

        line
          .x(function(d, i) { return xScale(i); })
          .y(function(d) { return yScale(d.result); });

        path.attr('d', line);
      }

      window.addEventListener('resize', function(event) {
        resizeChart();
      });

      $scope.$watch('data', function(newVal) {
        resizeChart();

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
