const $ = require('jquery');
const d3 = require('d3');

class Drawing {

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

        var color = d3.scaleOrdinal(d3.schemeCategory20);

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

        $('line').removeClass('path');
        return this;
    }
}

module.exports.Drawing = Drawing;
