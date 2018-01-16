const { Graph } = require('./Graph.js');
const { Queue } = require('../queue.array.js');
const { d3 } = require("d3");

class Search {
    constructor() {
        this.graph = [];
    }

    start(graph, root, end) {
        
        let queue = new Queue();
        //add first node to queue and set prop to visited
        queue.enqueue(graph[root]);
        graph[root].visited = true;

        //continue until the queue is empty
        while (queue.size()) {

            //take first element from queue 
            let current = queue.dequeue();
            //if it is the end point - exit loop
            if (current.value == end) {
                break;
            }

            //get the value for the adjacent elements 
            let edges = graph[current.value].adjacent;


            edges.forEach(function(adjacent, index) {

                //if the adjacent elements haven't been searched add them to queue, 
                //mark them as visited and indicate their parent
                if (!graph[adjacent].visited) {
                    graph[adjacent].visited = true;
                    graph[adjacent].predecessor = current.value;
                    queue.enqueue(graph[adjacent]);
                }
            });
        }
        //store the updated graph as a property
        //and call method to print results
        this.graph = graph;
        
        this._printResults(this.graph[end]);
    }

    _printResults(end) {
        
        if (!end) {
            this.graph.forEach(function(vertex){
                console.log('vertex : ', vertex.value, 'predecessor : ', vertex.predecessor);
            });
            return;
        }
        
        let current = end;
        let path = [end.value];

        // collect the values of the path
        while (current.predecessor !== null) {
            path.unshift(current.predecessor);
            current = this.graph[current.predecessor];
        }
        
        let graph = new Graph();
        graph.highlightPath(path, this.graph);
        //print results
        console.log('path : ', path);
        console.log('distance : ', path.length - 1);
        
        
    }
}

//list of edges from here: 
//https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs

const EDGES = [
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

module.exports.Search = Search;
// const VERTICES = 10;

// let graph = new Graph();
// graph.create(10);
// const search = new Search();

// search.start(graph.data, 0, 2);

// graph.clear();

// search.start(graph.data, 0, 8);
