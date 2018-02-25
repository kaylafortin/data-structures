const $ = require('jquery');
const d3 = require('d3');

class DrawGraph {

    constructor() {
        this.graphJSON = {};
    }

    drawGraph(graph) {

        this.graphJSON = graph;

        //clears the previously drawn graph
        $('svg').remove();

        let width = 1050;
        let height = 450;

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var color = d3.scaleOrdinal(d3.schemeCategory20b);

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(50))
            .force("charge", d3.forceManyBody().strength(-250))
            .force("center", d3.forceCenter(width / 2, height / 2));

        let json = this.graphJSON;

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(json.links)
            .enter().append("line");

        var node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append('circle')
            .attr("r", 10)
            .attr("fill", function(d) { return color(d.id); })
            .attr('id', function(d) { return 'node-' + d.id })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.id });

        simulation
            .nodes(json.nodes);

        simulation.force("link")
            .links(json.links);

        simulation.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    drawFixed(graph) {

        this.graphJSON = graph;

        //clears the previously drawn graph
        $('svg').remove();

        let width = 1050;
        let height = 450;

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var color = d3.scaleOrdinal(d3.schemeCategory20b);

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; })
            .distance(Math.floor(Math.random() * (20)) + 40))
            .force("charge", d3.forceManyBody().strength(-250))
            .force("center", d3.forceCenter(width / 2, height / 2))

        let json = this.graphJSON;

        var link = svg.selectAll(".link")
            .data(json.links)
            .enter()
            .append("g")
            .attr("class", "link")
            .append("line")
            .attr("class", "link-line")
            .style("stroke-width", function(d) {
                return (d.weight/2);
            });

        var linkText = svg.selectAll(".link")
            .append("text")
            .attr("class", "link-label")
            .attr("font-family", "Arial, Helvetica, sans-serif")
            .attr("fill", "Black")
            .style("font", "normal 12px Arial")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) {
                return d.weight;
            });

        // var link = svg.append("g")
        //     .attr("class", "links")
        //     .selectAll("line")
        //     .data(json.links)
        //     .enter().append("line");

        var node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")

        node.append('circle')
            .attr("r", 10)
            .attr("fill", function(d) { return color(d.id); })
            .attr('id', function(d) { return 'node-' + d.id })

        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.id });

        simulation
            .nodes(json.nodes);

        simulation.force('link')
            .links(json.links);

        simulation.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            linkText
                .attr("x", function(d) {
                    return ((d.source.x + d.target.x) / 2);
                })
                .attr("y", function(d) {
                    return ((d.source.y + d.target.y) / 2);
                });
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        // function dragstarted(d) {
        //     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        //     d.fx = d.x;
        //     d.fy = d.y;
        // }

        // function dragged(d) {
        //     d.fx = d3.event.x;
        //     d.fy = d3.event.y;
        // }

        // function dragended(d) {
        //     if (!d3.event.active) simulation.alphaTarget(0);
        //     d.fx = null;
        //     d.fy = null;
        // }
    }

    animatePath(path) {
        d3.selectAll(".node circle")
            .style("fill", "");

        path.forEach(function(node, index) {
            if ($('#node-' + node).hasClass('visited')) {
                d3.select('#node-' + node)
                    .transition().duration(400).delay(700 * (index + 1))
                    .style("fill", "");
                d3.select('#node-' + node)
                    .attr('class', 'visited')
                    .transition().duration(300).delay(700 * (index + 1) + 300)
                    .style("fill", "red");
            }
            else {
                d3.select('#node-' + node)
                    .attr('class', 'visited')
                    .transition().duration(700).delay(700 * (index + 1))
                    .style("fill", "red");
            }

        });
    }
    clearAnimation() {
        d3.selectAll(".node circle")
            .style("fill", "");
    }

    highlightPath(path) {

        //remove any pevious path
        $('line').removeClass('path');

        let links = d3.selectAll("line");
        links.filter(function(d, k) {
            let line = this;
            path.forEach(function(node, index) {
                if (d.source.id === node && d.target.id === path[index + 1]) {
                    line.classList.add('path');
                    return;
                }
                else if (d.source.id === path[index + 1] && d.target.id === node) {
                    line.classList.add('path');
                    return;
                }
            });
        });
    }

    clear() {

        //clears the previously drawn graph
        $('svg').remove();
        this.clearAnimation();
        $('line').removeClass('path');
        return this;
    }
}

module.exports.DrawGraph = DrawGraph;
