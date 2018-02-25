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
        this.graph = graph;

        let data = graph.data;

        //if an end has been set - use BFS to assign an hScore
        //hScore = distance from the node we are searching for
        //distance is defined by how many nodes away
        this._setDistances();
        
        
        //create new priority Queue
        let priorityQueue = new PriorityQueue();
        
        //TODO not sure about this - does starting node need h or f score? 
        data[root].priority = data[root].hScore;
        
        //add first node to queue and set prop to visited & completed
        data[root].visited = true;
        data[root].completed = true;

        priorityQueue.enqueue(data[root]);

        let path = [];
        //continue until the queue is empty
        while (priorityQueue.size()) {

            //take first element from queue 
            let current = priorityQueue.dequeue();

            current.completed = true;
            
            //TODO do we need to calculate path like this? prob not
            path.push(current.value);

            //if it is the end point - exit loop
            if (current.value == end && end) {
                console.log('end');
                break;
            }

            //get the value for the adjacent elements 
            let edges = data[current.value].adjacent;

            edges.forEach(function(adjacent, index) {

                let neighbor = data[adjacent.value];

                //if we have not completed this node to our path
                if (!neighbor.completed && neighbor) {
                    
                    //gScore = current weight plus neighbor weight
                    //fScore = gScore + hScore
                    let gScore = current.gScore + adjacent.weight;
                    let fScore = gScore + neighbor.hScore;

                    //if already in the queue and 
                    //if the new score is better than the origin priorority: 
                    //update the priority
                    if (neighbor.visited && fScore < neighbor.priority) {
                        //TODO this function prob could use soem work
                        neighbor = priorityQueue.reprioritizeElement(neighbor);
                    }
                    if (neighbor) {
                        neighbor.visited = true;
                        neighbor.gScore = gScore;
                        neighbor.priority = fScore;
                        priorityQueue.enqueue(neighbor);
                        neighbor.predecessor = current.value;
                    }
                }
            });
        }
        //store the updated graph as a property
        //and call method to print results
        // console.log(path);
        this.graph = data;
        this.path = path;
        return this._printResults(this.graph[this.end]);
    }

    _setDistances() {
        let breadthFirst = new BreadthFirst();
        let graph = this.graph;
        let end = this.end;
        let data = this.graph.data;
        
        if (end) {
            data.forEach(function(node, index) {
                graph.clear();
                let path = breadthFirst.start(data, node.value, end);
                node.hScore = path.distance;
            });
        }
        return this.graph.data = data;
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

const VERTICES = 7;

let graph = new Graph();

let aStar = new AStar();
// console.log(aStar.start)
graph.createWeighted(VERTICES);
// console.log(graph.data);

aStar.start(graph, 0, 3);

// graph.clear();

// search.start(graph.data, 0, 8);
