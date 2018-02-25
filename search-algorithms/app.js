const { Graph } = require('./CreateGraph.js');
const { Tree } = require('./CreateTree.js');
const { DrawGraph } = require('./DrawGraph.js');
const { DrawTree } = require('./DrawTree.js');
const { BreadthFirst } = require('./BFS.js');
const { DepthFirst } = require('./DFS.js');
const $ = require("jquery");

let graph = new Graph();
let tree = new Tree();
let drawGraph = new DrawGraph();
let drawTree = new DrawTree();
let path = [];

const BFS = new BreadthFirst();
const DFS = new DepthFirst();

const defaultNodes = 9;
const defaultRoot = 0;
const defaultEnd = 7;

let numberOfNodes = defaultNodes;
let searchType = 'bfs';
let dataVisual = 'graph';
//set input values
$('#numNodes').val(defaultNodes);
$('#root').val(defaultRoot);
$('#end').val(defaultEnd);

//draw tree
drawNewGraph(searchType);

//restart animation
$('#animate').on('click', function() {
    if (dataVisual == 'graph') {
        graph.clear();
        drawGraph.drawGraph(graph.graphJSON);
        newSearch(searchType, graph.data, drawGraph.animatePath);
    }
    else {
        tree.clear();
        drawTree.drawGraph(tree.root);
        newSearch(searchType, tree.data, drawTree.animatePath);
    }
});

// $(document).ready(function() {
//     $('input[type=radio][name=search]').change(function() {
//         searchType = this.value;
//         if (dataVisual == 'graph') {
//             graph.clear();
//             drawGraph.drawGraph(graph.graphJSON);
//             newSearch(searchType, graph.data, drawGraph.animatePath);
//         }
//         else {
//             tree.clear();
//             drawTree.drawGraph(tree.root);
//             newSearch(searchType, tree.data, drawTree.animatePath);
//         }
//     });


//     $('input[type=radio][name=type]').change(function() {


//         if (this.value == 'graph') {
//             dataVisual = 'graph';

//             drawNewGraph(searchType);
//         }
//         else if (this.value == 'tree') {
//             dataVisual = 'tree';

//             drawNewTree(searchType);
//         }
//     });
// });

$('#submit').on('click', function() {

    if (Number($('#numNodes').val()) !== Number(numberOfNodes)) {

       
        if (dataVisual == 'graph') {

             drawNewGraph(searchType);

        }
        else {

            drawNewTree(searchType);
        }
    }
    else {
          if (dataVisual == 'graph') {
            graph.clear();
            drawGraph.drawGraph(graph.graphJSON);
            newSearch(searchType, graph.data, drawGraph.animatePath);
        }
        else {
            tree.clear();
            drawTree.drawGraph(tree.root);
            newSearch(searchType, tree.data, drawTree.animatePath);
        }
    }
});

$('#draw').on('click', function() {
    if (dataVisual == 'graph') {
        graph.clear();
        drawNewGraph(searchType);
    }
    else {
        tree.clear();
        drawNewTree(searchType);
    }
});

function drawNewGraph(search) {

    path = [];

    numberOfNodes = $('#numNodes').val() ? $('#numNodes').val() : defaultNodes;

    graph = new Graph();

    // graph.create(Number(numberOfNodes));
    graph.createWeighted(Number(numberOfNodes));
    
    drawGraph.drawFixed(graph.graphJSON);

    // newSearch(search, graph.data, drawGraph.animatePath);
}

function drawNewTree(search) {
    path = [];

    numberOfNodes = $('#numNodes').val() ? $('#numNodes').val() : defaultNodes;

    tree = new Tree();

    tree.create(3, Number(numberOfNodes));

    drawTree.drawGraph(tree.root);

    newSearch(search, tree.data, drawTree.animatePath);
}


function newSearch(search, data, highlight) {
    let root = $('#root').val() ? $('#root').val() : defaultRoot;
    let end = $('#end').val();

    path = [];
    if (search == 'bfs') {

        path = BFS.start(data, root, end);

        //print results
        $('#path').text('Shortest Path: ' + path.path);

        if (dataVisual == 'graph') {
            drawGraph.highlightPath(path.path);
            highlight(path.path);
        }
        else {
            highlight(path.fullPath);
        }
    }
    else {

        path = DFS.start(data, root, end);

        // drawTree.animatePath(path);

        //print results
        $('#path').text('Path: ' + path.fullPath);

        if (dataVisual == 'graph') {
            drawGraph.highlightPath(path.fullPath);
        }

        highlight(path.fullPath);
    }
    // console.log(path.fullPath)

}

// function newBFSGraphSearch() {

//     let root = $('#root').val() ? $('#root').val() : defaultRoot;
//     let end = $('#end').val();

//     path = [];

//     graph.clear();

//     path = BFS.start(graph.data, root, end);

//     drawGraph.highlightPath(path);

//     //print results
//     $('#path').text('Path: ' + path);
// }

// function newBFSTreeSearch() {

//     let root = $('#root').val() ? $('#root').val() : defaultRoot;
//     let end = $('#end').val();

//     path = [];

//     graph.clear();
//     tree.clear();

//     path = BFS.start(tree.data, root, end);

//     drawTree.highlightPath(path);

//     //print results
//     $('#path').text('Path: ' + path);
// }