class Vertex {
    constructor(value, adjList) {
        this.value = null;
        this.adjacent = [];
        this.distance = null;
        this.predecessor = null;
    }
}

module.exports.Vertex = Vertex;