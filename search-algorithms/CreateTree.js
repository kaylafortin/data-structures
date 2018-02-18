const { Vertex } = require('./Vertex.js');

class Tree {

    constructor() {
        this.edgeList = [];
        this.maxChildren = 3;
        this.maxNodes = 20;
        this.graphJSON = {};
        this.root = [];
    }

    create(children, nodes) {

        this.maxChildren = children ? children : this.maxChildren;
        this.maxNodes = nodes ? nodes : this.maxNodes;

        let links = {};

        let linksJSON = [];
        let nodesJSON = [{ 'name': 0 }];
        let id = 0;
        let count = 1;


        while (count < this.maxNodes) {

            links[id] = {};
            
            let numOfEdges = this._getRandomInt(1, this.maxChildren);

            for (var j = 1; j <= numOfEdges; j++) {

                this.edgeList.push([id, count]);
                linksJSON.push({ "source": id, "target": count });
                nodesJSON.push({ 'id': count });
                count++;

                if (count >= this.maxNodes) { break }
            }
            id++;
        }
        this.graphJSON.nodes = nodesJSON;
        this.graphJSON.links = linksJSON;

        this._createTree();

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

        let adjList = Array.apply(null, Array(this.maxNodes)).map(() => new Array());

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
<<<<<<< HEAD
    _createTree() {
        let links = this.graphJSON.links;
        var data = {};

        for (var x = links.length - 1; x >= 0; x--) {

            let value = links[x].source;
            let child = links[x].target;

            if (!data[value]) {
                data[value] = { value: value, children: [] };
            }

            data[value].children.push({ value: child });

            if (data[child]) {
                data[value].children[data[value].children.length - 1] = data[child];
            }
        }
        let root = data[0];

        return this.root.push(data[0]);
    }
    print() {
        //TO DO update to use console.table
        this.data.forEach(function(node, index) {
            console.log(index, node.adjacent);
        });
    }
}

let tree = new Tree();
tree.create();
// console.log(tree.data);
// tree.print();
module.exports.Tree = Tree;
