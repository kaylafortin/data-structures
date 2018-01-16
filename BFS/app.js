const { Graph } = require('./Graph.js');
const { Search } = require('./BFS.js');

let graph = new Graph();
const search = new Search();

graph.create(8);

search.start(graph.data, 2, 4);

$('#submit').on('click', function() {
    let numberOfNodes = $('#numNodes').val() ? $('#numNodes').val() : 8,
        root = $('#root').val() ? $('#root').val() : 0,
        end = $('#end').val() ? $('#end').val() : 3
    graph.clear();
    search.start(graph.data, root, end);
});

$('#draw').on('click', function() {
    let numberOfNodes = $('#numNodes').val() ? $('#numNodes').val() : 8,
        root = $('#root').val() ? $('#root').val() : 0,
        end = $('#end').val() ? $('#end').val() : 3
    graph.clear();
    graph = new Graph();

    graph.create(Number(numberOfNodes));

    search.start(graph.data, root, end);
});
// graph.clear();

// search.start(graph.data, 0, 8);