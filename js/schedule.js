/* eslint-disable one-var */

var hackedTime = [new Date('2017/11/18 09:00'), new Date('2017/11/19 15:00')];
var colours = {
    'blue': '128,177,245',
    'green': '148,211,163',
    'red': '224,109,111',
    'orange': '241,195,127',
    'grey': '211,211,211',
};

var svg = d3.select('#schedule')
    .append('svg')
    .attr('id', 'schedule-svg');

var defs = svg.append('defs');

var svgBox = svg.node().getBoundingClientRect();

// 200px per hour
// schedule train has no brakes
var hourScale = d3.scaleTime()
    .domain(hackedTime)
    .range([0, 6000]);

function applyClass(text) {
    text.each(function(d) {
        d3.select(this).classed(d.type, true);
    });
}

function colour(rgb, opacity) {
    // rgb eg. '255,255,255'
    if (typeof opacity === 'undefined') {
        opacity = 1;
    }
    return 'rgba(' + rgb + ',' + opacity + ')';
}

function generateGradients(name, codes) {
    var gradients = defs.append('linearGradient')
        .attr('id', 'rectGradient' + name)
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', '100%');

    gradients.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colour(codes));

    gradients.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colour(codes, 0.5));

    var markerGradients = defs.append('linearGradient')
        .attr('id', 'markerGradient' + name)
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', '100%');

    markerGradients.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colour(codes, 0));

    markerGradients.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', colour(codes));

    markerGradients.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colour(codes, 0));
}

Object.keys(colours).forEach(function(name) {
    generateGradients(name, colours[name]);
});

d3.json('../schedule.json', function(error, json) {
    var columns = d3.max(json, function(item) {
        return item.area ? item.area[1] + 1 : 0;
    });

    function boxX(d) {
        if (d.type === 'marker') {
            return 0;
        }
        return svgBox.width / columns * (d.area ? d.area[0] : 0);
    }

    function boxY(d) {
        if (d.type === 'marker') {
            return hourScale(new Date(d.startTime)) - 12;
        }
        return hourScale(new Date(d.startTime));
    }

    function boxWidth(d) {
        if (d.type === 'marker') {
            return svgBox.width;
        }
        return svgBox.width / columns * (d.area ? d.area[1] - d.area[0] + 1 : 0);
    }

    function boxHeight(d) {
        if (d.type === 'marker') {
            return 30;
        }
        return hourScale(new Date(d.endTime)) - hourScale(new Date(d.startTime));
    }

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
        .attr('fill', function(d) {
            var resolvedColour = Object.keys(colours).includes(d.colour) ? d.colour : 'grey';
            if (d.type === 'marker') {
                return 'url(#markerGradient' + resolvedColour + ')';
            }
            return 'url(#rectGradient' + resolvedColour + ')';
        });

    var texts = items.append('text')
        .classed('schedule-text', true)
        .attr('x', function(d) { return boxX(d) + 10; })
        .attr('y', function(d) { return boxY(d) + 10; })
        .attr('dy', 0)
        .text(function(d) { return d.description; });

    texts.call(wrap, svgBox.width * 0.4);

    texts.append('tspan')
        .classed('item-title', true)
        .attr('x', function(d) {
            return d.type === 'marker' ? svgBox.width / 2 : boxX(d) + 10;
        })
        .attr('y', function(d) {
            return d.type === 'marker' ? boxY(d) : boxY(d) + 10;
        })
        .text(function(d) { return d.type === 'continuous' ? '' : d.title; })
        .call(applyClass);

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
