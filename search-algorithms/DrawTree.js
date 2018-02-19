const $ = require('jquery');
const d3 = require('d3');

class DrawTree {

    constructor() {
        this.graphJSON = {};
    }

    drawGraph(graph) {

        this.graphJSON = graph;
        let treeData = graph[0];

        // set the dimensions and margins of the diagram
        var margin = { top: 20, right: 90, bottom: 30, left: 90 },
            width = 560 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

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
            .attr("fill", function(d) { return color(d.depth); })
            .style("stroke",  '#bbb')
            // .style("fill", 'blue')

        // adds the text to the node
        node.append("text")
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.children ?
                    -13 : 13
            })
            .style("text-anchor", function(d) {
                return d.children ? "end" : "start";
            })
            .text(function(d) { return d.data.value; });

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

module.exports.DrawTree = DrawTree;
