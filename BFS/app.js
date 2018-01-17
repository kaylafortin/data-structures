const { Graph } = require('./Graph.js');
const { Search } = require('./BFS.js');

let graph = new Graph();
const search = new Search();
const defaultNum = 8,
defaultRoot = 2,
defaultEnd = 5;

graph.create(defaultNum);

search.start(graph.data, defaultRoot, defaultEnd);

$('#numNodes').val(defaultNum);
$('#root').val(defaultRoot);
$('#end').val(defaultEnd);

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