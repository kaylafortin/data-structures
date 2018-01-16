const { Graph } = require('./BFS/Graph.js');
const { Search } = require('./BFS/BFS.js');

let graph = new Graph();
const search = new Search();

graph.create(5);

search.start(graph.data, 2, 4);

// graph.clear();

// search.start(graph.data, 0, 8);