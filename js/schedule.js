/* eslint-disable one-var */

var hackedTime = [new Date('2017/11/18 09:00'), new Date('2017/11/19 15:00')];

d3.json('../schedule.json', function(error, json) {
    var svg = d3.select('#schedule')
        .append('svg')
        .attr('id', 'schedule-svg');

    var svgBox = svg.node().getBoundingClientRect();
    var columns = d3.max(json, function(item) {
        return item.area ? item.area[1] + 1 : 0;
    });

    var gradients = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'rectGradient')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', '100%');

    gradients.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'rgba(128,177,245,1)');

    gradients.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'rgba(128,177,245,0.5)');

    function boxX(d) {
        return svgBox.width / columns * (d.area ? d.area[0] : 0);
    }

    function boxY(d) {
        return hourScale(new Date(d.startTime));
    }

    function boxWidth(d) {
        return svgBox.width / columns * (d.area ? d.area[1] - d.area[0] + 1 : 0);
    }

    function boxHeight(d) {
        return hourScale(new Date(d.endTime)) - hourScale(new Date(d.startTime));
    }

    // 200px per hour
    // schedule train has no brakes
    var hourScale = d3.scaleTime()
        .domain(hackedTime)
        .range([0, 6000]);

    var shading = svg.append('g')
        .selectAll('.schedule-shade')
        .data(d3.timeMinute.every(30).range(hackedTime[0], hackedTime[1]))
        .enter()
        .append('rect')
        .classed('schedule-shade', true)
        .attr('x', 0)
        .attr('y', function(d) { return hourScale(d); })
        .attr('width', svgBox.width)
        .attr('height', 100);

    var items = svg.append('g')
        .selectAll('.schedule-item')
        .data(json)
        .enter()
        .append('g')
        .classed('schedule-item', true);

    items.append('rect')
        .classed('schedule-rect', true)
        .attr('x', boxX)
        .attr('y', boxY)
        .attr('width', boxWidth)
        .attr('height', boxHeight)
        .attr('fill', 'url(#rectGradient)');

    var texts = items.append('text')
        .classed('schedule-text', true)
        .attr('x', function(d) { return boxX(d) + 10; })
        .attr('y', function(d) { return boxY(d) + 10; })
        .attr('dy', 0)
        .text(function(d) { return d.description; });

    texts.call(wrap, svgBox.width * 0.4);

    texts.append('tspan')
        .classed('item-title', true)
        .attr('x', function(d) { return boxX(d) + 10; })
        .attr('y', function(d) { return boxY(d) + 10; })
        .text(function(d) { return d.title; });

    // https://bl.ocks.org/mbostock/7555321
    function wrap(text, width, height) {
        text.each(function(d) {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 1,
                lineHeight = 1.1, // ems
                startHeight = 1.5,
                x = text.attr('x'),
                y = text.attr('y'),
                dy = parseFloat(text.attr('dy')),
                tspan = text.text(null).append('tspan')
                    .attr('x', x)
                    .attr('y', y)
                    .attr('dy', dy + lineNumber * lineHeight + startHeight + 'em');

            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(' '));
              if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan')
                    .attr('x', x)
                    .attr('y', y)
                    .attr('dy', dy + ++lineNumber * lineHeight + startHeight + 'em')
                    .text(word);
              }
              if (text.node().getBBox().height > boxHeight(d) - 50) {
                  tspan.remove();
                  return;
              }
            }
      });
}

    // y axis
    var yAxis = d3.axisLeft(hourScale)
        .ticks(d3.timeMinute.every(30))
        .tickFormat(d3.timeFormat('%-H:%M'));

    svg.append('g')
        .call(yAxis);
});
