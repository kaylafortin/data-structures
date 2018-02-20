const { Graph } = require('./CreateGraph.js');
const { PriorityQueue } = require('../priority-queue.js');
const { BreadthFirst } = require('./BFS.js');

/*
each node will need: 
 - name/value
 - g = weight (cost of getting to it)
 - h = distance from end node 

Notes: 
-gScore will be randomly assigned a weight from 1 - 6
-hScore will use BFS to calculate distance
 
to start search need: 
 - starting node
 - ending node

once start and end node have been set -> add h value to nodes
*/

class AStar {

    constructor() {
        this.root = 0;
        this.graph = [];
        this.path = [];
    }

    start(graph, root, end) {

        this.root = root;
        this.end = end;
        this.graph = graph.data;
        let data = graph.data;

        if (end) {
            data.forEach(function(node, index){
                let breadthFirst = new BreadthFirst();
                graph.clear();
              let path =  breadthFirst.start(data, node.value, end);
           
            node.hScore = path.distance;
        });
        }

        let priorityQueue = new PriorityQueue();



        data[root].priority = 0;
        //add first node to queue and set prop to visited



        data[root].visited = true;
        data[root].completed = true;

        priorityQueue.enqueue(data[root]);


        let path = [];
        //continue until the queue is empty
        while (priorityQueue.size()) {

            //take first element from queue 
            let current = priorityQueue.dequeue();

            current.completed = true;
            console.log('c', current);

            // completed.push(current);
            path.push(current.value);

            //if it is the end point - exit loop
            if (current.value == end && end) {
                console.log('end')
                break;
            }
            // console.log(graph, current)
            //get the value for the adjacent elements 
            let edges = data[current.value].adjacent;


            edges.forEach(function(adjacent, index) {
                // console.log('ad: ', adjacent);

                let neighbor = data[adjacent.value];
                // console.log('n: ', neighbor)

                //if we have not completed this node to our path
                if (!neighbor.completed && neighbor) {

                    let gScore = current.gScore + adjacent.weight;
                    let fScore = gScore + neighbor.hScore;
                    // console.log(adjacent.weight, current.priority, fScore);
                    
                    //if already in the queue - updtae the priority
                    //and if the new score is better than the origin priorority
                    if (neighbor.visited && fScore < neighbor.priority) {
                        neighbor = priorityQueue.reprioritizeElement(neighbor);
                        console.log(neighbor)
                    }
                    if (neighbor){
                    neighbor.visited = true;
                    neighbor.gScore = gScore;
                    neighbor.priority = fScore;
                    priorityQueue.enqueue(neighbor);

                    console.log('n: ', neighbor)
}
                }
                //if the adjacent elements haven't been searched add them to queue, 
                //mark them as visited and indicate their parent

                // if (!graph[adjacent].visited) {
                //     graph[adjacent].visited = true;
                //     graph[adjacent].predecessor = current.value;

                //     queue.enqueue(graph[adjacent]);
                // }
                // console.log(priorityQueue.data());
            });
            console.log('p:', path);
            console.log('q ', priorityQueue.data());
        }
        //store the updated graph as a property
        //and call method to print results
        // console.log(path);
        this.graph = graph;
        this.path = path;
        return this._printResults(this.graph[end]);
    }

    _setDistances() {
        const breadthFirst = new BreadthFirst();
        let graph = this.graph;
        let end = this.end;
        // console.log('g', this.graph)
        graph.forEach(function(node, index){
            // console.log('d', node.value, end)
            // let path = [];
            //  path = breadthFirst.start(graph, node.value, end);
        
            new Promise((resolve, reject) => { 
                let path = breadthFirst.start(graph, node.value, end);
                 node.hScore  = () => resolve(path.distance);
                // return node.hScore;
            });
            // console.log('search', path)
            // console.log(node);
        });
        console.log('graph', graph)
        return this.graph = graph
    }

    _printResults(end) {

        if (!end) {
            this.graph.data.forEach(function(vertex) {
                console.log('vertex : ', vertex.value, 'predecessor : ', vertex.predecessor);
            });
            console.log(this.path);
            return { path: this.path, fullPath: this.path };
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

        return { path: path, fullPath: this.path };
    }
}

// module.exports.AStar = AStar;

const VERTICES = 4;

let graph = new Graph();

let aStar = new AStar();
// console.log(aStar.start)
graph.createWeighted(VERTICES);
console.log(graph.data);

aStar.start(graph, 0, 3);

// graph.clear();

// search.start(graph.data, 0, 8);
