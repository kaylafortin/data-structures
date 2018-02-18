const { Graph } = require('./CreateGraph.js');
const { Queue } = require('../queue.array.js');
var $ = require('jquery');

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
        
        return this._printResults(this.graph[end]);
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
        
        console.log('path : ', path);
        console.log('distance : ', path.length - 1);
        
        return path;
    }
}

module.exports.Search = Search;

