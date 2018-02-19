const { Vertex } = require('./Vertex.js');

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
        // console.log(this.graphJSON.nodes);
        // console.log(this.graphJSON.links);
        return this.data = this._createVertices();
    }
    
    build(vertices, edges) {
        this.edgeList = edges;
        this.numberOfVertices = vertices;
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

    clear() {
        this.data.forEach(function(vertex, index) {
            vertex.predecessor = null;
            vertex.visited = false;
        });
    }

    print() {
        //TO DO update to use console.table
        this.data.forEach(function(node, index){
            console.log(index, node.adjacent);
        });
    }
}

module.exports.Graph = Graph;
