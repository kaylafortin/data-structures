class Vertex {
    constructor(value, adjList) {
        this.value = null;
        this.adjacent = [];
        this.visited = false;
        this.predecessor = null;
    }
}

module.exports.Vertex = Vertex;