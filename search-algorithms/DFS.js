const { Graph } = require('./CreateGraph.js');
const { Tree } = require('./CreateTree.js');
const { Stack } = require('../stack.array.js');

class Search {
    constructor() {
        this.graph = [];
        this.path = [];
    }

    start(graph, root, end) {
        
        let path = [];
        let stack = new Stack();
        //add first node to stack and set prop to visited
        stack.push(graph[root]);
        path.push(graph[root].value);
        graph[root].visited = true;

        //continue until the stack is empty
        while (stack.size()) {

            //get the last value from the stack
            let current = stack.peek();
            
            if (current.value === end) {
                break;
            }
            //get the value for the adjacent elements 
            let edges = graph[current.value].adjacent;
            
            let hasSearchableChildren = false;
            // console.log(edges)
            // console.log(graph);
            for (var adjacent of edges) {
                
                //if the adjacent element has not been visited: mark as visited & add to stack
                //if the adjacent element has been visited: check next adjacent node
                if (!graph[adjacent].visited) {
                    graph[adjacent].visited = true;
                    // graph[adjacent].predecessor = current.value;
                    
                    stack.push(graph[adjacent]);
                    path.push(graph[adjacent].value);
                    
                    hasSearchableChildren = true;
                    //break loop
                    // console.log('break: ', graph[adjacent].value);
                    break; 
                }
            }
            
            if (!hasSearchableChildren) {
                // console.log('no')
                //if no children to search - remove the node from the stack
                
                stack.pop();
                
                if (stack.size() > 0) {
                    // console.log('no: ', stack.peek().value);
                    path.push(stack.peek().value);
                }
                
            }
            // console.log(stack.stack);
            // stack.stack.forEach(function(node, index){console.log(node.value)
            // });
            // console.log(' ')
        }
        //store the updated graph as a property
        //and call method to print results
        this.graph = graph;
        this.path = path;
        return this._printResults(this.graph[end]);
    }

    _printResults(end) {
        
        if (!end) {
            // this.graph.forEach(function(vertex){
            //     console.log('vertex : ', vertex.value, 'predecessor : ', vertex.predecessor);
            // });
            return {fullPath: this.path};
        }
        
        console.log(this.path)

        // collect the values of the path
        // while (current.predecessor !== null) {
        //     path.unshift(current.predecessor);
        //     current = this.graph[current.predecessor];
        // }
        // console.log(this.path)
        console.log('path : ', this.path);
        // console.log('distance : ', this.path.length - 1);
        
        return {fullPath: this.path};
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

module.exports.DepthFirst = Search;

const VERTICES = 10;

let tree = new Tree();

const search = new Search();

tree.create();
// console.log('hi')
// console.log('data', tree);
search.start(tree.data, 0);

// let graph = new Graph();

// const search = new Search();

// // graph.build(VERTICES, EDGES);


// graph.create(VERTICES);
// graph.print();
// search.start(graph.data, 0, 3);

// graph.clear();

// search.start(graph.data, 0, 8);



