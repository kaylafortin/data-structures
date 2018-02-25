class Vertex {
    constructor(value, adjList) {
        this.value = null;
        this.adjacent = [];
        this.visited = false;
        this.predecessor = null;
        this.priority = null;
        this.completed = false;
        this.hScore = null;
        this.gScore = null;
    }
}

module.exports.Vertex = Vertex;