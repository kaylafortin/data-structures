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
        //clears the previously drawn graph
        $('svg').remove();

        let width = 1150;
        let height = 550;

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

    highlightPath(path, data) {
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
        this.data.forEach(function(vertex, index) {
            vertex.predecessor = null;
            vertex.visited = false;
        });

        $('line').removeClass('path');
        return this;
    }

    print() {
        //TO DO update to use console.table
        console.log(this.data);
    }
}

module.exports.Graph = Graph;
