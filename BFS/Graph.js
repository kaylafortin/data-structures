const { Vertex } = require('./Vertex.js');

class Graph {

    constructor(edges, vertices) {
        this.edgeList = edges;
        this.numberOfVertices = vertices;
        this.data = this._createVertices();
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
        return;
    }
    
    print() {
        //TO DO update to use console.table
        console.log(this.data);
    }
}

module.exports.Graph = Graph;
