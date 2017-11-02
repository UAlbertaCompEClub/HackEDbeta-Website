d3.json('../schedule.json', function(error, json) {
    var svg = d3.select('#schedule')
        .append('svg')
        .attr('id', 'schedule-svg');

    var svgBox = svg.node().getBoundingClientRect();
    var columns = d3.max(json, function(item) {
        return item.area ? item.area[1] + 1 : 0;
    });

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
        .domain([new Date('2017/11/18 09:00'), new Date('2017/11/19 15:00')])
        .range([0, 6000]);

    var items = svg.selectAll('.schedule-item')
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
        .attr('fill', 'rgb(128,177,245)');

    items.append('text')
        .classed('schedule-text', true)
        .text(function(d) { return d.title; })
        .style('text-anchor', function(d) { return d.type === 'single' ? 'middle' : null; })
        .attr('x', function(d) { return boxX(d) + boxWidth(d) / 2; })
        .attr('y', function(d) { return boxY(d) + boxHeight(d) / 2; });
});
