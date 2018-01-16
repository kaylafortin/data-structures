const { Vertex } = require('./Vertex.js');
var d3 = require("d3");

class Graph {

    constructor() {
        this.edgeList = [];
        this.numberOfVertices = 0;
        this.graphJSON = {};
    }

    create(numOfVertices) {
        let links = {};
        let linksJSON = [];
        let nodesJSON = [];
        this.numberOfVertices = numOfVertices;
        for (var i = 0; i < numOfVertices; i++) {
            links[i] = {};
            nodesJSON.push({ 'id': i });
            if (i + 1 == numOfVertices) break;
            let numOfEdges = this._getRandomInt(1, numOfVertices > 3 ? 2 : numOfVertices - i);

            for (var j = 0; j < numOfEdges; j++) {
                let edge = this._getRandomInt(i + 1, numOfVertices - 1);

                if (!links[i][edge]) {
                    links[i][edge] = edge;
                    this.edgeList.push([i, edge]);
                    linksJSON.push({ "source": i, "target": edge });
                }
            }
        }
        this.graphJSON.nodes = nodesJSON;
        this.graphJSON.links = linksJSON;
        this._drawGraph();
        return this.data = this._createVertices();
    }

    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    _createAdjList() {
        //ceates an array of the adjacent nodes for each nodes
        //this creates a undirected data set 
        //create empty array list for storing adjacent nodes

        let adjList = Array.apply(null, Array(this.numberOfVertices)).map(() => new Array());

        this.edgeList.forEach(function(node, index) {

            let node1 = node[0];
            let node2 = node[1];
            adjList[node1].push(node2);
            adjList[node2].push(node1);
        });

        return adjList;
    }

    _createVertices() {
        this.adjList = this._createAdjList();

        let vertices = this.adjList.map(function(adjacent, index) {
            let vertex = new Vertex;
            vertex.adjacent = adjacent;
            vertex.value = index;
            return vertex;
        });

        return vertices;
    }

    _drawGraph() {
        $('svg').remove();

        let width = 1200;
        let height = 450;

        var color = d3.scale.category20();

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var force = d3.layout.force()
            .gravity(0.05)
            .distance(250)
            .charge(-200)
            .size([width, height]);

        let json = this.graphJSON;

        force
            .nodes(json.nodes)
            .links(json.links)
            .start();

        var link = svg.selectAll(".link")
            .data(json.links)
            .enter().append("line")
            .attr("class", "link");

        var node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);

        node.append('circle')
            .attr("class", "node")
            .attr("r", 12)
            .style("fill", function(d) { return color(d.id) });

        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.id });

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
        // });
    }

    highlightPath(path, data) {
        let links = d3.selectAll(".link");
        links.each(function(d, k) {
            path.forEach(function(node, index) {
                if (d.source.id === node && d.target.id === path[index + 1]) {
                    links[0][k].classList.add('path');
                    return;
                }
                else if (d.source.id === path[index + 1] && d.target.id === node) {
                    links[0][k].classList.add('path');
                    return;
                }
            });
        });
    }

    clear() {
        this.data.forEach(function(vertex, index) {
            vertex.predecessor = null;
            vertex.visited = false;
        });

        $('.link').removeClass('path');
        return this;
    }

    print() {
        //TO DO update to use console.table
        console.log(this.data);
    }
}

module.exports.Graph = Graph;
