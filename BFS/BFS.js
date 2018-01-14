
const {Graph} = require('./Graph.js');
const {Queue} = require('../queue.array.js');

// var graph = new Graph;
// graph.create(3,4);
// graph.print();

//set start
//set end 
const graph = new Graph;

class Search {
    constructor(root, graph, end){
        this.graph = graph.data;
        this.root = root;
        this.end = end;
        this.queue = new Queue;
        this.distance = 0;
        this.search(root,end);
    }
    
    search(){
        let queue = this.queue;
        let graph = this.graph;

        this.graph[this.root].distance = 0;
        queue.enqueue(this.graph[this.root]);
        while (queue.size()) {
            let current = queue.dequeue();
            if (current.value == this.end) {
                break; 
            }
            // console.log(queue);
            
            let edges = graph[current.value].adjacent;
            edges.forEach(function(adjacent, index){
                if (graph[adjacent].distance == null) {
                    graph[adjacent].distance = current.distance + 1;
                    graph[adjacent].predecessor = current.value;
                    queue.enqueue(graph[adjacent]);
                }
            });
            
        }
        this.graph = graph;
        this._printResults(this.graph[this.end]);
    }
    
    _printResults(end){
        let current = end;
        let path = [end.value];
        while (current.predecessor !== null) {
            path.push(current.predecessor);
            current = this.graph[current.predecessor];
        }
        
        console.log('path : ', path);
        console.log('distance : ', end.distance);
    }
}

const search = new Search(7, graph, 3);
// search.search(0)
