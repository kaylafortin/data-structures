const { Vertex } = require('./Vertex.js');
var d3 = require("d3");

class Graph {

    constructor() {
        // this.edgeList = edges;
        this.edgeList = [];
        this.numberOfVertices = 0;
        this.graphJSON = {};
        // this.data = [];
        // this.data = this._createVertices();
    }
    //     const EDGES = [
    //     [0, 1],
    //     [0, 6],
    //     [0, 8],
    //     [1, 4],
    //     [1, 6],
    //     [1, 9],
    //     [2, 4],
    //     [2, 6],
    //     [3, 4],
    //     [3, 5],
    //     [3, 8],
    //     [4, 5],
    //     [4, 9],
    //     [7, 8],
    //     [7, 9]
    // ];
    //   "links": [
    //       {"source": 0, "target": 1},
    //       {"source": 0, "target": 2},
    //       {"source": 3, "target": 4},
    //       {"source": 1, "target": 2},
    //       {"source": 3, "target": 2}
    //   ]
    create(numOfVertices) {

        let links = {};
        let linksJSON = [];
        let nodesJSON = [];
        this.numberOfVertices = numOfVertices;
        for (var i = 0; i < numOfVertices; i++) {
            links[i] = {};
            nodesJSON.push({ 'id': i });
            if (i + 1 == numOfVertices) break;
            let numOfEdges =  this._getRandomInt(1, numOfVertices > 3 ? 2 : numOfVertices- i );
            console.log('#', numOfEdges)
            for (var j = 0; j < numOfEdges; j++) {
                let edge = this._getRandomInt(i + 1, numOfVertices - 1);
                console.log('edge', edge)
                if (!links[i][edge]) {
                    links[i][edge] = edge;
                    this.edgeList.push([i, edge]);
                    linksJSON.push({ "source": i, "target": edge });
                }
            }
        }
        console.log(linksJSON);
        this.graphJSON.nodes = nodesJSON;
        this.graphJSON.links = linksJSON;
        this._drawGraph();
        // console.log(JSON.stringify(this.graphJSON))
        // console.log(edgeList, links, links.id, linksJSON, nodesJSON);
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
        console.log(adjList);
        console.log(this.numberOfVertices);
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


        console.log(this.graphJSON)
        let width = 1200
        let   height = 500

        var color = d3.scale.category20();

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var force = d3.layout.force()
            .gravity(0.05)
            .distance(250)
            .charge(-200)
            .size([width, height]);

        // d3.json(JSON.stringify(this.graphJSON), function(error, json) {
        //   if (error) throw error;
        // let json = JSON.parse(JSON.stringify(this.graphJSON));
        let json = this.graphJSON;
        // console.log(json);
        // JSON.parse( json );
        console.log(json.links)
        console.log(json.nodes)
        
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


        // node.append("image")
        //     .attr("xlink:href", "https://github.com/favicon.ico")
        //     .attr("x", -8)
        //     .attr("y", -8)
        //     .attr("width", 16)
        //     .attr("height", 16);
        node.append('circle')
            .attr("class", "node")
            .attr("r", 10)
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
    
    highlightPath(path, data){
        let links = d3.selectAll(".link")
        console.log(links)
        links.each(function(d, k){
            console.log(d, k)
            path.forEach(function(node,index){
                if(d.source.id === node && d.target.id === path[index + 1]) {
                    links[0][k].style="stroke:red;"
                    return
                }
                else if (d.source.id === path[index + 1] && d.target.id === node) {
                    links[0][k].style="stroke:red;"
                    return
                }
            })
            // data.forEach(function(node,index){
            //     if (path.includes(node.value)) {
            //     // console.log(path.includes(node.value), path, node.value)
            //     // console.log(node.value, node.predecessor, d.source.id, d.target.id)
            //         if(d.source.id === node.value && d.target.id === node.predecessor) {
            //             links[0][k].style="stroke:red;"
            //             // links[0][k].style("stroke", function(){
            //             //     return "red" 
            //             // })
            //             return
            //         }  
            //     }
            // })
        })
        //   .style("stroke",function(d) {
              
            //   console.log(d);
            //   console.log(path)
            //  return d.source === thisNode || d.target === thisNode ? "red" : "#888888";
        // })
    }

    clear() {
        this.data.forEach(function(vertex, index) {
            vertex.predecessor = null;
            vertex.visited = false;
        });
        return;
    }

    print() {
        //TO DO update to use console.table
        console.log(this.data);
    }
}


// var x = new Graph;
// x._createEdjList(9);
module.exports.Graph = Graph;
