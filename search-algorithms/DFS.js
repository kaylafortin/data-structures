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

            if (current.value == end && end) {
                break;
            }
            //get the value for the adjacent elements 
            let edges = graph[current.value].adjacent;

            let hasSearchableChildren = false;

            for (var adjacent of edges) {

                //if the adjacent element has not been visited: mark as visited & add to stack
                //if the adjacent element has been visited: check next adjacent node
                if (!graph[adjacent].visited) {
                    graph[adjacent].visited = true;

                    stack.push(graph[adjacent]);
                    path.push(graph[adjacent].value);

                    hasSearchableChildren = true;

                    break;
                }
            }

            if (!hasSearchableChildren) {
                //if no children to search - remove the node from the stack

                stack.pop();

                if (stack.size() > 0) {
                    path.push(stack.peek().value);
                }

            }
        }
        //store the updated graph as a property
        //and call method to print results
        this.graph = graph;
        this.path = path;
        return this._printResults(this.graph[end]);
    }

    _printResults(end) {

        console.log('path : ', this.path);

        return { fullPath: this.path };
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

// const VERTICES = 10;

// let tree = new Tree();
// let graph = new Graph();

// const search = new Search();

// tree.create(4, 10);
// search.start(tree.data, 0);

// graph.build(VERTICES, EDGES);

// search.start(graph.data, 0, 3);

// graph.create(VERTICES);
// graph.print();
// graph.clear();

// search.start(graph.data, 0, 8);
