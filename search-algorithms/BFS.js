const { Graph } = require('./CreateGraph.js');
const { Queue } = require('../queue.array.js');

class Search {
    constructor() {
        this.graph = [];
        this.path = [];
    }

    start(graph, root, end) {
        
        let queue = new Queue();
        
        //add first node to queue and set prop to visited
        queue.enqueue(graph[root]);
        graph[root].visited = true;
        let path = [];
        //continue until the queue is empty
        while (queue.size()) {
    
            //take first element from queue 
            let current = queue.dequeue();
             path.push(current.value);
             
            //if it is the end point - exit loop
            if (current.value == end && end) {
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
        this.path = path;
        return this._printResults(this.graph[end]);
    }

    _printResults(end) {
        
        if (!end) {
            this.graph.forEach(function(vertex){
                console.log('vertex : ', vertex.value, 'predecessor : ', vertex.predecessor);
            });
            console.log(this.path);
            return {path: this.path, fullPath: this.path};
        }

        let current = end  ;
        let path = [end.value] ;

        // collect the values of the path
        while (current.predecessor !== null) {
            path.unshift(current.predecessor);
            current = this.graph[current.predecessor];
        }
        
        console.log('path : ', path);
        console.log('distance : ', path.length - 1);
        
        return {path: path, fullPath: this.path};
    }
}

const VERTICES = 10;

let graph = new Graph();

const search = new Search();

graph.create(VERTICES);

search.start(graph.data, 0, 2);

graph.clear();

search.start(graph.data, 0, 8);

module.exports.BreadthFirst = Search;

