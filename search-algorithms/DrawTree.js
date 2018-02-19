const $ = require('jquery');
const d3 = require('d3');

/* references: 
 * https://bl.ocks.org/mph006/7e7d7f629de75ada9af5
 * https://bl.ocks.org/d3noob/76d6fa0dff4af77544da9dd69aef9249
 */

class DrawTree {

    constructor() {
        this.graphJSON = {};
    }

    drawGraph(graph) {

        this.graphJSON = graph;
        let treeData = graph[0];

        //clears the previously drawn graph
        $('svg').remove();
        // set the dimensions and margins of the diagram
        var margin = { top: 10, right: 90, bottom: 30, left: 90 },
            width = 560 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        // declares a tree layout and assigns the size
        var treemap = d3.tree()
            .size([height, width]);

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom),
            g = svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // adds the links between the nodes
        var link = g.selectAll(".links")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "links")
            .attr("stroke-width", 1)
            .style("stroke", '#bbb')
            .attr("d", function(d) {
                return "M" + d.y + "," + d.x +
                    " " + d.parent.y + "," + d.parent.x;
            });

        // adds each node as a group
        var node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        node.append('circle')
            .attr("r", 10)
            .attr('id', function(d) { return 'node-' + d.data.value })
            .attr("fill", function(d) { return color(d.depth); })
            .style("stroke", '#bbb');

        // adds the text to the node
        node.append("text")
            .attr("dy", ".35em")
            .attr("x", function(d) { return d.children ? -13 : 13 })
            .style("text-anchor", function(d) {
                return d.children ? "end" : "start";
            })
            .text(function(d) { return d.data.value; });

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
        //TODO make highlight path work for trees
        //remove any pevious path
        $('line').removeClass('path');

        let links = d3.selectAll(".links");
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

module.exports.DrawTree = DrawTree;
