const { Graph } = require('./CreateGraph.js');
const { Tree } = require('./CreateTree.js');
const { Drawing } = require('./DrawGraph.js');
const { DrawTree } = require('./DrawTree.js');
const { BreadthFirst } = require('./BFS.js');
var $ = require("jquery");

let graph = new Graph();
let tree = new Tree();
let drawing = new Drawing();
let drawTree = new DrawTree();
const search = new BreadthFirst();

const defaultNum = 9,
defaultRoot = 2,
defaultEnd = 7;


let numberOfNodes = defaultNum;

$('#numNodes').val(defaultNum);
$('#root').val(defaultRoot);
$('#end').val(defaultEnd);

drawNewTree();

//  drawNewGraph();

$('#submit').on('click', function() {
    
    if ($('#numNodes').val() != numberOfNodes) {
        graph.clear();
        drawNewGraph();
    } else {
        newSearch();
    }
});

$('#draw').on('click', function() {
    graph.clear();
    drawNewGraph();
});

function drawNewGraph(){
    let root = $('#root').val() ? $('#root').val() : defaultRoot;
    let end = $('#end').val() ? $('#end').val() : defaultEnd;
    let path = [];
    
    numberOfNodes = $('#numNodes').val() ? $('#numNodes').val() : defaultNum;
    
    graph = new Graph();

    graph.create(Number(numberOfNodes));
    
    drawing.drawGraph(graph.graphJSON);

    path = search.start(graph.data, root, end);
    
    drawing.highlightPath(path);
    
    //print results
    $('#path').text('Path: ' + path);
}

function drawNewTree(){
    let root = $('#root').val() ? $('#root').val() : defaultRoot;
    let end = $('#end').val() ? $('#end').val() : defaultEnd;
    let path = [];
    
    numberOfNodes = $('#numNodes').val() ? $('#numNodes').val() : defaultNum;
    
    tree = new Tree();

    tree.create(3, 10);
    
    drawTree.drawGraph(tree.root);

    path = search.start(tree.data, root, end);
    
    // drawing.highlightPath(path);
    
    //print results
    $('#path').text('Path: ' + path);
}

function newSearch() {
    let root = $('#root').val() ? $('#root').val() : defaultRoot;
    let end = $('#end').val() ? $('#end').val() : defaultEnd;
    let path = [];
    
    graph.clear();
    
    path = search.start(graph.data, root, end);
    
    drawing.highlightPath(path);
    
    //print results
    $('#path').text('Path: ' + path);
}