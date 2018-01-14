const {Vertex} = require('./Vertex.js');

class Graph {

    constructor() {
        this.edgeList = [
            [0, 1],
            [0, 6],
            [0, 8],
            [1, 4],
            [1, 6],
            [1, 9],
            [2, 4],
            [2, 6],
            [3, 4],
            [3, 5],
            [3, 8],
            [4, 5],
            [4, 9],
            [7, 8],
            [7, 9]
        ];
        this.numberOfNodes = 10;
        this.columns = 0;
        this.rows = 0;
        this.data = this._createVertices();
    }

    create(numrows, numcols) {
        this.columns = numcols;
        this.row = numrows;
        for (let i = 0; i < numrows; ++i) {
            let columns = [];
            for (let j = 0; j < numcols; ++j) {
                let value = Math.floor(Math.random() * 2);
                columns[j] = value;
            }
            this.data[i] = columns;
        }

        return this.data;
    }

    _createAdjList() {
        let adjList = Array.apply(null, Array(this.numberOfNodes)).map(() => new Array());

        this.edgeList.forEach(function(node, index) {

            let node1 = node[0];
            let node2 = node[1];
            adjList[node1].push(node2);
            adjList[node2].push(node1);
        });
        // console.log(adjList);
        return adjList;
    }
    
    _createVertices(){
        this.adjList = this._createAdjList();
        
        let vertices  = this.adjList.map(function(adjacent, index){
            let vertex = new Vertex;
            vertex.adjacent = adjacent;
            vertex.value = index;
            return vertex;
        });
        
        return vertices;
    }
    
    print() {
        //TO DO update to use console.table
        console.log(this.adjList, this.edgeList);
    }
}




module.exports.Graph = Graph;
